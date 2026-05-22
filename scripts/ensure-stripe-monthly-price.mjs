/**
 * Ensures a $5/mo recurring price exists on the Stripe account for STRIPE_SECRET_KEY.
 * Run after setting a live (or test) secret key in .env.local:
 *   node scripts/ensure-stripe-monthly-price.mjs
 */
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import Stripe from "stripe";

const envPath = resolve(process.cwd(), ".env.local");
const envText = readFileSync(envPath, "utf8");
const keyMatch = envText.match(/^STRIPE_SECRET_KEY=(.+)$/m);
const key = keyMatch?.[1]?.trim();
if (!key) {
  console.error("Set STRIPE_SECRET_KEY in .env.local first.");
  process.exit(1);
}

const mode = key.includes("_test_") ? "test" : key.includes("_live_") ? "live" : "unknown";
const stripe = new Stripe(key, { apiVersion: "2026-04-22.dahlia" });

const existingId = envText.match(/^STRIPE_PRICE_ID_MONTHLY=(.+)$/m)?.[1]?.trim();
if (existingId) {
  try {
    const p = await stripe.prices.retrieve(existingId);
    console.log(`OK: STRIPE_PRICE_ID_MONTHLY=${p.id} (${mode}, $${(p.unit_amount ?? 0) / 100}/${p.recurring?.interval ?? "?"})`);
    process.exit(0);
  } catch (e) {
    console.warn(`Configured price invalid for this key: ${e.message}`);
  }
}

const products = await stripe.products.list({ limit: 20, active: true });
let product = products.data.find((p) => p.name === "IVNIX Monthly Support");
if (!product) {
  product = await stripe.products.create({
    name: "IVNIX Monthly Support",
    description: "Monthly membership to support IVNIX calculator development.",
    metadata: { site: "ivnix" },
  });
  console.log("Created product:", product.id);
}

const prices = await stripe.prices.list({ product: product.id, active: true, limit: 20 });
let price = prices.data.find(
  (p) => p.recurring?.interval === "month" && p.unit_amount === 500 && p.currency === "usd",
);
if (!price) {
  price = await stripe.prices.create({
    product: product.id,
    unit_amount: 500,
    currency: "usd",
    recurring: { interval: "month" },
    metadata: { site: "ivnix" },
  });
  console.log("Created price:", price.id);
}

console.log("\nAdd to .env.local:");
console.log(`STRIPE_PRICE_ID_MONTHLY=${price.id}`);
console.log(`(mode: ${mode})`);

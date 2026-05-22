import Stripe from "stripe";

/** Keep in sync with the `stripe` npm package pinned API revision. */
const STRIPE_API_VERSION = "2026-04-22.dahlia" as const;

export function getStripeServer(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY?.trim();
  if (!key) return null;
  return new Stripe(key, { apiVersion: STRIPE_API_VERSION });
}

/**
 * Stored on Checkout / PaymentIntent / Subscription metadata so webhooks and billing-portal
 * only act on sessions created by this app.
 */
export const STRIPE_APP_SITE_META = "ivnix" as const;

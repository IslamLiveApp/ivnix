import { NextResponse } from "next/server";
import Stripe from "stripe";
import { SITE_NAME } from "@/config/site";
import { getSiteUrl } from "@/lib/site-url";
import { getStripeServer, STRIPE_APP_SITE_META } from "@/lib/stripe-server";

/** Resolved from stripe-node `checkout.sessions.create` (Stripe v22 namespace merge quirks). */
type StripeCheckoutSessionParams = NonNullable<
  Parameters<InstanceType<typeof Stripe>["checkout"]["sessions"]["create"]>[0]
>;

export const runtime = "nodejs";

export type CheckoutMode = "payment" | "subscription";

function monthlyPriceId(): string | undefined {
  return process.env.STRIPE_PRICE_ID_MONTHLY?.trim();
}

type CreateOptions = {
  /** Whole or two-decimal USD, $1–$999 inclusive (one-time). */
  amountUsd?: number;
  supporterMessage?: string;
};

function normalizeTipUsd(amountUsdRaw: unknown): number | null {
  if (typeof amountUsdRaw !== "number" || !Number.isFinite(amountUsdRaw)) {
    return null;
  }
  const cents = Math.round(amountUsdRaw * 100);
  if (cents < 100 || cents > 999 * 100) return null;
  return cents / 100;
}

async function createCheckoutSessionUrl(
  mode: CheckoutMode,
  options: CreateOptions = {},
): Promise<
  | { ok: true; url: string }
  | {
      ok: false;
      reason:
        | "not_configured"
        | "missing_price"
        | "stripe_error"
        | "invalid_amount";
    }
> {
  const stripe = getStripeServer();
  if (!stripe) {
    return { ok: false, reason: "not_configured" };
  }

  const origin = getSiteUrl();
  const successUrl = `${origin}/support?tip=thanks&stripe_cs={CHECKOUT_SESSION_ID}`;
  const cancelUrl = `${origin}/support?tip=cancelled`;

  const msg = options.supporterMessage?.trim()?.slice(0, 480) ?? "";
  const meta: Record<string, string> = {
    site: STRIPE_APP_SITE_META,
    page: "/support",
  };
  if (msg) meta.supporter_message = msg;

  let lineItems: NonNullable<StripeCheckoutSessionParams["line_items"]>;

  if (mode === "payment") {
    const tipUsd = normalizeTipUsd(options.amountUsd);
    if (tipUsd == null) {
      return { ok: false, reason: "invalid_amount" };
    }
    lineItems = [
      {
        quantity: 1,
        price_data: {
          currency: "usd",
          unit_amount: Math.round(tipUsd * 100),
          product_data: {
            name: `One-time tip — ${SITE_NAME}`,
          },
        },
      },
    ];
  } else {
    const price = monthlyPriceId();
    if (!price) {
      return { ok: false, reason: "missing_price" };
    }
    lineItems = [{ price, quantity: 1 }];
  }

  try {
    const sessionParams: StripeCheckoutSessionParams = {
      mode,
      line_items: lineItems,
      success_url: successUrl,
      cancel_url: cancelUrl,
      billing_address_collection: "auto",
      allow_promotion_codes: false,
      metadata: meta,
    };

    if (mode === "subscription") {
      sessionParams.subscription_data = { metadata: meta };
    } else {
      sessionParams.payment_intent_data = { metadata: meta };
    }

    const session = await stripe.checkout.sessions.create(sessionParams);

    if (!session.url) {
      return { ok: false, reason: "stripe_error" };
    }

    return { ok: true, url: session.url };
  } catch (e) {
    console.error("[stripe/checkout]", e);
    return { ok: false, reason: "stripe_error" };
  }
}

/** Legacy GET bookmarks: send people to the on-site picker instead of Stripe. */
export async function GET() {
  const origin = getSiteUrl();
  return NextResponse.redirect(new URL("/support", origin), 307);
}

type Body =
  | { mode: "payment"; amountUsd: number; message?: string }
  | { mode: "subscription"; message?: string };

/** POST `{ mode, amountUsd?, message? }` → `{ url }` (redirect browser to Stripe) */
export async function POST(req: Request) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (body.mode !== "payment" && body.mode !== "subscription") {
    return NextResponse.json({ error: "mode must be payment or subscription" }, { status: 400 });
  }

  const supporterMessage =
    typeof body.message === "string" ? body.message : undefined;

  if (body.mode === "payment" && typeof body.amountUsd !== "number") {
    return NextResponse.json(
      { error: "One-time checkout requires numeric amountUsd." },
      { status: 400 },
    );
  }

  const result =
    body.mode === "payment"
      ? await createCheckoutSessionUrl("payment", {
          amountUsd: body.amountUsd,
          supporterMessage,
        })
      : await createCheckoutSessionUrl("subscription", { supporterMessage });

  if (!result.ok) {
    if (result.reason === "not_configured") {
      return NextResponse.json(
        { error: "Payments are not configured yet." },
        { status: 503 },
      );
    }
    if (result.reason === "invalid_amount") {
      return NextResponse.json(
        { error: "Enter a tip between $1.00 and $999.00 USD." },
        { status: 400 },
      );
    }
    if (result.reason === "missing_price") {
      return NextResponse.json(
        {
          error: "Missing STRIPE_PRICE_ID_MONTHLY (recurring monthly price in Dashboard).",
        },
        { status: 503 },
      );
    }
    return NextResponse.json(
      { error: "Could not start checkout. Try again later." },
      { status: 500 },
    );
  }

  return NextResponse.json({ url: result.url });
}

import { NextResponse } from "next/server";
import { getSiteUrl } from "@/lib/site-url";
import { getStripeServer, STRIPE_APP_SITE_META } from "@/lib/stripe-server";

export const runtime = "nodejs";

type Body = { checkoutSessionId?: string };

/**
 * Opens Stripe Customer Billing Portal from a Checkout Session returned on success (`stripe_cs`).
 * Subscription checkouts include a Customer; one-time tips return 400.
 */
export async function POST(req: Request) {
  const stripe = getStripeServer();
  if (!stripe) {
    return NextResponse.json({ error: "Stripe is not configured." }, { status: 503 });
  }

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const checkoutSessionId = typeof body.checkoutSessionId === "string" ? body.checkoutSessionId.trim() : "";
  if (!checkoutSessionId.startsWith("cs_")) {
    return NextResponse.json({ error: "Invalid checkout session ID." }, { status: 400 });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(checkoutSessionId, {
      expand: ["customer"],
    });

    if (session.metadata?.site !== STRIPE_APP_SITE_META) {
      return NextResponse.json({ error: "This session is not for this site." }, { status: 404 });
    }

    if (session.mode !== "subscription") {
      return NextResponse.json(
        { error: "Billing portal is available for memberships, not one-time tips." },
        { status: 400 },
      );
    }

    const customerId =
      typeof session.customer === "string"
        ? session.customer
        : session.customer?.id;

    if (!customerId) {
      return NextResponse.json(
        { error: "Customer not available yet — open the link again in a few seconds." },
        { status: 409 },
      );
    }

    const origin = getSiteUrl();
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${origin}/support`,
    });

    if (!portalSession.url) {
      return NextResponse.json({ error: "Could not create portal session." }, { status: 500 });
    }

    return NextResponse.json({ url: portalSession.url });
  } catch (e) {
    console.error("[stripe/customer-portal]", e);
    return NextResponse.json({ error: "Could not open billing portal." }, { status: 500 });
  }
}

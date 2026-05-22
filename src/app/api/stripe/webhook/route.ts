import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getStripeServer, STRIPE_APP_SITE_META } from "@/lib/stripe-server";

export const runtime = "nodejs";

/** POST Stripe webhooks → verify signature; handle Checkout completion for observability / future integrations. */
export async function POST(req: Request) {
  const stripe = getStripeServer();
  const whSecret = process.env.STRIPE_WEBHOOK_SECRET?.trim();

  if (!stripe || !whSecret) {
    return NextResponse.json({ error: "Webhook is not configured." }, { status: 503 });
  }

  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing stripe-signature." }, { status: 400 });
  }

  const rawBody = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, whSecret);
  } catch {
    return NextResponse.json({ error: "Invalid webhook signature." }, { status: 400 });
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      if (session.metadata?.site === STRIPE_APP_SITE_META && session.mode) {
        const amountTotal =
          typeof session.amount_total === "number" ? session.amount_total / 100 : null;
        console.info("[stripe/webhook]", {
          type: event.type,
          id: session.id,
          mode: session.mode,
          amountTotalUsd: amountTotal,
          paymentStatus: session.payment_status,
          customerEmail: session.customer_details?.email ?? null,
          messageLen: session.metadata.supporter_message?.length ?? 0,
        });
      }
    }

    // Future: persistence, Slack, email receipts — webhook is the authoritative signal.
    return NextResponse.json({ received: true });
  } catch (e) {
    console.error("[stripe/webhook]", e);
    return NextResponse.json({ error: "Webhook handler failed." }, { status: 500 });
  }
}

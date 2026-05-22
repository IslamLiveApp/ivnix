import { buildFieldHint, periodNote } from "@/lib/field-hint-text";
import type { SpendPeriod } from "@/lib/spend-period";
import { SPEND_PERIOD_LABEL } from "@/lib/spend-period";

const pn = (period: SpendPeriod) => periodNote(period);

export function influencerFieldHints(period: SpendPeriod) {
  const p = pn(period);
  return {
    views: buildFieldHint({
      what: `Total or average views for the ${SPEND_PERIOD_LABEL[period]} you are pricing (use campaign totals or average per post × posts).`,
      periodNote: p,
      where:
        "Creator analytics (Instagram/TikTok/YouTube) → Insights → average views on last 10 posts, or sum views for the campaign window.",
      formula: "Used in engagement rate, CPM price, and clicks = views × (CTR ÷ 100).",
    }),
    likes: buildFieldHint({
      what: "Average or total likes matching the same posts as views.",
      periodNote: p,
      where: "Same post insights as views → “Likes” per post; average for fair CPM.",
      formula: "Engagement rate = (likes + comments) ÷ views × 100.",
    }),
    comments: buildFieldHint({
      what: "Average or total comments on those posts.",
      periodNote: p,
      where: "Post insights → “Comments”.",
      formula: "Engagement rate = (likes + comments) ÷ views × 100.",
    }),
    profit: buildFieldHint({
      what: "Gross profit per sale after product cost—not revenue and not influencer fee.",
      where: "Your margin per unit: (sale price − COGS − fulfillment) per order.",
      formula: "Max budget = estimated sales × profit per sale.",
    }),
    ctr: buildFieldHint({
      what: "Percent of views that click your link (bio link, swipe-up, pinned comment).",
      where: "UTM link clicks ÷ views, or platform link clicks if reported.",
      formula: "Clicks = views × (CTR ÷ 100).",
    }),
    cr: buildFieldHint({
      what: "Percent of clicks that become a purchase on your site.",
      where: "Shopify/analytics: purchases from creator traffic ÷ link clicks.",
      formula: "Estimated sales = clicks × (CR ÷ 100).",
    }),
    cpm: buildFieldHint({
      what: "What you pay per 1,000 views—market norm often ~€15–30 for broad niches.",
      where: "Past deals, rate cards, or (paid fee ÷ views) × 1,000 from similar creators.",
      formula: "CPM price = (views ÷ 1,000) × CPM × engagement multiplier × content multiplier.",
    }),
    er: buildFieldHint({
      what: "How engaged the audience is on those views.",
      formula: "(likes + comments) ÷ views × 100.",
    }),
    cpmPrice: buildFieldHint({
      what: "Suggested sponsorship from CPM model before your funnel cap.",
      formula: "(views ÷ 1,000) × CPM × ER multiplier × content type multiplier.",
    }),
    maxBudget: buildFieldHint({
      what: "Highest fee that still matches modeled gross profit from the post.",
      formula: "estimated sales × profit per sale.",
    }),
    clicks: buildFieldHint({
      what: "Modeled link clicks from views and CTR.",
      formula: "views × (CTR ÷ 100).",
    }),
    sales: buildFieldHint({
      what: "Modeled orders from clicks and site conversion rate.",
      formula: "clicks × (CR ÷ 100).",
    }),
    grossProfit: buildFieldHint({
      what: "Modeled gross profit from estimated sales—not net of influencer cost yet.",
      formula: "estimated sales × profit per sale.",
    }),
  };
}

export function marketplaceFieldHints(period: SpendPeriod) {
  const p = pn(period);
  return {
    sale: buildFieldHint({
      what: `Gross merchandise value (GMV) for the ${SPEND_PERIOD_LABEL[period]} before any fees.`,
      periodNote: p,
      where:
        "Seller dashboard (Amazon, Etsy, eBay, etc.) → Sales/Orders → gross sales for the date range.",
      formula: "net = gross − (gross × commission %) − (gross × payment %).",
    }),
    commission: buildFieldHint({
      what: "Marketplace referral or selling fee as a percent of gross.",
      where: "Seller fee report or pricing page → “Referral fee” / “Commission” %.",
      formula: "commission amount = gross × (commission % ÷ 100).",
    }),
    payment: buildFieldHint({
      what: "Card/payout processing fee as a percent of gross (if not already netted by platform).",
      where: "Stripe/PayPal/Adyen dashboard → effective rate % on captured volume.",
      formula: "payment fees = gross × (payment % ÷ 100).",
    }),
    commissionAmt: buildFieldHint({
      what: "Dollar/euro amount kept by the marketplace.",
      formula: "gross × (commission % ÷ 100).",
    }),
    paymentAmt: buildFieldHint({
      what: "Processing fees on the sale.",
      formula: "gross × (payment % ÷ 100).",
    }),
    net: buildFieldHint({
      what: "What you keep after both fee layers.",
      formula: "gross − commission − payment fees.",
    }),
  };
}

export function processorCompareFieldHints(period: SpendPeriod) {
  const p = pn(period);
  return {
    amount: buildFieldHint({
      what: `Charge amount for one payment, or total card volume for the ${SPEND_PERIOD_LABEL[period]} if comparing period totals.`,
      periodNote: p,
      where:
        "Stripe/PayPal/Adyen → Payments → sum “Amount” for the period, or enter a single checkout total.",
      formula: "net = amount − fixed fee − amount × (percentage ÷ 100).",
    }),
    fixed: buildFieldHint({
      what: "Fixed fee per successful charge (e.g. €0.25)—does not scale when you change period.",
      where: "Processor pricing page → “per transaction” or line item on a sample receipt.",
      formula: "Subtracted once per charge in this model.",
    }),
    pct: buildFieldHint({
      what: "Variable percentage fee on the charge amount.",
      where: "Pricing page → “% per successful card charge”.",
      formula: "fee = amount × (percentage ÷ 100).",
    }),
    netA: buildFieldHint({
      what: "Settled amount after Processor A fees.",
      formula: "amount − fixedA − amount × (pctA ÷ 100).",
    }),
    netB: buildFieldHint({
      what: "Settled amount after Processor B fees.",
      formula: "amount − fixedB − amount × (pctB ÷ 100).",
    }),
    diff: buildFieldHint({
      what: "How much more you keep with B vs A on the same amount.",
      formula: "netB − netA.",
    }),
  };
}

export function roiFieldHints(period: SpendPeriod) {
  const p = pn(period);
  return {
    cost: buildFieldHint({
      what: `Total invested for the ${SPEND_PERIOD_LABEL[period]} (cash out).`,
      periodNote: p,
      where: "Invoices, capex ledger, or campaign spend total for the window.",
      formula: "ROI % = (gain − cost) ÷ cost × 100.",
    }),
    gain: buildFieldHint({
      what: `Total return or revenue attributed to that investment in the same ${SPEND_PERIOD_LABEL[period]}.`,
      periodNote: p,
      where: "Sales report, project revenue, or exit proceeds matching the cost window.",
      formula: "Net profit = gain − cost.",
    }),
    roi: buildFieldHint({
      what: "Return on investment as a percentage.",
      formula: "(gain − cost) ÷ cost × 100.",
    }),
    net: buildFieldHint({
      what: "Absolute profit or loss in currency.",
      formula: "gain − cost.",
    }),
    payback: buildFieldHint({
      what: "How many times gain covers cost (1× = break even on cash).",
      formula: "gain ÷ cost.",
    }),
  };
}

export function roasFieldHints(period: SpendPeriod) {
  const p = pn(period);
  return {
    spend: buildFieldHint({
      what: `Ad spend for the ${SPEND_PERIOD_LABEL[period]}.`,
      periodNote: p,
      where: "Ads manager → Amount spent for the date range.",
      formula: "ROAS = revenue ÷ spend.",
    }),
    revenue: buildFieldHint({
      what: `Attributed revenue for the same ${SPEND_PERIOD_LABEL[period]}.`,
      periodNote: p,
      where: "Ads manager conversions value or analytics revenue with same attribution window.",
      formula: "ROAS = revenue ÷ spend.",
    }),
    roas: buildFieldHint({
      what: "Revenue multiple on ad spend. Above 1× means revenue exceeds spend.",
      formula: "revenue ÷ spend.",
    }),
    profit: buildFieldHint({
      what: "Modeled profit from ads before COGS and overhead.",
      formula: "revenue − spend.",
    }),
    spendPerRevenue: buildFieldHint({
      what: "Ad spend required to earn €1 of attributed revenue.",
      formula: "spend ÷ revenue.",
    }),
  };
}

export function productProfitFieldHints() {
  return {
    price: buildFieldHint({
      what: "Selling price per unit (what the customer pays).",
      where: "Product page or order line item → “Price”.",
      formula: "Revenue per unit = price.",
    }),
    cogs: buildFieldHint({
      what: "Cost of goods per unit (materials + direct labor).",
      where: "Inventory/COGS report or bill of materials per SKU.",
      formula: "Subtracted from price in unit profit.",
    }),
    shipping: buildFieldHint({
      what: "Fulfillment/shipping cost you pay per order.",
      where: "Carrier invoices ÷ orders, or 3PL per-order fee.",
      formula: "Subtracted in unit profit.",
    }),
    fees: buildFieldHint({
      what: "Payment + marketplace fees as % of price.",
      where: "Effective rate from processor or marketplace fee schedule.",
      formula: "Fee $ = price × (fee % ÷ 100).",
    }),
    adCost: buildFieldHint({
      what: "Ad spend allocated per order (CPA or blended).",
      where: "Ad spend ÷ orders in the period.",
      formula: "Subtracted in unit profit.",
    }),
    unitProfit: buildFieldHint({
      what: "Profit per unit after variable costs.",
      formula: "price − COGS − shipping − fees − ad cost.",
    }),
  };
}

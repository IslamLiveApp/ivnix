import { buildFieldHint, periodNote } from "@/lib/field-hint-text";
import type { SpendPeriod } from "@/lib/spend-period";
import { SPEND_PERIOD_LABEL } from "@/lib/spend-period";

type Platform = "facebook" | "google";

function adsManager(platform: Platform) {
  return platform === "facebook" ? "Meta Ads Manager" : "Google Ads";
}

export function paidAdsFieldHints(platform: Platform, period: SpendPeriod) {
  const mgr = adsManager(platform);
  const pn = periodNote(period);

  return {
    spend: buildFieldHint({
      what: `How much you pay for ads per ${SPEND_PERIOD_LABEL[period]}. Start with a test budget you can afford for 2–4 weeks.`,
      periodNote: pn,
      where: `${mgr} → Campaigns → pick campaign → set date range to your ${SPEND_PERIOD_LABEL[period]} → column “Amount spent” (or Spend).`,
      formula: "Used in ROAS, CPA, CPC, and profit.",
    }),
    impressions: buildFieldHint({
      what: "How many times your ad was shown. Must match the same date range as spend.",
      periodNote: pn,
      where: `${mgr} → Campaigns → same date range → column “Impressions”.`,
      formula: "Clicks = impressions × (CTR ÷ 100).",
    }),
    ctr: buildFieldHint({
      what: "Percent of impressions that became a click. Local service ads often land around 0.8–2%.",
      periodNote: pn,
      where: `${mgr} → Campaigns → same date range → column “CTR” (or Clicks ÷ Impressions).`,
      formula: "Clicks = impressions × (CTR ÷ 100).",
    }),
    cr: buildFieldHint({
      what:
        "Percent of clicks that become your main goal (lead form, call, booking). For long sales cycles (e.g. construction), use click → qualified lead—not signed contract unless that is what you track.",
      periodNote: pn,
      where:
        platform === "facebook"
          ? `${mgr} → Results column matching your goal (Leads, Conversions, or custom conversion). Divide by Clicks for rate.`
          : `${mgr} → Campaigns → Conversions or “Conv. rate” for your primary action.`,
      formula: "Conversions = clicks × (CR ÷ 100).",
    }),
    aov: buildFieldHint({
      what:
        "Average revenue per conversion in this model—e.g. average job value if each conversion is a sale, or use expected value per lead if you model leads only.",
      periodNote: pn,
      where:
        "Your CRM or invoices: total revenue from tracked conversions ÷ number of conversions in the same period.",
      formula: "Revenue = conversions × average order value.",
    }),
    clicks: buildFieldHint({
      what: "Estimated ad clicks in this period.",
      formula: "impressions × (CTR ÷ 100).",
    }),
    conversions: buildFieldHint({
      what: "Estimated goals (leads, purchases, etc.) from ad clicks.",
      formula: "clicks × (CR ÷ 100).",
    }),
    revenue: buildFieldHint({
      what: "Modeled revenue from conversions—not profit after labor or materials.",
      formula: "conversions × average order value.",
    }),
    roas: buildFieldHint({
      what: "Return on ad spend. Above 1× means modeled revenue beats ad spend.",
      formula: "revenue ÷ spend.",
    }),
    cpa: buildFieldHint({
      what: "Cost per acquisition (per conversion). Compare to the most you can pay and still earn.",
      formula: "spend ÷ conversions.",
    }),
    cpc: buildFieldHint({
      what: "Average cost for one click.",
      formula: "spend ÷ clicks.",
    }),
    profit: buildFieldHint({
      what: "Modeled profit from ads only (revenue minus ad spend). Check crew capacity and job costs separately.",
      formula: "revenue − spend.",
    }),
  };
}

export function paidAdsRuleOfThumb(platform: Platform) {
  const mgr = adsManager(platform);
  return {
    title: "Simple rule of thumb",
    steps: [
      {
        heading: "Pick your period",
        body: "Choose day, month, or year—spend and impressions scale when you switch (e.g. €50/day → ~€1,500/month). CTR, conversion rate, and AOV stay as you entered them.",
      },
      {
        heading: "Set a max cost per lead or job",
        body: "Decide the highest CPA you can pay and still make money after wages, materials, and overhead.",
      },
      {
        heading: "Test, then read real data",
        body: `Run a small budget 2–4 weeks. In ${mgr}, copy Amount spent, Impressions, CTR, and conversions into this calculator.`,
      },
      {
        heading: "Scale only when it works",
        body: "Increase daily spend when Profit is positive, ROAS is above 1×, and CPA is below your max—and you can handle more quotes or jobs.",
      },
      {
        heading: "Quick daily budget",
        body: "Monthly spend ≈ (target leads per month) × (max CPA). Daily spend ≈ monthly ÷ 30.",
      },
    ],
    example: {
      heading: "Example (local construction)",
      lines: [
        "Average job €10,000 · max €400 per lead · need 20 leads/month",
        "Monthly ad budget ≈ 20 × €400 = €8,000 → about €267/day",
        "Enter €267/day with period “day”, or €8,000 with period “month”.",
        "Use CR for click → lead; use AOV for average job size only if conversions mean signed jobs.",
      ],
    },
  };
}

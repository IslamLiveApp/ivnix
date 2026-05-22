/** Passed to `ResultRow` `variant` for value column coloring */
export type ResultValueVariant =
  | "default"
  | "success"
  | "warning"
  | "destructive";

/** Currency outcomes below zero → red */
export function variantForMoneySigned(value: number): ResultValueVariant {
  return value < 0 ? "destructive" : "default";
}

/**
 * ROAS multiple: below break-even on revenue vs spend → red;
 * thin margin (1–2×) → orange.
 */
export function variantForRoasMultiple(roas: number): ResultValueVariant {
  if (roas < 1) return "destructive";
  if (roas < 2) return "warning";
  return "default";
}

/** ROI % from cost basis */
export function variantForRoiPercent(roiPct: number): ResultValueVariant {
  if (roiPct < 0) return "destructive";
  if (roiPct < 15) return "warning";
  return "default";
}

/** Net margin % per unit / price */
export function variantForMarginPercent(marginPct: number): ResultValueVariant {
  if (marginPct < 0) return "destructive";
  if (marginPct < 10) return "warning";
  return "default";
}

/** Gain ÷ cost — below 1× means loss vs principal */
export function variantForPaybackMultiple(multiple: number): ResultValueVariant {
  if (multiple < 1) return "destructive";
  if (multiple < 1.05) return "warning";
  return "default";
}

/** Modeled MRR contracting vs starting base */
export function variantForMrrTrend(
  ending: number,
  starting: number,
): ResultValueVariant {
  if (starting <= 0) return "default";
  if (ending < starting) return "destructive";
  if (ending < starting * 1.02) return "warning";
  return "default";
}

/**
 * Spend per 1 unit of revenue (inverse efficiency). Above 1 = losing;
 * near 1 = tight.
 */
export function variantForSpendPerUnitRevenue(
  spend: number,
  revenue: number,
): ResultValueVariant {
  if (revenue <= 0) return "default";
  const ratio = spend / revenue;
  if (ratio > 1) return "destructive";
  if (ratio > 0.85) return "warning";
  return "default";
}

/** Contribution margin vs price — very thin margin → warning */
export function variantForContributionVsPrice(
  contribution: number,
  price: number,
): ResultValueVariant {
  if (price <= 0) return "default";
  const ratio = contribution / price;
  if (ratio < 0) return "destructive";
  if (ratio < 0.12) return "warning";
  return "default";
}

/** CPA vs average order value — CPA ≥ AOV is upside-down unit economics */
export function variantForCpaVsAov(cpa: number, aov: number): ResultValueVariant {
  if (aov <= 0 || cpa <= 0) return "default";
  const ratio = cpa / aov;
  if (ratio >= 1) return "destructive";
  if (ratio > 0.85) return "warning";
  return "default";
}

/** Modeled deal price vs max affordable budget */
export function variantForPriceVsBudget(
  price: number,
  maxBudget: number,
): ResultValueVariant {
  if (maxBudget <= 0) return "default";
  if (price > maxBudget) return "destructive";
  if (price > maxBudget * 0.85) return "warning";
  return "default";
}

/** LTV ÷ CAC — below 1 unsustainable; below 3 often concerning for SaaS */
export function variantForLtvCacRatio(ratio: number): ResultValueVariant {
  if (ratio < 1) return "destructive";
  if (ratio < 3) return "warning";
  return "default";
}

/** Rule of 40 score (growth % + profit margin %) */
export function variantForRuleOf40(score: number): ResultValueVariant {
  if (score < 40) return "warning";
  return "default";
}

/** Net revenue retention % — below 100% contracting */
export function variantForNrrPercent(nrr: number): ResultValueVariant {
  if (nrr < 100) return "destructive";
  if (nrr < 105) return "warning";
  return "default";
}

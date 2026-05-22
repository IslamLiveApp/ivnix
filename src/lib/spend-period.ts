export type SpendPeriod = "day" | "month" | "year";

export const SPEND_PERIOD_DAYS: Record<SpendPeriod, number> = {
  day: 1,
  month: 30,
  year: 365,
};

export const SPEND_PERIOD_LABEL: Record<SpendPeriod, string> = {
  day: "day",
  month: "month",
  year: "year",
};

export const SPEND_PERIOD_ADJECTIVE: Record<SpendPeriod, string> = {
  day: "Daily",
  month: "Monthly",
  year: "Yearly",
};

export function normalizeSpend(amount: number, period: SpendPeriod) {
  const days = SPEND_PERIOD_DAYS[period];
  const perDay = amount / days;
  return {
    perDay,
    perMonth: perDay * SPEND_PERIOD_DAYS.month,
    perYear: perDay * SPEND_PERIOD_DAYS.year,
  };
}

/** Scale a period-total amount when switching budget period (e.g. daily → monthly). */
export function convertBetweenPeriods(
  amount: number,
  from: SpendPeriod,
  to: SpendPeriod,
): number {
  if (from === to || amount <= 0) return amount;
  return amount * (SPEND_PERIOD_DAYS[to] / SPEND_PERIOD_DAYS[from]);
}

/** Format scaled values back into calculator input strings. */
export function formatPeriodScaledInput(
  n: number,
  kind: "spend" | "impressions" | "count" = "spend",
): string {
  if (!Number.isFinite(n) || n <= 0) return "";
  if (kind === "impressions" || kind === "count") {
    return String(Math.max(1, Math.round(n)));
  }
  if (n >= 1000) return String(Math.round(n));
  if (n >= 100) return String(Math.round(n * 10) / 10);
  return String(Math.round(n * 100) / 100);
}

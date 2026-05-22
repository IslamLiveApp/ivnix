"use client";

import { formatCurrency } from "@/lib/format";
import { normalizeSpend, type SpendPeriod } from "@/lib/spend-period";

export function PeriodBudgetEquivalents({
  amount,
  period,
  currency = "EUR",
  label = "Budget equivalents",
}: {
  amount: number;
  period: SpendPeriod;
  currency?: string;
  label?: string;
}) {
  if (amount <= 0) return null;
  const norm = normalizeSpend(amount, period);
  const periodWord = period === "day" ? "daily" : period === "year" ? "yearly" : "monthly";
  return (
    <p className="text-xs text-muted-foreground">
      {label}: {formatCurrency(norm.perDay, undefined, currency)}/day ·{" "}
      {formatCurrency(norm.perMonth, undefined, currency)}/month ·{" "}
      {formatCurrency(norm.perYear, undefined, currency)}/year
      <span className="text-muted-foreground/80"> (from your {periodWord} inputs)</span>
    </p>
  );
}

"use client";

import { cn } from "@/lib/utils";
import type { SpendPeriod } from "@/lib/spend-period";
import { SPEND_PERIOD_ADJECTIVE } from "@/lib/spend-period";

const PERIODS: SpendPeriod[] = ["day", "month", "year"];

export function BudgetPeriodControls({
  period,
  onPeriodChange,
  label = "Budget period",
}: {
  period: SpendPeriod;
  onPeriodChange: (p: SpendPeriod) => void;
  label?: string;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <div
        className="inline-flex rounded-md border border-input bg-secondary/40 p-0.5"
        role="group"
        aria-label={label}
      >
        {PERIODS.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => onPeriodChange(p)}
            className={cn(
              "rounded px-2.5 py-1 text-xs font-medium capitalize transition-colors",
              period === p
                ? "font-semibold text-[#0047FF]"
                : "text-muted-foreground hover:text-foreground",
            )}
            aria-pressed={period === p}
          >
            {SPEND_PERIOD_ADJECTIVE[p]}
          </button>
        ))}
      </div>
    </div>
  );
}

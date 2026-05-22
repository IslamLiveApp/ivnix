"use client";

import { BudgetPeriodControls } from "@/components/calculator/budget-period-controls";
import { PeriodScaleNote } from "@/components/calculator/period-scale-note";
import type { SpendPeriod } from "@/lib/spend-period";

/** Day / month / year toggle + optional scale notice for any calculator. */
export function CalculatorPeriodHeader({
  period,
  onPeriodChange,
  scaleNote,
}: {
  period: SpendPeriod;
  onPeriodChange: (p: SpendPeriod) => void;
  scaleNote: string | null;
}) {
  return (
    <div className="space-y-2">
      <BudgetPeriodControls period={period} onPeriodChange={onPeriodChange} />
      <PeriodScaleNote message={scaleNote} />
    </div>
  );
}

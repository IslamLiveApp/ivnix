"use client";

import { NumberField } from "@/components/calculator/fields";
import { BudgetPeriodControls } from "@/components/calculator/budget-period-controls";
import type { CurrencySelectorConfig } from "@/components/calculator/fields";
import type { SpendPeriod } from "@/lib/spend-period";

export function SpendPeriodField({
  period,
  onPeriodChange,
  spendId,
  spendLabel,
  spendHint,
  spendValue,
  onSpendChange,
  currencySelector,
}: {
  period: SpendPeriod;
  onPeriodChange: (p: SpendPeriod) => void;
  spendId: string;
  spendLabel: string;
  spendHint: string;
  spendValue: string;
  onSpendChange: (v: string) => void;
  currencySelector?: CurrencySelectorConfig;
}) {
  return (
    <div className="space-y-2">
      <BudgetPeriodControls period={period} onPeriodChange={onPeriodChange} />
      <NumberField
        id={spendId}
        label={spendLabel}
        hint={spendHint}
        value={spendValue}
        onChange={onSpendChange}
        currencySelector={currencySelector}
      />
    </div>
  );
}

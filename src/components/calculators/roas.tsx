"use client";

import * as React from "react";
import { CalculatorPeriodHeader } from "@/components/calculator/calculator-period-header";
import { PeriodBudgetEquivalents } from "@/components/calculator/period-budget-equivalents";
import { useBudgetPeriod } from "@/components/calculator/use-budget-period";
import { CalculatorShell, ResultsCard } from "@/components/calculator/shell";
import { CollapsibleSection } from "@/components/ui/collapsible";
import { NumberField, ResultRow } from "@/components/calculator/fields";
import { formatCurrency, parseNumber } from "@/lib/format";
import { getCalculatorGuide } from "@/lib/calculator-guides";
import { roasFieldHints } from "@/lib/calculator-hints";
import {
  variantForMoneySigned,
  variantForRoasMultiple,
  variantForSpendPerUnitRevenue,
} from "@/lib/result-variant";

export default function RoasCalculator() {
  const [currency, setCurrency] = React.useState("EUR");
  const { period, changePeriod, scaleNote, onScaledChange } =
    useBudgetPeriod("month");
  const hints = roasFieldHints(period);
  const [spend, setSpend] = React.useState("2500");
  const [revenue, setRevenue] = React.useState("9200");

  const s = parseNumber(spend);
  const r = parseNumber(revenue);
  const roas = s > 0 ? r / s : 0;
  const profit = r - s;

  return (
    <CalculatorShell
      title="ROAS calculator"
      description="Return on ad spend: revenue ÷ ad spend."
      guide={getCalculatorGuide("paid-growth/roas")}
    >
      <CollapsibleSection title="Campaign totals">
        <CalculatorPeriodHeader
          period={period}
          onPeriodChange={(p) =>
            changePeriod(p, [
              { value: spend, setValue: setSpend, kind: "spend" },
              { value: revenue, setValue: setRevenue, kind: "spend" },
            ])
          }
          scaleNote={scaleNote}
        />
        <NumberField
          id="spend"
          label="Ad spend"
          hint={hints.spend}
          value={spend}
          onChange={onScaledChange(setSpend)}
          currencySelector={{ value: currency, onChange: setCurrency }}
        />
        <NumberField
          id="revenue"
          label="Attributed revenue"
          hint={hints.revenue}
          value={revenue}
          onChange={onScaledChange(setRevenue)}
          currencySelector={{ value: currency, onChange: setCurrency }}
        />
      </CollapsibleSection>

      <ResultsCard>
        {s <= 0 ? (
          <p className="text-sm text-muted-foreground">
            Enter ad spend greater than zero.
          </p>
        ) : (
          <>
            <PeriodBudgetEquivalents amount={s} period={period} currency={currency} />
            <ResultRow
              label="ROAS"
              hint={hints.roas}
              value={`${roas.toFixed(2)}x`}
              variant={variantForRoasMultiple(roas)}
            />
            <ResultRow
              label="Profit (revenue − spend)"
              hint={hints.profit}
              value={formatCurrency(profit, undefined, currency)}
              variant={variantForMoneySigned(profit)}
            />
            <ResultRow
              label="Spend per 1 revenue"
              hint={hints.spendPerRevenue}
              value={
                r > 0 ? formatCurrency(s / r, undefined, currency) : "—"
              }
              variant={variantForSpendPerUnitRevenue(s, r)}
            />
          </>
        )}
      </ResultsCard>
    </CalculatorShell>
  );
}

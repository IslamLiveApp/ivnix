"use client";

import * as React from "react";
import { CalculatorPeriodHeader } from "@/components/calculator/calculator-period-header";
import { PeriodBudgetEquivalents } from "@/components/calculator/period-budget-equivalents";
import { useBudgetPeriod } from "@/components/calculator/use-budget-period";
import { CalculatorShell, ResultsCard } from "@/components/calculator/shell";
import { CollapsibleSection } from "@/components/ui/collapsible";
import { NumberField, ResultRow } from "@/components/calculator/fields";
import { formatCurrency, formatPercent, parseNumber } from "@/lib/format";
import { getCalculatorGuide } from "@/lib/calculator-guides";
import {
  variantForMarginPercent,
  variantForMoneySigned,
} from "@/lib/result-variant";

export default function ContributionMarginCalculator() {
  const [currency, setCurrency] = React.useState("EUR");
  const { period, changePeriod, scaleNote, onScaledChange } =
    useBudgetPeriod("month");
  const [revenue, setRevenue] = React.useState("150000");
  const [variable, setVariable] = React.useState("92000");

  const rev = parseNumber(revenue);
  const varCost = parseNumber(variable);
  const cm = rev - varCost;
  const cmPct = rev > 0 ? (cm / rev) * 100 : 0;

  return (
    <CalculatorShell
      title="Contribution margin"
      description="Revenue minus variable costs — dollars and percent of revenue before fixed overhead."
      guide={getCalculatorGuide("ecommerce/contribution-margin")}
    >
      <CollapsibleSection title="Period totals">
        <CalculatorPeriodHeader
          period={period}
          onPeriodChange={(p) =>
            changePeriod(p, [
              { value: revenue, setValue: setRevenue, kind: "spend" },
              { value: variable, setValue: setVariable, kind: "spend" },
            ])
          }
          scaleNote={scaleNote}
        />
        <NumberField
          id="rev"
          label="Revenue"
          hint="Period revenue. Used in: cm = rev − varCost; cmPct = cm ÷ rev × 100."
          value={revenue}
          onChange={onScaledChange(setRevenue)}
          currencySelector={{ value: currency, onChange: setCurrency }}
        />
        <NumberField
          id="var"
          label="Variable costs (COGS, fulfillment, variable ads, etc.)"
          hint="Costs that scale with volume. Used in: cm = rev − varCost."
          value={variable}
          onChange={onScaledChange(setVariable)}
          currencySelector={{ value: currency, onChange: setCurrency }}
        />
      </CollapsibleSection>

      <ResultsCard>
        <PeriodBudgetEquivalents amount={rev} period={period} currency={currency} />
        <ResultRow
          label="Contribution margin"
          hint="Formula: rev − varCost."
          value={formatCurrency(cm, undefined, currency)}
          variant={variantForMoneySigned(cm)}
        />
        <ResultRow
          label="Contribution margin %"
          hint="Formula: cm ÷ rev × 100."
          value={formatPercent(cmPct, 1)}
          variant={variantForMarginPercent(cmPct)}
        />
      </ResultsCard>
    </CalculatorShell>
  );
}

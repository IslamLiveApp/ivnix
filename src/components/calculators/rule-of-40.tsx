"use client";

import * as React from "react";
import { CalculatorPeriodHeader } from "@/components/calculator/calculator-period-header";
import { useBudgetPeriod } from "@/components/calculator/use-budget-period";
import { CalculatorShell, ResultsCard } from "@/components/calculator/shell";
import { CollapsibleSection } from "@/components/ui/collapsible";
import { NumberField, ResultRow } from "@/components/calculator/fields";
import { formatPercent, parseNumber } from "@/lib/format";
import { variantForRuleOf40 } from "@/lib/result-variant";
import { getCalculatorGuide } from "@/lib/calculator-guides";

export default function RuleOf40Calculator() {
  const { period, changePeriod, scaleNote } = useBudgetPeriod("month");
  const [growth, setGrowth] = React.useState("28");
  const [profitMargin, setProfitMargin] = React.useState("12");

  const g = parseNumber(growth);
  const p = parseNumber(profitMargin);
  const score = g + p;

  return (
    <CalculatorShell
      title="Rule of 40"
      description="Revenue growth rate (year over year) plus profit margin — many investors look for the combined score to reach about 40% or better."
      guide={getCalculatorGuide("saas/rule-of-40")}
    >
      <CollapsibleSection title="Inputs">
        <CalculatorPeriodHeader
          period={period}
          onPeriodChange={(p) => changePeriod(p, [])}
          scaleNote={scaleNote}
        />
        <NumberField
          id="growth"
          label="Revenue growth (YoY)"
          hint="Year-over-year revenue growth (%). Used in: score = g + p."
          value={growth}
          onChange={setGrowth}
          unit="%"
          step="0.1"
        />
        <NumberField
          id="margin"
          label="Profit margin (same basis — e.g. EBITDA or operating)"
          hint="Profit margin on the same basis as growth (%). Used in: score = g + p."
          value={profitMargin}
          onChange={setProfitMargin}
          unit="%"
          step="0.1"
        />
      </CollapsibleSection>

      <ResultsCard>
        <ResultRow
          label="Rule of 40 score"
          hint="Formula: g + p."
          value={formatPercent(score, 1)}
          variant={variantForRuleOf40(score)}
        />
      </ResultsCard>
    </CalculatorShell>
  );
}

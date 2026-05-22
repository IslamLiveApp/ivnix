"use client";

import * as React from "react";
import { CalculatorPeriodHeader } from "@/components/calculator/calculator-period-header";
import { PeriodBudgetEquivalents } from "@/components/calculator/period-budget-equivalents";
import { useBudgetPeriod } from "@/components/calculator/use-budget-period";
import { CalculatorShell, ResultsCard } from "@/components/calculator/shell";
import { CollapsibleSection } from "@/components/ui/collapsible";
import { NumberField, ResultRow } from "@/components/calculator/fields";
import { formatCurrency, formatPercent, parseNumber } from "@/lib/format";
import { variantForNrrPercent } from "@/lib/result-variant";
import { getCalculatorGuide } from "@/lib/calculator-guides";

export default function NrrCalculator() {
  const [currency, setCurrency] = React.useState("EUR");
  const { period, changePeriod, scaleNote, onScaledChange } =
    useBudgetPeriod("month");
  const [starting, setStarting] = React.useState("85000");
  const [expansion, setExpansion] = React.useState("12000");
  const [churn, setChurn] = React.useState("9000");
  const [contraction, setContraction] = React.useState("1500");

  const base = parseNumber(starting);
  const exp = parseNumber(expansion);
  const ch = parseNumber(churn);
  const con = parseNumber(contraction);

  const ending = base + exp - ch - con;
  const nrrPct = base > 0 ? (ending / base) * 100 : 0;

  return (
    <CalculatorShell
      title="Net revenue retention (NRR)"
      description="Starting subscription revenue plus expansion minus churn and contraction — as a percentage of the starting base."
      guide={getCalculatorGuide("saas/nrr")}
    >
      <CollapsibleSection title="Cohort-style inputs (same currency period)">
        <CalculatorPeriodHeader
          period={period}
          onPeriodChange={(p) =>
            changePeriod(p, [
              { value: starting, setValue: setStarting, kind: "spend" },
              { value: expansion, setValue: setExpansion, kind: "spend" },
              { value: churn, setValue: setChurn, kind: "spend" },
              { value: contraction, setValue: setContraction, kind: "spend" },
            ])
          }
          scaleNote={scaleNote}
        />
        <NumberField
          id="start"
          label="Starting revenue from cohort / base"
          hint="Starting subscription base. Used in: ending = base + exp − ch − con; nrrPct = ending ÷ base × 100."
          value={starting}
          onChange={onScaledChange(setStarting)}
          currencySelector={{ value: currency, onChange: setCurrency }}
        />
        <NumberField
          id="exp"
          label="Expansion revenue"
          hint="Upsell and expansion dollars. Used in: ending = base + exp − ch − con."
          value={expansion}
          onChange={onScaledChange(setExpansion)}
          currencySelector={{ value: currency, onChange: setCurrency }}
        />
        <NumberField
          id="churn"
          label="Churned revenue lost"
          hint="Revenue lost to churn. Used in: ending = base + exp − ch − con."
          value={churn}
          onChange={onScaledChange(setChurn)}
          currencySelector={{ value: currency, onChange: setCurrency }}
        />
        <NumberField
          id="con"
          label="Contraction (downgrades)"
          hint="Downgrade revenue lost. Used in: ending = base + exp − ch − con."
          value={contraction}
          onChange={onScaledChange(setContraction)}
          currencySelector={{ value: currency, onChange: setCurrency }}
        />
      </CollapsibleSection>

      <ResultsCard>
        {base <= 0 ? (
          <p className="text-sm text-muted-foreground">
            Enter a positive starting revenue base.
          </p>
        ) : (
          <>
            <PeriodBudgetEquivalents amount={base} period={period} currency={currency} />
            <ResultRow
              label="Ending revenue (after moves)"
              hint="Formula: base + exp − ch − con."
              value={formatCurrency(ending, undefined, currency)}
            />
            <ResultRow
              label="NRR"
              hint="Formula: ending ÷ base × 100."
              value={formatPercent(nrrPct, 1)}
              variant={variantForNrrPercent(nrrPct)}
            />
          </>
        )}
      </ResultsCard>
    </CalculatorShell>
  );
}

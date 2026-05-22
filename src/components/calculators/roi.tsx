"use client";

import * as React from "react";
import { CalculatorPeriodHeader } from "@/components/calculator/calculator-period-header";
import { PeriodBudgetEquivalents } from "@/components/calculator/period-budget-equivalents";
import { useBudgetPeriod } from "@/components/calculator/use-budget-period";
import { CalculatorShell, ResultsCard } from "@/components/calculator/shell";
import { CollapsibleSection } from "@/components/ui/collapsible";
import { NumberField, ResultRow } from "@/components/calculator/fields";
import { formatCurrency, formatPercent, parseNumber } from "@/lib/format";
import {
  variantForMoneySigned,
  variantForPaybackMultiple,
  variantForRoiPercent,
} from "@/lib/result-variant";
import { roiFieldHints } from "@/lib/calculator-hints";
import { getCalculatorGuide } from "@/lib/calculator-guides";

export default function RoiCalculator() {
  const [currency, setCurrency] = React.useState("EUR");
  const { period, changePeriod, scaleNote, onScaledChange } =
    useBudgetPeriod("month");
  const hints = roiFieldHints(period);
  const [cost, setCost] = React.useState("10000");
  const [gain, setGain] = React.useState("13500");

  const c = parseNumber(cost);
  const g = parseNumber(gain);
  const net = g - c;
  const roi = c > 0 ? (net / c) * 100 : 0;

  return (
    <CalculatorShell
      title="ROI calculator"
      description="Return on investment: (gain − cost) ÷ cost × 100."
      guide={getCalculatorGuide("investing/roi")}
    >
      <CollapsibleSection title="Inputs">
        <CalculatorPeriodHeader
          period={period}
          onPeriodChange={(p) =>
            changePeriod(p, [
              { value: cost, setValue: setCost, kind: "spend" },
              { value: gain, setValue: setGain, kind: "spend" },
            ])
          }
          scaleNote={scaleNote}
        />
        <NumberField
          id="cost"
          label="Amount invested (cost)"
          hint={hints.cost}
          value={cost}
          onChange={onScaledChange(setCost)}
          currencySelector={{ value: currency, onChange: setCurrency }}
        />
        <NumberField
          id="gain"
          label="Money returned (gain)"
          hint={hints.gain}
          value={gain}
          onChange={onScaledChange(setGain)}
          currencySelector={{ value: currency, onChange: setCurrency }}
        />
      </CollapsibleSection>

      <ResultsCard>
        {c <= 0 ? (
          <p className="text-sm text-muted-foreground">
            Enter a positive cost to compute ROI.
          </p>
        ) : (
          <>
            <PeriodBudgetEquivalents amount={c} period={period} currency={currency} />
            <ResultRow
              label="Net profit / loss"
              hint={hints.net}
              value={formatCurrency(net, undefined, currency)}
              variant={variantForMoneySigned(net)}
            />
            <ResultRow
              label="ROI"
              hint="Formula: (gain − cost) ÷ cost × 100. Return as a percentage."
              value={formatPercent(roi, 2)}
              variant={variantForRoiPercent(roi)}
            />
            <ResultRow
              label="Payback multiple (gain ÷ cost)"
              hint={hints.payback}
              value={`${(g / c).toFixed(2)}x`}
              variant={variantForPaybackMultiple(g / c)}
            />
          </>
        )}
      </ResultsCard>
    </CalculatorShell>
  );
}

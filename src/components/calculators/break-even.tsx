"use client";

import * as React from "react";
import { CalculatorPeriodHeader } from "@/components/calculator/calculator-period-header";
import { PeriodBudgetEquivalents } from "@/components/calculator/period-budget-equivalents";
import { useBudgetPeriod } from "@/components/calculator/use-budget-period";
import { CalculatorShell, ResultsCard } from "@/components/calculator/shell";
import { CollapsibleSection } from "@/components/ui/collapsible";
import { NumberField, ResultRow } from "@/components/calculator/fields";
import { formatCurrency, parseNumber } from "@/lib/format";
import { variantForContributionVsPrice } from "@/lib/result-variant";
import { getCalculatorGuide } from "@/lib/calculator-guides";

export default function BreakEvenCalculator() {
  const [currency, setCurrency] = React.useState("EUR");
  const { period, changePeriod, scaleNote, onScaledChange } =
    useBudgetPeriod("month");
  const [fixedCosts, setFixedCosts] = React.useState("8500");
  const [price, setPrice] = React.useState("49");
  const [variable, setVariable] = React.useState("21");

  const f = parseNumber(fixedCosts);
  const p = parseNumber(price);
  const v = parseNumber(variable);
  const contrib = p - v;
  const units = contrib > 0 ? f / contrib : 0;
  const revenueAtBe = units * p;

  return (
    <CalculatorShell
      title="Break-even calculator"
      description="Units needed = fixed costs ÷ (price − variable cost per unit)."
      guide={getCalculatorGuide("startup/break-even")}
    >
      <CollapsibleSection title="Inputs">
        <CalculatorPeriodHeader
          period={period}
          onPeriodChange={(p) =>
            changePeriod(p, [
              { value: fixedCosts, setValue: setFixedCosts, kind: "spend" },
            ])
          }
          scaleNote={scaleNote}
        />
        <NumberField
          id="fixed"
          label="Monthly fixed costs"
          hint="Numerator for break-even units. Used in: units = f ÷ contrib."
          value={fixedCosts}
          onChange={onScaledChange(setFixedCosts)}
          currencySelector={{ value: currency, onChange: setCurrency }}
        />
        <NumberField
          id="price"
          label="Selling price per unit"
          hint="Subtracted in contribution margin; multiplied for revenue at break-even. Used in: contrib = p − v; revenueAtBe = units × p."
          value={price}
          onChange={setPrice}
          currencySelector={{ value: currency, onChange: setCurrency }}
        />
        <NumberField
          id="variable"
          label="Variable cost per unit"
          hint="Subtracted from price for contribution margin. Used in: contrib = p − v."
          value={variable}
          onChange={setVariable}
          currencySelector={{ value: currency, onChange: setCurrency }}
        />
      </CollapsibleSection>

      <ResultsCard>
        {contrib <= 0 ? (
          <p className="text-sm text-muted-foreground">
            Price must exceed variable cost per unit to reach break-even.
          </p>
        ) : (
          <>
            <PeriodBudgetEquivalents amount={f} period={period} currency={currency} />
            <ResultRow
              label="Contribution margin per unit"
              hint="Formula: p − v. Profit per unit before fixed costs."
              value={formatCurrency(contrib, undefined, currency)}
              variant={variantForContributionVsPrice(contrib, p)}
            />
            <ResultRow
              label="Break-even units"
              hint="Formula: f ÷ contrib. Units needed to cover monthly fixed costs."
              value={units.toFixed(0)}
            />
            <ResultRow
              label="Revenue at break-even"
              hint="Formula: units × p. Top-line revenue when you hit break-even volume."
              value={formatCurrency(revenueAtBe, undefined, currency)}
            />
          </>
        )}
      </ResultsCard>
    </CalculatorShell>
  );
}

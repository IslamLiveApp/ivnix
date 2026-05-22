"use client";

import * as React from "react";
import { CalculatorPeriodHeader } from "@/components/calculator/calculator-period-header";
import { PeriodBudgetEquivalents } from "@/components/calculator/period-budget-equivalents";
import { useBudgetPeriod } from "@/components/calculator/use-budget-period";
import { CalculatorShell, ResultsCard } from "@/components/calculator/shell";
import { CollapsibleSection } from "@/components/ui/collapsible";
import { NumberField, ResultRow } from "@/components/calculator/fields";
import { formatCurrency, parseNumber } from "@/lib/format";
import { variantForMoneySigned } from "@/lib/result-variant";
import { getCalculatorGuide } from "@/lib/calculator-guides";

export default function ConsultingRateCalculator() {
  const [currency, setCurrency] = React.useState("EUR");
  const { period, changePeriod, scaleNote, onScaledChange } =
    useBudgetPeriod("year");
  const [annualTarget, setAnnualTarget] = React.useState("120000");
  const [expenses, setExpenses] = React.useState("28000");
  const [billableHours, setBillableHours] = React.useState("1200");

  const target = parseNumber(annualTarget);
  const exp = parseNumber(expenses);
  const hours = parseNumber(billableHours);
  const hourly = hours > 0 ? (target + exp) / hours : 0;

  return (
    <CalculatorShell
      title="Consulting hourly rate"
      description="Cover your annual income goal plus business expenses across billable hours — before taxes."
      guide={getCalculatorGuide("sales/consulting-rate")}
    >
      <CollapsibleSection title="Annual picture">
        <CalculatorPeriodHeader
          period={period}
          onPeriodChange={(p) =>
            changePeriod(p, [
              { value: annualTarget, setValue: setAnnualTarget, kind: "spend" },
              { value: expenses, setValue: setExpenses, kind: "spend" },
              { value: billableHours, setValue: setBillableHours, kind: "count" },
            ])
          }
          scaleNote={scaleNote}
        />
        <NumberField
          id="target"
          label="Income you want to pay yourself (annual)"
          hint="Desired take-home pay. Used in: hourly = (target + exp) ÷ hours."
          value={annualTarget}
          onChange={onScaledChange(setAnnualTarget)}
          currencySelector={{ value: currency, onChange: setCurrency }}
        />
        <NumberField
          id="exp"
          label="Business expenses (annual)"
          hint="Annual business costs. Used in: hourly = (target + exp) ÷ hours."
          value={expenses}
          onChange={onScaledChange(setExpenses)}
          currencySelector={{ value: currency, onChange: setCurrency }}
        />
        <NumberField
          id="hrs"
          label="Billable hours per year"
          hint="Billable hours you can sell. Used in: hourly = (target + exp) ÷ hours."
          value={billableHours}
          onChange={onScaledChange(setBillableHours)}
        />
      </CollapsibleSection>

      <ResultsCard>
        {hours <= 0 ? (
          <p className="text-sm text-muted-foreground">
            Enter billable hours to compute your rate.
          </p>
        ) : (
          <>
            <PeriodBudgetEquivalents
              amount={target + exp}
              period={period}
              currency={currency}
            />
            <ResultRow
              label="Required revenue (pay + expenses)"
              hint="Formula: target + exp."
              value={formatCurrency(target + exp, undefined, currency)}
              variant={variantForMoneySigned(target + exp)}
            />
            <ResultRow
              label="Hourly bill rate (minimum)"
              hint="Formula: (target + exp) ÷ hours."
              value={formatCurrency(hourly, undefined, currency)}
            />
          </>
        )}
      </ResultsCard>
    </CalculatorShell>
  );
}

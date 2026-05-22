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

export default function CacCalculator() {
  const [currency, setCurrency] = React.useState("EUR");
  const { period, changePeriod, scaleNote, onScaledChange } =
    useBudgetPeriod("month");
  const [spend, setSpend] = React.useState("45000");
  const [customers, setCustomers] = React.useState("120");

  const s = parseNumber(spend);
  const c = parseNumber(customers);
  const cac = c > 0 ? s / c : 0;

  return (
    <CalculatorShell
      title="CAC calculator"
      description="Customer acquisition cost = sales & marketing spend ÷ new customers won in the same period."
      guide={getCalculatorGuide("saas/cac")}
    >
      <CollapsibleSection title="Period inputs">
        <CalculatorPeriodHeader
          period={period}
          onPeriodChange={(p) =>
            changePeriod(p, [
              { value: spend, setValue: setSpend, kind: "spend" },
              { value: customers, setValue: setCustomers, kind: "count" },
            ])
          }
          scaleNote={scaleNote}
        />
        <NumberField
          id="spend"
          label="Sales & marketing spend (period)"
          hint="Numerator for CAC. Total S&M spend in the same period as new customers."
          value={spend}
          onChange={onScaledChange(setSpend)}
          currencySelector={{ value: currency, onChange: setCurrency }}
        />
        <NumberField
          id="cust"
          label="New customers acquired"
          hint="Denominator for CAC. New paying customers won in that period."
          value={customers}
          onChange={onScaledChange(setCustomers)}
        />
      </CollapsibleSection>

      <ResultsCard>
        {c <= 0 ? (
          <p className="text-sm text-muted-foreground">
            Enter a positive customer count to compute CAC.
          </p>
        ) : (
          <>
            <PeriodBudgetEquivalents amount={s} period={period} currency={currency} />
            <ResultRow
            label="CAC"
            hint="Formula: sales & marketing spend ÷ new customers. Cost to acquire one customer."
            value={formatCurrency(cac, undefined, currency)}
            variant="default"
          />
          </>
        )}
      </ResultsCard>
    </CalculatorShell>
  );
}

"use client";

import * as React from "react";
import { CalculatorPeriodHeader } from "@/components/calculator/calculator-period-header";
import { PeriodBudgetEquivalents } from "@/components/calculator/period-budget-equivalents";
import { useBudgetPeriod } from "@/components/calculator/use-budget-period";
import { CalculatorShell, ResultsCard } from "@/components/calculator/shell";
import { CollapsibleSection } from "@/components/ui/collapsible";
import { NumberField, ResultRow } from "@/components/calculator/fields";
import { formatCurrency, parseNumber } from "@/lib/format";
import { buildResultHint } from "@/lib/field-hint-text";
import { variantForLtvCacRatio } from "@/lib/result-variant";
import { getCalculatorGuide } from "@/lib/calculator-guides";

export default function LtvCacCalculator() {
  const [currency, setCurrency] = React.useState("EUR");
  const { period, changePeriod, scaleNote, onScaledChange } =
    useBudgetPeriod("month");
  const [arpu, setArpu] = React.useState("49");
  const [marginPct, setMarginPct] = React.useState("72");
  const [lifetimeMonths, setLifetimeMonths] = React.useState("24");
  const [cacSpend, setCacSpend] = React.useState("45000");
  const [newCustomers, setNewCustomers] = React.useState("120");

  const arpuVal = parseNumber(arpu);
  const margin = (parseNumber(marginPct) || 0) / 100;
  const months = parseNumber(lifetimeMonths);
  const spend = parseNumber(cacSpend);
  const nNew = parseNumber(newCustomers);

  const grossProfitPerMonth = arpuVal * margin;
  const ltv = grossProfitPerMonth * months;
  const cac = nNew > 0 ? spend / nNew : 0;
  const ratio = cac > 0 ? ltv / cac : 0;

  return (
    <CalculatorShell
      title="LTV & LTV:CAC calculator"
      description="Simple lifetime value from ARPU, gross margin, and average lifetime — compared to CAC from spend ÷ new logos."
      guide={getCalculatorGuide("saas/ltv-cac")}
    >
      <CollapsibleSection title="LTV inputs">
        <CalculatorPeriodHeader
          period={period}
          onPeriodChange={(p) =>
            changePeriod(p, [
              { value: cacSpend, setValue: setCacSpend, kind: "spend" },
              { value: newCustomers, setValue: setNewCustomers, kind: "count" },
            ])
          }
          scaleNote={scaleNote}
        />
        <NumberField
          id="arpu"
          label="ARPU (per month)"
          hint="Average revenue per user per month. Used in: grossProfitPerMonth = arpuVal × margin."
          value={arpu}
          onChange={setArpu}
          currencySelector={{ value: currency, onChange: setCurrency }}
        />
        <NumberField
          id="margin"
          label="Gross margin on recurring revenue"
          hint="Gross margin (%); divided by 100 in code. Used in: grossProfitPerMonth = arpuVal × margin."
          value={marginPct}
          onChange={setMarginPct}
          unit="%"
          step="0.1"
        />
        <NumberField
          id="life"
          label="Average customer lifetime"
          hint="Average customer lifetime in months. Used in: ltv = grossProfitPerMonth × months."
          value={lifetimeMonths}
          onChange={setLifetimeMonths}
          unit="months"
          step="0.1"
        />
      </CollapsibleSection>

      <CollapsibleSection title="CAC inputs (same period)">
        <NumberField
          id="spend"
          label="Sales & marketing spend"
          hint="S&M spend in the period. Used in: cac = spend ÷ nNew."
          value={cacSpend}
          onChange={onScaledChange(setCacSpend)}
          currencySelector={{ value: currency, onChange: setCurrency }}
        />
        <NumberField
          id="new"
          label="New customers acquired"
          hint="New customers in the same period. Used in: cac = spend ÷ nNew."
          value={newCustomers}
          onChange={onScaledChange(setNewCustomers)}
        />
      </CollapsibleSection>

      <ResultsCard>
        {spend > 0 ? (
          <PeriodBudgetEquivalents amount={spend} period={period} currency={currency} />
        ) : null}
        <ResultRow
          label="Gross profit per customer-month"
          hint={buildResultHint({
            meaning:
              "Gross profit you keep per customer each month, after applying margin to ARPU.",
            formula: "ARPU × (margin % ÷ 100).",
          })}
          value={formatCurrency(grossProfitPerMonth, undefined, currency)}
        />
        <ResultRow
          label="Modeled LTV (gross profit × lifetime)"
          hint={buildResultHint({
            meaning:
              "Total gross profit expected from one customer over their lifetime — a simple LTV model.",
            formula: "gross profit per customer-month × lifetime (months).",
          })}
          value={formatCurrency(ltv, undefined, currency)}
        />
        <ResultRow
          label="CAC"
          hint={buildResultHint({
            meaning:
              "Average cost to win one new customer in this period. Compare to LTV — many SaaS teams target LTV:CAC of 3× or better.",
            formula: "sales & marketing spend ÷ new customers.",
          })}
          value={nNew > 0 ? formatCurrency(cac, undefined, currency) : "—"}
        />
        <ResultRow
          label="LTV:CAC"
          hint={buildResultHint({
            meaning:
              "How many times lifetime gross profit covers acquisition cost. Below 1× means you lose money on the unit economics.",
            formula: "LTV ÷ CAC.",
          })}
          value={cac > 0 ? `${ratio.toFixed(2)}×` : "—"}
          variant={cac > 0 ? variantForLtvCacRatio(ratio) : "default"}
        />
      </ResultsCard>
    </CalculatorShell>
  );
}

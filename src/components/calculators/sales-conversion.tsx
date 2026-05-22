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

export default function SalesConversionCalculator() {
  const [currency, setCurrency] = React.useState("EUR");
  const { period, changePeriod, scaleNote, onScaledChange } =
    useBudgetPeriod("month");
  const [leads, setLeads] = React.useState("120");
  const [qualifiedPct, setQualifiedPct] = React.useState("35");
  const [winPct, setWinPct] = React.useState("22");
  const [dealSize, setDealSize] = React.useState("4800");

  const L = parseNumber(leads);
  const q = (parseNumber(qualifiedPct) || 0) / 100;
  const w = (parseNumber(winPct) || 0) / 100;
  const ticket = parseNumber(dealSize);

  const qualified = L * q;
  const wins = qualified * w;
  const pipeline = wins * ticket;
  const pipelineVariant =
    L > 0 && pipeline <= 0 ? ("warning" as const) : ("default" as const);

  return (
    <CalculatorShell
      title="Lead-to-revenue calculator"
      description="Simple funnel: leads × qualification × win rate × average deal size."
      guide={getCalculatorGuide("sales/lead-to-revenue")}
    >
      <CollapsibleSection title="Pipeline inputs">
        <CalculatorPeriodHeader
          period={period}
          onPeriodChange={(p) =>
            changePeriod(p, [
              { value: leads, setValue: setLeads, kind: "count" },
            ])
          }
          scaleNote={scaleNote}
        />
        <NumberField
          id="leads"
          label="New leads (period)"
          hint="New leads in the period. Used in: qualified = L × q."
          value={leads}
          onChange={onScaledChange(setLeads)}
        />
        <div className="grid gap-3 sm:grid-cols-2">
          <NumberField
            id="qual"
            label="Lead → qualified"
            hint="Lead-to-qualified rate (%); divided by 100 in code. Used in: qualified = L × q."
            value={qualifiedPct}
            onChange={setQualifiedPct}
            unit="%"
            step="0.1"
          />
          <NumberField
            id="win"
            label="Qualified → won"
            hint="Qualified-to-won rate (%); divided by 100 in code. Used in: wins = qualified × w."
            value={winPct}
            onChange={setWinPct}
            unit="%"
            step="0.1"
          />
        </div>
        <NumberField
          id="deal"
          label="Average deal size"
          hint="Average won deal value. Used in: pipeline = wins × ticket."
          value={dealSize}
          onChange={setDealSize}
          currencySelector={{ value: currency, onChange: setCurrency }}
        />
      </CollapsibleSection>

      <ResultsCard>
        <PeriodBudgetEquivalents amount={pipeline} period={period} currency={currency} />
        <ResultRow
          label="Qualified opportunities"
          hint="Formula: L × q."
          value={Math.round(qualified)}
        />
        <ResultRow
          label="Expected wins"
          hint="Formula: qualified × w."
          value={wins.toFixed(1)}
        />
        <ResultRow
          label="Expected revenue"
          hint="Formula: wins × ticket."
          value={formatCurrency(pipeline, undefined, currency)}
          variant={pipelineVariant}
        />
      </ResultsCard>
    </CalculatorShell>
  );
}

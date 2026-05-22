"use client";

import * as React from "react";
import { CalculatorPeriodHeader } from "@/components/calculator/calculator-period-header";
import { useBudgetPeriod } from "@/components/calculator/use-budget-period";
import { CalculatorShell, ResultsCard } from "@/components/calculator/shell";
import { CollapsibleSection } from "@/components/ui/collapsible";
import { NumberField, ResultRow } from "@/components/calculator/fields";
import { formatCurrency, parseNumber } from "@/lib/format";
import { getCalculatorGuide } from "@/lib/calculator-guides";
import {
  type ResultValueVariant,
  variantForMrrTrend,
} from "@/lib/result-variant";

export default function SaasMrrCalculator() {
  const [currency, setCurrency] = React.useState("EUR");
  const { period, changePeriod, scaleNote } = useBudgetPeriod("month");
  const [customers, setCustomers] = React.useState("420");
  const [arpu, setArpu] = React.useState("49");
  const [expansionPct, setExpansionPct] = React.useState("8");
  const [churnPct, setChurnPct] = React.useState("4");

  const n = parseNumber(customers);
  const arpuVal = parseNumber(arpu);
  const expansion = (parseNumber(expansionPct) || 0) / 100;
  const churn = (parseNumber(churnPct) || 0) / 100;

  const baseMrr = n * arpuVal;
  const expansionMrr = baseMrr * expansion;
  const churnMrr = baseMrr * churn;
  const netNew = expansionMrr - churnMrr;
  const ending = baseMrr + netNew;
  const arr = ending * 12;
  const mrrTrend = variantForMrrTrend(ending, baseMrr);
  const churnDominatesVariant: ResultValueVariant =
    churnMrr > expansionMrr ? "warning" : "default";

  return (
    <CalculatorShell
      title="SaaS MRR calculator"
      description="Recurring revenue snapshot with simple expansion and churn applied to starting MRR."
      guide={getCalculatorGuide("saas/mrr")}
    >
      <CollapsibleSection title="Base subscription revenue">
        <CalculatorPeriodHeader
          period={period}
          onPeriodChange={(p) => changePeriod(p, [])}
          scaleNote={scaleNote}
        />
        <div className="grid gap-3 sm:grid-cols-2">
          <NumberField
            id="cust"
            label="Paying customers"
            hint="Paying customer count. Used in: baseMrr = n × arpuVal."
            value={customers}
            onChange={setCustomers}
          />
          <NumberField
            id="arpu"
            label="ARPU (average revenue per user / month)"
            hint="Monthly revenue per customer. Used in: baseMrr = n × arpuVal."
            value={arpu}
            onChange={setArpu}
            currencySelector={{ value: currency, onChange: setCurrency }}
          />
        </div>
      </CollapsibleSection>

      <CollapsibleSection title="Growth & churn (simple model)">
        <div className="grid gap-3 sm:grid-cols-2">
          <NumberField
            id="exp"
            label="Net expansion on base MRR"
            hint="Expansion on base MRR (%); divided by 100 in code. Used in: expansionMrr = baseMrr × expansion."
            value={expansionPct}
            onChange={setExpansionPct}
            unit="%"
            step="0.1"
          />
          <NumberField
            id="churn"
            label="Logo churn on base MRR"
            hint="Churn on base MRR (%); divided by 100 in code. Used in: churnMrr = baseMrr × churn."
            value={churnPct}
            onChange={setChurnPct}
            unit="%"
            step="0.1"
          />
        </div>
        <p className="text-[11px] text-muted-foreground">
          Modeled as starting MRR ± percentages — use your CRM exports for precise
          cohort math.
        </p>
      </CollapsibleSection>

      <ResultsCard>
        <ResultRow
          label="Starting MRR"
          hint="Formula: n × arpuVal."
          value={formatCurrency(baseMrr, undefined, currency)}
        />
        <ResultRow
          label="+ Expansion MRR"
          hint="Formula: baseMrr × expansion."
          value={formatCurrency(expansionMrr, undefined, currency)}
        />
        <ResultRow
          label="− Churn MRR"
          hint="Formula: baseMrr × churn."
          value={formatCurrency(churnMrr, undefined, currency)}
          variant={churnDominatesVariant}
        />
        <div className="h-px bg-border" />
        <ResultRow
          label="Ending MRR (modeled)"
          hint="Formula: baseMrr + netNew, where netNew = expansionMrr − churnMrr."
          value={formatCurrency(ending, undefined, currency)}
          variant={mrrTrend}
        />
        <ResultRow
          label="ARR (×12)"
          hint="Formula: ending × 12."
          value={formatCurrency(arr, undefined, currency)}
          variant={mrrTrend}
        />
      </ResultsCard>
    </CalculatorShell>
  );
}

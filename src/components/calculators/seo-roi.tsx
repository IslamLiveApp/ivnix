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
import {
  variantForMoneySigned,
  variantForRoiPercent,
} from "@/lib/result-variant";

export default function SeoRoiCalculator() {
  const { period, changePeriod, scaleNote, onScaledChange } =
    useBudgetPeriod("month");
  const [sessions, setSessions] = React.useState("18000");
  const [crPct, setCrPct] = React.useState("1.8");
  const [profitPerOrder, setProfitPerOrder] = React.useState("42");
  const [seoCost, setSeoCost] = React.useState("3500");
  const [currency, setCurrency] = React.useState("EUR");

  const ses = parseNumber(sessions);
  const cr = (parseNumber(crPct) || 0) / 100;
  const profitEach = parseNumber(profitPerOrder);
  const fixed = parseNumber(seoCost);

  const orders = ses * cr;
  const grossProfit = orders * profitEach;
  const net = grossProfit - fixed;
  const roi = fixed > 0 ? (net / fixed) * 100 : 0;

  return (
    <CalculatorShell
      title="SEO ROI calculator"
      description="Monthly organic sessions × conversion × profit per order − SEO cost."
      guide={getCalculatorGuide("organic-growth/seo-roi")}
    >
      <CollapsibleSection title="Organic funnel">
        <CalculatorPeriodHeader
          period={period}
          onPeriodChange={(p) =>
            changePeriod(p, [
              { value: sessions, setValue: setSessions, kind: "count" },
              { value: seoCost, setValue: setSeoCost, kind: "spend" },
            ])
          }
          scaleNote={scaleNote}
        />
        <NumberField
          id="sessions"
          label="Monthly organic sessions"
          hint="Monthly organic traffic. Used in: orders = ses × cr."
          value={sessions}
          onChange={onScaledChange(setSessions)}
        />
        <div className="grid gap-3 sm:grid-cols-2">
          <NumberField
            id="cr"
            label="Site conversion rate"
            hint="Session-to-order rate (%); divided by 100 in code. Used in: orders = ses × cr."
            value={crPct}
            onChange={setCrPct}
            unit="%"
            step="0.1"
          />
          <NumberField
            id="profit"
            label="Profit per order"
            hint="Gross profit per order. Used in: grossProfit = orders × profitEach."
            value={profitPerOrder}
            onChange={setProfitPerOrder}
            currencySelector={{ value: currency, onChange: setCurrency }}
          />
        </div>
      </CollapsibleSection>

      <CollapsibleSection title="Costs">
        <NumberField
          id="seoCost"
          label="Monthly SEO spend (tools + agency + payroll allocated)"
          hint="Monthly SEO cost. Used in: net = grossProfit − fixed; roi = net ÷ fixed × 100."
          value={seoCost}
          onChange={onScaledChange(setSeoCost)}
          currencySelector={{ value: currency, onChange: setCurrency }}
        />
      </CollapsibleSection>

      <ResultsCard>
        <PeriodBudgetEquivalents amount={fixed} period={period} currency={currency} />
        <ResultRow
          label="Estimated monthly orders"
          hint="Formula: ses × cr."
          value={Math.round(orders)}
        />
        <ResultRow
          label="Estimated gross profit"
          hint="Formula: orders × profitEach."
          value={formatCurrency(grossProfit, undefined, currency)}
          variant={variantForMoneySigned(grossProfit)}
        />
        <ResultRow
          label="Net after SEO cost"
          hint="Formula: grossProfit − fixed."
          value={formatCurrency(net, undefined, currency)}
          variant={variantForMoneySigned(net)}
        />
        <ResultRow
          label="ROI on SEO spend"
          hint="Formula: net ÷ fixed × 100."
          value={fixed > 0 ? `${roi.toFixed(1)}%` : "—"}
          variant={fixed > 0 ? variantForRoiPercent(roi) : "default"}
        />
      </ResultsCard>
    </CalculatorShell>
  );
}

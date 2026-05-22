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

export default function BundleUpliftCalculator() {
  const [currency, setCurrency] = React.useState("EUR");
  const { period, changePeriod, scaleNote, onScaledChange } =
    useBudgetPeriod("month");
  const [orders, setOrders] = React.useState("3200");
  const [attachPct, setAttachPct] = React.useState("22");
  const [addonProfit, setAddonProfit] = React.useState("12");

  const o = parseNumber(orders);
  const attach = (parseNumber(attachPct) || 0) / 100;
  const profitEach = parseNumber(addonProfit);

  const attachedOrders = o * attach;
  const incrementalProfit = attachedOrders * profitEach;

  return (
    <CalculatorShell
      title="Bundle / upsell uplift"
      description="Orders × attach rate × incremental gross profit per attachment — simple add-on revenue lift."
      guide={getCalculatorGuide("ecommerce/bundle-uplift")}
    >
      <CollapsibleSection title="Inputs">
        <CalculatorPeriodHeader
          period={period}
          onPeriodChange={(p) =>
            changePeriod(p, [
              { value: orders, setValue: setOrders, kind: "count" },
            ])
          }
          scaleNote={scaleNote}
        />
        <NumberField
          id="ord"
          label="Base orders (period)"
          hint="Total base orders in the period. Used in: attachedOrders = o × attach; per-order profit uses o as divisor."
          value={orders}
          onChange={onScaledChange(setOrders)}
        />
        <NumberField
          id="attach"
          label="Attach rate (buy base also buy add-on)"
          hint="Share of base orders with an add-on (%); divided by 100 in code. Used in: attachedOrders = o × attach."
          value={attachPct}
          onChange={setAttachPct}
          unit="%"
          step="0.1"
        />
        <NumberField
          id="profit"
          label="Incremental gross profit per add-on"
          hint="Gross profit per attached add-on. Used in: incrementalProfit = attachedOrders × profitEach."
          value={addonProfit}
          onChange={setAddonProfit}
          currencySelector={{ value: currency, onChange: setCurrency }}
        />
      </CollapsibleSection>

      <ResultsCard>
        <PeriodBudgetEquivalents
          amount={incrementalProfit}
          period={period}
          currency={currency}
        />
        <ResultRow
          label="Orders with add-on"
          hint="Formula: o × attach."
          value={attachedOrders.toFixed(0)}
        />
        <ResultRow
          label="Incremental gross profit"
          hint="Formula: attachedOrders × profitEach."
          value={formatCurrency(incrementalProfit, undefined, currency)}
          variant={variantForMoneySigned(incrementalProfit)}
        />
        <ResultRow
          label="Add-on profit per base order"
          hint="Formula: incrementalProfit ÷ o."
          value={o > 0 ? formatCurrency(incrementalProfit / o, undefined, currency) : "—"}
        />
      </ResultsCard>
    </CalculatorShell>
  );
}

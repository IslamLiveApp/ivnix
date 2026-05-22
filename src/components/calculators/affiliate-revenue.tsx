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

export default function AffiliateRevenueCalculator() {
  const [currency, setCurrency] = React.useState("EUR");
  const { period, changePeriod, scaleNote, onScaledChange } =
    useBudgetPeriod("month");
  const [clicks, setClicks] = React.useState("28000");
  const [crPct, setCrPct] = React.useState("2.4");
  const [aov, setAov] = React.useState("76");
  const [commissionPct, setCommissionPct] = React.useState("8");

  const c = parseNumber(clicks);
  const cr = (parseNumber(crPct) || 0) / 100;
  const orderValue = parseNumber(aov);
  const comm = (parseNumber(commissionPct) || 0) / 100;

  const orders = c * cr;
  const revenue = orders * orderValue;
  const affiliateCut = revenue * comm;
  const merchantNet = revenue - affiliateCut;

  return (
    <CalculatorShell
      title="Affiliate commission model"
      description="Traffic × conversion × basket revenue × commission rate — payout to partners and net to merchant."
      guide={getCalculatorGuide("influencers/affiliate-revenue")}
    >
      <CollapsibleSection title="Funnel & deal">
        <CalculatorPeriodHeader
          period={period}
          onPeriodChange={(p) =>
            changePeriod(p, [
              { value: clicks, setValue: setClicks, kind: "count" },
            ])
          }
          scaleNote={scaleNote}
        />
        <NumberField
          id="clk"
          label="Clicks to merchant"
          hint="Top of funnel. Used in: orders = c × cr."
          value={clicks}
          onChange={onScaledChange(setClicks)}
        />
        <NumberField
          id="cr"
          label="Click → purchase rate"
          hint="Click-to-order rate (%); divided by 100 in code. Used in: orders = c × cr."
          value={crPct}
          onChange={setCrPct}
          unit="%"
          step="0.1"
        />
        <NumberField
          id="aov"
          label="Average order value"
          hint="Revenue per order. Used in: revenue = orders × orderValue."
          value={aov}
          onChange={setAov}
          currencySelector={{ value: currency, onChange: setCurrency }}
        />
        <NumberField
          id="comm"
          label="Affiliate commission"
          hint="Share of attributed revenue (%); divided by 100 in code. Used in: affiliateCut = revenue × comm."
          value={commissionPct}
          onChange={setCommissionPct}
          unit="% of attributed revenue"
          step="0.1"
        />
      </CollapsibleSection>

      <ResultsCard>
        <PeriodBudgetEquivalents amount={revenue} period={period} currency={currency} />
        <ResultRow
          label="Attributed orders"
          hint="Formula: c × cr."
          value={orders.toFixed(1)}
        />
        <ResultRow
          label="Attributed revenue"
          hint="Formula: orders × orderValue."
          value={formatCurrency(revenue, undefined, currency)}
        />
        <ResultRow
          label="Affiliate payout"
          hint="Formula: revenue × comm."
          value={formatCurrency(affiliateCut, undefined, currency)}
        />
        <ResultRow
          label="Merchant net (after commission)"
          hint="Formula: revenue − affiliateCut."
          value={formatCurrency(merchantNet, undefined, currency)}
          variant={variantForMoneySigned(merchantNet)}
        />
      </ResultsCard>
    </CalculatorShell>
  );
}

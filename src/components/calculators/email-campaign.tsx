"use client";

import * as React from "react";
import { CalculatorPeriodHeader } from "@/components/calculator/calculator-period-header";
import { PeriodBudgetEquivalents } from "@/components/calculator/period-budget-equivalents";
import { useBudgetPeriod } from "@/components/calculator/use-budget-period";
import { CalculatorShell, ResultsCard } from "@/components/calculator/shell";
import { CollapsibleSection } from "@/components/ui/collapsible";
import { NumberField, ResultRow } from "@/components/calculator/fields";
import { formatCurrency, formatNumber, parseNumber } from "@/lib/format";
import { variantForMoneySigned } from "@/lib/result-variant";
import { getCalculatorGuide } from "@/lib/calculator-guides";

export default function EmailCampaignCalculator() {
  const [currency, setCurrency] = React.useState("EUR");
  const { period, changePeriod, scaleNote, onScaledChange } =
    useBudgetPeriod("month");
  const [listSize, setListSize] = React.useState("45000");
  const [openPct, setOpenPct] = React.useState("24");
  const [clickPct, setClickPct] = React.useState("8");
  const [purchasePct, setPurchasePct] = React.useState("3.2");
  const [aov, setAov] = React.useState("68");

  const n = parseNumber(listSize);
  const open = (parseNumber(openPct) || 0) / 100;
  const clickOfOpen = (parseNumber(clickPct) || 0) / 100;
  const buyOfClick = (parseNumber(purchasePct) || 0) / 100;
  const orderValue = parseNumber(aov);

  const opens = n * open;
  const clicks = opens * clickOfOpen;
  const purchases = clicks * buyOfClick;
  const revenue = purchases * orderValue;

  return (
    <CalculatorShell
      title="Email campaign revenue"
      description="Send volume × open rate × click rate (of opens) × purchase rate (of clicks) × average order value."
      guide={getCalculatorGuide("paid-growth/email-campaign")}
    >
      <CollapsibleSection title="Campaign">
        <CalculatorPeriodHeader
          period={period}
          onPeriodChange={(p) =>
            changePeriod(p, [
              { value: listSize, setValue: setListSize, kind: "count" },
            ])
          }
          scaleNote={scaleNote}
        />
        <NumberField
          id="list"
          label="Messages delivered"
          hint="Emails delivered. Used in: opens = n × open."
          value={listSize}
          onChange={onScaledChange(setListSize)}
        />
        <div className="grid gap-3 sm:grid-cols-2">
          <NumberField
            id="open"
            label="Open rate"
            hint="Share of delivered emails opened (%); divided by 100 in code. Used in: opens = n × open."
            value={openPct}
            onChange={setOpenPct}
            unit="%"
            step="0.1"
          />
          <NumberField
            id="click"
            label="Click rate (of opens)"
            hint="Clicks per open (%); divided by 100 in code. Used in: clicks = opens × clickOfOpen."
            value={clickPct}
            onChange={setClickPct}
            unit="%"
            step="0.1"
          />
          <NumberField
            id="buy"
            label="Purchase rate (of clicks)"
            hint="Orders per click (%); divided by 100 in code. Used in: purchases = clicks × buyOfClick."
            value={purchasePct}
            onChange={setPurchasePct}
            unit="%"
            step="0.1"
          />
          <NumberField
            id="aov"
            label="Average order value"
            hint="Revenue per order. Used in: revenue = purchases × orderValue."
            value={aov}
            onChange={setAov}
            currencySelector={{ value: currency, onChange: setCurrency }}
          />
        </div>
      </CollapsibleSection>

      <ResultsCard>
        <PeriodBudgetEquivalents amount={revenue} period={period} currency={currency} />
        <ResultRow
          label="Estimated opens"
          hint="Formula: n × open."
          value={formatNumber(opens)}
        />
        <ResultRow
          label="Estimated clicks"
          hint="Formula: opens × clickOfOpen."
          value={formatNumber(clicks)}
        />
        <ResultRow
          label="Estimated orders"
          hint="Formula: clicks × buyOfClick."
          value={purchases.toFixed(1)}
        />
        <ResultRow
          label="Estimated revenue"
          hint="Formula: purchases × orderValue."
          value={formatCurrency(revenue, undefined, currency)}
          variant={variantForMoneySigned(revenue)}
        />
      </ResultsCard>
    </CalculatorShell>
  );
}

"use client";

import * as React from "react";
import { CalculatorShell, ResultsCard } from "@/components/calculator/shell";
import { SpendPeriodField } from "@/components/calculator/spend-period-field";
import { CollapsibleSection } from "@/components/ui/collapsible";
import { NumberField, ResultRow } from "@/components/calculator/fields";
import { formatCurrency, formatNumber, parseNumber } from "@/lib/format";
import {
  paidAdsFieldHints,
  paidAdsRuleOfThumb,
} from "@/lib/paid-ads-content";
import { PeriodScaleNote } from "@/components/calculator/period-scale-note";
import { PeriodBudgetEquivalents } from "@/components/calculator/period-budget-equivalents";
import { useBudgetPeriod } from "@/components/calculator/use-budget-period";
import { SPEND_PERIOD_ADJECTIVE } from "@/lib/spend-period";
import {
  variantForCpaVsAov,
  variantForMoneySigned,
  variantForRoasMultiple,
} from "@/lib/result-variant";

type Platform = "facebook" | "google";

export default function PaidAdsCalculator({ platform }: { platform: Platform }) {
  const [currency, setCurrency] = React.useState("EUR");
  const { period: spendPeriod, changePeriod, scaleNote, onScaledChange } =
    useBudgetPeriod("month");
  const title =
    platform === "facebook" ? "Facebook Ads calculator" : "Google Ads calculator";
  const description =
    "Estimate clicks, conversions, revenue, ROAS, CPA, and CPC from spend and funnel rates.";

  const [spend, setSpend] = React.useState("1500");
  const [impressions, setImpressions] = React.useState("420000");
  const [ctrPct, setCtrPct] = React.useState("1.2");
  const [crPct, setCrPct] = React.useState("2.5");
  const [aov, setAov] = React.useState("89");

  const hints = paidAdsFieldHints(platform, spendPeriod);
  const guide = paidAdsRuleOfThumb(platform);

  const s = parseNumber(spend);
  const imp = parseNumber(impressions);
  const ctr = (parseNumber(ctrPct) || 0) / 100;
  const cr = (parseNumber(crPct) || 0) / 100;
  const orderValue = parseNumber(aov);

  const clicks = imp * ctr;
  const conversions = clicks * cr;
  const revenue = conversions * orderValue;
  const roas = s > 0 ? revenue / s : 0;
  const cpa = conversions > 0 ? s / conversions : 0;
  const cpc = clicks > 0 ? s / clicks : 0;

  return (
    <CalculatorShell
      title={title}
      description={description}
      guide={guide}
    >
      <CollapsibleSection title="Spend & delivery">
        <SpendPeriodField
          period={spendPeriod}
          onPeriodChange={(p) =>
            changePeriod(p, [
              { value: spend, setValue: setSpend, kind: "spend" },
              { value: impressions, setValue: setImpressions, kind: "impressions" },
            ])
          }
          spendId="spend"
          spendLabel={`${SPEND_PERIOD_ADJECTIVE[spendPeriod]} ad spend`}
          spendHint={hints.spend}
          spendValue={spend}
          onSpendChange={onScaledChange(setSpend)}
          currencySelector={{ value: currency, onChange: setCurrency }}
        />
        <PeriodScaleNote message={scaleNote} />
        <NumberField
          id="impressions"
          label="Impressions"
          hint={hints.impressions}
          value={impressions}
          onChange={onScaledChange(setImpressions)}
          unit="imps"
        />
      </CollapsibleSection>

      <CollapsibleSection title="Funnel performance">
        <div className="grid gap-3 sm:grid-cols-2">
          <NumberField
            id="ctr"
            label="CTR"
            hint={hints.ctr}
            value={ctrPct}
            onChange={setCtrPct}
            unit="%"
            step="0.1"
          />
          <NumberField
            id="cr"
            label="Conversion rate (click → goal)"
            hint={hints.cr}
            value={crPct}
            onChange={setCrPct}
            unit="%"
            step="0.1"
          />
        </div>
        <NumberField
          id="aov"
          label="Average order value"
          hint={hints.aov}
          value={aov}
          onChange={setAov}
          currencySelector={{ value: currency, onChange: setCurrency }}
        />
      </CollapsibleSection>

      <ResultsCard>
        {s <= 0 ? (
          <p className="text-sm text-muted-foreground">
            Enter spend to see modeled outcomes.
          </p>
        ) : (
          <>
            <PeriodBudgetEquivalents
              amount={s}
              period={spendPeriod}
              currency={currency}
            />
            <ResultRow
              label="Estimated clicks"
              hint={hints.clicks}
              value={formatNumber(clicks)}
            />
            <ResultRow
              label="Estimated conversions"
              hint={hints.conversions}
              value={formatNumber(conversions)}
            />
            <ResultRow
              label="Estimated revenue"
              hint={hints.revenue}
              value={formatCurrency(revenue, undefined, currency)}
            />
            <div className="h-px bg-border" />
            <ResultRow
              label="ROAS"
              hint={hints.roas}
              value={`${roas.toFixed(2)}x`}
              variant={variantForRoasMultiple(roas)}
            />
            <ResultRow
              label="CPA"
              hint={hints.cpa}
              value={cpa > 0 ? formatCurrency(cpa, undefined, currency) : "—"}
              variant={cpa > 0 ? variantForCpaVsAov(cpa, orderValue) : "default"}
            />
            <ResultRow
              label="CPC"
              hint={hints.cpc}
              value={cpc > 0 ? formatCurrency(cpc, undefined, currency) : "—"}
            />
            <ResultRow
              label="Profit (rev − spend)"
              hint={hints.profit}
              value={formatCurrency(revenue - s, undefined, currency)}
              variant={variantForMoneySigned(revenue - s)}
            />
          </>
        )}
      </ResultsCard>
    </CalculatorShell>
  );
}

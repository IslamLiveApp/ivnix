"use client";

import * as React from "react";
import { CalculatorPeriodHeader } from "@/components/calculator/calculator-period-header";
import { useBudgetPeriod } from "@/components/calculator/use-budget-period";
import {
  CalculatorShell,
  ResultsCard,
  VerdictBanner,
} from "@/components/calculator/shell";
import { CollapsibleSection } from "@/components/ui/collapsible";
import { NumberField, ResultRow } from "@/components/calculator/fields";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { formatCurrency, formatNumber, parseNumber } from "@/lib/format";
import {
  variantForMoneySigned,
  variantForPriceVsBudget,
} from "@/lib/result-variant";
import { getCalculatorGuide } from "@/lib/calculator-guides";
import { influencerFieldHints } from "@/lib/calculator-hints";

export default function InfluencerPricingCalculator() {
  const [currency, setCurrency] = React.useState("EUR");
  const { period, changePeriod, scaleNote, onScaledChange } =
    useBudgetPeriod("month");
  const hints = influencerFieldHints(period);
  const [views, setViews] = React.useState("100000");
  const [likes, setLikes] = React.useState("3500");
  const [comments, setComments] = React.useState("150");
  const [profit, setProfit] = React.useState("50");
  const [ctr, setCtr] = React.useState("1");
  const [cr, setCr] = React.useState("2");
  const [cpm, setCpm] = React.useState("20");
  const [contentMult, setContentMult] = React.useState("1");

  const v = parseNumber(views);
  const lk = parseNumber(likes);
  const cm = parseNumber(comments);
  const profitPerSale = parseNumber(profit);
  const ctrDec = (parseNumber(ctr) || 1) / 100;
  const crDec = (parseNumber(cr) || 2) / 100;
  const cpmVal = parseNumber(cpm) || 20;
  const mult = parseNumber(contentMult) || 1;

  const er = v > 0 ? ((lk + cm) / v) * 100 : 0;
  let erMult = 1;
  if (er >= 5) erMult = 1.2;
  else if (er >= 3) erMult = 1.1;
  else if (er < 1) erMult = 0.8;

  const baseCPMPrice = v > 0 ? (v / 1000) * cpmVal * erMult * mult : 0;
  const clicks = v * ctrDec;
  const estSales = clicks * crDec;
  const revenueValue = estSales * profitPerSale;
  const maxBudgetVal = revenueValue;

  let erVariant: "success" | "warning" | "default" = "default";
  if (er >= 5) {
    erVariant = "success";
  } else if (er < 2 && v > 0) {
    erVariant = "warning";
  }

  const showVerdict = v > 0 && profitPerSale > 0;
  let verdict: { tone: "success" | "warning" | "destructive"; body: React.ReactNode } | null =
    null;
  if (showVerdict) {
    const roiProfit = maxBudgetVal - baseCPMPrice;
    if (baseCPMPrice <= maxBudgetVal * 0.8) {
      verdict = {
        tone: "success",
        body: (
          <>
            <strong>Good deal</strong> — CPM price is well within your budget.
            Expected profit vs modeled revenue:{" "}
            {formatCurrency(roiProfit, undefined, currency)}.
          </>
        ),
      };
    } else if (baseCPMPrice <= maxBudgetVal) {
      verdict = {
        tone: "warning",
        body: (
          <>
            <strong>Tight</strong> — near break-even. Negotiate down or verify CTR
            with the creator.
          </>
        ),
      };
    } else {
      verdict = {
        tone: "destructive",
        body: (
          <>
            <strong>Risky</strong> — CPM price exceeds your max budget. Consider a
            lower CPM or an affiliate deal.
          </>
        ),
      };
    }
  }

  return (
    <CalculatorShell
      title="Influencer pricing calculator"
      description="Estimate a fair sponsorship price based on CPM, engagement, and your profit per sale."
      guide={getCalculatorGuide("influencers/pricing")}
    >
      <CollapsibleSection title="Video metrics">
        <CalculatorPeriodHeader
          period={period}
          onPeriodChange={(p) =>
            changePeriod(p, [
              { value: views, setValue: setViews, kind: "impressions" },
              { value: likes, setValue: setLikes, kind: "count" },
              { value: comments, setValue: setComments, kind: "count" },
            ])
          }
          scaleNote={scaleNote}
        />
        <NumberField
          id="views"
          label="Average views (last 10 videos)"
          hint={hints.views}
          value={views}
          onChange={onScaledChange(setViews)}
          unit="views"
          placeholder="100000"
        />
        <div className="grid gap-3 sm:grid-cols-2">
          <NumberField
            id="likes"
            label="Avg. likes per video"
            hint={hints.likes}
            value={likes}
            onChange={onScaledChange(setLikes)}
            unit="likes"
            placeholder="3500"
          />
          <NumberField
            id="comments"
            label="Avg. comments per video"
            hint={hints.comments}
            value={comments}
            onChange={onScaledChange(setComments)}
            unit="comments"
            placeholder="150"
          />
        </div>
      </CollapsibleSection>

      <CollapsibleSection title="Your product & business">
        <div className="grid gap-3 sm:grid-cols-2">
          <NumberField
            id="profit"
            label="Profit per sale"
            hint={hints.profit}
            value={profit}
            onChange={setProfit}
            currencySelector={{ value: currency, onChange: setCurrency }}
            placeholder="50"
          />
          <NumberField
            id="ctr"
            label="Click-through rate (CTR)"
            hint={hints.ctr}
            value={ctr}
            onChange={setCtr}
            unit="%"
            placeholder="1"
            step="0.1"
          />
        </div>
        <NumberField
          id="cr"
          label="Conversion rate (website → sale)"
          hint={hints.cr}
          value={cr}
          onChange={setCr}
          unit="%"
          placeholder="2"
          step="0.1"
        />
      </CollapsibleSection>

      <CollapsibleSection title="CPM settings">
        <div className="grid gap-3 sm:grid-cols-2">
          <NumberField
            id="cpm"
            label="CPM rate (per 1k impressions)"
            hint={hints.cpm}
            value={cpm}
            onChange={setCpm}
            currencySelector={{ value: currency, onChange: setCurrency }}
            placeholder="20"
            step="1"
          />
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="content-type" className="text-xs font-medium text-muted-foreground">
              Content type
            </Label>
            <select
              id="content-type"
              value={contentMult}
              onChange={(e) => setContentMult(e.target.value)}
              className={cn(
                "flex h-9 w-full rounded-md border border-input bg-secondary/40 px-3 py-2 text-sm shadow-sm ring-offset-background focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
              )}
            >
              <option value="1">Shoutout (60s)</option>
              <option value="1.5">Dedicated video</option>
            </select>
          </div>
        </div>
        <p className="text-[11px] text-muted-foreground">
          Typical CPM often falls around 15–30 per 1k in major markets — tune for yours.
        </p>
      </CollapsibleSection>

      <ResultsCard>
        {v <= 0 ? (
          <p className="text-sm text-muted-foreground">
            Enter views to see engagement-based pricing and funnel estimates.
          </p>
        ) : (
          <>
            <ResultRow
              label="Engagement rate"
              hint={hints.er}
              value={`${er.toFixed(1)}%`}
              variant={erVariant}
            />
            <ResultRow
              label="CPM-based fair price"
              hint={hints.cpmPrice}
              value={formatCurrency(baseCPMPrice, undefined, currency)}
              variant={
                profitPerSale > 0
                  ? variantForPriceVsBudget(baseCPMPrice, maxBudgetVal)
                  : "default"
              }
            />
            <ResultRow
              label="Max budget (break-even on modeled profit)"
              hint={hints.maxBudget}
              value={
                profitPerSale > 0 ? formatCurrency(maxBudgetVal, undefined, currency) : "—"
              }
            />
            <div className="h-px bg-border" />
            <ResultRow
              label="Estimated clicks"
              hint={hints.clicks}
              value={formatNumber(clicks)}
            />
            <ResultRow
              label="Estimated sales"
              hint={hints.sales}
              value={formatNumber(estSales)}
            />
            <ResultRow
              label="Estimated gross profit (modeled)"
              hint={hints.grossProfit}
              value={
                profitPerSale > 0 ? formatCurrency(revenueValue, undefined, currency) : "—"
              }
              variant={
                profitPerSale > 0 ? variantForMoneySigned(revenueValue) : "default"
              }
            />
            {verdict ? (
              <VerdictBanner tone={verdict.tone}>{verdict.body}</VerdictBanner>
            ) : null}
          </>
        )}
      </ResultsCard>
    </CalculatorShell>
  );
}

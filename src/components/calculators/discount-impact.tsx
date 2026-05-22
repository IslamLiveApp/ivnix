"use client";

import * as React from "react";
import { CalculatorPeriodHeader } from "@/components/calculator/calculator-period-header";
import { useBudgetPeriod } from "@/components/calculator/use-budget-period";
import { CalculatorShell, ResultsCard } from "@/components/calculator/shell";
import { CollapsibleSection } from "@/components/ui/collapsible";
import { NumberField, ResultRow } from "@/components/calculator/fields";
import { formatCurrency, formatPercent, parseNumber } from "@/lib/format";
import { variantForMarginPercent, variantForMoneySigned } from "@/lib/result-variant";
import { getCalculatorGuide } from "@/lib/calculator-guides";

export default function DiscountImpactCalculator() {
  const [currency, setCurrency] = React.useState("EUR");
  const { period, changePeriod, scaleNote } = useBudgetPeriod("month");
  const [price, setPrice] = React.useState("89");
  const [variableCost, setVariableCost] = React.useState("38");
  const [discountPct, setDiscountPct] = React.useState("15");

  const p = parseNumber(price);
  const v = parseNumber(variableCost);
  const d = (parseNumber(discountPct) || 0) / 100;

  const profitFull = p - v;
  const effectivePrice = p * (1 - d);
  const profitDisc = effectivePrice - v;
  const volumeLift =
    profitDisc > 0 && profitFull > 0 ? profitFull / profitDisc : 0;
  const marginFullPct = p > 0 ? (profitFull / p) * 100 : 0;
  const marginDiscPct =
    effectivePrice > 0 ? (profitDisc / effectivePrice) * 100 : 0;

  return (
    <CalculatorShell
      title="Discount impact on profit"
      description="Compare unit profit before and after a price cut — and how many more units you must sell (at the discounted margin) to earn the same gross profit as before."
      guide={getCalculatorGuide("ecommerce/discount-impact")}
    >
      <CollapsibleSection title="Unit economics">
        <CalculatorPeriodHeader
          period={period}
          onPeriodChange={(p) => changePeriod(p, [])}
          scaleNote={scaleNote}
        />
        <NumberField
          id="price"
          label="Selling price (before discount)"
          hint="List price per unit. Used in: profitFull = p − v; effectivePrice = p × (1 − d)."
          value={price}
          onChange={setPrice}
          currencySelector={{ value: currency, onChange: setCurrency }}
        />
        <NumberField
          id="var"
          label="Variable cost per unit"
          hint="Cost per unit sold. Used in: profitFull = p − v; profitDisc = effectivePrice − v."
          value={variableCost}
          onChange={setVariableCost}
          currencySelector={{ value: currency, onChange: setCurrency }}
        />
        <NumberField
          id="disc"
          label="Discount off list price"
          hint="Price reduction (%); divided by 100 in code. Used in: effectivePrice = p × (1 − d)."
          value={discountPct}
          onChange={setDiscountPct}
          unit="%"
          step="0.1"
        />
      </CollapsibleSection>

      <ResultsCard>
        {profitFull <= 0 ? (
          <p className="text-sm text-muted-foreground">
            List price must exceed variable cost for a meaningful comparison.
          </p>
        ) : (
          <>
            <ResultRow
              label="Gross profit per unit (no discount)"
              hint="Formula: p − v."
              value={formatCurrency(profitFull, undefined, currency)}
            />
            <ResultRow
              label="Margin % at list price"
              hint="Formula: profitFull ÷ p × 100."
              value={formatPercent(marginFullPct, 1)}
              variant={variantForMarginPercent(marginFullPct)}
            />
            <ResultRow
              label="Effective price after discount"
              hint="Formula: p × (1 − d)."
              value={formatCurrency(effectivePrice, undefined, currency)}
            />
            <ResultRow
              label="Gross profit per unit (with discount)"
              hint="Formula: effectivePrice − v."
              value={formatCurrency(profitDisc, undefined, currency)}
              variant={variantForMoneySigned(profitDisc)}
            />
            <ResultRow
              label="Margin % after discount"
              hint="Formula: profitDisc ÷ effectivePrice × 100."
              value={formatPercent(marginDiscPct, 1)}
              variant={variantForMarginPercent(marginDiscPct)}
            />
            <ResultRow
              label="Units needed vs before (same total gross profit)"
              hint="Formula: profitFull ÷ profitDisc. Volume multiplier to match pre-discount gross profit."
              value={
                profitDisc > 0
                  ? `${volumeLift.toFixed(2)}×`
                  : profitDisc <= 0
                    ? "∞ (loss per unit)"
                    : "—"
              }
              variant={profitDisc <= 0 ? "destructive" : volumeLift > 1.35 ? "warning" : "default"}
            />
          </>
        )}
      </ResultsCard>
    </CalculatorShell>
  );
}

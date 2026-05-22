"use client";

import * as React from "react";
import { CalculatorPeriodHeader } from "@/components/calculator/calculator-period-header";
import { useBudgetPeriod } from "@/components/calculator/use-budget-period";
import { CalculatorShell, ResultsCard } from "@/components/calculator/shell";
import { CollapsibleSection } from "@/components/ui/collapsible";
import { NumberField, ResultRow } from "@/components/calculator/fields";
import { formatCurrency, formatPercent, parseNumber } from "@/lib/format";
import { getCalculatorGuide } from "@/lib/calculator-guides";
import {
  variantForMarginPercent,
  variantForMoneySigned,
} from "@/lib/result-variant";

export default function ProductProfitCalculator() {
  const [currency, setCurrency] = React.useState("EUR");
  const { period, changePeriod, scaleNote } = useBudgetPeriod("month");
  const [price, setPrice] = React.useState("79");
  const [cogs, setCogs] = React.useState("28");
  const [shipping, setShipping] = React.useState("6");
  const [feePct, setFeePct] = React.useState("15");
  const [adCost, setAdCost] = React.useState("18");

  const p = parseNumber(price);
  const c = parseNumber(cogs);
  const sh = parseNumber(shipping);
  const feeRate = (parseNumber(feePct) || 0) / 100;
  const ads = parseNumber(adCost);

  const paymentFees = p * feeRate;
  const net = p - c - sh - paymentFees - ads;
  const margin = p > 0 ? (net / p) * 100 : 0;

  return (
    <CalculatorShell
      title="Product profit calculator"
      description="Selling price minus COGS, shipping, payment/marketplace fees, and ad cost per order."
      guide={getCalculatorGuide("ecommerce/product-profit")}
    >
      <CollapsibleSection title="Per-order economics">
        <CalculatorPeriodHeader
          period={period}
          onPeriodChange={(p) => changePeriod(p, [])}
          scaleNote={scaleNote}
        />
        <div className="grid gap-3 sm:grid-cols-2">
          <NumberField
            id="price"
            label="Selling price"
            hint="Price per order. Used in: paymentFees = p × feeRate; net = p − c − sh − paymentFees − ads; margin = net ÷ p × 100."
            value={price}
            onChange={setPrice}
            currencySelector={{ value: currency, onChange: setCurrency }}
          />
          <NumberField
            id="cogs"
            label="COGS (product cost)"
            hint="Product cost per order. Used in: net = p − c − sh − paymentFees − ads."
            value={cogs}
            onChange={setCogs}
            currencySelector={{ value: currency, onChange: setCurrency }}
          />
        </div>
        <NumberField
          id="ship"
          label="Shipping & fulfillment (allocated)"
          hint="Shipping and fulfillment per order. Used in: net = p − c − sh − paymentFees − ads."
          value={shipping}
          onChange={setShipping}
          currencySelector={{ value: currency, onChange: setCurrency }}
        />
        <div className="grid gap-3 sm:grid-cols-2">
          <NumberField
            id="fee"
            label="Payment + platform fees"
            hint="Fees as % of price; divided by 100 in code. Used in: paymentFees = p × feeRate."
            value={feePct}
            onChange={setFeePct}
            unit="% of price"
            step="0.1"
          />
          <NumberField
            id="ads"
            label="Ad cost per order (optional)"
            hint="Ad spend allocated per order. Used in: net = p − c − sh − paymentFees − ads."
            value={adCost}
            onChange={setAdCost}
            currencySelector={{ value: currency, onChange: setCurrency }}
          />
        </div>
      </CollapsibleSection>

      <ResultsCard>
        <ResultRow
          label="Fees (estimated)"
          hint="Formula: p × feeRate."
          value={formatCurrency(paymentFees, undefined, currency)}
        />
        <ResultRow
          label="Net profit per order"
          hint="Formula: p − c − sh − paymentFees − ads."
          value={formatCurrency(net, undefined, currency)}
          variant={variantForMoneySigned(net)}
        />
        <ResultRow
          label="Net margin"
          hint="Formula: net ÷ p × 100."
          value={formatPercent(margin, 1)}
          variant={variantForMarginPercent(margin)}
        />
      </ResultsCard>
    </CalculatorShell>
  );
}

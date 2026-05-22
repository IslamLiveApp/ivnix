"use client";

import * as React from "react";
import { CalculatorPeriodHeader } from "@/components/calculator/calculator-period-header";
import { useBudgetPeriod } from "@/components/calculator/use-budget-period";
import { CalculatorShell, ResultsCard } from "@/components/calculator/shell";
import { CollapsibleSection } from "@/components/ui/collapsible";
import { NumberField, ResultRow } from "@/components/calculator/fields";
import { formatCurrency, parseNumber } from "@/lib/format";
import { variantForMoneySigned } from "@/lib/result-variant";
import { getCalculatorGuide } from "@/lib/calculator-guides";
import { marketplaceFieldHints } from "@/lib/calculator-hints";

export default function MarketplaceFeesCalculator() {
  const [currency, setCurrency] = React.useState("EUR");
  const { period, changePeriod, scaleNote, onScaledChange } =
    useBudgetPeriod("month");
  const hints = marketplaceFieldHints(period);
  const [sale, setSale] = React.useState("120");
  const [commissionPct, setCommissionPct] = React.useState("12");
  const [paymentPct, setPaymentPct] = React.useState("2.9");

  const gross = parseNumber(sale);
  const comm = (parseNumber(commissionPct) || 0) / 100;
  const pay = (parseNumber(paymentPct) || 0) / 100;

  const commissionAmt = gross * comm;
  const paymentAmt = gross * pay;
  const net = gross - commissionAmt - paymentAmt;

  return (
    <CalculatorShell
      title="Marketplace & fees calculator"
      description="Net seller proceeds after commission and payment processing."
      guide={getCalculatorGuide("marketplace/fees")}
    >
      <CollapsibleSection title="Sale">
        <CalculatorPeriodHeader
          period={period}
          onPeriodChange={(p) =>
            changePeriod(p, [{ value: sale, setValue: setSale, kind: "spend" }])
          }
          scaleNote={scaleNote}
        />
        <NumberField
          id="sale"
          label="Gross sale amount"
          hint={hints.sale}
          value={sale}
          onChange={onScaledChange(setSale)}
          currencySelector={{ value: currency, onChange: setCurrency }}
        />
        <div className="grid gap-3 sm:grid-cols-2">
          <NumberField
            id="comm"
            label="Platform commission"
            hint={hints.commission}
            value={commissionPct}
            onChange={setCommissionPct}
            unit="%"
            step="0.1"
          />
          <NumberField
            id="pay"
            label="Payment processing"
            hint={hints.payment}
            value={paymentPct}
            onChange={setPaymentPct}
            unit="%"
            step="0.1"
          />
        </div>
      </CollapsibleSection>

      <ResultsCard>
        <ResultRow
          label="Commission"
          hint={hints.commissionAmt}
          value={formatCurrency(commissionAmt, undefined, currency)}
        />
        <ResultRow
          label="Payment fees"
          hint={hints.paymentAmt}
          value={formatCurrency(paymentAmt, undefined, currency)}
        />
        <ResultRow
          label="Estimated net"
          hint={hints.net}
          value={formatCurrency(net, undefined, currency)}
          variant={variantForMoneySigned(net)}
        />
      </ResultsCard>
    </CalculatorShell>
  );
}

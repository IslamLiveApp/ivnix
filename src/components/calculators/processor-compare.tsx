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
import { processorCompareFieldHints } from "@/lib/calculator-hints";

function netReceived(amount: number, fixed: number, pct: number) {
  const p = (pct || 0) / 100;
  return amount - fixed - amount * p;
}

export default function ProcessorCompareCalculator() {
  const [currency, setCurrency] = React.useState("EUR");
  const { period, changePeriod, scaleNote, onScaledChange } =
    useBudgetPeriod("month");
  const hints = processorCompareFieldHints(period);
  const [amount, setAmount] = React.useState("250");
  const [aFixed, setAFixed] = React.useState("0.25");
  const [aPct, setAPct] = React.useState("2.9");
  const [bFixed, setBFixed] = React.useState("0");
  const [bPct, setBPct] = React.useState("2.5");

  const amt = parseNumber(amount);
  const fa = parseNumber(aFixed);
  const pa = parseNumber(aPct);
  const fb = parseNumber(bFixed);
  const pb = parseNumber(bPct);

  const netA = netReceived(amt, fa, pa);
  const netB = netReceived(amt, fb, pb);
  const diff = netB - netA;

  return (
    <CalculatorShell
      title="Payment processor comparison"
      description="Net settled amount after fixed fee plus percentage — compare two providers on the same ticket size (no financing assumptions)."
      guide={getCalculatorGuide("marketplace/processor-compare")}
    >
      <CollapsibleSection title="Sale amount">
        <CalculatorPeriodHeader
          period={period}
          onPeriodChange={(p) =>
            changePeriod(p, [{ value: amount, setValue: setAmount, kind: "spend" }])
          }
          scaleNote={scaleNote}
        />
        <NumberField
          id="amt"
          label="Charge amount"
          hint={hints.amount}
          value={amount}
          onChange={onScaledChange(setAmount)}
          currencySelector={{ value: currency, onChange: setCurrency }}
        />
      </CollapsibleSection>

      <CollapsibleSection title="Processor A">
        <NumberField
          id="afix"
          label="Fixed fee per transaction"
          hint={hints.fixed}
          value={aFixed}
          onChange={setAFixed}
          currencySelector={{ value: currency, onChange: setCurrency }}
          step="0.01"
        />
        <NumberField
          id="apct"
          label="Percentage fee"
          hint={hints.pct}
          value={aPct}
          onChange={setAPct}
          unit="%"
          step="0.01"
        />
      </CollapsibleSection>

      <CollapsibleSection title="Processor B">
        <NumberField
          id="bfix"
          label="Fixed fee per transaction"
          hint={hints.fixed}
          value={bFixed}
          onChange={setBFixed}
          currencySelector={{ value: currency, onChange: setCurrency }}
          step="0.01"
        />
        <NumberField
          id="bpct"
          label="Percentage fee"
          hint={hints.pct}
          value={bPct}
          onChange={setBPct}
          unit="%"
          step="0.01"
        />
      </CollapsibleSection>

      <ResultsCard>
        <ResultRow
          label="Net — processor A"
          hint={hints.netA}
          value={formatCurrency(netA, undefined, currency)}
          variant={variantForMoneySigned(netA)}
        />
        <ResultRow
          label="Net — processor B"
          hint={hints.netB}
          value={formatCurrency(netB, undefined, currency)}
          variant={variantForMoneySigned(netB)}
        />
        <ResultRow
          label="B minus A (positive = B better)"
          hint={hints.diff}
          value={formatCurrency(diff, undefined, currency)}
          variant={variantForMoneySigned(diff)}
        />
      </ResultsCard>
    </CalculatorShell>
  );
}

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

export default function SdrPipelineCalculator() {
  const [currency, setCurrency] = React.useState("EUR");
  const { period, changePeriod, scaleNote, onScaledChange } =
    useBudgetPeriod("month");
  const [touchesDay, setTouchesDay] = React.useState("60");
  const [workDays, setWorkDays] = React.useState("21");
  const [connectPct, setConnectPct] = React.useState("18");
  const [meetingPct, setMeetingPct] = React.useState("25");
  const [winPct, setWinPct] = React.useState("22");
  const [dealSize, setDealSize] = React.useState("8500");

  const td = parseNumber(touchesDay);
  const wd = parseNumber(workDays);
  const conn = (parseNumber(connectPct) || 0) / 100;
  const meet = (parseNumber(meetingPct) || 0) / 100;
  const win = (parseNumber(winPct) || 0) / 100;
  const ticket = parseNumber(dealSize);

  const monthlyTouches = td * wd;
  const connects = monthlyTouches * conn;
  const meetings = connects * meet;
  const wins = meetings * win;
  const revenue = wins * ticket;

  return (
    <CalculatorShell
      title="SDR outbound model"
      description="Touches per day through connect, meeting set, and close rates into expected monthly pipeline revenue."
      guide={getCalculatorGuide("sales/sdr-pipeline")}
    >
      <CollapsibleSection title="Activity">
        <CalculatorPeriodHeader
          period={period}
          onPeriodChange={(p) =>
            changePeriod(p, [
              { value: dealSize, setValue: setDealSize, kind: "spend" },
            ])
          }
          scaleNote={scaleNote}
        />
        <div className="grid gap-3 sm:grid-cols-2">
          <NumberField
            id="touch"
            label="Outbound touches per day"
            hint="Daily outbound touches. Used in: monthlyTouches = td × wd."
            value={touchesDay}
            onChange={setTouchesDay}
          />
          <NumberField
            id="days"
            label="Working days (month)"
            hint="Working days in the month. Used in: monthlyTouches = td × wd."
            value={workDays}
            onChange={setWorkDays}
          />
        </div>
      </CollapsibleSection>

      <CollapsibleSection title="Funnel rates">
        <div className="grid gap-3 sm:grid-cols-2">
          <NumberField
            id="conn"
            label="Touch → meaningful connect"
            hint="Touch-to-connect rate (%); divided by 100 in code. Used in: connects = monthlyTouches × conn."
            value={connectPct}
            onChange={setConnectPct}
            unit="%"
            step="0.1"
          />
          <NumberField
            id="meet"
            label="Connect → meeting booked"
            hint="Connect-to-meeting rate (%); divided by 100 in code. Used in: meetings = connects × meet."
            value={meetingPct}
            onChange={setMeetingPct}
            unit="%"
            step="0.1"
          />
          <NumberField
            id="win"
            label="Meeting → closed won"
            hint="Meeting-to-win rate (%); divided by 100 in code. Used in: wins = meetings × win."
            value={winPct}
            onChange={setWinPct}
            unit="%"
            step="0.1"
          />
          <NumberField
            id="deal"
            label="Average contract value"
            hint="Average won deal size. Used in: revenue = wins × ticket."
            value={dealSize}
            onChange={onScaledChange(setDealSize)}
            currencySelector={{ value: currency, onChange: setCurrency }}
          />
        </div>
      </CollapsibleSection>

      <ResultsCard>
        <PeriodBudgetEquivalents amount={revenue} period={period} currency={currency} />
        <ResultRow
          label="Touches (monthly)"
          hint="Formula: td × wd."
          value={formatNumber(monthlyTouches)}
        />
        <ResultRow
          label="Connects (monthly)"
          hint="Formula: monthlyTouches × conn."
          value={formatNumber(connects)}
        />
        <ResultRow
          label="Meetings booked"
          hint="Formula: connects × meet."
          value={meetings.toFixed(1)}
        />
        <ResultRow
          label="Closed wins"
          hint="Formula: meetings × win."
          value={wins.toFixed(2)}
        />
        <ResultRow
          label="Expected revenue"
          hint="Formula: wins × ticket."
          value={formatCurrency(revenue, undefined, currency)}
          variant={variantForMoneySigned(revenue)}
        />
      </ResultsCard>
    </CalculatorShell>
  );
}

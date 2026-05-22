"use client";

import * as React from "react";
import { parseNumber } from "@/lib/format";
import {
  convertBetweenPeriods,
  formatPeriodScaledInput,
  SPEND_PERIOD_ADJECTIVE,
  type SpendPeriod,
} from "@/lib/spend-period";

export type ScaledFieldConfig = {
  value: string;
  setValue: (v: string) => void;
  kind?: "spend" | "impressions" | "count";
};

const SCALE_NOTE =
  "Period totals were scaled for the new period. Percentages and per-unit amounts are unchanged.";

export function useBudgetPeriod(defaultPeriod: SpendPeriod = "month") {
  const [period, setPeriod] = React.useState<SpendPeriod>(defaultPeriod);
  const [scaleNote, setScaleNote] = React.useState<string | null>(null);

  const changePeriod = React.useCallback(
    (next: SpendPeriod, fields: ScaledFieldConfig[]) => {
      if (next === period) return;
      let didScale = false;
      for (const f of fields) {
        const n = parseNumber(f.value);
        if (n > 0) {
          f.setValue(
            formatPeriodScaledInput(
              convertBetweenPeriods(n, period, next),
              f.kind ?? "spend",
            ),
          );
          didScale = true;
        }
      }
      setPeriod(next);
      if (didScale) setScaleNote(SCALE_NOTE);
    },
    [period],
  );

  const onScaledChange = React.useCallback(
    (setValue: (v: string) => void) => (v: string) => {
      setValue(v);
      setScaleNote(null);
    },
    [],
  );

  return {
    period,
    periodLabel: SPEND_PERIOD_ADJECTIVE[period],
    changePeriod,
    scaleNote,
    onScaledChange,
  };
}

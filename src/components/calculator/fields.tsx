"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { FieldHint } from "@/components/calculator/field-hint";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/** Suffix strip — same chrome as before; brand blue on label/select text only */
const suffixShell = "flex shrink-0 items-center border-l bg-background";

const suffixTextBrand = "text-sm font-medium text-[#0047FF]";

export const DEFAULT_CURRENCY_OPTIONS: ReadonlyArray<{ code: string; label: string }> =
  [
    { code: "EUR", label: "EUR" },
    { code: "USD", label: "USD" },
    { code: "GBP", label: "GBP" },
    { code: "CHF", label: "CHF" },
    { code: "JPY", label: "JPY" },
  ];

export type CurrencySelectorConfig = {
  value: string;
  onChange: (code: string) => void;
  options?: ReadonlyArray<{ code: string; label: string }>;
};

export function NumberField({
  id,
  label,
  hint,
  value,
  onChange,
  unit,
  currencySelector,
  min,
  max,
  step,
  placeholder,
  className,
}: {
  id: string;
  label: string;
  /** Shown on hover/focus of the info icon beside the label. */
  hint?: string;
  value: string;
  onChange: (v: string) => void;
  unit?: string;
  currencySelector?: CurrencySelectorConfig;
  min?: number;
  max?: number;
  step?: string | number;
  placeholder?: string;
  className?: string;
}) {
  const opts = currencySelector?.options ?? DEFAULT_CURRENCY_OPTIONS;
  const selectId = `${id}-currency`;

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <div className="flex items-center">
        <Label htmlFor={id} className="text-xs font-medium text-muted-foreground">
          {label}
        </Label>
        {hint ? <FieldHint id={`${id}-hint`} text={hint} /> : null}
      </div>
      <div className="flex overflow-hidden rounded-md border border-input bg-secondary/40 shadow-sm focus-within:ring-1 focus-within:ring-ring">
        <Input
          id={id}
          inputMode="decimal"
          className="h-9 border-0 bg-transparent shadow-none focus-visible:ring-0"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          min={min}
          max={max}
          step={step}
          type="text"
          autoComplete="off"
        />
        {currencySelector ? (
          <div
            className={cn(
              suffixShell,
              "relative min-h-9 min-w-[4.75rem] max-w-[6rem]",
            )}
          >
            <label htmlFor={selectId} className="sr-only">
              Currency for {label}
            </label>
            <select
              id={selectId}
              className={cn(
                "h-9 w-full cursor-pointer appearance-none bg-transparent py-0 pl-2.5 pr-7 text-sm font-medium text-[#0047FF] outline-none",
                "focus-visible:outline-none",
              )}
              value={currencySelector.value}
              onChange={(e) => currencySelector.onChange(e.target.value)}
            >
              {opts.map((o) => (
                <option key={o.code} value={o.code}>
                  {o.label}
                </option>
              ))}
            </select>
            <ChevronDown
              className="pointer-events-none absolute right-1.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#0047FF]"
              aria-hidden
            />
          </div>
        ) : unit ? (
          <span className={cn(suffixShell, suffixTextBrand, "min-h-9 px-3 tabular-nums")}>
            {unit}
          </span>
        ) : null}
      </div>
    </div>
  );
}

export function ResultRow({
  label,
  hint,
  value,
  variant = "default",
  bar,
}: {
  label: string;
  /** Shown on hover/focus of the info icon; include the formula when helpful. */
  hint?: string;
  value: React.ReactNode;
  variant?: "default" | "success" | "warning" | "destructive";
  bar?: { percent: number; tone?: "success" | "info" | "warning" };
}) {
  const hintId = React.useId();
  const valCn =
    variant === "success"
      ? "text-[hsl(var(--success))]"
      : variant === "warning"
        ? "text-warning"
        : variant === "destructive"
          ? "text-destructive"
          : "";

  return (
    <div className="flex items-start justify-between gap-4 rounded-md border bg-muted/30 px-3.5 py-2.5">
      <div className="min-w-0 flex-1 space-y-1">
        <div className="flex items-center">
          <p className="text-xs text-muted-foreground">{label}</p>
          {hint ? (
            <FieldHint id={hintId} text={hint} variant="result" placement="bottom" />
          ) : null}
        </div>
        {bar ? (
          <div className="h-1.5 overflow-hidden rounded-full border bg-muted">
            <div
              className={cn(
                "h-full rounded-full transition-[width]",
                bar.tone === "success" && "bg-[hsl(var(--success))]",
                bar.tone === "warning" && "bg-warning",
                (!bar.tone || bar.tone === "info") && "bg-primary/70",
              )}
              style={{ width: `${Math.min(Math.max(bar.percent, 0), 100)}%` }}
            />
          </div>
        ) : null}
      </div>
      <div className={cn("text-right text-sm font-medium tabular-nums", valCn)}>
        {value}
      </div>
    </div>
  );
}

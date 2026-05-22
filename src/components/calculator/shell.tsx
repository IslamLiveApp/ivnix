"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  CalculatorGuide,
  type CalculatorGuideConfig,
} from "@/components/calculator/calculator-guide";

export function CalculatorShell({
  title,
  description,
  guide,
  headerExtra,
  children,
}: {
  title: string;
  description: string;
  guide?: CalculatorGuideConfig;
  headerExtra?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="w-full space-y-6">
      <header className="space-y-2">
        <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
        {headerExtra ??
          (guide ? (
            <CalculatorGuide leadText={description} {...guide} />
          ) : (
            <p className="text-sm text-muted-foreground">{description}</p>
          ))}
      </header>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

export function ResultsCard({
  title = "Results",
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border bg-card shadow-sm">
      <div className="flex items-center gap-2 border-b px-4 py-3.5 text-[15px] font-medium">
        {title}
      </div>
      <div className="space-y-3 p-4">{children}</div>
    </div>
  );
}

export function VerdictBanner({
  tone,
  children,
}: {
  tone: "success" | "warning" | "destructive";
  children: React.ReactNode;
}) {
  const styles = {
    success: "border-success/35 bg-success/12 text-success",
    warning: "border-warning/35 bg-warning/10 text-warning",
    destructive: "border-destructive/35 bg-destructive/10 text-destructive",
  } as const;

  return (
    <div
      className={cn(
        "rounded-md border px-3.5 py-2.5 text-sm leading-snug",
        styles[tone],
      )}
    >
      {children}
    </div>
  );
}

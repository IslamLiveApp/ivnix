"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type GuideStep = { heading: string; body: string };

export type CalculatorGuideConfig = {
  label?: string;
  steps: GuideStep[];
  example?: { heading: string; lines: string[] };
};

type CalculatorGuideProps = CalculatorGuideConfig & {
  leadText?: string;
  label?: string;
  steps: GuideStep[];
  example?: { heading: string; lines: string[] };
  className?: string;
};

export function CalculatorGuide({
  leadText,
  label = "Simple rule of thumb",
  steps,
  example,
  className,
}: CalculatorGuideProps) {
  const [open, setOpen] = React.useState(false);
  const rootRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className={cn("w-full", className)}>
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {leadText ? (
          <p className="text-sm text-muted-foreground">{leadText}</p>
        ) : null}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="shrink-0 text-sm font-medium text-[#0047FF] underline-offset-2 transition-colors hover:text-[#0036c7] hover:underline focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0047FF] focus-visible:outline-offset-2"
          aria-expanded={open}
        >
          {open ? "Hide guide" : label}
        </button>
      </div>
      {open ? (
        <div
          className="mt-3 space-y-3 rounded-lg border border-[#0047FF]/25 bg-[#0047FF]/[0.06] px-4 py-3.5 text-sm leading-relaxed text-neutral-800"
          role="region"
          aria-label={label}
        >
          <ol className="list-decimal space-y-2.5 pl-4">
            {steps.map((step) => (
              <li key={step.heading}>
                <span className="font-medium text-neutral-900">{step.heading}</span>
                <p className="mt-0.5 text-neutral-700">{step.body}</p>
              </li>
            ))}
          </ol>
          {example ? (
            <div className="rounded-md border border-[#0047FF]/15 bg-white/80 px-3 py-2.5">
              <p className="font-medium text-neutral-900">{example.heading}</p>
              <ul className="mt-1.5 list-disc space-y-1 pl-4 text-neutral-700">
                {example.lines.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

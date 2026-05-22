"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatHintForDisplay, formatResultHintForDisplay } from "@/lib/field-hint-text";

const TOOLTIP_MAX_W = 300;
const GAP = 8;
const VIEWPORT_PAD = 8;

type FieldHintProps = {
  id: string;
  text: string;
  /** Input fields vs calculated results use different tooltip labels. */
  variant?: "input" | "result";
  /** Preferred side; flips when there is not enough room in the viewport. */
  placement?: "top" | "bottom";
  className?: string;
};

function clampCenterX(centerX: number, maxWidth: number) {
  const half = maxWidth / 2;
  return Math.max(
    VIEWPORT_PAD + half,
    Math.min(centerX, window.innerWidth - VIEWPORT_PAD - half),
  );
}

/** Info icon with tooltip portaled to document.body so parent overflow cannot clip it. */
export function FieldHint({
  id,
  text,
  variant = "input",
  placement = "top",
  className,
}: FieldHintProps) {
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const [open, setOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const [style, setStyle] = React.useState<{
    top: number;
    left: number;
    side: "top" | "bottom";
  } | null>(null);

  React.useEffect(() => setMounted(true), []);

  const updatePosition = React.useCallback(() => {
    const el = triggerRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const centerX = clampCenterX(
      rect.left + rect.width / 2,
      Math.min(TOOLTIP_MAX_W, window.innerWidth - VIEWPORT_PAD * 2),
    );

    const spaceAbove = rect.top;
    const spaceBelow = window.innerHeight - rect.bottom;
    let side: "top" | "bottom" = placement;
    if (side === "top" && spaceAbove < 72 && spaceBelow > spaceAbove) {
      side = "bottom";
    } else if (side === "bottom" && spaceBelow < 72 && spaceAbove > spaceBelow) {
      side = "top";
    }

    setStyle({
      left: centerX,
      top: side === "top" ? rect.top - GAP : rect.bottom + GAP,
      side,
    });
  }, [placement]);

  const show = React.useCallback(() => {
    updatePosition();
    setOpen(true);
  }, [updatePosition]);

  const hide = React.useCallback(() => setOpen(false), []);

  React.useEffect(() => {
    if (!open) return;
    updatePosition();
    const onScrollOrResize = () => updatePosition();
    window.addEventListener("scroll", onScrollOrResize, true);
    window.addEventListener("resize", onScrollOrResize);
    return () => {
      window.removeEventListener("scroll", onScrollOrResize, true);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [open, updatePosition]);

  const tooltip =
    open && style && mounted
      ? createPortal(
          <span
            id={id}
            role="tooltip"
            className={cn(
              "pointer-events-none fixed z-[9999] w-max max-w-[min(18.75rem,calc(100vw-2rem))] -translate-x-1/2 rounded-md bg-neutral-900 px-3 py-2 text-left text-[11px] font-normal leading-snug text-white shadow-lg whitespace-pre-line",
              style.side === "top" && "-translate-y-full",
            )}
            style={{ top: style.top, left: style.left }}
          >
            {variant === "result"
              ? formatResultHintForDisplay(text)
              : formatHintForDisplay(text)}
            <span
              className={cn(
                "absolute left-1/2 -translate-x-1/2 border-[5px] border-transparent",
                style.side === "top"
                  ? "top-full border-t-neutral-900"
                  : "bottom-full border-b-neutral-900",
              )}
              aria-hidden
            />
          </span>,
          document.body,
        )
      : null;

  return (
    <span className={cn("relative ml-0.5 inline-flex align-middle", className)}>
      <button
        ref={triggerRef}
        type="button"
        className="inline-flex h-11 w-11 -m-3 items-center justify-center rounded-full text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
        aria-describedby={open ? id : undefined}
        aria-label="Field explanation"
        onMouseEnter={show}
        onMouseLeave={hide}
        onFocus={show}
        onBlur={hide}
      >
        <Info className="h-3.5 w-3.5 shrink-0" strokeWidth={2.25} aria-hidden />
      </button>
      {tooltip}
    </span>
  );
}

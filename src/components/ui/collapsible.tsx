"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

/** Plain collapsible — avoids Radix SSR/hydration pitfalls that can blank the page */
export function CollapsibleSection({
  title,
  defaultOpen = true,
  className,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(defaultOpen);

  return (
    <div className={cn("rounded-lg border bg-card", className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-2 border-b px-4 py-3.5 text-left text-[15px] font-medium hover:bg-muted/40"
        aria-expanded={open}
      >
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200",
            !open && "-rotate-90",
          )}
          aria-hidden
        />
        {title}
      </button>
      {open ? (
        <div className="flex flex-col gap-3.5 p-4">{children}</div>
      ) : null}
    </div>
  );
}

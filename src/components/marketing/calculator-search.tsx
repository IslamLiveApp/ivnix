"use client";

import * as React from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

export function CalculatorSearch({
  items,
  variant = "marketing",
  className,
  inputClassName,
  iconClassName,
}: {
  items: { title: string; href: string }[];
  /** Stripe-style compact bar for workspace dashboard shell */
  variant?: "marketing" | "dashboard";
  className?: string;
  inputClassName?: string;
  iconClassName?: string;
}) {
  const [q, setQ] = React.useState("");
  const isDashboard = variant === "dashboard";

  const filtered = React.useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return [];
    return items.filter((it) => it.title.toLowerCase().includes(s)).slice(0, 8);
  }, [items, q]);

  const inputId = isDashboard ? "calc-search-dashboard" : "calc-search";

  return (
    <div
      className={cn(
        isDashboard
          ? "relative h-9 w-full max-w-full min-w-0 shrink-0"
          : "relative w-full max-w-xl",
        className,
      )}
    >
      <label htmlFor={inputId} className="sr-only">
        Search calculators
      </label>
      <input
        id={inputId}
        type="search"
        autoComplete="off"
        placeholder={isDashboard ? "Search" : "Search calculator..."}
        value={q}
        onChange={(e) => setQ(e.target.value)}
        className={cn(
          isDashboard
            ? "h-9 w-full rounded-lg border border-border bg-card py-0 pl-9 pr-3 text-sm leading-none text-foreground shadow-none outline-none ring-0 placeholder:text-muted-foreground transition-[color,box-shadow] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0"
            : "w-full rounded-full border border-neutral-200/90 bg-[#FFFFFF] py-3.5 pl-6 pr-14 text-[15px] text-neutral-800 shadow-sm shadow-neutral-950/[0.04] outline-none placeholder:text-neutral-400 transition-[border-color,box-shadow] focus:border-[#0047FF] focus:shadow-md focus:ring-4 focus:ring-[#0047FF]/20",
          inputClassName,
        )}
      />
      <Search
        className={cn(
          "pointer-events-none absolute top-1/2 -translate-y-1/2",
          isDashboard
            ? "left-3 h-4 w-4 text-muted-foreground"
            : "right-5 h-5 w-5 text-[#0047FF]",
          iconClassName,
        )}
        aria-hidden
      />
      {filtered.length > 0 ? (
        <ul
          className={cn(
            "absolute z-40 mt-2 max-h-72 w-full overflow-auto rounded-lg border border-border bg-card py-2 shadow-md",
            isDashboard ? "rounded-lg" : "rounded-2xl shadow-xl",
          )}
        >
          {filtered.map((it) => (
            <li key={it.href}>
              <Link
                href={it.href}
                className="block px-4 py-2.5 text-sm text-foreground hover:bg-muted/60"
                onClick={() => setQ("")}
              >
                {it.title}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import {
  Briefcase,
  ChevronDown,
  Layers,
  LineChart,
  Menu,
  Rocket,
  ShoppingCart,
  Sparkles,
  Sprout,
  Store,
  TrendingUp,
  X,
} from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";
import { CalculatorSearch } from "@/components/marketing/calculator-search";
import { CATEGORY_NAV, type CategorySlug } from "@/data/navigation";
import { SITE_NAME } from "@/config/site";
import { cn } from "@/lib/utils";

const tipMeClasses =
  "font-sans inline-flex shrink-0 items-center justify-center rounded-full bg-[#0047FF] px-3 py-[3px] text-[12px] font-semibold leading-normal tracking-normal text-white [-webkit-font-smoothing:antialiased] outline-offset-2 transition-colors hover:bg-[#0039e6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0047FF]";

const CATEGORY_ICONS: Record<CategorySlug, LucideIcon> = {
  "paid-growth": TrendingUp,
  "organic-growth": Sprout,
  sales: Briefcase,
  ecommerce: ShoppingCart,
  saas: Layers,
  influencers: Sparkles,
  investing: LineChart,
  startup: Rocket,
  marketplace: Store,
};

/** Category whose hub or calculator matches the current path */
function categorySlugForPath(pathname: string): CategorySlug | null {
  for (const c of CATEGORY_NAV) {
    const p = `/${c.slug}`;
    if (pathname === p || pathname.startsWith(`${p}/`)) {
      return c.slug;
    }
  }
  return null;
}

function SidebarCategorySection({
  cat,
  pathname,
  isOpen,
  onToggle,
}: {
  cat: (typeof CATEGORY_NAV)[number];
  pathname: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const activeInCat =
    pathname === `/${cat.slug}` ||
    pathname.startsWith(`/${cat.slug}/`);
  const showBrandAccent = activeInCat && !isOpen;

  const Icon = CATEGORY_ICONS[cat.slug];
  const panelId = `workspace-nav-${cat.slug}`;

  return (
    <div className="py-0.5">
      <button
        type="button"
        className={cn(
          "flex w-full items-center gap-3 rounded-md px-2 py-2 text-left outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-neutral-400",
          showBrandAccent
            ? "text-[#0047FF] hover:bg-[#0047FF]/10"
            : "text-neutral-800 hover:bg-neutral-50",
        )}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
      >
        <Icon
          className={cn(
            "h-[18px] w-[18px] shrink-0",
            showBrandAccent ? "text-[#0047FF]" : "text-neutral-500",
          )}
          strokeWidth={1.5}
          aria-hidden
        />
        <span
          className={cn(
            "min-w-0 flex-1 text-[13px] font-medium leading-snug",
            showBrandAccent && "font-semibold text-[#0047FF]",
            !showBrandAccent &&
              (activeInCat ? "text-neutral-950" : "text-neutral-800"),
          )}
        >
          {cat.title}
        </span>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 transition-transform duration-200 ease-out",
            showBrandAccent ? "text-[#0047FF]" : "text-neutral-400",
            isOpen ? "rotate-180" : "rotate-0",
          )}
          aria-hidden
        />
      </button>

      {isOpen ? (
        <ul
          id={panelId}
          className="mt-0.5 space-y-0.5 py-1"
        >
          {cat.calculators.map((calc) => {
            const href = `/${cat.slug}/${calc.slug}`;
            const active =
              pathname === href || pathname.startsWith(`${href}/`);
            return (
              <li key={calc.slug}>
                <Link
                  href={href}
                  className={cn(
                    "block rounded-md py-1.5 pl-[calc(0.5rem+18px+0.75rem)] pr-2 text-[13px] leading-snug transition-colors",
                    active
                      ? "bg-[#0047FF]/9 font-medium text-[#0047FF]"
                      : "font-normal text-neutral-700 hover:bg-neutral-50 hover:text-neutral-950",
                  )}
                  aria-current={active ? "page" : undefined}
                >
                  {calc.title}
                </Link>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}

function WorkspaceSidebarNav({ pathname }: { pathname: string }) {
  const activeSlug = React.useMemo(
    () => categorySlugForPath(pathname),
    [pathname],
  );

  const [openSlug, setOpenSlug] = React.useState<CategorySlug | null>(() =>
    categorySlugForPath(pathname),
  );

  React.useEffect(() => {
    setOpenSlug(activeSlug);
  }, [activeSlug]);

  const handleToggle = React.useCallback((slug: CategorySlug) => {
    setOpenSlug((prev) => (prev === slug ? null : slug));
  }, []);

  return (
    <nav
      className="flex-1 overflow-y-auto overscroll-contain px-3 pb-6 pt-1"
      aria-label="Calculator navigation"
    >
      <p className="px-2 pb-2 pt-3 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
        Calculators
      </p>
      <div className="space-y-0.5">
        {CATEGORY_NAV.map((cat) => (
          <SidebarCategorySection
            key={cat.slug}
            cat={cat}
            pathname={pathname}
            isOpen={openSlug === cat.slug}
            onToggle={() => handleToggle(cat.slug)}
          />
        ))}
      </div>
    </nav>
  );
}

export function WorkspaceShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileNavOpen, setMobileNavOpen] = React.useState(false);

  React.useEffect(() => {
    setMobileNavOpen(false);
  }, [pathname]);

  const searchItems = React.useMemo(
    () =>
      CATEGORY_NAV.flatMap((cat) =>
        cat.calculators.map((calc) => ({
          title: calc.title,
          href: `/${cat.slug}/${calc.slug}`,
        })),
      ),
    [],
  );

  return (
    <div className="flex min-h-screen">
      {mobileNavOpen ? (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-neutral-950/25 md:hidden"
          aria-label="Close navigation"
          onClick={() => setMobileNavOpen(false)}
        />
      ) : null}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-[260px] shrink-0 flex-col bg-white shadow-lg transition-transform duration-200 ease-out md:border-r md:border-neutral-200 md:shadow-none",
          mobileNavOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        )}
      >
        <div className="flex h-14 shrink-0 items-center gap-2 px-4">
          <Link
            href="/"
            className="flex min-w-0 flex-1 items-center gap-2 outline-offset-4 focus-visible:rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0047FF]"
          >
            <BrandLogo size={36} className="h-9 w-9 shrink-0 object-contain" />
            <span className="truncate text-[15px] font-semibold tracking-tight text-neutral-900">
              {SITE_NAME}
            </span>
          </Link>
          <button
            type="button"
            className="rounded-md p-2 text-neutral-600 hover:bg-neutral-100 md:hidden"
            onClick={() => setMobileNavOpen(false)}
            aria-label="Close navigation"
          >
            <X className="h-5 w-5" aria-hidden />
          </button>
        </div>

        <WorkspaceSidebarNav pathname={pathname} />
      </aside>

      <div className="flex min-h-screen min-w-0 flex-1 flex-col md:ml-[260px]">
        <div className="sticky top-0 z-30 w-full shrink-0 bg-[var(--site-canvas)]">
          <header className="relative w-full shrink-0 bg-[var(--site-canvas)]">
          {/*
            Same horizontal rhythm as calculators layout (max-w-7xl + px-4/md:px-8).
            Symmetric 1fr | center | 1fr keeps search aligned with max-w-xl below.
            Tip CTA is absolute right-4 to mirror sidebar logo row px-4 (not max-w-7xl inset).
          */}
          <div className="pointer-events-none absolute inset-y-0 right-4 z-20 flex items-center">
            <Link href="/support" prefetch={false} className={tipMeClasses}>
              Tip me
            </Link>
          </div>

          <div className="mx-auto grid h-14 w-full max-w-7xl grid-cols-[minmax(0,1fr)_minmax(0,36rem)_minmax(0,1fr)] items-center gap-x-2 px-4 max-sm:pr-[5.5rem] md:gap-x-4 md:px-8">
            <div className="flex min-w-0 justify-self-start">
              <button
                type="button"
                className="rounded-md p-2 text-neutral-600 hover:bg-neutral-100 md:hidden"
                onClick={() => setMobileNavOpen(true)}
                aria-label="Open navigation"
              >
                <Menu className="h-5 w-5" aria-hidden />
              </button>
            </div>

            <div className="min-h-9 min-w-0 w-full">
              <CalculatorSearch items={searchItems} variant="dashboard" />
            </div>

            <span className="min-w-0" aria-hidden="true" />
          </div>
        </header>
        </div>

        {children}
      </div>
    </div>
  );
}

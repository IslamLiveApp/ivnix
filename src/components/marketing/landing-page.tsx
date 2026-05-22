import Link from "next/link";
import {
  ArrowUpRight,
  Megaphone,
  Search,
  Users,
  ShoppingCart,
  Cloud,
  Sparkles,
  LineChart,
  Rocket,
  Store,
  Star,
  type LucideIcon,
} from "lucide-react";
import { CATEGORY_NAV } from "@/data/navigation";
import { LANDING_FAQ } from "@/data/landing-copy";
import { SITE_NAME } from "@/config/site";
import { POPULAR_CALCULATORS } from "@/data/popular-calculators";
import { LandingJsonLd } from "@/components/marketing/landing-json-ld";
import { MarketingFooter } from "@/components/marketing/marketing-footer";
import { MarketingHeader } from "@/components/marketing/marketing-header";
import { CalculatorSearch } from "@/components/marketing/calculator-search";
import { LandingFaqAccordion } from "@/components/marketing/landing-faq-accordion";
import { TipThanksMessage } from "@/components/marketing/tip-thanks-message";

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  "paid-growth": Megaphone,
  "organic-growth": Search,
  sales: Users,
  ecommerce: ShoppingCart,
  saas: Cloud,
  influencers: Sparkles,
  investing: LineChart,
  startup: Rocket,
  marketplace: Store,
};

function CategoryCard({ slug, title }: { slug: string; title: string }) {
  const Icon = CATEGORY_ICONS[slug] ?? Sparkles;
  return (
    <Link
      href={`/${slug}`}
      className="group flex flex-col gap-4 rounded-2xl border border-neutral-100 bg-white p-6 shadow-md shadow-neutral-950/5 ring-1 ring-neutral-950/[0.04] transition duration-200 hover:-translate-y-1 hover:shadow-xl hover:ring-[#0047FF]/20"
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#eaf1ff] text-[#0047FF] transition group-hover:bg-[#0047FF] group-hover:text-white">
        <Icon className="h-6 w-6" strokeWidth={2} />
      </span>
      <span className="text-base font-semibold leading-snug text-neutral-900">{title}</span>
    </Link>
  );
}

/** Home scroll column. Gray fill is global (`globals.css` on `html`/`body`). */
export function LandingPage() {
  const totalCalcs = CATEGORY_NAV.reduce((s, c) => s + c.calculators.length, 0);
  const searchItems = CATEGORY_NAV.flatMap((cat) =>
    cat.calculators.map((calc) => ({
      title: calc.title,
      href: `/${cat.slug}/${calc.slug}`,
    })),
  );

  const rowA = CATEGORY_NAV.slice(0, 8);
  const rowB = CATEGORY_NAV.slice(8);

  return (
    <div className="relative min-h-[100dvh] min-h-screen text-neutral-700">
      <MarketingHeader />
      <TipThanksMessage />

      {/* Hero — headline + search; grid lets the search stretch to remaining width */}
      <section className="mx-auto max-w-7xl px-4 pt-8 pb-10 md:px-8 md:pt-12 md:pb-14">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,auto)_minmax(0,1fr)] lg:items-center lg:gap-x-8 lg:gap-y-10 xl:gap-x-12">
          <div className="w-full max-w-lg shrink-0 justify-self-start lg:max-w-[22rem] xl:max-w-[24rem]">
            <h1 className="tracking-tight">
              <span className="block text-4xl font-extrabold leading-[1.08] md:text-[42px] lg:text-[46px]">
                <span className="text-[#0047FF]">{totalCalcs}</span>
                <span className="text-neutral-900"> business </span>
                <span className="text-[rgba(0,71,255,1)]">calculators</span>
              </span>
            </h1>
          </div>
          <div className="min-w-0 w-full">
            <CalculatorSearch
              items={searchItems}
              className="max-w-none"
              inputClassName="min-h-[58px] py-0 pl-7 pr-16 text-base leading-normal shadow-sm md:min-h-[60px] md:pl-8 md:pr-[4.5rem]"
              iconClassName="right-6 h-[1.375rem] w-[1.375rem] md:right-8"
            />
          </div>
        </div>

        {/* Category grid — Omni-style cards */}
        <div id="categories" className="mt-14 md:mt-16">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {rowA.map((cat) => (
              <CategoryCard key={cat.slug} slug={cat.slug} title={cat.title} />
            ))}
          </div>
          <div className="mt-4 grid gap-4 lg:grid-cols-4">
            {rowB.map((cat) => (
              <CategoryCard key={cat.slug} slug={cat.slug} title={cat.title} />
            ))}
            <Link
              href="#popular"
              className="flex min-h-[140px] flex-col justify-between rounded-2xl border-2 border-dashed border-[#0047FF]/35 bg-white p-6 shadow-md shadow-neutral-950/5 ring-1 ring-neutral-950/[0.04] transition hover:border-[#0047FF]/55 hover:bg-[#f5f8ff] hover:shadow-lg lg:col-span-2"
            >
              <Star className="h-8 w-8 text-[#0047FF]" strokeWidth={1.75} />
              <div>
                <p className="text-lg font-semibold text-neutral-900">Discover more</p>
                <p className="mt-1 text-sm text-neutral-600">
                  Jump to popular tools: ads, SaaS, creators, marketplaces, and more.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about-us" className="mx-auto max-w-6xl px-4 py-16 md:px-8 md:py-20">
        <p className="text-center text-sm font-semibold text-[#0047FF]">About us</p>
        <h2 className="mx-auto mt-3 max-w-3xl text-center text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl">
          Clarity before you commit capital
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-relaxed text-neutral-600 md:text-xl">
          In{" "}
          <span className="font-brand font-semibold text-[#0047FF]">{SITE_NAME}</span>, you can
          model paid
          acquisition, SEO, SaaS MRR and churn, product margin, influencer pricing,
          break-even snapshots, sales pipelines, and marketplace fees side by side. Adjust a handful of
          inputs, watch how the outputs move, compare paths, then decide with clearer numbers instead of
          juggling fragile spreadsheets whenever the question changes.
        </p>
      </section>

      {/* Most popular */}
      <section id="popular" className="border-t border-neutral-400/25 py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <h2 className="text-center text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl">
            Most popular calculators
          </h2>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {POPULAR_CALCULATORS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group relative flex flex-col rounded-2xl border border-neutral-100 bg-white p-6 pb-8 shadow-md shadow-neutral-950/5 ring-1 ring-neutral-950/[0.04] transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                <ArrowUpRight className="absolute right-4 top-4 h-5 w-5 text-neutral-400 transition group-hover:text-[#0047FF]" />
                <h3 className="pr-8 text-base font-semibold text-neutral-900">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600">{item.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <LandingFaqAccordion items={LANDING_FAQ} />

      <LandingJsonLd />
      <MarketingFooter />
    </div>
  );
}

import type { ReactNode } from "react";
import Link from "next/link";
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import { CATEGORY_NAV } from "@/data/navigation";
import { POPULAR_CALCULATORS } from "@/data/popular-calculators";
import { SITE_NAME } from "@/config/site";
import { BrandLogo } from "@/components/brand-logo";

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  const external = href.startsWith("http");
  if (external) {
    return (
      <a href={href} className="text-sm text-neutral-600 hover:text-neutral-900 hover:underline">
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className="text-sm text-neutral-600 hover:text-neutral-900 hover:underline">
      {children}
    </Link>
  );
}

export function MarketingFooter() {
  const popularCols = POPULAR_CALCULATORS.slice(0, 8);

  return (
    <footer className="relative z-10 border-t border-neutral-400/25">
      <div className="mx-auto max-w-6xl px-4 py-14 md:px-8 md:py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Brand column */}
          <div className="relative lg:col-span-4">
            <div className="pb-4">
              <div className="flex items-start gap-3">
                <BrandLogo size={44} className="h-11 w-11" />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-neutral-900">We make it count!</p>
                  <p className="mt-3 font-brand text-xl font-semibold tracking-tight text-[#0047FF]">
                    {SITE_NAME}
                  </p>
                </div>
              </div>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-neutral-600">
                Fast business calculators with honest formulas. Brand refresh coming soon.
              </p>
              <div className="mt-6 flex gap-3">
                <a
                  href="#"
                  aria-label="Facebook (add URL later)"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-neutral-500 shadow-sm ring-1 ring-neutral-200 hover:text-[#0047FF]"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  aria-label="Instagram (add URL later)"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-neutral-500 shadow-sm ring-1 ring-neutral-200 hover:text-[#0047FF]"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  aria-label="YouTube (add URL later)"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-neutral-500 shadow-sm ring-1 ring-neutral-200 hover:text-[#0047FF]"
                >
                  <Youtube className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  aria-label="LinkedIn (add URL later)"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-neutral-500 shadow-sm ring-1 ring-neutral-200 hover:text-[#0047FF]"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <p className="text-sm font-semibold text-neutral-900">Categories</p>
            <ul className="mt-4 space-y-2">
              {CATEGORY_NAV.map((cat) => (
                <li key={cat.slug}>
                  <FooterLink href={`/${cat.slug}`}>{cat.title}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <p className="text-sm font-semibold text-neutral-900">Press &amp; discovery</p>
            <ul className="mt-4 space-y-2">
              <li>
                <FooterLink href="/llms.txt">llms.txt</FooterLink>
              </li>
              <li>
                <FooterLink href="/sitemap.xml">Sitemap</FooterLink>
              </li>
              <li>
                <FooterLink href="/#faq">FAQ</FooterLink>
              </li>
              <li>
                <FooterLink href="/#about-us">About</FooterLink>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-4">
            <p className="text-sm font-semibold text-neutral-900">Most used</p>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {popularCols.map((p) => (
                <li key={p.href}>
                  <FooterLink href={p.href}>{p.title}</FooterLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-neutral-200 pt-8 text-xs text-neutral-500 sm:flex-row sm:items-center">
          <button
            type="button"
            className="rounded-md border border-neutral-200 bg-white px-3 py-1.5 text-neutral-700 shadow-sm"
          >
            EN · English
          </button>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <FooterLink href="#">Privacy</FooterLink>
            <FooterLink href="#">Cookies</FooterLink>
            <FooterLink href="#">Terms of service</FooterLink>
            <span>
              © {new Date().getFullYear()}{" "}
              <span className="font-brand text-[#0047FF]">{SITE_NAME}</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

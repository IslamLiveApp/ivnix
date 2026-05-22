import Link from "next/link";
import { SITE_NAME } from "@/config/site";
import { BrandLogo } from "@/components/brand-logo";
import { TipAnnouncementBar } from "@/components/marketing/tip-announcement-bar";

const tipMeClasses =
  "font-sans inline-flex shrink-0 items-center justify-center rounded-full bg-[#0047FF] px-3 py-[3px] text-[12px] font-semibold leading-normal tracking-normal text-white [-webkit-font-smoothing:antialiased] outline-offset-2 transition-colors hover:bg-[#0039e6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0047FF]";

export function MarketingHeader() {
  return (
    <header className="sticky top-0 z-50 bg-[var(--site-canvas)]">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-[52px] max-w-7xl items-center justify-between gap-3 px-4 md:px-8"
      >
        <Link
          href="/"
          className="flex min-w-0 flex-1 items-center justify-start gap-2.5 text-left text-sm tracking-tight sm:text-base md:gap-3 md:text-[23px]"
        >
          <BrandLogo
            size={44}
            className="h-10 w-10 shrink-0 object-contain md:h-11 md:w-11"
          />
          <span className="shrink-0 whitespace-nowrap font-brand font-extrabold leading-none text-[#0047FF]">
            {SITE_NAME}
          </span>
        </Link>

        <Link href="/support" prefetch={false} className={tipMeClasses}>
          Tip me
        </Link>
      </nav>
      <div className="ivnix-tip-ribbon-host">
        <TipAnnouncementBar />
      </div>
    </header>
  );
}

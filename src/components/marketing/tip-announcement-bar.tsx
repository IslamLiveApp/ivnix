"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { SITE_NAME } from "@/config/site";
import { cn } from "@/lib/utils";

/** Body line-height / smoothing (ribbon surface colors come from globals.css animations). */
const ribbonText =
  "text-[14px] font-normal leading-normal [-webkit-font-smoothing:antialiased]";

const ribbonLinkInteractions =
  "font-medium underline-offset-2 outline-offset-2 no-underline transition-[text-decoration] duration-150 hover:underline focus-visible:underline focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-current motion-reduce:transition-none";

/** Must stay in sync with ribbon drop CSS: `max-height` + `translateY` (~800ms ease-in-out). */
const RIBBON_SLIDE_MS = 800;
const APPLE_HOLD_BEFORE_FILL_MS = 1800;

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
}

export function TipAnnouncementBar() {
  const regionId = useId();
  const slideRef = useRef<HTMLDivElement>(null);
  const slabRef = useRef<HTMLDivElement>(null);
  const [hydrated, setHydrated] = useState(false);
  const [slideOpen, setSlideOpen] = useState(false);
  const [fillArmed, setFillArmed] = useState(false);
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current = prefersReducedMotion();
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    if (reducedMotion.current) {
      setSlideOpen(true);
      return;
    }
    const slideId = requestAnimationFrame(() => setSlideOpen(true));
    return () => cancelAnimationFrame(slideId);
  }, [hydrated]);

  /** After slab `transform` finishes, wait Apple hold, then run keyed fill (`--fill-armed`). */
  useEffect(() => {
    if (!slideOpen) return;
    if (reducedMotion.current) return;

    const el = slabRef.current ?? slideRef.current;
    if (!el) {
      const fallbackAll = window.setTimeout(
        () => setFillArmed(true),
        RIBBON_SLIDE_MS + APPLE_HOLD_BEFORE_FILL_MS,
      );
      return () => window.clearTimeout(fallbackAll);
    }

    let settled = false;
    let holdAfterSlide: number | undefined;
    const beginHoldPhase = () => {
      if (settled) return;
      settled = true;
      holdAfterSlide = window.setTimeout(() => setFillArmed(true), APPLE_HOLD_BEFORE_FILL_MS);
    };

    const onTransitionEnd = (e: TransitionEvent) => {
      if (e.propertyName !== "transform") return;
      el.removeEventListener("transitionend", onTransitionEnd);
      window.clearTimeout(fallbackSlideDone);
      beginHoldPhase();
    };

    const fallbackSlideDone = window.setTimeout(() => {
      el.removeEventListener("transitionend", onTransitionEnd);
      beginHoldPhase();
    }, RIBBON_SLIDE_MS + 120);

    el.addEventListener("transitionend", onTransitionEnd);

    return () => {
      el.removeEventListener("transitionend", onTransitionEnd);
      window.clearTimeout(fallbackSlideDone);
      if (holdAfterSlide !== undefined) window.clearTimeout(holdAfterSlide);
    };
  }, [slideOpen]);

  if (!hydrated) {
    return null;
  }

  return (
    <div
      ref={slideRef}
      className={cn("ivnix-tip-ribbon-slide", slideOpen && "ivnix-tip-ribbon-slide--open")}
    >
      {/* Painted slab + copy translate together inside `.ivnix-tip-ribbon-host` (fixed slot — no layout shove). */}
      <div
        ref={slabRef}
        id={regionId}
        role="region"
        aria-label={`Support ${SITE_NAME}`}
        className={cn(
          "ribbon-content-wrapper ivnix-tip-ribbon-content w-full",
          fillArmed && "ivnix-tip-ribbon-content--fill-armed",
          ribbonText,
        )}
      >
        <div className="ivnix-tip-ribbon-prose flex min-h-[52px] w-full flex-wrap items-center justify-center gap-x-2 gap-y-1 sm:flex-nowrap sm:gap-x-3">
          <span>
            {SITE_NAME} is solo-built and stays free. If a calculator gave you certainty, a small tip buys the next upgrade.
          </span>{" "}
          <Link
            href="/support"
            prefetch={false}
            className={cn("ivnix-tip-ribbon-link whitespace-nowrap", ribbonLinkInteractions)}
          >
            Tip me&nbsp;here&nbsp;›
          </Link>
        </div>
      </div>
    </div>
  );
}

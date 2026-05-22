"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useMemo, useState } from "react";
import { SITE_NAME } from "@/config/site";
import { cn } from "@/lib/utils";

const TIP_PRESETS = [2, 4, 6] as const;

type PresetChoice = (typeof TIP_PRESETS)[number] | "custom";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
});

const segWrap = "rounded-full bg-[#F5F5F7] p-1";
const segBtn =
  "min-h-[44px] flex-1 rounded-full px-3 text-sm font-semibold text-neutral-800 outline-none transition focus-visible:ring-2 focus-visible:ring-[#0047FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F5F5F7]";
const segInactive = "text-neutral-700/90 hover:bg-[#FFFFFF]";
const segActive = "bg-[#FFFFFF] text-neutral-900 shadow-sm";

function parseCustomUsd(raw: string): number | null {
  const t = raw.trim().replace(/\.$/, "");
  if (t === "" || !/^\d+(\.\d{1,2})?$/.test(t)) return null;
  const n = Number.parseFloat(t);
  if (!Number.isFinite(n)) return null;
  const rounded = Math.round(n * 100) / 100;
  if (rounded < 1 || rounded > 999) return null;
  return rounded;
}

export function SupportTipClient() {
  const formId = useId();
  const [preset, setPreset] = useState<PresetChoice>(4);
  const [customRaw, setCustomRaw] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [thanks, setThanks] = useState(false);
  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const tip = new URLSearchParams(window.location.search).get("tip");
    if (tip === "thanks") setThanks(true);
    else if (tip === "cancelled") setCancelled(true);
    try {
      const url = new URL(window.location.href);
      url.searchParams.delete("tip");
      url.searchParams.delete("stripe_cs");
      window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
    } catch {
      /* ignore */
    }
  }, []);

  const cappedMessage = message.slice(0, 480);

  const tipUsdResolved = useMemo(() => {
    if (preset !== "custom") return preset;
    return parseCustomUsd(customRaw);
  }, [preset, customRaw]);

  const checkoutAmountValid = preset !== "custom" ? true : tipUsdResolved != null;

  const startCheckout = useCallback(async () => {
    setError(null);
    const amount = preset === "custom" ? tipUsdResolved : preset;
    if (amount == null || !Number.isFinite(amount)) {
      setError("Enter a valid dollar amount ($1–$999, up to 2 decimals).");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "payment",
          amountUsd: amount,
          message: cappedMessage.trim() || undefined,
        }),
      });

      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok) {
        setError(data.error ?? "Checkout is not available.");
        return;
      }
      if (data.url) {
        window.location.href = data.url;
        return;
      }
      setError("Unexpected response from checkout.");
    } catch {
      setError("Network error. Try again.");
    } finally {
      setLoading(false);
    }
  }, [preset, tipUsdResolved, cappedMessage]);

  return (
    <div className="min-h-[calc(100dvh-2rem)] px-4 py-10 text-neutral-900">
      <div className="mx-auto w-full max-w-md">
        <p className="mb-6 text-center text-sm text-neutral-600">
          <Link
            href="/"
            className="font-medium text-[#0047FF] no-underline hover:underline focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0047FF]"
          >
            ← Back to {SITE_NAME}
          </Link>
        </p>

        {thanks ? (
          <div
            role="status"
            className="mb-8 rounded-2xl border border-green-200 bg-green-50 px-5 py-4 text-center text-sm text-green-950"
          >
            Thank you for supporting {SITE_NAME}. It helps fund the roadmap and keeps new calculators sharp.
            Stripe will email your receipt.
          </div>
        ) : null}

        {cancelled ? (
          <div
            role="status"
            className="mb-8 rounded-2xl border border-neutral-200 bg-[#F5F5F7] px-5 py-4 text-center text-sm text-neutral-800"
          >
            Checkout closed before payment. Whenever you&apos;re ready, you can pick an amount below and continue.
          </div>
        ) : null}

        <div className="rounded-[1.75rem] bg-[#FFFFFF] px-6 py-8 shadow-sm ring-1 ring-black/[0.06]">
          <h1
            id={formId}
            className="text-balance text-center text-xl font-bold leading-snug tracking-tight text-neutral-950"
          >
            Support {SITE_NAME}
          </h1>
          <p className="mt-2 text-center text-sm leading-relaxed text-neutral-600">
            Choose a one-time tip amount. Stripe handles payment safely.
          </p>

          <div className="mt-8 space-y-4">
            <p className="text-center text-sm font-medium text-neutral-800">Choose an amount</p>
            <div
              role="radiogroup"
              aria-label="Tip amount presets"
              className={cn(segWrap, "grid w-full grid-cols-4 gap-0.5 p-1 sm:flex sm:flex-wrap sm:justify-center")}
            >
              {TIP_PRESETS.map((usd) => (
                <button
                  key={usd}
                  type="button"
                  role="radio"
                  aria-checked={preset === usd}
                  className={cn(
                    segBtn,
                    "!min-h-[44px] min-w-0 shrink-0",
                    preset === usd ? segActive : segInactive,
                  )}
                  onClick={() => {
                    setPreset(usd);
                    setCustomRaw("");
                  }}
                >
                  ${usd}
                </button>
              ))}
              <button
                type="button"
                role="radio"
                aria-checked={preset === "custom"}
                className={cn(
                  segBtn,
                  "!min-h-[44px] min-w-0 shrink-0",
                  preset === "custom" ? segActive : segInactive,
                )}
                onClick={() => setPreset("custom")}
              >
                Other
              </button>
            </div>

            {preset === "custom" ? (
              <div>
                <label htmlFor={`${formId}-custom-tip`} className="sr-only">
                  Custom tip in US dollars
                </label>
                <div className="flex items-center overflow-hidden rounded-2xl bg-[#F5F5F7] px-4 ring-1 ring-neutral-200/80 focus-within:ring-2 focus-within:ring-[#0047FF]/40">
                  <span className="select-none text-lg font-semibold text-neutral-500" aria-hidden>
                    $
                  </span>
                  <input
                    id={`${formId}-custom-tip`}
                    type="text"
                    inputMode="decimal"
                    autoComplete="off"
                    placeholder="e.g. 5 or 12.50"
                    value={customRaw}
                    onChange={(e) => {
                      let v = e.target.value.replace(/[^\d.]/g, "");
                      const first = v.indexOf(".");
                      if (first !== -1) {
                        const head = v.slice(0, first);
                        const frac = v
                          .slice(first + 1)
                          .replace(/\./g, "")
                          .slice(0, 2);
                        v = frac.length > 0 ? `${head}.${frac}` : `${head}.`;
                      }
                      setCustomRaw(v);
                    }}
                    className="min-h-[48px] w-full bg-transparent px-2 py-3 text-[15px] font-medium text-neutral-900 outline-none placeholder:text-neutral-400"
                  />
                </div>
                <p className="mt-1.5 text-center text-xs text-neutral-500">
                  $1.00 minimum, $999.00 maximum, up to 2 decimals
                </p>
              </div>
            ) : null}
          </div>

          <div className="mt-6 rounded-2xl bg-[#F5F5F7] px-4 py-3.5 text-center">
            <p className="text-xs font-semibold uppercase tracking-wide text-neutral-600">Total</p>
            <p className="mt-1 font-semibold text-neutral-950">
              {preset === "custom" && tipUsdResolved == null ? (
                <span className="text-sm font-medium text-neutral-500">
                  Choose or enter an amount above
                </span>
              ) : preset === "custom" ? (
                <span className="tabular-nums">{currency.format(tipUsdResolved!)}</span>
              ) : (
                <span className="tabular-nums">{currency.format(preset)}</span>
              )}
            </p>
          </div>

          <label className="mt-8 block">
            <span className="sr-only">Your message</span>
            <textarea
              rows={3}
              value={message}
              maxLength={480}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Your message"
              autoComplete="off"
              className="w-full resize-none rounded-2xl border border-neutral-200/70 bg-[#F5F5F7] px-4 py-3 text-[15px] text-neutral-900 placeholder:text-neutral-400 outline-none transition focus-visible:ring-2 focus-visible:ring-[#0047FF]/35"
            />
          </label>
          <p className="mt-1 text-right text-xs text-neutral-500">{cappedMessage.length}/480</p>

          {error ? (
            <p className="mt-4 rounded-xl bg-amber-50 px-4 py-2 text-center text-sm text-amber-950" role="alert">
              {error}
            </p>
          ) : null}

          <button
            type="button"
            aria-busy={loading}
            disabled={loading || (preset === "custom" && !checkoutAmountValid)}
            onClick={() => void startCheckout()}
            className="mt-8 w-full rounded-full bg-[#0047FF] px-5 py-3.5 text-center text-[15px] font-bold text-white shadow-sm outline-none transition hover:bg-[#0039e6] focus-visible:ring-2 focus-visible:ring-[#0047FF] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          >
            {loading ? "Opening Stripe…" : "Continue"}
          </button>
          <p className="mt-4 text-center text-xs leading-relaxed text-neutral-600">
            You will finish on Stripe Checkout. Tips do not unlock extra features yet; they genuinely help roadmap time.
          </p>
        </div>
      </div>
    </div>
  );
}

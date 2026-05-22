"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SITE_NAME } from "@/config/site";

function TipThanksMessageInner() {
  const params = useSearchParams();
  const [show, setShow] = useState(false);
  const cleaned = useRef(false);

  useEffect(() => {
    if (params.get("tip") !== "thanks") return;
    setShow(true);
    if (cleaned.current) return;
    cleaned.current = true;
    try {
      const url = new URL(window.location.href);
      url.searchParams.delete("tip");
      window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
    } catch {
      /* ignore */
    }
  }, [params]);

  if (!show) return null;

  return (
    <div className="mx-auto max-w-7xl px-4 pt-4 md:px-8" role="status">
      <p className="rounded-lg border border-green-200 bg-green-50 px-4 py-2 text-sm text-green-950">
        Thanks. Your support helps keep {SITE_NAME} free.
      </p>
    </div>
  );
}

export function TipThanksMessage() {
  return (
    <Suspense fallback={null}>
      <TipThanksMessageInner />
    </Suspense>
  );
}

const FALLBACK = "http://localhost:3000";

/** Canonical origin for sitemaps, metadata, llms.txt, Open Graph */
export function getSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) {
    try {
      const href = /^https?:\/\//i.test(explicit) ? explicit : `https://${explicit}`;
      return new URL(href).href.replace(/\/$/, "");
    } catch {
      /* invalid NEXT_PUBLIC_SITE_URL */
    }
  }
  if (process.env.VERCEL_URL) {
    try {
      const host = process.env.VERCEL_URL.replace(/\/$/, "");
      return new URL(`https://${host}`).href.replace(/\/$/, "");
    } catch {
      /* ignore */
    }
  }
  return FALLBACK;
}

/** Safe for Next.js `metadataBase` — never throws */
export function getMetadataBaseUrl(): URL {
  try {
    return new URL(getSiteUrl());
  } catch {
    return new URL(FALLBACK);
  }
}

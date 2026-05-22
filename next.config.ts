import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Do **not** set `allowedDevOrigins` here unless Next.js changes how it applies.
   * When `allowedDevOrigins` is defined, dev mode uses strict blocking and rejects
   * cross-site `Sec-Fetch-Mode: no-cors` requests to `/_next/*` *before* the
   * allowlist runs. Stylesheets loaded via `<link rel="stylesheet">` use no-cors,
   * so embedded previews (Cursor / etc.) can get 403 on CSS → blank white pages.
   * Leaving it unset keeps “warn only” behavior and allows those assets through.
   * @see https://nextjs.org/docs/app/api-reference/config/next-config-js/allowedDevOrigins
   */
};

export default nextConfig;

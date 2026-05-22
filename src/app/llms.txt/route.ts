import { CATEGORY_NAV } from "@/data/navigation";
import { SITE_NAME, SITE_TAGLINE, SITE_ONE_LINER } from "@/config/site";
import { getSiteUrl } from "@/lib/site-url";

/**
 * Machine-readable site overview for LLM / AI crawlers (llms.txt convention).
 * https://llmstxt.org/
 */
export function GET() {
  const base = getSiteUrl();
  const lines = [
    `# ${SITE_NAME}`,
    `> ${SITE_TAGLINE}`,
    "",
    "## Summary",
    SITE_ONE_LINER,
    "",
    "## Primary pages",
    `- Home: ${base}/`,
    "",
    "## Calculator categories & tools",
    ...CATEGORY_NAV.flatMap((cat) => [
      `### ${cat.title}`,
      `- Category hub: ${base}/${cat.slug}`,
      ...cat.calculators.map(
        (c) => `- ${c.title}: ${base}/${cat.slug}/${c.slug}`,
      ),
      "",
    ]),
    "## Notes",
    "- Calculators run in the browser; replace SITE_URL via NEXT_PUBLIC_SITE_URL in production.",
    "- Educational estimates only — not financial or legal advice.",
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}

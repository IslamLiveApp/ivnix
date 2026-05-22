import { getSiteUrl } from "@/lib/site-url";
import { CATEGORY_NAV } from "@/data/navigation";
import { CALCULATOR_SUMMARIES, LANDING_FAQ } from "@/data/landing-copy";
import { SITE_NAME, SITE_ONE_LINER, SITE_TAGLINE } from "@/config/site";

export function LandingJsonLd() {
  const base = getSiteUrl();

  const itemListElement = CATEGORY_NAV.flatMap((cat, ci) =>
    cat.calculators.map((calc, si) => {
      const position =
        CATEGORY_NAV.slice(0, ci).reduce((s, c) => s + c.calculators.length, 0) +
        si +
        1;
      const path = `${cat.slug}/${calc.slug}`;
      return {
        "@type": "ListItem",
        position,
        name: calc.title,
        description: CALCULATOR_SUMMARIES[path] ?? calc.title,
        url: `${base}/${cat.slug}/${calc.slug}`,
      };
    }),
  );

  const graphs = [
    {
      "@type": "WebSite",
      "@id": `${base}/#website`,
      name: SITE_NAME,
      description: SITE_TAGLINE,
      url: base,
      inLanguage: "en",
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${base}/#app`,
      name: SITE_NAME,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description: SITE_ONE_LINER,
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "EUR",
      },
      url: base,
    },
    {
      "@type": "ItemList",
      "@id": `${base}/#calculators`,
      name: `${SITE_NAME} calculator index`,
      description: SITE_TAGLINE,
      numberOfItems: itemListElement.length,
      itemListElement,
    },
    {
      "@type": "FAQPage",
      "@id": `${base}/#faq`,
      mainEntity: LANDING_FAQ.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: f.answer,
        },
      })),
    },
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": graphs,
        }),
      }}
    />
  );
}

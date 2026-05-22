import type { MetadataRoute } from "next";
import { CATEGORY_NAV } from "@/data/navigation";
import { getSiteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const now = new Date();

  const entries: MetadataRoute.Sitemap = [
    {
      url: base,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
  ];

  for (const cat of CATEGORY_NAV) {
    entries.push({
      url: `${base}/${cat.slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    });
    for (const calc of cat.calculators) {
      entries.push({
        url: `${base}/${cat.slug}/${calc.slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.72,
      });
    }
  }

  return entries;
}

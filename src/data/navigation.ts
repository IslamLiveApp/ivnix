export type CategorySlug =
  | "paid-growth"
  | "organic-growth"
  | "sales"
  | "ecommerce"
  | "saas"
  | "influencers"
  | "investing"
  | "startup"
  | "marketplace";

export interface CalculatorNavItem {
  slug: string;
  title: string;
}

export interface CategoryNav {
  slug: CategorySlug;
  title: string;
  calculators: CalculatorNavItem[];
}

export const CATEGORY_NAV: CategoryNav[] = [
  {
    slug: "paid-growth",
    title: "Paid growth",
    calculators: [
      { slug: "roas", title: "ROAS calculator" },
      { slug: "facebook-ads", title: "Facebook Ads calculator" },
      { slug: "google-ads", title: "Google Ads calculator" },
      { slug: "email-campaign", title: "Email campaign revenue" },
    ],
  },
  {
    slug: "organic-growth",
    title: "Organic growth",
    calculators: [{ slug: "seo-roi", title: "SEO ROI calculator" }],
  },
  {
    slug: "sales",
    title: "Sales",
    calculators: [
      { slug: "lead-to-revenue", title: "Lead-to-revenue calculator" },
      { slug: "consulting-rate", title: "Consulting hourly rate" },
      { slug: "sdr-pipeline", title: "SDR outbound model" },
    ],
  },
  {
    slug: "ecommerce",
    title: "Ecommerce",
    calculators: [
      { slug: "product-profit", title: "Product profit calculator" },
      { slug: "contribution-margin", title: "Contribution margin" },
      { slug: "discount-impact", title: "Discount impact on profit" },
      { slug: "bundle-uplift", title: "Bundle / upsell uplift" },
    ],
  },
  {
    slug: "saas",
    title: "SaaS",
    calculators: [
      { slug: "mrr", title: "MRR / ARR calculator" },
      { slug: "cac", title: "CAC calculator" },
      { slug: "ltv-cac", title: "LTV & LTV:CAC" },
      { slug: "nrr", title: "Net revenue retention (NRR)" },
      { slug: "rule-of-40", title: "Rule of 40" },
    ],
  },
  {
    slug: "influencers",
    title: "Influencers",
    calculators: [
      { slug: "pricing", title: "Influencer pricing calculator" },
      { slug: "affiliate-revenue", title: "Affiliate commission model" },
    ],
  },
  {
    slug: "investing",
    title: "Investing",
    calculators: [{ slug: "roi", title: "ROI calculator" }],
  },
  {
    slug: "startup",
    title: "Startup",
    calculators: [{ slug: "break-even", title: "Break-even calculator" }],
  },
  {
    slug: "marketplace",
    title: "Marketplace",
    calculators: [
      { slug: "fees", title: "Marketplace fees calculator" },
      { slug: "processor-compare", title: "Payment processor comparison" },
    ],
  },
];

export function isCategorySlug(value: string): value is CategorySlug {
  return CATEGORY_NAV.some((c) => c.slug === value);
}

export function findCategory(slug: string) {
  return CATEGORY_NAV.find((c) => c.slug === slug);
}

export function getFirstCalculatorPath(): string {
  const first = CATEGORY_NAV[0]?.calculators[0];
  const cat = CATEGORY_NAV[0]?.slug;
  if (!first || !cat) return "/paid-growth/roas";
  return `/${cat}/${first.slug}`;
}

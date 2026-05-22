/**
 * Short intros for landing SEO sections — keyed by category slug from navigation.
 */
export const CATEGORY_INTROS: Record<string, string> = {
  "paid-growth":
    "ROAS plus Meta/Google funnel models and revenue from email — opens, clicks, purchases, and order values.",
  "organic-growth":
    "Connect organic traffic to revenue with an SEO ROI model — sessions, conversion rate, profit per order, and ongoing SEO cost.",
  sales:
    "Pipeline revenue, consulting bill rates from annual targets, and outbound SDR activity through connect → meeting → close.",
  ecommerce:
    "Per-order profit, contribution margin, discount erosion on gross profit, and bundle attach uplift.",
  saas:
    "MRR, CAC, LTV:CAC, net revenue retention, and Rule of 40 — subscription unit economics in one place.",
  influencers:
    "Creator sponsorship pricing plus attributed affiliate revenue, commissions, and merchant net.",
  investing:
    "Classic ROI and payback framing for any investment where you know cost and money returned.",
  startup:
    "Break-even units from fixed costs, selling price, and variable cost per unit.",
  marketplace:
    "Seller proceeds after marketplace commission — compare flat-plus-percent payment processors side by side.",
};

/** One line per calculator route key `category/slug` */
export const CALCULATOR_SUMMARIES: Record<string, string> = {
  "paid-growth/roas": "Revenue ÷ ad spend with profit readout.",
  "paid-growth/facebook-ads": "Spend + funnel assumptions → clicks, conversions, ROAS, CPA, CPC.",
  "paid-growth/google-ads": "Same paid-search funnel model with Google Ads labeling.",
  "paid-growth/email-campaign": "Delivered sends × opens × clicks × purchases × AOV.",
  "organic-growth/seo-roi": "Organic sessions × conversion × profit − SEO cost.",
  "sales/lead-to-revenue": "Lead funnel math into expected wins and revenue.",
  "sales/consulting-rate": "Annual pay goal + expenses ÷ billable hours.",
  "sales/sdr-pipeline": "Touches × connect × meeting × win × deal size.",
  "ecommerce/product-profit": "Selling price minus costs and fees per order.",
  "ecommerce/contribution-margin": "Revenue − variable costs in € and %.",
  "ecommerce/discount-impact": "Unit profit before vs after a discount; volume lift to hold profit.",
  "ecommerce/bundle-uplift": "Orders × attach rate × incremental margin per add-on.",
  "saas/mrr": "MRR, expansion, churn, and implied ARR snapshot.",
  "saas/cac": "S&M spend ÷ new customers.",
  "saas/ltv-cac": "ARPU × margin × lifetime vs CAC and ratio.",
  "saas/nrr": "(Start + expansion − churn − contraction) ÷ start.",
  "saas/rule-of-40": "YoY revenue growth % plus profit margin %.",
  "influencers/pricing": "CPM + engagement-adjusted fee vs modeled gross profit.",
  "influencers/affiliate-revenue": "Clicks × CR × revenue × commission vs merchant net.",
  "investing/roi": "Percent ROI and gain-to-cost multiple.",
  "startup/break-even": "Units to cover fixed costs.",
  "marketplace/fees": "Seller net after commission and payment fees.",
  "marketplace/processor-compare": "Same ticket — net after fixed + percent fees for two providers.",
};

/** Visible FAQs — kept in sync with FAQPage JSON-LD on the homepage */
export const LANDING_FAQ = [
  {
    question: "Are these calculators free to use?",
    answer:
      "Yes. Every tool on this site is free to use in the browser. There is no signup wall for the calculators themselves.",
  },
  {
    question: "Do you save the numbers I enter?",
    answer:
      "These calculators run as interactive pages in your browser. We do not provide an account system here, so there is no profile where inputs are stored on our side. Treat sensitive figures like any local draft — refresh clears your session.",
  },
  {
    question: "What is the difference between ROI and ROAS?",
    answer:
      "ROI (return on investment) compares net gain to what you put in, often as a percentage. ROAS (return on ad spend) is revenue divided by advertising spend — it is the standard shorthand for paid media efficiency before broader overhead.",
  },
  {
    question: "Can I use this for influencer or creator campaigns?",
    answer:
      "Yes. The influencer pricing calculator combines views, engagement, CPM, and your funnel assumptions to estimate fair fees, clicks, sales, and whether a deal is inside your modeled gross-profit ceiling.",
  },
  {
    question: "Is this financial, legal, or tax advice?",
    answer:
      "No. Outputs are educational estimates based on the inputs you supply. Markets, platforms, and tax rules vary — validate assumptions with a qualified advisor before committing capital.",
  },
  {
    question: "Why use this instead of a spreadsheet?",
    answer:
      "Spreadsheets are flexible but easy to break. Here you get consistent formulas, plain-language labels, and fast checks across ads, SaaS, ecommerce, creators, and marketplace economics — ideal when you want an answer in minutes.",
  },
  {
    question: "Will search engines and AI assistants understand this site?",
    answer:
      "This homepage includes clear summaries, structured FAQs, internal links to every calculator, machine-readable metadata, and an llms.txt summary file so crawlers and assistants can discover what we offer and how pages relate.",
  },
] as const;

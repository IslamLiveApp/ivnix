import type { CalculatorGuideConfig } from "@/components/calculator/calculator-guide";

/** “Simple rule of thumb” guides keyed by category/slug (matches CalculatorBody routes). */
export const CALCULATOR_GUIDES: Record<string, CalculatorGuideConfig> = {
  "investing/roi": {
    steps: [
      {
        heading: "Pick your period",
        body: "Choose day, month, or year—cost and gain scale when you switch (e.g. €1,000/month → ~€33/day).",
      },
      {
        heading: "Use the same window",
        body: "Cost and gain must cover the same investment window (one campaign, one project, or one reporting period).",
      },
      {
        heading: "Compare to alternatives",
        body: "ROI alone does not include risk or time. Use payback and your hurdle rate before committing more capital.",
      },
    ],
    example: {
      heading: "Example",
      lines: [
        "Spend €10,000 on equipment · modeled return €13,500 in year one",
        "Enter cost €10,000 and gain €13,500 with period “year”.",
      ],
    },
  },
  "paid-growth/roas": {
    steps: [
      {
        heading: "Pick your period",
        body: "Spend and revenue scale when you change period; ROAS stays the same if both scale together.",
      },
      {
        heading: "Match ad platform dates",
        body: "Pull spend and attributed revenue from the same date range in your ads or analytics tool.",
      },
      {
        heading: "ROAS above 1× is not always profit",
        body: "Subtract COGS, fulfillment, and overhead. Many brands need ROAS well above 1× to be profitable.",
      },
    ],
    example: {
      heading: "Example",
      lines: [
        "€5,000 monthly ad spend · €12,500 attributed revenue → ROAS 2.5×",
        "Enter €5,000 and €12,500 with period “month”.",
      ],
    },
  },
  "paid-growth/email-campaign": {
    steps: [
      {
        heading: "Pick your period",
        body: "Send volume and revenue scale with period; open, click, and purchase rates stay as percentages.",
      },
      {
        heading: "Use one send or roll-up",
        body: "Either model a single blast or total sends in the month—do not mix per-send rates with annual volume.",
      },
      {
        heading: "Sanity-check rates",
        body: "Opens are usually well below 100%. Click rate is of opens, purchase rate is of clicks—read each ⓘ tooltip.",
      },
    ],
    example: {
      heading: "Example",
      lines: [
        "50,000 recipients · 22% open · 8% click (of opens) · 3% purchase (of clicks) · €45 AOV",
        "Revenue ≈ sends × open × click × purchase × AOV.",
      ],
    },
  },
  "organic-growth/seo-roi": {
    steps: [
      {
        heading: "Pick your period",
        body: "Sessions and SEO cost scale with period; conversion % and profit per order do not.",
      },
      {
        heading: "Use organic sessions only",
        body: "From Google Analytics (or similar): organic channel, same date range as your SEO spend.",
      },
      {
        heading: "Include labor and tools",
        body: "SEO cost should cover agency, tools, and content time—not just link spend.",
      },
    ],
    example: {
      heading: "Example",
      lines: [
        "8,000 organic sessions/month · 2% CVR · €30 profit/order · €2,000 SEO cost",
        "Profit ≈ sessions × CVR × profit − cost.",
      ],
    },
  },
  "ecommerce/product-profit": {
    steps: [
      {
        heading: "Per-order model",
        body: "This calculator is per unit sold. The period selector is for reference only—amounts do not auto-scale (a €50 margin is still €50 per order).",
      },
      {
        heading: "Include all variable costs",
        body: "COGS, shipping, payment %, marketplace %, and ad cost per order belong in the stack.",
      },
      {
        heading: "Multiply by volume separately",
        body: "Monthly profit ≈ unit profit × orders in the month.",
      },
    ],
    example: {
      heading: "Example",
      lines: [
        "Price €89 · COGS €32 · shipping €6 · fees 3% · €12 ad cost/order → unit profit in results.",
      ],
    },
  },
  "ecommerce/contribution-margin": {
    steps: [
      {
        heading: "Pick your period",
        body: "Revenue and variable costs scale when you switch period; use totals for the same window.",
      },
      {
        heading: "Variable vs fixed",
        body: "Only costs that grow with each sale belong in variable costs. Rent and salaries stay out.",
      },
      {
        heading: "Use for pricing and promos",
        body: "Contribution % shows how much of revenue funds fixed overhead and profit.",
      },
    ],
  },
  "ecommerce/discount-impact": {
    steps: [
      {
        heading: "Per-unit before and after",
        body: "Enter one SKU’s economics. Period selector does not scale prices—compare scenarios on a single unit first.",
      },
      {
        heading: "Read break-even volume",
        body: "A 10% price cut often needs far more than 10% extra units to hold the same gross profit.",
      },
      {
        heading: "Check margin floor",
        body: "If discounted margin is near zero, small cost increases erase profit entirely.",
      },
    ],
  },
  "ecommerce/bundle-uplift": {
    steps: [
      {
        heading: "Pick your period",
        body: "Order count and incremental profit scale with period; attach rate stays a %.",
      },
      {
        heading: "Attach rate is realistic",
        body: "Use historical “orders with add-on” ÷ total orders, not wishful uptake.",
      },
      {
        heading: "Incremental profit only",
        body: "Enter gross profit from the add-on after its own COGS—not full bundle price.",
      },
    ],
  },
  "startup/break-even": {
    steps: [
      {
        heading: "Pick your period",
        body: "Fixed costs scale with period (monthly rent → daily equivalent when you switch). Price and variable cost per unit do not scale.",
      },
      {
        heading: "Contribution per unit",
        body: "Break-even units = fixed costs ÷ (price − variable cost). Both sides must be the same period for fixed costs.",
      },
      {
        heading: "Cash vs accounting",
        body: "Use cash fixed costs you must cover; exclude non-cash items unless you model them deliberately.",
      },
    ],
  },
  "saas/mrr": {
    steps: [
      {
        heading: "Snapshot metrics",
        body: "MRR, expansion, and churn are monthly recurring figures. The period toggle does not scale them—use monthly inputs.",
      },
      {
        heading: "Churn as lost MRR",
        body: "Enter churn as revenue lost from cancellations/downgrades in the month, not logo count unless you convert.",
      },
      {
        heading: "Net new MRR",
        body: "Starting MRR + expansion − churn = ending MRR in this simple model.",
      },
    ],
  },
  "saas/cac": {
    steps: [
      {
        heading: "Pick your period",
        body: "Spend and new customers should both be totals for the same day, month, or year— they scale together when you switch period.",
      },
      {
        heading: "Fully loaded S&M",
        body: "Include ads, salaries, tools, and agency—only costs tied to acquiring new customers.",
      },
      {
        heading: "Compare to LTV",
        body: "Healthy SaaS often targets LTV:CAC of 3:1 or better; use the LTV calculator next.",
      },
    ],
  },
  "saas/ltv-cac": {
    steps: [
      {
        heading: "Pick your period",
        body: "ARPU and CAC scale with period when entered as period totals; margin % and lifetime months do not.",
      },
      {
        heading: "Gross margin on revenue",
        body: "LTV uses ARPU × margin × lifetime months—a simple model, not discounted cash flow.",
      },
      {
        heading: "Align CAC window",
        body: "CAC spend and new logos must be from the same acquisition period as your ARPU assumption.",
      },
    ],
  },
  "saas/nrr": {
    steps: [
      {
        heading: "Pick your period",
        body: "Starting ARR/MRR base and dollar expansion/churn/contraction scale together for the selected period.",
      },
      {
        heading: "Cohort base only",
        body: "NRR is measured on revenue from customers who existed at period start—exclude brand-new logos from the base.",
      },
      {
        heading: "Above 100% is expansion-led",
        body: "NRR above 100% means expansion outweighs churn and contraction on the starting base.",
      },
    ],
  },
  "saas/rule-of-40": {
    steps: [
      {
        heading: "Annual view",
        body: "Use year-over-year revenue growth % and profit margin % for the same fiscal year. Period toggle does not scale these percentages.",
      },
      {
        heading: "Investor shorthand",
        body: "Growth % + margin % ≥ 40 is a common quick screen—not a substitute for unit economics.",
      },
      {
        heading: "Define margin consistently",
        body: "Use the same EBITDA or FCF definition your board uses.",
      },
    ],
  },
  "influencers/pricing": {
    steps: [
      {
        heading: "Pick your period",
        body: "Views, likes, and comments scale when you switch period (campaign totals). CTR, conversion %, CPM, and profit per sale stay unchanged.",
      },
      {
        heading: "Use recent performance",
        body: "Average the creator’s last ~10 posts—not one viral outlier.",
      },
      {
        heading: "Cap price at modeled profit",
        body: "If CPM-based price exceeds max budget, negotiate or switch to affiliate/CPA.",
      },
    ],
    example: {
      heading: "Example",
      lines: [
        "100k views · 3.5% ER · €20 CPM · 1% view→click · 2% click→sale · €50 profit/sale",
        "Compare CPM fair price to max budget from funnel × profit.",
      ],
    },
  },
  "influencers/affiliate-revenue": {
    steps: [
      {
        heading: "Pick your period",
        body: "Traffic and basket revenue scale with period; conversion and commission % stay as rates.",
      },
      {
        heading: "Gross vs net",
        body: "Commission is paid on tracked revenue; net is what you keep after payout.",
      },
      {
        heading: "Attribute carefully",
        body: "Use affiliate dashboard or UTM-tagged revenue for the same date range as clicks/sessions.",
      },
    ],
  },
  "sales/lead-to-revenue": {
    steps: [
      {
        heading: "Pick your period",
        body: "Lead count and deal size scale with period; qualification and win rates stay as %.",
      },
      {
        heading: "One funnel stage at a time",
        body: "Qualification % is leads → qualified; win rate is qualified → closed won.",
      },
      {
        heading: "Pipeline vs closed",
        body: "Use closed-won deals in the period for revenue, not open pipeline value.",
      },
    ],
  },
  "sales/consulting-rate": {
    steps: [
      {
        heading: "Annual goal first",
        body: "Income target and expenses scale with period when you switch; billable hours per week do not.",
      },
      {
        heading: "Realistic billable hours",
        body: "Subtract sales, admin, and vacation—many consultants bill 20–28 hours/week, not 40.",
      },
      {
        heading: "Add tax buffer separately",
        body: "This rate is pre-tax; increase for VAT and income tax in your country.",
      },
    ],
  },
  "sales/sdr-pipeline": {
    steps: [
      {
        heading: "Pick your period",
        body: "Touches per day scale to month/year when you switch; connect and meeting rates stay as %.",
      },
      {
        heading: "SDR activity math",
        body: "Daily touches × working days × connect % × meeting % × close % × deal size ≈ pipeline.",
      },
      {
        heading: "Tune from CRM",
        body: "Pull connect and meeting-set rates from the last 30–90 days of outbound activity.",
      },
    ],
  },
  "marketplace/fees": {
    steps: [
      {
        heading: "Pick your period",
        body: "Gross sales total scales when you switch period (e.g. daily GMV → monthly). Commission and payment % stay the same.",
      },
      {
        heading: "Gross before fees",
        body: "Enter top-line sales before marketplace and processor take rates.",
      },
      {
        heading: "Stack both fees",
        body: "Platform commission and card processing both reduce net—this model subtracts both from gross.",
      },
    ],
    example: {
      heading: "Example",
      lines: [
        "€120 sale · 12% marketplace · 2.9% payments → net in results.",
        "For monthly roll-up, enter total gross sales for the month with period “month”.",
      ],
    },
  },
  "marketplace/processor-compare": {
    steps: [
      {
        heading: "Pick your period",
        body: "Total charge volume scales when you switch period. Fixed fee per transaction does not scale—it's per charge.",
      },
      {
        heading: "Same ticket or total volume",
        body: "For one checkout, enter the charge amount. For period comparison, enter total volume processed and treat fixed fees as per-txn in your head.",
      },
      {
        heading: "Compare apples to apples",
        body: "Use the same currency, card mix, and refund rate assumptions for both processors.",
      },
    ],
    example: {
      heading: "Example",
      lines: [
        "€250 charge · Processor A €0.25 + 2.9% vs B 2.5% only → net received on each side.",
        "€7,500 monthly volume: enter €7,500 with period “month”; fixed €0.25 still applies per transaction.",
      ],
    },
  },
};

export function getCalculatorGuide(key: string): CalculatorGuideConfig | undefined {
  return CALCULATOR_GUIDES[key];
}

"use client";

import InfluencerPricingCalculator from "@/components/calculators/influencer-pricing";
import RoiCalculator from "@/components/calculators/roi";
import RoasCalculator from "@/components/calculators/roas";
import PaidAdsCalculator from "@/components/calculators/paid-ads";
import SeoRoiCalculator from "@/components/calculators/seo-roi";
import ProductProfitCalculator from "@/components/calculators/product-profit";
import BreakEvenCalculator from "@/components/calculators/break-even";
import SaasMrrCalculator from "@/components/calculators/saas-mrr";
import SalesConversionCalculator from "@/components/calculators/sales-conversion";
import MarketplaceFeesCalculator from "@/components/calculators/marketplace-fees";
import CacCalculator from "@/components/calculators/cac";
import LtvCacCalculator from "@/components/calculators/ltv-cac";
import NrrCalculator from "@/components/calculators/nrr";
import RuleOf40Calculator from "@/components/calculators/rule-of-40";
import ConsultingRateCalculator from "@/components/calculators/consulting-rate";
import SdrPipelineCalculator from "@/components/calculators/sdr-pipeline";
import EmailCampaignCalculator from "@/components/calculators/email-campaign";
import ContributionMarginCalculator from "@/components/calculators/contribution-margin";
import DiscountImpactCalculator from "@/components/calculators/discount-impact";
import BundleUpliftCalculator from "@/components/calculators/bundle-uplift";
import AffiliateRevenueCalculator from "@/components/calculators/affiliate-revenue";
import ProcessorCompareCalculator from "@/components/calculators/processor-compare";

export function CalculatorBody({
  category,
  slug,
}: {
  category: string;
  slug: string;
}) {
  const key = `${category}/${slug}`;

  switch (key) {
    case "investing/roi":
      return <RoiCalculator />;
    case "paid-growth/roas":
      return <RoasCalculator />;
    case "paid-growth/facebook-ads":
      return <PaidAdsCalculator platform="facebook" />;
    case "paid-growth/google-ads":
      return <PaidAdsCalculator platform="google" />;
    case "paid-growth/email-campaign":
      return <EmailCampaignCalculator />;
    case "organic-growth/seo-roi":
      return <SeoRoiCalculator />;
    case "ecommerce/product-profit":
      return <ProductProfitCalculator />;
    case "ecommerce/contribution-margin":
      return <ContributionMarginCalculator />;
    case "ecommerce/discount-impact":
      return <DiscountImpactCalculator />;
    case "ecommerce/bundle-uplift":
      return <BundleUpliftCalculator />;
    case "startup/break-even":
      return <BreakEvenCalculator />;
    case "saas/mrr":
      return <SaasMrrCalculator />;
    case "saas/cac":
      return <CacCalculator />;
    case "saas/ltv-cac":
      return <LtvCacCalculator />;
    case "saas/nrr":
      return <NrrCalculator />;
    case "saas/rule-of-40":
      return <RuleOf40Calculator />;
    case "influencers/pricing":
      return <InfluencerPricingCalculator />;
    case "influencers/affiliate-revenue":
      return <AffiliateRevenueCalculator />;
    case "sales/lead-to-revenue":
      return <SalesConversionCalculator />;
    case "sales/consulting-rate":
      return <ConsultingRateCalculator />;
    case "sales/sdr-pipeline":
      return <SdrPipelineCalculator />;
    case "marketplace/fees":
      return <MarketplaceFeesCalculator />;
    case "marketplace/processor-compare":
      return <ProcessorCompareCalculator />;
    default:
      return (
        <div className="p-8 text-center text-sm text-muted-foreground">
          Calculator not found.
        </div>
      );
  }
}

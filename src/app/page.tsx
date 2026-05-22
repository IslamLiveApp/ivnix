import type { Metadata } from "next";
import { LandingPage } from "@/components/marketing/landing-page";
import {
  SITE_NAME,
  SITE_ONE_LINER,
  SITE_TAGLINE,
} from "@/config/site";
import { getSiteUrl } from "@/lib/site-url";

const url = getSiteUrl();

export const metadata: Metadata = {
  title: SITE_NAME,
  description: SITE_TAGLINE,
  keywords: [
    "ROI calculator",
    "ROAS calculator",
    "CAC calculator",
    "break-even calculator",
    "MRR calculator",
    "ARR calculator",
    "influencer pricing calculator",
    "SEO ROI calculator",
    "ecommerce profit calculator",
    "business calculator",
    "paid ads calculator",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: "website",
    locale: "en",
    url,
    siteName: SITE_NAME,
    title: `${SITE_NAME} · ${SITE_ONE_LINER}`,
    description: SITE_TAGLINE,
  },
  twitter: {
    card: "summary",
    title: SITE_NAME,
    description: SITE_TAGLINE,
  },
};

export default function HomePage() {
  return <LandingPage />;
}

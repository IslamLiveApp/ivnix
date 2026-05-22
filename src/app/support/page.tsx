import type { Metadata } from "next";
import { SupportTipClient } from "@/components/support/support-tip-client";
import { SITE_NAME } from "@/config/site";

export const metadata: Metadata = {
  title: "Support",
  description: `Send a one-time tip to support ${SITE_NAME}.`,
  robots: { index: false, follow: false },
};

export default function SupportPage() {
  return <SupportTipClient />;
}

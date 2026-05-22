import type { Metadata } from "next";
import { Inter, Quicksand } from "next/font/google";
import "./globals.css";
import { SITE_NAME, SITE_TAGLINE } from "@/config/site";
import { getMetadataBaseUrl } from "@/lib/site-url";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

/** Rounded geometric sans — brand wordmark to pair with logo shapes */
const brandRounded = Quicksand({
  subsets: ["latin"],
  variable: "--font-brand-rounded",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: getMetadataBaseUrl(),
  title: {
    default: SITE_NAME,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_TAGLINE,
  icons: {
    icon: [{ url: "/ivnix_icon.svg", type: "image/svg+xml" }],
    shortcut: "/ivnix_icon.svg",
    apple: "/ivnix_icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${brandRounded.variable}`}>
      {/* Browser extensions often inject attributes onto <body> before React hydrates. */}
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}

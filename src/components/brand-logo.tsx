/* eslint-disable @next/next/no-img-element -- brand SVG from /public; avoids Next/Image SVG CSP */
import { cn } from "@/lib/utils";

/** Served from `/public/ivnix_icon.svg` */
export const BRAND_LOGO_SRC = "/ivnix_icon.svg";

type BrandLogoProps = {
  className?: string;
  /** Pixel size (width & height) */
  size?: number;
};

export function BrandLogo({ className, size = 36 }: BrandLogoProps) {
  return (
    <img
      src={BRAND_LOGO_SRC}
      alt=""
      width={size}
      height={size}
      decoding="async"
      className={cn("shrink-0 object-contain", className)}
      aria-hidden
    />
  );
}

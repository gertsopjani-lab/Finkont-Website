import Image from "next/image";
import Link from "next/link";

import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

interface BrandLogoProps {
  /** Wrapper (link) classes. */
  className?: string;
  /** Logo image sizing classes. */
  imageClassName?: string;
  /** Render the "Finkont" wordmark next to the mark. */
  showWordmark?: boolean;
  /** Optional click handler (e.g. close the mobile menu). */
  onNavigate?: () => void;
}

/**
 * Official brand logo, optimized for the premium dark canvas.
 *
 * The asset is transparent (`siteConfig.logo`) and rendered with a soft brand
 * purple glow (drop-shadow) so it blends natively into the glassmorphic theme.
 * `unoptimized` keeps the optimizer out of the way so both SVG and raster
 * assets render crisply without extra config; sizing is responsive.
 */
export function BrandLogo({
  className,
  imageClassName,
  showWordmark = true,
  onNavigate,
}: BrandLogoProps) {
  return (
    <Link
      href="/"
      onClick={onNavigate}
      aria-label={`${siteConfig.name} — home`}
      className={cn("group flex items-center gap-2.5", className)}
    >
      <Image
        src={siteConfig.logo}
        alt={`${siteConfig.name} logo`}
        width={40}
        height={40}
        priority
        unoptimized
        className={cn(
          "h-8 w-8 object-contain transition-transform duration-300 [filter:drop-shadow(0_0_10px_rgba(174,123,229,0.45))] group-hover:scale-105 sm:h-9 sm:w-9",
          imageClassName,
        )}
      />
      {showWordmark && (
        <span className="text-lg font-semibold tracking-tight text-accent-neutral">
          {siteConfig.name}
        </span>
      )}
    </Link>
  );
}

"use client";

import { useRef } from "react";
import { Facebook, Instagram, type LucideIcon } from "lucide-react";

import { Magnetic } from "@/components/ui/magnetic";
import { siteConfig, type SocialLink, type SocialPlatform } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const PLATFORM_ICONS: Record<SocialPlatform, LucideIcon> = {
  facebook: Facebook,
  instagram: Instagram,
};

interface SocialLinksProps {
  className?: string;
}

/**
 * Footer social icons.
 *
 * Each icon is wrapped in the ref-driven `Magnetic` component (cursor pull) and
 * carries the `.fk-spotlight` overlay that glows in brand purple as the cursor
 * approaches. Both effects are written straight to the DOM via refs / CSS vars
 * and are disabled automatically under `prefers-reduced-motion` (Magnetic
 * guards itself; the spotlight is forced transparent in globals.css).
 */
export function SocialLinks({ className }: SocialLinksProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      {siteConfig.social.map((link) => (
        <SocialIcon key={link.platform} link={link} />
      ))}
    </div>
  );
}

function SocialIcon({ link }: { link: SocialLink }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const frame = useRef<number | null>(null);
  const Icon = PLATFORM_ICONS[link.platform];

  const handlePointerMove = (
    event: React.PointerEvent<HTMLAnchorElement>,
  ): void => {
    const el = ref.current;
    if (!el) {
      return;
    }
    const rect = el.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    if (frame.current !== null) {
      cancelAnimationFrame(frame.current);
    }
    frame.current = requestAnimationFrame(() => {
      el.style.setProperty("--spot-x", `${x}px`);
      el.style.setProperty("--spot-y", `${y}px`);
      el.style.setProperty("--spot-opacity", "1");
    });
  };

  const handlePointerLeave = (): void => {
    const el = ref.current;
    if (!el) {
      return;
    }
    if (frame.current !== null) {
      cancelAnimationFrame(frame.current);
    }
    el.style.setProperty("--spot-opacity", "0");
  };

  return (
    <Magnetic strength={0.5}>
      <a
        ref={ref}
        href={link.href}
        target="_blank"
        rel="noreferrer"
        aria-label={link.label}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        style={
          {
            "--spot-radius": "70px",
            "--spot-strength": "0.5",
          } as React.CSSProperties
        }
        className="fk-glass group relative flex size-10 items-center justify-center overflow-hidden rounded-xl text-muted-foreground transition-colors duration-300 hover:border-primary/40 hover:text-primary"
      >
        <span
          aria-hidden="true"
          className="fk-spotlight pointer-events-none absolute inset-0 z-0"
        />
        <Icon className="relative z-[1] size-[18px]" aria-hidden="true" />
      </a>
    </Magnetic>
  );
}

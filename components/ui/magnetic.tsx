"use client";

import { useRef } from "react";

import { cn } from "@/lib/utils";

interface MagneticProps {
  children: React.ReactNode;
  /** How strongly the element follows the cursor (0–1). */
  strength?: number;
  className?: string;
}

function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * Wraps an element so it is magnetically pulled toward the cursor while the
 * pointer is over (near) it, easing back to center on leave.
 *
 * Performance: transform is written directly to the DOM via a ref inside a
 * single rAF — no React state. Respects `prefers-reduced-motion`.
 */
export function Magnetic({ children, strength = 0.4, className }: MagneticProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const frame = useRef<number | null>(null);

  const handlePointerMove = (event: React.PointerEvent<HTMLSpanElement>): void => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) {
      return;
    }

    const rect = el.getBoundingClientRect();
    const dx = event.clientX - (rect.left + rect.width / 2);
    const dy = event.clientY - (rect.top + rect.height / 2);

    if (frame.current !== null) {
      cancelAnimationFrame(frame.current);
    }
    frame.current = requestAnimationFrame(() => {
      el.style.transform = `translate(${(dx * strength).toFixed(2)}px, ${(
        dy * strength
      ).toFixed(2)}px)`;
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
    el.style.transform = "translate(0px, 0px)";
  };

  return (
    <span
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={cn(
        "inline-block transition-transform duration-300 ease-out will-change-transform",
        className,
      )}
    >
      {children}
    </span>
  );
}

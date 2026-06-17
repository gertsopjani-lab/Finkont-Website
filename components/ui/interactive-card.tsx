"use client";

import { useRef } from "react";

import { cn } from "@/lib/utils";

interface InteractiveCardProps {
  children: React.ReactNode;
  className?: string;
  /** Enable the cursor-follow purple spotlight glow. */
  spotlight?: boolean;
  /** Enable the 3D cursor tilt. */
  tilt?: boolean;
  /** Maximum tilt in degrees. */
  maxTilt?: number;
}

/**
 * Premium card surface with cursor-follow spotlight + 3D tilt.
 *
 * Performance: all interaction writes go straight to the DOM via a ref and CSS
 * custom properties inside a single `requestAnimationFrame` — no React state or
 * re-renders. The visual transitions live in `globals.css` (`.fk-spotlight` /
 * `.fk-tilt`), which also disables them under `prefers-reduced-motion`.
 */
export function InteractiveCard({
  children,
  className,
  spotlight = true,
  tilt = true,
  maxTilt = 6,
}: InteractiveCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef<number | null>(null);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>): void => {
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
      if (spotlight) {
        el.style.setProperty("--spot-x", `${x}px`);
        el.style.setProperty("--spot-y", `${y}px`);
        el.style.setProperty("--spot-opacity", "1");
      }
      if (tilt) {
        const rotateX = (y / rect.height - 0.5) * -2 * maxTilt;
        const rotateY = (x / rect.width - 0.5) * 2 * maxTilt;
        el.style.setProperty("--rx", `${rotateX.toFixed(2)}deg`);
        el.style.setProperty("--ry", `${rotateY.toFixed(2)}deg`);
        el.style.setProperty("--lift", "1");
      }
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
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
    el.style.setProperty("--lift", "0");
  };

  return (
    <div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={cn(
        "fk-glass group relative h-full overflow-hidden rounded-2xl hover:border-primary/40 hover:shadow-glass-hover",
        tilt && "fk-tilt",
        className,
      )}
    >
      {spotlight && (
        <div
          aria-hidden="true"
          className="fk-spotlight pointer-events-none absolute inset-0 z-0"
        />
      )}
      <div className="relative z-[1] h-full">{children}</div>
    </div>
  );
}

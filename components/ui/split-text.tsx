"use client";

import { Fragment, useEffect, useState } from "react";

import { cn } from "@/lib/utils";

export interface TextSegment {
  text: string;
  className?: string;
}

interface SplitTextProps {
  /** Ordered text segments; each may carry its own className (e.g. accent). */
  segments: readonly TextSegment[];
  /** Per-word stagger in milliseconds. */
  wordDelay?: number;
  /** Initial delay before the first word animates in. */
  startDelay?: number;
  className?: string;
}

interface SplitWord {
  word: string;
  className?: string;
  last: boolean;
}

/**
 * Word-by-word entrance reveal. Splits the provided segments into words and
 * staggers each one upward. The animation fires on mount (intended for
 * above-the-fold headings). Reduced-motion / no-JS are handled in globals.css.
 */
export function SplitText({
  segments,
  wordDelay = 55,
  startDelay = 80,
  className,
}: SplitTextProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setShow(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  const words: SplitWord[] = [];
  segments.forEach((segment, segmentIndex) => {
    const parts = segment.text.split(" ");
    parts.forEach((word, wordIndex) => {
      words.push({
        word,
        className: segment.className,
        last:
          segmentIndex === segments.length - 1 &&
          wordIndex === parts.length - 1,
      });
    });
  });

  return (
    <span className={className}>
      {words.map((item, index) => (
        <Fragment key={index}>
          <span
            data-show={show}
            style={{ transitionDelay: `${startDelay + index * wordDelay}ms` }}
            className={cn("fk-word", item.className)}
          >
            {item.word}
          </span>
          {!item.last ? " " : null}
        </Fragment>
      ))}
    </span>
  );
}

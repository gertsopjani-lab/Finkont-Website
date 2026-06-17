"use client";

import { useState } from "react";
import { Search } from "lucide-react";

import { cn } from "@/lib/utils";

interface SearchBarProps {
  placeholder?: string;
}

/**
 * Minimal dark search bar.
 *
 * On focus it activates the design system's `pulseBorder` animation
 * (design.md §2) via the `fk-input-active` global class for an animated focus
 * ring.
 */
export function SearchBar({
  placeholder = "Search transactions, reports, vendors…",
}: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div
      className={cn(
        "flex h-10 w-full items-center gap-2 rounded-lg border border-border bg-surface px-3 transition-colors duration-200",
        isFocused && "fk-input-active border-primary",
      )}
    >
      <Search
        className={cn(
          "size-4 shrink-0 transition-colors",
          isFocused ? "text-primary" : "text-muted",
        )}
        aria-hidden="true"
      />
      <input
        type="search"
        placeholder={placeholder}
        aria-label="Search"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="h-full w-full bg-transparent text-sm text-accent-neutral placeholder:text-muted focus:outline-none"
      />
    </div>
  );
}

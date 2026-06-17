import { CircleUser } from "lucide-react";

import { SearchBar } from "@/components/dashboard/search-bar";

/**
 * Top navigation (design.md §3 Top Navigation):
 *   Left: Finkont wordmark · Center: search input · Right: profile menu.
 */
export function TopNav() {
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        {/* Left: wordmark */}
        <div className="flex shrink-0 items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-base font-bold text-primary-foreground">
            F
          </span>
          <span className="text-lg font-semibold tracking-tight text-accent-neutral">
            Finkont
          </span>
        </div>

        {/* Center: search */}
        <div className="mx-auto hidden w-full max-w-md md:block">
          <SearchBar />
        </div>

        {/* Right: profile */}
        <div className="ml-auto flex shrink-0 items-center gap-3">
          <button
            type="button"
            aria-label="Open profile menu"
            className="flex items-center gap-2 rounded-lg border border-border bg-surface px-2.5 py-1.5 text-sm text-accent-neutral transition-colors duration-200 hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <CircleUser className="size-5 text-muted" aria-hidden="true" />
            <span className="hidden sm:inline">Avery Stone</span>
          </button>
        </div>
      </div>
    </header>
  );
}

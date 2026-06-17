"use client";

import { useState } from "react";
import { FileBarChart, Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Primary report-generation action (Step 4).
 *
 * Styled with the neutral accent token (`#f4f3ef`) and the explicit interaction
 * transforms from the dashboard spec:
 *   - hover: scale 1.03 + purple box-shadow blur
 *   - active (click): compress to scale 0.97
 */
export function ReportButton() {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = (): void => {
    if (isGenerating) {
      return;
    }
    setIsGenerating(true);
    // Simulated async report generation; replace with a server action later.
    window.setTimeout(() => setIsGenerating(false), 1400);
  };

  return (
    <button
      type="button"
      onClick={handleGenerate}
      disabled={isGenerating}
      aria-busy={isGenerating}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold",
        "bg-accent-neutral text-accent-neutral-foreground",
        "transition-transform duration-200 ease-out will-change-transform",
        "hover:scale-[1.03] hover:shadow-[0_0_24px_4px_rgba(174,123,229,0.55)]",
        "active:scale-[0.97]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "disabled:cursor-not-allowed disabled:opacity-80",
      )}
    >
      {isGenerating ? (
        <Loader2 className="size-4 animate-spin" aria-hidden="true" />
      ) : (
        <FileBarChart className="size-4" aria-hidden="true" />
      )}
      {isGenerating ? "Generating…" : "Generate Report"}
    </button>
  );
}

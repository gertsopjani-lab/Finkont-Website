"use client";

import { TrendingDown, TrendingUp, Landmark, type LucideIcon } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/finance";
import { cn } from "@/lib/utils";
import type { TransactionsResponse } from "@/lib/types";

interface SummaryCardsProps {
  meta: TransactionsResponse["meta"];
}

interface SummaryCardConfig {
  key: string;
  label: string;
  value: number;
  helper: string;
  Icon: LucideIcon;
  /** Semantic value color per design.md §1 + dashboard spec (Step 4). */
  valueClassName: string;
}

export function SummaryCards({ meta }: SummaryCardsProps) {
  const cards: readonly SummaryCardConfig[] = [
    {
      key: "net-revenue",
      label: "Net Revenue",
      value: meta.netRevenue,
      helper: "Total incoming for the period",
      Icon: TrendingUp,
      valueClassName: "text-primary", // #ae7be5
    },
    {
      key: "total-costs",
      label: "Total Costs",
      value: meta.totalCosts,
      helper: "All recorded expenses",
      Icon: TrendingDown,
      valueClassName: "text-expense", // #ef4444
    },
    {
      key: "projected-tax",
      label: "Projected Tax",
      value: meta.projectedTax,
      helper: "Estimated liability (21%)",
      Icon: Landmark,
      valueClassName: "text-muted", // #6b7280
    },
  ];

  return (
    <section
      aria-label="Financial summary"
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
    >
      {cards.map((card, index) => (
        <Card
          key={card.key}
          className="fk-animate-entry"
          // Staggered sequential entry: each card starts 120ms after the prior.
          style={{ animationDelay: `${index * 120}ms` }}
        >
          <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>{card.label}</CardTitle>
            <card.Icon
              className={cn("size-5", card.valueClassName)}
              aria-hidden="true"
            />
          </CardHeader>
          <CardContent>
            <p
              className={cn(
                "text-3xl font-semibold tracking-tight tabular-nums",
                card.valueClassName,
              )}
            >
              {formatCurrency(card.value)}
            </p>
            <p className="mt-1 text-xs text-muted">{card.helper}</p>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}

"use client";

import { AlertTriangle, RefreshCw } from "lucide-react";

import { DataGrid } from "@/components/dashboard/data-grid";
import { ReportButton } from "@/components/dashboard/report-button";
import { SummaryCards } from "@/components/dashboard/summary-cards";
import { Card } from "@/components/ui/card";
import { useTransactions } from "@/hooks/use-transactions";
import type { TransactionsResponse } from "@/lib/types";

interface DashboardContentProps {
  /** Server-rendered ledger used to hydrate the client without a fetch flash. */
  initialData: TransactionsResponse;
}

export function DashboardContent({ initialData }: DashboardContentProps) {
  const { state, refetch } = useTransactions(initialData);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-accent-neutral">
            Overview
          </h1>
          <p className="text-sm text-muted">
            Your business ledger at a glance.
          </p>
        </div>
        <ReportButton />
      </div>

      {state.status === "loading" && <DashboardSkeleton />}

      {state.status === "error" && (
        <ErrorBoundaryCard message={state.error} onRetry={refetch} />
      )}

      {state.status === "success" && (
        <>
          <SummaryCards meta={state.data.meta} />
          <DataGrid transactions={state.data.data} />
        </>
      )}
    </div>
  );
}

/** Loading fallback using the design system shimmer animation. */
function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <Card key={i} className="h-28 fk-shimmer rounded-2xl" />
        ))}
      </div>
      <Card className="h-80 fk-shimmer rounded-2xl" />
    </div>
  );
}

interface ErrorBoundaryCardProps {
  message: string;
  onRetry: () => void;
}

/** Graceful UI fallback boundary (per .cursorrules error-handling rules). */
function ErrorBoundaryCard({ message, onRetry }: ErrorBoundaryCardProps) {
  return (
    <Card className="flex flex-col items-center justify-center gap-4 p-10 text-center">
      <span className="flex size-12 items-center justify-center rounded-full bg-expense/10 text-expense">
        <AlertTriangle className="size-6" aria-hidden="true" />
      </span>
      <div className="space-y-1">
        <p className="text-base font-semibold text-accent-neutral">
          Couldn&apos;t load your ledger
        </p>
        <p className="text-sm text-muted">{message}</p>
      </div>
      <button
        type="button"
        onClick={onRetry}
        className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-4 py-2 text-sm text-accent-neutral transition-colors duration-200 hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <RefreshCw className="size-4" aria-hidden="true" />
        Try again
      </button>
    </Card>
  );
}

import type { TransactionDTO, TransactionsResponse } from "@/lib/types";

/** Default corporate tax rate applied to projected net profit. */
export const PROJECTED_TAX_RATE = 0.21;

/**
 * Derive the dashboard summary metrics from a ledger.
 *
 * - `netRevenue`: sum of all positive (INCOME) amounts.
 * - `totalCosts`: absolute sum of all negative (EXPENSE) amounts.
 * - `projectedTax`: tax on net profit, clamped at zero (no negative tax).
 */
export function summarizeLedger(
  transactions: readonly TransactionDTO[],
): TransactionsResponse["meta"] {
  let netRevenue = 0;
  let totalCosts = 0;

  for (const txn of transactions) {
    if (txn.amount >= 0) {
      netRevenue += txn.amount;
    } else {
      totalCosts += Math.abs(txn.amount);
    }
  }

  const projectedTax = Math.max(0, (netRevenue - totalCosts) * PROJECTED_TAX_RATE);

  return {
    count: transactions.length,
    netRevenue: round2(netRevenue),
    totalCosts: round2(totalCosts),
    projectedTax: round2(projectedTax),
  };
}

/** Round to two decimal places to avoid floating point noise in money sums. */
function round2(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

/** Format a number as USD currency for display. */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

/** Format an ISO date string into a compact, readable label. */
export function formatDate(isoDate: string): string {
  const parsed = new Date(isoDate);

  if (Number.isNaN(parsed.getTime())) {
    return isoDate;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(parsed);
}

"use client";

import { Card } from "@/components/ui/card";
import { formatCurrency, formatDate } from "@/lib/finance";
import { cn } from "@/lib/utils";
import type { TransactionDTO } from "@/lib/types";

interface DataGridProps {
  transactions: readonly TransactionDTO[];
}

/** Human-friendly label for a category enum value. */
function formatCategory(category: TransactionDTO["category"]): string {
  return category.charAt(0) + category.slice(1).toLowerCase();
}

/**
 * Accounting data grid (design.md §3 Data Grid).
 *
 * Columns: Line Item · Date · Category · Amount.
 * - Subtle hover elevation / surface pop on each row.
 * - Conditional semantic colors on the amount (success green / expense red).
 */
export function DataGrid({ transactions }: DataGridProps) {
  return (
    <Card className="overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4">
        <h2 className="text-base font-semibold text-accent-neutral">
          Recent Transactions
        </h2>
        <span className="text-xs text-muted">
          {transactions.length} entries
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-y border-border text-left text-xs uppercase tracking-wider text-muted">
              <th scope="col" className="px-6 py-3 font-medium">
                Line Item
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Date
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Category
              </th>
              <th scope="col" className="px-6 py-3 text-right font-medium">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((txn) => {
              const isIncome = txn.amount >= 0;
              return (
                <tr
                  key={txn.id}
                  className="group border-b border-border/60 transition-all duration-200 last:border-b-0 hover:-translate-y-px hover:bg-surface-hover hover:shadow-md"
                >
                  <td className="px-6 py-4 font-medium text-accent-neutral">
                    {txn.lineItem}
                  </td>
                  <td className="px-6 py-4 text-muted">
                    {formatDate(txn.date)}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center rounded-full border border-border bg-background/60 px-2.5 py-0.5 text-xs text-muted-foreground">
                      {formatCategory(txn.category)}
                    </span>
                  </td>
                  <td
                    className={cn(
                      "px-6 py-4 text-right font-semibold tabular-nums",
                      isIncome ? "text-success" : "text-expense",
                    )}
                  >
                    {isIncome ? "+" : "-"}
                    {formatCurrency(Math.abs(txn.amount))}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

import type { Transaction } from "@prisma/client";

import { summarizeLedger } from "@/lib/finance";
import { MOCK_TRANSACTIONS } from "@/lib/mock-data";
import { prisma } from "@/lib/prisma";
import type { TransactionDTO, TransactionsResponse } from "@/lib/types";

/**
 * Server-side transactions service.
 *
 * This is the single source of truth for reading the business ledger. It keeps
 * all Prisma access and data-shaping logic out of route handlers/components
 * (per .cursorrules separation-of-concerns + error-handling rules):
 *
 *   - Queries Prisma for `Transaction` rows (newest first).
 *   - Projects non-serializable `Decimal`/`DateTime` fields into the wire-safe
 *     `TransactionDTO` (`number` amount, ISO `YYYY-MM-DD` date).
 *   - Falls back to the mock ledger when the database is empty or unreachable,
 *     so the dashboard always renders during local development.
 */

/** Map a Prisma `Transaction` row to the serializable DTO used by the client. */
function toTransactionDTO(row: Transaction): TransactionDTO {
  return {
    id: row.id,
    lineItem: row.lineItem,
    // Normalize to an ISO calendar date (drop the time component).
    date: row.date.toISOString().slice(0, 10),
    category: row.category,
    // Prisma `Decimal` -> `number` for JSON transport.
    amount: row.amount.toNumber(),
    type: row.type,
  };
}

/** Mock fallback shaped identically to a live DB read (sorted newest-first). */
function getMockLedger(): TransactionDTO[] {
  return [...MOCK_TRANSACTIONS].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

/**
 * Load the full ledger plus derived summary metrics.
 *
 * Never throws: on any failure it logs server-side and returns the mock ledger
 * so callers can render a stable UI without a try/catch of their own.
 */
export async function getTransactions(): Promise<TransactionsResponse> {
  try {
    const rows = await prisma.transaction.findMany({
      orderBy: { date: "desc" },
    });

    const data =
      rows.length > 0 ? rows.map(toTransactionDTO) : getMockLedger();

    return { data, meta: summarizeLedger(data) };
  } catch (error) {
    console.error(
      "[transactions.service] Prisma read failed; serving mock ledger:",
      error,
    );

    const data = getMockLedger();
    return { data, meta: summarizeLedger(data) };
  }
}

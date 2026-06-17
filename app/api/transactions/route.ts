import { NextResponse } from "next/server";

import { summarizeLedger } from "@/lib/finance";
import { MOCK_TRANSACTIONS } from "@/lib/mock-data";
import type {
  ApiErrorResponse,
  TransactionDTO,
  TransactionsResponse,
} from "@/lib/types";

/**
 * GET /api/transactions
 *
 * Returns the business ledger plus derived summary metrics. The handler wraps
 * all data access in an explicit try/catch (per .cursorrules error-handling
 * rules) and always responds with a typed JSON envelope.
 *
 * The mock source can be swapped for a Prisma query without changing the shape:
 *   const rows = await prisma.transaction.findMany({ orderBy: { date: "desc" } });
 */
export async function GET(): Promise<
  NextResponse<TransactionsResponse | ApiErrorResponse>
> {
  try {
    // Sort newest-first so the data grid reads like a recent activity feed.
    const data: TransactionDTO[] = [...MOCK_TRANSACTIONS].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );

    const meta = summarizeLedger(data);

    return NextResponse.json<TransactionsResponse>(
      { data, meta },
      { status: 200 },
    );
  } catch (error) {
    // Never leak internals to the client; log server-side and fail gracefully.
    console.error("[GET /api/transactions] Failed to load ledger:", error);

    return NextResponse.json<ApiErrorResponse>(
      { error: "Unable to load transactions. Please try again." },
      { status: 500 },
    );
  }
}

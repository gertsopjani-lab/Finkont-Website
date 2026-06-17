import { NextResponse } from "next/server";

import { getTransactions } from "@/lib/services/transactions";
import type { ApiErrorResponse, TransactionsResponse } from "@/lib/types";

// The ledger is read at request time (DB-backed), so opt out of static caching.
export const dynamic = "force-dynamic";

/**
 * GET /api/transactions
 *
 * Thin transport layer over the transactions service. Data access, DTO mapping
 * and the mock fallback all live in `getTransactions()`; this handler only
 * shapes the HTTP response and guarantees a typed error envelope on failure
 * (per .cursorrules error-handling rules).
 */
export async function GET(): Promise<
  NextResponse<TransactionsResponse | ApiErrorResponse>
> {
  try {
    const payload = await getTransactions();

    return NextResponse.json<TransactionsResponse>(payload, { status: 200 });
  } catch (error) {
    console.error("[GET /api/transactions] Failed to load ledger:", error);

    return NextResponse.json<ApiErrorResponse>(
      { error: "Unable to load transactions. Please try again." },
      { status: 500 },
    );
  }
}

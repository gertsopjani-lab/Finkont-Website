import type {
  TransactionCategory,
  TransactionType,
} from "@prisma/client";

export type { TransactionCategory, TransactionType };

/**
 * Wire/serialized representation of a ledger entry.
 *
 * Prisma `Decimal` and `DateTime` are not JSON-serializable in a stable way for
 * the client, so the API layer projects them into a `number` (amount) and an
 * ISO `string` (date). Negative `amount` values represent expenses and drive
 * the semantic color tokens in the data grid.
 */
export interface TransactionDTO {
  id: string;
  lineItem: string;
  date: string;
  category: TransactionCategory;
  amount: number;
  type: TransactionType;
}

/** Standard success envelope returned by `GET /api/transactions`. */
export interface TransactionsResponse {
  data: TransactionDTO[];
  meta: {
    count: number;
    netRevenue: number;
    totalCosts: number;
    projectedTax: number;
  };
}

/** Standard error envelope returned on failure. */
export interface ApiErrorResponse {
  error: string;
}

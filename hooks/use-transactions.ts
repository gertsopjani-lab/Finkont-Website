"use client";

import { useCallback, useEffect, useState } from "react";

import type {
  ApiErrorResponse,
  TransactionsResponse,
} from "@/lib/types";

type TransactionsState =
  | { status: "loading"; data: null; error: null }
  | { status: "success"; data: TransactionsResponse; error: null }
  | { status: "error"; data: null; error: string };

interface UseTransactionsResult {
  state: TransactionsState;
  refetch: () => void;
}

/**
 * Fetch the business ledger from `GET /api/transactions`.
 *
 * All network access and JSON parsing is wrapped in try/catch with a typed,
 * user-safe error message so consumers can render a graceful fallback boundary
 * (per .cursorrules error-handling rules).
 */
export function useTransactions(): UseTransactionsResult {
  const [state, setState] = useState<TransactionsState>({
    status: "loading",
    data: null,
    error: null,
  });

  const load = useCallback(async (signal: AbortSignal): Promise<void> => {
    setState({ status: "loading", data: null, error: null });

    try {
      const response = await fetch("/api/transactions", {
        signal,
        headers: { Accept: "application/json" },
      });

      if (!response.ok) {
        let message = "Unable to load transactions.";
        try {
          const body = (await response.json()) as ApiErrorResponse;
          if (typeof body.error === "string" && body.error.length > 0) {
            message = body.error;
          }
        } catch {
          // Response body was not valid JSON; keep the default message.
        }
        setState({ status: "error", data: null, error: message });
        return;
      }

      const body = (await response.json()) as TransactionsResponse;
      setState({ status: "success", data: body, error: null });
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return;
      }
      console.error("[useTransactions] fetch failed:", error);
      setState({
        status: "error",
        data: null,
        error: "Something went wrong while loading your ledger.",
      });
    }
  }, []);

  const [reloadToken, setReloadToken] = useState(0);

  const refetch = useCallback(() => {
    setReloadToken((token) => token + 1);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    void load(controller.signal);
    return () => controller.abort();
  }, [load, reloadToken]);

  return { state, refetch };
}

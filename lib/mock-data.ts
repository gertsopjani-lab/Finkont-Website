import type { TransactionDTO } from "@/lib/types";

/**
 * Mock business ledger.
 *
 * Mixes positive revenue items and negative expenses so the dashboard can
 * exercise the semantic color tokens (success green / expense red) defined in
 * design.md §1. This stands in for `prisma.transaction.findMany()` until a live
 * PostgreSQL database is provisioned via DATABASE_URL.
 */
export const MOCK_TRANSACTIONS: readonly TransactionDTO[] = [
  {
    id: "txn_1001",
    lineItem: "Enterprise SaaS subscription — Northwind Corp",
    date: "2026-06-01",
    category: "SALES",
    amount: 18400.0,
    type: "INCOME",
  },
  {
    id: "txn_1002",
    lineItem: "Implementation consulting — Globex",
    date: "2026-06-03",
    category: "CONSULTING",
    amount: 9750.5,
    type: "INCOME",
  },
  {
    id: "txn_1003",
    lineItem: "Engineering payroll — June cycle 1",
    date: "2026-06-05",
    category: "PAYROLL",
    amount: -22150.0,
    type: "EXPENSE",
  },
  {
    id: "txn_1004",
    lineItem: "Cloud infrastructure — AWS",
    date: "2026-06-06",
    category: "SOFTWARE",
    amount: -3120.75,
    type: "EXPENSE",
  },
  {
    id: "txn_1005",
    lineItem: "Managed services retainer — Initech",
    date: "2026-06-08",
    category: "SERVICES",
    amount: 12300.0,
    type: "INCOME",
  },
  {
    id: "txn_1006",
    lineItem: "Performance marketing — Q2 campaign",
    date: "2026-06-09",
    category: "MARKETING",
    amount: -4850.0,
    type: "EXPENSE",
  },
  {
    id: "txn_1007",
    lineItem: "Office lease — HQ",
    date: "2026-06-10",
    category: "RENT",
    amount: -6500.0,
    type: "EXPENSE",
  },
  {
    id: "txn_1008",
    lineItem: "Annual support contract — Umbrella LLC",
    date: "2026-06-12",
    category: "SERVICES",
    amount: 21500.0,
    type: "INCOME",
  },
  {
    id: "txn_1009",
    lineItem: "Conference travel — sales team",
    date: "2026-06-13",
    category: "TRAVEL",
    amount: -2390.4,
    type: "EXPENSE",
  },
  {
    id: "txn_1010",
    lineItem: "Utilities — electricity & internet",
    date: "2026-06-14",
    category: "UTILITIES",
    amount: -742.18,
    type: "EXPENSE",
  },
  {
    id: "txn_1011",
    lineItem: "Custom integration build — Stark Industries",
    date: "2026-06-15",
    category: "CONSULTING",
    amount: 15800.0,
    type: "INCOME",
  },
  {
    id: "txn_1012",
    lineItem: "Estimated quarterly tax remittance",
    date: "2026-06-16",
    category: "TAXES",
    amount: -5100.0,
    type: "EXPENSE",
  },
];

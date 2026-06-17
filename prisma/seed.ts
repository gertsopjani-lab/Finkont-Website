import { PrismaClient } from "@prisma/client";

import { MOCK_TRANSACTIONS } from "../lib/mock-data";

const prisma = new PrismaClient();

/**
 * Seed the `Transaction` table from the canonical mock ledger.
 *
 * Idempotent: existing rows with the same id are skipped, so the script can be
 * re-run safely. Run with `npm run prisma:seed` (or `prisma db seed`).
 */
async function main(): Promise<void> {
  const result = await prisma.transaction.createMany({
    data: MOCK_TRANSACTIONS.map((txn) => ({
      id: txn.id,
      lineItem: txn.lineItem,
      date: new Date(txn.date),
      category: txn.category,
      amount: txn.amount,
      type: txn.type,
    })),
    skipDuplicates: true,
  });

  console.log(`Seed complete: inserted ${result.count} transaction(s).`);
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exitCode = 1;
  })
  .finally(() => {
    void prisma.$disconnect();
  });

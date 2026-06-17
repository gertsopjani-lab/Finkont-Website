import { DashboardContent } from "@/components/dashboard/dashboard-content";
import { TopNav } from "@/components/dashboard/top-nav";
import { getTransactions } from "@/lib/services/transactions";

// The dashboard reads the live ledger on each request.
export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  // Fetch on the server via the service so the first paint has real data.
  const initialData = await getTransactions();

  return (
    <div className="min-h-screen bg-background">
      <TopNav />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <DashboardContent initialData={initialData} />
      </main>
    </div>
  );
}

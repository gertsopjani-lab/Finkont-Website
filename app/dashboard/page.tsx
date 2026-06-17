import { DashboardContent } from "@/components/dashboard/dashboard-content";
import { TopNav } from "@/components/dashboard/top-nav";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <TopNav />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <DashboardContent />
      </main>
    </div>
  );
}

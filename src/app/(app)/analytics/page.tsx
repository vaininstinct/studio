import { StatsCards } from '@/components/analytics/stats-cards';
import { MessageChart } from '@/components/analytics/message-chart';
import { TopMessages } from '@/components/analytics/top-messages';

export default function AnalyticsPage() {
  return (
    <div className="flex flex-1 flex-col bg-background sm:pl-20">
      <header className="sticky top-0 z-10 flex h-16 items-center border-b bg-card px-6">
        <h1 className="text-xl font-semibold">Analytics Dashboard</h1>
      </header>
      <main className="flex-1 space-y-6 p-4 md:p-6">
        <StatsCards />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
          <MessageChart />
          <TopMessages />
        </div>
      </main>
    </div>
  );
}

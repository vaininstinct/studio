import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { mockLeads } from '@/lib/data';
import { LeadCard } from '@/components/leads/lead-card';

export default function LeadsPage() {
  return (
    <div className="flex flex-1 flex-col bg-background sm:pl-20">
      <header className="sticky top-0 z-10 flex h-16 items-center justify-between gap-4 border-b bg-card px-6">
        <h1 className="text-xl font-semibold">Leads Queue</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Extract New Leads
        </Button>
      </header>
      <main className="flex-1 overflow-auto p-4 md:p-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {mockLeads.map((lead) => (
            <LeadCard key={lead.id} lead={lead} />
          ))}
        </div>
      </main>
    </div>
  );
}

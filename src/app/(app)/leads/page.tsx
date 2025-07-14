import { ExtractLeadsDialog } from '@/components/leads/extract-leads-dialog';
import { mockCampaigns } from '@/lib/data';
import { LeadCard } from '@/components/leads/lead-card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function LeadsPage() {
  return (
    <div className="flex flex-1 flex-col bg-background sm:pl-20">
      <header className="sticky top-0 z-10 flex h-16 items-center justify-between gap-4 border-b bg-card px-6">
        <h1 className="text-xl font-semibold">Campaigns</h1>
        <ExtractLeadsDialog />
      </header>
      <main className="flex-1 overflow-auto p-4 md:p-6">
        <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
          {mockCampaigns.map((campaign, index) => (
            <AccordionItem key={campaign.id} value={`item-${index + 1}`}>
              <AccordionTrigger className="text-lg font-medium hover:no-underline">
                <div className="flex items-center gap-3">
                  <span>{campaign.name}</span>
                  <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
                    {campaign.leads.length} Leads
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-2">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {campaign.leads.map((lead) => (
                    <LeadCard key={lead.id} lead={lead} />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </main>
    </div>
  );
}

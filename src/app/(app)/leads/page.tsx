
'use client';

import { useState } from 'react';
import { ExtractLeadsDialog } from '@/components/leads/extract-leads-dialog';
import { mockCampaigns } from '@/lib/data';
import { LeadCard } from '@/components/leads/lead-card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { PlayCircle, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function LeadsPage() {
  const [runningCampaign, setRunningCampaign] = useState<string | null>(null);
  const { toast } = useToast();

  const handleStartCampaign = async (campaignId: string, campaignName: string) => {
    setRunningCampaign(campaignId);
    // Simulate API call to start the campaign
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setRunningCampaign(null);
    toast({
      title: 'Campaign Started!',
      description: `Outreach for the "${campaignName}" campaign has begun.`,
    });
  };

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
                <div className="flex w-full items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span>{campaign.name}</span>
                    <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
                      {campaign.leads.length} Leads
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation(); // prevent accordion from toggling
                      handleStartCampaign(campaign.id, campaign.name);
                    }}
                    disabled={runningCampaign === campaign.id}
                    className="mr-2"
                  >
                    {runningCampaign === campaign.id ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <PlayCircle className="mr-2 h-4 w-4" />
                    )}
                    Start Campaign
                  </Button>
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

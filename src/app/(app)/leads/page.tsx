
'use client';

import { useState, useEffect } from 'react';
import { ExtractLeadsDialog } from '@/components/leads/extract-leads-dialog';
import type { Campaign } from '@/lib/data';
import { LeadCard } from '@/components/leads/lead-card';
import { CampaignStatus } from '@/components/leads/campaign-status';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { PlayCircle, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/auth-context';
import { getCampaigns } from '@/services/campaign';
import { Skeleton } from '@/components/ui/skeleton';

export default function LeadsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [runningCampaign, setRunningCampaign] = useState<string | null>(null);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const fetchCampaigns = async () => {
      try {
        setIsLoading(true);
        const userCampaigns = await getCampaigns(user.uid);
        setCampaigns(userCampaigns.map(c => ({...c, status: 'idle'})));
      } catch (error) {
        console.error("Error fetching campaigns:", error);
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Could not fetch campaigns.',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchCampaigns();
  }, [user, toast]);
  

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

  const onCampaignCreated = (newCampaign: Campaign) => {
    const campaignWithStatus: Campaign = { ...newCampaign, status: 'extracting', progress: 0, statusText: 'Initializing...' };
    setCampaigns(prev => [campaignWithStatus, ...prev]);

    // Simulate extraction progress
    const steps = [
      { progress: 25, statusText: 'Checking account visibility...' },
      { progress: 50, statusText: 'Extracting followers...' },
      { progress: 75, statusText: 'Filtering leads...' },
      { progress: 100, statusText: 'Extraction complete!' },
    ];
    let currentStep = 0;
    const interval = setInterval(() => {
      setCampaigns(prev => prev.map(c => 
        c.id === newCampaign.id ? { ...c, progress: steps[currentStep].progress, statusText: steps[currentStep].statusText } : c
      ));
      currentStep++;
      if (currentStep >= steps.length) {
        clearInterval(interval);
         setTimeout(() => {
           setCampaigns(prev => prev.map(c => 
            c.id === newCampaign.id ? { ...c, status: 'idle' } : c
          ));
          toast({
            title: "Extraction Complete",
            description: `Finished extracting leads for "${newCampaign.name}".`
          })
        }, 1000);
      }
    }, 1500);
  };

  if (isLoading) {
    return (
      <div className="flex flex-1 flex-col bg-background sm:pl-20">
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between gap-4 border-b bg-card px-6">
          <h1 className="text-xl font-semibold">Campaigns</h1>
          <Skeleton className="h-10 w-44" />
        </header>
        <main className="flex-1 p-4 md:p-6">
          <div className="space-y-4">
            <Skeleton className="h-16 w-full rounded-lg" />
            <Skeleton className="h-16 w-full rounded-lg" />
            <Skeleton className="h-16 w-full rounded-lg" />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col bg-background sm:pl-20">
      <header className="sticky top-0 z-10 flex h-16 items-center justify-between gap-4 border-b bg-card px-6">
        <h1 className="text-xl font-semibold">Campaigns</h1>
        <ExtractLeadsDialog onCampaignCreated={onCampaignCreated} campaigns={campaigns} />
      </header>
      <main className="flex-1 overflow-auto p-4 md:p-6">
        {campaigns.length > 0 ? (
          <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
            {campaigns.map((campaign, index) => (
              <AccordionItem key={campaign.id} value={`item-${index + 1}`}>
                 <div className="flex w-full items-center justify-between border-b">
                   <AccordionTrigger className="flex-1 text-left text-lg font-medium hover:no-underline">
                      <div className="flex w-full flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-3">
                        <div className="flex items-center gap-3">
                          <span>{campaign.name}</span>
                          <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
                            {campaign.leads.length} Leads
                          </span>
                        </div>
                        {campaign.status === 'extracting' && (
                          <CampaignStatus progress={campaign.progress} statusText={campaign.statusText} />
                        )}
                      </div>
                    </AccordionTrigger>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleStartCampaign(campaign.id, campaign.name)}
                      disabled={runningCampaign === campaign.id || campaign.status === 'extracting'}
                      className="mr-2 shrink-0"
                    >
                      {runningCampaign === campaign.id ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <PlayCircle className="mr-2 h-4 w-4" />
                      )}
                      Start Campaign
                    </Button>
                  </div>
                <AccordionContent className="pt-2">
                  {campaign.leads.length > 0 ? (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                      {campaign.leads.map((lead) => (
                        <LeadCard key={lead.id} lead={lead} />
                      ))}
                    </div>
                  ) : (
                    <div className="py-8 text-center text-muted-foreground">
                      {campaign.status === 'extracting'
                        ? 'Extracting new leads...'
                        : 'No leads in this campaign yet. Extract some to get started.'}
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <div className="flex flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-muted bg-background p-12 text-center h-full">
            <h3 className="text-xl font-semibold">No Campaigns Found</h3>
            <p className="max-w-xs text-sm text-muted-foreground">
              Click &quot;Extract New Leads&quot; to create your first campaign and start finding leads.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

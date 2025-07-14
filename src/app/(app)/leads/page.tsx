
'use client';

import { useState, useEffect } from 'react';
import { CreateCampaignDialog } from '@/components/leads/create-campaign-dialog';
import type { Campaign, Lead } from '@/lib/data';
import { LeadCard } from '@/components/leads/lead-card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { PlayCircle, Loader2, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/auth-context';
import { getCampaigns, addLeadsToCampaign, createCampaign as createDbCampaign, deleteCampaign } from '@/services/campaign';
import { addMessageToOutbox } from '@/services/outbox';
import { runGenerateOpener } from '@/app/actions/outreach';
import { Skeleton } from '@/components/ui/skeleton';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useRouter } from 'next/navigation';

export default function LeadsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [runningCampaign, setRunningCampaign] = useState<string | null>(null);
  const [campaignToDelete, setCampaignToDelete] = useState<Campaign | null>(null);
  const { toast } = useToast();
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) return;

    const fetchCampaigns = async () => {
      try {
        setIsLoading(true);
        const userCampaigns = await getCampaigns(user.uid);
        setCampaigns(userCampaigns);
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
  

  const handleStartCampaign = async (campaign: Campaign) => {
    if (!user) return;

    setRunningCampaign(campaign.id);
    
    try {
      const leadPromises = campaign.leads.map(lead => {
        return runGenerateOpener({
          leadProfileData: `Username: ${lead.username}\nBio: ${lead.bio}`,
          goal: 'Start a friendly conversation and build rapport.',
        });
      });
  
      const results = await Promise.all(leadPromises);
  
      const outboxPromises = results.map((result, index) => {
        const lead = campaign.leads[index];
        return addMessageToOutbox({
          lead: lead,
          campaignId: campaign.id,
          campaignName: campaign.name,
          generatedMessage: result.openingMessage,
          userId: user.uid,
        });
      });

      await Promise.all(outboxPromises);

      toast({
        title: 'Campaign Complete!',
        description: `Outreach messages for "${campaign.name}" have been generated.`,
        action: (
           <Button variant="outline" size="sm" onClick={() => router.push('/outbox')}>
             View Outbox
           </Button>
        ),
      });

    } catch (error) {
      console.error("Error running campaign:", error);
      toast({
        variant: 'destructive',
        title: 'Campaign Failed',
        description: 'Could not generate messages for the campaign.',
      });
    } finally {
      setRunningCampaign(null);
    }
  };

  const onCampaignCreated = async (campaignName: string, usernames: string[]) => {
    if (!user) return;

    try {
      const newCampaignData = await createDbCampaign(campaignName, user.uid);
      
      const newLeads: Lead[] = usernames.map(username => ({
        id: Math.random().toString(36).substring(2, 9),
        username: username,
        name: username,
        bio: `A lead imported for the "${campaignName}" campaign.`,
        avatarUrl: 'https://placehold.co/100x100.png',
        latestPostImageUrl: 'https://placehold.co/300x300.png'
      }));
      
      const finalCampaign: Campaign = { ...newCampaignData, leads: newLeads };
      setCampaigns(prev => [finalCampaign, ...prev]);
      
      toast({
         title: "Campaign Created",
         description: `Successfully created "${campaignName}". Adding ${newLeads.length} leads.`
      });

      await addLeadsToCampaign(newCampaignData.id, newLeads);

    } catch (error) {
      console.error("Campaign creation failed:", error);
      toast({
        variant: 'destructive',
        title: 'Creation Failed',
        description: 'The campaign could not be created. Please try again.',
      });
    }
  };

  const handleDeleteCampaign = async () => {
    if (!campaignToDelete) return;

    try {
      await deleteCampaign(campaignToDelete.id);
      setCampaigns(prev => prev.filter(c => c.id !== campaignToDelete.id));
      toast({
        title: 'Campaign Deleted',
        description: `The "${campaignToDelete.name}" campaign has been successfully deleted.`,
      });
    } catch (error) {
      console.error("Error deleting campaign:", error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not delete the campaign.',
      });
    } finally {
      setCampaignToDelete(null);
    }
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
    <>
      <div className="flex flex-1 flex-col bg-background sm:pl-20">
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between gap-4 border-b bg-card px-6">
          <h1 className="text-xl font-semibold">Campaigns</h1>
          <CreateCampaignDialog onCampaignCreated={onCampaignCreated} />
        </header>
        <main className="flex-1 overflow-auto p-4 md:p-6">
          {campaigns.length > 0 ? (
            <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
              {campaigns.map((campaign, index) => (
                <AccordionItem key={campaign.id} value={`item-${index + 1}`}>
                   <div className="flex w-full items-center justify-between border-b">
                     <AccordionTrigger className="flex-1 text-left text-lg font-medium hover:no-underline pr-2">
                        <div className="flex w-full flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-3">
                          <div className="flex items-center gap-3">
                            <span>{campaign.name}</span>
                            <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
                              {campaign.leads?.length || 0} Leads
                            </span>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <div className="mr-4 shrink-0 flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleStartCampaign(campaign)}
                          disabled={runningCampaign === campaign.id || campaign.leads.length === 0}
                        >
                          {runningCampaign === campaign.id ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          ) : (
                            <PlayCircle className="mr-2 h-4 w-4" />
                          )}
                          Start Campaign
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => { e.stopPropagation(); setCampaignToDelete(campaign); }}
                          className="h-9 w-9 text-destructive hover:bg-destructive/10 hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete Campaign</span>
                        </Button>
                      </div>
                    </div>
                  <AccordionContent className="pt-2">
                    {campaign.leads && campaign.leads.length > 0 ? (
                      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {campaign.leads.map((lead) => (
                          <LeadCard key={lead.id} lead={lead} />
                        ))}
                      </div>
                    ) : (
                      <div className="py-8 text-center text-muted-foreground">
                        {'No leads in this campaign yet.'}
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
                Click &quot;Create New Campaign&quot; to import your first set of leads.
              </p>
            </div>
          )}
        </main>
      </div>

      <AlertDialog open={!!campaignToDelete} onOpenChange={(isOpen) => !isOpen && setCampaignToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              <span className="font-semibold text-foreground"> {campaignToDelete?.name} </span>
              campaign and all of its associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setCampaignToDelete(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteCampaign} className="bg-destructive hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

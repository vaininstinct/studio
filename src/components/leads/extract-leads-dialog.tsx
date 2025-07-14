
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, PlusCircle, Search, UserCheck, Users, Hash, MapPin, Heart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { Campaign } from '@/lib/data';
import { useAuth } from '@/context/auth-context';
import { createCampaign } from '@/services/campaign';

interface ExtractLeadsDialogProps {
  onCampaignCreated: (campaign: Campaign) => void;
}

export function ExtractLeadsDialog({ onCampaignCreated }: ExtractLeadsDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isExtracting, setIsExtracting] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const handleExtract = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!user) {
      toast({ variant: 'destructive', title: 'Error', description: 'You must be logged in.' });
      return;
    }

    setIsExtracting(true);
    const formData = new FormData(event.currentTarget);
    const campaignName = formData.get('campaignName') as string;
    const target = formData.get('target') as string;

    if (!campaignName) {
      toast({ variant: 'destructive', title: 'Error', description: 'Please provide a campaign name.' });
      setIsExtracting(false);
      return;
    }
    
    if (!target) {
        toast({ variant: 'destructive', title: 'Error', description: 'Please provide a target Instagram account.' });
        setIsExtracting(false);
        return;
    }

    setIsOpen(false);
    
    try {
        // Create a temporary campaign object for immediate UI feedback
        const tempCampaign: Campaign = {
          id: `temp-${Date.now()}`,
          name: campaignName,
          userId: user.uid,
          niche: '',
          leads: [],
          createdAt: new Date(),
          status: 'extracting',
        };
        onCampaignCreated(tempCampaign);

        // Create the campaign in Firestore in the background
        createCampaign(campaignName, user.uid).then(createdCampaign => {
            console.log(`Campaign created with real ID: ${createdCampaign.id}`);
            // Here you could update the temporary campaign with the real one if needed,
            // but for now we'll just let the simulation run with the temp one.
        }).catch(error => {
            console.error("Failed to create campaign in database:", error);
            toast({
                variant: "destructive",
                title: "Database Error",
                description: "Could not save the new campaign."
            });
        });
      
      toast({
        title: 'Extraction Started',
        description: `We are extracting new leads for the "${campaignName}" campaign.`,
      });
      
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Extraction Failed',
        description: 'Could not start the lead extraction process.',
      });
    } finally {
      setTimeout(() => setIsExtracting(false), 500);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Extract New Leads
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Extract New Leads</DialogTitle>
          <DialogDescription>
            Create a new campaign and extract followers from a public Instagram account.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleExtract} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="campaignName">Campaign Name</Label>
                <Input id="campaignName" name="campaignName" placeholder="e.g. March Fitness Outreach" required />
            </div>
            <div className="space-y-2">
                <Label htmlFor="target">Target Instagram Account</Label>
                <div className="relative">
                    <UserCheck className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input 
                        id="target" 
                        name="target" 
                        placeholder="e.g. @username or full profile URL" 
                        required 
                        className="pl-10"
                    />
                </div>
            </div>
          
          <DialogFooter className="pt-4">
            <Button type="submit" className="w-full" disabled={isExtracting}>
              {isExtracting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <>
                  <Search className="mr-2 h-4 w-4" />
                  Start Extraction
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

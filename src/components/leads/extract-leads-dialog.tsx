
'use client';

import { useState } from 'react';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, PlusCircle, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { Campaign } from '@/lib/data';
import { useAuth } from '@/context/auth-context';
import { createCampaign } from '@/services/campaign';

interface ExtractLeadsDialogProps {
  onCampaignCreated: (campaign: Campaign) => void;
  campaigns: Campaign[];
}

export function ExtractLeadsDialog({ onCampaignCreated, campaigns }: ExtractLeadsDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isExtracting, setIsExtracting] = useState(false);
  const [campaignOption, setCampaignOption] = useState(campaigns.length > 0 ? 'existing' : 'new');
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
    const campaignType = formData.get('campaignOption') as string;

    try {
      let campaignId = formData.get('campaignId') as string;
      let campaignName = '';

      if (campaignType === 'new') {
        campaignName = formData.get('newCampaignName') as string;
        if (!campaignName) {
            toast({ variant: 'destructive', title: 'Error', description: 'New campaign name is required.' });
            setIsExtracting(false);
            return;
        }
        const newCampaign = await createCampaign(campaignName, user.uid);
        onCampaignCreated(newCampaign);
        campaignId = newCampaign.id;
      } else {
        const existingCampaign = campaigns.find(c => c.id === campaignId);
        campaignName = existingCampaign?.name || '';
        // If we are adding to an existing campaign, we still call onCampaignCreated
        // to trigger the progress simulation.
        if (existingCampaign) {
          onCampaignCreated(existingCampaign);
        }
      }
      
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
      setIsExtracting(false);
      setIsOpen(false);
    }
  };
  
  // Effect to update the default radio option if campaigns become available
  useEffect(() => {
    if (campaigns.length > 0) {
      setCampaignOption('existing');
    } else {
      setCampaignOption('new');
    }
  }, [campaigns.length]);


  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Extract New Leads
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>Extract New Leads</DialogTitle>
          <DialogDescription>
            Target and filter new leads from Instagram. The extraction process will run in the background.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleExtract}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Campaign</Label>
              <RadioGroup name="campaignOption" defaultValue={campaignOption} value={campaignOption} onValueChange={setCampaignOption} className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="existing" id="r1" disabled={campaigns.length === 0} />
                  <Label htmlFor="r1">Add to Existing</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="new" id="r2" />
                  <Label htmlFor="r2">Create New</Label>
                </div>
              </RadioGroup>
            </div>
            {campaignOption === 'existing' ? (
              <div className="space-y-2">
                <Label htmlFor="campaign-select">Select Campaign</Label>
                <Select name="campaignId" required>
                  <SelectTrigger id="campaign-select">
                    <SelectValue placeholder="Select a campaign" />
                  </SelectTrigger>
                  <SelectContent>
                    {campaigns.map(c => (
                       <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                 {campaigns.length === 0 && (
                  <p className="text-xs text-muted-foreground">You don't have any campaigns yet. Select "Create New" to start.</p>
                )}
              </div>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="new-campaign-name">New Campaign Name</Label>
                <Input id="new-campaign-name" name="newCampaignName" placeholder="e.g., Real Estate Agents" required />
              </div>
            )}
          </div>

          <Tabs defaultValue="followers" className="pt-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="followers">From Followers</TabsTrigger>
              <TabsTrigger value="likes">From Likes</TabsTrigger>
              <TabsTrigger value="comments">From Comments</TabsTrigger>
            </TabsList>
              <TabsContent value="followers" className="space-y-4 pt-2">
                <div className="space-y-2">
                  <Label htmlFor="followers-username">Target Account Username</Label>
                  <Input id="followers-username" name="target" placeholder="@username" required />
                </div>
              </TabsContent>
              <TabsContent value="likes" className="space-y-4 pt-2">
                <div className="space-y-2">
                  <Label htmlFor="likes-post-url">Post URL</Label>
                  <Input id="likes-post-url" name="target" placeholder="https://www.instagram.com/p/..." required />
                </div>
              </TabsContent>
              <TabsContent value="comments" className="space-y-4 pt-2">
                <div className="space-y-2">
                  <Label htmlFor="comments-post-url">Post URL</Label>
                  <Input id="comments-post-url" name="target" placeholder="https://www.instagram.com/p/..." required />
                </div>
              </TabsContent>
          </Tabs>
          <div className="space-y-2 pt-2">
            <Label htmlFor="keywords">
              Filter by Keywords in Bio/Profile
            </Label>
            <Input id="keywords" name="keywords" placeholder="e.g., coaching, smma, saas" />
          </div>
          <DialogFooter className="pt-6">
            <Button type="submit" className="w-full" disabled={isExtracting}>
              {isExtracting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Search className="mr-2 h-4 w-4" />
              )}
              Start Extraction
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

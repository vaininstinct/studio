
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, PlusCircle, Search, UserCheck, Users, Hash, MapPin, Heart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
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
  const [limitEnabled, setLimitEnabled] = useState(true);
  const [limitAmount, setLimitAmount] = useState([5000]);
  const [waitInterval, setWaitInterval] = useState([15]);
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
    
    setIsOpen(false);
    
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
        
        const tempId = `temp-${Date.now()}`;
        const newCampaign: Campaign = {
          id: tempId,
          name: campaignName,
          userId: user.uid,
          niche: '',
          leads: [],
          createdAt: new Date(),
        };
        onCampaignCreated(newCampaign);

        createCampaign(campaignName, user.uid).then(createdCampaign => {
            console.log(`Campaign created with real ID: ${createdCampaign.id}`);
        });

      } else {
        const existingCampaign = campaigns.find(c => c.id === campaignId);
        campaignName = existingCampaign?.name || '';
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
      setTimeout(() => setIsExtracting(false), 500);
    }
  };
  
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
        </DialogHeader>
        <form onSubmit={handleExtract}>
          <Tabs defaultValue="followers">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="followers" className="h-12"><UserCheck /></TabsTrigger>
              <TabsTrigger value="following" className="h-12"><Users /></TabsTrigger>
              <TabsTrigger value="hashtags" className="h-12"><Hash /></TabsTrigger>
              <TabsTrigger value="locations" className="h-12"><MapPin /></TabsTrigger>
              <TabsTrigger value="interactors" className="h-12"><Heart /></TabsTrigger>
            </TabsList>
            <TabsContent value="followers" className="space-y-4 pt-4">
                <h3 className="font-semibold">Extract followers of</h3>
                <RadioGroup defaultValue="other" className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="me" id="me" />
                    <Label htmlFor="me">Me &lt;@your_username&gt;</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="other" />
                    <Label htmlFor="other" className="flex-1">
                      <Input name="target" placeholder="e.g. tottori or https://www.instagram.com/tottori/" required />
                    </Label>
                  </div>
                </RadioGroup>
            </TabsContent>
            {/* Add other TabsContent sections as needed */}
          </Tabs>
          
          <div className="space-y-4 pt-4">
              <div className="flex items-center space-x-2">
                <Switch id="detailed-profile" defaultChecked/>
                <Label htmlFor="detailed-profile">Detailed</Label>
                <p className="text-xs text-muted-foreground bg-amber-100 dark:bg-amber-900/50 p-1 rounded-md">
                    Detailed profile including bio, follower count, Email address, etc.
                </p>
              </div>
            <div className="space-y-2">
                <div className="flex items-center space-x-2">
                    <Checkbox id="limit-extract" checked={limitEnabled} onCheckedChange={(checked) => setLimitEnabled(!!checked)}/>
                    <Label htmlFor="limit-extract">Limit Max extract No. {limitAmount[0].toLocaleString()}</Label>
                </div>
                <Slider
                    disabled={!limitEnabled}
                    value={limitAmount}
                    onValueChange={setLimitAmount}
                    max={100000}
                    step={100}
                />
            </div>
             <div className="space-y-2">
                <Label>Wait interval: {waitInterval[0]}s</Label>
                <Slider
                    value={waitInterval}
                    onValueChange={setWaitInterval}
                    max={60}
                    step={1}
                />
            </div>
          </div>
          
          <DialogFooter className="pt-6">
            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white" disabled={isExtracting}>
              {isExtracting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                'GO'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

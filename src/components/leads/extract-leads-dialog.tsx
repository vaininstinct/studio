
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
import { Loader2, PlusCircle, Search, UserCheck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ExtractLeadsDialogProps {
  onCampaignCreated: (campaignName: string, targetAccount: string, niche: string) => void;
}

export function ExtractLeadsDialog({ onCampaignCreated }: ExtractLeadsDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isExtracting, setIsExtracting] = useState(false);
  const [campaignName, setCampaignName] = useState('');
  const [targetAccount, setTargetAccount] = useState('');
  const [niche, setNiche] = useState('');
  const { toast } = useToast();

  const handleExtract = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!campaignName.trim() || !targetAccount.trim() || !niche.trim()) {
      toast({ variant: 'destructive', title: 'Error', description: 'Please fill out all fields.' });
      return;
    }

    setIsExtracting(true);
    setIsOpen(false);
    
    try {
      onCampaignCreated(campaignName, targetAccount, niche);
      
      toast({
        title: 'Extraction Started',
        description: `We are extracting new leads for the "${campaignName}" campaign.`,
      });

      // Reset fields for the next time the dialog is opened
      setCampaignName('');
      setTargetAccount('');
      setNiche('');
      
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
            Create a new campaign and use AI to generate leads from a target Instagram account.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleExtract} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="campaignName">Campaign Name</Label>
                <Input 
                    id="campaignName" 
                    name="campaignName" 
                    placeholder="e.g. March Fitness Outreach" 
                    required 
                    value={campaignName}
                    onChange={(e) => setCampaignName(e.target.value)}
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="target">Target Instagram Account</Label>
                <div className="relative">
                    <UserCheck className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input 
                        id="target" 
                        name="target" 
                        placeholder="e.g. @username" 
                        required 
                        className="pl-10"
                        value={targetAccount}
                        onChange={(e) => setTargetAccount(e.target.value)}
                    />
                </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="niche">Niche / Industry</Label>
                <Input 
                    id="niche" 
                    name="niche" 
                    placeholder="e.g. Fitness, Photography, Real Estate" 
                    required 
                    value={niche}
                    onChange={(e) => setNiche(e.target.value)}
                />
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

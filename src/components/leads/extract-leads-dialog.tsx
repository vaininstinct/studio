
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
import { Loader2, PlusCircle, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '../ui/textarea';

interface CreateCampaignDialogProps {
  onCampaignCreated: (campaignName: string, usernames: string[]) => Promise<void>;
}

export function CreateCampaignDialog({ onCampaignCreated }: CreateCampaignDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [campaignName, setCampaignName] = useState('');
  const [usernames, setUsernames] = useState('');
  const { toast } = useToast();

  const handleCreate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!campaignName.trim()) {
      toast({ variant: 'destructive', title: 'Error', description: 'Please provide a campaign name.' });
      return;
    }
    
    const usernameList = usernames.split('\n').map(u => u.trim()).filter(Boolean);
    if (usernameList.length === 0) {
        toast({ variant: 'destructive', title: 'Error', description: 'Please enter at least one username.' });
        return;
    }

    setIsCreating(true);
    
    try {
      await onCampaignCreated(campaignName, usernameList);
      
      // Reset fields and close dialog on success
      setIsOpen(false);
      setCampaignName('');
      setUsernames('');
      
    } catch (error) {
      console.error(error);
      // Toast for failure is handled in the parent component
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create New Campaign
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Campaign</DialogTitle>
          <DialogDescription>
            Name your campaign and paste a list of Instagram usernames to import as leads.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleCreate} className="space-y-4">
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
                <Label htmlFor="usernames">Instagram Usernames</Label>
                 <Textarea
                    id="usernames"
                    placeholder="Paste usernames, one per line...&#10;@username1&#10;@username2&#10;@username3"
                    rows={8}
                    value={usernames}
                    onChange={(e) => setUsernames(e.target.value)}
                    className="font-mono text-sm"
                    required
                />
                 <p className="text-xs text-muted-foreground">Each username must be on a new line.</p>
            </div>
          
          <DialogFooter className="pt-4">
            <Button type="submit" className="w-full" disabled={isCreating}>
              {isCreating ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <>
                  <Users className="mr-2 h-4 w-4" />
                  Create Campaign and Import Leads
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

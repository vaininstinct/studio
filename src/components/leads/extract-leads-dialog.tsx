
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

export function ExtractLeadsDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExtracting, setIsExtracting] = useState(false);
  const [campaignOption, setCampaignOption] = useState('existing');
  const { toast } = useToast();

  const handleExtract = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsExtracting(true);
    // Simulate API call for extraction
    await new Promise((resolve) => setTimeout(resolve, 2500));
    setIsExtracting(false);
    setIsOpen(false);
    toast({
      title: 'Extraction Started',
      description: 'We are extracting new leads based on your criteria. They will appear in the correct campaign shortly.',
    });
  };

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
              <RadioGroup defaultValue="existing" value={campaignOption} onValueChange={setCampaignOption} className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="existing" id="r1" />
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
                <Select defaultValue="saas-founders">
                  <SelectTrigger id="campaign-select">
                    <SelectValue placeholder="Select a campaign" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="saas-founders">SaaS Founders</SelectItem>
                    <SelectItem value="fitness-coaches">Fitness Coaches</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="new-campaign-name">New Campaign Name</Label>
                <Input id="new-campaign-name" placeholder="e.g., Real Estate Agents" required />
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
                  <Input id="followers-username" placeholder="@username" required />
                </div>
              </TabsContent>
              <TabsContent value="likes" className="space-y-4 pt-2">
                <div className="space-y-2">
                  <Label htmlFor="likes-post-url">Post URL</Label>
                  <Input id="likes-post-url" placeholder="https://www.instagram.com/p/..." required />
                </div>
              </TabsContent>
              <TabsContent value="comments" className="space-y-4 pt-2">
                <div className="space-y-2">
                  <Label htmlFor="comments-post-url">Post URL</Label>
                  <Input id="comments-post-url" placeholder="https://www.instagram.com/p/..." required />
                </div>
              </TabsContent>
          </Tabs>
          <div className="space-y-2 pt-2">
            <Label htmlFor="keywords">
              Filter by Keywords in Bio/Profile
            </Label>
            <Input id="keywords" placeholder="e.g., coaching, smma, saas" />
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


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
import { Loader2, PlusCircle, Users, FileUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '../ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Papa from 'papaparse';

interface CreateCampaignDialogProps {
  onCampaignCreated: (campaignName: string, usernames: string[]) => Promise<void>;
}

export function CreateCampaignDialog({ onCampaignCreated }: CreateCampaignDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [campaignName, setCampaignName] = useState('');
  const [usernames, setUsernames] = useState('');
  const [fileName, setFileName] = useState('');
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          const extractedUsernames = result.data
            .map((row: any) => row.username || row.handle)
            .filter(Boolean);
          
          if (extractedUsernames.length > 0) {
            setUsernames(extractedUsernames.join('\n'));
            toast({
              title: 'File Processed',
              description: `${extractedUsernames.length} usernames extracted from ${file.name}.`,
            });
          } else {
            toast({
              variant: 'destructive',
              title: 'Error',
              description: 'Could not find a "username" or "handle" column in the CSV.',
            });
             setFileName('');
          }
        },
        error: (error) => {
          toast({
            variant: 'destructive',
            title: 'CSV Parsing Error',
            description: error.message,
          });
          setFileName('');
        },
      });
    }
  };


  const handleCreate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!campaignName.trim()) {
      toast({ variant: 'destructive', title: 'Error', description: 'Please provide a campaign name.' });
      return;
    }
    
    const usernameList = usernames.split('\n').map(u => u.trim().replace('@', '')).filter(Boolean);
    if (usernameList.length === 0) {
        toast({ variant: 'destructive', title: 'Error', description: 'Please provide at least one username.' });
        return;
    }

    setIsCreating(true);
    
    try {
      await onCampaignCreated(campaignName, usernameList);
      
      // Reset fields and close dialog on success
      setIsOpen(false);
      setCampaignName('');
      setUsernames('');
      setFileName('');
      
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
             Name your campaign and import leads by pasting usernames or uploading a CSV.
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

            <Tabs defaultValue="paste" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="paste">Paste Usernames</TabsTrigger>
                <TabsTrigger value="csv">Upload CSV</TabsTrigger>
              </TabsList>
              <TabsContent value="paste">
                <div className="space-y-2 pt-2">
                    <Label htmlFor="usernames">Instagram Usernames</Label>
                     <Textarea
                        id="usernames"
                        placeholder="Paste usernames, one per line...&#10;@username1&#10;@username2&#10;@username3"
                        rows={8}
                        value={usernames}
                        onChange={(e) => setUsernames(e.target.value)}
                        className="font-mono text-sm"
                    />
                     <p className="text-xs text-muted-foreground">Each username must be on a new line.</p>
                </div>
              </TabsContent>
              <TabsContent value="csv">
                 <div className="space-y-2 pt-2">
                    <Label htmlFor="csv-file">CSV File</Label>
                    <div className="relative">
                        <Input
                            id="csv-file"
                            type="file"
                            accept=".csv"
                            onChange={handleFileChange}
                            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                        />
                        <div className="flex h-32 w-full flex-col items-center justify-center rounded-md border-2 border-dashed">
                           <FileUp className="h-8 w-8 text-muted-foreground" />
                           <p className="mt-2 text-sm text-muted-foreground">
                               {fileName ? fileName : 'Click to upload or drag & drop'}
                           </p>
                           <p className="text-xs text-muted-foreground">CSV file with a 'username' column</p>
                        </div>
                    </div>
                </div>
              </TabsContent>
            </Tabs>
          
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

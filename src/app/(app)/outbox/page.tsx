
'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getOutboxMessages } from '@/services/outbox';
import type { OutboxMessage } from '@/lib/data';
import { useAuth } from '@/context/auth-context';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { MessageSquare, Clipboard } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function OutboxPage() {
  const [messages, setMessages] = useState<OutboxMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (!user) return;

    const fetchMessages = async () => {
      try {
        setIsLoading(true);
        const userMessages = await getOutboxMessages(user.uid);
        setMessages(userMessages);
      } catch (error) {
        console.error('Error fetching outbox messages:', error);
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Could not fetch outbox messages.',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchMessages();
  }, [user, toast]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copied!',
      description: 'Message copied to clipboard.',
    });
  };

  return (
    <div className="flex flex-1 flex-col bg-background sm:pl-20">
      <header className="sticky top-0 z-10 flex h-16 items-center border-b bg-card px-6">
        <h1 className="text-xl font-semibold">Outbox</h1>
      </header>
      <main className="flex-1 p-4 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle>Generated Messages</CardTitle>
            <CardDescription>
              These are the AI-generated opening messages for your campaigns.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-20 w-full rounded-lg" />
                <Skeleton className="h-20 w-full rounded-lg" />
                <Skeleton className="h-20 w-full rounded-lg" />
              </div>
            ) : messages.length > 0 ? (
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className="rounded-lg border bg-secondary/30 p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-10 w-10 border">
                          <AvatarImage src={message.lead.avatarUrl} alt={message.lead.name} />
                          <AvatarFallback>{message.lead.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-baseline gap-2">
                             <p className="font-semibold">{message.lead.name}</p>
                             <p className="text-sm text-muted-foreground">@{message.lead.username}</p>
                          </div>
                          <p className="mt-1 text-sm text-foreground">{message.generatedMessage}</p>
                          <p className="mt-2 text-xs text-muted-foreground">
                            Campaign: <span className="font-medium text-primary">{message.campaignName}</span>
                          </p>
                        </div>
                      </div>
                       <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleCopy(message.generatedMessage)}
                          className="h-8 w-8 shrink-0"
                        >
                          <Clipboard className="h-4 w-4" />
                          <span className="sr-only">Copy message</span>
                        </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-muted bg-background p-12 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                  <MessageSquare className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold">No Messages Yet</h3>
                <p className="max-w-xs text-sm text-muted-foreground">
                  Start a campaign from the Leads page to generate messages.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

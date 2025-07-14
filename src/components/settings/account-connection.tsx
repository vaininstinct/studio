'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export function AccountConnection() {
  const [status, setStatus] = useState<'disconnected' | 'connecting' | 'connected'>('disconnected');
  const isLoading = status === 'connecting';

  const handleConnect = async () => {
    setStatus('connecting');
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setStatus('connected');
  };

  const handleDisconnect = () => {
    setStatus('disconnected');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Instagram Account</CardTitle>
        <CardDescription>
          Connect your Instagram account to send personalized direct messages to your leads.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {status === 'connected' && (
          <div className="flex items-center gap-4 rounded-lg border bg-secondary/50 p-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src="https://placehold.co/100x100.png" data-ai-hint="profile avatar" alt="@your_username" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">Your Awesome Brand</p>
              <p className="text-sm text-muted-foreground">@your_username</p>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="border-t px-6 py-4">
        <div className="flex w-full items-center justify-between">
          <p
            className={cn(
              'text-sm text-muted-foreground',
              status === 'connected' && 'text-green-600'
            )}
          >
            {status === 'connected' ? 'Connected' : 'Not connected'}
          </p>
          {status === 'connected' ? (
            <Button variant="destructive" onClick={handleDisconnect}>
              Disconnect
            </Button>
          ) : (
            <Button onClick={handleConnect} disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              <InstagramIcon className="mr-2 h-4 w-4" />
              Connect Account
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}

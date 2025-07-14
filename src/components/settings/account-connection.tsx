
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Loader2, Trash2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Bot } from 'lucide-react';

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

interface Account {
  id: number;
  username: string;
  avatar: string;
  name: string;
}

const initialAccounts: Account[] = [
  { id: 1, username: '@your_username', name: 'Your Awesome Brand', avatar: 'https://placehold.co/100x100/673AB7/FFFFFF.png' },
];


export function AccountConnection() {
  const [accounts, setAccounts] = useState<Account[]>(initialAccounts);
  const [isConnecting, setIsConnecting] = useState(false);
  const [showAuthDialog, setShowAuthDialog] = useState(false);

  const handleAuthorize = async () => {
    setIsConnecting(true);
    // Simulate API call to connect
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    const newId = accounts.length > 0 ? Math.max(...accounts.map(a => a.id)) + 1 : 1;
    const newUsernames = ['@new_profile', '@another_brand', '@insta_growth'];
    const newNames = ['New Profile', 'Another Brand', 'Insta Growth'];
    const newAvatars = [
        'https://placehold.co/100x100/3F51B5/FFFFFF.png',
        'https://placehold.co/100x100/E91E63/FFFFFF.png',
        'https://placehold.co/100x100/4CAF50/FFFFFF.png'
    ];
    const randomIndex = Math.floor(Math.random() * newUsernames.length);

    setAccounts(prev => [...prev, {
        id: newId,
        username: newUsernames[randomIndex],
        name: newNames[randomIndex],
        avatar: newAvatars[randomIndex]
    }]);

    setIsConnecting(false);
    setShowAuthDialog(false);
  };

  const handleDisconnect = (accountId: number) => {
    setAccounts(prev => prev.filter(account => account.id !== accountId));
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Instagram Accounts</CardTitle>
          <CardDescription>
            Connect your Instagram accounts to send personalized direct messages to your leads.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {accounts.length > 0 ? (
            accounts.map(account => (
              <div key={account.id} className="flex items-center justify-between gap-4 rounded-lg border bg-secondary/50 p-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={account.avatar} data-ai-hint="profile avatar" alt={account.username} />
                    <AvatarFallback>{account.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{account.name}</p>
                    <p className="text-sm text-muted-foreground">{account.username}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => handleDisconnect(account.id)}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                  <span className="sr-only">Disconnect {account.username}</span>
                </Button>
              </div>
            ))
          ) : (
              <p className="text-sm text-muted-foreground text-center py-4">No accounts connected.</p>
          )}
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
            <Button onClick={() => setShowAuthDialog(true)} className="w-full">
              <InstagramIcon className="mr-2 h-4 w-4" />
              Connect New Account
            </Button>
        </CardFooter>
      </Card>

      <Dialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex flex-col items-center justify-center text-center">
              <InstagramIcon className="h-12 w-12 mb-4" />
              <span className="text-lg">Authorize InstaLeadFlow</span>
            </DialogTitle>
            <DialogDescription className="text-center pt-2">
              InstaLeadFlow is requesting permission to access your profile and send messages on your behalf.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center justify-center gap-2 py-4">
            <Bot className="h-8 w-8 text-primary" />
            <div className="text-2xl font-light text-muted-foreground">→</div>
            <Avatar>
                <AvatarImage src="https://placehold.co/100x100.png" data-ai-hint="profile avatar" />
                <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </div>
          <DialogFooter className="flex-col-reverse sm:flex-row sm:justify-center sm:space-x-4">
            <Button type="button" variant="secondary" onClick={() => setShowAuthDialog(false)}>
              Cancel
            </Button>
            <Button type="button" onClick={handleAuthorize} disabled={isConnecting}>
              {isConnecting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Authorize
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

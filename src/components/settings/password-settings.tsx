'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Save } from 'lucide-react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';

export function PasswordSettings() {
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSaving(false);
    toast({
      title: 'Password Updated',
      description: 'Your password has been changed successfully.',
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Password</CardTitle>
        <CardDescription>
          Change your password here. After saving, you will be logged out.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSave}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current-password">Current Password</Label>
            <Input id="current-password" type="password" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-password">New Password</Label>
            <Input id="new-password" type="password" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm New Password</Label>
            <Input id="confirm-password" type="password" required />
          </div>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button type="submit" disabled={isSaving} className="ml-auto">
            {isSaving ? <Loader2 className="animate-spin" /> : <Save />}
            Save Password
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}

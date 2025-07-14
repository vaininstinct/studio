'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Save } from 'lucide-react';

export function ProxySettings() {
  const [proxies, setProxies] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate saving to a database
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSaving(false);
    toast({
      title: 'Proxies Saved',
      description: 'Your proxy list has been updated.',
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Proxy Settings</CardTitle>
        <CardDescription>
          Add proxies to rotate IP addresses for your connected accounts. Enter one proxy per line.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Textarea
          placeholder="e.g., http://user:pass@host:port"
          rows={8}
          value={proxies}
          onChange={(e) => setProxies(e.target.value)}
          className="font-mono text-sm"
        />
      </CardContent>
      <CardFooter className="border-t px-6 py-4">
        <Button onClick={handleSave} disabled={isSaving} className="ml-auto">
          {isSaving ? <Loader2 className="animate-spin" /> : <Save />}
          Save Proxies
        </Button>
      </CardFooter>
    </Card>
  );
}

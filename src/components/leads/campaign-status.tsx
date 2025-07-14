
'use client';

import { Progress } from '@/components/ui/progress';
import { Loader2 } from 'lucide-react';

interface CampaignStatusProps {
  progress?: number;
  statusText?: string;
}

export function CampaignStatus({ progress = 0, statusText = 'Processing...' }: CampaignStatusProps) {
  return (
    <div className="flex w-full max-w-xs items-center gap-2">
      <Loader2 className="h-4 w-4 shrink-0 animate-spin text-primary" />
      <div className="flex-1">
        <p className="text-xs font-medium text-muted-foreground">{statusText}</p>
        <Progress value={progress} className="h-1" />
      </div>
    </div>
  );
}

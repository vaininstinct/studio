import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { Lead } from '@/lib/data';

interface LeadCardProps {
  lead: Lead;
}

export function LeadCard({ lead }: LeadCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden transition-all hover:shadow-lg">
      <CardHeader className="flex flex-row items-center gap-4 p-4">
        <Avatar className="h-12 w-12 border">
          <AvatarImage src={lead.avatarUrl} alt={lead.name} />
          <AvatarFallback>{lead.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="grid gap-1">
          <CardTitle className="text-lg">{lead.name}</CardTitle>
          <p className="text-sm text-muted-foreground">@{lead.username}</p>
        </div>
      </CardHeader>
      <CardContent className="flex-1 px-4 py-0">
        <p className="text-sm text-muted-foreground line-clamp-3">{lead.bio}</p>
        {lead.latestPostImageUrl && (
          <div className="mt-4 aspect-square w-full overflow-hidden rounded-md">
            <Image
              src={lead.latestPostImageUrl}
              alt={`Latest post from ${lead.name}`}
              width={300}
              height={300}
              className="h-full w-full object-cover transition-transform hover:scale-105"
              data-ai-hint="social media post"
            />
          </div>
        )}
      </CardContent>
      <CardFooter className="p-4"></CardFooter>
    </Card>
  );
}

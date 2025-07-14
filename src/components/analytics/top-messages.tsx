import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';

const topMessages = [
  { text: 'Hey {name}! Just saw your latest post, incredible shot! I run a photography...', replyRate: '28%' },
  { text: 'Hi {name}, your work is inspiring. We have a project that seems like a perfect fit...', replyRate: '21%' },
  { text: 'Love your style, {name}! Let\'s connect and discuss a potential collaboration.', replyRate: '18%' },
];

export function TopMessages() {
  return (
    <Card className="lg:col-span-3">
      <CardHeader>
        <CardTitle>Top Messages</CardTitle>
        <CardDescription>Your best performing message templates.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        {topMessages.map((msg, index) => (
          <div key={index} className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none line-clamp-2">{msg.text}</p>
              <p className="text-sm text-muted-foreground">{msg.replyRate} reply rate</p>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
              <Copy className="h-4 w-4" />
              <span className="sr-only">Copy</span>
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

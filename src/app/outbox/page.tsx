import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, MessageSquare } from 'lucide-react';

export default function OutboxPage() {
  return (
    <div className="flex flex-1 flex-col bg-background sm:pl-20">
      <header className="sticky top-0 z-10 flex h-16 items-center border-b bg-card px-6">
        <h1 className="text-xl font-semibold">Outbox</h1>
      </header>
      <main className="flex-1 p-4 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle>Automated Conversations</CardTitle>
            <CardDescription>
              This is where your ongoing AI-powered conversations will appear.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-muted bg-background p-12 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                <MessageSquare className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold">No Active Conversations</h3>
              <p className="max-w-xs text-sm text-muted-foreground">
                Start a new conversation from the Leads page to see it here.
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

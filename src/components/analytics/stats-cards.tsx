import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Send, MailOpen, MessageSquareReply, CalendarCheck } from 'lucide-react';

const stats = [
  { title: 'Messages Sent', value: '1,254', icon: Send },
  { title: 'Open Rate', value: '68.2%', icon: MailOpen },
  { title: 'Reply Rate', value: '15.7%', icon: MessageSquareReply },
  { title: 'Bookings', value: '32', icon: CalendarCheck },
];

export function StatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

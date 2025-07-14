'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { chartData, type ChartConfig } from '@/lib/data';

const chartConfig = {
  sent: {
    label: 'Sent',
    color: 'hsl(var(--chart-1))',
  },
  opened: {
    label: 'Opened',
    color: 'hsl(var(--chart-2))',
  },
  replied: {
    label: 'Replied',
    color: 'hsl(var(--chart-3))',
  },
} satisfies ChartConfig;

export function MessageChart() {
  return (
    <Card className="lg:col-span-4">
      <CardHeader>
        <CardTitle>Messaging Performance</CardTitle>
        <CardDescription>Last 7 Days</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <BarChart data={chartData} accessibilityLayer>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { weekday: 'short' })}
            />
            <YAxis />
            <Tooltip content={<ChartTooltipContent />} />
            <Bar dataKey="sent" fill="var(--color-sent)" radius={4} />
            <Bar dataKey="opened" fill="var(--color-opened)" radius={4} />
            <Bar dataKey="replied" fill="var(--color-replied)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

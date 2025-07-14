export interface Lead {
  id: string;
  name: string;
  username: string;
  avatarUrl: string;
  bio: string;
  latestPostImageUrl?: string;
}

export interface Campaign {
  id: string;
  name: string;
  niche: string;
  leads: Lead[];
  userId: string;
  createdAt: any; // Firestore timestamp
  status: 'idle' | 'extracting';
  progress?: number;
  statusText?: string;
}


export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode;
    icon?: React.ComponentType;
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<string, string> }
  )
};

const today = new Date();
const getDay = (offset: number) => {
  const date = new Date(today);
  date.setDate(today.getDate() - offset);
  return date.toISOString().split('T')[0];
};

export const chartData = [
  { date: getDay(6), sent: 80, opened: 60, replied: 12 },
  { date: getDay(5), sent: 95, opened: 75, replied: 18 },
  { date: getDay(4), sent: 110, opened: 80, replied: 20 },
  { date: getDay(3), sent: 105, opened: 78, replied: 15 },
  { date: getDay(2), sent: 120, opened: 90, replied: 25 },
  { date: getDay(1), sent: 130, opened: 100, replied: 28 },
  { date: getDay(0), sent: 150, opened: 110, replied: 32 },
];

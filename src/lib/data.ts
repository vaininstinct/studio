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
}


export const mockCampaigns: Campaign[] = [
  {
    id: 'campaign-1',
    name: 'SaaS Founders',
    niche: 'Software as a Service',
    leads: [
      {
        id: '1',
        name: 'Alice Johnson',
        username: 'alicej',
        avatarUrl: 'https://placehold.co/100x100/673AB7/FFFFFF.png',
        bio: 'Founder of @SaaSify. Building tools for the future. 🚀',
        latestPostImageUrl: 'https://placehold.co/400x400.png',
      },
      {
        id: '3',
        name: 'Charlie Brown',
        username: 'charlieb',
        avatarUrl: 'https://placehold.co/100x100/FFC107/FFFFFF.png',
        bio: 'Co-founder & CEO at @LeadGenius. We help you find your next customer. #SaaS',
        latestPostImageUrl: 'https://placehold.co/400x400.png',
      },
      {
        id: '4',
        name: 'Diana Miller',
        username: 'dianam',
        avatarUrl: 'https://placehold.co/100x100/E91E63/FFFFFF.png',
        bio: 'Building in public. Founder of @StyleUp, a fashion tech SaaS. Sharing my journey through style.',
        latestPostImageUrl: 'https://placehold.co/400x400.png',
      },
    ]
  },
  {
    id: 'campaign-2',
    name: 'Fitness Coaches',
    niche: 'Health & Wellness',
    leads: [
       {
        id: '2',
        name: 'Bob Williams',
        username: 'bobw',
        avatarUrl: 'https://placehold.co/100x100/3F51B5/FFFFFF.png',
        bio: 'Fitness coach and nutritionist. Helping you become the best version of yourself. #fitness #health',
        latestPostImageUrl: 'https://placehold.co/400x400.png',
      },
      {
        id: '8',
        name: 'Hannah Wilson',
        username: 'hannahw',
        avatarUrl: 'https://placehold.co/100x100/FF9800/FFFFFF.png',
        bio: 'Yoga instructor and wellness advocate. Finding balance on and off the mat. 🧘‍♀️',
      },
       {
        id: '5',
        name: 'Ethan Davis',
        username: 'ethand',
        avatarUrl: 'https://placehold.co/100x100/4CAF50/FFFFFF.png',
        bio: 'Online fitness coach. Get fit from home. DM for personal training plans.',
        latestPostImageUrl: 'https://placehold.co/400x400.png',
      },
    ]
  }
];


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

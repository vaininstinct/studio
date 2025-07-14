import { AppSidebar } from '@/components/layout/app-sidebar';

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen w-full">
      <AppSidebar />
      <main className="flex flex-1 flex-col">{children}</main>
    </div>
  );
}

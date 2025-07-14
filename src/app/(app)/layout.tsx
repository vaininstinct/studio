
'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { useAuth } from '@/context/auth-context';
import { Skeleton } from '@/components/ui/skeleton';

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (loading) return; // Wait until authentication state is loaded

    const isPublicPage = pathname === '/login' || pathname === '/signup';

    // If we're done loading and there's no user, redirect to login
    // unless we are already on a public page.
    if (!user && !isPublicPage) {
      router.push('/login');
    }
  }, [user, loading, router, pathname]);

  // Show a loading skeleton while checking auth state
  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Skeleton className="h-16 w-16 rounded-full" />
          <Skeleton className="h-4 w-48" />
        </div>
      </div>
    );
  }
  
  // If no user, the effect will handle redirection. Return null to avoid
  // flashing protected content.
  if (!user) {
    return null; 
  }

  return (
    <div className="flex min-h-screen w-full">
      <AppSidebar />
      <main className="flex flex-1 flex-col">{children}</main>
    </div>
  );
}

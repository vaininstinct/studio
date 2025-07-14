import Link from 'next/link';
import { Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b bg-background/95 px-4 backdrop-blur md:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Bot className="h-6 w-6 text-primary" />
          <span className="">InstaLeadFlow</span>
        </Link>
        <nav className="flex items-center gap-2">
          <Button variant="ghost" asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Sign Up</Link>
          </Button>
        </nav>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t">
        <div className="container flex items-center justify-between py-4 text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} InstaLeadFlow. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-primary">Terms</Link>
            <Link href="#" className="hover:text-primary">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Pricing } from '@/components/public/pricing';
import { CheckCircle } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex flex-col">
      <section className="bg-background">
        <div className="container grid grid-cols-1 items-center gap-8 px-4 py-16 md:grid-cols-2 md:py-24 lg:gap-16">
          <div className="flex flex-col items-start gap-6">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              Automate Your Instagram Outreach with AI
            </h1>
            <p className="max-w-md text-lg text-muted-foreground">
              Stop wasting hours on manual DMs. InstaLeadFlow uses AI to find targeted leads and start personalized conversations that convert.
            </p>
            <div className="flex gap-4">
              <Button asChild size="lg">
                <Link href="/signup">Start Your 14-Day Free Trial</Link>
              </Button>
            </div>
          </div>
          <div className="overflow-hidden rounded-xl">
             <Image 
                src="https://placehold.co/600x400.png"
                width={600}
                height={400}
                alt="InstaLeadFlow Dashboard"
                className="w-full"
                data-ai-hint="dashboard analytics"
             />
          </div>
        </div>
      </section>

      <section className="bg-secondary">
        <div className="container px-4 py-16 md:py-24">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">How It Works</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Three simple steps to put your lead generation on autopilot.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center gap-4 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <span className="text-xl font-bold">1</span>
                  </div>
                  <h3 className="text-xl font-semibold">Connect & Target</h3>
                  <p className="text-muted-foreground">Link your Instagram and tell our AI who to look for—followers of competitors, users who liked specific posts, and more.</p>
              </div>
              <div className="flex flex-col items-center gap-4 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <span className="text-xl font-bold">2</span>
                  </div>
                  <h3 className="text-xl font-semibold">AI Crafts the Opener</h3>
                  <p className="text-muted-foreground">Our AI analyzes profiles and crafts a unique, personalized opening message designed to start a genuine conversation.</p>
              </div>
              <div className="flex flex-col items-center gap-4 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <span className="text-xl font-bold">3</span>
                  </div>
                  <h3 className="text-xl font-semibold">Watch Your Inbox Fill Up</h3>
                  <p className="text-muted-foreground">Engage with warm leads directly in your Instagram DMs while the AI continues to work in the background.</p>
              </div>
          </div>
        </div>
      </section>

      <Pricing />
    </div>
  );
}

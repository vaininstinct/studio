import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';
import Link from 'next/link';

const tiers = [
    {
        name: 'Free',
        price: '$0',
        period: 'month',
        description: 'Get a feel for our platform with a 14-day trial.',
        features: [
            '1 Connected Instagram Account',
            '25 AI-generated openers/day',
            'Basic Lead Filtering',
            'Email Support'
        ],
        cta: 'Start 14-Day Free Trial',
        href: '/signup',
        variant: 'secondary' as const,
    },
    {
        name: 'Silver',
        price: '$49',
        period: 'month',
        description: 'Perfect for small businesses and solo entrepreneurs.',
        features: [
            '3 Connected Instagram Accounts',
            '500 AI-generated openers/day',
            'Advanced Lead Filtering',
            'Priority Email Support'
        ],
        cta: 'Get Started',
        href: '/signup',
        variant: 'default' as const,
    },
    {
        name: 'Gold',
        price: '$99',
        period: 'month',
        description: 'For power users and agencies scaling their outreach.',
        features: [
            'Unlimited Instagram Accounts',
            'Unlimited AI-generated openers/day',
            'Advanced Lead Filtering & Analytics',
            'Dedicated Phone & Chat Support'
        ],
        cta: 'Get Started',
        href: '/signup',
        variant: 'default' as const,
    }
]

export function Pricing() {
    return (
        <section id="pricing" className="bg-background">
            <div className="container px-4 py-16 md:py-24">
                <div className="mx-auto mb-12 max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                        Find the Perfect Plan
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Start for free, then upgrade to a plan that fits your needs.
                    </p>
                </div>
                <div className="grid max-w-5xl mx-auto gap-8 md:grid-cols-3">
                    {tiers.map((tier) => (
                        <Card key={tier.name} className={`flex flex-col ${tier.name === 'Silver' ? 'border-primary shadow-lg' : ''}`}>
                            <CardHeader>
                                <CardTitle>{tier.name}</CardTitle>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-4xl font-bold">{tier.price}</span>
                                    <span className="text-muted-foreground">/ {tier.period}</span>
                                </div>
                                <CardDescription>{tier.description}</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-1 space-y-4">
                                <ul className="space-y-3">
                                    {tier.features.map((feature) => (
                                        <li key={feature} className="flex items-center gap-2">
                                            <Check className="h-5 w-5 text-primary" />
                                            <span className="text-muted-foreground">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                            <CardFooter>
                                <Button asChild className="w-full" variant={tier.variant}>
                                    <Link href={tier.href}>{tier.cta}</Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}

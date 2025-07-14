import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';
import Link from 'next/link';

const tiers = [
    {
        name: 'Free',
        price: '$0',
        period: 'For getting started',
        features: [
            '1 Connected Instagram Account',
            '25 AI-generated conversations / day',
            'Basic Lead Filtering',
            'Email Support'
        ],
        cta: 'Start 14-day free trial',
        href: '/signup',
    },
    {
        name: 'Silver',
        price: '$49',
        period: 'For growing businesses',
        features: [
            '5 Connected Instagram Accounts',
            '150 AI-generated conversations / day',
            'Advanced Lead Filtering',
            'Priority Email Support'
        ],
        cta: 'Start 14-day free trial',
        href: '/signup',
        popular: true,
    },
    {
        name: 'Gold',
        price: '$99',
        period: 'For power users & agencies',
        features: [
            'Unlimited Instagram Accounts',
            '500 AI-generated conversations / day',
            'Advanced Lead Filtering & Analytics',
            'Dedicated Phone & Email Support'
        ],
        cta: 'Start 14-day free trial',
        href: '/signup',
    },
];

export function Pricing() {
    return (
        <section id="pricing" className="bg-background">
            <div className="container px-4 py-16 md:py-24">
                <div className="mx-auto mb-12 max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                        Simple, transparent pricing
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Choose the plan that's right for you. Start your 14-day free trial today.
                    </p>
                </div>
                <div className="grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3 lg:mx-auto">
                    {tiers.map((tier) => (
                        <Card key={tier.name} className={`flex flex-col ${tier.popular ? 'border-primary shadow-lg' : ''}`}>
                            <CardHeader>
                                <CardTitle>{tier.name}</CardTitle>
                                <CardDescription>{tier.period}</CardDescription>
                                <div className="flex items-baseline gap-2 pt-2">
                                    <span className="text-4xl font-bold">{tier.price}</span>
                                    {tier.name !== 'Free' && <span className="text-muted-foreground">/ month</span>}
                                </div>
                            </CardHeader>
                            <CardContent className="flex-1">
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
                                <Button asChild className="w-full" variant={tier.popular ? 'default' : 'outline'}>
                                    <Link href={tier.href}>{tier.cta}</Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}

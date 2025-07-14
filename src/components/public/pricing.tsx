import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';

const pricingTiers = [
    {
        name: 'Free',
        price: '$0',
        period: ' / month',
        description: 'Get a taste of AI-powered outreach.',
        features: [
            '1 Connected Account',
            '25 AI-Generated Openers / month',
            'Basic Lead Filtering',
        ],
        cta: 'Start for Free',
        isFeatured: false,
    },
    {
        name: 'Silver',
        price: '$49',
        period: ' / month',
        description: 'Perfect for small businesses and creators.',
        features: [
            '3 Connected Accounts',
            '500 AI-Generated Openers / month',
            'Advanced Lead Filtering',
            'Automated Follow-ups (Coming Soon)',
        ],
        cta: 'Start 14-Day Free Trial',
        isFeatured: true,
    },
    {
        name: 'Gold',
        price: '$99',
        period: ' / month',
        description: 'For agencies and power users.',
        features: [
            'Unlimited Connected Accounts',
            'Unlimited AI-Generated Openers',
            'Advanced Lead Filtering',
            'Priority Support',
            'Automated Follow-ups (Coming Soon)',
        ],
        cta: 'Start 14-Day Free Trial',
        isFeatured: false,
    },
];

export function Pricing() {
    return (
        <section id="pricing" className="bg-background">
            <div className="container px-4 py-16 md:py-24">
                <div className="mx-auto mb-12 max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Pricing Plans</h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Choose the plan that fits your needs. Cancel anytime.
                    </p>
                </div>
                <div className="grid max-w-5xl grid-cols-1 gap-8 md:mx-auto md:grid-cols-3">
                    {pricingTiers.map((tier) => (
                        <Card key={tier.name} className={`flex flex-col ${tier.isFeatured ? 'border-primary ring-2 ring-primary' : ''}`}>
                            <CardHeader>
                                <CardTitle>{tier.name}</CardTitle>
                                <CardDescription>{tier.description}</CardDescription>
                                <div className="flex items-baseline">
                                    <span className="text-4xl font-bold">{tier.price}</span>
                                    <span className="text-muted-foreground">{tier.period}</span>
                                </div>
                            </CardHeader>
                            <CardContent className="flex-1 space-y-4">
                                <ul className="space-y-2">
                                    {tier.features.map((feature) => (
                                        <li key={feature} className="flex items-center gap-2">
                                            <Check className="h-5 w-5 text-primary" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                            <CardFooter>
                                <Button asChild className="w-full" variant={tier.isFeatured ? 'default' : 'outline'}>
                                    <Link href="/signup">{tier.cta}</Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}

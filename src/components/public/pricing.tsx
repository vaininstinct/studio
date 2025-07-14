import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

const plans = [
    {
      name: 'Free',
      price: '$0',
      priceDescription: 'for 14 days',
      description: 'Get a feel for our platform with a no-commitment free trial.',
      features: [
        'Connect 1 Instagram Account',
        '25 AI-powered conversations / day',
        'Basic Lead Filtering',
      ],
      buttonText: 'Start Your Free Trial',
      buttonLink: '/signup',
    },
    {
      name: 'Silver',
      price: '$125',
      priceDescription: '/ month',
      description: 'Perfect for small businesses and solo entrepreneurs.',
      features: [
        'Connect up to 3 Instagram Accounts',
        '150 AI-powered conversations / day',
        'Advanced Lead Filtering',
        'Analytics Dashboard',
        'Email Support',
      ],
      buttonText: 'Choose Silver',
      buttonLink: '/signup',
    },
    {
      name: 'Gold',
      price: '$250',
      priceDescription: '/ month',
      description: 'For power users and agencies scaling their outreach.',
      features: [
        'Connect Unlimited Instagram Accounts',
        '400 AI-powered conversations / day',
        'Advanced Lead Filtering & A/B Testing',
        'Priority Support & Onboarding',
        'API Access',
      ],
      buttonText: 'Choose Gold',
      buttonLink: '/signup',
    },
  ];

export function Pricing() {
    return (
        <section id="pricing" className="bg-background">
            <div className="container py-16 md:py-24">
                <div className="mx-auto mb-12 max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                        Find the Perfect Plan
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Start for free, then upgrade to a plan that fits your outreach needs.
                    </p>
                </div>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    {plans.map((plan) => (
                        <Card key={plan.name} className="flex flex-col">
                            <CardHeader>
                                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                                <CardDescription>{plan.description}</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-1 space-y-6">
                                <div className="flex items-baseline gap-2">
                                    <span className="text-4xl font-bold">{plan.price}</span>
                                    <span className="text-muted-foreground">{plan.priceDescription}</span>
                                </div>
                                <ul className="space-y-3">
                                    {plan.features.map((feature) => (
                                        <li key={feature} className="flex items-center gap-2">
                                            <CheckCircle className="h-5 w-5 text-primary" />
                                            <span className="text-muted-foreground">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                            <CardFooter>
                                <Button asChild className="w-full" size="lg">
                                    <Link href={plan.buttonLink}>{plan.buttonText}</Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
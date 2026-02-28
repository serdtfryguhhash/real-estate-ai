"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Disclaimer } from "@/components/shared/disclaimer";
import { pricingTiers } from "@/data/properties";

import { Check, Star, ArrowRight, HelpCircle } from "lucide-react";

const faqs = [
  {
    q: "Can I try before I buy?",
    a: "Absolutely! Our Free plan gives you 5 deal analyses per month with no credit card required. You can upgrade anytime when you are ready for more.",
  },
  {
    q: "What happens if I exceed my deal limit?",
    a: "You will receive a notification when you are approaching your limit. You can upgrade your plan at any time to unlock more analyses, or wait until the next billing cycle.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes, all plans are month-to-month with no long-term contracts. Cancel anytime from your settings page and you will retain access through the end of your billing period.",
  },
  {
    q: "How accurate is the AI deal scoring?",
    a: "Our AI has been trained on millions of transactions and validated against professional appraisals. Deal scores are typically within 5% of professional valuations.",
  },
  {
    q: "Do you offer annual billing?",
    a: "Yes! Toggle the annual billing switch above for 20% savings on all paid plans. Annual plans are billed once per year.",
  },
  {
    q: "What is included in the affiliate program?",
    a: "All paid plans include access to our 20% recurring commission affiliate program. Share your referral link and earn 20% of each referral's subscription for as long as they remain active.",
  },
];

export default function PricingPage() {
  const [annual, setAnnual] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary to-secondary py-16 text-center">
          <div className="max-w-4xl mx-auto px-4">
            <Badge className="bg-white/10 text-white border-white/20 mb-4">Simple Pricing</Badge>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Choose the Plan That Fits Your Strategy
            </h1>
            <p className="text-lg text-white/80 mb-8">
              From beginner investors to fund managers, we have a plan for every level.
            </p>
            <div className="flex items-center justify-center gap-3">
              <span className={`text-sm ${!annual ? "text-white font-medium" : "text-white/60"}`}>Monthly</span>
              <Switch checked={annual} onCheckedChange={setAnnual} />
              <span className={`text-sm ${annual ? "text-white font-medium" : "text-white/60"}`}>
                Annual
                <Badge className="ml-2 bg-accent text-white border-0">Save 20%</Badge>
              </span>
            </div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 pb-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pricingTiers.map((tier) => {
              const price = annual && tier.price > 0 ? Math.round(tier.price * 0.8) : tier.price;
              return (
                <Card key={tier.name} className={`relative overflow-hidden ${tier.highlighted ? "border-2 border-primary shadow-xl scale-105 z-10" : "border-border"}`}>
                  {tier.highlighted && (
                    <div className="bg-primary text-white text-center py-1.5 text-xs font-semibold">
                      <Star className="inline h-3.5 w-3.5 mr-1" />
                      Most Popular
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-1">{tier.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{tier.description}</p>

                    <div className="mb-6">
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-bold tabular-nums" style={{ fontFeatureSettings: '"tnum"' }}>
                          {price === 0 ? "Free" : `$${price}`}
                        </span>
                        {price > 0 && (
                          <span className="text-muted-foreground text-sm">
                            /{annual ? "mo" : "mo"}
                          </span>
                        )}
                      </div>
                      {annual && tier.price > 0 && (
                        <p className="text-xs text-muted-foreground mt-1">
                          <span className="line-through">${tier.price}/mo</span>
                          <span className="text-accent ml-2">Billed ${price * 12}/year</span>
                        </p>
                      )}
                    </div>

                    <Link href="/signup">
                      <Button className="w-full mb-6" variant={tier.highlighted ? "default" : "outline"} size="lg">
                        {tier.cta}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>

                    <div className="space-y-3">
                      {tier.features.map((feature) => (
                        <div key={feature} className="flex items-start gap-2.5">
                          <Check className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 pt-4 border-t border-border text-xs text-muted-foreground">
                      <p>Deals: {tier.dealLimit === "unlimited" ? "Unlimited" : `${tier.dealLimit}/mo`}</p>
                      <p>Alerts: {tier.alertLimit === "unlimited" ? "Unlimited" : tier.alertLimit}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-white py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <Card key={faq.q} className="p-5">
                  <h3 className="font-semibold flex items-center gap-2">
                    <HelpCircle className="h-4 w-4 text-primary" />
                    {faq.q}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-2 ml-6">{faq.a}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-primary to-secondary py-16 text-center">
          <div className="max-w-xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Find Your Next Deal?</h2>
            <p className="text-white/80 mb-6">Start with our free plan and upgrade when you are ready.</p>
            <Link href="/signup">
              <Button size="xl" variant="accent">
                Get Started Free <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 py-8">
          <Disclaimer />
        </div>
      </main>

      <Footer />
    </div>
  );
}

"use client";

import React from "react";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DealScore } from "@/components/shared/deal-score";
import { PropertyCard } from "@/components/shared/property-card";

import { Disclaimer } from "@/components/shared/disclaimer";
import { dealAnalyses } from "@/data/properties";
import { formatCurrency, formatPercent } from "@/lib/utils";
import {
  ArrowRight,
  Brain,
  MapPin,
  Calculator,
  Bell,
  Briefcase,
  BarChart3,

  Zap,


  Star,

  Building2,
  Target,
  LineChart,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Deal Scoring",
    description: "Our AI analyzes 50+ data points to score each deal from 1-100, factoring in ARV, rehab costs, comps, and market trends.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: BarChart3,
    title: "Automated Comps",
    description: "Pull 3-5 comparable sales automatically, adjust for property differences, and calculate accurate ARV in seconds.",
    color: "bg-secondary/10 text-secondary",
  },
  {
    icon: Target,
    title: "Rehab Estimator",
    description: "AI-powered cost estimates based on property age, condition level, and local labor rates. Cosmetic to full gut.",
    color: "bg-accent/10 text-accent",
  },
  {
    icon: MapPin,
    title: "Interactive Deal Map",
    description: "Mapbox-powered maps with pins, heatmaps, draw-to-search, and click-for-instant-analysis on any property.",
    color: "bg-purple-100 text-purple-700",
  },
  {
    icon: Calculator,
    title: "Investment Calculator",
    description: "Full financial analysis: cash-on-cash, cap rate, DSCR, monthly cash flow, equity projections, and more.",
    color: "bg-orange-100 text-orange-700",
  },
  {
    icon: Bell,
    title: "Deal Alerts",
    description: "Set your criteria and get notified hourly when matching deals hit the market. Never miss an opportunity.",
    color: "bg-blue-100 text-blue-700",
  },
];

const stats = [
  { value: "12,847", label: "Deals Analyzed" },
  { value: "$2.3B", label: "Property Value Tracked" },
  { value: "3,200+", label: "Active Investors" },
  { value: "94%", label: "Accuracy Rate" },
];

const testimonials = [
  {
    name: "Marcus Thompson",
    role: "Real Estate Investor, Austin TX",
    text: "DealFinder AI has completely transformed how I source deals. The AI scoring saves me 15+ hours a week on analysis. I closed 3 properties in my first month using the platform.",
    rating: 5,
  },
  {
    name: "Jennifer Liu",
    role: "Fund Manager, Southeast Portfolio",
    text: "The automated comp analysis is remarkably accurate. We have validated it against our own appraisals and it is consistently within 3-5% of professional valuations. Essential tool for our fund.",
    rating: 5,
  },
  {
    name: "David Rodriguez",
    role: "House Flipper, Tampa FL",
    text: "The rehab estimator alone pays for the subscription. I used to spend $500+ on contractor estimates for initial screening. Now I get reliable estimates in seconds.",
    rating: 5,
  },
];

export default function LandingPage() {
  const topDeals = dealAnalyses.sort((a, b) => b.dealScore - a.dealScore).slice(0, 3);

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary-600 to-secondary py-20 lg:py-28">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <Badge variant="secondary" className="bg-white/10 text-white border-white/20 px-4 py-1.5">
                <Sparkles className="h-3.5 w-3.5 mr-1.5" />
                AI-Powered Real Estate Intelligence
              </Badge>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Find Winning Deals{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-emerald-300">
                  Before Anyone Else
                </span>
              </h1>

              <p className="text-lg text-white/80 max-w-xl leading-relaxed">
                AI-powered property analysis that scores every deal, automates comps, estimates rehab costs, and delivers
                actionable insights — so you can invest with confidence.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/signup">
                  <Button size="xl" variant="accent" className="w-full sm:w-auto text-base">
                    Start Analyzing Deals Free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/deals">
                  <Button size="xl" variant="outline" className="w-full sm:w-auto text-base border-white/30 text-white hover:bg-white/10 hover:text-white">
                    View Live Deals
                  </Button>
                </Link>
              </div>

              <div className="flex items-center gap-6 pt-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="h-8 w-8 rounded-full bg-gradient-to-br from-accent to-secondary border-2 border-white flex items-center justify-center">
                      <span className="text-[10px] font-bold text-white">{String.fromCharCode(64 + i)}</span>
                    </div>
                  ))}
                </div>
                <div className="text-white/80 text-sm">
                  <span className="font-semibold text-white">3,200+</span> investors already using DealFinder
                </div>
              </div>
            </div>

            {/* Hero Card */}
            <div className="hidden lg:block animate-slide-up">
              <Card className="p-6 shadow-2xl border-0 bg-white/95 backdrop-blur">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-foreground">Top Deal Found Today</h3>
                    <p className="text-sm text-muted-foreground">Austin, TX</p>
                  </div>
                  <DealScore score={topDeals[0].dealScore} size="md" />
                </div>
                <div className="space-y-3">
                  <div className="h-32 rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                    <Building2 className="h-12 w-12 text-primary/30" />
                  </div>
                  <div>
                    <p className="font-semibold">{topDeals[0].property.address}</p>
                    <p className="text-2xl font-bold text-primary tabular-nums" style={{ fontFeatureSettings: '"tnum"' }}>
                      {formatCurrency(topDeals[0].property.price)}
                    </p>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-accent/5 rounded-lg p-2.5 text-center">
                      <p className="text-xs text-muted-foreground">ARV</p>
                      <p className="text-sm font-bold text-accent tabular-nums">{formatCurrency(topDeals[0].arv)}</p>
                    </div>
                    <div className="bg-secondary/5 rounded-lg p-2.5 text-center">
                      <p className="text-xs text-muted-foreground">Cap Rate</p>
                      <p className="text-sm font-bold text-secondary tabular-nums">{formatPercent(topDeals[0].capRate)}</p>
                    </div>
                    <div className="bg-primary/5 rounded-lg p-2.5 text-center">
                      <p className="text-xs text-muted-foreground">Cash Flow</p>
                      <p className="text-sm font-bold text-primary tabular-nums">{formatCurrency(topDeals[0].monthlyCashFlow)}/mo</p>
                    </div>
                  </div>
                  <Button className="w-full" size="lg">
                    <Zap className="h-4 w-4 mr-2" />
                    View Full Analysis
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-bold text-primary tabular-nums" style={{ fontFeatureSettings: '"tnum"' }}>
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Badge variant="secondary" className="mb-4">Features</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Everything You Need to Find Winning Deals
            </h2>
            <p className="text-lg text-muted-foreground">
              From AI-powered scoring to interactive maps, we provide the complete toolkit for modern real estate investors.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <Card key={feature.title} className="p-6 hover:shadow-lg transition-all duration-300 group">
                <div className={`h-12 w-12 rounded-lg ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Deals */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-foreground">Top Deals Right Now</h2>
              <p className="text-muted-foreground mt-1">AI-scored and ready for analysis</p>
            </div>
            <Link href="/deals">
              <Button variant="outline">
                View All Deals
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topDeals.map((analysis) => (
              <PropertyCard key={analysis.id} analysis={analysis} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Badge variant="secondary" className="mb-4">How It Works</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              From Discovery to Closing in 4 Steps
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Discover", description: "Browse AI-scored deals or set alerts to find properties matching your criteria.", icon: Search },
              { step: "02", title: "Analyze", description: "Get instant deal analysis with comps, rehab estimates, and financial projections.", icon: LineChart },
              { step: "03", title: "Decide", description: "Use our investment calculator to model different scenarios and validate the deal.", icon: Calculator },
              { step: "04", title: "Close", description: "Track your pipeline from offer to closing with our built-in portfolio manager.", icon: Briefcase },
            ].map((item) => (
              <div key={item.step} className="text-center space-y-4">
                <div className="relative mx-auto w-16 h-16">
                  <div className="absolute inset-0 bg-primary/10 rounded-full" />
                  <div className="absolute inset-2 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">{item.step}</span>
                  </div>
                </div>
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Trusted by Serious Investors</h2>
            <p className="text-muted-foreground">See what our community has to say</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <Card key={t.name} className="p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <span className="text-sm font-bold text-white">{t.name.split(" ").map(n => n[0]).join("")}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-primary to-secondary">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Start Finding Profitable Deals Today
          </h2>
          <p className="text-lg text-white/80 mb-8">
            Join 3,200+ investors using AI to make smarter real estate decisions. Free plan available.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="xl" variant="accent" className="w-full sm:w-auto">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/pricing">
              <Button size="xl" variant="outline" className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10 hover:text-white">
                View Pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Disclaimer />
      </section>

      <Footer />
    </div>
  );
}

function Search(props: React.SVGProps<SVGSVGElement> & { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx={11} cy={11} r={8} /><path d="m21 21-4.3-4.3" />
    </svg>
  );
}

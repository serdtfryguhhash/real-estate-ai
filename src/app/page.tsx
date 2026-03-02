"use client";

import React from "react";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PropertyCard } from "@/components/shared/property-card";
import { MortgageCalculator } from "@/components/shared/mortgage-calculator";
import { TypeformNewsletter } from "@/components/shared/typeform-newsletter";
import { Disclaimer } from "@/components/shared/disclaimer";
import { dealAnalyses } from "@/data/properties";
import {
  ArrowRight,
  Brain,
  MapPin,
  Calculator,
  Bell,
  BarChart3,
  Target,
  Sparkles,
  Star,
  Search,
  TrendingUp,
  Shield,
  CheckCircle2,
  Users,
  Building2,
  Zap,
  Play,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Deal Scoring",
    description:
      "Our AI analyzes 50+ data points to score each deal from 1-100, factoring in ARV, rehab costs, comps, and market trends.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: BarChart3,
    title: "Automated Comps",
    description:
      "Pull 3-5 comparable sales automatically, adjust for property differences, and calculate accurate ARV in seconds.",
    color: "bg-secondary/10 text-secondary",
  },
  {
    icon: Target,
    title: "Rehab Estimator",
    description:
      "AI-powered cost estimates based on property age, condition level, and local labor rates. Cosmetic to full gut.",
    color: "bg-accent/10 text-accent",
  },
  {
    icon: MapPin,
    title: "Interactive Deal Map",
    description:
      "Mapbox-powered maps with pins, heatmaps, draw-to-search, and click-for-instant-analysis on any property.",
    color: "bg-purple-100 text-purple-700",
  },
  {
    icon: Calculator,
    title: "Investment Calculator",
    description:
      "Full financial analysis: cash-on-cash, cap rate, DSCR, monthly cash flow, equity projections, and more.",
    color: "bg-orange-100 text-orange-700",
  },
  {
    icon: Bell,
    title: "Deal Alerts",
    description:
      "Set your criteria and get notified hourly when matching deals hit the market. Never miss an opportunity.",
    color: "bg-blue-100 text-blue-700",
  },
];

const testimonials = [
  {
    name: "Marcus Thompson",
    role: "Real Estate Investor, Austin TX",
    text: "DealFinder AI has completely transformed how I source deals. The AI scoring saves me 15+ hours a week on analysis. I closed 3 properties in my first month using the platform.",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
  },
  {
    name: "Jennifer Liu",
    role: "Fund Manager, Southeast Portfolio",
    text: "The automated comp analysis is remarkably accurate. We validated it against our own appraisals and it is consistently within 3-5% of professional valuations. Essential tool for our fund.",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
  },
  {
    name: "David Rodriguez",
    role: "House Flipper, Tampa FL",
    text: "The rehab estimator alone pays for the subscription. I used to spend $500+ on contractor estimates for initial screening. Now I get reliable estimates in seconds.",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
  },
];

const howItWorks = [
  {
    step: "01",
    icon: Search,
    title: "Discover Properties",
    description:
      "Browse AI-scored deals on our interactive map or set custom alerts to get notified when matching properties hit the market.",
  },
  {
    step: "02",
    icon: TrendingUp,
    title: "AI-Powered Analysis",
    description:
      "Get instant deal scoring with automated comps, rehab estimates, cash flow projections, and neighborhood trend data.",
  },
  {
    step: "03",
    icon: CheckCircle2,
    title: "Invest with Confidence",
    description:
      "Use our investment calculator to model scenarios, validate the numbers, and track your pipeline from offer to closing.",
  },
];

export default function LandingPage() {
  const topDeals = dealAnalyses
    .sort((a, b) => b.dealScore - a.dealScore)
    .slice(0, 3);

  return (
    <div className="min-h-screen">
      <Header />

      {/* ===== HERO SECTION WITH VIDEO BACKGROUND ===== */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Video background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&h=1080&fit=crop"
        >
          <source
            src="https://videos.pexels.com/video-files/3129671/3129671-uhd_2560_1440_30fps.mp4"
            type="video/mp4"
          />
        </video>

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 hero-video-overlay" />

        {/* Floating decorative elements */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 w-full">
          <div className="max-w-3xl space-y-8 animate-fade-in">
            <Badge
              variant="secondary"
              className="bg-white/10 text-white border-white/20 px-4 py-1.5 backdrop-blur-sm"
            >
              <Sparkles className="h-3.5 w-3.5 mr-1.5" />
              AI-Powered Real Estate Intelligence
            </Badge>

            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-[1.1] font-display">
              Find Your Next Investment Property{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-emerald-300">
                with AI
              </span>
            </h1>

            <p className="text-lg md:text-xl text-white/80 max-w-2xl leading-relaxed">
              AI-powered deal analysis. Real-time market data. Smarter
              investments.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link href="/demo">
                <Button
                  size="xl"
                  variant="accent"
                  className="w-full sm:w-auto text-base shadow-lg shadow-accent/25"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Try Free Demo
                </Button>
              </Link>
              <Link href="/deals">
                <Button
                  size="xl"
                  variant="outline"
                  className="w-full sm:w-auto text-base border-white/30 text-white hover:bg-white/10 hover:text-white backdrop-blur-sm"
                >
                  Browse Properties
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>

            <div className="flex items-center gap-6 pt-4">
              <div className="flex -space-x-2">
                {[
                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
                  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop&crop=face",
                  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
                  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
                  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
                ].map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt=""
                    className="h-9 w-9 rounded-full border-2 border-white object-cover"
                  />
                ))}
              </div>
              <div className="text-white/80 text-sm">
                <span className="font-semibold text-white">500+</span> investors
                already using DealFinder
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== STATS BAR ===== */}
      <section className="bg-white border-b border-border relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {[
              { value: "12,000+", label: "Properties Analyzed" },
              { value: "500+", label: "Active Investors" },
              { value: "$2.3B", label: "Deal Volume" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p
                  className="text-3xl md:text-4xl font-bold text-primary tabular-nums font-display"
                  style={{ fontFeatureSettings: '"tnum"' }}
                >
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground mt-1 font-medium">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURED IN / TRUST BADGES ===== */}
      <section className="py-12 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-muted-foreground uppercase tracking-widest font-medium mb-8">
            Trusted by investors featured in
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
            {[
              "Forbes",
              "Bloomberg",
              "TechCrunch",
              "Wall Street Journal",
              "Inc. Magazine",
            ].map((name) => (
              <div
                key={name}
                className="trust-logo text-2xl font-bold text-gray-400 font-display select-none"
              >
                {name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section divider */}
      <div className="section-divider" />

      {/* ===== HOW IT WORKS (3 Steps) ===== */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Badge variant="secondary" className="mb-4">
              How It Works
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 font-display">
              Three Steps to Smarter Investing
            </h2>
            <p className="text-lg text-muted-foreground">
              Go from discovery to closing with AI-powered insights at every
              step.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {howItWorks.map((item, index) => (
              <div key={item.step} className="relative text-center group">
                {/* Connector line */}
                {index < howItWorks.length - 1 && (
                  <div className="hidden md:block absolute top-16 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-primary/20 to-primary/5" />
                )}

                <div className="relative mx-auto w-20 h-20 mb-6">
                  <div className="absolute inset-0 bg-primary/10 rounded-2xl rotate-6 group-hover:rotate-12 transition-transform" />
                  <div className="relative bg-white rounded-2xl shadow-md flex items-center justify-center w-full h-full border border-border/50">
                    <item.icon className="h-8 w-8 text-primary" />
                  </div>
                  <div className="absolute -top-2 -right-2 bg-accent text-white rounded-full w-7 h-7 flex items-center justify-center text-xs font-bold shadow-lg">
                    {item.step}
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-3 font-display">
                  {item.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed max-w-sm mx-auto">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section divider */}
      <div className="section-divider" />

      {/* ===== FEATURES GRID ===== */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Badge variant="secondary" className="mb-4">
              Features
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 font-display">
              Everything You Need to Find Winning Deals
            </h2>
            <p className="text-lg text-muted-foreground">
              From AI-powered scoring to interactive maps, we provide the
              complete toolkit for modern real estate investors.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <Card
                key={feature.title}
                className="p-7 hover:shadow-xl transition-all duration-300 group border-border/50 hover:border-primary/20 rounded-xl"
              >
                <div
                  className={`h-14 w-14 rounded-xl ${feature.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className="h-7 w-7" />
                </div>
                <h3 className="text-lg font-bold mb-2 font-display">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Section divider */}
      <div className="section-divider" />

      {/* ===== FEATURED DEALS ===== */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12 gap-4">
            <div>
              <Badge variant="secondary" className="mb-3">
                <Zap className="h-3 w-3 mr-1" />
                Live Deals
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground font-display">
                Top Deals Right Now
              </h2>
              <p className="text-muted-foreground mt-2">
                AI-scored and ready for analysis
              </p>
            </div>
            <Link href="/deals">
              <Button variant="outline" size="lg" className="rounded-xl">
                View All Deals
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {topDeals.map((analysis) => (
              <PropertyCard key={analysis.id} analysis={analysis} />
            ))}
          </div>
        </div>
      </section>

      {/* Section divider */}
      <div className="section-divider" />

      {/* ===== MORTGAGE / ROI CALCULATOR ===== */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Badge variant="secondary" className="mb-4">
              <Calculator className="h-3 w-3 mr-1" />
              Interactive Calculator
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 font-display">
              Mortgage &amp; ROI Calculator
            </h2>
            <p className="text-lg text-muted-foreground">
              Drag the sliders to model any deal. See monthly payments, equity
              growth projections, and estimated investment returns in real time.
            </p>
          </div>

          <MortgageCalculator />

          <div className="text-center mt-10">
            <Link href="/calculator">
              <Button variant="outline" size="lg" className="rounded-xl">
                Open Full Calculator
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Section divider */}
      <div className="section-divider" />

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              Testimonials
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 font-display">
              Trusted by Serious Investors
            </h2>
            <p className="text-muted-foreground text-lg">
              See what our community has to say
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <Card
                key={t.name}
                className="p-8 rounded-xl border-border/50 hover:shadow-lg transition-all duration-300 relative"
              >
                {/* Quote mark */}
                <div className="absolute top-6 right-6 text-6xl font-display text-primary/10 leading-none select-none">
                  &ldquo;
                </div>

                <div className="flex gap-1 mb-5">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-muted-foreground leading-relaxed mb-6 relative z-10">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-4 pt-4 border-t border-border/50">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="h-12 w-12 rounded-full object-cover ring-2 ring-primary/10"
                  />
                  <div>
                    <p className="font-semibold text-foreground">{t.name}</p>
                    <p className="text-sm text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Section divider */}
      <div className="section-divider" />

      {/* ===== SOCIAL PROOF METRICS ===== */}
      <section className="py-20 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                icon: Shield,
                value: "94%",
                label: "Accuracy Rate",
              },
              {
                icon: Users,
                value: "500+",
                label: "Active Investors",
              },
              {
                icon: Building2,
                value: "12K+",
                label: "Deals Analyzed",
              },
              {
                icon: TrendingUp,
                value: "22%",
                label: "Avg. ROI",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="text-center p-6 rounded-xl bg-white border border-border/50"
              >
                <div className="mx-auto w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <p
                  className="text-2xl md:text-3xl font-bold text-primary tabular-nums font-display"
                  style={{ fontFeatureSettings: '"tnum"' }}
                >
                  {item.value}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section divider */}
      <div className="section-divider" />

      {/* ===== NEWSLETTER (Multi-step Typeform) ===== */}
      <section className="py-24 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <Badge variant="secondary" className="mb-4">
              Stay Ahead
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3 font-display">
              Get Exclusive Deal Insights
            </h2>
            <p className="text-muted-foreground">
              Join our investor community for weekly market updates and hot
              deals.
            </p>
          </div>

          <TypeformNewsletter />
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="py-24 bg-gradient-to-br from-primary-800 via-primary to-secondary relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-display leading-tight">
            Start Finding Profitable Deals Today
          </h2>
          <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Join 500+ investors using AI to make smarter real estate decisions.
            Free plan available.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button
                size="xl"
                variant="accent"
                className="w-full sm:w-auto shadow-lg shadow-accent/25"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/pricing">
              <Button
                size="xl"
                variant="outline"
                className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10 hover:text-white"
              >
                View Pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Disclaimer />
      </section>

      <Footer />
    </div>
  );
}

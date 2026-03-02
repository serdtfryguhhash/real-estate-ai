"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DealScore } from "@/components/shared/deal-score";
import { Disclaimer } from "@/components/shared/disclaimer";
import { formatCurrency, formatPercent, formatRelativeDate, generateId } from "@/lib/utils";
import {
  Users,
  ThumbsUp,
  MessageSquare,
  Star,
  Trophy,
  MapPin,
  TrendingUp,
  DollarSign,
  Eye,
  Crown,
} from "lucide-react";

const COMMUNITY_KEY = "community_deals";

interface CommunityDeal {
  id: string;
  userId: string;
  userName: string;
  userLevel: string;
  address: string;
  city: string;
  state: string;
  price: number;
  dealScore: number;
  capRate: number;
  cashOnCash: number;
  monthlyCashFlow: number;
  notes: string;
  upvotes: number;
  hasUpvoted: boolean;
  views: number;
  featured: boolean;
  sharedAt: string;
}

const seedDeals: CommunityDeal[] = [
  {
    id: "cd-1",
    userId: "u-1",
    userName: "Sarah Mitchell",
    userLevel: "Mogul",
    address: "1247 Maple Grove Drive",
    city: "Austin",
    state: "TX",
    price: 285000,
    dealScore: 78,
    capRate: 8.2,
    cashOnCash: 12.5,
    monthlyCashFlow: 620,
    notes: "Incredible cash flow opportunity. Seller motivated after 47 days. I negotiated $25K below asking. Kitchen needs cosmetic updates only — $8K rehab budget. Neighborhood is appreciating 3%+ annually.",
    upvotes: 34,
    hasUpvoted: false,
    views: 187,
    featured: true,
    sharedAt: "2026-02-28T14:30:00Z",
  },
  {
    id: "cd-2",
    userId: "u-2",
    userName: "Marcus Johnson",
    userLevel: "Analyst",
    address: "892 Oakmont Boulevard",
    city: "Tampa",
    state: "FL",
    price: 425000,
    dealScore: 72,
    capRate: 6.8,
    cashOnCash: 9.3,
    monthlyCashFlow: 480,
    notes: "Solid rental in A-class neighborhood. Strong school ratings (8/10) drive premium rents. HOA is reasonable at $75/mo. Insurance costs are manageable for Florida.",
    upvotes: 22,
    hasUpvoted: false,
    views: 134,
    featured: false,
    sharedAt: "2026-02-27T09:15:00Z",
  },
  {
    id: "cd-3",
    userId: "u-3",
    userName: "Elena Rodriguez",
    userLevel: "Tycoon",
    address: "3456 Industrial Park Way",
    city: "Denver",
    state: "CO",
    price: 175000,
    dealScore: 82,
    capRate: 9.1,
    cashOnCash: 14.2,
    monthlyCashFlow: 890,
    notes: "Commercial flex space near new Amazon distribution center. Triple net lease opportunity. Tenant pays all expenses. Cap rate above 9% is rare in Denver right now. Long-term hold.",
    upvotes: 41,
    hasUpvoted: false,
    views: 256,
    featured: false,
    sharedAt: "2026-02-26T16:45:00Z",
  },
  {
    id: "cd-4",
    userId: "u-4",
    userName: "David Park",
    userLevel: "Investor",
    address: "567 Riverside Terrace",
    city: "Charlotte",
    state: "NC",
    price: 320000,
    dealScore: 68,
    capRate: 7.1,
    cashOnCash: 10.8,
    monthlyCashFlow: 540,
    notes: "Duplex near UNC Charlotte. Both units rented at market rate. One lease renewing in 3 months — opportunity to push rent $100/unit. Low maintenance brick construction.",
    upvotes: 15,
    hasUpvoted: false,
    views: 89,
    featured: false,
    sharedAt: "2026-02-25T11:20:00Z",
  },
  {
    id: "cd-5",
    userId: "u-5",
    userName: "Jennifer Wu",
    userLevel: "Mogul",
    address: "2100 Magnolia Lane",
    city: "San Antonio",
    state: "TX",
    price: 215000,
    dealScore: 75,
    capRate: 8.5,
    cashOnCash: 11.9,
    monthlyCashFlow: 710,
    notes: "Military base proximity ensures stable rental demand. No state income tax advantage. Property needs minor cosmetic work — $5K budget. Already have a tenant application at $1,650/mo.",
    upvotes: 28,
    hasUpvoted: false,
    views: 145,
    featured: false,
    sharedAt: "2026-02-24T08:00:00Z",
  },
];

function getCommunityDeals(): CommunityDeal[] {
  if (typeof window === "undefined") return seedDeals;
  const stored = localStorage.getItem(COMMUNITY_KEY);
  if (!stored) {
    localStorage.setItem(COMMUNITY_KEY, JSON.stringify(seedDeals));
    return seedDeals;
  }
  try {
    return JSON.parse(stored);
  } catch {
    return seedDeals;
  }
}

function saveCommunityDeals(deals: CommunityDeal[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(COMMUNITY_KEY, JSON.stringify(deals));
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

function getLevelColor(level: string): string {
  switch (level) {
    case "Tycoon": return "text-accent";
    case "Mogul": return "text-yellow-600";
    case "Analyst": return "text-purple-600";
    case "Investor": return "text-blue-600";
    default: return "text-muted-foreground";
  }
}

export default function CommunityPage() {
  const [deals, setDeals] = useState<CommunityDeal[]>([]);
  const [sortBy, setSortBy] = useState<"upvotes" | "score" | "recent">("upvotes");

  useEffect(() => {
    setDeals(getCommunityDeals());
  }, []);

  const handleUpvote = (dealId: string) => {
    const updated = deals.map((d) => {
      if (d.id === dealId) {
        return {
          ...d,
          upvotes: d.hasUpvoted ? d.upvotes - 1 : d.upvotes + 1,
          hasUpvoted: !d.hasUpvoted,
        };
      }
      return d;
    });
    setDeals(updated);
    saveCommunityDeals(updated);
  };

  const sorted = [...deals].sort((a, b) => {
    switch (sortBy) {
      case "score": return b.dealScore - a.dealScore;
      case "recent": return new Date(b.sharedAt).getTime() - new Date(a.sharedAt).getTime();
      default: return b.upvotes - a.upvotes;
    }
  });

  const featuredDeal = deals.find((d) => d.featured);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Users className="h-6 w-6 text-primary" />
              Community Deals
            </h1>
            <p className="text-muted-foreground">Shared deal analyses from fellow investors</p>
          </div>
          <div className="flex gap-2">
            {(["upvotes", "score", "recent"] as const).map((s) => (
              <Button
                key={s}
                variant={sortBy === s ? "default" : "outline"}
                size="sm"
                onClick={() => setSortBy(s)}
              >
                {s === "upvotes" ? "Top" : s === "score" ? "Best Score" : "Recent"}
              </Button>
            ))}
          </div>
        </div>

        {/* Deal of the Week */}
        {featuredDeal && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const }}
            className="mb-8"
          >
            <Card className="border-2 border-yellow-300 bg-gradient-to-r from-yellow-50 to-orange-50 overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Crown className="h-5 w-5 text-yellow-600" />
                  <span className="text-sm font-bold text-yellow-700">Deal of the Week</span>
                  <Badge className="bg-yellow-100 text-yellow-700 border-yellow-300 text-[10px]">Featured</Badge>
                </div>
                <div className="flex items-start gap-4">
                  <DealScore score={featuredDeal.dealScore} size="md" />
                  <div className="flex-1">
                    <h3 className="text-lg font-bold">{featuredDeal.address}</h3>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" />
                      {featuredDeal.city}, {featuredDeal.state}
                    </p>
                    <div className="grid grid-cols-4 gap-3 mt-3">
                      <div>
                        <p className="text-xs text-muted-foreground">Price</p>
                        <p className="text-sm font-bold tabular-nums">{formatCurrency(featuredDeal.price)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Cap Rate</p>
                        <p className="text-sm font-bold tabular-nums text-secondary">{formatPercent(featuredDeal.capRate)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Cash-on-Cash</p>
                        <p className="text-sm font-bold tabular-nums text-primary">{formatPercent(featuredDeal.cashOnCash)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Cash Flow</p>
                        <p className="text-sm font-bold tabular-nums text-accent">{formatCurrency(featuredDeal.monthlyCashFlow)}/mo</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{featuredDeal.notes}</p>
                    <div className="flex items-center gap-4 mt-3">
                      <div className="flex items-center gap-1.5 text-sm">
                        <span className={`font-medium ${getLevelColor(featuredDeal.userLevel)}`}>{featuredDeal.userName}</span>
                        <Badge variant="outline" className="text-[10px]">{featuredDeal.userLevel}</Badge>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <ThumbsUp className="h-3 w-3" /> {featuredDeal.upvotes}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Eye className="h-3 w-3" /> {featuredDeal.views}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Deal List */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 gap-4 mb-8"
        >
          {sorted.filter((d) => !d.featured).map((deal) => (
            <motion.div key={deal.id} variants={itemVariants}>
              <Card className="hover:shadow-md transition-all">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <DealScore score={deal.dealScore} size="sm" showLabel={false} />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold">{deal.address}</h3>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {deal.city}, {deal.state}
                      </p>
                    </div>
                    <p className="text-sm font-bold tabular-nums text-primary">{formatCurrency(deal.price)}</p>
                  </div>

                  <div className="grid grid-cols-3 gap-2 mt-3">
                    <div className="bg-muted/50 rounded p-2 text-center">
                      <p className="text-[10px] text-muted-foreground">Cap Rate</p>
                      <p className="text-xs font-bold tabular-nums text-secondary">{formatPercent(deal.capRate)}</p>
                    </div>
                    <div className="bg-muted/50 rounded p-2 text-center">
                      <p className="text-[10px] text-muted-foreground">CoC Return</p>
                      <p className="text-xs font-bold tabular-nums text-primary">{formatPercent(deal.cashOnCash)}</p>
                    </div>
                    <div className="bg-muted/50 rounded p-2 text-center">
                      <p className="text-[10px] text-muted-foreground">Cash Flow</p>
                      <p className="text-xs font-bold tabular-nums text-accent">{formatCurrency(deal.monthlyCashFlow)}/mo</p>
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground mt-3 line-clamp-2 leading-relaxed">{deal.notes}</p>

                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/50">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-medium ${getLevelColor(deal.userLevel)}`}>{deal.userName}</span>
                      <Badge variant="outline" className="text-[10px]">{deal.userLevel}</Badge>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] text-muted-foreground">{formatRelativeDate(deal.sharedAt)}</span>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Eye className="h-3 w-3" /> {deal.views}
                      </div>
                      <Button
                        variant={deal.hasUpvoted ? "default" : "outline"}
                        size="sm"
                        className="h-7 text-xs"
                        onClick={() => handleUpvote(deal.id)}
                      >
                        <ThumbsUp className={`h-3 w-3 mr-1 ${deal.hasUpvoted ? "" : ""}`} />
                        {deal.upvotes}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <Disclaimer />
      </main>

      <Footer />
    </div>
  );
}

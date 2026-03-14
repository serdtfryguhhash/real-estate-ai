"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Activity,
  TrendingUp,
  TrendingDown,
  Minus,
  Home,
  DollarSign,
  Percent,
  Zap,
  RefreshCw,
  MapPin,
  Loader2,
} from "lucide-react";

interface MarketPulseData {
  date: string;
  summary: string;
  newListings: { count: number; highlight: string };
  priceTrends: { direction: string; percentChange: number; insight: string };
  rateImpact: { currentRate: number; impact: string };
  opportunities: { area: string; reason: string; urgency: string }[];
  actionItem: string;
}

// Fallback mock data
const mockPulse: MarketPulseData = {
  date: new Date().toISOString().split("T")[0],
  summary: "Markets showing mixed signals with Austin seeing 3.2% MoM price increases while Tampa inventory builds. Strong buyer opportunities emerging in suburban neighborhoods.",
  newListings: { count: 47, highlight: "3BR/2BA in Maple Grove listed 12% below comps at $285K - potential cash flow play" },
  priceTrends: { direction: "up", percentChange: 2.8, insight: "Median prices up across target areas, driven by low inventory in desirable school districts" },
  rateImpact: { currentRate: 6.75, impact: "Rates stable this week. Current rate environment favors negotiating seller concessions for rate buydowns over price reductions." },
  opportunities: [
    { area: "Maple Grove, Austin", reason: "New employer relocations driving rental demand, 3 distressed sales this week", urgency: "high" },
    { area: "Westshore, Tampa", reason: "Condo inventory building, negotiation power increasing for patient buyers", urgency: "medium" },
    { area: "Cherry Creek, Denver", reason: "Seasonal listing surge creating more selection, prices softening 1.5%", urgency: "low" },
  ],
  actionItem: "Review the 3 distressed listings in Maple Grove. Motivated sellers with 60+ days on market may accept 8-10% below asking.",
};

export function MarketPulse() {
  const [pulse, setPulse] = useState<MarketPulseData>(mockPulse);
  const [loading, setLoading] = useState(false);
  const [isLive, setIsLive] = useState(false);

  const fetchPulse = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/ai/market-pulse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetAreas: ["Austin, TX", "Tampa, FL", "Denver, CO"] }),
      });
      const data = await res.json();
      if (data.success && data.response) {
        try {
          const cleaned = data.response.replace(/```json\n?|\n?```/g, "").trim();
          const parsed = JSON.parse(cleaned);
          setPulse(parsed);
          setIsLive(true);
        } catch {
          // Keep mock data on parse failure
        }
      }
    } catch {
      // Keep mock data on fetch failure
    }
    setLoading(false);
  };

  const getTrendIcon = (direction: string) => {
    if (direction === "up") return <TrendingUp className="h-4 w-4 text-accent" />;
    if (direction === "down") return <TrendingDown className="h-4 w-4 text-destructive" />;
    return <Minus className="h-4 w-4 text-muted-foreground" />;
  };

  const getUrgencyBadge = (urgency: string) => {
    switch (urgency) {
      case "high":
        return <Badge variant="destructive" className="text-[10px]">High</Badge>;
      case "medium":
        return <Badge variant="warning" className="text-[10px]">Medium</Badge>;
      default:
        return <Badge variant="secondary" className="text-[10px]">Low</Badge>;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const }}
    >
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Daily Market Pulse
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant={isLive ? "success" : "secondary"} className="text-[10px]">
                {isLive ? "AI Live" : "Sample Data"}
              </Badge>
              <Button variant="ghost" size="sm" onClick={fetchPulse} disabled={loading}>
                {loading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <RefreshCw className="h-3.5 w-3.5" />}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Summary */}
          <p className="text-sm text-muted-foreground leading-relaxed">{pulse.summary}</p>

          {/* Metrics Row */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-muted/50 rounded-lg p-3 text-center">
              <Home className="h-4 w-4 text-primary mx-auto mb-1" />
              <p className="text-lg font-bold tabular-nums">{pulse.newListings.count}</p>
              <p className="text-[10px] text-muted-foreground">New Listings</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-3 text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                {getTrendIcon(pulse.priceTrends.direction)}
              </div>
              <p className="text-lg font-bold tabular-nums">
                {pulse.priceTrends.direction === "down" ? "-" : "+"}{pulse.priceTrends.percentChange}%
              </p>
              <p className="text-[10px] text-muted-foreground">Price Trend</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-3 text-center">
              <Percent className="h-4 w-4 text-secondary mx-auto mb-1" />
              <p className="text-lg font-bold tabular-nums">{pulse.rateImpact.currentRate}%</p>
              <p className="text-[10px] text-muted-foreground">Avg Rate</p>
            </div>
          </div>

          {/* Opportunities */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
              Neighborhood Opportunities
            </h4>
            <div className="space-y-2">
              {pulse.opportunities.map((opp, i) => (
                <div key={i} className="flex items-start gap-2 bg-muted/30 rounded-lg p-2.5">
                  <MapPin className="h-3.5 w-3.5 text-primary mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium">{opp.area}</span>
                      {getUrgencyBadge(opp.urgency)}
                    </div>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{opp.reason}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Item */}
          <div className="bg-primary/5 border border-primary/10 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <Zap className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs font-semibold text-primary">Today&apos;s Action Item</p>
                <p className="text-xs text-muted-foreground mt-0.5">{pulse.actionItem}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  FileText,
  TrendingUp,
  TrendingDown,
  Minus,
  Target,
  BarChart3,
  CheckCircle2,
  RefreshCw,
  Loader2,
  Lightbulb,
  Star,
} from "lucide-react";

interface WeeklyReportData {
  weekOf: string;
  headline: string;
  dealsAnalyzed: {
    count: number;
    topDeal: { address: string; score: number; why: string };
    avgScore: number;
  };
  marketTrends: { trend: string; impact: string }[];
  portfolioPerformance: {
    valueChange: number;
    cashFlowTrend: string;
    insight: string;
  };
  bestOpportunities: { description: string; potentialReturn: string }[];
  nextSteps: string[];
}

const mockReport: WeeklyReportData = {
  weekOf: "Feb 24 - Mar 1, 2026",
  headline: "Strong week with 6 deals analyzed. Austin market heating up with 3 properties scoring 70+.",
  dealsAnalyzed: {
    count: 6,
    topDeal: { address: "1247 Maple Grove Drive, Austin", score: 78, why: "8.2% cap rate with $285K entry, 47 DOM creates negotiation leverage" },
    avgScore: 64,
  },
  marketTrends: [
    { trend: "Austin median price up 3.2% month-over-month", impact: "positive" },
    { trend: "Mortgage rates held steady at 6.75%", impact: "neutral" },
    { trend: "Tampa condo inventory up 15% — buyer leverage increasing", impact: "positive" },
    { trend: "Denver seeing seasonal spring listing surge", impact: "neutral" },
  ],
  portfolioPerformance: {
    valueChange: 18500,
    cashFlowTrend: "up",
    insight: "Portfolio value up $18.5K this week driven by Austin appreciation. Cash flow stable at $3,200/mo.",
  },
  bestOpportunities: [
    { description: "Distressed 3BR in Maple Grove — seller motivated, 60+ DOM", potentialReturn: "12-15% CoC" },
    { description: "Multi-family duplex in Tampa near university", potentialReturn: "9-11% cap rate" },
  ],
  nextSteps: [
    "Submit offer on 1247 Maple Grove (recommend $270K starting point)",
    "Schedule inspection for Harbor View Drive closing",
    "Review Tampa duplex listing hitting market Thursday",
  ],
};

export function WeeklyReport() {
  const [report, setReport] = useState<WeeklyReportData>(mockReport);
  const [loading, setLoading] = useState(false);
  const [isLive, setIsLive] = useState(false);

  const fetchReport = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/ai/weekly-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          dealsAnalyzed: 6,
          portfolioValue: 1500000,
          cashFlow: 3200,
        }),
      });
      const data = await res.json();
      if (data.success && data.response) {
        try {
          const cleaned = data.response.replace(/```json\n?|\n?```/g, "").trim();
          const parsed = JSON.parse(cleaned);
          setReport(parsed);
          setIsLive(true);
        } catch {
          // Keep mock data
        }
      }
    } catch {
      // Keep mock data
    }
    setLoading(false);
  };

  const getImpactIcon = (impact: string) => {
    if (impact === "positive") return <TrendingUp className="h-3 w-3 text-accent" />;
    if (impact === "negative") return <TrendingDown className="h-3 w-3 text-destructive" />;
    return <Minus className="h-3 w-3 text-muted-foreground" />;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] as const }}
    >
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Weekly Report
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant={isLive ? "success" : "outline"} className="text-[10px]">
                {report.weekOf}
              </Badge>
              <Button variant="ghost" size="sm" onClick={fetchReport} disabled={loading}>
                {loading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <RefreshCw className="h-3.5 w-3.5" />}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Headline */}
          <p className="text-sm text-muted-foreground leading-relaxed">{report.headline}</p>

          {/* Top Deal */}
          <div className="bg-accent/5 border border-accent/10 rounded-lg p-3">
            <div className="flex items-center gap-1.5 mb-1.5">
              <Star className="h-3.5 w-3.5 text-accent" />
              <span className="text-xs font-semibold text-accent">Top Deal This Week</span>
            </div>
            <p className="text-sm font-medium">{report.dealsAnalyzed.topDeal.address}</p>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="accent" className="text-[10px]">Score: {report.dealsAnalyzed.topDeal.score}</Badge>
              <span className="text-[11px] text-muted-foreground">{report.dealsAnalyzed.topDeal.why}</span>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-muted/50 rounded-lg p-2.5 text-center">
              <p className="text-lg font-bold tabular-nums">{report.dealsAnalyzed.count}</p>
              <p className="text-[10px] text-muted-foreground">Deals Analyzed</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-2.5 text-center">
              <p className="text-lg font-bold tabular-nums">{report.dealsAnalyzed.avgScore}</p>
              <p className="text-[10px] text-muted-foreground">Avg Score</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-2.5 text-center">
              <p className={`text-lg font-bold tabular-nums ${report.portfolioPerformance.valueChange >= 0 ? "text-accent" : "text-destructive"}`}>
                {report.portfolioPerformance.valueChange >= 0 ? "+" : ""}${(report.portfolioPerformance.valueChange / 1000).toFixed(1)}K
              </p>
              <p className="text-[10px] text-muted-foreground">Value Change</p>
            </div>
          </div>

          {/* Market Trends */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2 flex items-center gap-1">
              <BarChart3 className="h-3 w-3" />
              Market Trends
            </h4>
            <div className="space-y-1.5">
              {report.marketTrends.map((t, i) => (
                <div key={i} className="flex items-center gap-2 text-xs">
                  {getImpactIcon(t.impact)}
                  <span className="text-muted-foreground">{t.trend}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Next Steps */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2 flex items-center gap-1">
              <Lightbulb className="h-3 w-3" />
              Recommended Next Steps
            </h4>
            <div className="space-y-1.5">
              {report.nextSteps.map((step, i) => (
                <div key={i} className="flex items-start gap-2 text-xs">
                  <CheckCircle2 className="h-3.5 w-3.5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

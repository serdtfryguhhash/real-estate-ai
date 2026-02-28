"use client";

import React from "react";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "@/components/shared/stat-card";
import { DealScore } from "@/components/shared/deal-score";
import { PropertyCard } from "@/components/shared/property-card";
import { Disclaimer } from "@/components/shared/disclaimer";
import { dealAnalyses, savedDeals, dealAlerts, properties } from "@/data/properties";
import { formatCurrency, formatPercent, getStageColor, formatRelativeDate } from "@/lib/utils";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  BarChart3,
  Briefcase,
  Bell,
  ArrowRight,
  Eye,
  Target,
  PieChart,
  Activity,
  Home,
  MapPin,
  Clock,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
} from "recharts";

const marketData = [
  { month: "Sep", deals: 42, avgScore: 58 },
  { month: "Oct", deals: 38, avgScore: 61 },
  { month: "Nov", deals: 55, avgScore: 63 },
  { month: "Dec", deals: 47, avgScore: 59 },
  { month: "Jan", deals: 62, avgScore: 65 },
  { month: "Feb", deals: 71, avgScore: 67 },
];

const portfolioByStage = [
  { name: "Watching", value: 2, color: "#3B82F6" },
  { name: "Analyzing", value: 1, color: "#8B5CF6" },
  { name: "Offer", value: 1, color: "#F59E0B" },
  { name: "Contract", value: 1, color: "#F97316" },
  { name: "Closed", value: 1, color: "#10B981" },
];

const recentActivity = [
  { action: "New deal match", detail: "Austin Cash Flow Deals alert — 3 new matches", time: "2 hours ago", icon: Bell },
  { action: "Deal score updated", detail: "1247 Maple Grove Drive score changed: 72 → 75", time: "5 hours ago", icon: TrendingUp },
  { action: "Offer submitted", detail: "$175,000 offer on 3456 Industrial Park Way", time: "1 day ago", icon: Target },
  { action: "Under contract", detail: "1550 Harbor View Drive — closing March 15", time: "2 days ago", icon: Home },
  { action: "Market update", detail: "Austin median price up 3.2% month-over-month", time: "3 days ago", icon: Activity },
];

export default function DashboardPage() {
  const topDeals = dealAnalyses.sort((a, b) => b.dealScore - a.dealScore).slice(0, 4);
  const activeAlerts = dealAlerts.filter((a) => a.active);
  const totalAlertMatches = dealAlerts.reduce((sum, a) => sum + a.matchCount, 0);

  const portfolioValue = savedDeals.reduce((sum, d) => sum + d.property.price, 0);
  const avgCashFlow = savedDeals.reduce((sum, d) => sum + d.analysis.monthlyCashFlow, 0) / savedDeals.length;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">Welcome back, John</h1>
          <p className="text-muted-foreground">Here is your real estate investment overview for today.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="Portfolio Value"
            value={formatCurrency(portfolioValue)}
            change="+12.3% this month"
            changeType="positive"
            icon={DollarSign}
            iconColor="bg-accent"
          />
          <StatCard
            title="Active Deals"
            value={savedDeals.length.toString()}
            subtitle={`${savedDeals.filter(d => d.stage === "contract").length} under contract`}
            icon={Briefcase}
            iconColor="bg-secondary"
          />
          <StatCard
            title="Avg. Cash Flow"
            value={`${formatCurrency(avgCashFlow)}/mo`}
            change="+$120 vs last month"
            changeType="positive"
            icon={TrendingUp}
            iconColor="bg-primary"
          />
          <StatCard
            title="Alert Matches"
            value={totalAlertMatches.toString()}
            subtitle={`${activeAlerts.length} active alerts`}
            icon={Bell}
            iconColor="bg-purple-500"
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Market Trend Chart */}
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base font-semibold">Deal Flow & Scores (6 Month)</CardTitle>
              <Badge variant="secondary">Updated hourly</Badge>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={marketData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#94A3B8" />
                    <YAxis yAxisId="left" tick={{ fontSize: 12 }} stroke="#94A3B8" />
                    <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} stroke="#94A3B8" />
                    <Tooltip
                      contentStyle={{ borderRadius: "0.5rem", border: "1px solid #E2E8F0", fontSize: "0.875rem" }}
                    />
                    <Bar yAxisId="left" dataKey="deals" fill="#1E3A5F" radius={[4, 4, 0, 0]} name="Deals Found" />
                    <Line yAxisId="right" type="monotone" dataKey="avgScore" stroke="#10B981" strokeWidth={2} dot={{ fill: "#10B981" }} name="Avg Score" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Portfolio Breakdown */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold">Pipeline Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={portfolioByStage}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={75}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {portfolioByStage.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ borderRadius: "0.5rem", border: "1px solid #E2E8F0", fontSize: "0.875rem" }}
                    />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2 mt-2">
                {portfolioByStage.map((item) => (
                  <div key={item.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-muted-foreground">{item.name}</span>
                    </div>
                    <span className="font-medium tabular-nums">{item.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Top Deals */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Top Deals Today</h2>
              <Link href="/deals">
                <Button variant="ghost" size="sm">
                  View All <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {topDeals.slice(0, 4).map((analysis) => (
                <PropertyCard key={analysis.id} analysis={analysis} compact />
              ))}
            </div>
          </div>

          {/* Activity Feed */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
            <Card>
              <CardContent className="p-0">
                <div className="divide-y divide-border">
                  {recentActivity.map((item, i) => (
                    <div key={i} className="p-4 hover:bg-muted/50 transition-colors">
                      <div className="flex gap-3">
                        <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <item.icon className="h-4 w-4 text-primary" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-foreground">{item.action}</p>
                          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{item.detail}</p>
                          <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {item.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Active Alerts Summary */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Active Deal Alerts</h2>
            <Link href="/alerts">
              <Button variant="ghost" size="sm">
                Manage Alerts <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {dealAlerts.map((alert) => (
              <Card key={alert.id} className={`p-4 ${!alert.active ? "opacity-60" : ""}`}>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium text-sm">{alert.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatCurrency(alert.minPrice)} - {formatCurrency(alert.maxPrice)}
                    </p>
                  </div>
                  <Badge variant={alert.active ? "success" : "outline"}>
                    {alert.active ? "Active" : "Paused"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                  <span className="text-xs text-muted-foreground">{alert.matchCount} matches</span>
                  <span className="text-xs text-muted-foreground capitalize">{alert.frequency}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <Disclaimer />
      </main>

      <Footer />
    </div>
  );
}

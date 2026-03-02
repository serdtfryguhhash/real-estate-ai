"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DealScore } from "@/components/shared/deal-score";
import { Disclaimer } from "@/components/shared/disclaimer";
import { PortfolioAnalytics } from "@/components/features/portfolio-analytics";
import { NeighborhoodWatch } from "@/components/features/neighborhood-watch";
import { ShareCard } from "@/components/shared/ShareCard";
import { savedDeals } from "@/data/properties";
import { formatCurrency, formatPercent, getStageColor, formatDate } from "@/lib/utils";
import { SavedDeal } from "@/types";
import {
  Briefcase, Eye, BarChart3, FileText, Handshake, CheckCircle,
  MapPin,
  Plus, StickyNote, Calendar,
} from "lucide-react";

const stages = [
  { key: "watching", label: "Watching", icon: Eye, color: "bg-blue-500" },
  { key: "analyzing", label: "Analyzing", icon: BarChart3, color: "bg-purple-500" },
  { key: "offer", label: "Offer", icon: FileText, color: "bg-yellow-500" },
  { key: "contract", label: "Contract", icon: Handshake, color: "bg-orange-500" },
  { key: "closed", label: "Closed", icon: CheckCircle, color: "bg-green-500" },
] as const;

function PipelineCard({ deal }: { deal: SavedDeal }) {
  return (
    <Link href={`/deals/${deal.propertyId}`}>
      <Card className="p-3 hover:shadow-md transition-all cursor-pointer group border-border/50 hover:border-primary/30">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate group-hover:text-primary transition-colors">
              {deal.property.address}
            </p>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {deal.property.city}, {deal.property.state}
            </p>
          </div>
          <DealScore score={deal.analysis.dealScore} size="sm" showLabel={false} />
        </div>

        <div className="text-lg font-bold text-primary tabular-nums mb-2" style={{ fontFeatureSettings: '"tnum"' }}>
          {formatCurrency(deal.property.price)}
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs mb-2">
          <div>
            <span className="text-muted-foreground">Cap Rate</span>
            <p className="font-semibold text-secondary tabular-nums">{formatPercent(deal.analysis.capRate)}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Cash Flow</span>
            <p className={`font-semibold tabular-nums ${deal.analysis.monthlyCashFlow >= 0 ? "text-accent" : "text-destructive"}`}>
              {formatCurrency(deal.analysis.monthlyCashFlow)}/mo
            </p>
          </div>
        </div>

        {deal.offerAmount && (
          <div className="bg-muted/50 rounded p-2 text-xs mb-2">
            <span className="text-muted-foreground">Offer: </span>
            <span className="font-semibold tabular-nums">{formatCurrency(deal.offerAmount)}</span>
          </div>
        )}

        {deal.closingDate && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
            <Calendar className="h-3 w-3" />
            <span>Closing: {formatDate(deal.closingDate)}</span>
          </div>
        )}

        {deal.notes && (
          <div className="flex items-start gap-1.5 text-xs text-muted-foreground bg-yellow-50 rounded p-2">
            <StickyNote className="h-3 w-3 mt-0.5 text-yellow-600 flex-shrink-0" />
            <p className="line-clamp-2">{deal.notes}</p>
          </div>
        )}

        <div className="text-xs text-muted-foreground mt-2 pt-2 border-t border-border/50">
          Updated {formatDate(deal.updatedAt)}
        </div>
      </Card>
    </Link>
  );
}

export default function PortfolioPage() {
  const [deals] = useState<SavedDeal[]>(savedDeals);
  const [view, setView] = useState<"kanban" | "list">("kanban");

  const dealsByStage = stages.reduce((acc, stage) => {
    acc[stage.key] = deals.filter((d) => d.stage === stage.key);
    return acc;
  }, {} as Record<string, SavedDeal[]>);

  const portfolioValue = deals.reduce((sum, d) => sum + d.property.price, 0);
  const totalCashFlow = deals.reduce((sum, d) => sum + d.analysis.monthlyCashFlow, 0);
  const closedDeals = deals.filter((d) => d.stage === "closed");
  const activeDeals = deals.filter((d) => d.stage !== "closed" && d.stage !== "watching");

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Briefcase className="h-6 w-6 text-primary" />
              Portfolio Tracker
            </h1>
            <p className="text-muted-foreground">Track your deals from watching to closing</p>
          </div>
          <div className="flex items-center gap-2">
            <Tabs value={view} onValueChange={(v) => setView(v as "kanban" | "list")}>
              <TabsList>
                <TabsTrigger value="kanban">Kanban</TabsTrigger>
                <TabsTrigger value="list">List</TabsTrigger>
              </TabsList>
            </Tabs>
            <Link href="/deals">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Deal
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card className="p-4">
            <p className="text-xs text-muted-foreground">Portfolio Value</p>
            <p className="text-xl font-bold text-primary tabular-nums" style={{ fontFeatureSettings: '"tnum"' }}>
              {formatCurrency(portfolioValue)}
            </p>
          </Card>
          <Card className="p-4">
            <p className="text-xs text-muted-foreground">Total Cash Flow</p>
            <p className="text-xl font-bold text-accent tabular-nums" style={{ fontFeatureSettings: '"tnum"' }}>
              {formatCurrency(totalCashFlow)}/mo
            </p>
          </Card>
          <Card className="p-4">
            <p className="text-xs text-muted-foreground">Active Deals</p>
            <p className="text-xl font-bold text-secondary">{activeDeals.length}</p>
          </Card>
          <Card className="p-4">
            <p className="text-xs text-muted-foreground">Closed Deals</p>
            <p className="text-xl font-bold text-green-600">{closedDeals.length}</p>
          </Card>
        </div>

        {/* Portfolio Analytics */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Portfolio Analytics</h2>
          <PortfolioAnalytics />
        </div>

        {view === "kanban" ? (
          /* Kanban Board */
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
            {stages.map((stage) => (
              <div key={stage.key} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`h-2.5 w-2.5 rounded-full ${stage.color}`} />
                    <h3 className="text-sm font-semibold">{stage.label}</h3>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {dealsByStage[stage.key]?.length || 0}
                  </Badge>
                </div>
                <div className="space-y-3 kanban-column min-h-[200px] bg-muted/30 rounded-lg p-2">
                  {dealsByStage[stage.key]?.map((deal) => (
                    <PipelineCard key={deal.id} deal={deal} />
                  ))}
                  {(!dealsByStage[stage.key] || dealsByStage[stage.key].length === 0) && (
                    <div className="flex items-center justify-center h-32 text-sm text-muted-foreground border-2 border-dashed border-border rounded-lg">
                      No deals
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* List View */
          <Card className="mb-8">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Property</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Stage</th>
                      <th className="text-right py-3 px-4 font-medium text-muted-foreground">Price</th>
                      <th className="text-right py-3 px-4 font-medium text-muted-foreground">Score</th>
                      <th className="text-right py-3 px-4 font-medium text-muted-foreground">Cap Rate</th>
                      <th className="text-right py-3 px-4 font-medium text-muted-foreground">Cash Flow</th>
                      <th className="text-right py-3 px-4 font-medium text-muted-foreground">Offer</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {deals.map((deal) => (
                      <tr key={deal.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                        <td className="py-3 px-4">
                          <Link href={`/deals/${deal.propertyId}`} className="hover:text-primary transition-colors">
                            <p className="font-medium">{deal.property.address}</p>
                            <p className="text-xs text-muted-foreground">{deal.property.city}, {deal.property.state}</p>
                          </Link>
                        </td>
                        <td className="py-3 px-4">
                          <Badge className={getStageColor(deal.stage)}>
                            {deal.stage.charAt(0).toUpperCase() + deal.stage.slice(1)}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-right tabular-nums font-medium">{formatCurrency(deal.property.price)}</td>
                        <td className="py-3 px-4 text-right">
                          <DealScore score={deal.analysis.dealScore} size="sm" showLabel={false} />
                        </td>
                        <td className="py-3 px-4 text-right tabular-nums">{formatPercent(deal.analysis.capRate)}</td>
                        <td className={`py-3 px-4 text-right tabular-nums font-medium ${deal.analysis.monthlyCashFlow >= 0 ? "text-accent" : "text-destructive"}`}>
                          {formatCurrency(deal.analysis.monthlyCashFlow)}/mo
                        </td>
                        <td className="py-3 px-4 text-right tabular-nums">
                          {deal.offerAmount ? formatCurrency(deal.offerAmount) : "—"}
                        </td>
                        <td className="py-3 px-4 max-w-[200px]">
                          <p className="text-xs text-muted-foreground truncate">{deal.notes || "—"}</p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Neighborhood Watch & Share Card */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <NeighborhoodWatch />
          <ShareCard />
        </div>

        <Disclaimer />
      </main>

      <Footer />
    </div>
  );
}

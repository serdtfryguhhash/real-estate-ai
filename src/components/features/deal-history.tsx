"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DealScore } from "@/components/shared/deal-score";
import { dealAnalyses } from "@/data/properties";
import { formatCurrency, formatPercent, formatDate, generateId } from "@/lib/utils";
import {
  Search,
  History,
  ArrowUpDown,
  GitCompareArrows,
  X,
  MapPin,
  TrendingUp,
  DollarSign,
} from "lucide-react";

const DEAL_HISTORY_KEY = "deal_history";

interface DealHistoryEntry {
  id: string;
  propertyId: string;
  address: string;
  city: string;
  state: string;
  price: number;
  dealScore: number;
  capRate: number;
  cashOnCash: number;
  monthlyCashFlow: number;
  roi: number;
  analyzedAt: string;
}

function getDealHistory(): DealHistoryEntry[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(DEAL_HISTORY_KEY);
  if (!stored) {
    // Seed with existing deal analyses
    const seeded = dealAnalyses.map((a) => ({
      id: generateId(),
      propertyId: a.propertyId,
      address: a.property.address,
      city: a.property.city,
      state: a.property.state,
      price: a.property.price,
      dealScore: a.dealScore,
      capRate: a.capRate,
      cashOnCash: a.cashOnCash,
      monthlyCashFlow: a.monthlyCashFlow,
      roi: a.roi,
      analyzedAt: a.createdAt,
    }));
    localStorage.setItem(DEAL_HISTORY_KEY, JSON.stringify(seeded));
    return seeded;
  }
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
}

export function DealHistory({ compact = false }: { compact?: boolean }) {
  const [history, setHistory] = useState<DealHistoryEntry[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"date" | "score" | "price">("date");
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [showCompare, setShowCompare] = useState(false);

  useEffect(() => {
    setHistory(getDealHistory());
  }, []);

  const filtered = useMemo(() => {
    let items = [...history];
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      items = items.filter(
        (d) =>
          d.address.toLowerCase().includes(q) ||
          d.city.toLowerCase().includes(q) ||
          d.state.toLowerCase().includes(q)
      );
    }
    switch (sortBy) {
      case "score":
        items.sort((a, b) => b.dealScore - a.dealScore);
        break;
      case "price":
        items.sort((a, b) => a.price - b.price);
        break;
      default:
        items.sort((a, b) => new Date(b.analyzedAt).getTime() - new Date(a.analyzedAt).getTime());
    }
    return items;
  }, [history, searchQuery, sortBy]);

  const displayed = compact ? filtered.slice(0, 5) : filtered;

  const toggleCompare = (id: string) => {
    setCompareIds((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= 2) return [prev[1], id];
      return [...prev, id];
    });
  };

  const compareDeals = compareIds.map((id) => history.find((d) => d.id === id)).filter(Boolean) as DealHistoryEntry[];

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
              <History className="h-5 w-5 text-primary" />
              Deal History
              <Badge variant="secondary" className="text-[10px]">{history.length} deals</Badge>
            </CardTitle>
            {!compact && compareIds.length === 2 && (
              <Button size="sm" onClick={() => setShowCompare(true)}>
                <GitCompareArrows className="h-3.5 w-3.5 mr-1.5" />
                Compare
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {!compact && (
            <div className="flex gap-2 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search deals..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 h-9 text-sm"
                />
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSortBy(sortBy === "date" ? "score" : sortBy === "score" ? "price" : "date")}
              >
                <ArrowUpDown className="h-3.5 w-3.5 mr-1.5" />
                {sortBy === "date" ? "Date" : sortBy === "score" ? "Score" : "Price"}
              </Button>
            </div>
          )}

          <div className="space-y-2">
            {displayed.map((deal) => (
              <motion.div
                key={deal.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`flex items-center gap-3 p-2.5 rounded-lg transition-colors cursor-pointer ${
                  compareIds.includes(deal.id)
                    ? "bg-primary/5 border border-primary/20"
                    : "hover:bg-muted/50"
                }`}
                onClick={() => !compact && toggleCompare(deal.id)}
              >
                <DealScore score={deal.dealScore} size="sm" showLabel={false} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{deal.address}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {deal.city}, {deal.state}
                  </p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-semibold tabular-nums">{formatCurrency(deal.price)}</p>
                  <p className="text-[10px] text-muted-foreground">{formatDate(deal.analyzedAt)}</p>
                </div>
              </motion.div>
            ))}
            {displayed.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-8">No deals found</p>
            )}
          </div>

          {/* Comparison Panel */}
          <AnimatePresence>
            {showCompare && compareDeals.length === 2 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as const }}
                className="mt-4 pt-4 border-t border-border"
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-semibold flex items-center gap-1.5">
                    <GitCompareArrows className="h-4 w-4 text-primary" />
                    Side-by-Side Comparison
                  </h4>
                  <Button variant="ghost" size="sm" onClick={() => { setShowCompare(false); setCompareIds([]); }}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-2 text-xs text-muted-foreground font-medium">Metric</th>
                        {compareDeals.map((d) => (
                          <th key={d.id} className="text-right py-2 text-xs font-medium">{d.address.split(" ").slice(0, 3).join(" ")}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { label: "Deal Score", key: "dealScore", format: (v: number) => `${v}/100` },
                        { label: "Price", key: "price", format: (v: number) => formatCurrency(v) },
                        { label: "Cap Rate", key: "capRate", format: (v: number) => formatPercent(v) },
                        { label: "Cash-on-Cash", key: "cashOnCash", format: (v: number) => formatPercent(v) },
                        { label: "Monthly CF", key: "monthlyCashFlow", format: (v: number) => formatCurrency(v) },
                        { label: "ROI", key: "roi", format: (v: number) => formatPercent(v) },
                      ].map((metric) => (
                        <tr key={metric.label} className="border-b border-border/50">
                          <td className="py-2 text-xs text-muted-foreground">{metric.label}</td>
                          {compareDeals.map((d) => {
                            const val = d[metric.key as keyof DealHistoryEntry] as number;
                            const otherVal = compareDeals.find((x) => x.id !== d.id)?.[metric.key as keyof DealHistoryEntry] as number;
                            const better = metric.key === "price" ? val < otherVal : val > otherVal;
                            return (
                              <td key={d.id} className={`py-2 text-right text-xs tabular-nums font-medium ${better ? "text-accent" : ""}`}>
                                {metric.format(val)}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
}

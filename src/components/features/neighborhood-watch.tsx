"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatCurrency } from "@/lib/utils";
import {
  Eye,
  Plus,
  X,
  TrendingUp,
  TrendingDown,
  Minus,
  MapPin,
  Home,
  Clock,
  BarChart3,
  Bell,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const WATCH_KEY = "neighborhood_watch";

interface WatchedNeighborhood {
  id: string;
  name: string;
  city: string;
  state: string;
  medianPrice: number;
  avgDaysOnMarket: number;
  inventoryLevel: number;
  priceChange: number;
  trendData: { month: string; price: number }[];
  alerts: string[];
  addedAt: string;
}

const defaultNeighborhoods: WatchedNeighborhood[] = [
  {
    id: "n1",
    name: "Maple Grove",
    city: "Austin",
    state: "TX",
    medianPrice: 310000,
    avgDaysOnMarket: 32,
    inventoryLevel: 145,
    priceChange: 3.2,
    trendData: [
      { month: "Sep", price: 289000 }, { month: "Oct", price: 295000 },
      { month: "Nov", price: 298000 }, { month: "Dec", price: 301000 },
      { month: "Jan", price: 305000 }, { month: "Feb", price: 310000 },
    ],
    alerts: ["Price up 3.2% MoM", "New distressed listing at $285K"],
    addedAt: "2026-01-15T00:00:00Z",
  },
  {
    id: "n2",
    name: "Westshore",
    city: "Tampa",
    state: "FL",
    medianPrice: 445000,
    avgDaysOnMarket: 45,
    inventoryLevel: 89,
    priceChange: -1.5,
    trendData: [
      { month: "Sep", price: 460000 }, { month: "Oct", price: 455000 },
      { month: "Nov", price: 452000 }, { month: "Dec", price: 450000 },
      { month: "Jan", price: 448000 }, { month: "Feb", price: 445000 },
    ],
    alerts: ["Inventory up 15% - buyer's market forming"],
    addedAt: "2026-01-20T00:00:00Z",
  },
  {
    id: "n3",
    name: "Cherry Creek",
    city: "Denver",
    state: "CO",
    medianPrice: 525000,
    avgDaysOnMarket: 28,
    inventoryLevel: 62,
    priceChange: 1.8,
    trendData: [
      { month: "Sep", price: 505000 }, { month: "Oct", price: 510000 },
      { month: "Nov", price: 515000 }, { month: "Dec", price: 518000 },
      { month: "Jan", price: 520000 }, { month: "Feb", price: 525000 },
    ],
    alerts: [],
    addedAt: "2026-02-01T00:00:00Z",
  },
];

function getWatchList(): WatchedNeighborhood[] {
  if (typeof window === "undefined") return defaultNeighborhoods;
  const stored = localStorage.getItem(WATCH_KEY);
  if (!stored) {
    localStorage.setItem(WATCH_KEY, JSON.stringify(defaultNeighborhoods));
    return defaultNeighborhoods;
  }
  try {
    return JSON.parse(stored);
  } catch {
    return defaultNeighborhoods;
  }
}

function saveWatchList(list: WatchedNeighborhood[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(WATCH_KEY, JSON.stringify(list));
}

export function NeighborhoodWatch() {
  const [neighborhoods, setNeighborhoods] = useState<WatchedNeighborhood[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState("");
  const [newCity, setNewCity] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    setNeighborhoods(getWatchList());
  }, []);

  const addNeighborhood = () => {
    if (!newName.trim() || !newCity.trim()) return;
    const newEntry: WatchedNeighborhood = {
      id: `n-${Date.now()}`,
      name: newName.trim(),
      city: newCity.split(",")[0]?.trim() || newCity.trim(),
      state: newCity.split(",")[1]?.trim() || "US",
      medianPrice: 250000 + Math.random() * 300000,
      avgDaysOnMarket: 20 + Math.floor(Math.random() * 40),
      inventoryLevel: 30 + Math.floor(Math.random() * 120),
      priceChange: parseFloat((Math.random() * 6 - 2).toFixed(1)),
      trendData: ["Sep", "Oct", "Nov", "Dec", "Jan", "Feb"].map((m) => ({
        month: m,
        price: Math.round(200000 + Math.random() * 300000),
      })),
      alerts: [],
      addedAt: new Date().toISOString(),
    };
    const updated = [...neighborhoods, newEntry];
    setNeighborhoods(updated);
    saveWatchList(updated);
    setNewName("");
    setNewCity("");
    setShowAdd(false);
  };

  const removeNeighborhood = (id: string) => {
    const updated = neighborhoods.filter((n) => n.id !== id);
    setNeighborhoods(updated);
    saveWatchList(updated);
    if (selectedId === id) setSelectedId(null);
  };

  const selected = neighborhoods.find((n) => n.id === selectedId);

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
              <Eye className="h-5 w-5 text-primary" />
              Neighborhood Watch
              <Badge variant="secondary" className="text-[10px]">{neighborhoods.length} tracked</Badge>
            </CardTitle>
            <Button size="sm" variant="outline" onClick={() => setShowAdd(!showAdd)}>
              <Plus className="h-3.5 w-3.5 mr-1" />
              Add
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Add Form */}
          <AnimatePresence>
            {showAdd && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] as const }}
                className="mb-4 pb-4 border-b border-border"
              >
                <div className="flex gap-2">
                  <Input
                    placeholder="Neighborhood name"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="h-8 text-sm"
                  />
                  <Input
                    placeholder="City, State"
                    value={newCity}
                    onChange={(e) => setNewCity(e.target.value)}
                    className="h-8 text-sm"
                  />
                  <Button size="sm" onClick={addNeighborhood}>Save</Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Neighborhood List */}
          <div className="space-y-2">
            {neighborhoods.map((n) => (
              <div
                key={n.id}
                className={`p-3 rounded-lg cursor-pointer transition-colors ${
                  selectedId === n.id ? "bg-primary/5 border border-primary/20" : "hover:bg-muted/50 border border-transparent"
                }`}
                onClick={() => setSelectedId(selectedId === n.id ? null : n.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <div>
                      <p className="text-sm font-medium">{n.name}</p>
                      <p className="text-[10px] text-muted-foreground">{n.city}, {n.state}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-right">
                      <p className="text-sm font-semibold tabular-nums">{formatCurrency(n.medianPrice)}</p>
                      <div className="flex items-center gap-0.5 justify-end">
                        {n.priceChange > 0 ? (
                          <TrendingUp className="h-3 w-3 text-accent" />
                        ) : n.priceChange < 0 ? (
                          <TrendingDown className="h-3 w-3 text-destructive" />
                        ) : (
                          <Minus className="h-3 w-3 text-muted-foreground" />
                        )}
                        <span className={`text-[10px] tabular-nums font-medium ${
                          n.priceChange > 0 ? "text-accent" : n.priceChange < 0 ? "text-destructive" : "text-muted-foreground"
                        }`}>
                          {n.priceChange > 0 ? "+" : ""}{n.priceChange}%
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0"
                      onClick={(e) => { e.stopPropagation(); removeNeighborhood(n.id); }}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                {/* Expanded Details */}
                <AnimatePresence>
                  {selectedId === n.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] as const }}
                      className="mt-3 pt-3 border-t border-border/50"
                    >
                      <div className="grid grid-cols-3 gap-2 mb-3">
                        <div className="text-center">
                          <Home className="h-3.5 w-3.5 text-primary mx-auto mb-0.5" />
                          <p className="text-xs font-semibold tabular-nums">{n.inventoryLevel}</p>
                          <p className="text-[10px] text-muted-foreground">Listings</p>
                        </div>
                        <div className="text-center">
                          <Clock className="h-3.5 w-3.5 text-secondary mx-auto mb-0.5" />
                          <p className="text-xs font-semibold tabular-nums">{n.avgDaysOnMarket}d</p>
                          <p className="text-[10px] text-muted-foreground">Avg DOM</p>
                        </div>
                        <div className="text-center">
                          <BarChart3 className="h-3.5 w-3.5 text-accent mx-auto mb-0.5" />
                          <p className="text-xs font-semibold tabular-nums">{formatCurrency(n.medianPrice)}</p>
                          <p className="text-[10px] text-muted-foreground">Median</p>
                        </div>
                      </div>

                      {/* Mini Chart */}
                      <div className="h-24">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={n.trendData}>
                            <XAxis dataKey="month" tick={{ fontSize: 9 }} stroke="#94A3B8" />
                            <YAxis hide />
                            <Tooltip
                              formatter={(v) => formatCurrency(v as number)}
                              contentStyle={{ borderRadius: "0.5rem", border: "1px solid #E2E8F0", fontSize: "0.65rem" }}
                            />
                            <Line type="monotone" dataKey="price" stroke="#1E3A5F" strokeWidth={1.5} dot={{ r: 2 }} />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>

                      {/* Alerts */}
                      {n.alerts.length > 0 && (
                        <div className="mt-2 space-y-1">
                          {n.alerts.map((alert, i) => (
                            <div key={i} className="flex items-center gap-1.5 text-[11px] text-primary bg-primary/5 rounded px-2 py-1">
                              <Bell className="h-3 w-3 flex-shrink-0" />
                              {alert}
                            </div>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

"use client";

import React, { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { Slider } from "@/components/ui/slider";
import { DealScore } from "@/components/shared/deal-score";
import { dealAnalyses } from "@/data/properties";
import { formatCurrency, formatPercent, cn } from "@/lib/utils";
import {
  Search, SlidersHorizontal, X, Bed, Bath, Square, MapPin,
  ChevronLeft, ChevronRight, ZoomIn, ZoomOut,
  Crosshair,
} from "lucide-react";

export default function MapPage() {
  const [selectedDeal, setSelectedDeal] = useState<string | null>(null);
  const [showSidebar, setShowSidebar] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 600000]);
  const [minScore, setMinScore] = useState(0);
  const [mapView, setMapView] = useState<"pins" | "heatmap">("pins");

  const deals = useMemo(() => {
    return dealAnalyses.filter((d) => {
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        if (!d.property.city.toLowerCase().includes(q) && !d.property.state.toLowerCase().includes(q) && !d.property.address.toLowerCase().includes(q)) return false;
      }
      if (d.property.price < priceRange[0] || d.property.price > priceRange[1]) return false;
      if (d.dealScore < minScore) return false;
      return true;
    }).sort((a, b) => b.dealScore - a.dealScore);
  }, [searchQuery, priceRange, minScore]);



  // Map pin positions (simulated on a static map background)
  const getPosition = (lat: number, lng: number) => {
    const minLat = 27, maxLat = 40, minLng = -105, maxLng = -78;
    const x = ((lng - minLng) / (maxLng - minLng)) * 100;
    const y = ((maxLat - lat) / (maxLat - minLat)) * 100;
    return { left: `${Math.max(5, Math.min(95, x))}%`, top: `${Math.max(5, Math.min(95, y))}%` };
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "bg-accent text-white shadow-accent/30";
    if (score >= 60) return "bg-secondary text-white shadow-secondary/30";
    if (score >= 40) return "bg-yellow-500 text-white shadow-yellow-500/30";
    return "bg-red-500 text-white shadow-red-500/30";
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Header />

      <div className="flex-1 flex overflow-hidden relative">
        {/* Sidebar */}
        {showSidebar && (
          <div className="w-96 border-r border-border bg-white flex flex-col overflow-hidden z-10">
            {/* Search */}
            <div className="p-4 border-b border-border space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search city, state, address..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{deals.length} properties</span>
                <Button variant="ghost" size="sm" onClick={() => setShowFilters(!showFilters)}>
                  <SlidersHorizontal className="h-4 w-4 mr-1" />
                  Filters
                </Button>
              </div>
              {showFilters && (
                <div className="space-y-3 pt-2 border-t border-border animate-slide-up">
                  <div>
                    <div className="flex justify-between text-xs mb-2">
                      <span className="text-muted-foreground">Price Range</span>
                      <span className="font-medium">{formatCurrency(priceRange[0])} - {formatCurrency(priceRange[1])}</span>
                    </div>
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      min={0}
                      max={600000}
                      step={10000}
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-2">
                      <span className="text-muted-foreground">Min Deal Score</span>
                      <span className="font-medium">{minScore}</span>
                    </div>
                    <Slider
                      value={[minScore]}
                      onValueChange={([v]) => setMinScore(v)}
                      min={0}
                      max={100}
                      step={5}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Property List */}
            <div className="flex-1 overflow-y-auto scrollbar-hide">
              {deals.map((deal) => (
                <div
                  key={deal.propertyId}
                  className={cn(
                    "p-4 border-b border-border cursor-pointer transition-colors",
                    selectedDeal === deal.propertyId ? "bg-primary/5 border-l-4 border-l-primary" : "hover:bg-muted/50"
                  )}
                  onClick={() => setSelectedDeal(deal.propertyId)}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm truncate">{deal.property.address}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {deal.property.city}, {deal.property.state}
                      </p>
                      <p className="text-lg font-bold text-primary mt-1 tabular-nums" style={{ fontFeatureSettings: '"tnum"' }}>
                        {formatCurrency(deal.property.price)}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                        <span className="flex items-center gap-0.5"><Bed className="h-3 w-3" />{deal.property.bedrooms}</span>
                        <span className="flex items-center gap-0.5"><Bath className="h-3 w-3" />{deal.property.bathrooms}</span>
                        <span className="flex items-center gap-0.5"><Square className="h-3 w-3" />{deal.property.sqft.toLocaleString()}</span>
                      </div>
                    </div>
                    <DealScore score={deal.dealScore} size="sm" showLabel={false} />
                  </div>
                  <div className="flex items-center gap-3 mt-2 text-xs">
                    <span className="text-secondary font-medium">Cap: {formatPercent(deal.capRate)}</span>
                    <span className={deal.monthlyCashFlow >= 0 ? "text-accent font-medium" : "text-destructive font-medium"}>
                      CF: {formatCurrency(deal.monthlyCashFlow)}/mo
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Sidebar Toggle */}
        <button
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white border border-border rounded-r-lg p-1.5 shadow-sm hover:bg-muted transition-colors"
          style={{ left: showSidebar ? "384px" : "0px" }}
          onClick={() => setShowSidebar(!showSidebar)}
        >
          {showSidebar ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </button>

        {/* Map Area */}
        <div className="flex-1 relative bg-gradient-to-br from-blue-50 via-slate-100 to-green-50 overflow-hidden">
          {/* Map Controls */}
          <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
            <div className="bg-white rounded-lg shadow-md border border-border">
              <Button variant="ghost" size="icon" className="rounded-b-none border-b border-border">
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-t-none">
                <ZoomOut className="h-4 w-4" />
              </Button>
            </div>
            <Button variant="ghost" size="icon" className="bg-white rounded-lg shadow-md border border-border">
              <Crosshair className="h-4 w-4" />
            </Button>
            <div className="bg-white rounded-lg shadow-md border border-border p-1">
              <Button
                variant={mapView === "pins" ? "default" : "ghost"}
                size="sm"
                className="w-full text-xs mb-1"
                onClick={() => setMapView("pins")}
              >
                Pins
              </Button>
              <Button
                variant={mapView === "heatmap" ? "default" : "ghost"}
                size="sm"
                className="w-full text-xs"
                onClick={() => setMapView("heatmap")}
              >
                Heat
              </Button>
            </div>
          </div>

          {/* Map Background Pattern */}
          <div className="absolute inset-0 opacity-20">
            <svg width="100%" height="100%">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#94A3B8" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          {/* Simulated map state boundaries */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center space-y-2 opacity-30">
              <MapPin className="h-16 w-16 mx-auto text-primary" />
              <p className="text-lg font-medium text-primary">Interactive Map View</p>
              <p className="text-sm text-muted-foreground">Add a Mapbox API key to enable full map functionality</p>
            </div>
          </div>

          {/* Property Pins */}
          {mapView === "pins" && deals.map((deal) => {
            const pos = getPosition(deal.property.lat, deal.property.lng);
            const isSelected = selectedDeal === deal.propertyId;
            return (
              <button
                key={deal.propertyId}
                className={cn(
                  "absolute transform -translate-x-1/2 -translate-y-1/2 z-10 transition-all duration-200",
                  isSelected ? "z-20 scale-125" : "hover:scale-110"
                )}
                style={{ left: pos.left, top: pos.top }}
                onClick={() => setSelectedDeal(deal.propertyId)}
              >
                <div className={cn(
                  "rounded-full flex items-center justify-center font-bold text-xs shadow-lg border-2 border-white",
                  getScoreColor(deal.dealScore),
                  isSelected ? "h-12 w-12" : "h-9 w-9"
                )}>
                  {deal.dealScore}
                </div>
                {isSelected && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap bg-white rounded-lg shadow-xl border border-border p-3 animate-slide-up min-w-[220px]">
                    <p className="font-semibold text-sm">{deal.property.address}</p>
                    <p className="text-xs text-muted-foreground">{deal.property.city}, {deal.property.state}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="font-bold text-primary tabular-nums">{formatCurrency(deal.property.price)}</span>
                      <Link href={`/deals/${deal.propertyId}`}>
                        <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/20">View Details</Badge>
                      </Link>
                    </div>
                    <div className="grid grid-cols-3 gap-2 mt-2 text-xs">
                      <div className="text-center">
                        <p className="text-muted-foreground">Cap</p>
                        <p className="font-semibold">{formatPercent(deal.capRate)}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-muted-foreground">CoC</p>
                        <p className="font-semibold">{formatPercent(deal.cashOnCash)}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-muted-foreground">Score</p>
                        <p className="font-semibold">{deal.dealScore}</p>
                      </div>
                    </div>
                  </div>
                )}
              </button>
            );
          })}

          {/* Heatmap Overlay */}
          {mapView === "heatmap" && deals.map((deal) => {
            const pos = getPosition(deal.property.lat, deal.property.lng);
            const opacity = deal.dealScore / 100;
            const size = 60 + (deal.dealScore / 100) * 100;
            return (
              <div
                key={deal.propertyId}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
                style={{
                  left: pos.left,
                  top: pos.top,
                  width: `${size}px`,
                  height: `${size}px`,
                  background: `radial-gradient(circle, rgba(16, 185, 129, ${opacity * 0.6}) 0%, rgba(16, 185, 129, 0) 70%)`,
                }}
              />
            );
          })}

          {/* Map Legend */}
          <div className="absolute bottom-4 left-4 z-10 bg-white rounded-lg shadow-md border border-border p-3">
            <p className="text-xs font-medium mb-2">Deal Score</p>
            <div className="space-y-1.5">
              {[
                { label: "80-100 Excellent", color: "bg-accent" },
                { label: "60-79 Good", color: "bg-secondary" },
                { label: "40-59 Fair", color: "bg-yellow-500" },
                { label: "0-39 Poor", color: "bg-red-500" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <div className={`h-3 w-3 rounded-full ${item.color}`} />
                  <span className="text-xs text-muted-foreground">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Draw to Search instruction */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 bg-white/90 backdrop-blur-sm rounded-full shadow-sm border border-border px-4 py-2">
            <p className="text-xs text-muted-foreground">Click a pin for property details. Use filters to narrow results.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

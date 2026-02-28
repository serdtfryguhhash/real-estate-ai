"use client";

import React, { useState, useMemo } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PropertyCard } from "@/components/shared/property-card";
import { Disclaimer } from "@/components/shared/disclaimer";
import { dealAnalyses } from "@/data/properties";
import { formatCurrency } from "@/lib/utils";
import {
  Search,
  SlidersHorizontal,
  Grid3X3,
  List,
  ArrowUpDown,
  MapPin,
  X,
} from "lucide-react";

export default function DealsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("score");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minScore, setMinScore] = useState("");
  const [propertyType, setPropertyType] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);

  const filteredDeals = useMemo(() => {
    let deals = [...dealAnalyses];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      deals = deals.filter(
        (d) =>
          d.property.address.toLowerCase().includes(query) ||
          d.property.city.toLowerCase().includes(query) ||
          d.property.state.toLowerCase().includes(query) ||
          d.property.zip.includes(query)
      );
    }

    if (minPrice) deals = deals.filter((d) => d.property.price >= parseInt(minPrice));
    if (maxPrice) deals = deals.filter((d) => d.property.price <= parseInt(maxPrice));
    if (minScore) deals = deals.filter((d) => d.dealScore >= parseInt(minScore));
    if (propertyType !== "all") deals = deals.filter((d) => d.property.propertyType === propertyType);

    switch (sortBy) {
      case "score": deals.sort((a, b) => b.dealScore - a.dealScore); break;
      case "price_low": deals.sort((a, b) => a.property.price - b.property.price); break;
      case "price_high": deals.sort((a, b) => b.property.price - a.property.price); break;
      case "cashflow": deals.sort((a, b) => b.monthlyCashFlow - a.monthlyCashFlow); break;
      case "cap_rate": deals.sort((a, b) => b.capRate - a.capRate); break;
      case "coc": deals.sort((a, b) => b.cashOnCash - a.cashOnCash); break;
      case "newest": deals.sort((a, b) => a.property.daysOnMarket - b.property.daysOnMarket); break;
    }

    return deals;
  }, [searchQuery, sortBy, minPrice, maxPrice, minScore, propertyType]);

  const clearFilters = () => {
    setSearchQuery("");
    setMinPrice("");
    setMaxPrice("");
    setMinScore("");
    setPropertyType("all");
  };

  const hasFilters = searchQuery || minPrice || maxPrice || minScore || propertyType !== "all";

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Deal Finder</h1>
            <p className="text-muted-foreground">AI-scored properties ready for analysis</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{filteredDeals.length} deals found</Badge>
          </div>
        </div>

        {/* Search & Filters Bar */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by address, city, state, or zip..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex items-center gap-2">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <ArrowUpDown className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="score">Deal Score</SelectItem>
                <SelectItem value="price_low">Price: Low to High</SelectItem>
                <SelectItem value="price_high">Price: High to Low</SelectItem>
                <SelectItem value="cashflow">Cash Flow</SelectItem>
                <SelectItem value="cap_rate">Cap Rate</SelectItem>
                <SelectItem value="coc">Cash-on-Cash</SelectItem>
                <SelectItem value="newest">Newest Listings</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant={showFilters ? "default" : "outline"}
              size="icon"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
            <div className="hidden sm:flex border rounded-md">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="icon"
                className="rounded-r-none"
                onClick={() => setViewMode("grid")}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="icon"
                className="rounded-l-none"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Expanded Filters */}
        {showFilters && (
          <Card className="p-4 mb-6 animate-slide-up">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Min Price</label>
                <Input
                  type="number"
                  placeholder="$0"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Max Price</label>
                <Input
                  type="number"
                  placeholder="No max"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Min Deal Score</label>
                <Input
                  type="number"
                  placeholder="0"
                  value={minScore}
                  onChange={(e) => setMinScore(e.target.value)}
                />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Property Type</label>
                <Select value={propertyType} onValueChange={setPropertyType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="single_family">Single Family</SelectItem>
                    <SelectItem value="multi_family">Multi Family</SelectItem>
                    <SelectItem value="condo">Condo</SelectItem>
                    <SelectItem value="townhouse">Townhouse</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {hasFilters && (
                <div className="flex items-end">
                  <Button variant="ghost" onClick={clearFilters} className="text-destructive">
                    <X className="h-4 w-4 mr-1" /> Clear All
                  </Button>
                </div>
              )}
            </div>
          </Card>
        )}

        {/* Results */}
        {filteredDeals.length === 0 ? (
          <Card className="p-12 text-center">
            <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No deals found</h3>
            <p className="text-muted-foreground mb-4">Try adjusting your search or filters</p>
            <Button variant="outline" onClick={clearFilters}>Clear Filters</Button>
          </Card>
        ) : (
          <div className={viewMode === "grid"
            ? "grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            : "space-y-4"
          }>
            {filteredDeals.map((analysis) => (
              <PropertyCard key={analysis.id} analysis={analysis} compact={viewMode === "list"} />
            ))}
          </div>
        )}

        <div className="mt-8">
          <Disclaimer />
        </div>
      </main>

      <Footer />
    </div>
  );
}

"use client";

import React, { useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { DealScore } from "@/components/shared/deal-score";
import { Disclaimer } from "@/components/shared/disclaimer";
import { dealAnalyses, properties } from "@/data/properties";
import {
  formatCurrency,
  formatCurrencyDetailed,
  formatPercent,
  formatPercentDetailed,
  formatNumber,
  formatSqft,
  formatDate,
  getDealScoreColor,
  getDealScoreBg,
  getRiskColor,
} from "@/lib/utils";
import {
  MapPin, Bed, Bath, Square, Calendar, Clock, Home, TrendingUp, TrendingDown,
  DollarSign, ArrowLeft, Heart, Share2, Printer, Download, AlertTriangle,
  CheckCircle2, XCircle, BarChart3, Building, Ruler, Car, TreePine,
  Shield, School, Footprints, AlertOctagon, Hammer, ArrowUpRight,
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
} from "recharts";

export default function DealDetailPage() {
  const params = useParams();
  const propertyId = params.id as string;

  const analysis = useMemo(() => {
    return dealAnalyses.find((a) => a.propertyId === propertyId);
  }, [propertyId]);

  if (!analysis) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Property Not Found</h1>
          <p className="text-muted-foreground mb-6">This property could not be found in our database.</p>
          <Link href="/deals"><Button>Back to Deals</Button></Link>
        </div>
      </div>
    );
  }

  const { property } = analysis;

  const compChartData = analysis.comparables.map((comp, i) => ({
    name: `Comp ${i + 1}`,
    salePrice: comp.salePrice,
    adjustedPrice: comp.adjustedPrice,
    subjectPrice: property.price,
  }));

  const radarData = [
    { metric: "Discount", value: Math.min(100, analysis.discount * 5), fullMark: 100 },
    { metric: "Cap Rate", value: Math.min(100, analysis.capRate * 10), fullMark: 100 },
    { metric: "Cash Flow", value: Math.min(100, Math.max(0, analysis.monthlyCashFlow / 5)), fullMark: 100 },
    { metric: "Location", value: property.walkScore, fullMark: 100 },
    { metric: "Safety", value: 100 - property.crimeScore, fullMark: 100 },
    { metric: "Schools", value: property.schoolRating * 10, fullMark: 100 },
  ];

  const rehabBreakdown = [
    { item: "Kitchen", cost: Math.round(analysis.rehabCost * 0.30), detail: analysis.rehabLevel === "cosmetic" ? "Refresh paint, hardware" : "Full remodel" },
    { item: "Bathrooms", cost: Math.round(analysis.rehabCost * 0.20), detail: analysis.rehabLevel === "cosmetic" ? "New fixtures, vanity" : "Full tile and fixtures" },
    { item: "Flooring", cost: Math.round(analysis.rehabCost * 0.15), detail: "New flooring throughout" },
    { item: "Paint & Drywall", cost: Math.round(analysis.rehabCost * 0.10), detail: "Interior and exterior" },
    { item: "Systems", cost: Math.round(analysis.rehabCost * 0.15), detail: "HVAC, plumbing, electrical" },
    { item: "Exterior/Other", cost: Math.round(analysis.rehabCost * 0.10), detail: "Landscaping, roof, misc" },
  ];

  const downPayment = property.price * 0.25;
  const closingCosts = property.price * 0.03;
  const totalInvestment = downPayment + closingCosts + analysis.rehabCost;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link href="/deals" className="flex items-center gap-1 hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Deals
          </Link>
          <span>/</span>
          <span className="text-foreground">{property.address}</span>
        </div>

        {/* Header Section */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            {/* Property Image */}
            <div className="relative h-64 md:h-80 rounded-xl bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/10 overflow-hidden mb-6">
              <div className="absolute inset-0 flex items-center justify-center">
                <Building className="h-24 w-24 text-primary/20" />
              </div>
              <div className="absolute top-4 left-4 flex gap-2">
                <Badge variant="success" className="text-sm px-3 py-1">
                  {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                </Badge>
                <Badge variant="outline" className="bg-white/90 text-sm px-3 py-1">
                  MLS: {property.mlsNumber}
                </Badge>
              </div>
              <div className="absolute top-4 right-4 flex gap-2">
                <Button variant="outline" size="icon" className="bg-white/90 h-9 w-9">
                  <Heart className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="bg-white/90 h-9 w-9">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground">{property.address}</h1>
                <div className="flex items-center gap-2 text-muted-foreground mt-1">
                  <MapPin className="h-4 w-4" />
                  <span>{property.city}, {property.state} {property.zip}</span>
                  <span className="text-xs">|</span>
                  <span className="text-sm">{property.neighborhood}</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-4">
                  <span className="text-3xl font-bold text-primary tabular-nums" style={{ fontFeatureSettings: '"tnum"' }}>
                    {formatCurrency(property.price)}
                  </span>
                  {property.price < property.listPrice && (
                    <span className="text-lg text-muted-foreground line-through tabular-nums">
                      {formatCurrency(property.listPrice)}
                    </span>
                  )}
                </div>
                <Badge variant="accent" className="text-sm">
                  {formatCurrency(property.pricePerSqft)}/sqft
                </Badge>
              </div>

              <div className="flex flex-wrap items-center gap-6 text-sm">
                <div className="flex items-center gap-1.5">
                  <Bed className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{property.bedrooms}</span>
                  <span className="text-muted-foreground">Beds</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Bath className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{property.bathrooms}</span>
                  <span className="text-muted-foreground">Baths</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Square className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{formatNumber(property.sqft)}</span>
                  <span className="text-muted-foreground">sqft</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <TreePine className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{formatNumber(property.lotSize)}</span>
                  <span className="text-muted-foreground">lot sqft</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{property.yearBuilt}</span>
                  <span className="text-muted-foreground">Built</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{property.daysOnMarket}</span>
                  <span className="text-muted-foreground">DOM</span>
                </div>
              </div>
            </div>
          </div>

          {/* Deal Score Card */}
          <div className="space-y-4">
            <Card className={`p-6 border-2 ${getDealScoreBg(analysis.dealScore)}`}>
              <div className="text-center mb-4">
                <DealScore score={analysis.dealScore} size="lg" />
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Risk Level</span>
                  <Badge className={getRiskColor(analysis.riskLevel)}>{analysis.riskLevel.charAt(0).toUpperCase() + analysis.riskLevel.slice(1)}</Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Market Trend</span>
                  <span className="font-medium flex items-center gap-1">
                    {analysis.neighborhoodTrend === "appreciating" ? <TrendingUp className="h-3.5 w-3.5 text-accent" /> : <TrendingDown className="h-3.5 w-3.5 text-destructive" />}
                    {analysis.neighborhoodTrend.charAt(0).toUpperCase() + analysis.neighborhoodTrend.slice(1)}
                  </span>
                </div>
                <Separator />
                <p className="text-xs text-muted-foreground leading-relaxed">{analysis.recommendation}</p>
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="font-semibold text-sm mb-3">Quick Metrics</h3>
              <div className="space-y-2.5">
                {[
                  { label: "ARV", value: formatCurrency(analysis.arv), color: "text-accent" },
                  { label: "Rehab Cost", value: formatCurrency(analysis.rehabCost), color: "text-destructive" },
                  { label: "Profit Potential", value: formatCurrency(analysis.profitPotential), color: analysis.profitPotential > 0 ? "text-accent" : "text-destructive" },
                  { label: "Cap Rate", value: formatPercent(analysis.capRate), color: "text-secondary" },
                  { label: "Cash-on-Cash", value: formatPercent(analysis.cashOnCash), color: "text-primary" },
                  { label: "Monthly Cash Flow", value: formatCurrency(analysis.monthlyCashFlow), color: analysis.monthlyCashFlow > 0 ? "text-accent" : "text-destructive" },
                  { label: "DSCR", value: analysis.dscr.toFixed(2) + "x", color: analysis.dscr >= 1.25 ? "text-accent" : "text-warning" },
                ].map((item) => (
                  <div key={item.label} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{item.label}</span>
                    <span className={`font-semibold tabular-nums ${item.color}`} style={{ fontFeatureSettings: '"tnum"' }}>
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </Card>

            <div className="flex gap-2">
              <Button className="flex-1">
                <Heart className="h-4 w-4 mr-2" /> Save Deal
              </Button>
              <Link href="/calculator" className="flex-1">
                <Button variant="outline" className="w-full">
                  <BarChart3 className="h-4 w-4 mr-2" /> Calculator
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="analysis" className="mb-8">
          <TabsList className="w-full justify-start flex-wrap h-auto gap-1 p-1">
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
            <TabsTrigger value="comps">Comparables</TabsTrigger>
            <TabsTrigger value="rehab">Rehab Estimate</TabsTrigger>
            <TabsTrigger value="financials">Financials</TabsTrigger>
            <TabsTrigger value="neighborhood">Neighborhood</TabsTrigger>
          </TabsList>

          {/* Analysis Tab */}
          <TabsContent value="analysis">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Deal Score Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart data={radarData}>
                        <PolarGrid stroke="#E2E8F0" />
                        <PolarAngleAxis dataKey="metric" tick={{ fontSize: 12, fill: "#64748B" }} />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10 }} />
                        <Radar name="Score" dataKey="value" stroke="#1E3A5F" fill="#1E3A5F" fillOpacity={0.2} strokeWidth={2} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Investment Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-muted/50 rounded-lg p-4">
                      <h4 className="text-sm font-medium mb-3">Capital Required</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Down Payment (25%)</span>
                          <span className="tabular-nums font-medium">{formatCurrency(downPayment)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Closing Costs (3%)</span>
                          <span className="tabular-nums font-medium">{formatCurrency(closingCosts)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Rehab Budget</span>
                          <span className="tabular-nums font-medium">{formatCurrency(analysis.rehabCost)}</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between font-semibold">
                          <span>Total Cash Required</span>
                          <span className="tabular-nums text-primary">{formatCurrency(totalInvestment)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-accent/5 rounded-lg p-4">
                      <h4 className="text-sm font-medium mb-3 text-accent">Returns</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Annual Cash Flow</span>
                          <span className={`tabular-nums font-medium ${analysis.annualCashFlow > 0 ? "text-accent" : "text-destructive"}`}>
                            {formatCurrency(analysis.annualCashFlow)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">ROI (Flip)</span>
                          <span className="tabular-nums font-medium">{formatPercent(analysis.roi)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Break Even</span>
                          <span className="tabular-nums font-medium">
                            {analysis.breakEvenMonths > 0 ? `${analysis.breakEvenMonths} months` : "N/A"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 bg-yellow-50 rounded-lg p-3">
                      <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                      <p className="text-xs text-yellow-800">
                        Assumes 25% down, 6.95% interest rate, 30-year fixed. Actual terms may vary.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Property Description */}
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="text-base">Property Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{property.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {property.features.map((feature) => (
                      <Badge key={feature} variant="outline">{feature}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Comps Tab */}
          <TabsContent value="comps">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Comparable Sales Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 mb-6">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={compChartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                        <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                        <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`} />
                        <Tooltip formatter={(value) => formatCurrency(value as number)} contentStyle={{ borderRadius: "0.5rem", border: "1px solid #E2E8F0" }} />
                        <Bar dataKey="salePrice" fill="#94A3B8" name="Sale Price" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="adjustedPrice" fill="#0E7490" name="Adjusted Price" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="bg-accent/5 rounded-lg p-4 mb-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Estimated After-Repair Value (ARV)</p>
                        <p className="text-2xl font-bold text-accent tabular-nums" style={{ fontFeatureSettings: '"tnum"' }}>
                          {formatCurrency(analysis.arv)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Potential Equity</p>
                        <p className="text-lg font-bold text-primary tabular-nums">
                          {formatCurrency(analysis.arv - property.price - analysis.rehabCost)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-3 px-2 font-medium text-muted-foreground">Address</th>
                          <th className="text-right py-3 px-2 font-medium text-muted-foreground">Sale Price</th>
                          <th className="text-right py-3 px-2 font-medium text-muted-foreground">Adj. Price</th>
                          <th className="text-right py-3 px-2 font-medium text-muted-foreground">Sqft</th>
                          <th className="text-right py-3 px-2 font-medium text-muted-foreground">$/Sqft</th>
                          <th className="text-right py-3 px-2 font-medium text-muted-foreground">Distance</th>
                          <th className="text-right py-3 px-2 font-medium text-muted-foreground">Sale Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {analysis.comparables.map((comp) => (
                          <tr key={comp.id} className="border-b border-border/50 hover:bg-muted/50">
                            <td className="py-3 px-2 font-medium">{comp.address}</td>
                            <td className="py-3 px-2 text-right tabular-nums">{formatCurrency(comp.salePrice)}</td>
                            <td className="py-3 px-2 text-right tabular-nums font-medium text-secondary">{formatCurrency(comp.adjustedPrice)}</td>
                            <td className="py-3 px-2 text-right tabular-nums">{formatNumber(comp.sqft)}</td>
                            <td className="py-3 px-2 text-right tabular-nums">{formatCurrency(comp.pricePerSqft)}</td>
                            <td className="py-3 px-2 text-right">{comp.distance.toFixed(1)} mi</td>
                            <td className="py-3 px-2 text-right">{formatDate(comp.saleDate)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              {/* Adjustment Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Comp Adjustments Detail</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-3 px-2 font-medium text-muted-foreground">Comparable</th>
                          <th className="text-right py-3 px-2 font-medium text-muted-foreground">Sqft Adj</th>
                          <th className="text-right py-3 px-2 font-medium text-muted-foreground">Bed Adj</th>
                          <th className="text-right py-3 px-2 font-medium text-muted-foreground">Bath Adj</th>
                          <th className="text-right py-3 px-2 font-medium text-muted-foreground">Condition</th>
                          <th className="text-right py-3 px-2 font-medium text-muted-foreground">Location</th>
                          <th className="text-right py-3 px-2 font-medium text-muted-foreground">Total Adj</th>
                        </tr>
                      </thead>
                      <tbody>
                        {analysis.comparables.map((comp, i) => {
                          const totalAdj = Object.values(comp.adjustments).reduce((s, v) => s + v, 0);
                          return (
                            <tr key={comp.id} className="border-b border-border/50">
                              <td className="py-3 px-2 font-medium">Comp {i + 1}</td>
                              {Object.entries(comp.adjustments).slice(0, 5).map(([key, val]) => (
                                <td key={key} className={`py-3 px-2 text-right tabular-nums ${val > 0 ? "text-accent" : val < 0 ? "text-destructive" : ""}`}>
                                  {val >= 0 ? "+" : ""}{formatCurrency(val)}
                                </td>
                              ))}
                              <td className={`py-3 px-2 text-right tabular-nums font-medium ${totalAdj > 0 ? "text-accent" : "text-destructive"}`}>
                                {totalAdj >= 0 ? "+" : ""}{formatCurrency(totalAdj)}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Rehab Tab */}
          <TabsContent value="rehab">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Hammer className="h-4 w-4" />
                    Rehab Cost Estimate
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant={analysis.rehabLevel === "cosmetic" ? "success" : analysis.rehabLevel === "moderate" ? "warning" : "destructive"}>
                        {analysis.rehabLevel.charAt(0).toUpperCase() + analysis.rehabLevel.slice(1)} Rehab
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        Based on {2026 - property.yearBuilt} year old property
                      </span>
                    </div>
                    <p className="text-3xl font-bold text-primary tabular-nums" style={{ fontFeatureSettings: '"tnum"' }}>
                      {formatCurrency(analysis.rehabCost)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {formatCurrency(Math.round(analysis.rehabCost / property.sqft))}/sqft estimated rehab cost
                    </p>
                  </div>

                  <div className="space-y-3">
                    {rehabBreakdown.map((item) => (
                      <div key={item.item} className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">{item.item}</p>
                          <p className="text-xs text-muted-foreground">{item.detail}</p>
                        </div>
                        <span className="text-sm font-semibold tabular-nums" style={{ fontFeatureSettings: '"tnum"' }}>
                          {formatCurrency(item.cost)}
                        </span>
                      </div>
                    ))}
                    <Separator />
                    <div className="flex items-center justify-between font-semibold">
                      <span>Total Rehab Budget</span>
                      <span className="tabular-nums text-primary">{formatCurrency(analysis.rehabCost)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Rehab Level Comparison</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {(["cosmetic", "moderate", "full_gut"] as const).map((level) => {
                      const baseCost = level === "cosmetic" ? 15 : level === "moderate" ? 35 : 75;
                      const ageMult = (2026 - property.yearBuilt) > 50 ? 1.25 : 1.0;
                      const est = Math.round(property.sqft * baseCost * ageMult);
                      const isActive = level === analysis.rehabLevel;

                      return (
                        <div key={level} className={`p-4 rounded-lg border-2 transition-colors ${isActive ? "border-primary bg-primary/5" : "border-border"}`}>
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium capitalize">{level.replace("_", " ")}</h4>
                              {isActive && <Badge variant="default" className="text-[10px]">AI Selected</Badge>}
                            </div>
                            <span className="text-lg font-bold tabular-nums" style={{ fontFeatureSettings: '"tnum"' }}>
                              {formatCurrency(est)}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {level === "cosmetic" && "Paint, fixtures, minor updates. $10-20/sqft."}
                            {level === "moderate" && "Kitchen, baths, flooring, some systems. $25-45/sqft."}
                            {level === "full_gut" && "Complete renovation including all systems. $60-100+/sqft."}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Financials Tab */}
          <TabsContent value="financials">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Monthly Cash Flow</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="bg-accent/5 rounded-lg p-3">
                      <p className="text-xs text-muted-foreground">Gross Monthly Income</p>
                      <p className="text-xl font-bold text-accent tabular-nums">{formatCurrency(property.estimatedRent)}</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Vacancy (5%)</span>
                        <span className="tabular-nums text-destructive">-{formatCurrency(property.estimatedRent * 0.05)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Property Tax</span>
                        <span className="tabular-nums text-destructive">-{formatCurrency(property.taxAmount / 12)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Insurance</span>
                        <span className="tabular-nums text-destructive">-{formatCurrency(property.price * 0.005 / 12)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Management (8%)</span>
                        <span className="tabular-nums text-destructive">-{formatCurrency(property.estimatedRent * 0.08)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Maintenance (5%)</span>
                        <span className="tabular-nums text-destructive">-{formatCurrency(property.estimatedRent * 0.05)}</span>
                      </div>
                      {property.hoaFee > 0 && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">HOA</span>
                          <span className="tabular-nums text-destructive">-{formatCurrency(property.hoaFee)}</span>
                        </div>
                      )}
                      <Separator />
                      <div className="flex justify-between font-semibold">
                        <span>Net Cash Flow</span>
                        <span className={`tabular-nums ${analysis.monthlyCashFlow > 0 ? "text-accent" : "text-destructive"}`}>
                          {formatCurrency(analysis.monthlyCashFlow)}/mo
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Key Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { label: "Cap Rate", value: formatPercent(analysis.capRate), desc: "NOI / Purchase Price", good: analysis.capRate >= 6 },
                      { label: "Cash-on-Cash", value: formatPercent(analysis.cashOnCash), desc: "Annual Cash Flow / Cash Invested", good: analysis.cashOnCash >= 8 },
                      { label: "DSCR", value: analysis.dscr.toFixed(2) + "x", desc: "NOI / Annual Debt Service", good: analysis.dscr >= 1.25 },
                      { label: "ROI", value: formatPercent(analysis.roi), desc: "Total Return / Cash Invested", good: analysis.roi > 0 },
                      { label: "GRM", value: (property.price / (property.estimatedRent * 12)).toFixed(1), desc: "Price / Annual Rent", good: (property.price / (property.estimatedRent * 12)) < 15 },
                    ].map((metric) => (
                      <div key={metric.label} className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">{metric.label}</span>
                            {metric.good ? (
                              <CheckCircle2 className="h-3.5 w-3.5 text-accent" />
                            ) : (
                              <XCircle className="h-3.5 w-3.5 text-destructive" />
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">{metric.desc}</p>
                        </div>
                        <span className={`text-lg font-bold tabular-nums ${metric.good ? "text-accent" : "text-muted-foreground"}`}>
                          {metric.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Rent Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center bg-secondary/5 rounded-lg p-4">
                      <p className="text-sm text-muted-foreground">Estimated Monthly Rent</p>
                      <p className="text-3xl font-bold text-secondary tabular-nums">{formatCurrency(property.estimatedRent)}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Rent-to-Price Ratio: {((property.estimatedRent / property.price) * 100).toFixed(2)}%
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-2">1% Rule Check</p>
                      <div className="flex items-center gap-2">
                        {(property.estimatedRent / property.price * 100) >= 1 ? (
                          <>
                            <CheckCircle2 className="h-5 w-5 text-accent" />
                            <span className="text-sm text-accent font-medium">Passes 1% Rule</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="h-5 w-5 text-destructive" />
                            <span className="text-sm text-destructive font-medium">Below 1% Rule</span>
                          </>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Monthly rent should be at least 1% of purchase price ({formatCurrency(property.price * 0.01)}/mo)
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-2">Annual Income Projection</p>
                      <div className="text-sm space-y-1">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Gross Annual</span>
                          <span className="tabular-nums">{formatCurrency(property.estimatedRent * 12)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">After Vacancy</span>
                          <span className="tabular-nums">{formatCurrency(property.estimatedRent * 12 * 0.95)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Neighborhood Tab */}
          <TabsContent value="neighborhood">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Neighborhood Scores</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {[
                      { label: "Walk Score", value: property.walkScore, icon: Footprints, color: "bg-blue-500" },
                      { label: "Safety Score", value: 100 - property.crimeScore, icon: Shield, color: "bg-green-500" },
                      { label: "School Rating", value: property.schoolRating * 10, icon: School, color: "bg-purple-500" },
                    ].map((item) => (
                      <div key={item.label}>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <item.icon className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">{item.label}</span>
                          </div>
                          <span className="text-sm font-bold tabular-nums">{item.value}/100</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className={`h-full ${item.color} rounded-full transition-all duration-1000`}
                            style={{ width: `${item.value}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Market Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <span className="text-sm">Appreciation Trend</span>
                      <div className="flex items-center gap-1.5">
                        <TrendingUp className="h-4 w-4 text-accent" />
                        <span className="text-sm font-semibold text-accent tabular-nums">
                          +{analysis.marketTrend.toFixed(1)}% YoY
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <span className="text-sm">Neighborhood Trend</span>
                      <Badge variant={analysis.neighborhoodTrend === "appreciating" ? "success" : "warning"}>
                        {analysis.neighborhoodTrend.charAt(0).toUpperCase() + analysis.neighborhoodTrend.slice(1)}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <span className="text-sm">Days on Market</span>
                      <span className="text-sm font-semibold tabular-nums">{property.daysOnMarket} days</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <span className="text-sm">Listing Agent</span>
                      <span className="text-sm font-medium">{property.listingAgent}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <span className="text-sm">Annual Property Tax</span>
                      <span className="text-sm font-semibold tabular-nums">{formatCurrency(property.taxAmount)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <Disclaimer />
      </main>

      <Footer />
    </div>
  );
}

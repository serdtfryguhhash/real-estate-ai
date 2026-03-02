"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { Disclaimer } from "@/components/shared/disclaimer";
import { formatCurrency, formatPercent } from "@/lib/utils";
import {
  Search,
  TrendingUp,
  DollarSign,
  PieChart,
  BarChart3,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Sparkles,
  Home,
  MapPin,
  Calculator,
  Target,
  Zap,
  Info,
} from "lucide-react";

interface DemoResults {
  dealScore: number;
  capRate: number;
  cashOnCash: number;
  monthlyCashFlow: number;
  annualCashFlow: number;
  monthlyMortgage: number;
  noi: number;
  totalCashInvested: number;
  dscr: number;
  grm: number;
  onePercentRule: number;
  recommendation: string;
  riskLevel: "low" | "moderate" | "high";
}

function calculateDemoResults(
  purchasePrice: number,
  monthlyRent: number,
  downPaymentPct: number,
  interestRate: number,
  propertyTaxRate: number,
  insuranceMonthly: number
): DemoResults {
  // Mortgage calculation
  const downPayment = purchasePrice * (downPaymentPct / 100);
  const loanAmount = purchasePrice - downPayment;
  const monthlyRate = interestRate / 100 / 12;
  const numPayments = 360; // 30-year
  const monthlyMortgage =
    monthlyRate > 0
      ? (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments))) /
        (Math.pow(1 + monthlyRate, numPayments) - 1)
      : loanAmount / numPayments;

  // Income
  const grossAnnualRent = monthlyRent * 12;
  const vacancyLoss = grossAnnualRent * 0.05;
  const effectiveGrossIncome = grossAnnualRent - vacancyLoss;

  // Expenses
  const annualTax = purchasePrice * (propertyTaxRate / 100);
  const annualInsurance = insuranceMonthly * 12;
  const annualMaintenance = purchasePrice * 0.01;
  const annualManagement = effectiveGrossIncome * 0.08;
  const totalOperatingExpenses = annualTax + annualInsurance + annualMaintenance + annualManagement;

  // Key metrics
  const noi = effectiveGrossIncome - totalOperatingExpenses;
  const capRate = purchasePrice > 0 ? (noi / purchasePrice) * 100 : 0;

  const closingCosts = purchasePrice * 0.03;
  const totalCashInvested = downPayment + closingCosts;

  const annualDebtService = monthlyMortgage * 12;
  const annualCashFlow = noi - annualDebtService;
  const monthlyCashFlow = annualCashFlow / 12;

  const cashOnCash = totalCashInvested > 0 ? (annualCashFlow / totalCashInvested) * 100 : 0;
  const dscr = annualDebtService > 0 ? noi / annualDebtService : 0;
  const grm = monthlyRent > 0 ? purchasePrice / grossAnnualRent : 0;
  const onePercentRule = purchasePrice > 0 ? (monthlyRent / purchasePrice) * 100 : 0;

  // Deal score calculation
  let score = 0;
  // Cap rate contribution (max 25)
  if (capRate >= 10) score += 25;
  else if (capRate >= 8) score += 20;
  else if (capRate >= 6) score += 15;
  else if (capRate >= 4) score += 10;
  else if (capRate >= 2) score += 5;

  // Cash on cash (max 25)
  if (cashOnCash >= 15) score += 25;
  else if (cashOnCash >= 12) score += 20;
  else if (cashOnCash >= 8) score += 15;
  else if (cashOnCash >= 5) score += 10;
  else if (cashOnCash > 0) score += 5;

  // DSCR (max 20)
  if (dscr >= 1.5) score += 20;
  else if (dscr >= 1.25) score += 15;
  else if (dscr >= 1.0) score += 10;
  else if (dscr >= 0.8) score += 5;

  // 1% rule (max 15)
  if (onePercentRule >= 1.0) score += 15;
  else if (onePercentRule >= 0.8) score += 10;
  else if (onePercentRule >= 0.6) score += 5;

  // Positive cash flow bonus (max 15)
  if (monthlyCashFlow >= 500) score += 15;
  else if (monthlyCashFlow >= 200) score += 10;
  else if (monthlyCashFlow > 0) score += 5;

  const dealScore = Math.min(100, Math.max(0, score));

  let recommendation = "";
  let riskLevel: "low" | "moderate" | "high" = "moderate";

  if (dealScore >= 75) {
    recommendation =
      "Strong Buy -- Excellent fundamentals with strong cash flow metrics. This property shows above-average returns and solid debt coverage.";
    riskLevel = "low";
  } else if (dealScore >= 55) {
    recommendation =
      "Buy -- Solid investment opportunity with decent returns. Consider negotiating on price to improve margins further.";
    riskLevel = "low";
  } else if (dealScore >= 40) {
    recommendation =
      "Hold/Watch -- Moderate opportunity. The numbers work but are not compelling. Watch for price reductions or consider offering below asking.";
    riskLevel = "moderate";
  } else {
    recommendation =
      "Pass -- Current pricing does not support adequate returns. The risk-adjusted returns are below typical investor thresholds.";
    riskLevel = "high";
  }

  return {
    dealScore,
    capRate,
    cashOnCash,
    monthlyCashFlow,
    annualCashFlow,
    monthlyMortgage,
    noi,
    totalCashInvested,
    dscr,
    grm,
    onePercentRule,
    recommendation,
    riskLevel,
  };
}

function ScoreRing({ score }: { score: number }) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const getColor = (s: number) => {
    if (s >= 75) return "#10B981";
    if (s >= 55) return "#0E7490";
    if (s >= 40) return "#F59E0B";
    return "#EF4444";
  };

  const getLabel = (s: number) => {
    if (s >= 75) return "Strong Buy";
    if (s >= 55) return "Buy";
    if (s >= 40) return "Hold";
    return "Pass";
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: 140, height: 140 }}>
        <svg className="transform -rotate-90" width={140} height={140} viewBox="0 0 140 140">
          <circle cx={70} cy={70} r={radius} stroke="#E2E8F0" strokeWidth={8} fill="none" />
          <motion.circle
            cx={70}
            cy={70}
            r={radius}
            stroke={getColor(score)}
            strokeWidth={8}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] as const }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            className="text-4xl font-bold tabular-nums"
            style={{ color: getColor(score), fontFeatureSettings: '"tnum"' }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            {score}
          </motion.span>
          <span className="text-xs text-muted-foreground">/100</span>
        </div>
      </div>
      <Badge
        className="text-sm px-4 py-1"
        style={{
          backgroundColor: `${getColor(score)}15`,
          color: getColor(score),
          borderColor: `${getColor(score)}40`,
        }}
      >
        {getLabel(score)}
      </Badge>
    </div>
  );
}

export default function DemoPage() {
  const [address, setAddress] = useState("123 Main Street, Austin, TX");
  const [purchasePrice, setPurchasePrice] = useState(285000);
  const [monthlyRent, setMonthlyRent] = useState(2100);
  const [downPaymentPct, setDownPaymentPct] = useState(25);
  const [interestRate, setInterestRate] = useState(6.95);
  const [propertyTaxRate, setPropertyTaxRate] = useState(1.8);
  const [insuranceMonthly, setInsuranceMonthly] = useState(120);
  const [showResults, setShowResults] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const results = useMemo(
    () =>
      calculateDemoResults(
        purchasePrice,
        monthlyRent,
        downPaymentPct,
        interestRate,
        propertyTaxRate,
        insuranceMonthly
      ),
    [purchasePrice, monthlyRent, downPaymentPct, interestRate, propertyTaxRate, insuranceMonthly]
  );

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setShowResults(false);
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
    }, 1500);
  };

  const viabilityChecks = [
    {
      test: "Positive Cash Flow",
      pass: results.monthlyCashFlow > 0,
      detail: `${formatCurrency(results.monthlyCashFlow)}/mo`,
    },
    {
      test: "1% Rule",
      pass: results.onePercentRule >= 1,
      detail: `${results.onePercentRule.toFixed(2)}%`,
    },
    {
      test: "Cash-on-Cash > 8%",
      pass: results.cashOnCash >= 8,
      detail: formatPercent(results.cashOnCash),
    },
    {
      test: "Cap Rate > 6%",
      pass: results.capRate >= 6,
      detail: formatPercent(results.capRate),
    },
    {
      test: "DSCR > 1.25x",
      pass: results.dscr >= 1.25,
      detail: `${results.dscr.toFixed(2)}x`,
    },
  ];

  const passCount = viabilityChecks.filter((c) => c.pass).length;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary-800 via-primary to-secondary overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge
              variant="secondary"
              className="bg-white/10 text-white border-white/20 px-4 py-1.5 backdrop-blur-sm mb-6"
            >
              <Sparkles className="h-3.5 w-3.5 mr-1.5" />
              Free Deal Analyzer Demo
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 font-display leading-tight">
              Analyze Any Property{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-emerald-300">
                in Seconds
              </span>
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Enter a property address, purchase price, and estimated rent to get an instant AI-style
              deal score with key investment metrics. No signup required.
            </p>
          </motion.div>
        </div>
      </section>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Input Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Card className="shadow-xl border-0 -mt-12 relative z-20">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Search className="h-5 w-5 text-primary" />
                Property Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Address Row */}
              <div className="space-y-1.5">
                <Label className="text-sm font-medium">Property Address</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter property address..."
                    className="pl-10 h-12 text-base"
                  />
                </div>
              </div>

              {/* Main Inputs Grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium">Purchase Price</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="number"
                      value={purchasePrice}
                      onChange={(e) => setPurchasePrice(Number(e.target.value) || 0)}
                      className="pl-9 tabular-nums"
                      style={{ fontFeatureSettings: '"tnum"' }}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-sm font-medium">Monthly Rent</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="number"
                      value={monthlyRent}
                      onChange={(e) => setMonthlyRent(Number(e.target.value) || 0)}
                      className="pl-9 tabular-nums"
                      style={{ fontFeatureSettings: '"tnum"' }}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between">
                    <Label className="text-sm font-medium">Down Payment</Label>
                    <span className="text-xs font-medium text-muted-foreground tabular-nums">
                      {downPaymentPct}% ({formatCurrency(purchasePrice * downPaymentPct / 100)})
                    </span>
                  </div>
                  <Slider
                    value={[downPaymentPct]}
                    onValueChange={([v]) => setDownPaymentPct(v)}
                    min={0}
                    max={100}
                    step={5}
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-sm font-medium">Interest Rate</Label>
                  <div className="relative">
                    <Input
                      type="number"
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value) || 0)}
                      step={0.05}
                      className="pr-8 tabular-nums"
                      style={{ fontFeatureSettings: '"tnum"' }}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                      %
                    </span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-sm font-medium">Property Tax Rate</Label>
                  <div className="relative">
                    <Input
                      type="number"
                      value={propertyTaxRate}
                      onChange={(e) => setPropertyTaxRate(Number(e.target.value) || 0)}
                      step={0.1}
                      className="pr-8 tabular-nums"
                      style={{ fontFeatureSettings: '"tnum"' }}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                      %
                    </span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-sm font-medium">Monthly Insurance</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="number"
                      value={insuranceMonthly}
                      onChange={(e) => setInsuranceMonthly(Number(e.target.value) || 0)}
                      className="pl-9 tabular-nums"
                      style={{ fontFeatureSettings: '"tnum"' }}
                    />
                  </div>
                </div>
              </div>

              {/* Analyze Button */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button
                  size="xl"
                  variant="accent"
                  className="flex-1 text-base shadow-lg shadow-accent/25"
                  onClick={handleAnalyze}
                  disabled={isAnalyzing || purchasePrice <= 0 || monthlyRent <= 0}
                >
                  {isAnalyzing ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="mr-2"
                      >
                        <Target className="h-5 w-5" />
                      </motion.div>
                      Analyzing Deal...
                    </>
                  ) : (
                    <>
                      <Zap className="h-5 w-5 mr-2" />
                      Analyze This Deal
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Loading Animation */}
        <AnimatePresence>
          {isAnalyzing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-16 gap-4"
            >
              <motion.div
                className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center"
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Sparkles className="h-8 w-8 text-white" />
              </motion.div>
              <div className="text-center">
                <p className="font-semibold text-foreground">Running Deal Analysis</p>
                <p className="text-sm text-muted-foreground">
                  Calculating investment metrics...
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results */}
        <AnimatePresence>
          {showResults && !isAnalyzing && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6 mt-8"
            >
              {/* Score + Recommendation */}
              <Card className="shadow-lg border-0 overflow-hidden">
                <div className="bg-gradient-to-r from-primary/5 to-secondary/5 p-8">
                  <div className="flex flex-col md:flex-row items-center gap-8">
                    <ScoreRing score={results.dealScore} />

                    <div className="flex-1 text-center md:text-left">
                      <h2 className="text-xl font-bold text-foreground mb-1 font-display">
                        Deal Analysis for
                      </h2>
                      <p className="text-muted-foreground mb-4 flex items-center justify-center md:justify-start gap-1.5">
                        <MapPin className="h-4 w-4" />
                        {address || "Custom Property"}
                      </p>
                      <div
                        className={`inline-flex items-start gap-2 p-4 rounded-xl ${
                          results.riskLevel === "low"
                            ? "bg-accent/10 border border-accent/20"
                            : results.riskLevel === "moderate"
                            ? "bg-warning/10 border border-warning/20"
                            : "bg-destructive/10 border border-destructive/20"
                        }`}
                      >
                        <Info className="h-4 w-4 mt-0.5 flex-shrink-0 text-muted-foreground" />
                        <p className="text-sm text-foreground leading-relaxed">
                          {results.recommendation}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Key Metrics Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  {
                    label: "Cap Rate",
                    value: formatPercent(results.capRate),
                    good: results.capRate >= 6,
                    icon: PieChart,
                    desc: "NOI / Purchase Price",
                  },
                  {
                    label: "Cash-on-Cash",
                    value: formatPercent(results.cashOnCash),
                    good: results.cashOnCash >= 8,
                    icon: TrendingUp,
                    desc: "Annual Cash Flow / Cash Invested",
                  },
                  {
                    label: "Monthly Cash Flow",
                    value: formatCurrency(results.monthlyCashFlow),
                    good: results.monthlyCashFlow > 0,
                    icon: DollarSign,
                    desc: "After all expenses & mortgage",
                  },
                  {
                    label: "DSCR",
                    value: `${results.dscr.toFixed(2)}x`,
                    good: results.dscr >= 1.25,
                    icon: BarChart3,
                    desc: "Debt Service Coverage Ratio",
                  },
                ].map((metric, i) => (
                  <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                  >
                    <Card className="p-5 h-full">
                      <div className="flex items-center gap-1.5 mb-2">
                        <metric.icon className="h-4 w-4 text-muted-foreground" />
                        <span className="text-xs font-medium text-muted-foreground">
                          {metric.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span
                          className={`text-2xl font-bold tabular-nums ${
                            metric.good ? "text-accent" : "text-destructive"
                          }`}
                          style={{ fontFeatureSettings: '"tnum"' }}
                        >
                          {metric.value}
                        </span>
                        {metric.good ? (
                          <CheckCircle2 className="h-5 w-5 text-accent" />
                        ) : (
                          <XCircle className="h-5 w-5 text-destructive" />
                        )}
                      </div>
                      <p className="text-[11px] text-muted-foreground">{metric.desc}</p>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Detailed Breakdown */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Financial Summary */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <Card className="h-full">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <Calculator className="h-4 w-4 text-primary" />
                        Financial Summary
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3 text-sm">
                        {[
                          {
                            label: "Monthly Mortgage (P&I)",
                            value: formatCurrency(results.monthlyMortgage),
                          },
                          {
                            label: "Net Operating Income",
                            value: `${formatCurrency(results.noi)}/yr`,
                          },
                          {
                            label: "Total Cash Invested",
                            value: formatCurrency(results.totalCashInvested),
                          },
                          {
                            label: "Monthly Cash Flow",
                            value: formatCurrency(results.monthlyCashFlow),
                            highlight: true,
                          },
                          {
                            label: "Annual Cash Flow",
                            value: formatCurrency(results.annualCashFlow),
                            highlight: true,
                          },
                        ].map((item) => (
                          <div
                            key={item.label}
                            className={`flex justify-between ${
                              item.highlight ? "font-semibold" : ""
                            }`}
                          >
                            <span className="text-muted-foreground">{item.label}</span>
                            <span
                              className={`tabular-nums ${
                                item.highlight
                                  ? results.monthlyCashFlow >= 0
                                    ? "text-accent"
                                    : "text-destructive"
                                  : ""
                              }`}
                              style={{ fontFeatureSettings: '"tnum"' }}
                            >
                              {item.value}
                            </span>
                          </div>
                        ))}
                        <Separator />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Gross Rent Multiplier (GRM)</span>
                          <span className="tabular-nums">{results.grm.toFixed(1)}x</span>
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Rent-to-Price Ratio</span>
                          <span className="tabular-nums">
                            {results.onePercentRule.toFixed(2)}%
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Viability Check */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <Card className="h-full">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <Target className="h-4 w-4 text-secondary" />
                        Deal Viability Check
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {viabilityChecks.map((item) => (
                          <div key={item.test} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              {item.pass ? (
                                <CheckCircle2 className="h-5 w-5 text-accent" />
                              ) : (
                                <XCircle className="h-5 w-5 text-destructive" />
                              )}
                              <span className="text-sm">{item.test}</span>
                            </div>
                            <span
                              className={`text-sm font-medium tabular-nums ${
                                item.pass ? "text-accent" : "text-destructive"
                              }`}
                              style={{ fontFeatureSettings: '"tnum"' }}
                            >
                              {item.detail}
                            </span>
                          </div>
                        ))}
                        <Separator />
                        <div className="bg-muted/50 rounded-lg p-3 text-center">
                          <p className="text-xs text-muted-foreground mb-1">Overall Assessment</p>
                          {passCount >= 4 ? (
                            <Badge variant="success" className="text-sm px-4 py-1">
                              Strong Investment
                            </Badge>
                          ) : passCount >= 2 ? (
                            <Badge variant="warning" className="text-sm px-4 py-1">
                              Moderate Investment
                            </Badge>
                          ) : (
                            <Badge variant="destructive" className="text-sm px-4 py-1">
                              Weak Investment
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                <Card className="bg-gradient-to-r from-primary to-secondary text-white border-0 p-8">
                  <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2 font-display">
                        Want the Full Analysis?
                      </h3>
                      <p className="text-white/80 text-sm">
                        Get automated comps, AI-powered rehab estimates, neighborhood trends, and a
                        complete investment report. Sign up free to unlock the full DealFinder AI
                        platform.
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Link href="/signup">
                        <Button
                          size="lg"
                          variant="accent"
                          className="shadow-lg shadow-accent/25 whitespace-nowrap"
                        >
                          Get Started Free
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                      <Link href="/deals">
                        <Button
                          size="lg"
                          variant="outline"
                          className="border-white/30 text-white hover:bg-white/10 hover:text-white whitespace-nowrap"
                        >
                          Browse Deals
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pre-results CTA area */}
        {!showResults && !isAnalyzing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12"
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-2 font-display">
                What You Get with the Demo
              </h2>
              <p className="text-muted-foreground">
                Instant deal scoring based on real investment metrics
              </p>
            </div>
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                {
                  icon: Target,
                  title: "Deal Score (0-100)",
                  desc: "Weighted composite score based on cap rate, cash-on-cash return, DSCR, and the 1% rule.",
                },
                {
                  icon: DollarSign,
                  title: "Cash Flow Analysis",
                  desc: "Monthly and annual cash flow projections after mortgage, taxes, insurance, and management fees.",
                },
                {
                  icon: CheckCircle2,
                  title: "Viability Check",
                  desc: "Five key investor tests including the 1% rule, positive cash flow, and debt coverage ratio.",
                },
              ].map((item) => (
                <Card
                  key={item.title}
                  className="p-6 text-center hover:shadow-lg transition-shadow"
                >
                  <div className="mx-auto w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </Card>
              ))}
            </div>
          </motion.div>
        )}

        <div className="mt-8">
          <Disclaimer />
        </div>
      </main>

      <Footer />
    </div>
  );
}

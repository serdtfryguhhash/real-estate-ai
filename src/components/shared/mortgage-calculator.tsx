"use client";

import React, { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/utils";
import {
  DollarSign,
  TrendingUp,
  PieChart,
  Percent,
  Calendar,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
} from "recharts";

export function MortgageCalculator() {
  const [purchasePrice, setPurchasePrice] = useState(300000);
  const [downPaymentPct, setDownPaymentPct] = useState(25);
  const [interestRate, setInterestRate] = useState(6.95);
  const [loanTerm, setLoanTerm] = useState(30);

  const results = useMemo(() => {
    const downPayment = purchasePrice * (downPaymentPct / 100);
    const loanAmount = purchasePrice - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numPayments = loanTerm * 12;

    const monthlyPayment =
      monthlyRate > 0
        ? (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments))) /
          (Math.pow(1 + monthlyRate, numPayments) - 1)
        : loanAmount / numPayments;

    const totalPaid = monthlyPayment * numPayments;
    const totalInterest = totalPaid - loanAmount;

    // Build equity projection data
    const projectionData = [];
    let balance = loanAmount;
    const appreciationRate = 0.03;

    for (let year = 0; year <= loanTerm; year += 1) {
      const propertyValue = purchasePrice * Math.pow(1 + appreciationRate, year);
      const equity = propertyValue - balance;

      projectionData.push({
        year: `Yr ${year}`,
        equity: Math.round(equity),
        loanBalance: Math.round(Math.max(0, balance)),
        propertyValue: Math.round(propertyValue),
      });

      // Amortize 12 months
      for (let m = 0; m < 12 && balance > 0; m++) {
        const interestPayment = balance * monthlyRate;
        const principalPayment = monthlyPayment - interestPayment;
        balance = Math.max(0, balance - principalPayment);
      }
    }

    // Select key points for the chart
    const chartData = projectionData.filter(
      (_, i) => i === 0 || i === 5 || i === 10 || i === 15 || i === 20 || i === 25 || i === 30
    );

    // Monthly payment breakdown (estimated)
    const monthlyTax = (purchasePrice * 0.012) / 12;
    const monthlyInsurance = 125;

    const pieData = [
      { name: "Principal & Interest", value: Math.round(monthlyPayment), color: "#1E3A5F" },
      { name: "Property Tax", value: Math.round(monthlyTax), color: "#0E7490" },
      { name: "Insurance", value: Math.round(monthlyInsurance), color: "#10B981" },
    ];

    // ROI metrics (simplified rental scenario)
    const estimatedRent = purchasePrice * 0.007; // 0.7% rule estimate
    const totalMonthlyPayment = monthlyPayment + monthlyTax + monthlyInsurance;
    const monthlyCashFlow = estimatedRent - totalMonthlyPayment;
    const annualCashFlow = monthlyCashFlow * 12;
    const totalCashIn = downPayment + purchasePrice * 0.03;
    const cashOnCash = totalCashIn > 0 ? (annualCashFlow / totalCashIn) * 100 : 0;

    return {
      downPayment,
      loanAmount,
      monthlyPayment,
      totalPaid,
      totalInterest,
      chartData,
      pieData,
      totalMonthlyPayment,
      estimatedRent,
      monthlyCashFlow,
      cashOnCash,
      totalCashIn,
    };
  }, [purchasePrice, downPaymentPct, interestRate, loanTerm]);

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Left side: Sliders */}
      <div className="space-y-6">
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6 space-y-6">
            {/* Purchase Price */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium flex items-center gap-1.5">
                  <DollarSign className="h-4 w-4 text-primary" />
                  Purchase Price
                </Label>
                <span
                  className="text-lg font-bold text-primary tabular-nums"
                  style={{ fontFeatureSettings: '"tnum"' }}
                >
                  {formatCurrency(purchasePrice)}
                </span>
              </div>
              <Slider
                value={[purchasePrice]}
                onValueChange={([v]) => setPurchasePrice(v)}
                min={50000}
                max={1500000}
                step={5000}
              />
              <div className="flex justify-between text-[11px] text-muted-foreground tabular-nums">
                <span>$50K</span>
                <span>$1.5M</span>
              </div>
            </div>

            {/* Down Payment */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium flex items-center gap-1.5">
                  <Percent className="h-4 w-4 text-secondary" />
                  Down Payment
                </Label>
                <span className="text-sm font-semibold tabular-nums">
                  {downPaymentPct}%{" "}
                  <span className="text-muted-foreground font-normal">
                    ({formatCurrency(results.downPayment)})
                  </span>
                </span>
              </div>
              <Slider
                value={[downPaymentPct]}
                onValueChange={([v]) => setDownPaymentPct(v)}
                min={0}
                max={50}
                step={5}
              />
              <div className="flex justify-between text-[11px] text-muted-foreground tabular-nums">
                <span>0%</span>
                <span>50%</span>
              </div>
            </div>

            {/* Interest Rate */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium flex items-center gap-1.5">
                  <TrendingUp className="h-4 w-4 text-accent" />
                  Interest Rate
                </Label>
                <span
                  className="text-sm font-semibold tabular-nums"
                  style={{ fontFeatureSettings: '"tnum"' }}
                >
                  {interestRate.toFixed(2)}%
                </span>
              </div>
              <Slider
                value={[interestRate * 100]}
                onValueChange={([v]) => setInterestRate(v / 100)}
                min={200}
                max={1200}
                step={5}
              />
              <div className="flex justify-between text-[11px] text-muted-foreground tabular-nums">
                <span>2.00%</span>
                <span>12.00%</span>
              </div>
            </div>

            {/* Loan Term */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium flex items-center gap-1.5">
                  <Calendar className="h-4 w-4 text-purple-600" />
                  Loan Term
                </Label>
                <span className="text-sm font-semibold tabular-nums">{loanTerm} years</span>
              </div>
              <Slider
                value={[loanTerm]}
                onValueChange={([v]) => setLoanTerm(v)}
                min={10}
                max={30}
                step={5}
              />
              <div className="flex justify-between text-[11px] text-muted-foreground tabular-nums">
                <span>10 yr</span>
                <span>30 yr</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick ROI Metrics */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <PieChart className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-semibold">Quick Investment Analysis</h3>
              <Badge variant="secondary" className="text-[10px]">
                Estimated
              </Badge>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Est. Monthly Rent</span>
                <span className="font-medium tabular-nums" style={{ fontFeatureSettings: '"tnum"' }}>
                  {formatCurrency(results.estimatedRent)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Monthly Payment</span>
                <span className="font-medium tabular-nums" style={{ fontFeatureSettings: '"tnum"' }}>
                  {formatCurrency(results.totalMonthlyPayment)}
                </span>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Monthly Cash Flow</span>
                <div className="flex items-center gap-1.5">
                  <span
                    className={`font-bold tabular-nums ${
                      results.monthlyCashFlow >= 0 ? "text-accent" : "text-destructive"
                    }`}
                    style={{ fontFeatureSettings: '"tnum"' }}
                  >
                    {formatCurrency(results.monthlyCashFlow)}
                  </span>
                  {results.monthlyCashFlow >= 0 ? (
                    <CheckCircle2 className="h-4 w-4 text-accent" />
                  ) : (
                    <XCircle className="h-4 w-4 text-destructive" />
                  )}
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Cash-on-Cash Return</span>
                <span
                  className={`font-bold tabular-nums ${
                    results.cashOnCash >= 8 ? "text-accent" : "text-destructive"
                  }`}
                  style={{ fontFeatureSettings: '"tnum"' }}
                >
                  {results.cashOnCash.toFixed(1)}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right side: Results + Charts */}
      <div className="space-y-6">
        {/* Monthly Payment Summary */}
        <Card className="border-0 shadow-lg overflow-hidden">
          <div className="bg-gradient-to-br from-primary to-secondary p-6 text-white">
            <p className="text-sm text-white/70 mb-1">Estimated Monthly Payment</p>
            <p
              className="text-4xl font-bold tabular-nums font-display"
              style={{ fontFeatureSettings: '"tnum"' }}
            >
              {formatCurrency(results.monthlyPayment)}
              <span className="text-lg font-normal text-white/60">/mo</span>
            </p>
          </div>
          <CardContent className="p-6">
            <div className="grid grid-cols-3 gap-4 text-center mb-6">
              <div>
                <p className="text-xs text-muted-foreground">Loan Amount</p>
                <p className="text-sm font-bold tabular-nums" style={{ fontFeatureSettings: '"tnum"' }}>
                  {formatCurrency(results.loanAmount)}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Total Interest</p>
                <p className="text-sm font-bold tabular-nums text-destructive" style={{ fontFeatureSettings: '"tnum"' }}>
                  {formatCurrency(results.totalInterest)}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Total Paid</p>
                <p className="text-sm font-bold tabular-nums" style={{ fontFeatureSettings: '"tnum"' }}>
                  {formatCurrency(results.totalPaid)}
                </p>
              </div>
            </div>

            {/* Payment Breakdown Pie Chart */}
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={results.pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {results.pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(v) => formatCurrency(v as number)}
                    contentStyle={{
                      borderRadius: "0.5rem",
                      border: "1px solid #E2E8F0",
                      fontSize: "0.75rem",
                    }}
                  />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 mt-2">
              {results.pieData.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-muted-foreground">{item.name}</span>
                  </div>
                  <span className="tabular-nums font-medium" style={{ fontFeatureSettings: '"tnum"' }}>
                    {formatCurrency(item.value)}/mo
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Equity Growth Chart */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="h-4 w-4 text-accent" />
              <h3 className="text-sm font-semibold">Equity Growth Projection</h3>
              <Badge variant="secondary" className="text-[10px]">
                3% Appreciation
              </Badge>
            </div>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={results.chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis dataKey="year" tick={{ fontSize: 11 }} />
                  <YAxis
                    tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`}
                    tick={{ fontSize: 11 }}
                  />
                  <Tooltip
                    formatter={(v) => formatCurrency(v as number)}
                    contentStyle={{
                      borderRadius: "0.5rem",
                      border: "1px solid #E2E8F0",
                      fontSize: "0.75rem",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="equity"
                    name="Equity"
                    stroke="#10B981"
                    fill="#10B981"
                    fillOpacity={0.15}
                    strokeWidth={2}
                  />
                  <Area
                    type="monotone"
                    dataKey="loanBalance"
                    name="Loan Balance"
                    stroke="#EF4444"
                    fill="#EF4444"
                    fillOpacity={0.08}
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

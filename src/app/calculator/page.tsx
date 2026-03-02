"use client";

import React, { useState, useMemo } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Disclaimer } from "@/components/shared/disclaimer";
import { ScenarioLibrary } from "@/components/features/scenario-library";
import { calculateInvestment } from "@/lib/calculations";
import { formatCurrency, formatCurrencyDetailed, formatPercent, formatPercentDetailed } from "@/lib/utils";
import { InvestmentCalc } from "@/types";
import {
  Calculator, DollarSign, TrendingUp, PieChart, BarChart3,
  CheckCircle2, XCircle, AlertTriangle, Download, RotateCcw, Info,
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart as RechartsPieChart, Pie, Cell, Legend,
  AreaChart, Area,
} from "recharts";

const defaultCalc: InvestmentCalc = {
  purchasePrice: 285000,
  downPaymentPercent: 25,
  interestRate: 6.95,
  loanTermYears: 30,
  closingCosts: 8550,
  rehabCost: 15000,
  monthlyRent: 2100,
  vacancyRate: 5,
  managementFee: 8,
  monthlyInsurance: 120,
  monthlyTax: 396,
  monthlyMaintenance: 105,
  hoaFee: 0,
  appreciationRate: 3,
};

export default function CalculatorPage() {
  const [calc, setCalc] = useState<InvestmentCalc>(defaultCalc);

  const updateCalc = (field: keyof InvestmentCalc, value: number) => {
    setCalc((prev) => ({ ...prev, [field]: value }));
  };

  const results = useMemo(() => calculateInvestment(calc), [calc]);

  const monthlyBreakdown = [
    { name: "Mortgage", value: results.monthlyMortgage, color: "#1E3A5F" },
    { name: "Tax", value: calc.monthlyTax, color: "#0E7490" },
    { name: "Insurance", value: calc.monthlyInsurance, color: "#10B981" },
    { name: "Maintenance", value: calc.monthlyMaintenance, color: "#F59E0B" },
    { name: "Management", value: results.monthlyIncome * (calc.managementFee / 100), color: "#8B5CF6" },
    ...(calc.hoaFee > 0 ? [{ name: "HOA", value: calc.hoaFee, color: "#EC4899" }] : []),
  ];

  const equityGrowth = Array.from({ length: 11 }, (_, i) => {
    const year = i;
    const value = calc.purchasePrice * Math.pow(1 + calc.appreciationRate / 100, year);
    const annCashFlow = results.annualCashFlow * year;
    return {
      year: `Year ${year}`,
      propertyValue: Math.round(value),
      cumulativeCashFlow: Math.round(annCashFlow),
      totalReturn: Math.round(value - calc.purchasePrice + annCashFlow),
    };
  });

  const handleReset = () => setCalc(defaultCalc);

  const inputField = (label: string, field: keyof InvestmentCalc, prefix?: string, suffix?: string, step?: number) => (
    <div className="space-y-1.5">
      <Label className="text-xs text-muted-foreground">{label}</Label>
      <div className="relative">
        {prefix && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">{prefix}</span>}
        <Input
          type="number"
          value={calc[field]}
          onChange={(e) => updateCalc(field, parseFloat(e.target.value) || 0)}
          step={step || 1}
          className={`tabular-nums ${prefix ? "pl-7" : ""} ${suffix ? "pr-8" : ""}`}
          style={{ fontFeatureSettings: '"tnum"' }}
        />
        {suffix && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">{suffix}</span>}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Calculator className="h-6 w-6 text-primary" />
              Investment Calculator
            </h1>
            <p className="text-muted-foreground">Full financial analysis for rental property investments</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleReset}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Inputs */}
          <div className="lg:col-span-1 space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold text-primary">Purchase Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {inputField("Purchase Price", "purchasePrice", "$")}
                <div className="space-y-1.5">
                  <div className="flex justify-between">
                    <Label className="text-xs text-muted-foreground">Down Payment</Label>
                    <span className="text-xs font-medium tabular-nums">{calc.downPaymentPercent}% ({formatCurrency(calc.purchasePrice * calc.downPaymentPercent / 100)})</span>
                  </div>
                  <Slider
                    value={[calc.downPaymentPercent]}
                    onValueChange={([v]) => updateCalc("downPaymentPercent", v)}
                    min={0}
                    max={100}
                    step={5}
                  />
                </div>
                {inputField("Interest Rate", "interestRate", undefined, "%", 0.05)}
                {inputField("Loan Term (Years)", "loanTermYears")}
                {inputField("Closing Costs", "closingCosts", "$")}
                {inputField("Rehab Cost", "rehabCost", "$")}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold text-secondary">Income</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {inputField("Monthly Rent", "monthlyRent", "$")}
                {inputField("Vacancy Rate", "vacancyRate", undefined, "%", 1)}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold text-destructive">Expenses</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {inputField("Monthly Insurance", "monthlyInsurance", "$")}
                {inputField("Monthly Tax", "monthlyTax", "$")}
                {inputField("Monthly Maintenance", "monthlyMaintenance", "$")}
                {inputField("HOA Fee", "hoaFee", "$")}
                {inputField("Management Fee", "managementFee", undefined, "%", 1)}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold text-accent">Growth</CardTitle>
              </CardHeader>
              <CardContent>
                {inputField("Annual Appreciation", "appreciationRate", undefined, "%", 0.5)}
              </CardContent>
            </Card>

            {/* Scenario Library */}
            <ScenarioLibrary currentParams={calc} />
          </div>

          {/* Results */}
          <div className="lg:col-span-2 space-y-4">
            {/* Key Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: "Cash-on-Cash", value: formatPercent(results.cashOnCash), good: results.cashOnCash >= 8, icon: TrendingUp },
                { label: "Cap Rate", value: formatPercent(results.capRate), good: results.capRate >= 6, icon: PieChart },
                { label: "Monthly Cash Flow", value: formatCurrency(results.monthlyCashFlow), good: results.monthlyCashFlow > 0, icon: DollarSign },
                { label: "DSCR", value: results.dscr.toFixed(2) + "x", good: results.dscr >= 1.25, icon: BarChart3 },
              ].map((metric) => (
                <Card key={metric.label} className="p-4">
                  <div className="flex items-center gap-1.5 mb-1">
                    <metric.icon className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{metric.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xl font-bold tabular-nums ${metric.good ? "text-accent" : "text-destructive"}`}
                      style={{ fontFeatureSettings: '"tnum"' }}>
                      {metric.value}
                    </span>
                    {metric.good ? (
                      <CheckCircle2 className="h-4 w-4 text-accent" />
                    ) : (
                      <XCircle className="h-4 w-4 text-destructive" />
                    )}
                  </div>
                </Card>
              ))}
            </div>

            <Tabs defaultValue="overview">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="cashflow">Cash Flow</TabsTrigger>
                <TabsTrigger value="equity">Equity Growth</TabsTrigger>
                <TabsTrigger value="returns">Returns</TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <div className="grid md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Investment Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2.5 text-sm">
                        {[
                          { label: "Down Payment", value: formatCurrency(results.downPayment) },
                          { label: "Loan Amount", value: formatCurrency(results.loanAmount) },
                          { label: "Closing Costs", value: formatCurrency(calc.closingCosts) },
                          { label: "Rehab Cost", value: formatCurrency(calc.rehabCost) },
                        ].map((item) => (
                          <div key={item.label} className="flex justify-between">
                            <span className="text-muted-foreground">{item.label}</span>
                            <span className="font-medium tabular-nums">{item.value}</span>
                          </div>
                        ))}
                        <Separator />
                        <div className="flex justify-between font-semibold">
                          <span>Total Cash Invested</span>
                          <span className="text-primary tabular-nums">{formatCurrency(results.totalCashInvested)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Monthly Mortgage</span>
                          <span className="font-medium tabular-nums">{formatCurrencyDetailed(results.monthlyMortgage)}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Monthly Expenses Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-52">
                        <ResponsiveContainer width="100%" height="100%">
                          <RechartsPieChart>
                            <Pie
                              data={monthlyBreakdown}
                              cx="50%"
                              cy="50%"
                              innerRadius={45}
                              outerRadius={75}
                              paddingAngle={2}
                              dataKey="value"
                            >
                              {monthlyBreakdown.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip formatter={(v) => formatCurrencyDetailed(v as number)} contentStyle={{ borderRadius: "0.5rem", border: "1px solid #E2E8F0", fontSize: "0.75rem" }} />
                          </RechartsPieChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="space-y-1.5 mt-2">
                        {monthlyBreakdown.map((item) => (
                          <div key={item.name} className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-2">
                              <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                              <span className="text-muted-foreground">{item.name}</span>
                            </div>
                            <span className="tabular-nums font-medium">{formatCurrencyDetailed(item.value)}</span>
                          </div>
                        ))}
                        <Separator />
                        <div className="flex justify-between text-xs font-semibold">
                          <span>Total Monthly Expenses</span>
                          <span className="tabular-nums">{formatCurrencyDetailed(results.monthlyExpenses)}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="cashflow">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Monthly Cash Flow Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-6">
                      <div className="bg-accent/5 rounded-lg p-4 text-center">
                        <p className="text-xs text-muted-foreground">Monthly Income</p>
                        <p className="text-2xl font-bold text-accent tabular-nums">{formatCurrency(results.monthlyIncome)}</p>
                      </div>
                      <div className="bg-destructive/5 rounded-lg p-4 text-center">
                        <p className="text-xs text-muted-foreground">Monthly Expenses</p>
                        <p className="text-2xl font-bold text-destructive tabular-nums">{formatCurrency(results.monthlyExpenses)}</p>
                      </div>
                      <div className={`${results.monthlyCashFlow >= 0 ? "bg-accent/5" : "bg-destructive/5"} rounded-lg p-4 text-center`}>
                        <p className="text-xs text-muted-foreground">Net Cash Flow</p>
                        <p className={`text-2xl font-bold tabular-nums ${results.monthlyCashFlow >= 0 ? "text-accent" : "text-destructive"}`}>
                          {formatCurrency(results.monthlyCashFlow)}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <h4 className="font-medium mb-2 text-accent">Income</h4>
                          <div className="space-y-1.5">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Gross Rent</span>
                              <span className="tabular-nums">{formatCurrency(calc.monthlyRent)}</span>
                            </div>
                            <div className="flex justify-between text-destructive">
                              <span>Vacancy ({calc.vacancyRate}%)</span>
                              <span className="tabular-nums">-{formatCurrency(calc.monthlyRent * calc.vacancyRate / 100)}</span>
                            </div>
                            <Separator />
                            <div className="flex justify-between font-medium">
                              <span>Effective Income</span>
                              <span className="tabular-nums">{formatCurrency(results.monthlyIncome)}</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2 text-destructive">Expenses</h4>
                          <div className="space-y-1.5">
                            {monthlyBreakdown.map((item) => (
                              <div key={item.name} className="flex justify-between">
                                <span className="text-muted-foreground">{item.name}</span>
                                <span className="tabular-nums">{formatCurrencyDetailed(item.value)}</span>
                              </div>
                            ))}
                            <Separator />
                            <div className="flex justify-between font-medium">
                              <span>Total Expenses</span>
                              <span className="tabular-nums">{formatCurrencyDetailed(results.monthlyExpenses)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-muted/50 rounded-lg p-4">
                        <div className="grid grid-cols-3 gap-4 text-center text-sm">
                          <div>
                            <p className="text-xs text-muted-foreground">Annual Cash Flow</p>
                            <p className="font-bold tabular-nums">{formatCurrency(results.annualCashFlow)}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">NOI</p>
                            <p className="font-bold tabular-nums">{formatCurrency(results.noi)}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Break Even</p>
                            <p className="font-bold tabular-nums">
                              {results.breakEvenMonths > 0 ? `${results.breakEvenMonths} mo` : "N/A"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="equity">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">10-Year Equity & Returns Projection</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-72 mb-6">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={equityGrowth}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                          <XAxis dataKey="year" tick={{ fontSize: 11 }} />
                          <YAxis tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`} tick={{ fontSize: 11 }} />
                          <Tooltip formatter={(v) => formatCurrency(v as number)} contentStyle={{ borderRadius: "0.5rem", border: "1px solid #E2E8F0", fontSize: "0.75rem" }} />
                          <Area type="monotone" dataKey="propertyValue" name="Property Value" stroke="#1E3A5F" fill="#1E3A5F" fillOpacity={0.1} />
                          <Area type="monotone" dataKey="cumulativeCashFlow" name="Cumulative Cash Flow" stroke="#10B981" fill="#10B981" fillOpacity={0.1} />
                          <Area type="monotone" dataKey="totalReturn" name="Total Return" stroke="#0E7490" fill="#0E7490" fillOpacity={0.1} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { label: "Year 1 Equity", value: formatCurrency(results.equityYear1) },
                        { label: "Year 5 Equity", value: formatCurrency(results.equityYear5) },
                        { label: "Year 10 Equity", value: formatCurrency(results.equityYear10) },
                        { label: "5-Year Total Return", value: formatCurrency(results.totalReturnYear5) },
                        { label: "10-Year Total Return", value: formatCurrency(results.totalReturnYear10) },
                        { label: "Appreciation Rate", value: `${calc.appreciationRate}% annually` },
                      ].map((item) => (
                        <div key={item.label} className="bg-muted/50 rounded-lg p-3 text-center">
                          <p className="text-xs text-muted-foreground">{item.label}</p>
                          <p className="text-sm font-bold tabular-nums mt-1">{item.value}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="returns">
                <div className="grid md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Return Metrics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          { label: "Cash-on-Cash Return", value: formatPercentDetailed(results.cashOnCash), desc: "Annual cash flow / total cash invested", threshold: 8, met: results.cashOnCash >= 8 },
                          { label: "Cap Rate", value: formatPercentDetailed(results.capRate), desc: "NOI / purchase price", threshold: 6, met: results.capRate >= 6 },
                          { label: "DSCR", value: results.dscr.toFixed(2) + "x", desc: "NOI / annual debt service", threshold: 1.25, met: results.dscr >= 1.25 },
                          { label: "Total ROI", value: formatPercentDetailed(results.roi), desc: "Total return / cash invested", threshold: 15, met: results.roi >= 15 },
                        ].map((metric) => (
                          <div key={metric.label} className="flex items-start justify-between p-3 rounded-lg bg-muted/50">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">{metric.label}</span>
                                {metric.met ? (
                                  <Badge variant="success" className="text-[10px]">Above Target</Badge>
                                ) : (
                                  <Badge variant="destructive" className="text-[10px]">Below Target</Badge>
                                )}
                              </div>
                              <p className="text-xs text-muted-foreground mt-0.5">{metric.desc}</p>
                            </div>
                            <span className={`text-xl font-bold tabular-nums ${metric.met ? "text-accent" : "text-destructive"}`}>
                              {metric.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Deal Viability Check</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {[
                          { test: "Positive Cash Flow", pass: results.monthlyCashFlow > 0, detail: `${formatCurrency(results.monthlyCashFlow)}/mo` },
                          { test: "1% Rule", pass: (calc.monthlyRent / calc.purchasePrice * 100) >= 1, detail: `${((calc.monthlyRent / calc.purchasePrice) * 100).toFixed(2)}%` },
                          { test: "Cash-on-Cash > 8%", pass: results.cashOnCash >= 8, detail: formatPercent(results.cashOnCash) },
                          { test: "Cap Rate > 6%", pass: results.capRate >= 6, detail: formatPercent(results.capRate) },
                          { test: "DSCR > 1.25x", pass: results.dscr >= 1.25, detail: results.dscr.toFixed(2) + "x" },
                          { test: "Break Even < 10 Years", pass: results.breakEvenMonths > 0 && results.breakEvenMonths <= 120, detail: results.breakEvenMonths > 0 ? `${results.breakEvenMonths} months` : "N/A" },
                        ].map((item) => (
                          <div key={item.test} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              {item.pass ? (
                                <CheckCircle2 className="h-5 w-5 text-accent" />
                              ) : (
                                <XCircle className="h-5 w-5 text-destructive" />
                              )}
                              <span className="text-sm">{item.test}</span>
                            </div>
                            <span className={`text-sm font-medium tabular-nums ${item.pass ? "text-accent" : "text-destructive"}`}>
                              {item.detail}
                            </span>
                          </div>
                        ))}
                        <Separator />
                        <div className="bg-muted/50 rounded-lg p-3 text-center">
                          <p className="text-xs text-muted-foreground mb-1">Overall Assessment</p>
                          {[
                            results.monthlyCashFlow > 0,
                            results.cashOnCash >= 8,
                            results.capRate >= 6,
                            results.dscr >= 1.25,
                          ].filter(Boolean).length >= 3 ? (
                            <Badge variant="success" className="text-sm px-4 py-1">Strong Investment</Badge>
                          ) : [
                            results.monthlyCashFlow > 0,
                            results.cashOnCash >= 8,
                            results.capRate >= 6,
                            results.dscr >= 1.25,
                          ].filter(Boolean).length >= 2 ? (
                            <Badge variant="warning" className="text-sm px-4 py-1">Moderate Investment</Badge>
                          ) : (
                            <Badge variant="destructive" className="text-sm px-4 py-1">Weak Investment</Badge>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <div className="mt-8">
          <Disclaimer />
        </div>
      </main>

      <Footer />
    </div>
  );
}

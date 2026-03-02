"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { savedDeals } from "@/data/properties";
import { formatCurrency, formatPercent } from "@/lib/utils";
import { TrendingUp, DollarSign, PieChart, BarChart3 } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

export function PortfolioAnalytics() {
  const deals = savedDeals;

  // Calculate metrics
  const totalValue = deals.reduce((sum, d) => sum + d.property.price, 0);
  const totalMonthlyCF = deals.reduce((sum, d) => sum + d.analysis.monthlyCashFlow, 0);
  const avgCapRate = deals.reduce((sum, d) => sum + d.analysis.capRate, 0) / deals.length;

  // Cap rate comparison bar chart
  const capRateData = deals.map((d) => ({
    name: d.property.address.split(" ").slice(0, 2).join(" "),
    capRate: parseFloat(d.analysis.capRate.toFixed(1)),
    fill: d.analysis.capRate >= 6 ? "#10B981" : d.analysis.capRate >= 4 ? "#F59E0B" : "#EF4444",
  }));

  // Cash-on-cash return pie chart
  const cocData = deals.map((d) => ({
    name: d.property.address.split(" ").slice(0, 2).join(" "),
    value: Math.max(0, parseFloat(d.analysis.cashOnCash.toFixed(1))),
  }));
  const cocColors = ["#1E3A5F", "#0E7490", "#10B981", "#F59E0B", "#8B5CF6", "#EC4899"];

  // Property value area chart over time (mock 12-month data)
  const months = ["Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb"];
  const valueOverTime = months.map((month, i) => {
    const appreciation = 1 + (i * 0.004);
    return {
      month,
      value: Math.round(totalValue * appreciation),
    };
  });

  // Portfolio diversification donut chart
  const typeMap: Record<string, number> = {};
  deals.forEach((d) => {
    const type = d.property.propertyType;
    typeMap[type] = (typeMap[type] || 0) + 1;
  });
  const typeLabels: Record<string, string> = {
    single_family: "Single Family",
    multi_family: "Multi Family",
    condo: "Condo",
    townhouse: "Townhouse",
    land: "Land",
  };
  const diversificationData = Object.entries(typeMap).map(([type, count]) => ({
    name: typeLabels[type] || type,
    value: count,
  }));
  const diversificationColors = ["#1E3A5F", "#0E7490", "#10B981", "#F59E0B", "#8B5CF6"];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Summary Stats */}
      <motion.div variants={itemVariants} className="grid grid-cols-3 gap-4">
        <Card className="p-4 text-center">
          <DollarSign className="h-5 w-5 text-primary mx-auto mb-1" />
          <p className="text-xs text-muted-foreground">Total Value</p>
          <p className="text-lg font-bold text-primary tabular-nums">{formatCurrency(totalValue)}</p>
        </Card>
        <Card className="p-4 text-center">
          <TrendingUp className="h-5 w-5 text-accent mx-auto mb-1" />
          <p className="text-xs text-muted-foreground">Monthly Cash Flow</p>
          <p className="text-lg font-bold text-accent tabular-nums">{formatCurrency(totalMonthlyCF)}/mo</p>
        </Card>
        <Card className="p-4 text-center">
          <BarChart3 className="h-5 w-5 text-secondary mx-auto mb-1" />
          <p className="text-xs text-muted-foreground">Avg Cap Rate</p>
          <p className="text-lg font-bold text-secondary tabular-nums">{formatPercent(avgCapRate)}</p>
        </Card>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Cap Rate Comparison */}
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-primary" />
                Cap Rate Comparison
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-52">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={capRateData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                    <XAxis type="number" tick={{ fontSize: 11 }} stroke="#94A3B8" unit="%" />
                    <YAxis type="category" dataKey="name" tick={{ fontSize: 10 }} stroke="#94A3B8" width={70} />
                    <Tooltip
                      formatter={(v) => `${v}%`}
                      contentStyle={{ borderRadius: "0.5rem", border: "1px solid #E2E8F0", fontSize: "0.75rem" }}
                    />
                    <Bar dataKey="capRate" radius={[0, 4, 4, 0]} name="Cap Rate">
                      {capRateData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Cash-on-Cash Pie */}
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <PieChart className="h-4 w-4 text-secondary" />
                Cash-on-Cash Return
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-52">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={cocData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={70}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {cocData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={cocColors[index % cocColors.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(v) => `${v}%`}
                      contentStyle={{ borderRadius: "0.5rem", border: "1px solid #E2E8F0", fontSize: "0.75rem" }}
                    />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Portfolio Value Over Time */}
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-accent" />
                  Portfolio Value
                </CardTitle>
                <Badge variant="secondary" className="text-[10px]">12 Months</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-52">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={valueOverTime}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                    <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="#94A3B8" />
                    <YAxis
                      tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`}
                      tick={{ fontSize: 11 }}
                      stroke="#94A3B8"
                    />
                    <Tooltip
                      formatter={(v) => formatCurrency(v as number)}
                      contentStyle={{ borderRadius: "0.5rem", border: "1px solid #E2E8F0", fontSize: "0.75rem" }}
                    />
                    <Area type="monotone" dataKey="value" stroke="#10B981" fill="#10B981" fillOpacity={0.1} strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Diversification Donut */}
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <PieChart className="h-4 w-4 text-primary" />
                Diversification
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-40 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={diversificationData}
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={65}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {diversificationData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={diversificationColors[index % diversificationColors.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: "0.5rem", border: "1px solid #E2E8F0", fontSize: "0.75rem" }} />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-1.5 mt-2">
                {diversificationData.map((item, i) => (
                  <div key={item.name} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: diversificationColors[i % diversificationColors.length] }} />
                      <span className="text-muted-foreground">{item.name}</span>
                    </div>
                    <span className="font-medium tabular-nums">{item.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}

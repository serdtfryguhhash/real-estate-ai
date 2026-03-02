"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatCurrency, formatPercent, generateId } from "@/lib/utils";
import { calculateInvestment } from "@/lib/calculations";
import { InvestmentCalc } from "@/types";
import {
  BookMarked,
  Save,
  Trash2,
  GitCompareArrows,
  X,
  CheckCircle2,
  XCircle,
} from "lucide-react";

const SCENARIO_KEY = "scenario_library";

interface SavedScenario {
  id: string;
  name: string;
  params: InvestmentCalc;
  savedAt: string;
}

function getScenarios(): SavedScenario[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(SCENARIO_KEY);
  if (!stored) return [];
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
}

function saveScenarios(scenarios: SavedScenario[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(SCENARIO_KEY, JSON.stringify(scenarios));
}

interface ScenarioLibraryProps {
  currentParams?: InvestmentCalc;
}

export function ScenarioLibrary({ currentParams }: ScenarioLibraryProps) {
  const [scenarios, setScenarios] = useState<SavedScenario[]>([]);
  const [scenarioName, setScenarioName] = useState("");
  const [showSave, setShowSave] = useState(false);
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [showCompare, setShowCompare] = useState(false);

  useEffect(() => {
    const stored = getScenarios();
    if (stored.length === 0 && currentParams) {
      // Seed with some demo scenarios
      const seeded: SavedScenario[] = [
        {
          id: generateId(),
          name: "Conservative (30% Down)",
          params: { ...currentParams, downPaymentPercent: 30, interestRate: 6.95, rehabCost: 10000 },
          savedAt: "2026-02-20T10:00:00Z",
        },
        {
          id: generateId(),
          name: "Aggressive (15% Down)",
          params: { ...currentParams, downPaymentPercent: 15, interestRate: 7.25, rehabCost: 25000 },
          savedAt: "2026-02-22T10:00:00Z",
        },
        {
          id: generateId(),
          name: "Full Rehab Play",
          params: { ...currentParams, downPaymentPercent: 25, rehabCost: 50000, monthlyRent: 2800 },
          savedAt: "2026-02-25T10:00:00Z",
        },
      ];
      saveScenarios(seeded);
      setScenarios(seeded);
    } else {
      setScenarios(stored);
    }
  }, [currentParams]);

  const handleSave = () => {
    if (!scenarioName.trim() || !currentParams) return;
    const newScenario: SavedScenario = {
      id: generateId(),
      name: scenarioName.trim(),
      params: currentParams,
      savedAt: new Date().toISOString(),
    };
    const updated = [newScenario, ...scenarios];
    setScenarios(updated);
    saveScenarios(updated);
    setScenarioName("");
    setShowSave(false);
  };

  const handleDelete = (id: string) => {
    const updated = scenarios.filter((s) => s.id !== id);
    setScenarios(updated);
    saveScenarios(updated);
    setCompareIds((prev) => prev.filter((x) => x !== id));
  };

  const toggleCompare = (id: string) => {
    setCompareIds((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= 2) return [prev[1], id];
      return [...prev, id];
    });
  };

  const compareScenarios = compareIds
    .map((id) => scenarios.find((s) => s.id === id))
    .filter(Boolean) as SavedScenario[];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const }}
    >
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <BookMarked className="h-4 w-4 text-primary" />
              Scenario Library
              <Badge variant="secondary" className="text-[10px]">{scenarios.length} saved</Badge>
            </CardTitle>
            <div className="flex gap-1.5">
              {compareIds.length === 2 && (
                <Button size="sm" variant="outline" onClick={() => setShowCompare(!showCompare)}>
                  <GitCompareArrows className="h-3.5 w-3.5 mr-1" />
                  Compare
                </Button>
              )}
              <Button size="sm" onClick={() => setShowSave(!showSave)}>
                <Save className="h-3.5 w-3.5 mr-1" />
                Save Current
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Save Form */}
          <AnimatePresence>
            {showSave && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] as const }}
                className="mb-4 pb-4 border-b border-border"
              >
                <div className="flex gap-2">
                  <Input
                    placeholder="Scenario name..."
                    value={scenarioName}
                    onChange={(e) => setScenarioName(e.target.value)}
                    className="h-8 text-sm"
                    onKeyDown={(e) => e.key === "Enter" && handleSave()}
                  />
                  <Button size="sm" onClick={handleSave}>Save</Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Scenario List */}
          <div className="space-y-2">
            {scenarios.map((scenario) => {
              const results = calculateInvestment(scenario.params);
              return (
                <div
                  key={scenario.id}
                  className={`p-3 rounded-lg border transition-colors cursor-pointer ${
                    compareIds.includes(scenario.id) ? "border-primary/30 bg-primary/5" : "border-transparent hover:bg-muted/50"
                  }`}
                  onClick={() => toggleCompare(scenario.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium">{scenario.name}</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0"
                      onClick={(e) => { e.stopPropagation(); handleDelete(scenario.id); }}
                    >
                      <Trash2 className="h-3 w-3 text-muted-foreground" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-4 gap-2 text-[11px]">
                    <div>
                      <span className="text-muted-foreground">Down</span>
                      <p className="font-medium tabular-nums">{scenario.params.downPaymentPercent}%</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Rate</span>
                      <p className="font-medium tabular-nums">{scenario.params.interestRate}%</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Rehab</span>
                      <p className="font-medium tabular-nums">{formatCurrency(scenario.params.rehabCost)}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Cash Flow</span>
                      <p className={`font-medium tabular-nums ${results.monthlyCashFlow >= 0 ? "text-accent" : "text-destructive"}`}>
                        {formatCurrency(results.monthlyCashFlow)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
            {scenarios.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-6">
                No saved scenarios yet. Adjust the calculator and save your first scenario.
              </p>
            )}
          </div>

          {/* Comparison Table */}
          <AnimatePresence>
            {showCompare && compareScenarios.length === 2 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as const }}
                className="mt-4 pt-4 border-t border-border"
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-semibold flex items-center gap-1.5">
                    <GitCompareArrows className="h-3.5 w-3.5 text-primary" />
                    Scenario Comparison
                  </h4>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => { setShowCompare(false); setCompareIds([]); }}>
                    <X className="h-3.5 w-3.5" />
                  </Button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-1.5 text-muted-foreground font-medium">Metric</th>
                        {compareScenarios.map((s) => (
                          <th key={s.id} className="text-right py-1.5 font-medium">{s.name}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {(() => {
                        const results = compareScenarios.map((s) => calculateInvestment(s.params));
                        const metrics = [
                          { label: "Down Payment", vals: results.map((r) => formatCurrency(r.downPayment)) },
                          { label: "Monthly Mortgage", vals: results.map((r) => formatCurrency(r.monthlyMortgage)) },
                          { label: "Monthly Cash Flow", vals: results.map((r) => formatCurrency(r.monthlyCashFlow)), highlight: results.map((r) => r.monthlyCashFlow >= 0) },
                          { label: "Cash-on-Cash", vals: results.map((r) => formatPercent(r.cashOnCash)), highlight: results.map((r) => r.cashOnCash >= 8) },
                          { label: "Cap Rate", vals: results.map((r) => formatPercent(r.capRate)), highlight: results.map((r) => r.capRate >= 6) },
                          { label: "DSCR", vals: results.map((r) => `${r.dscr.toFixed(2)}x`), highlight: results.map((r) => r.dscr >= 1.25) },
                          { label: "Total Cash In", vals: results.map((r) => formatCurrency(r.totalCashInvested)) },
                          { label: "5yr Return", vals: results.map((r) => formatCurrency(r.totalReturnYear5)) },
                        ];
                        return metrics.map((m) => (
                          <tr key={m.label} className="border-b border-border/50">
                            <td className="py-1.5 text-muted-foreground">{m.label}</td>
                            {m.vals.map((v, i) => (
                              <td key={i} className={`py-1.5 text-right tabular-nums font-medium ${
                                m.highlight ? (m.highlight[i] ? "text-accent" : "text-destructive") : ""
                              }`}>
                                {v}
                              </td>
                            ))}
                          </tr>
                        ));
                      })()}
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

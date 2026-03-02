"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { savedDeals } from "@/data/properties";
import { formatCurrency, formatPercent } from "@/lib/utils";
import {
  Share2,
  Copy,
  Download,
  CheckCircle2,
  Building2,
  TrendingUp,
  Briefcase,
  DollarSign,
} from "lucide-react";

export function ShareCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  const deals = savedDeals;
  const totalValue = deals.reduce((sum, d) => sum + d.property.price, 0);
  const totalMonthlyCF = deals.reduce((sum, d) => sum + d.analysis.monthlyCashFlow, 0);
  const avgCapRate = deals.reduce((sum, d) => sum + d.analysis.capRate, 0) / deals.length;
  const avgScore = deals.reduce((sum, d) => sum + d.analysis.dealScore, 0) / deals.length;

  const shareText = `My DealFinder AI Portfolio: ${deals.length} properties, ${formatCurrency(totalMonthlyCF)}/mo cash flow, ${formatCurrency(totalValue)} total value, analyzed ${deals.length}+ deals. Average deal score: ${avgScore.toFixed(0)}/100. #RealEstateInvesting #DealFinderAI`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const textArea = document.createElement("textarea");
      textArea.value = shareText;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = async () => {
    // Create a simple text-based download
    const blob = new Blob([shareText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "dealfinder-portfolio-card.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const }}
    >
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <Share2 className="h-4 w-4 text-primary" />
            Share Your Portfolio
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Visual Card */}
          <div
            ref={cardRef}
            className="bg-gradient-to-br from-primary via-primary/90 to-secondary rounded-xl p-5 text-white mb-4"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-lg bg-white/20 flex items-center justify-center">
                <Building2 className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-bold">DealFinder AI</p>
                <p className="text-[10px] text-white/60">Investment Portfolio</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-white/10 rounded-lg p-3">
                <div className="flex items-center gap-1.5 mb-1">
                  <Briefcase className="h-3.5 w-3.5 text-white/70" />
                  <span className="text-[10px] text-white/70">Properties</span>
                </div>
                <p className="text-xl font-bold tabular-nums">{deals.length}</p>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <div className="flex items-center gap-1.5 mb-1">
                  <DollarSign className="h-3.5 w-3.5 text-white/70" />
                  <span className="text-[10px] text-white/70">Monthly CF</span>
                </div>
                <p className="text-xl font-bold tabular-nums">{formatCurrency(totalMonthlyCF)}</p>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <div className="flex items-center gap-1.5 mb-1">
                  <TrendingUp className="h-3.5 w-3.5 text-white/70" />
                  <span className="text-[10px] text-white/70">Total Value</span>
                </div>
                <p className="text-xl font-bold tabular-nums">{formatCurrency(totalValue)}</p>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <div className="flex items-center gap-1.5 mb-1">
                  <TrendingUp className="h-3.5 w-3.5 text-white/70" />
                  <span className="text-[10px] text-white/70">Avg Cap Rate</span>
                </div>
                <p className="text-xl font-bold tabular-nums">{formatPercent(avgCapRate)}</p>
              </div>
            </div>

            <div className="border-t border-white/20 pt-3 flex items-center justify-between">
              <p className="text-[10px] text-white/50">dealfinder.ai</p>
              <Badge className="bg-white/20 text-white border-0 text-[10px]">
                Score: {avgScore.toFixed(0)}/100
              </Badge>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1" onClick={handleCopy}>
              {copied ? (
                <>
                  <CheckCircle2 className="h-4 w-4 mr-1.5 text-accent" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-1.5" />
                  Copy Text
                </>
              )}
            </Button>
            <Button variant="outline" className="flex-1" onClick={handleDownload}>
              <Download className="h-4 w-4 mr-1.5" />
              Download
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

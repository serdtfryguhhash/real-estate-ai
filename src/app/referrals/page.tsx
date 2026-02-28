"use client";

import React, { useState } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { formatCurrency, formatDate } from "@/lib/utils";
import {
  Gift, Copy, Users, DollarSign, TrendingUp,
  Check, Mail, Twitter, Linkedin, Link2,
} from "lucide-react";

const referralData = [
  { email: "sarah.j@email.com", plan: "Pro", status: "active" as const, commission: 19.80, date: "2026-02-15" },
  { email: "mike.t@email.com", plan: "Investor", status: "active" as const, commission: 9.80, date: "2026-02-01" },
  { email: "jessica.l@email.com", plan: "Pro", status: "pending" as const, commission: 0, date: "2026-02-25" },
  { email: "david.r@email.com", plan: "Investor", status: "active" as const, commission: 9.80, date: "2026-01-10" },
];

export default function ReferralsPage() {
  const [copied, setCopied] = useState(false);
  const referralLink = "https://dealfinder.ai/r/JOHN-SMITH-2026";
  const totalEarned = referralData.reduce((sum, r) => sum + r.commission, 0);
  const activeReferrals = referralData.filter((r) => r.status === "active").length;

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Gift className="h-6 w-6 text-primary" />
            Affiliate Program
          </h1>
          <p className="text-muted-foreground">Earn 20% recurring commission for every referral</p>
        </div>

        {/* Hero Card */}
        <Card className="bg-gradient-to-br from-primary to-secondary text-white p-8 mb-8 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
          <div className="relative">
            <h2 className="text-2xl font-bold mb-2">Earn 20% Recurring Commission</h2>
            <p className="text-white/80 mb-6 max-w-lg">
              Share DealFinder with fellow investors and earn 20% of their subscription fee every month, for as long as they remain active. No cap on earnings.
            </p>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <Label className="text-white/70 text-xs mb-2 block">Your Referral Link</Label>
              <div className="flex gap-2">
                <Input
                  value={referralLink}
                  readOnly
                  className="bg-white/10 border-white/20 text-white font-mono text-sm"
                />
                <Button onClick={handleCopy} variant="accent">
                  {copied ? <><Check className="h-4 w-4 mr-2" /> Copied!</> : <><Copy className="h-4 w-4 mr-2" /> Copy</>}
                </Button>
              </div>
            </div>
            <div className="flex gap-3 mt-4">
              <Button size="sm" variant="outline" className="border-white/30 text-white hover:bg-white/10 hover:text-white">
                <Twitter className="h-4 w-4 mr-2" /> Twitter
              </Button>
              <Button size="sm" variant="outline" className="border-white/30 text-white hover:bg-white/10 hover:text-white">
                <Linkedin className="h-4 w-4 mr-2" /> LinkedIn
              </Button>
              <Button size="sm" variant="outline" className="border-white/30 text-white hover:bg-white/10 hover:text-white">
                <Mail className="h-4 w-4 mr-2" /> Email
              </Button>
            </div>
          </div>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-4 text-center">
            <DollarSign className="h-5 w-5 text-accent mx-auto mb-1" />
            <p className="text-xs text-muted-foreground">Total Earned</p>
            <p className="text-xl font-bold text-accent tabular-nums">{formatCurrency(totalEarned)}</p>
          </Card>
          <Card className="p-4 text-center">
            <Users className="h-5 w-5 text-primary mx-auto mb-1" />
            <p className="text-xs text-muted-foreground">Active Referrals</p>
            <p className="text-xl font-bold text-primary">{activeReferrals}</p>
          </Card>
          <Card className="p-4 text-center">
            <TrendingUp className="h-5 w-5 text-secondary mx-auto mb-1" />
            <p className="text-xs text-muted-foreground">Monthly Revenue</p>
            <p className="text-xl font-bold text-secondary tabular-nums">{formatCurrency(totalEarned)}</p>
          </Card>
          <Card className="p-4 text-center">
            <Link2 className="h-5 w-5 text-purple-500 mx-auto mb-1" />
            <p className="text-xs text-muted-foreground">Link Clicks</p>
            <p className="text-xl font-bold text-purple-500">147</p>
          </Card>
        </div>

        {/* How it works */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-base">How It Works</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { step: "1", title: "Share Your Link", desc: "Send your unique referral link to investors who could benefit from DealFinder." },
                { step: "2", title: "They Sign Up", desc: "When they subscribe to any paid plan, you are credited as the referrer." },
                { step: "3", title: "Earn 20% Monthly", desc: "Receive 20% of their subscription every month, for as long as they are active." },
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center font-bold mx-auto mb-3">
                    {item.step}
                  </div>
                  <h3 className="font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
            <Separator className="my-6" />
            <div className="grid grid-cols-3 gap-4 text-center text-sm">
              <div className="bg-muted/50 rounded-lg p-3">
                <p className="text-muted-foreground">Investor Plan</p>
                <p className="font-bold text-accent tabular-nums">$9.80/mo per referral</p>
              </div>
              <div className="bg-muted/50 rounded-lg p-3">
                <p className="text-muted-foreground">Pro Plan</p>
                <p className="font-bold text-accent tabular-nums">$19.80/mo per referral</p>
              </div>
              <div className="bg-muted/50 rounded-lg p-3">
                <p className="text-muted-foreground">Fund Plan</p>
                <p className="font-bold text-accent tabular-nums">$49.80/mo per referral</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Referral Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Your Referrals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-3 font-medium text-muted-foreground">Email</th>
                    <th className="text-left py-3 px-3 font-medium text-muted-foreground">Plan</th>
                    <th className="text-left py-3 px-3 font-medium text-muted-foreground">Status</th>
                    <th className="text-right py-3 px-3 font-medium text-muted-foreground">Monthly Commission</th>
                    <th className="text-right py-3 px-3 font-medium text-muted-foreground">Referred Date</th>
                  </tr>
                </thead>
                <tbody>
                  {referralData.map((ref, i) => (
                    <tr key={i} className="border-b border-border/50">
                      <td className="py-3 px-3 font-medium">{ref.email}</td>
                      <td className="py-3 px-3"><Badge variant="secondary">{ref.plan}</Badge></td>
                      <td className="py-3 px-3">
                        <Badge variant={ref.status === "active" ? "success" : "warning"}>
                          {ref.status.charAt(0).toUpperCase() + ref.status.slice(1)}
                        </Badge>
                      </td>
                      <td className="py-3 px-3 text-right tabular-nums font-medium text-accent">
                        {ref.commission > 0 ? formatCurrency(ref.commission) : "—"}
                      </td>
                      <td className="py-3 px-3 text-right text-muted-foreground">{formatDate(ref.date)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
}

function Label({ children, className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return <label className={`text-sm font-medium ${className || ""}`} {...props}>{children}</label>;
}

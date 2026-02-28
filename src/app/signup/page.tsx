"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Building2, Mail, Lock, ArrowRight, Check } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      router.push("/dashboard");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] py-12 px-4">
        <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-8 items-center">
          {/* Benefits */}
          <div className="hidden lg:block space-y-8 pr-8">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">Start Finding Deals Today</h2>
              <p className="text-muted-foreground">Join thousands of investors using AI to make smarter decisions.</p>
            </div>
            <div className="space-y-4">
              {[
                "AI deal scoring on every property (1-100 score)",
                "Automated comparable sales analysis",
                "Rehab cost estimates in seconds",
                "Interactive map with heatmaps",
                "Investment calculator with full projections",
                "Deal alerts — never miss an opportunity",
              ].map((benefit) => (
                <div key={benefit} className="flex items-center gap-3">
                  <div className="h-6 w-6 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Check className="h-3.5 w-3.5 text-accent" />
                  </div>
                  <span className="text-sm text-foreground">{benefit}</span>
                </div>
              ))}
            </div>
            <div className="bg-primary/5 rounded-lg p-4 border border-primary/10">
              <p className="text-sm text-muted-foreground">
                &ldquo;DealFinder AI helped me close 3 profitable deals in my first month. The AI scoring is incredibly accurate.&rdquo;
              </p>
              <p className="text-sm font-medium mt-2">— Marcus T., Austin TX</p>
            </div>
          </div>

          {/* Form */}
          <Card>
            <CardHeader className="text-center space-y-2">
              <div className="mx-auto h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-2">
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-2xl">Create Your Account</CardTitle>
              <CardDescription>Free plan includes 5 deal analyses per month</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="John" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Smith" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="email" type="email" placeholder="investor@example.com" className="pl-10" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="password" type="password" placeholder="Min. 8 characters" className="pl-10" required />
                  </div>
                </div>
                <Button type="submit" className="w-full" size="lg" disabled={loading}>
                  {loading ? "Creating account..." : "Create Free Account"}
                  {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
                </Button>
                <p className="text-xs text-center text-muted-foreground">
                  By signing up, you agree to our Terms of Service and Privacy Policy.
                </p>
              </form>

              <p className="text-center text-sm text-muted-foreground mt-6">
                Already have an account?{" "}
                <Link href="/login" className="text-primary font-medium hover:underline">Sign in</Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

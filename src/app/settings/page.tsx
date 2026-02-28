"use client";

import React, { useState } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  User, CreditCard, Trash2,
  Save, Check, ExternalLink, Copy, Key,
} from "lucide-react";

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">Manage your account preferences</p>
        </div>

        <Tabs defaultValue="profile">
          <TabsList className="mb-6">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
            <TabsTrigger value="api">API</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Personal Information</CardTitle>
                  <CardDescription>Update your profile details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                      <User className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <Button variant="outline" size="sm">Change Photo</Button>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>First Name</Label>
                      <Input defaultValue="John" />
                    </div>
                    <div className="space-y-2">
                      <Label>Last Name</Label>
                      <Input defaultValue="Smith" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input defaultValue="john@investorpro.com" type="email" />
                  </div>
                  <div className="space-y-2">
                    <Label>Phone</Label>
                    <Input defaultValue="(512) 555-0142" type="tel" />
                  </div>
                  <div className="space-y-2">
                    <Label>Investment Focus</Label>
                    <Select defaultValue="buy_hold">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="buy_hold">Buy & Hold</SelectItem>
                        <SelectItem value="flip">Fix & Flip</SelectItem>
                        <SelectItem value="wholesale">Wholesale</SelectItem>
                        <SelectItem value="brrrr">BRRRR</SelectItem>
                        <SelectItem value="mixed">Mixed Strategy</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Target Markets</Label>
                    <Input defaultValue="Austin TX, Tampa FL, Charlotte NC" />
                  </div>
                  <Button onClick={handleSave}>
                    {saved ? <><Check className="h-4 w-4 mr-2" /> Saved!</> : <><Save className="h-4 w-4 mr-2" /> Save Changes</>}
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Password</CardTitle>
                  <CardDescription>Change your account password</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Current Password</Label>
                    <Input type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label>New Password</Label>
                    <Input type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label>Confirm New Password</Label>
                    <Input type="password" />
                  </div>
                  <Button variant="outline">Update Password</Button>
                </CardContent>
              </Card>

              <Card className="border-destructive/30">
                <CardHeader>
                  <CardTitle className="text-base text-destructive">Danger Zone</CardTitle>
                  <CardDescription>Irreversible actions</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="destructive">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Account
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Notification Preferences</CardTitle>
                <CardDescription>Choose how and when you want to be notified</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {[
                    { label: "Deal Alert Matches", desc: "Receive notifications when new properties match your alerts", default: true },
                    { label: "Weekly Market Report", desc: "Weekly summary of market trends and top deals", default: true },
                    { label: "Price Drop Alerts", desc: "Notify when saved properties have price reductions", default: true },
                    { label: "Portfolio Updates", desc: "Updates on properties in your pipeline", default: false },
                    { label: "New Features", desc: "Learn about new platform features and improvements", default: true },
                    { label: "Marketing Emails", desc: "Promotional offers and partner deals", default: false },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">{item.label}</p>
                        <p className="text-xs text-muted-foreground">{item.desc}</p>
                      </div>
                      <Switch defaultChecked={item.default} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="billing">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Current Plan</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between p-4 bg-primary/5 rounded-lg border border-primary/10">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-lg">Pro Plan</h3>
                        <Badge variant="accent">Active</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">Unlimited deal analyses, 25 alerts, API access</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold tabular-nums">$99<span className="text-sm font-normal text-muted-foreground">/mo</span></p>
                      <p className="text-xs text-muted-foreground">Renews Mar 28, 2026</p>
                    </div>
                  </div>
                  <div className="flex gap-3 mt-4">
                    <Button variant="outline">Change Plan</Button>
                    <Button variant="ghost" className="text-destructive">Cancel Subscription</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Payment Method</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex items-center gap-3">
                      <CreditCard className="h-8 w-8 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Visa ending in 4242</p>
                        <p className="text-xs text-muted-foreground">Expires 12/2027</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Update</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Billing History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { date: "Feb 28, 2026", amount: "$99.00", status: "Paid" },
                      { date: "Jan 28, 2026", amount: "$99.00", status: "Paid" },
                      { date: "Dec 28, 2025", amount: "$99.00", status: "Paid" },
                    ].map((item) => (
                      <div key={item.date} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                        <div>
                          <p className="text-sm font-medium">{item.date}</p>
                          <p className="text-xs text-muted-foreground">Pro Plan - Monthly</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-medium tabular-nums">{item.amount}</span>
                          <Badge variant="success">{item.status}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="api">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">API Access</CardTitle>
                <CardDescription>Use the DealFinder API to integrate with your tools</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>API Key</Label>
                  <div className="flex gap-2">
                    <Input value="sk_live_df_a1b2c3d4e5f6g7h8i9j0..." readOnly className="font-mono text-sm" />
                    <Button variant="outline" size="icon">
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">Keep this key secret. Do not share it in public repositories.</p>
                </div>
                <div className="bg-muted/50 rounded-lg p-4">
                  <h4 className="text-sm font-medium mb-2">Quick Start</h4>
                  <pre className="text-xs text-muted-foreground font-mono bg-gray-900 text-green-400 rounded p-3 overflow-x-auto">
{`curl -X GET "https://api.dealfinder.ai/v1/deals" \\
  -H "Authorization: Bearer sk_live_df_..." \\
  -H "Content-Type: application/json"`}
                  </pre>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline">
                    <Key className="h-4 w-4 mr-2" />
                    Regenerate Key
                  </Button>
                  <Button variant="outline">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Documentation
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
}

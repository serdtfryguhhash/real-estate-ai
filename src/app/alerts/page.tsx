"use client";

import React, { useState } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { dealAlerts } from "@/data/properties";
import { formatCurrency, formatRelativeDate } from "@/lib/utils";
import { DealAlert } from "@/types";
import { Bell, Plus, Settings, Trash2, MapPin, Home, Clock, Zap, Search, BellRing, Check } from "lucide-react";

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<DealAlert[]>(dealAlerts);
  const [showCreate, setShowCreate] = useState(false);

  const toggleAlert = (id: string) => {
    setAlerts((prev) => prev.map((a) => a.id === id ? { ...a, active: !a.active } : a));
  };

  const deleteAlert = (id: string) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  };

  const activeCount = alerts.filter((a) => a.active).length;
  const totalMatches = alerts.reduce((sum, a) => sum + a.matchCount, 0);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Bell className="h-6 w-6 text-primary" />
              Deal Alerts
            </h1>
            <p className="text-muted-foreground">Get notified when properties match your criteria</p>
          </div>
          <Dialog open={showCreate} onOpenChange={setShowCreate}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Alert
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Create Deal Alert</DialogTitle>
                <DialogDescription>Set your criteria and we will notify you when matching deals appear.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Alert Name</Label>
                  <Input placeholder="e.g., Austin Cash Flow Deals" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label>Min Price</Label>
                    <Input type="number" placeholder="$0" />
                  </div>
                  <div className="space-y-2">
                    <Label>Max Price</Label>
                    <Input type="number" placeholder="$500,000" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label>Min Beds</Label>
                    <Select defaultValue="2">
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5].map((n) => (<SelectItem key={n} value={n.toString()}>{n}+</SelectItem>))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Min Baths</Label>
                    <Select defaultValue="1">
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {[1, 1.5, 2, 2.5, 3].map((n) => (<SelectItem key={n} value={n.toString()}>{n}+</SelectItem>))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Locations</Label>
                  <Input placeholder="e.g., Austin TX, Dallas TX" />
                </div>
                <div className="space-y-2">
                  <Label>Min Deal Score</Label>
                  <Select defaultValue="60">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {[40, 50, 60, 70, 80, 90].map((n) => (<SelectItem key={n} value={n.toString()}>{n}+</SelectItem>))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Frequency</Label>
                  <Select defaultValue="hourly">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowCreate(false)}>Cancel</Button>
                <Button onClick={() => setShowCreate(false)}>
                  <Check className="h-4 w-4 mr-2" />
                  Create Alert
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card className="p-4 text-center">
            <p className="text-sm text-muted-foreground">Active Alerts</p>
            <p className="text-2xl font-bold text-primary">{activeCount}</p>
          </Card>
          <Card className="p-4 text-center">
            <p className="text-sm text-muted-foreground">Total Matches</p>
            <p className="text-2xl font-bold text-accent">{totalMatches}</p>
          </Card>
          <Card className="p-4 text-center">
            <p className="text-sm text-muted-foreground">This Week</p>
            <p className="text-2xl font-bold text-secondary">17</p>
          </Card>
        </div>

        {/* Alert Cards */}
        <div className="space-y-4">
          {alerts.length === 0 ? (
            <Card className="p-12 text-center">
              <BellRing className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No alerts yet</h3>
              <p className="text-muted-foreground mb-4">Create your first deal alert to get notified of matching properties.</p>
              <Button onClick={() => setShowCreate(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create Alert
              </Button>
            </Card>
          ) : (
            alerts.map((alert) => (
              <Card key={alert.id} className={`overflow-hidden ${!alert.active ? "opacity-60" : ""}`}>
                <div className="flex items-stretch">
                  <div className={`w-1.5 ${alert.active ? "bg-accent" : "bg-gray-300"}`} />
                  <div className="flex-1 p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-lg">{alert.name}</h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3.5 w-3.5" />
                            {alert.locations.join(", ")}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" />
                            {alert.frequency.charAt(0).toUpperCase() + alert.frequency.slice(1)}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Switch checked={alert.active} onCheckedChange={() => toggleAlert(alert.id)} />
                        <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => deleteAlert(alert.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                      <div>
                        <p className="text-xs text-muted-foreground">Price Range</p>
                        <p className="text-sm font-medium tabular-nums">{formatCurrency(alert.minPrice)} - {formatCurrency(alert.maxPrice)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Bedrooms</p>
                        <p className="text-sm font-medium">{alert.minBeds} - {alert.maxBeds} beds</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Min Score</p>
                        <p className="text-sm font-medium">{alert.minDealScore}+</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Property Types</p>
                        <p className="text-sm font-medium capitalize">{alert.propertyTypes.join(", ").replace(/_/g, " ")}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-border">
                      <div className="flex items-center gap-4 text-sm">
                        <Badge variant="secondary">{alert.matchCount} matches found</Badge>
                        <span className="text-muted-foreground text-xs">
                          Last triggered: {formatRelativeDate(alert.lastTriggered)}
                        </span>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Search className="h-4 w-4 mr-1" />
                        View Matches
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

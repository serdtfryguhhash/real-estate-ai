import React from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  subtitle?: string;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon?: LucideIcon;
  iconColor?: string;
}

export function StatCard({ title, value, subtitle, change, changeType = "neutral", icon: Icon, iconColor }: StatCardProps) {
  return (
    <Card className="p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold tabular-nums tracking-tight" style={{ fontFeatureSettings: '"tnum"' }}>
            {value}
          </p>
          {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
          {change && (
            <p className={cn(
              "text-xs font-medium",
              changeType === "positive" && "text-accent",
              changeType === "negative" && "text-destructive",
              changeType === "neutral" && "text-muted-foreground"
            )}>
              {change}
            </p>
          )}
        </div>
        {Icon && (
          <div className={cn("p-2.5 rounded-lg", iconColor || "bg-primary/10")}>
            <Icon className={cn("h-5 w-5", iconColor ? "text-white" : "text-primary")} />
          </div>
        )}
      </div>
    </Card>
  );
}

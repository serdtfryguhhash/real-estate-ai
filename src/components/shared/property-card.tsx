"use client";

import React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DealScore } from "./deal-score";
import { formatCurrency, formatNumber, formatPercent } from "@/lib/utils";
import { DealAnalysis } from "@/types";
import { MapPin, Bed, Bath, Square, Clock, Building } from "lucide-react";

interface PropertyCardProps {
  analysis: DealAnalysis;
  compact?: boolean;
}

export function PropertyCard({ analysis, compact = false }: PropertyCardProps) {
  const { property } = analysis;

  const propertyTypeLabels: Record<string, string> = {
    single_family: "Single Family",
    multi_family: "Multi Family",
    condo: "Condo",
    townhouse: "Townhouse",
    land: "Land",
  };

  return (
    <Link href={`/deals/${property.id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group cursor-pointer border-border/50 hover:border-primary/30">
        {/* Image placeholder */}
        <div className="relative h-48 bg-gradient-to-br from-primary/20 to-secondary/20 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <Building className="h-16 w-16 text-primary/30" />
          </div>
          <div className="absolute top-3 left-3 flex gap-2">
            <Badge variant={property.status === "active" ? "success" : property.status === "pending" ? "warning" : "secondary"}>
              {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
            </Badge>
            <Badge variant="outline" className="bg-white/90 backdrop-blur-sm">
              {propertyTypeLabels[property.propertyType]}
            </Badge>
          </div>
          <div className="absolute top-3 right-3">
            <DealScore score={analysis.dealScore} size="sm" showLabel={false} />
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
            <p className="text-white font-bold text-xl tabular-nums" style={{ fontFeatureSettings: '"tnum"' }}>
              {formatCurrency(property.price)}
            </p>
            {property.price < property.listPrice && (
              <p className="text-white/70 text-xs line-through">
                {formatCurrency(property.listPrice)}
              </p>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          <div>
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
              {property.address}
            </h3>
            <div className="flex items-center gap-1 text-muted-foreground text-sm mt-0.5">
              <MapPin className="h-3.5 w-3.5" />
              <span>{property.city}, {property.state} {property.zip}</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Bed className="h-3.5 w-3.5" />
              <span>{property.bedrooms} bd</span>
            </div>
            <div className="flex items-center gap-1">
              <Bath className="h-3.5 w-3.5" />
              <span>{property.bathrooms} ba</span>
            </div>
            <div className="flex items-center gap-1">
              <Square className="h-3.5 w-3.5" />
              <span>{formatNumber(property.sqft)} sqft</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              <span>{property.daysOnMarket}d</span>
            </div>
          </div>

          {!compact && (
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-border/50">
              <div className="text-center">
                <p className="text-xs text-muted-foreground">Cap Rate</p>
                <p className="text-sm font-semibold tabular-nums text-secondary" style={{ fontFeatureSettings: '"tnum"' }}>
                  {formatPercent(analysis.capRate)}
                </p>
              </div>
              <div className="text-center">
                <p className="text-xs text-muted-foreground">Cash Flow</p>
                <p className={`text-sm font-semibold tabular-nums ${analysis.monthlyCashFlow >= 0 ? "text-accent" : "text-destructive"}`}
                  style={{ fontFeatureSettings: '"tnum"' }}>
                  {formatCurrency(analysis.monthlyCashFlow)}/mo
                </p>
              </div>
              <div className="text-center">
                <p className="text-xs text-muted-foreground">CoC Return</p>
                <p className="text-sm font-semibold tabular-nums text-primary" style={{ fontFeatureSettings: '"tnum"' }}>
                  {formatPercent(analysis.cashOnCash)}
                </p>
              </div>
            </div>
          )}
        </div>
      </Card>
    </Link>
  );
}

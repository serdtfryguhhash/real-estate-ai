"use client";

import React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DealScore } from "./deal-score";
import { formatCurrency, formatNumber, formatPercent } from "@/lib/utils";
import { DealAnalysis } from "@/types";
import { MapPin, Bed, Bath, Square, ArrowRight } from "lucide-react";

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

  const imageUrl =
    property.images && property.images.length > 0 && property.images[0].startsWith("http")
      ? property.images[0]
      : "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop";

  return (
    <Link href={`/deals/${property.id}`}>
      <Card className="premium-card overflow-hidden group cursor-pointer border-0 shadow-md hover:shadow-2xl rounded-xl bg-white">
        {/* Image section with overlays */}
        <div className="relative h-56 overflow-hidden">
          <img
            src={imageUrl}
            alt={property.address}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Gradient overlay at bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* Deal score badge -- top left */}
          <div className="absolute top-3 left-3">
            <DealScore score={analysis.dealScore} size="sm" showLabel={false} />
          </div>

          {/* Price badge -- top right */}
          <div className="absolute top-3 right-3">
            <div className="bg-white/95 backdrop-blur-sm rounded-lg px-3 py-1.5 shadow-lg">
              <p
                className="font-bold text-primary text-lg tabular-nums"
                style={{ fontFeatureSettings: '"tnum"' }}
              >
                {formatCurrency(property.price)}
              </p>
              {property.price < property.listPrice && (
                <p className="text-xs text-muted-foreground line-through text-right">
                  {formatCurrency(property.listPrice)}
                </p>
              )}
            </div>
          </div>

          {/* Bottom overlay info */}
          <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
            <div className="flex gap-2">
              <Badge
                variant={
                  property.status === "active"
                    ? "success"
                    : property.status === "pending"
                    ? "warning"
                    : "secondary"
                }
                className="shadow-sm"
              >
                {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
              </Badge>
              <Badge variant="outline" className="bg-white/90 backdrop-blur-sm text-foreground shadow-sm">
                {propertyTypeLabels[property.propertyType]}
              </Badge>
            </div>
          </div>
        </div>

        {/* Content section */}
        <div className="p-5 space-y-4">
          {/* Address */}
          <div>
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1 text-base">
              {property.address}
            </h3>
            <div className="flex items-center gap-1 text-muted-foreground text-sm mt-1">
              <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
              <span>
                {property.city}, {property.state} {property.zip}
              </span>
            </div>
          </div>

          {/* Bed / Bath / Sqft row */}
          <div className="flex items-center gap-5 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Bed className="h-4 w-4 text-primary/60" />
              <span className="font-medium text-foreground">{property.bedrooms}</span>
              <span>beds</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Bath className="h-4 w-4 text-primary/60" />
              <span className="font-medium text-foreground">{property.bathrooms}</span>
              <span>baths</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Square className="h-4 w-4 text-primary/60" />
              <span className="font-medium text-foreground">{formatNumber(property.sqft)}</span>
              <span>sqft</span>
            </div>
          </div>

          {/* Key metrics */}
          {!compact && (
            <div className="grid grid-cols-3 gap-3 pt-3 border-t border-border/50">
              <div className="bg-secondary/5 rounded-lg p-2.5 text-center">
                <p className="text-[11px] text-muted-foreground uppercase tracking-wide font-medium">
                  Cap Rate
                </p>
                <p
                  className="text-sm font-bold tabular-nums text-secondary mt-0.5"
                  style={{ fontFeatureSettings: '"tnum"' }}
                >
                  {formatPercent(analysis.capRate)}
                </p>
              </div>
              <div className="bg-accent/5 rounded-lg p-2.5 text-center">
                <p className="text-[11px] text-muted-foreground uppercase tracking-wide font-medium">
                  Cash Flow
                </p>
                <p
                  className={`text-sm font-bold tabular-nums mt-0.5 ${
                    analysis.monthlyCashFlow >= 0 ? "text-accent" : "text-destructive"
                  }`}
                  style={{ fontFeatureSettings: '"tnum"' }}
                >
                  {formatCurrency(analysis.monthlyCashFlow)}/mo
                </p>
              </div>
              <div className="bg-primary/5 rounded-lg p-2.5 text-center">
                <p className="text-[11px] text-muted-foreground uppercase tracking-wide font-medium">
                  CoC Return
                </p>
                <p
                  className="text-sm font-bold tabular-nums text-primary mt-0.5"
                  style={{ fontFeatureSettings: '"tnum"' }}
                >
                  {formatPercent(analysis.cashOnCash)}
                </p>
              </div>
            </div>
          )}

          {/* View Analysis button */}
          <Button
            variant="outline"
            className="w-full group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-300"
          >
            View Analysis
            <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </Card>
    </Link>
  );
}

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatCurrencyDetailed(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatPercent(value: number): string {
  return `${value.toFixed(1)}%`;
}

export function formatPercentDetailed(value: number): string {
  return `${value.toFixed(2)}%`;
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US").format(value);
}

export function formatCompactNumber(value: number): string {
  if (value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(1)}M`;
  }
  if (value >= 1_000) {
    return `$${(value / 1_000).toFixed(0)}K`;
  }
  return formatCurrency(value);
}

export function formatSqft(value: number): string {
  return `${new Intl.NumberFormat("en-US").format(value)} sq ft`;
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function formatRelativeDate(date: string): string {
  const now = new Date();
  const d = new Date(date);
  const diffMs = now.getTime() - d.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
}

export function getDealScoreColor(score: number): string {
  if (score >= 80) return "text-accent";
  if (score >= 60) return "text-secondary";
  if (score >= 40) return "text-warning";
  return "text-destructive";
}

export function getDealScoreBg(score: number): string {
  if (score >= 80) return "bg-accent/10 border-accent/30";
  if (score >= 60) return "bg-secondary/10 border-secondary/30";
  if (score >= 40) return "bg-warning/10 border-warning/30";
  return "bg-destructive/10 border-destructive/30";
}

export function getDealScoreLabel(score: number): string {
  if (score >= 90) return "Exceptional";
  if (score >= 80) return "Excellent";
  if (score >= 70) return "Great";
  if (score >= 60) return "Good";
  if (score >= 50) return "Fair";
  if (score >= 40) return "Below Average";
  return "Poor";
}

export function getRiskColor(risk: "low" | "moderate" | "high"): string {
  switch (risk) {
    case "low": return "text-accent bg-accent/10";
    case "moderate": return "text-warning bg-warning/10";
    case "high": return "text-destructive bg-destructive/10";
  }
}

export function getStageColor(stage: string): string {
  switch (stage) {
    case "watching": return "bg-blue-100 text-blue-700 border-blue-200";
    case "analyzing": return "bg-purple-100 text-purple-700 border-purple-200";
    case "offer": return "bg-yellow-100 text-yellow-700 border-yellow-200";
    case "contract": return "bg-orange-100 text-orange-700 border-orange-200";
    case "closed": return "bg-green-100 text-green-700 border-green-200";
    default: return "bg-gray-100 text-gray-700 border-gray-200";
  }
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

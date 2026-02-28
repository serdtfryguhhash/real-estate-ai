"use client";

import React from "react";
import { getDealScoreColor, getDealScoreLabel } from "@/lib/utils";

interface DealScoreProps {
  score: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

export function DealScore({ score, size = "md", showLabel = true }: DealScoreProps) {
  const dimensions = {
    sm: { width: 48, stroke: 3, fontSize: "text-sm", radius: 18 },
    md: { width: 72, stroke: 4, fontSize: "text-xl", radius: 28 },
    lg: { width: 120, stroke: 6, fontSize: "text-3xl", radius: 48 },
  };

  const { width, stroke, fontSize, radius } = dimensions[size];
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const getStrokeColor = (score: number) => {
    if (score >= 80) return "#10B981";
    if (score >= 60) return "#0E7490";
    if (score >= 40) return "#F59E0B";
    return "#EF4444";
  };

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative" style={{ width, height: width }}>
        <svg
          className="transform -rotate-90"
          width={width}
          height={width}
          viewBox={`0 0 ${width} ${width}`}
        >
          <circle
            cx={width / 2}
            cy={width / 2}
            r={radius}
            stroke="#E2E8F0"
            strokeWidth={stroke}
            fill="none"
          />
          <circle
            cx={width / 2}
            cy={width / 2}
            r={radius}
            stroke={getStrokeColor(score)}
            strokeWidth={stroke}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`font-bold tabular-nums ${fontSize} ${getDealScoreColor(score)}`}
            style={{ fontFeatureSettings: '"tnum"' }}>
            {score}
          </span>
        </div>
      </div>
      {showLabel && (
        <span className={`text-xs font-medium ${getDealScoreColor(score)}`}>
          {getDealScoreLabel(score)}
        </span>
      )}
    </div>
  );
}

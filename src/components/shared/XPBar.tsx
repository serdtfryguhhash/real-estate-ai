"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  getGamificationData,
  getCurrentLevel,
  getNextLevel,
  getLevelProgress,
  awardXP,
  BADGES,
  GamificationData,
} from "@/lib/gamification";
import { Trophy, Star, Zap, ChevronRight } from "lucide-react";

export function XPBar() {
  const [data, setData] = useState<GamificationData | null>(null);

  useEffect(() => {
    const result = awardXP("daily_visit");
    setData(getGamificationData());

    // Seed some initial XP for demo if brand new
    const stored = getGamificationData();
    if (stored.totalXP === 0 || stored.totalXP === 10) {
      // Simulate some past activity for demo
      for (let i = 0; i < 8; i++) awardXP("analyze_deal");
      for (let i = 0; i < 5; i++) awardXP("run_calculation");
      for (let i = 0; i < 2; i++) awardXP("save_to_portfolio");
      setData(getGamificationData());
    }
  }, []);

  if (!data) return null;

  const level = getCurrentLevel(data.totalXP);
  const nextLevel = getNextLevel(data.totalXP);
  const progress = getLevelProgress(data.totalXP);
  const earnedCount = data.earnedBadges.length;
  const totalBadges = BADGES.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const }}
      className="bg-white rounded-xl border border-border p-4 shadow-sm"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div
            className="h-8 w-8 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: `${level.color}20` }}
          >
            <Zap className="h-4 w-4" style={{ color: level.color }} />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-semibold" style={{ color: level.color }}>
                {level.name}
              </span>
              <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                {data.totalXP} XP
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              {nextLevel ? `${nextLevel.minXP - data.totalXP} XP to ${nextLevel.name}` : "Max level reached!"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Trophy className="h-3.5 w-3.5 text-yellow-500" />
          <span>
            {earnedCount}/{totalBadges}
          </span>
        </div>
      </div>

      <div className="space-y-1.5">
        <Progress value={progress} className="h-2" />
        <div className="flex justify-between text-[10px] text-muted-foreground tabular-nums">
          <span>{level.name}</span>
          {nextLevel && <span>{nextLevel.name}</span>}
        </div>
      </div>

      {/* Recent earned badges */}
      {data.earnedBadges.length > 0 && (
        <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-border/50">
          <Star className="h-3.5 w-3.5 text-yellow-500 flex-shrink-0" />
          <div className="flex gap-1 flex-wrap">
            {data.earnedBadges.slice(0, 3).map((badgeId) => {
              const badge = BADGES.find((b) => b.id === badgeId);
              if (!badge) return null;
              return (
                <Badge key={badgeId} variant="secondary" className="text-[10px]">
                  {badge.name}
                </Badge>
              );
            })}
            {data.earnedBadges.length > 3 && (
              <Badge variant="outline" className="text-[10px]">
                +{data.earnedBadges.length - 3} more
              </Badge>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
}

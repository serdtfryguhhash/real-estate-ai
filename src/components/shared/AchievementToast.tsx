"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { BADGES } from "@/lib/gamification";
import { Trophy, X, Star, Zap } from "lucide-react";

interface AchievementToastProps {
  badgeId?: string;
  pointsEarned?: number;
  levelUp?: boolean;
  levelName?: string;
  onDismiss: () => void;
}

export function AchievementToast({
  badgeId,
  pointsEarned,
  levelUp,
  levelName,
  onDismiss,
}: AchievementToastProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onDismiss, 300);
    }, 4000);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  const badge = badgeId ? BADGES.find((b) => b.id === badgeId) : null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="fixed top-4 right-4 z-[100] max-w-sm"
        >
          <div className="bg-white rounded-xl border border-border shadow-2xl p-4 flex items-start gap-3">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center flex-shrink-0">
              {levelUp ? (
                <Zap className="h-5 w-5 text-white" />
              ) : (
                <Trophy className="h-5 w-5 text-white" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              {levelUp && (
                <>
                  <p className="text-sm font-semibold text-foreground">Level Up!</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    You reached <span className="font-medium text-primary">{levelName}</span> level
                  </p>
                </>
              )}
              {badge && (
                <>
                  <p className="text-sm font-semibold text-foreground flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 text-yellow-500" />
                    Badge Unlocked!
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">{badge.name}: {badge.description}</p>
                </>
              )}
              {pointsEarned && pointsEarned > 0 && !levelUp && !badge && (
                <>
                  <p className="text-sm font-semibold text-foreground">+{pointsEarned} XP</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Keep investing to level up!</p>
                </>
              )}
            </div>
            <button
              onClick={() => {
                setVisible(false);
                setTimeout(onDismiss, 300);
              }}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

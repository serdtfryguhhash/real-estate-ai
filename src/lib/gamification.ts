"use client";

const GAMIFICATION_KEY = "investor_gamification";

export interface XPAction {
  type: "analyze_deal" | "run_calculation" | "save_to_portfolio" | "refer_investor" | "daily_visit";
  points: number;
  label: string;
}

export const XP_ACTIONS: Record<string, XPAction> = {
  analyze_deal: { type: "analyze_deal", points: 15, label: "Analyze Deal" },
  run_calculation: { type: "run_calculation", points: 10, label: "Run Calculation" },
  save_to_portfolio: { type: "save_to_portfolio", points: 25, label: "Save to Portfolio" },
  refer_investor: { type: "refer_investor", points: 100, label: "Refer Investor" },
  daily_visit: { type: "daily_visit", points: 10, label: "Daily Visit" },
};

export interface BadgeDefinition {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirement: (data: GamificationData) => boolean;
}

export const BADGES: BadgeDefinition[] = [
  {
    id: "first_analysis",
    name: "First Analysis",
    description: "Analyze your first deal",
    icon: "Search",
    requirement: (data) => data.stats.dealsAnalyzed >= 1,
  },
  {
    id: "50_deals",
    name: "50 Deals Scored",
    description: "Analyze 50 deals",
    icon: "Target",
    requirement: (data) => data.stats.dealsAnalyzed >= 50,
  },
  {
    id: "100_deals",
    name: "100 Deals Scored",
    description: "Analyze 100 deals",
    icon: "Trophy",
    requirement: (data) => data.stats.dealsAnalyzed >= 100,
  },
  {
    id: "portfolio_builder",
    name: "Portfolio Builder",
    description: "Save 5+ properties to portfolio",
    icon: "Briefcase",
    requirement: (data) => data.stats.portfolioSaves >= 5,
  },
  {
    id: "100k_portfolio",
    name: "$100K Portfolio",
    description: "Build a $100K+ portfolio",
    icon: "DollarSign",
    requirement: (data) => data.stats.portfolioValue >= 100000,
  },
];

export interface InvestorLevel {
  name: string;
  minXP: number;
  maxXP: number;
  color: string;
}

export const LEVELS: InvestorLevel[] = [
  { name: "Beginner", minXP: 0, maxXP: 199, color: "#94A3B8" },
  { name: "Investor", minXP: 200, maxXP: 599, color: "#3B82F6" },
  { name: "Analyst", minXP: 600, maxXP: 1499, color: "#8B5CF6" },
  { name: "Mogul", minXP: 1500, maxXP: 3999, color: "#F59E0B" },
  { name: "Tycoon", minXP: 4000, maxXP: Infinity, color: "#10B981" },
];

export interface GamificationData {
  totalXP: number;
  xpHistory: { action: string; points: number; date: string }[];
  earnedBadges: string[];
  stats: {
    dealsAnalyzed: number;
    calculationsRun: number;
    portfolioSaves: number;
    referrals: number;
    portfolioValue: number;
  };
  lastDailyVisit: string;
}

function getDefault(): GamificationData {
  return {
    totalXP: 0,
    xpHistory: [],
    earnedBadges: [],
    stats: {
      dealsAnalyzed: 0,
      calculationsRun: 0,
      portfolioSaves: 0,
      referrals: 0,
      portfolioValue: 0,
    },
    lastDailyVisit: "",
  };
}

export function getGamificationData(): GamificationData {
  if (typeof window === "undefined") return getDefault();
  const stored = localStorage.getItem(GAMIFICATION_KEY);
  if (!stored) return getDefault();
  try {
    return JSON.parse(stored);
  } catch {
    return getDefault();
  }
}

function saveGamificationData(data: GamificationData): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(GAMIFICATION_KEY, JSON.stringify(data));
}

export function getCurrentLevel(xp: number): InvestorLevel {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (xp >= LEVELS[i].minXP) return LEVELS[i];
  }
  return LEVELS[0];
}

export function getNextLevel(xp: number): InvestorLevel | null {
  const current = getCurrentLevel(xp);
  const index = LEVELS.indexOf(current);
  if (index < LEVELS.length - 1) return LEVELS[index + 1];
  return null;
}

export function getLevelProgress(xp: number): number {
  const current = getCurrentLevel(xp);
  const next = getNextLevel(xp);
  if (!next) return 100;
  const range = next.minXP - current.minXP;
  const progress = xp - current.minXP;
  return Math.min(100, Math.round((progress / range) * 100));
}

export interface XPResult {
  pointsEarned: number;
  newBadges: string[];
  levelUp: boolean;
  newLevel: InvestorLevel | null;
}

export function awardXP(actionType: string): XPResult {
  const data = getGamificationData();
  const action = XP_ACTIONS[actionType];
  if (!action) return { pointsEarned: 0, newBadges: [], levelUp: false, newLevel: null };

  const oldLevel = getCurrentLevel(data.totalXP);

  // Handle daily visit dedup
  if (actionType === "daily_visit") {
    const today = new Date().toISOString().split("T")[0];
    if (data.lastDailyVisit === today) {
      return { pointsEarned: 0, newBadges: [], levelUp: false, newLevel: null };
    }
    data.lastDailyVisit = today;
  }

  // Update stats
  switch (actionType) {
    case "analyze_deal":
      data.stats.dealsAnalyzed += 1;
      break;
    case "run_calculation":
      data.stats.calculationsRun += 1;
      break;
    case "save_to_portfolio":
      data.stats.portfolioSaves += 1;
      break;
    case "refer_investor":
      data.stats.referrals += 1;
      break;
  }

  data.totalXP += action.points;
  data.xpHistory.unshift({
    action: action.label,
    points: action.points,
    date: new Date().toISOString(),
  });
  data.xpHistory = data.xpHistory.slice(0, 200);

  // Check for new badges
  const newBadges: string[] = [];
  for (const badge of BADGES) {
    if (!data.earnedBadges.includes(badge.id) && badge.requirement(data)) {
      data.earnedBadges.push(badge.id);
      newBadges.push(badge.id);
    }
  }

  const newLevel = getCurrentLevel(data.totalXP);
  const levelUp = newLevel.name !== oldLevel.name;

  saveGamificationData(data);

  return {
    pointsEarned: action.points,
    newBadges,
    levelUp,
    newLevel: levelUp ? newLevel : null,
  };
}

export function updatePortfolioValue(value: number): void {
  const data = getGamificationData();
  data.stats.portfolioValue = value;

  // Check $100K badge
  for (const badge of BADGES) {
    if (!data.earnedBadges.includes(badge.id) && badge.requirement(data)) {
      data.earnedBadges.push(badge.id);
    }
  }

  saveGamificationData(data);
}

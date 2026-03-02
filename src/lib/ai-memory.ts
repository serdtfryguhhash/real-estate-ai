"use client";

const MEMORY_KEY = "ai_scout_memory";

export interface InvestmentCriteria {
  cashFlowTarget: number;
  targetAreas: string[];
  priceRange: { min: number; max: number };
  propertyTypes: string[];
  minCapRate: number;
  minCashOnCash: number;
}

export interface DealAnalysisRecord {
  propertyId: string;
  address: string;
  city: string;
  state: string;
  dealScore: number;
  capRate: number;
  cashOnCash: number;
  monthlyCashFlow: number;
  price: number;
  analyzedAt: string;
}

export interface PortfolioEntry {
  propertyId: string;
  address: string;
  city: string;
  state: string;
  price: number;
  propertyType: string;
  monthlyCashFlow: number;
  capRate: number;
}

export interface AIMemory {
  criteria: InvestmentCriteria;
  pastAnalyses: DealAnalysisRecord[];
  portfolio: PortfolioEntry[];
  favoriteNeighborhoods: string[];
  updatedAt: string;
}

function getDefaultMemory(): AIMemory {
  return {
    criteria: {
      cashFlowTarget: 500,
      targetAreas: ["Austin, TX", "Tampa, FL"],
      priceRange: { min: 100000, max: 500000 },
      propertyTypes: ["single_family", "multi_family"],
      minCapRate: 6,
      minCashOnCash: 8,
    },
    pastAnalyses: [],
    portfolio: [],
    favoriteNeighborhoods: [],
    updatedAt: new Date().toISOString(),
  };
}

export function getAIMemory(): AIMemory {
  if (typeof window === "undefined") return getDefaultMemory();
  const stored = localStorage.getItem(MEMORY_KEY);
  if (!stored) return getDefaultMemory();
  try {
    return JSON.parse(stored);
  } catch {
    return getDefaultMemory();
  }
}

export function saveAIMemory(memory: AIMemory): void {
  if (typeof window === "undefined") return;
  memory.updatedAt = new Date().toISOString();
  localStorage.setItem(MEMORY_KEY, JSON.stringify(memory));
}

export function updateCriteria(criteria: Partial<InvestmentCriteria>): void {
  const memory = getAIMemory();
  memory.criteria = { ...memory.criteria, ...criteria };
  saveAIMemory(memory);
}

export function addAnalysisRecord(record: DealAnalysisRecord): void {
  const memory = getAIMemory();
  const existing = memory.pastAnalyses.findIndex((a) => a.propertyId === record.propertyId);
  if (existing >= 0) {
    memory.pastAnalyses[existing] = record;
  } else {
    memory.pastAnalyses.unshift(record);
  }
  // Keep last 100 analyses
  memory.pastAnalyses = memory.pastAnalyses.slice(0, 100);
  saveAIMemory(memory);
}

export function addToPortfolio(entry: PortfolioEntry): void {
  const memory = getAIMemory();
  const existing = memory.portfolio.findIndex((p) => p.propertyId === entry.propertyId);
  if (existing >= 0) {
    memory.portfolio[existing] = entry;
  } else {
    memory.portfolio.push(entry);
  }
  saveAIMemory(memory);
}

export function addFavoriteNeighborhood(neighborhood: string): void {
  const memory = getAIMemory();
  if (!memory.favoriteNeighborhoods.includes(neighborhood)) {
    memory.favoriteNeighborhoods.push(neighborhood);
    saveAIMemory(memory);
  }
}

export function removeFavoriteNeighborhood(neighborhood: string): void {
  const memory = getAIMemory();
  memory.favoriteNeighborhoods = memory.favoriteNeighborhoods.filter((n) => n !== neighborhood);
  saveAIMemory(memory);
}

export function buildMemoryContext(memory: AIMemory): string {
  const parts: string[] = [];

  parts.push("=== INVESTOR PROFILE & MEMORY ===");

  // Investment criteria
  parts.push(`\nInvestment Criteria:`);
  parts.push(`- Cash flow target: $${memory.criteria.cashFlowTarget}/month`);
  parts.push(`- Target areas: ${memory.criteria.targetAreas.join(", ")}`);
  parts.push(`- Price range: $${memory.criteria.priceRange.min.toLocaleString()} - $${memory.criteria.priceRange.max.toLocaleString()}`);
  parts.push(`- Property types: ${memory.criteria.propertyTypes.join(", ")}`);
  parts.push(`- Min cap rate: ${memory.criteria.minCapRate}%`);
  parts.push(`- Min cash-on-cash: ${memory.criteria.minCashOnCash}%`);

  // Portfolio summary
  if (memory.portfolio.length > 0) {
    const totalValue = memory.portfolio.reduce((sum, p) => sum + p.price, 0);
    const totalCashFlow = memory.portfolio.reduce((sum, p) => sum + p.monthlyCashFlow, 0);
    const avgCapRate = memory.portfolio.reduce((sum, p) => sum + p.capRate, 0) / memory.portfolio.length;
    const cities = Array.from(new Set(memory.portfolio.map((p) => `${p.city}, ${p.state}`)));

    parts.push(`\nPortfolio (${memory.portfolio.length} properties):`);
    parts.push(`- Total value: $${totalValue.toLocaleString()}`);
    parts.push(`- Monthly cash flow: $${totalCashFlow.toLocaleString()}`);
    parts.push(`- Average cap rate: ${avgCapRate.toFixed(1)}%`);
    parts.push(`- Markets: ${cities.join(", ")}`);
  }

  // Recent analyses
  if (memory.pastAnalyses.length > 0) {
    const recent = memory.pastAnalyses.slice(0, 5);
    const avgScore = memory.pastAnalyses.reduce((sum, a) => sum + a.dealScore, 0) / memory.pastAnalyses.length;

    parts.push(`\nRecent Deal Analyses (${memory.pastAnalyses.length} total, avg score: ${avgScore.toFixed(0)}):`);
    recent.forEach((a) => {
      parts.push(`- ${a.address}, ${a.city}: Score ${a.dealScore}, Cap ${a.capRate.toFixed(1)}%, CF $${a.monthlyCashFlow}/mo`);
    });
  }

  // Favorite neighborhoods
  if (memory.favoriteNeighborhoods.length > 0) {
    parts.push(`\nFavorite Neighborhoods: ${memory.favoriteNeighborhoods.join(", ")}`);
  }

  parts.push("\n=== END INVESTOR PROFILE ===");
  parts.push("\nUse this context to provide personalized advice. Reference their criteria, portfolio, and past analyses when relevant.");

  return parts.join("\n");
}

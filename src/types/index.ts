export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  plan: "free" | "investor" | "pro" | "fund";
  createdAt: string;
  referralCode: string;
}

export interface Property {
  id: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  lat: number;
  lng: number;
  price: number;
  listPrice: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  lotSize: number;
  yearBuilt: number;
  propertyType: "single_family" | "multi_family" | "condo" | "townhouse" | "land";
  status: "active" | "pending" | "sold" | "off_market";
  daysOnMarket: number;
  images: string[];
  description: string;
  features: string[];
  mlsNumber: string;
  listingAgent: string;
  pricePerSqft: number;
  estimatedRent: number;
  taxAmount: number;
  hoaFee: number;
  neighborhood: string;
  walkScore: number;
  crimeScore: number;
  schoolRating: number;
}

export interface DealAnalysis {
  id: string;
  propertyId: string;
  property: Property;
  dealScore: number;
  arv: number;
  rehabCost: number;
  rehabLevel: "cosmetic" | "moderate" | "full_gut";
  discount: number;
  profitPotential: number;
  roi: number;
  capRate: number;
  cashOnCash: number;
  dscr: number;
  monthlyCashFlow: number;
  annualCashFlow: number;
  breakEvenMonths: number;
  comparables: Comparable[];
  neighborhoodTrend: "appreciating" | "stable" | "declining";
  marketTrend: number;
  riskLevel: "low" | "moderate" | "high";
  recommendation: string;
  createdAt: string;
}

export interface Comparable {
  id: string;
  address: string;
  salePrice: number;
  saleDate: string;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  distance: number;
  pricePerSqft: number;
  adjustedPrice: number;
  adjustments: {
    sqft: number;
    bedrooms: number;
    bathrooms: number;
    condition: number;
    location: number;
    age: number;
  };
}

export interface DealAlert {
  id: string;
  userId: string;
  name: string;
  minPrice: number;
  maxPrice: number;
  minBeds: number;
  maxBeds: number;
  minBaths: number;
  propertyTypes: string[];
  locations: string[];
  minDealScore: number;
  active: boolean;
  frequency: "hourly" | "daily" | "weekly";
  matchCount: number;
  lastTriggered: string;
  createdAt: string;
}

export interface SavedDeal {
  id: string;
  userId: string;
  propertyId: string;
  property: Property;
  analysis: DealAnalysis;
  stage: "watching" | "analyzing" | "offer" | "contract" | "closed";
  notes: string;
  offerAmount?: number;
  closingDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Subscription {
  id: string;
  userId: string;
  plan: "free" | "investor" | "pro" | "fund";
  status: "active" | "canceled" | "past_due";
  currentPeriodStart: string;
  currentPeriodEnd: string;
  stripeSubscriptionId: string;
}

export interface Referral {
  id: string;
  referrerId: string;
  referredId: string;
  referredEmail: string;
  status: "pending" | "active" | "paid";
  commission: number;
  plan: string;
  createdAt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  category: string;
  tags: string[];
  publishedAt: string;
  readTime: number;
}

export interface NewsletterSub {
  id: string;
  email: string;
  status: "active" | "unsubscribed";
  createdAt: string;
}

export interface InvestmentCalc {
  purchasePrice: number;
  downPaymentPercent: number;
  interestRate: number;
  loanTermYears: number;
  closingCosts: number;
  rehabCost: number;
  monthlyRent: number;
  vacancyRate: number;
  managementFee: number;
  monthlyInsurance: number;
  monthlyTax: number;
  monthlyMaintenance: number;
  hoaFee: number;
  appreciationRate: number;
}

export interface InvestmentResults {
  downPayment: number;
  loanAmount: number;
  monthlyMortgage: number;
  monthlyExpenses: number;
  monthlyIncome: number;
  monthlyCashFlow: number;
  annualCashFlow: number;
  totalCashInvested: number;
  cashOnCash: number;
  capRate: number;
  dscr: number;
  noi: number;
  roi: number;
  breakEvenMonths: number;
  equityYear1: number;
  equityYear5: number;
  equityYear10: number;
  totalReturnYear5: number;
  totalReturnYear10: number;
}

export interface MapFilter {
  minPrice: number;
  maxPrice: number;
  minBeds: number;
  maxBeds: number;
  minBaths: number;
  minScore: number;
  propertyTypes: string[];
  status: string[];
}

export interface PricingTier {
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  dealLimit: number | "unlimited";
  alertLimit: number | "unlimited";
  highlighted: boolean;
  cta: string;
  stripePriceId: string;
}

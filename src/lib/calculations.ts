import { InvestmentCalc, InvestmentResults } from "@/types";

export function calculateMonthlyMortgage(
  principal: number,
  annualRate: number,
  termYears: number
): number {
  if (annualRate === 0) return principal / (termYears * 12);
  const monthlyRate = annualRate / 100 / 12;
  const numPayments = termYears * 12;
  return (
    (principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments))) /
    (Math.pow(1 + monthlyRate, numPayments) - 1)
  );
}

export function calculateInvestment(calc: InvestmentCalc): InvestmentResults {
  const downPayment = calc.purchasePrice * (calc.downPaymentPercent / 100);
  const loanAmount = calc.purchasePrice - downPayment;
  const monthlyMortgage = calculateMonthlyMortgage(
    loanAmount,
    calc.interestRate,
    calc.loanTermYears
  );

  const grossMonthlyRent = calc.monthlyRent;
  const vacancyLoss = grossMonthlyRent * (calc.vacancyRate / 100);
  const effectiveRent = grossMonthlyRent - vacancyLoss;
  const managementCost = effectiveRent * (calc.managementFee / 100);

  const monthlyExpenses =
    monthlyMortgage +
    calc.monthlyInsurance +
    calc.monthlyTax +
    calc.monthlyMaintenance +
    calc.hoaFee +
    managementCost;

  const monthlyIncome = effectiveRent;
  const monthlyCashFlow = monthlyIncome - monthlyExpenses;
  const annualCashFlow = monthlyCashFlow * 12;

  const totalCashInvested = downPayment + calc.closingCosts + calc.rehabCost;

  const annualOperatingExpenses =
    (calc.monthlyInsurance +
      calc.monthlyTax +
      calc.monthlyMaintenance +
      calc.hoaFee +
      managementCost +
      vacancyLoss) * 12;

  const annualGrossIncome = grossMonthlyRent * 12;
  const noi = annualGrossIncome - annualOperatingExpenses;

  const cashOnCash = totalCashInvested > 0 ? (annualCashFlow / totalCashInvested) * 100 : 0;
  const capRate = calc.purchasePrice > 0 ? (noi / calc.purchasePrice) * 100 : 0;
  const dscr = monthlyMortgage > 0 ? noi / (monthlyMortgage * 12) : 0;
  const roi = totalCashInvested > 0 ? ((annualCashFlow + (calc.purchasePrice * calc.appreciationRate / 100)) / totalCashInvested) * 100 : 0;

  const breakEvenMonths = monthlyCashFlow > 0 ? Math.ceil(totalCashInvested / monthlyCashFlow) : -1;

  const monthlyRate = calc.interestRate / 100 / 12;
  const numPayments = calc.loanTermYears * 12;

  let principalPaidYear1 = 0;
  let principalPaidYear5 = 0;
  let principalPaidYear10 = 0;
  let remainingBalance = loanAmount;

  for (let month = 1; month <= Math.min(120, numPayments); month++) {
    const interestPayment = remainingBalance * monthlyRate;
    const principalPayment = monthlyMortgage - interestPayment;
    remainingBalance -= principalPayment;

    if (month <= 12) principalPaidYear1 += principalPayment;
    if (month <= 60) principalPaidYear5 += principalPayment;
    if (month <= 120) principalPaidYear10 += principalPayment;
  }

  const appreciationRate = calc.appreciationRate / 100;
  const valueYear1 = calc.purchasePrice * Math.pow(1 + appreciationRate, 1);
  const valueYear5 = calc.purchasePrice * Math.pow(1 + appreciationRate, 5);
  const valueYear10 = calc.purchasePrice * Math.pow(1 + appreciationRate, 10);

  const equityYear1 = (valueYear1 - (loanAmount - principalPaidYear1));
  const equityYear5 = (valueYear5 - (loanAmount - principalPaidYear5));
  const equityYear10 = (valueYear10 - (loanAmount - principalPaidYear10));

  const totalReturnYear5 = annualCashFlow * 5 + (valueYear5 - calc.purchasePrice) + principalPaidYear5;
  const totalReturnYear10 = annualCashFlow * 10 + (valueYear10 - calc.purchasePrice) + principalPaidYear10;

  return {
    downPayment,
    loanAmount,
    monthlyMortgage,
    monthlyExpenses,
    monthlyIncome,
    monthlyCashFlow,
    annualCashFlow,
    totalCashInvested,
    cashOnCash,
    capRate,
    dscr,
    noi,
    roi,
    breakEvenMonths,
    equityYear1,
    equityYear5,
    equityYear10,
    totalReturnYear5,
    totalReturnYear10,
  };
}

export function calculateDealScore(
  discount: number,
  arv: number,
  purchasePrice: number,
  rehabCost: number,
  marketTrend: number,
  neighborhoodScore: number,
  daysOnMarket: number,
  capRate: number,
  cashOnCash: number
): number {
  let score = 0;

  // Discount from ARV (30 points max)
  const arvDiscount = ((arv - purchasePrice - rehabCost) / arv) * 100;
  if (arvDiscount >= 30) score += 30;
  else if (arvDiscount >= 20) score += 25;
  else if (arvDiscount >= 15) score += 20;
  else if (arvDiscount >= 10) score += 15;
  else if (arvDiscount >= 5) score += 10;
  else if (arvDiscount > 0) score += 5;

  // Cap rate (20 points max)
  if (capRate >= 10) score += 20;
  else if (capRate >= 8) score += 16;
  else if (capRate >= 6) score += 12;
  else if (capRate >= 4) score += 8;
  else if (capRate >= 2) score += 4;

  // Cash on cash return (20 points max)
  if (cashOnCash >= 15) score += 20;
  else if (cashOnCash >= 12) score += 16;
  else if (cashOnCash >= 8) score += 12;
  else if (cashOnCash >= 5) score += 8;
  else if (cashOnCash > 0) score += 4;

  // Market trend (15 points max)
  if (marketTrend >= 5) score += 15;
  else if (marketTrend >= 3) score += 12;
  else if (marketTrend >= 1) score += 8;
  else if (marketTrend >= 0) score += 4;

  // Neighborhood (10 points max)
  score += Math.min(10, Math.round(neighborhoodScore / 10));

  // Days on market bonus (5 points max) - higher DOM = more negotiation power
  if (daysOnMarket >= 90) score += 5;
  else if (daysOnMarket >= 60) score += 4;
  else if (daysOnMarket >= 30) score += 3;
  else if (daysOnMarket >= 14) score += 2;
  else score += 1;

  return Math.min(100, Math.max(0, score));
}

export function estimateRehabCost(
  sqft: number,
  yearBuilt: number,
  condition: "cosmetic" | "moderate" | "full_gut"
): number {
  const currentYear = 2026;
  const age = currentYear - yearBuilt;

  let baseCostPerSqft: number;
  switch (condition) {
    case "cosmetic":
      baseCostPerSqft = 15; // Paint, fixtures, minor updates
      break;
    case "moderate":
      baseCostPerSqft = 35; // Kitchen, baths, flooring, some systems
      break;
    case "full_gut":
      baseCostPerSqft = 75; // Complete renovation
      break;
  }

  // Age adjustment
  let ageMultiplier = 1.0;
  if (age > 80) ageMultiplier = 1.4;
  else if (age > 50) ageMultiplier = 1.25;
  else if (age > 30) ageMultiplier = 1.1;

  return Math.round(sqft * baseCostPerSqft * ageMultiplier);
}

export function calculateARV(comparables: { adjustedPrice: number }[]): number {
  if (comparables.length === 0) return 0;
  const total = comparables.reduce((sum, comp) => sum + comp.adjustedPrice, 0);
  return Math.round(total / comparables.length);
}

import { Property, DealAnalysis, Comparable, DealAlert, SavedDeal, BlogPost } from "@/types";

export const properties: Property[] = [
  {
    id: "prop-001",
    address: "1247 Maple Grove Drive",
    city: "Austin",
    state: "TX",
    zip: "78745",
    lat: 30.2072,
    lng: -97.7894,
    price: 285000,
    listPrice: 310000,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1650,
    lotSize: 6500,
    yearBuilt: 1985,
    propertyType: "single_family",
    status: "active",
    daysOnMarket: 47,
    images: ["https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop", "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=600&fit=crop", "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800&h=600&fit=crop"],
    description: "Charming single-family home in a well-established neighborhood. Features an open floor plan, updated kitchen with granite countertops, and a spacious backyard. Close to parks, schools, and shopping. Motivated seller — bring offers!",
    features: ["Granite Countertops", "Hardwood Floors", "Fenced Yard", "2-Car Garage", "Central A/C"],
    mlsNumber: "MLS-2026-4521",
    listingAgent: "Sarah Mitchell",
    pricePerSqft: 173,
    estimatedRent: 2100,
    taxAmount: 4750,
    hoaFee: 0,
    neighborhood: "Maple Grove",
    walkScore: 62,
    crimeScore: 25,
    schoolRating: 7,
  },
  {
    id: "prop-002",
    address: "892 Oakmont Boulevard",
    city: "Tampa",
    state: "FL",
    zip: "33609",
    lat: 27.9373,
    lng: -82.5079,
    price: 425000,
    listPrice: 449000,
    bedrooms: 4,
    bathrooms: 3,
    sqft: 2200,
    lotSize: 8200,
    yearBuilt: 1998,
    propertyType: "single_family",
    status: "active",
    daysOnMarket: 23,
    images: ["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop", "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=600&fit=crop", "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800&h=600&fit=crop"],
    description: "Stunning 4-bedroom home in prestigious Oakmont. Recently renovated with modern finishes throughout. Gourmet kitchen, spa-like master bath, and pool-ready backyard. Top-rated schools nearby.",
    features: ["Pool Ready", "Renovated Kitchen", "Walk-in Closets", "Tile Roof", "Impact Windows"],
    mlsNumber: "MLS-2026-7832",
    listingAgent: "David Chen",
    pricePerSqft: 193,
    estimatedRent: 2800,
    taxAmount: 6200,
    hoaFee: 150,
    neighborhood: "South Tampa",
    walkScore: 71,
    crimeScore: 18,
    schoolRating: 9,
  },
  {
    id: "prop-003",
    address: "3456 Industrial Park Way",
    city: "Phoenix",
    state: "AZ",
    zip: "85034",
    lat: 33.4152,
    lng: -111.9821,
    price: 189000,
    listPrice: 225000,
    bedrooms: 2,
    bathrooms: 1,
    sqft: 1100,
    lotSize: 4800,
    yearBuilt: 1972,
    propertyType: "single_family",
    status: "active",
    daysOnMarket: 89,
    images: ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop", "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=600&fit=crop", "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800&h=600&fit=crop"],
    description: "Investor special! Needs work but great bones. Large lot in rapidly appreciating area near new light rail extension. Perfect for fix-and-flip or long-term hold. Cash or hard money preferred.",
    features: ["Large Lot", "Near Transit", "Corner Lot", "Detached Garage", "RV Parking"],
    mlsNumber: "MLS-2026-1198",
    listingAgent: "Maria Rodriguez",
    pricePerSqft: 172,
    estimatedRent: 1450,
    taxAmount: 2100,
    hoaFee: 0,
    neighborhood: "South Mountain",
    walkScore: 45,
    crimeScore: 42,
    schoolRating: 5,
  },
  {
    id: "prop-004",
    address: "567 Peachtree Commons",
    city: "Atlanta",
    state: "GA",
    zip: "30312",
    lat: 33.7390,
    lng: -84.3712,
    price: 345000,
    listPrice: 365000,
    bedrooms: 3,
    bathrooms: 2.5,
    sqft: 1900,
    lotSize: 3200,
    yearBuilt: 2015,
    propertyType: "townhouse",
    status: "active",
    daysOnMarket: 12,
    images: ["https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=800&h=600&fit=crop", "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=600&fit=crop", "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800&h=600&fit=crop"],
    description: "Modern townhouse in the heart of Grant Park. Open concept living with soaring ceilings, quartz countertops, and rooftop deck. Walking distance to restaurants, BeltLine, and Zoo Atlanta.",
    features: ["Rooftop Deck", "Quartz Counters", "Smart Home", "EV Charger", "Near BeltLine"],
    mlsNumber: "MLS-2026-5567",
    listingAgent: "James Walker",
    pricePerSqft: 182,
    estimatedRent: 2500,
    taxAmount: 4100,
    hoaFee: 275,
    neighborhood: "Grant Park",
    walkScore: 88,
    crimeScore: 30,
    schoolRating: 6,
  },
  {
    id: "prop-005",
    address: "2100 Riverside Terrace",
    city: "Nashville",
    state: "TN",
    zip: "37206",
    lat: 36.1809,
    lng: -86.7340,
    price: 510000,
    listPrice: 549000,
    bedrooms: 4,
    bathrooms: 3,
    sqft: 2600,
    lotSize: 9800,
    yearBuilt: 2008,
    propertyType: "single_family",
    status: "active",
    daysOnMarket: 34,
    images: ["https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop", "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=600&fit=crop", "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800&h=600&fit=crop"],
    description: "East Nashville gem with incredible views of the Cumberland River. Open floor plan, chef's kitchen, and an expansive master suite. Oversized lot with potential for ADU. Motivated seller relocating.",
    features: ["River Views", "Chef's Kitchen", "ADU Potential", "Hardwood Throughout", "Smart Thermostat"],
    mlsNumber: "MLS-2026-9901",
    listingAgent: "Katie Johnson",
    pricePerSqft: 196,
    estimatedRent: 3200,
    taxAmount: 5800,
    hoaFee: 0,
    neighborhood: "East Nashville",
    walkScore: 74,
    crimeScore: 28,
    schoolRating: 7,
  },
  {
    id: "prop-006",
    address: "4321 Sunset Mesa Lane",
    city: "Denver",
    state: "CO",
    zip: "80220",
    lat: 39.7312,
    lng: -104.9089,
    price: 395000,
    listPrice: 420000,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1750,
    lotSize: 5600,
    yearBuilt: 1955,
    propertyType: "single_family",
    status: "active",
    daysOnMarket: 56,
    images: ["https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&h=600&fit=crop", "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=600&fit=crop", "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800&h=600&fit=crop"],
    description: "Mid-century ranch in Hilltop neighborhood with mountain views. Original character with modern updates. Updated electrical and plumbing. Basement with potential for finishing (800 additional sqft).",
    features: ["Mountain Views", "Basement Potential", "Updated Systems", "Original Hardwood", "Mature Trees"],
    mlsNumber: "MLS-2026-3345",
    listingAgent: "Mike Thompson",
    pricePerSqft: 226,
    estimatedRent: 2600,
    taxAmount: 3900,
    hoaFee: 0,
    neighborhood: "Hilltop",
    walkScore: 68,
    crimeScore: 20,
    schoolRating: 8,
  },
  {
    id: "prop-007",
    address: "789 Magnolia Court",
    city: "Charlotte",
    state: "NC",
    zip: "28205",
    lat: 35.2271,
    lng: -80.8078,
    price: 268000,
    listPrice: 289000,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1500,
    lotSize: 5200,
    yearBuilt: 1990,
    propertyType: "single_family",
    status: "active",
    daysOnMarket: 41,
    images: ["https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop", "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=600&fit=crop", "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800&h=600&fit=crop"],
    description: "Well-maintained home in NoDa arts district. Freshly painted, new HVAC system, updated bathrooms. Great rental history — current tenant paying $1,850/mo on month-to-month lease.",
    features: ["New HVAC", "Updated Baths", "Tenant in Place", "Near Light Rail", "Freshly Painted"],
    mlsNumber: "MLS-2026-6678",
    listingAgent: "Andrea Collins",
    pricePerSqft: 179,
    estimatedRent: 1850,
    taxAmount: 2800,
    hoaFee: 0,
    neighborhood: "NoDa",
    walkScore: 76,
    crimeScore: 32,
    schoolRating: 6,
  },
  {
    id: "prop-008",
    address: "1550 Harbor View Drive",
    city: "San Antonio",
    state: "TX",
    zip: "78205",
    lat: 29.4362,
    lng: -98.4875,
    price: 220000,
    listPrice: 245000,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1400,
    lotSize: 5000,
    yearBuilt: 1978,
    propertyType: "single_family",
    status: "active",
    daysOnMarket: 63,
    images: ["https://images.unsplash.com/photo-1598228723793-52759bba239c?w=800&h=600&fit=crop", "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=600&fit=crop", "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800&h=600&fit=crop"],
    description: "Solid investment property near downtown and the Riverwalk. Needs cosmetic updates but structurally sound. Great school district. Neighborhood seeing significant gentrification and price increases.",
    features: ["Near Downtown", "Good Schools", "Covered Patio", "Storage Shed", "Mature Landscaping"],
    mlsNumber: "MLS-2026-2234",
    listingAgent: "Carlos Gutierrez",
    pricePerSqft: 157,
    estimatedRent: 1650,
    taxAmount: 3200,
    hoaFee: 0,
    neighborhood: "Dignowity Hill",
    walkScore: 72,
    crimeScore: 38,
    schoolRating: 7,
  },
  {
    id: "prop-009",
    address: "6700 Lakewood Estates",
    city: "Orlando",
    state: "FL",
    zip: "32812",
    lat: 28.5017,
    lng: -81.3532,
    price: 375000,
    listPrice: 399000,
    bedrooms: 4,
    bathrooms: 2.5,
    sqft: 2100,
    lotSize: 7500,
    yearBuilt: 2003,
    propertyType: "single_family",
    status: "active",
    daysOnMarket: 28,
    images: ["https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&h=600&fit=crop", "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=600&fit=crop", "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800&h=600&fit=crop"],
    description: "Spacious family home in gated Lakewood Estates. Open floor plan, large kitchen island, screened lanai overlooking conservation area. Community pool and playground. Short-term rental friendly.",
    features: ["Gated Community", "Screened Lanai", "Conservation Views", "Community Pool", "STR Friendly"],
    mlsNumber: "MLS-2026-8890",
    listingAgent: "Jennifer Williams",
    pricePerSqft: 179,
    estimatedRent: 2700,
    taxAmount: 5100,
    hoaFee: 200,
    neighborhood: "Lakewood Estates",
    walkScore: 42,
    crimeScore: 15,
    schoolRating: 8,
  },
  {
    id: "prop-010",
    address: "3200 Brookhaven Circle",
    city: "Raleigh",
    state: "NC",
    zip: "27607",
    lat: 35.8025,
    lng: -78.6998,
    price: 315000,
    listPrice: 335000,
    bedrooms: 3,
    bathrooms: 2.5,
    sqft: 1800,
    lotSize: 6000,
    yearBuilt: 2001,
    propertyType: "single_family",
    status: "active",
    daysOnMarket: 19,
    images: ["https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&h=600&fit=crop", "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=600&fit=crop", "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800&h=600&fit=crop"],
    description: "Move-in ready in the Research Triangle. Minutes from NC State, major employers, and I-40. Updated kitchen and baths, new roof (2024), and fenced backyard. Perfect turnkey rental.",
    features: ["New Roof", "Updated Kitchen", "Fenced Yard", "Near University", "Turnkey Rental"],
    mlsNumber: "MLS-2026-4412",
    listingAgent: "Brian Foster",
    pricePerSqft: 175,
    estimatedRent: 2200,
    taxAmount: 3400,
    hoaFee: 75,
    neighborhood: "Brookhaven",
    walkScore: 55,
    crimeScore: 22,
    schoolRating: 8,
  },
  {
    id: "prop-011",
    address: "450 Bourbon Street Lofts #302",
    city: "New Orleans",
    state: "LA",
    zip: "70130",
    lat: 29.9584,
    lng: -90.0653,
    price: 199000,
    listPrice: 229000,
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1050,
    lotSize: 0,
    yearBuilt: 1920,
    propertyType: "condo",
    status: "active",
    daysOnMarket: 72,
    images: ["https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&h=600&fit=crop", "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=600&fit=crop", "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800&h=600&fit=crop"],
    description: "Historic French Quarter loft with exposed brick and original beams. High ceilings, modern kitchen, and wrought-iron balcony overlooking Bourbon Street. Exceptional short-term rental income potential.",
    features: ["Exposed Brick", "Wrought Iron Balcony", "High Ceilings", "French Quarter", "STR Income"],
    mlsNumber: "MLS-2026-1156",
    listingAgent: "Dominique Broussard",
    pricePerSqft: 190,
    estimatedRent: 2200,
    taxAmount: 1800,
    hoaFee: 350,
    neighborhood: "French Quarter",
    walkScore: 95,
    crimeScore: 55,
    schoolRating: 4,
  },
  {
    id: "prop-012",
    address: "8900 Prairie Wind Drive",
    city: "Kansas City",
    state: "MO",
    zip: "64114",
    lat: 38.9410,
    lng: -94.5965,
    price: 175000,
    listPrice: 195000,
    bedrooms: 3,
    bathrooms: 1.5,
    sqft: 1300,
    lotSize: 7200,
    yearBuilt: 1965,
    propertyType: "single_family",
    status: "active",
    daysOnMarket: 95,
    images: ["https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=600&fit=crop", "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=600&fit=crop", "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800&h=600&fit=crop"],
    description: "Cash flow king in stable Waldo neighborhood. Updated electrical, newer water heater, and solid foundation. Large lot with detached workshop. Rents in area averaging $1,500+/mo.",
    features: ["Detached Workshop", "Updated Electrical", "Large Lot", "Stable Neighborhood", "Cash Flow"],
    mlsNumber: "MLS-2026-7745",
    listingAgent: "Robert Kim",
    pricePerSqft: 135,
    estimatedRent: 1500,
    taxAmount: 2200,
    hoaFee: 0,
    neighborhood: "Waldo",
    walkScore: 58,
    crimeScore: 30,
    schoolRating: 6,
  },
];

function generateComparables(property: Property): Comparable[] {
  const basePrice = property.price;
  const baseSqft = property.sqft;
  const comps: Comparable[] = [];

  const compData = [
    { addr: "Nearby Sale 1", priceMult: 1.12, sqftMult: 1.05, beds: property.bedrooms, baths: property.bathrooms, dist: 0.3, daysAgo: 45 },
    { addr: "Nearby Sale 2", priceMult: 1.08, sqftMult: 0.95, beds: property.bedrooms, baths: property.bathrooms - 0.5, dist: 0.5, daysAgo: 62 },
    { addr: "Nearby Sale 3", priceMult: 1.15, sqftMult: 1.1, beds: property.bedrooms + 1, baths: property.bathrooms, dist: 0.7, daysAgo: 30 },
    { addr: "Nearby Sale 4", priceMult: 1.05, sqftMult: 0.9, beds: property.bedrooms, baths: property.bathrooms, dist: 0.4, daysAgo: 88 },
  ];

  compData.forEach((cd, i) => {
    const salePrice = Math.round(basePrice * cd.priceMult);
    const sqft = Math.round(baseSqft * cd.sqftMult);
    const sqftAdj = (property.sqft - sqft) * (property.pricePerSqft * 0.5);
    const bedAdj = (property.bedrooms - cd.beds) * 8000;
    const bathAdj = (property.bathrooms - cd.baths) * 5000;
    const condAdj = Math.round((Math.random() - 0.3) * 10000);
    const locAdj = Math.round((Math.random() - 0.4) * 5000);
    const ageAdj = Math.round((Math.random() - 0.5) * 3000);
    const adjustedPrice = salePrice + sqftAdj + bedAdj + bathAdj + condAdj + locAdj + ageAdj;

    const saleDate = new Date();
    saleDate.setDate(saleDate.getDate() - cd.daysAgo);

    comps.push({
      id: `comp-${property.id}-${i + 1}`,
      address: `${1000 + Math.round(Math.random() * 8000)} ${["Oak", "Pine", "Elm", "Cedar", "Birch"][i % 5]} ${["St", "Ave", "Dr", "Ln", "Ct"][i % 5]}, ${property.city}`,
      salePrice,
      saleDate: saleDate.toISOString(),
      bedrooms: cd.beds,
      bathrooms: cd.baths,
      sqft,
      distance: cd.dist,
      pricePerSqft: Math.round(salePrice / sqft),
      adjustedPrice: Math.round(adjustedPrice),
      adjustments: {
        sqft: Math.round(sqftAdj),
        bedrooms: bedAdj,
        bathrooms: bathAdj,
        condition: condAdj,
        location: locAdj,
        age: ageAdj,
      },
    });
  });

  return comps;
}

export function generateDealAnalysis(property: Property): DealAnalysis {
  const comparables = generateComparables(property);
  const arv = Math.round(comparables.reduce((s, c) => s + c.adjustedPrice, 0) / comparables.length);
  const discount = Math.round(((property.listPrice - property.price) / property.listPrice) * 100);

  const age = 2026 - property.yearBuilt;
  let rehabLevel: "cosmetic" | "moderate" | "full_gut" = "cosmetic";
  let rehabCost = 0;
  if (age > 40) {
    rehabLevel = "moderate";
    rehabCost = Math.round(property.sqft * 35 * (1 + (age > 60 ? 0.25 : 0)));
  } else if (age > 20) {
    rehabLevel = "cosmetic";
    rehabCost = Math.round(property.sqft * 15);
  } else {
    rehabLevel = "cosmetic";
    rehabCost = Math.round(property.sqft * 8);
  }

  const annualRent = property.estimatedRent * 12;
  const vacancyLoss = annualRent * 0.05;
  const operatingExpenses = property.taxAmount + (property.hoaFee * 12) + (property.estimatedRent * 0.08 * 12) + (annualRent * 0.05) + 1200;
  const noi = annualRent - vacancyLoss - operatingExpenses;
  const capRate = (noi / property.price) * 100;

  const downPayment = property.price * 0.25;
  const closingCosts = property.price * 0.03;
  const totalInvested = downPayment + closingCosts + rehabCost;
  const loanAmount = property.price * 0.75;
  const monthlyRate = 0.0695 / 12;
  const numPayments = 360;
  const monthlyMortgage = (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments))) / (Math.pow(1 + monthlyRate, numPayments) - 1);
  const monthlyCashFlow = (property.estimatedRent * 0.95) - monthlyMortgage - (operatingExpenses / 12);
  const annualCashFlow = monthlyCashFlow * 12;
  const cashOnCash = (annualCashFlow / totalInvested) * 100;
  const dscr = noi / (monthlyMortgage * 12);
  const profitPotential = arv - property.price - rehabCost;
  const roi = (profitPotential / totalInvested) * 100;
  const breakEvenMonths = monthlyCashFlow > 0 ? Math.ceil(totalInvested / monthlyCashFlow) : -1;

  const marketTrend = 2 + Math.random() * 6;
  const neighborhoodScore = property.walkScore * 0.3 + (100 - property.crimeScore) * 0.4 + property.schoolRating * 3;

  const dealScore = Math.min(100, Math.max(10, Math.round(
    (discount * 1.5) +
    (capRate * 3) +
    (cashOnCash > 0 ? cashOnCash * 1.5 : 0) +
    (marketTrend * 2) +
    (neighborhoodScore * 0.15) +
    (property.daysOnMarket > 60 ? 5 : 0)
  )));

  const neighborhoodTrend: "appreciating" | "stable" | "declining" =
    marketTrend > 3 ? "appreciating" : marketTrend > 0 ? "stable" : "declining";

  const riskLevel: "low" | "moderate" | "high" =
    dealScore >= 70 ? "low" : dealScore >= 50 ? "moderate" : "high";

  let recommendation = "";
  if (dealScore >= 80) recommendation = "Strong Buy — Excellent fundamentals with significant upside potential. Property shows strong cash flow metrics and is priced well below ARV.";
  else if (dealScore >= 65) recommendation = "Buy — Solid investment opportunity with good returns. Consider negotiating further on price to improve margins.";
  else if (dealScore >= 50) recommendation = "Hold/Watch — Decent opportunity but not compelling at current price. Monitor for price reductions.";
  else recommendation = "Pass — Current pricing does not support adequate returns. Risk-adjusted returns are below target thresholds.";

  return {
    id: `analysis-${property.id}`,
    propertyId: property.id,
    property,
    dealScore,
    arv,
    rehabCost,
    rehabLevel,
    discount,
    profitPotential,
    roi,
    capRate,
    cashOnCash,
    dscr,
    monthlyCashFlow,
    annualCashFlow,
    breakEvenMonths,
    comparables,
    neighborhoodTrend,
    marketTrend,
    riskLevel,
    recommendation,
    createdAt: new Date().toISOString(),
  };
}

export const dealAnalyses: DealAnalysis[] = properties.map(generateDealAnalysis);

export const savedDeals: SavedDeal[] = [
  {
    id: "saved-001",
    userId: "user-001",
    propertyId: "prop-001",
    property: properties[0],
    analysis: dealAnalyses[0],
    stage: "analyzing",
    notes: "Good cash flow potential. Need to verify rehab estimates with contractor.",
    createdAt: "2026-02-15T10:00:00Z",
    updatedAt: "2026-02-20T14:30:00Z",
  },
  {
    id: "saved-002",
    userId: "user-001",
    propertyId: "prop-003",
    property: properties[2],
    analysis: dealAnalyses[2],
    stage: "offer",
    offerAmount: 175000,
    notes: "Submitted offer at $175K. Agent says seller is motivated.",
    createdAt: "2026-02-10T09:00:00Z",
    updatedAt: "2026-02-25T11:00:00Z",
  },
  {
    id: "saved-003",
    userId: "user-001",
    propertyId: "prop-007",
    property: properties[6],
    analysis: dealAnalyses[6],
    stage: "watching",
    notes: "Watching for price drop. Good neighborhood for rentals.",
    createdAt: "2026-02-20T16:00:00Z",
    updatedAt: "2026-02-22T08:00:00Z",
  },
  {
    id: "saved-004",
    userId: "user-001",
    propertyId: "prop-008",
    property: properties[7],
    analysis: dealAnalyses[7],
    stage: "contract",
    offerAmount: 210000,
    closingDate: "2026-03-15",
    notes: "Under contract. Inspection scheduled for March 5th.",
    createdAt: "2026-01-28T12:00:00Z",
    updatedAt: "2026-02-26T09:00:00Z",
  },
  {
    id: "saved-005",
    userId: "user-001",
    propertyId: "prop-012",
    property: properties[11],
    analysis: dealAnalyses[11],
    stage: "closed",
    offerAmount: 168000,
    closingDate: "2026-02-01",
    notes: "Closed at $168K. Rehab starting next week. Expected rent $1,500/mo.",
    createdAt: "2025-12-15T10:00:00Z",
    updatedAt: "2026-02-01T15:00:00Z",
  },
  {
    id: "saved-006",
    userId: "user-001",
    propertyId: "prop-005",
    property: properties[4],
    analysis: dealAnalyses[4],
    stage: "watching",
    notes: "Beautiful property but price needs to come down 10% for the numbers to work.",
    createdAt: "2026-02-18T14:00:00Z",
    updatedAt: "2026-02-18T14:00:00Z",
  },
];

export const dealAlerts: DealAlert[] = [
  {
    id: "alert-001",
    userId: "user-001",
    name: "Austin Cash Flow Deals",
    minPrice: 150000,
    maxPrice: 350000,
    minBeds: 3,
    maxBeds: 5,
    minBaths: 2,
    propertyTypes: ["single_family"],
    locations: ["Austin, TX"],
    minDealScore: 65,
    active: true,
    frequency: "hourly",
    matchCount: 12,
    lastTriggered: "2026-02-28T08:00:00Z",
    createdAt: "2026-01-15T10:00:00Z",
  },
  {
    id: "alert-002",
    userId: "user-001",
    name: "Southeast Multi-Family",
    minPrice: 200000,
    maxPrice: 600000,
    minBeds: 4,
    maxBeds: 8,
    minBaths: 2,
    propertyTypes: ["multi_family"],
    locations: ["Atlanta, GA", "Tampa, FL", "Charlotte, NC"],
    minDealScore: 70,
    active: true,
    frequency: "daily",
    matchCount: 5,
    lastTriggered: "2026-02-27T06:00:00Z",
    createdAt: "2026-02-01T08:00:00Z",
  },
  {
    id: "alert-003",
    userId: "user-001",
    name: "Midwest Value Plays",
    minPrice: 100000,
    maxPrice: 250000,
    minBeds: 2,
    maxBeds: 4,
    minBaths: 1,
    propertyTypes: ["single_family", "townhouse"],
    locations: ["Kansas City, MO", "Indianapolis, IN"],
    minDealScore: 60,
    active: false,
    frequency: "weekly",
    matchCount: 28,
    lastTriggered: "2026-02-21T06:00:00Z",
    createdAt: "2025-12-10T12:00:00Z",
  },
];

export const blogPosts: BlogPost[] = [
  {
    id: "blog-001",
    title: "The 2026 Guide to Finding Off-Market Deals in a Competitive Market",
    slug: "2026-guide-off-market-deals",
    excerpt: "Discover proven strategies to find profitable off-market properties before they hit the MLS. From direct mail campaigns to driving for dollars, here are the tactics top investors use.",
    content: `Finding off-market deals has become the holy grail for real estate investors in 2026. With inventory still tight in many markets, the ability to source properties before they hit the MLS can mean the difference between a great deal and no deal at all.

## Why Off-Market Deals Matter

Off-market properties typically sell at a 10-20% discount compared to listed properties. Without the competitive bidding environment of the open market, investors have more room to negotiate favorable terms.

## Strategy 1: Direct Mail Campaigns

Targeted direct mail remains one of the most effective strategies. Focus on:
- **Absentee owners** — Landlords who live out of state are often motivated to sell
- **High equity homeowners** — Owners with 50%+ equity have more flexibility on price
- **Pre-foreclosure lists** — Homeowners facing financial hardship may need a quick sale
- **Probate properties** — Inherited homes often need to be sold quickly

The key metrics to track: Response rate (1-3% is normal), cost per lead ($50-200), and cost per deal ($2,000-5,000).

## Strategy 2: Driving for Dollars

Physically driving through target neighborhoods looking for signs of distress:
- Overgrown lawns and deferred maintenance
- Boarded windows or vacancy indicators
- Code violation notices
- For Sale By Owner signs

Use apps like DealMachine to instantly pull owner information and send personalized outreach.

## Strategy 3: Networking with Wholesalers

Build relationships with local wholesalers who are constantly sourcing deals. While you will pay a wholesale fee ($5,000-15,000), you gain access to a steady pipeline of vetted opportunities.

## Strategy 4: Real Estate Agent Relationships

Cultivate relationships with listing agents in your target areas. Let them know your buying criteria so they can bring you pocket listings and coming-soon properties before they hit the market.

## The Bottom Line

The most successful investors use a combination of all these strategies. Consistency is key — the best off-market deal finders treat sourcing as a daily activity, not a once-in-a-while effort.`,
    coverImage: "/images/blog-1.jpg",
    author: "Michael Torres",
    category: "Strategy",
    tags: ["off-market", "deal sourcing", "investing"],
    publishedAt: "2026-02-25T10:00:00Z",
    readTime: 8,
  },
  {
    id: "blog-002",
    title: "Cap Rate vs. Cash-on-Cash: Which Metric Matters More?",
    slug: "cap-rate-vs-cash-on-cash",
    excerpt: "Two of the most important metrics in real estate investing are often confused. Learn when to use each one and how they work together to evaluate deals.",
    content: `Understanding the difference between cap rate and cash-on-cash return is fundamental to successful real estate investing. Both metrics serve different purposes and tell you different things about a potential investment.

## Capitalization Rate (Cap Rate)

Cap rate measures the property's return independent of financing. It is calculated as:

**Cap Rate = Net Operating Income (NOI) / Property Value**

For example, a property generating $24,000 in annual NOI with a purchase price of $300,000 has a cap rate of 8%.

Cap rate is most useful for:
- Comparing properties regardless of financing
- Evaluating market conditions (compressed cap rates = expensive market)
- Quick screening of investment opportunities
- Evaluating all-cash purchases

## Cash-on-Cash Return

Cash-on-cash measures the return on your actual invested capital:

**Cash-on-Cash = Annual Cash Flow / Total Cash Invested**

If you invest $80,000 total (down payment + closing costs + rehab) and generate $8,000 in annual cash flow, your cash-on-cash return is 10%.

Cash-on-cash is most useful for:
- Evaluating the efficiency of your capital
- Comparing different financing scenarios
- Understanding your actual return on invested dollars
- Portfolio optimization decisions

## When Each Metric Matters Most

For **buy-and-hold investors**, cash-on-cash is typically more relevant because you are leveraging debt. A property with a 6% cap rate might generate a 12% cash-on-cash return with favorable financing.

For **all-cash buyers**, cap rate and cash-on-cash converge and become essentially the same metric.

For **market analysis**, cap rates are more useful because they strip out financing variables and let you compare across markets and time periods.

## The Ideal Combination

Look for properties where both metrics are strong:
- Cap rate above 6% (varies by market)
- Cash-on-cash above 8-10%
- DSCR above 1.25x for lender comfort

The best deals show strong fundamentals across multiple metrics, not just one.`,
    coverImage: "/images/blog-2.jpg",
    author: "Sarah Chen",
    category: "Education",
    tags: ["cap rate", "cash-on-cash", "analysis", "metrics"],
    publishedAt: "2026-02-20T10:00:00Z",
    readTime: 6,
  },
  {
    id: "blog-003",
    title: "Top 10 Markets for Cash Flow Investing in 2026",
    slug: "top-markets-cash-flow-2026",
    excerpt: "Our data-driven analysis reveals the best markets for rental property investors seeking strong monthly cash flow in 2026.",
    content: `Based on our analysis of rent-to-price ratios, population growth, job creation, and regulatory environment, here are the top 10 markets for cash flow investing in 2026.

## Methodology

We evaluated 150+ metro areas across five key criteria:
1. **Rent-to-price ratio** (monthly rent / purchase price) — Target: >0.7%
2. **Population growth** — 5-year trend
3. **Job growth** — Diversity and trajectory
4. **Landlord-friendly regulations** — Eviction timelines, rent control status
5. **Market stability** — Price volatility and foreclosure rates

## The Top 10

### 1. Kansas City, MO — Score: 94/100
Rent-to-price ratio of 0.85%, diverse economy, landlord-friendly state laws. Median price $195K with average rents of $1,500+.

### 2. Indianapolis, IN — Score: 91/100
Exceptional affordability with median prices around $185K. Strong rental demand from growing tech sector and logistics hub.

### 3. Memphis, TN — Score: 89/100
The cash flow capital of America. Rent-to-price ratios exceeding 1% in many neighborhoods. FedEx headquarters provides economic stability.

### 4. San Antonio, TX — Score: 87/100
Military bases provide stable rental demand. No state income tax. Rapidly growing population with affordable housing stock.

### 5. Birmingham, AL — Score: 85/100
Incredibly affordable entry points with strong rent-to-price ratios. University and medical sector provide economic diversity.

### 6. Cleveland, OH — Score: 84/100
Rock-bottom prices with solid rental demand. Cleveland Clinic and major university system anchor the economy.

### 7. Jacksonville, FL — Score: 83/100
Florida's growth story extends to Jacksonville with landlord-friendly laws and no state income tax.

### 8. Little Rock, AR — Score: 81/100
Under-the-radar market with exceptional cash flow metrics. State capital provides government employment stability.

### 9. Tulsa, OK — Score: 80/100
Energy sector diversification and remote worker incentive programs driving population growth.

### 10. Charlotte, NC — Score: 79/100
Banking capital of the Southeast with strong job growth. Slightly lower cash flow but excellent appreciation potential.

## Key Takeaways

The Southeast and Midwest continue to dominate cash flow investing. Look for markets with population growth exceeding 1% annually and rent-to-price ratios above 0.7%.`,
    coverImage: "/images/blog-3.jpg",
    author: "Michael Torres",
    category: "Market Analysis",
    tags: ["markets", "cash flow", "2026", "investing"],
    publishedAt: "2026-02-15T10:00:00Z",
    readTime: 10,
  },
  {
    id: "blog-004",
    title: "How to Estimate Rehab Costs Like a Pro",
    slug: "estimate-rehab-costs",
    excerpt: "Accurate rehab estimates can make or break a deal. Learn the systematic approach professionals use to estimate renovation costs.",
    content: `One of the most common mistakes new investors make is underestimating rehab costs. Here is a systematic approach to creating accurate estimates.

## The Three Tiers of Rehab

### Cosmetic ($10-20/sqft)
- Interior and exterior paint
- New fixtures and hardware
- Carpet/flooring refresh
- Minor landscaping
- Deep cleaning

### Moderate ($25-45/sqft)
- Everything in cosmetic, plus:
- Kitchen remodel (cabinets, counters, appliances)
- Bathroom updates
- New flooring throughout
- Electrical panel upgrade
- Minor plumbing updates

### Full Gut ($60-100+/sqft)
- Complete interior demolition
- New mechanical systems (HVAC, plumbing, electrical)
- Structural repairs
- Foundation work
- Complete kitchen and bath
- New windows and doors
- Roof replacement if needed

## Cost Multipliers

Several factors can increase your base costs:
- **Property age**: Pre-1960 homes add 15-30% for lead paint, asbestos, and outdated systems
- **Market conditions**: Labor shortages can add 10-20% in hot markets
- **Permits**: Budget $2,000-10,000 for permits depending on scope
- **Contingency**: Always add 10-15% for unexpected issues

## Pro Tips

1. Get three contractor bids minimum
2. Walk the property with your contractor before making an offer
3. Use a standardized scope of work template
4. Build relationships with reliable subcontractors
5. Factor in holding costs during rehab (mortgage, insurance, utilities)

The difference between successful and struggling investors often comes down to rehab estimation accuracy.`,
    coverImage: "/images/blog-4.jpg",
    author: "Sarah Chen",
    category: "Education",
    tags: ["rehab", "renovation", "costs", "estimation"],
    publishedAt: "2026-02-10T10:00:00Z",
    readTime: 7,
  },
];

export const pricingTiers = [
  {
    name: "Free",
    price: 0,
    period: "forever",
    description: "Get started with basic deal analysis",
    features: [
      "5 deal analyses per month",
      "Basic investment calculator",
      "Market overview dashboard",
      "Email support",
    ],
    dealLimit: 5,
    alertLimit: 1,
    highlighted: false,
    cta: "Get Started Free",
    stripePriceId: "",
  },
  {
    name: "Investor",
    price: 49,
    period: "month",
    description: "For active investors analyzing multiple deals",
    features: [
      "50 deal analyses per month",
      "Automated comparable analysis",
      "AI rehab cost estimator",
      "5 deal alerts",
      "Portfolio tracker (25 properties)",
      "Interactive deal map",
      "Priority email support",
    ],
    dealLimit: 50,
    alertLimit: 5,
    highlighted: false,
    cta: "Start Investing",
    stripePriceId: "price_investor_monthly",
  },
  {
    name: "Pro",
    price: 99,
    period: "month",
    description: "For serious investors and small teams",
    features: [
      "Unlimited deal analyses",
      "Advanced AI scoring engine",
      "Automated comparable analysis",
      "AI rehab cost estimator",
      "25 deal alerts",
      "Portfolio tracker (unlimited)",
      "Interactive deal map with heatmaps",
      "Custom report generation",
      "API access",
      "Phone and email support",
    ],
    dealLimit: "unlimited" as const,
    alertLimit: 25,
    highlighted: true,
    cta: "Go Pro",
    stripePriceId: "price_pro_monthly",
  },
  {
    name: "Fund",
    price: 249,
    period: "month",
    description: "For investment firms and fund managers",
    features: [
      "Everything in Pro, plus:",
      "Unlimited deal alerts",
      "Multi-user team access (5 seats)",
      "Custom scoring models",
      "Bulk property analysis",
      "White-label reports",
      "Dedicated account manager",
      "Custom API integrations",
      "Priority data refresh",
      "Quarterly strategy call",
    ],
    dealLimit: "unlimited" as const,
    alertLimit: "unlimited" as const,
    highlighted: false,
    cta: "Contact Sales",
    stripePriceId: "price_fund_monthly",
  },
];

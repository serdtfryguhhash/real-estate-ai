import { NextResponse } from "next/server";
import { properties } from "@/data/properties";
import { generateDealAnalysis } from "@/data/properties";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get("city");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  const minScore = searchParams.get("minScore");
  const propertyType = searchParams.get("propertyType");
  const limit = parseInt(searchParams.get("limit") || "50");
  const offset = parseInt(searchParams.get("offset") || "0");

  let filtered = properties;

  if (city) {
    filtered = filtered.filter((p) => p.city.toLowerCase().includes(city.toLowerCase()));
  }
  if (minPrice) {
    filtered = filtered.filter((p) => p.price >= parseInt(minPrice));
  }
  if (maxPrice) {
    filtered = filtered.filter((p) => p.price <= parseInt(maxPrice));
  }
  if (propertyType && propertyType !== "all") {
    filtered = filtered.filter((p) => p.propertyType === propertyType);
  }

  let analyses = filtered.map(generateDealAnalysis);

  if (minScore) {
    analyses = analyses.filter((a) => a.dealScore >= parseInt(minScore));
  }

  analyses.sort((a, b) => b.dealScore - a.dealScore);

  const total = analyses.length;
  const results = analyses.slice(offset, offset + limit);

  return NextResponse.json({
    success: true,
    data: results,
    pagination: {
      total,
      limit,
      offset,
      hasMore: offset + limit < total,
    },
  });
}

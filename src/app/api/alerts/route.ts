import { NextResponse } from "next/server";
import { dealAlerts } from "@/data/properties";

export async function GET() {
  return NextResponse.json({
    success: true,
    data: dealAlerts,
  });
}

export async function POST(request: Request) {
  const body = await request.json();

  const newAlert = {
    id: `alert-${Date.now()}`,
    userId: "user-001",
    name: body.name || "New Alert",
    minPrice: body.minPrice || 0,
    maxPrice: body.maxPrice || 1000000,
    minBeds: body.minBeds || 1,
    maxBeds: body.maxBeds || 10,
    minBaths: body.minBaths || 1,
    propertyTypes: body.propertyTypes || ["single_family"],
    locations: body.locations || [],
    minDealScore: body.minDealScore || 50,
    active: true,
    frequency: body.frequency || "daily",
    matchCount: 0,
    lastTriggered: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  };

  return NextResponse.json({
    success: true,
    data: newAlert,
  }, { status: 201 });
}

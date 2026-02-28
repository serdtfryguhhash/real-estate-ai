import { NextResponse } from "next/server";
import { properties } from "@/data/properties";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (id) {
    const property = properties.find((p) => p.id === id);
    if (!property) {
      return NextResponse.json({ success: false, error: "Property not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: property });
  }

  return NextResponse.json({
    success: true,
    data: properties,
    total: properties.length,
  });
}

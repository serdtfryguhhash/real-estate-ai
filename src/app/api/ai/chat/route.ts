import { NextRequest, NextResponse } from "next/server";
import { chat, analyzeDeal, estimateRehabCosts, analyzeNeighborhood, generateMarketUpdate } from "@/lib/ai";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, message, property, location, market } = body;

    let response: string;

    switch (action) {
      case "analyze-deal":
        response = await analyzeDeal(property);
        break;
      case "estimate-rehab":
        response = await estimateRehabCosts(property);
        break;
      case "analyze-neighborhood":
        response = await analyzeNeighborhood(location || message);
        break;
      case "market-update":
        response = await generateMarketUpdate(market || message);
        break;
      case "chat":
      default:
        response = await chat([
          {
            role: "system",
            content: "You are Real Estate AI's investment advisor. Help investors analyze deals and make data-driven decisions. Always include the disclaimer: For informational purposes only, not financial advice.",
          },
          { role: "user", content: message },
        ]);
        break;
    }

    return NextResponse.json({ success: true, response });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "AI request failed";
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}

export async function GET() {
  const hasKey = !!process.env.ANTHROPIC_API_KEY;
  return NextResponse.json({
    available: hasKey,
    model: "claude-sonnet-4-20250514",
    ...(!hasKey && { error: "ANTHROPIC_API_KEY is not set" }),
  });
}

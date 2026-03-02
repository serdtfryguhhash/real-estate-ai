import { NextRequest, NextResponse } from "next/server";
import { chat } from "@/lib/ai";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { targetAreas, memoryContext } = body;

    const areas = targetAreas && targetAreas.length > 0
      ? targetAreas.join(", ")
      : "Austin TX, Tampa FL, Denver CO";

    const systemPrompt = `You are DealFinder AI's Market Pulse analyst. Generate a concise daily market update
for a real estate investor focused on these target areas: ${areas}.

${memoryContext || ""}

Return a JSON object with this structure:
{
  "date": "today's date",
  "summary": "1-2 sentence executive summary",
  "newListings": { "count": number, "highlight": "one standout listing description" },
  "priceTrends": { "direction": "up|down|stable", "percentChange": number, "insight": "brief insight" },
  "rateImpact": { "currentRate": number, "impact": "brief analysis of rate environment on deals" },
  "opportunities": [
    { "area": "neighborhood name", "reason": "why it is an opportunity", "urgency": "high|medium|low" }
  ],
  "actionItem": "one specific thing the investor should do today"
}

Keep responses concise and actionable. For informational purposes only, not financial advice.`;

    const response = await chat(
      [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Generate today's market pulse for ${areas}. Focus on actionable intelligence.` },
      ],
      { temperature: 0.5, maxTokens: 1024 }
    );

    return NextResponse.json({ success: true, response });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Market pulse request failed";
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}

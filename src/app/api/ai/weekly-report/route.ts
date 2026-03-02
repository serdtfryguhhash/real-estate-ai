import { NextRequest, NextResponse } from "next/server";
import { chat } from "@/lib/ai";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { memoryContext, dealsAnalyzed, portfolioValue, cashFlow } = body;

    const systemPrompt = `You are DealFinder AI's weekly investment report generator.
Create a comprehensive weekly investment report for a real estate investor.

${memoryContext || ""}

Investor stats this week:
- Deals analyzed: ${dealsAnalyzed || 6}
- Portfolio value: $${(portfolioValue || 1500000).toLocaleString()}
- Monthly cash flow: $${(cashFlow || 3200).toLocaleString()}

Return a JSON object:
{
  "weekOf": "date range string",
  "headline": "one-line headline",
  "dealsAnalyzed": {
    "count": number,
    "topDeal": { "address": "string", "score": number, "why": "brief reason" },
    "avgScore": number
  },
  "marketTrends": [
    { "trend": "string", "impact": "positive|negative|neutral" }
  ],
  "portfolioPerformance": {
    "valueChange": number,
    "cashFlowTrend": "up|down|stable",
    "insight": "brief insight"
  },
  "bestOpportunities": [
    { "description": "string", "potentialReturn": "string" }
  ],
  "nextSteps": ["action item 1", "action item 2", "action item 3"]
}

Keep it concise, data-driven, and actionable. For informational purposes only.`;

    const response = await chat(
      [
        { role: "system", content: systemPrompt },
        { role: "user", content: "Generate my weekly investment report." },
      ],
      { temperature: 0.5, maxTokens: 1024 }
    );

    return NextResponse.json({ success: true, response });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Weekly report request failed";
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}

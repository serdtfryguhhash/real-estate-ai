/**
 * Real Estate AI — AI Client powered by Anthropic Claude SDK
 *
 * Uses Claude claude-sonnet-4-20250514 via the Anthropic API for financial-grade accuracy.
 */

import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });
const MODEL = "claude-sonnet-4-20250514";

interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export async function chat(
  messages: ChatMessage[],
  options: { temperature?: number; maxTokens?: number } = {}
): Promise<string> {
  try {
    // Extract system messages and pass them separately (Anthropic API requirement)
    const systemMessages = messages.filter((m) => m.role === "system");
    const nonSystemMessages = messages.filter((m) => m.role !== "system");

    const systemPrompt = systemMessages.map((m) => m.content).join("\n\n");

    const response = await client.messages.create({
      model: MODEL,
      max_tokens: options.maxTokens ?? 2048,
      temperature: options.temperature ?? 0.4, // Lower temp for financial accuracy
      ...(systemPrompt ? { system: systemPrompt } : {}),
      messages: nonSystemMessages.map((m) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      })),
    });

    const textBlock = response.content.find((block) => block.type === "text");
    return textBlock?.text ?? "No response generated.";
  } catch (error) {
    if (error instanceof Anthropic.APIError) {
      throw new Error(`Anthropic API error: ${error.status} — ${error.message}`);
    }
    throw error;
  }
}

/** Analyze a property deal and score it */
export async function analyzeDeal(property: {
  address: string;
  listPrice: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  yearBuilt: number;
  propertyType: string;
  daysOnMarket: number;
  description: string;
}): Promise<string> {
  return chat([
    {
      role: "system",
      content: `You are Real Estate AI's deal analysis engine. Analyze this property listing
      and provide a comprehensive investment analysis. Return JSON:
      {
        "dealScore": 1-100,
        "estimatedARV": number,
        "rehabEstimate": { "low": number, "mid": number, "high": number, "category": "cosmetic|moderate|full_gut" },
        "investmentAnalysis": {
          "potentialProfit": number,
          "estimatedCapRate": number,
          "monthlyRentEstimate": number,
          "cashOnCashReturn": number
        },
        "pros": ["..."],
        "cons": ["..."],
        "recommendation": "strong_buy|buy|hold|pass",
        "reasoning": "..."
      }

      DISCLAIMER: For informational purposes only, not financial advice.
      Be conservative with estimates. Better to underestimate than overestimate returns.`,
    },
    {
      role: "user",
      content: `Analyze this property: ${JSON.stringify(property)}`,
    },
  ], { temperature: 0.3 });
}

/** Estimate rehab costs based on property details */
export async function estimateRehabCosts(property: {
  sqft: number;
  yearBuilt: number;
  condition: string;
  description: string;
}): Promise<string> {
  return chat([
    {
      role: "system",
      content: `You are a real estate rehab cost estimator. Based on the property details,
      estimate renovation costs in three scenarios:
      1. Cosmetic ($5-15/sqft): Paint, flooring, fixtures, minor updates
      2. Moderate ($15-30/sqft): Kitchen/bath remodel, some structural, new systems
      3. Full Gut ($30-60/sqft): Complete renovation, new everything

      Return JSON with itemized estimates for each scenario.
      Be specific: "Kitchen remodel: $8,000-12,000" not "Kitchen: varies"`,
    },
    {
      role: "user",
      content: `Estimate rehab for: ${property.sqft} sqft, built ${property.yearBuilt},
      condition: ${property.condition}. ${property.description}`,
    },
  ], { temperature: 0.3 });
}

/** Generate neighborhood analysis */
export async function analyzeNeighborhood(location: string): Promise<string> {
  return chat([
    {
      role: "system",
      content: `You are a real estate market analyst. Provide a neighborhood investment
      analysis covering: market trends, appreciation potential, rental demand,
      school ratings impact, crime considerations, and development pipeline.
      Note: This is general guidance based on typical market patterns.`,
    },
    {
      role: "user",
      content: `Analyze the investment potential of the ${location} area.`,
    },
  ]);
}

/** Generate market commentary for newsletter */
export async function generateMarketUpdate(market: string): Promise<string> {
  return chat([
    {
      role: "system",
      content: `You are a real estate investment newsletter writer. Write a market update
      covering: current conditions, deal flow, interest rate impact, strategy recommendations,
      and what investors should watch for this week.`,
    },
    {
      role: "user",
      content: `Write a weekly market update for real estate investors in ${market}.`,
    },
  ]);
}

export async function checkAIStatus(): Promise<{ available: boolean; model: string; error?: string }> {
  try {
    if (!process.env.ANTHROPIC_API_KEY) {
      return { available: false, model: MODEL, error: "ANTHROPIC_API_KEY is not set" };
    }
    return { available: true, model: MODEL };
  } catch {
    return { available: false, model: MODEL, error: "Failed to initialize Anthropic client" };
  }
}

/**
 * Real Estate AI — AI Client powered by Ollama (local LLM, zero API keys)
 *
 * Connects to Ollama at http://localhost:11434/v1 using llama3.2
 */

const OLLAMA_BASE_URL = "http://localhost:11434/v1";
const MODEL = "llama3.2";

interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface ChatResponse {
  choices: Array<{ message: { role: string; content: string } }>;
}

export async function chat(
  messages: ChatMessage[],
  options: { temperature?: number; maxTokens?: number } = {}
): Promise<string> {
  try {
    const response = await fetch(`${OLLAMA_BASE_URL}/chat/completions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: MODEL,
        messages,
        temperature: options.temperature ?? 0.4, // Lower temp for financial accuracy
        max_tokens: options.maxTokens ?? 2048,
      }),
    });

    if (!response.ok) throw new Error(`Ollama error: ${response.status}`);
    const data: ChatResponse = await response.json();
    return data.choices[0]?.message?.content ?? "No response generated.";
  } catch (error) {
    if (error instanceof TypeError && error.message.includes("fetch")) {
      throw new Error("Ollama is not running. Open the Ollama app from Applications.");
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
    const response = await fetch("http://localhost:11434/api/tags");
    if (!response.ok) return { available: false, model: MODEL, error: "Ollama not responding" };
    const data = await response.json();
    const found = data.models?.some((m: { name: string }) => m.name.startsWith(MODEL));
    return { available: !!found, model: MODEL, error: found ? undefined : `Model ${MODEL} not found` };
  } catch {
    return { available: false, model: MODEL, error: "Ollama is not running" };
  }
}

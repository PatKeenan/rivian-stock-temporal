import type { RivianNewsItem } from "./news";
import type { RivianPriceSnapshot } from "./price";

export interface RivianDailyReport {
  ticker: "RIVN";
  generatedAt: string;
  price: RivianPriceSnapshot;
  newsCount: number;
  summaryText: string;
  sentiment: "bullish" | "bearish" | "neutral";
}

export async function generateRivianReport(
  price: RivianPriceSnapshot,
  news: RivianNewsItem[]
): Promise<RivianDailyReport> {
  console.log("[activity:summary] Generating Rivian report...");

  // Mock processing with an LLM to perform sentiment analysis
  // In a real-world, we would either combine all new items into a single summary or evaluate them individually and then take the average

  const sentiment = "neutral";

  const summary = [
    `Current RIVN price: $${price.price} ${price.currency}.`,
    `Fetched ${news.length} news items.`,
    `Overall heuristic sentiment: ${sentiment}.`,
  ].join(" ");

  return {
    ticker: "RIVN",
    generatedAt: new Date().toISOString(),
    price,
    newsCount: news.length,
    summaryText: summary,
    sentiment,
  };
}

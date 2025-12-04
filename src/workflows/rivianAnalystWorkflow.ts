import { proxyActivities, sleep } from "@temporalio/workflow";

import type * as priceActivities from "../activities/price";
import type * as newsActivities from "../activities/news";
import type * as summaryActivities from "../activities/summary";
import type * as storageActivities from "../activities/storage";

// Define the workflow interval
export interface RivianAnalystParams {
  intervalMs: number; // e.g. 60_000 for 1 min, or 3_600_000 for 1 hour
}

// Configure the proxies
const { fetchRivianPrice } = proxyActivities<typeof priceActivities>({
  startToCloseTimeout: "10 seconds",
});

const { fetchRivianNews } = proxyActivities<typeof newsActivities>({
  startToCloseTimeout: "10 seconds",
});

const { generateRivianReport } = proxyActivities<typeof summaryActivities>({
  startToCloseTimeout: "30 seconds",
});

const { storeRivianReport } = proxyActivities<typeof storageActivities>({
  startToCloseTimeout: "10 seconds",
});

// The long-running workflow function

export async function rivianAnalystWorkflow(
  params: RivianAnalystParams
): Promise<void> {
  const { intervalMs } = params;

  // This is where you could potentially keep some high level state such as the last sentiment
  let lastSentiment: string | null = null;
  // Run forever until cancelled
  while (true) {
    // 1. Fetch the price + news
    const [price, news] = await Promise.all([
      fetchRivianPrice(),
      fetchRivianNews(),
    ]);

    // 2. Generate the report
    const report = await generateRivianReport(price, news);

    // 3. Store results
    await storeRivianReport(report);

    // 4. Optionally update the high level state
    if (report.sentiment !== lastSentiment) {
      lastSentiment = report.sentiment;
    }

    // 5. Sleep until the next iteration (durable timer)
    await sleep(intervalMs);
  }
}

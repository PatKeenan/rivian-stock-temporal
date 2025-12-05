import {
  proxyActivities,
  sleep,
  defineSignal,
  defineQuery,
  setHandler,
} from "@temporalio/workflow";

import type * as priceActivities from "../activities/price";
import type * as newsActivities from "../activities/news";
import type * as summaryActivities from "../activities/summary";
import type * as storageActivities from "../activities/storage";

// ~~~ Signals ~~~ (communicate from the client to the workflow)
interface UpdateConfigSignal {
  intervalMs: number;
  trackingEnabled: boolean;
}
export const updateConfigSignal =
  defineSignal<[UpdateConfigSignal]>("updateConfig");
export const pauseSignal = defineSignal<[]>("pause");
export const resumeSignal = defineSignal<[]>("resume");
export const manualRunSignal = defineSignal<[]>("manualRun");

// ~~~ Queries ~~~ (get state from the workflow)

interface GetStatusQuery {
  intervalMs: number;
  trackingEnabled: boolean;
  lastSentiment: string | null;
  lastReport: summaryActivities.RivianDailyReport | null;
}

export const getStatusQuery = defineQuery<GetStatusQuery>("getStatus");

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
  retry: {
    maximumAttempts: 5,
  },
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
  let { intervalMs } = params;

  // Add the items for the signals
  // This is where you could potentially keep some high level state such as the last sentiment
  let trackingEnabled = true;
  let paused = false;
  let lastSentiment: string | null = null;
  let lastReport: summaryActivities.RivianDailyReport | null = null;

  // Set the signal handlers for the signals from the client

  setHandler(updateConfigSignal, (update) => {
    if (update.intervalMs !== undefined) intervalMs = update.intervalMs;
    if (update.trackingEnabled !== undefined)
      trackingEnabled = update.trackingEnabled;
  });

  setHandler(pauseSignal, () => {
    paused = true;
  });

  setHandler(resumeSignal, () => {
    paused = false;
  });

  setHandler(manualRunSignal, async () => {
    trackingEnabled = true;
  });

  // Query Handler
  setHandler(getStatusQuery, () => ({
    intervalMs,
    trackingEnabled,
    lastSentiment,
    lastReport,
  }));

  // Run forever until cancelled
  while (true) {
    if (!paused && trackingEnabled) {
      // 1. Fetch the price + news
      const [price, news] = await Promise.all([
        fetchRivianPrice(),
        fetchRivianNews(),
      ]);

      // 2. Generate the report
      const report = await generateRivianReport(price, news);

      lastSentiment = report.sentiment;
      lastReport = report;

      // 3. Store results
      await storeRivianReport(report);
    }

    // 5. Sleep until the next iteration (durable timer)
    await sleep(intervalMs);
  }
}

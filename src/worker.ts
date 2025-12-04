// The worker runs the workflow + activities and:
// Connects to the Temporal server, Registers the workflows + activities, Polls a task queue
// Just for reference, a workerflow is the agent and the worker is the execution environment.

import { Worker } from "@temporalio/worker";
import { fileURLToPath } from "url";
import path from "path";

import * as priceActivities from "./activities/price";
import * as newsActivities from "./activities/news";
import * as summaryActivities from "./activities/summary";
import * as storageActivities from "./activities/storage";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function run() {
  const worker = await Worker.create({
    workflowsPath: path.resolve(
      __dirname,
      "./workflows/rivianAnalystWorkflow.ts"
    ),
    activities: {
      ...priceActivities,
      ...newsActivities,
      ...summaryActivities,
      ...storageActivities,
    },
    taskQueue: "RIVN_ANALYST_QUEUE",
  });

  console.log("Worker started on task queue 'RIVN_ANALYST_QUEUE'");
  await worker.run();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});

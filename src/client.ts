// The client is what connects to temporal, starts the workflows, signals or queries them
// So the worker is what starts the engine but the client is what presses on the gas and communicates with the worker while driving.
// They can start, signal, query, or terminate the worker.
// Signals send inputs into the workflow, queries get state out of the workflow, and starts/terminates the worker.

import { Connection, Client } from "@temporalio/client";
import { rivianAnalystWorkflow } from "./workflows/rivianAnalystWorkflow";

async function run() {
  const connection = await Connection.connect();
  const client = new Client({ connection });

  const handle = await client.workflow.start(rivianAnalystWorkflow, {
    taskQueue: "RIVN_ANALYST_QUEUE",
    workflowId: "rivian-analyst-main",
    args: [
      {
        // intervalMs: 60_000, // 1 minute for testing purposes
        intervalMs: 300_000, // 5 minutes for testing
      },
    ],
  });
  console.log(`Started rivian analyst workflow ${handle.workflowId}`);
  console.log(`Workflow ID: ${handle.workflowId}`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});

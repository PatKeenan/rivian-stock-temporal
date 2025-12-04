// The client is what connects to temporal, starts the workflows, signals or queries them

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
        intervalMs: 60_000, // 1 minute for testing purposes
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

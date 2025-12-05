import { generalNewsAgentPrompt } from "lib/agent-prompts";
import { createAgent } from "lib/create-agent";

export interface RivianNewsItem {
  id: string;
  headline: string;
  source: string;
  publishedAt: string;
  body: string;
}

export async function fetchRivianNews(): Promise<RivianNewsItem[]> {
  console.log("[activity:news] Fetching Rivian news...");

  const newsAgent = createAgent();

  const { text } = await newsAgent.invoke(generalNewsAgentPrompt);

  console.log("[activity:news] News agent response:", text);

  return [
    {
      id: `news-${Date.now()}-1`,
      headline: "Rivian announces new EV production targets",
      source: "MockWire",
      publishedAt: new Date().toISOString(),
      body: text,
    },
  ];
}

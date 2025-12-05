import { generateText, stepCountIs } from "ai";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { tavilySearch, tavilyExtract } from "@tavily/ai-sdk";

import "dotenv/config";

// Constants
const models = {
  fast: "google/gemini-2.5-flash",
  smart: "google/gemini-3-pro-preview",
};

const openRouterApiKey = process.env.OPEN_ROUTER_API_KEY ?? "";
const tavilyApiKey = process.env.TAVILY_API_KEY ?? "";

console.log("OPENROUTER_API_KEY", openRouterApiKey);
console.log("TAVILY_API_KEY", tavilyApiKey);

// Providers
const openRouterProvider = createOpenRouter({
  apiKey: openRouterApiKey,
});

// Tools
const webSearchTool = tavilySearch({
  apiKey: tavilyApiKey,
  maxResults: 3,
});

const webExtractTool = tavilyExtract({
  apiKey: tavilyApiKey,
  format: "markdown",
});

// Context Hints
const contextHints = [
  `Today's date is ${new Date().toISOString().split("T")[0]}.`,
  `Rivian Automotive operates out of the United States of America`,
  `Rivian Automotive is often referred to as Rivian and RIVN is the ticker symbol for the company`,
];

const combineWithContext = (prompt: string) => {
  return prompt.concat("\n\n", "Additional Context:", contextHints.join("\n"));
};

// Agent Factory
interface AgentFactoryParams {
  model?: keyof typeof models;
  tools?: boolean;
  maxSteps?: number;
}

export function createAgent(params?: AgentFactoryParams) {
  const model = params?.model ?? "fast";
  const tools = params?.tools ?? true;
  const maxSteps = params?.maxSteps ?? 5;

  const sharedConfig = {
    model: openRouterProvider(models[model]),
  };

  return {
    invoke: async (prompt: string) => {
      if (tools) {
        return await generateText({
          ...sharedConfig,
          prompt: combineWithContext(prompt),
          tools: {
            webSearch: webSearchTool,
            webExtract: webExtractTool,
          },
          stopWhen: stepCountIs(maxSteps),
        });
      }

      return await generateText({
        ...sharedConfig,
        prompt: combineWithContext(prompt),
      });
    },
  };
}

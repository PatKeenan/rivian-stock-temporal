export interface RivianNewsItem {
  id: string;
  headline: string;
  source: string;
  publishedAt: string;
  body: string;
}

export async function fetchRivianNews(): Promise<RivianNewsItem[]> {
  console.log("[activity:news] Fetching Rivian news...");

  const now = new Date().toISOString();

  // Pretend we're fetching from a news API
  return [
    {
      id: `news-${Date.now()}-1`,
      headline: "Rivian announces new EV production targets",
      source: "MockWire",
      publishedAt: now,
      body: "Rivian shared updated production guidance and discussed supply chain improvements.",
    },
    {
      id: `news-${Date.now()}-2`,
      headline: "EV sector reacts to changing energy prices",
      source: "Mock Journal",
      publishedAt: now,
      body: "Analysts debate how energy prices and subsidies will affect EV manufacturers including Rivian.",
    },
  ];
}

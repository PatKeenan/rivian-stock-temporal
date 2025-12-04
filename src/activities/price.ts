export interface RivianPriceSnapshot {
  ticker: "RIVN";
  price: number;
  currency: string;
  asOf: string; // ISO timestamps
}

// Mock Implementation
export async function fetchRivianPrice(): Promise<RivianPriceSnapshot> {
  console.log("[activity:price] Fetching Rivian price...");

  // Pretend the price is drifting
  const base = 10 + Math.random() * 5;

  return {
    ticker: "RIVN",
    price: parseFloat(base.toFixed(2)),
    currency: "USD",
    asOf: new Date().toISOString(),
  };
}

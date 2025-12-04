import type { RivianDailyReport } from "./summary";

export async function storeRivianReport(
  report: RivianDailyReport
): Promise<void> {
  console.log("[activity:storage] Storing Rivian report...");

  // In a real-world project, we would store in a database or file system

  console.log(JSON.stringify(report, null, 2));
}

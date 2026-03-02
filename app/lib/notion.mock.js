/**
 * Lib -> notion.mock.js
 * Mock version that reads from local filesystem instead of Notion API
 */

import { unstable_cache } from "next/cache";
import { readFile } from "fs/promises";
import { join } from "path";

// Read mock data from JSON file
async function getMockData() {
  const filePath = join(process.cwd(), "mock_data", "data.json");
  const fileContents = await readFile(filePath, "utf8");
  return JSON.parse(fileContents);
}

/* Get database properties */
export const getDatabase = unstable_cache(
  async () => {
    const data = await getMockData();
    return data.database;
  },
  ['properties'],
  { revalidate: 2592000, tags: ['properties'] } // refresh every month
);

/* Get entries */
export const getEntries = unstable_cache(
  async () => {
    const data = await getMockData();
    // Sort by Time property, descending (matching real Notion behavior)
    const sortedEntries = [...data.entries].sort((a, b) => {
      const timeA = a.properties?.Time?.date?.start || "";
      const timeB = b.properties?.Time?.date?.start || "";
      return timeB.localeCompare(timeA);
    });
    return sortedEntries;
  },
  ['entries'],
  { revalidate: 2592000, tags: ['entries'] } // refresh every month
);

/* Get a single entry */
export const getEntry = unstable_cache(
  async (pageId) => {
    const data = await getMockData();
    const entry = data.entries.find(e => e.id === pageId);
    if (!entry) {
      throw new Error(`Entry with id ${pageId} not found in mock data`);
    }
    return entry;
  },
  ['singleEntry'],
  { revalidate: 2592000, tags: ['singleEntry'] } // refresh every month
);

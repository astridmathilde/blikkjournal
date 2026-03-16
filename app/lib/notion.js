import { unstable_cache } from "next/cache";
import { Client } from "@notionhq/client";

const notion = new Client({
  auth: process.env.NOTION_KEY,
  notionVersion: "2025-09-03",
});

const databaseId = process.env.NOTION_DATABASE_ID;
const dataSourceId = process.env.NOTION_DATA_SOURCE_ID;

/* Get database properties  */
export const getDatabase = unstable_cache(
  async () => {
    const response = await notion.request({
      method: "get",
      path: `databases/${databaseId}`,
    });
    return response;
  },
  ['properties'],
  { revalidate: 2592000, tags: ['properties'] }
);

/* Get entries (not using cache here) */
export async function fetchEntries(cursor = undefined) {
  const response = await notion.request({
    method: "post",
    path: `data_sources/${dataSourceId}/query`,
    body: {
      sorts: [{ property: "Time", direction: "descending" }],
      page_size: 12,
      ...(cursor && { start_cursor: cursor }),
    },
  });
  
  return {
    results: response.results,
    nextCursor: response.next_cursor,
    hasMore: response.has_more,
  };
}

export async function getEntries(cursor = undefined) {
  return fetchEntries(cursor);
}

/* Get all entries by looping through cursors */ 
export const getAllEntries = unstable_cache(
  async () => {
    const allResults = [];
    let cursor = undefined;
    let hasMore = true;
    
    while (hasMore) {
      const { results, nextCursor, hasMore: more } = await fetchEntries(cursor);
      allResults.push(...results);
      cursor = nextCursor;
      hasMore = more;
    }
    
    return allResults;
  },
  ['allEntries'],
  { revalidate: 2592000, tags: ['allEntries'] }
);

/* Get single entry */
export const getEntry = unstable_cache(
  async (pageId) => {
    const response = await notion.pages.retrieve({
      page_id: pageId,
    });
    return response;
  },
  ['singleEntry'],
  { revalidate: 2592000, tags: ['singleEntry'] }
);
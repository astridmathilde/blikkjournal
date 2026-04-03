import { unstable_cache } from "next/cache";
import { Client } from "@notionhq/client";

const notion = new Client({
  auth: process.env.NOTION_KEY,
  notionVersion: "2025-09-03",
});

const dataSourceId = process.env.NOTION_DATA_SOURCE_ID;

/* Get properties  */
export const getProperties = unstable_cache(
  async () => {
    return notion.dataSources.retrieve({ data_source_id: dataSourceId });
  },
  ['properties'],
  { revalidate: 2592000, tags: ['properties'] }
);

/* Get the first page of entries */
export async function getEntries(cursor = undefined) {
  const response = await notion.dataSources.query({
    data_source_id: dataSourceId,
    sorts: [{ property: "Time", direction: "descending" }],
    page_size: 12,
    ...(cursor && { start_cursor: cursor })
  });
  
  return {
    results: response.results,
    nextCursor: response.next_cursor,
    hasMore: response.has_more,
  };
}

/* Get all entries by looping through cursors (pages) */ 
export const getAllEntries = unstable_cache(
  async () => {
    const allResults = [];
    let cursor = undefined;
    let hasMore = true;
    
    while (hasMore) {
      const { results, nextCursor, hasMore: more } = await getEntries(cursor);
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
export async function getEntry(pageId) {
  return unstable_cache(
    async () => {
      return notion.pages.retrieve({ page_id: pageId });
    },
    [`singleEntry-${pageId}`],
    { revalidate: 2592000, tags: ['singleEntry', `singleEntry-${pageId}`] }
  )();
}
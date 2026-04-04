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

/* Filter object */ 
function addFilter(filters = {}) {
  const { category, location, year } = filters;
  const conditions = [];
  
  if (category && category !== 'everything') {
    conditions.push({ property: "Category", select: { equals: category } });
  }
  
  if (location && location !== 'everywhere') {
    conditions.push({ property: "Country", select: { equals: location } });
  }
  
  if (year && year !== 'all-time') {
    conditions.push({
      property: "Time",
      date: {
        on_or_after: `${year}-01-01`,
        on_or_before: `${year}-12-31`,
      }
    });
  }
  
  if (conditions.length === 0) return undefined;
  if (conditions.length === 1) return conditions[0];
  return { and: conditions };
}

/* Get the first page of entries */
export async function getEntries(cursor = undefined, filters = {}) {
  const filter = addFilter(filters);
  
  const response = await notion.dataSources.query({
    data_source_id: dataSourceId,
    sorts: [{ property: "Time", direction: "descending" }],
    page_size: 12,
    ...(cursor && { start_cursor: cursor }),
    ...(filter && { filter }),
  });
  
  return {
    results: response.results,
    nextCursor: response.next_cursor,
    hasMore: response.has_more,
  };
}

/* Get all entries by looping through cursors (used for counting entries and pages) */ 
export const getAllEntries = unstable_cache(
  async () => {
    const allResults = [];
    const filters = {};
    let cursor = undefined;
    let hasMore = true;
    let filter = addFilter(filters);
    
    while (hasMore) {
      const response = await notion.dataSources.query({
        data_source_id: dataSourceId,
        sorts: [{ property: "Time", direction: "descending" }],
        ...(cursor && { start_cursor: cursor }),
        ...(filter && { filter }),
      });
      allResults.push(...response.results);
      cursor = response.next_cursor;
      hasMore = response.has_more;
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
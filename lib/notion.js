import { unstable_cache } from "next/cache";
import { Client } from "@notionhq/client";

const notion = new Client({
  auth: process.env.NOTION_KEY,
});

/* Get database */
export const getDatabase = unstable_cache(
  async (databaseId) => {
    const response = await notion.databases.retrieve({
      database_id: databaseId
    });
    return response;
  },
  ['properties'],
  { revalidate: 3600, tags: ['properties'] }
);

/* Get entries */
export const getEntries = unstable_cache(
  async(databaseId) => {
    const notionResponse = await notion.databases.query({
      database_id: databaseId,
      sorts: [
        {
          property: "Time",
          direction: "descending"
        }
      ]
    });
    return notionResponse.results;
  },
  ['entries'],
  { revalidate: 3600, tags: ['entries']}
);

/* Get entries using no cache (used for error handling) */
export const getEntriesNoCache = (async (databaseId) => {
     const newResponse = await notion.databases.query({
      database_id: databaseId,
    });
    return newResponse.results;
})
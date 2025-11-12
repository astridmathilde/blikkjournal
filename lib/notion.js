import { unstable_cache } from "next/cache";
import { Client } from "@notionhq/client";

const notion = new Client({
  auth: process.env.NOTION_KEY,
});

const databaseId = process.env.NOTION_DATABASE_ID;

/* Get database properties */
export const getDatabase = unstable_cache(
  async () => {
    const response = await notion.databases.retrieve({
      database_id: databaseId
    });
    return response;
  },
  ['properties'],
  { revalidate: 8640, tags: ['properties'] } // refresh every day
);

/* Get entries */
export const getEntries = unstable_cache(
  async() => {
    const response = await notion.databases.query({
      database_id: databaseId,
      sorts: [
        {
          property: "Time",
          direction: "descending"
        }
      ]
    });
    return response.results;
  },
  ['entries'],
  { revalidate: 8640, tags: ['entries']} // refresh every day
);

/* Get a single entry */
export const getEntry = async (pageId) => {
  const response = await notion.pages.retrieve({
    page_id: pageId
  });
  return response;
};
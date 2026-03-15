/**
 * Lib -> notion.js
 */

import { unstable_cache } from "next/cache";
import { Client } from "@notionhq/client";

const notion = new Client({
  auth: process.env.NOTION_KEY,
  notionVersion: "2025-09-03",
});

const databaseId = process.env.NOTION_DATABASE_ID;

/* Get database properties */
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

const getDataSourceId = async () => {
  const db = await getDatabase();
  const dataSource = db.data_sources?.[0];
  return dataSource.id;
};

/* Get entries */
export const getEntries = unstable_cache(
  async () => {
    const dataSourceId = await getDataSourceId();

    const response = await notion.request({
      method: "post",
      path: `data_sources/${dataSourceId}/query`,
      body: {
        sorts: [
          {
            property: "Time",
            direction: "descending",
          },
        ],
      },
    });

    return response.results;
  },
  ['entries'],
  { revalidate: 2592000, tags: ['entries'] }
);

/* Get a single entry */
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

/**
* Based on template from Github
* @link https://github.com/samuelkraft/notion-blog-nextjs
*/
import { unstable_cache } from "next/cache";
import { Client } from "@notionhq/client";

const notion = new Client({
  auth: process.env.NOTION_KEY,
});

export const getDatabase = unstable_cache(
  async (databaseId) => {
    const response = await notion.databases.query({
      database_id: databaseId,
      sorts: [
        {
          property: "Time",
          direction: "descending"
        },
        {
          timestamp: "created_time",
          direction: "descending"
        }
      ],
    });
    return response.results;
  },
  ['database'],
  { revalidate: 3600, tags: ['database'] }
);

export const getProperties = unstable_cache(
  async (databaseId) => {
    const response = await notion.databases.retrieve({
      database_id: databaseId
    });
    return response;
  },
  ['properties'],
  { revalidate: 3600, tags: ['properties'] }
);

export const getPostsByCategory = unstable_cache(
  async (databaseId, category) => {
    const response = await notion.databases.query({
      database_id: databaseId,
      "filter": {
        "property": "Category",
        "select": {
          "equals": category
        }
      },
      sorts: [
        {
          property: "Time",
          direction: "descending"
        }
      ],
    });
    return response.results;
  },
  ['database'],
  { revalidate: 3600, tags: ['database'] }
);

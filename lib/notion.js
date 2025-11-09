import { unstable_cache } from "next/cache";
import { Client } from "@notionhq/client";

const notion = new Client({
  auth: process.env.NOTION_KEY,
});

/* Get all entries */
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
    return notionResponse.results.slice(0,);
  },
  ['entries'],
  { revalidate: 3600, tags: ['entries']}
);

/* Get single entry (used for error handling) */
export const getSingleEntry = unstable_cache(
  async(databaseId, entryId) => {
    const notionResponse = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: "ID",
        unique_id: {
          equals: entryId
        }

      }
    });
    return notionResponse.results;
  },
  { revalidate: 3600, tags: ['single-entry']}
);

/* Get all properties */
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

/* Get entries by category */
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
  ['categorisedEntries'],
  { revalidate: 3600, tags: ['categorisedEntries'] }
);
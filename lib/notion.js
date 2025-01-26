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
    database_id: databaseId
  });
    return response.results;
  },
  ['database'],
  { revalidate: 3600, tags: ['database'] }
);
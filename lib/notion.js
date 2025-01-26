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

export const getPage = unstable_cache(
  async (pageId) => {
    const response = await notion.pages.retrieve({ page_id: pageId });
    return response;
  },
  ['pages'],
  { revalidate: 3600, tags: ['pages'] }
);

export const getBlocks = unstable_cache(
  async (blockId) => {
    const response = await notion.blocks.children.list({
    block_id: blockId,
    page_size: 50,
  });
    return response.results;
  },
  ['blocks'],
  { revalidate: 3600, tags: ['blocks'] }
);
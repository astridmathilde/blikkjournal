/**
 * Lib -> notion.js
 * Wrapper that switches between real Notion API and mock data
 */

const USE_MOCK_DATA = process.env.USE_MOCK_DATA === "true";

// Dynamic module selection
const notionModule = USE_MOCK_DATA 
  ? await import("./notion.mock.js")
  : await import("./notion.real.js");

// Re-export functions from selected module
export const getDatabase = notionModule.getDatabase;
export const getEntries = notionModule.getEntries;
export const getEntry = notionModule.getEntry;

"use server";

import { getEntries } from "./notion";
import { getEntryColor } from "./colors.server";

export async function loadMoreEntries(cursor = undefined) {
  const { results, nextCursor, hasMore } = await getEntries(cursor);

  const colors = await Promise.allSettled(
    results.map(entry => getEntryColor(entry.id))
  );

  const entriesWithColors = results.map((entry, i) => ({
    ...entry,
    dominantColor: colors[i].status === 'fulfilled' ? colors[i].value : "#888888"
  }));

  return { results: entriesWithColors, nextCursor, hasMore };
}
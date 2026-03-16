"use server";

import { fetchEntries } from "@/app/lib/notion";

export async function loadMoreEntries(cursor = undefined) {
  return fetchEntries(cursor);
}
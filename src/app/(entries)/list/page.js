import { connection } from "next/server";

import { siteTitle, siteDescription } from "../layout";
import { getEntries, getProperties, getAllEntries } from "@/src/lib/notion";
import { getEntryColor } from "@/src/lib/colors.server";

import FilterWrapper from "@/src/components/filter/wrapper";
import ListEntryLoader from "@/src/components/entry/list-loader";
import ListEntryNav from "@/src/components/entry/list/nav";
import styles from "@/src/assets/scss/list.module.scss";
import utils from "@/src/assets/scss/utils.module.scss";

export const metadata = {
  metadataBase: new URL('https://blikk.directory/list'),
  title: siteTitle,
  description: siteDescription,
};

export default async function List({ searchParams }) {
  await connection();
  const { category, location, year, cursor, page, prev } = await searchParams;
  const filters = { category, location, year };
  
  const [{ results: entries, nextCursor, hasMore }, allEntries, properties] = await Promise.all([
    getEntries(cursor, filters),
    getAllEntries(filters),
    getProperties(),
  ]);
  
  /* Filter options */
  const categories = properties.properties.Category.select.options;
  const locations = properties.properties.Country.select.options;
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 2018 + 1 },
    (_, i) => 2018 + i
  );
  
  /* Display number of entries and pages */
  const totalEntries = allEntries.length;
  const totalPages = Math.ceil(totalEntries / 12);
  const currentPage = page ? parseInt(page) : 1;
  
  /* Getting previous pages */
  const cursors = prev ? prev.split(",") : [];
  const nextPrevCursor = cursor ? [...cursors, cursor].join(",") : "";
  const prevCursor = cursors[cursors.length - 1];
  const prevCursors = cursors.slice(0, -1).join(",");
  
  /* Get dominant color from images and use that as placeholder background color */ 
  const colors = await Promise.allSettled(
    entries.map(entry => getEntryColor(entry.id))
  );
  
  const entriesWithColors = entries.map((entry, index) => ({
    ...entry,
    dominantColor: colors[index].status === 'fulfilled' ? colors[index].value : null,
  }));
  
  return (
    <>
    <h2 className={utils.screen_reader_text}>List</h2>
    
    <FilterWrapper
    categories={categories}
    locations={locations}
    years={years}
    noEntries={entries.length === 0}
    >
    
    <table className={styles.list}>
    <thead>
    <tr>
    <th id="image">Image</th>
    <th id="description">Description</th>
    <th id="location">Location</th>
    <th id="city">City, country</th>
    <th id="category">Category</th>
    <th id="camera">Camera</th>
    <th id="date">Date</th>
    </tr>
    </thead>
    
    <ListEntryLoader
    initialEntries={entriesWithColors}
    initialCursor={nextCursor}
    initialHasMore={hasMore}
    filters={filters}
    />
    </table>
    
    <ListEntryNav
    cursor={cursor}
    nextCursor={nextCursor}
    hasMore={hasMore}
    totalPages={totalPages}
    totalEntries={totalEntries}
    currentPage={currentPage}
    nextPrevCursor={nextPrevCursor}
    prevCursor={prevCursor}
    prevCursors={prevCursors}
    filters={filters}
    hasOnlyOne={entries.length === 1}
    />
    </FilterWrapper>
    </>
  );
}
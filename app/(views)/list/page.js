import { siteTitle, siteDescription } from "../layout";
import { getEntries, getAllEntries } from "@/app/lib/notion";
import { getEntryColor } from "@/app/lib/colors.server";
import ListEntryLoader from "@/app/components/entry/list-loader";
import ListEntryNav from "@/app/components/entry/list-footer";
import styles from "@/app/assets/scss/views/list.module.scss";
import utils from "@/app/assets/scss/utils.module.scss";

export const metadata = {
  metadataBase: new URL('https://blikk.directory/list'),
  title: siteTitle,
  description: siteDescription,
};

export default async function List({ searchParams }) {
  const { cursor, page, prev } = await searchParams;
  const [{ results: entries, nextCursor, hasMore }, allEntries] = await Promise.all([
    getEntries(cursor),
    getAllEntries(),
  ]);
  
  const totalEntries = allEntries.length;
  const totalPages = Math.ceil(totalEntries / 12);
  const currentPage = page ? parseInt(page) : 1;
  
  /* Getting previous pages */
  const cursors = prev ? prev.split(",") : [];
  const nextPrevCursor = cursor ? [...cursors, cursor].join(",") : "";
  const prevCursor = cursors[cursors.length - 1];
  const prevCursors = cursors.slice(0, -1).join(",");
  
  /* Get dominant color from images and use that as placeholder background color */ 
  const colors = await Promise.all(
    entries.map(entry => getEntryColor(entry.id))
  );
  
  const entriesWithColors = entries.map((entry, index) => ({
    ...entry,
    dominantColor: colors[index]
  }));
  
  return (
    <>
    <h2 className={utils.screen_reader_text}>Index</h2>
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
    />
    </>
  );
}
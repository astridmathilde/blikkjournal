import { siteTitle, siteDescription } from "../layout";
import { getEntries, getAllEntries } from "@/app/lib/notion";
import ListEntry from "@/app/components/entry/list";
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
    <tbody>
    {entries.map((entry, index) => {
      const isAboveTheFold = index < 15;
      const entryId = entry.id;
      const title = entry.properties?.Title?.title[0]?.plain_text || "";
      const fileName = entry.properties?.Image?.files[0]?.name || "";
      const location = entry.properties?.Place?.select?.name || "";
      const city = entry.properties?.City?.select?.name || "";
      const country = entry.properties?.Country?.select?.name || "";
      const time = entry.properties.Time.date?.start;
      const camera = entry.properties?.Camera?.select?.name || "";
      const category = entry.properties?.Category?.select?.name || "";
      
      const date = new Date(time).toLocaleString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
      });
      
      return (
        <ListEntry
        key={entryId}
        id={entryId}
        title={title}
        fileName={fileName}
        location={location}
        city={city}
        country={country}
        category={category}
        camera={camera}
        date={date}
        priority={isAboveTheFold ? "true" : ""}
        />
      );
    })}
    </tbody>
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
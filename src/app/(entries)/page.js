import { siteTitle, siteDescription } from "./layout";
import { getEntries, getAllEntries } from "@/src/lib/notion";
import { getEntryColor, createPastelColor } from "@/src/lib/colors.server";
import EntryGalleryLoader from "@/src/components/entry/gallery-loader";
import utils from "@/src/assets/scss/utils.module.scss";

export const metadata = {
  metadataBase: new URL('https://blikk.directory'),
  title: siteTitle,
  description: siteDescription,
};

export default async function Gallery({ searchParams }) {
  const { cursor } = await searchParams;
  const [{ results: entries, nextCursor, hasMore }, allEntries] = await Promise.all([
    getEntries(cursor),
    getAllEntries(),
  ]);
  
  /* Get dominant color from images and use that as placeholder background color */ 
  const colors = await Promise.all(
    entries.map(entry => getEntryColor(entry.id))
  );

  const entriesWithColors = entries.map((entry, index) => ({
    ...entry,
    dominantColor: createPastelColor(colors[index])
  }));
  
  return (
    <>
    <h2 className={utils.screen_reader_text}>Gallery</h2>
    <EntryGalleryLoader
    initialEntries={entriesWithColors}
    initialCursor={nextCursor}
    initialHasMore={hasMore}
    />
    </>
  );
}
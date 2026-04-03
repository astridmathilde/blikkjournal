import { siteTitle, siteDescription } from "./layout";
import { getEntries } from "@/src/lib/notion";
import { getEntryColor, createPastelColor } from "@/src/lib/colors.server";
import EntryGalleryLoader from "@/src/components/entry/gallery-loader";
import utils from "@/src/assets/scss/utils.module.scss";

export const metadata = {
  metadataBase: new URL('https://blikk.directory'),
  title: siteTitle,
  description: siteDescription,
};


export default async function Gallery() {
  const { results, nextCursor, hasMore } = await getEntries();
  
  /* Get dominant color from images and use that as placeholder background color */ 
  const colors = await Promise.allSettled(
    results.map(entry => getEntryColor(entry.id))
  );
  
  const entriesWithColors = results.map((entry, index) => ({
    ...entry,
    dominantColor: createPastelColor(
      colors[index].status === 'fulfilled' ? colors[index].value : null
    )
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
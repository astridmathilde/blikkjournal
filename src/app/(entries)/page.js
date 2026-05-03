import { connection } from "next/server";

import { siteTitle, siteDescription } from "./layout";
import { getEntries, getProperties } from "@/src/lib/notion";
import { getEntryColor, createPastelColor } from "@/src/lib/colors.server";

import FilterWrapper from "@/src/components/filter/wrapper";
import EntryGalleryLoader from "@/src/components/entry/gallery-loader";
import utils from "@/src/assets/scss/utils.module.scss";

export const metadata = {
  metadataBase: new URL('https://blikk.directory'),
  title: siteTitle,
  description: siteDescription,
};

export default async function Gallery({ searchParams }) {
  await connection();
  const { category, location, year, cursor } = await searchParams;
  const filters = { category, location, year };
  
  const [{ results: entries, nextCursor, hasMore }, properties] = await Promise.all([
    getEntries(cursor, filters),
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
  
  /* Get dominant color from images and use that as placeholder background color */ 
  const colors = await Promise.allSettled(
    entries.map(entry => getEntryColor(entry.id))
  );
  
  const entriesWithColors = entries.map((entry, index) => ({
    ...entry,
    dominantColor: createPastelColor(
      colors[index].status === 'fulfilled' ? colors[index].value : null
    )
  }));
  
  return (
    <>
    <h2 className={utils.screen_reader_text}>Gallery</h2>

    <FilterWrapper
    categories={categories}
    locations={locations}
    years={years}
    noEntries={entries.length === 0}
    >
    
    <EntryGalleryLoader
    initialEntries={entriesWithColors}
    initialCursor={nextCursor}
    initialHasMore={hasMore}
    filters={filters}
    />
    
    </FilterWrapper>
    </>
  );
}
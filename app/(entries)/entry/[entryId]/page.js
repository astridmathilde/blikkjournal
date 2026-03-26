import { getEntry, getAllEntries } from "../../../lib/notion";
import { createPastelColor, getEntryColor } from "@/app/lib/colors.server";

import { siteTitle, siteDescription } from "@/app/(views)/layout";

import SingleEntry from "../../../components/entry/single";
import SingleEntryNav from "@/app/components/entry/single/nav";
import SingleEntryHeader from "@/app/components/entry/single/header";
import SingleEntryImageWrapper from "@/app/components/entry/single/image";
import NavBack from "../../../components/nav-back";
import EntryImage from "@/app/components/entry/image";

import styles from "../../../assets/scss/components/entry/single/image-wrapper.module.scss";

export const metadata = {
  title: siteTitle,
  description: siteDescription,
};

export default async function Post({ params }) {
  const { entryId } = await params;
  const entry = await getEntry(entryId);
  
  const title = entry.properties?.Title?.title[0]?.plain_text || "";
  const fileName = entry.properties?.Image?.files[0]?.name || "";
  const location = entry.properties?.Place?.select?.name || "";
  const city = entry.properties?.City?.select?.name || "";
  const country = entry.properties?.Country?.select?.name || "";
  const time = entry.properties.Time.date?.start;
  const camera = entry.properties?.Camera?.select?.name || "";
  
  const date = new Date(time).toLocaleString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  });
  
  /* Get dominant color from image & make a pastel color used for background */
  const domColor = await getEntryColor(entryId);
  const bgColor = createPastelColor(domColor);
  
  /* Get prev and next entries across full collection */
  const entries = await getAllEntries();
  const currentIndex = entries.findIndex(e => e.id === entryId);
  
  const prevEntry = currentIndex > 0 ? entries[currentIndex - 1] : null;
  const nextEntry = currentIndex < entries.length - 1 ? entries[currentIndex + 1] : null;
  
  return (
    <SingleEntry key={entryId} bgColor={bgColor}>
    <NavBack>
    <SingleEntryHeader title={title} date={date} location={location} city={city} country={country} />
    
    <div className={styles.imgWrapper}>
    <SingleEntryImageWrapper fileName={fileName} camera={camera}>
    <EntryImage alt={title} entryId={entryId} width="738" height="738" priority="true" sizes="(max-width: 440px) 100vw, 60vw" placeholderColor={domColor} />
    </SingleEntryImageWrapper>
    </div>
    
    </NavBack>
    
    <SingleEntryNav entryId={entryId} prevEntry={prevEntry} nextEntry={nextEntry} />
    </SingleEntry>
    
  );
}
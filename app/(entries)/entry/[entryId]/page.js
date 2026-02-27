import { getEntry } from "../../../lib/notion"; 
import { getEntries } from "../../../lib/notion"; 
import { siteTitle, siteDescription } from "@/app/(views)/layout";
import SingleEntry from "../../../components/entry/single/wrapper";
import SingleEntryNav from "@/app/components/entry/single/nav";
import EntryHeaderSingle from "@/app/components/entry/single/header";
import NavBack from "../../../components/nav-back";
import EntryImage from "@/app/components/entry/image";
import styles from "../../../assets/scss/components/entry/single/img.module.scss";
import utils from "../../../assets/scss/utils.module.scss";

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
  
  const date = new Date(time).toLocaleString(
    'en-US',
    {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    },
  );
  
  /* Get prev and next entries */
  const entries = await getEntries();
  const currentIndex = entries.findIndex(entry => entry.id === entryId);
  
  const prevEntry = currentIndex > 0 ? entries[currentIndex - 1] : null;
  const nextEntry = currentIndex< entries.length - 1 ? entries[currentIndex + 1] : null;
  
  
  return (
    <SingleEntry entryId={entryId}>
    <EntryHeaderSingle title={title} date={date} location={location} city={city} country={country} />
    
    <div className={styles.imgWrapper}>
    <NavBack>
    <figure className={styles.image}>
    <EntryImage alt={title} entryId={entryId} width="600" height="600" preload={true} loading="eager" />
      <figcaption className={styles.caption}>
      <ul>
      <li><span className={utils.screen_reader_text}>File name: </span>{fileName}</li>
      <li><span className={utils.screen_reader_text}>Camera: </span>{camera}</li>
      </ul>
      </figcaption>
      </figure>
      </NavBack>
      </div>
      
      <SingleEntryNav entryId={entryId} prevEntry={prevEntry} nextEntry={nextEntry} />
      </SingleEntry>
    )
    
  }
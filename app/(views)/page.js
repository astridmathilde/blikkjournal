/* Get data from Notion */
import { getEntries } from "../lib/notion";
import GalleryEntry from "../components/entry/gallery";
import styles from '../assets/scss/views/gallery.module.scss'

/* Display content */
export default async function Gallery() {
  const entries = await getEntries();
  
  return (
    <>
    <div key="entries" className={styles.gallery}>
    {entries.map((entry, index) => { 
      const isAboveTheFold = index < 10;
      
      const entryId = entry.id;
      const title = entry.properties?.Title?.title[0]?.plain_text || "";
      const name = entry.properties?.Image?.files[0]?.name || "";
      const place = entry.properties?.Place?.select?.name || "";
      const city = entry.properties?.City?.select?.name || "";
      const country = entry.properties?.Country?.select?.name || "";
      const camera = entry.properties?.Camera?.select?.name || "";
      const time = entry.properties.Time.date?.start;
      
      return <GalleryEntry key={entryId} id={entryId} place={place} title={title} city={city} country={country} time={time} camera={camera} name={name} priority={isAboveTheFold ? "true" : ""} />
      
    })}
    </div>
    </>
  );
  
}
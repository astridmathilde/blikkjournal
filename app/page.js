/**
* App -> page.js
*/

/* Get data from Notion */
import { getEntries } from "../lib/notion";
import Entry from "../components/entry";
import styles from '../assets/scss/views/gallery.module.scss'
import utils from '../assets/scss/utils.module.scss'

/* Display content */
export default async function Index() {
  const entries = await getEntries();
  
  return (
    <>
    <h2 className={utils.screen_reader_text}>Gallery</h2>
    <div key="entries" className={styles.gallery}>
    {entries.map((entry) => {      
      const entryId = entry.id;
      const title = entry.properties?.Title?.title[0]?.plain_text || "";
      const name = entry.properties?.Image?.files[0]?.name || "";
      const place = entry.properties?.Place?.select?.name || "";
      const city = entry.properties?.City?.select?.name || "";
      const country = entry.properties?.Country?.select?.name || "";
      const camera = entry.properties?.Camera?.select?.name || "";
      const time = entry.properties.Time.date?.start;
      
      return <Entry key={entryId} id={entryId} place={place} title={title} city={city} country={country} time={time} camera={camera} name={name} />
      
    })}
    </div>
    </>
  );
  
}
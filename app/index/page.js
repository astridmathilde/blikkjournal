import { getEntries } from "../../lib/notion";
import Filter from "../../components/filter";
import Entry from "../../components/entry";
import styles from "../../assets/scss/index.module.scss";

export default async function Index() {
  const entries = await getEntries();
  
  console.log(entries);
  
  return (
    <>
    <Filter />
    <div key="entries" className={styles.index}>
    {entries.map((entry) => {      
      const entryId = entry.id;
      const title = entry.properties?.Title?.title[0]?.plain_text || "";
      const name = entry.properties?.Image?.files[0]?.name || "";
      const place = entry.properties?.Place?.select?.name || "";
      const city = entry.properties?.City?.select?.name || "";
      const country = entry.properties?.Country?.select?.name || "";
      const time = entry.properties.Time.date?.start;
      const camera = entry.properties?.Camera?.select?.name || "";
      const category = entry.properties?.Category?.select?.name || "";
      
      return <Entry key={entryId} id={entryId} place={place} title={title} name={name} city={city} country={country} camera={camera} category={category} time={time} />
      
    })}
    </div>
    </>
  )
}
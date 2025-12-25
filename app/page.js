/* Get data from Notion */
import { getEntries } from "../lib/notion";
import Entry from "../components/entry";

/* Display content */
export default async function Index() {
  const entries = await getEntries();
  
  return (
    <div key="entries">
    {entries.map((entry) => {      
      const entryId = entry.id;
      const proxySrc = `/api/images/${entryId}`;
      const title = entry.properties?.Title?.title[0]?.plain_text || "";
      const place = entry.properties?.Place?.select?.name || "";
      const city = entry.properties?.City?.select?.name || "";
      const country = entry.properties?.Country?.select?.name || "";
      const time = entry.properties.Time.date?.start;
     
      return <Entry key={entryId} id={entryId} place={place} img={proxySrc} title={title} city={city} country={country} time={time} />
    })}
    </div>
  );
  
}
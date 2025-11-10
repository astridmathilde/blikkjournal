/* Get data from Notion */
import { getEntries } from "/lib/notion";
const databaseId = process.env.NOTION_DATABASE_ID;
import Entry from "/components/entry";

/* Display content */
export default async function Index() {
  const entries = await getEntries(databaseId);
  
  return (
    <div key="entries">
    {entries.map((entry) => {      
      const imgUrl = entry.properties.Image.files[0]?.file.url;
      const title = entry.properties?.Title?.title[0]?.plain_text || "";
      const city = entry.properties?.City?.select?.name || "";
      const country = entry.properties?.Country?.select?.name || "";
      const time = entry.properties.Time.date?.start;

      return <Entry img={imgUrl} title={title} city={city} country={country} time={time} />
    })}
    </div>
  );
    
}
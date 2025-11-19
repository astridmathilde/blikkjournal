/* Get data from Notion */
import { getDatabase } from "/lib/notion";
import { getEntries } from "/lib/notion";
import Entry from "/components/entry";

/* Generate one page for each category */
export async function generateStaticParams() {
  const response = await getDatabase();
  const properties = response?.properties?.Category?.select?.options || [];
  
  return properties.map((property) => ({
    slug: property.name
  }));
}

/* Display the content */
export default async function Post({ params }) {
  const { slug } = await params;
  
  const result = await getEntries();
  const entries = result.filter((entry) => entry.properties?.Category?.select?.name === slug);
  
  return (
    <div key="entries">
    {entries.map((entry) => {      
      const entryId = entry.id;
      const imgUrl = entry.properties.Image.files[0]?.file.url;
      const title = entry.properties?.Title?.title[0]?.plain_text || "";
      const place = entry.properties?.Place?.select?.name || "";
      const city = entry.properties?.City?.select?.name || "";
      const country = entry.properties?.Country?.select?.name || "";
      const time = entry.properties.Time.date?.start;
      
      return <Entry key={entryId} id={entryId} img={imgUrl} title={title} city={city} place={place} country={country} time={time} />
    })}
    </div>
  );
}
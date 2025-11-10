
/* Get data from Notion */
import { getDatabase } from "/lib/notion";
import { getEntries } from "/lib/notion";
const databaseId = process.env.NOTION_DATABASE_ID;
import Entry from "/components/entry";

/* Generate one page for each category */
export async function generateStaticParams() {
  const response = await getDatabase(databaseId);
  const properties = response?.properties?.Category?.select?.options || [];
  
  return properties.map((property) => ({
    slug: property.name
  }));
}

/* Display the content */
export default async function Post({ params }) {
  const { slug } = await params;
  
  const result = await getEntries(databaseId);
  const entries = result.filter((entry) => entry.properties?.Category?.select?.name === slug);
  console.log(result);
  
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
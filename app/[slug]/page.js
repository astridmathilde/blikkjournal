import entryStyle from '../../assets/scss/entry.module.scss';
import EntryImage from '../../components/entry-image';

/* Get data from Notion */
import { getProperties, getPostsByCategory } from "/lib/notion";
const databaseId = process.env.NOTION_DATABASE_ID;

export async function generateStaticParams() {
  const response = await getProperties(databaseId);
  const properties = response?.properties?.Category?.select?.options || [];
  
  return properties.map((property) => ({
    slug: property.name
  }));
}

/* Display the content */
export default async function Post({ params }) {
  const { slug } = await params;
  const entries = await getPostsByCategory(databaseId, slug);
  
  return (
    <>
    {entries.map((entry) => {
      const imgUrl = entry.properties.Image.files[0]?.file.url;
      const title = entry.properties?.Title?.title[0]?.plain_text || "";
      const city = entry.properties?.City?.select?.name || "";
      const country = entry.properties?.Country?.select?.name || "";
      const time = entry.properties.Time.date?.start;
      const dateTime = new Date(time).toJSON();
      const date = new Date(time).toLocaleString(
        'en-US',
        {
          month: 'short',
          day: '2-digit',
          year: 'numeric',
        },
      );

        return (
          <article key={entry.id} className={entryStyle.entry}>
          <h2 className={entryStyle.caption}>{title}</h2>
          <ul>
          <li key="date"><time dateTime={dateTime}>{date}</time></li>
          {city || country ? <li key="location">{city}, {country}</li> : <></> }
          </ul>
          <figure>
          <EntryImage src={imgUrl} alt={title} entryID={entry.id} databaseId={databaseId} />
          </figure> 
          </article>
        );
      
    })}
    </>
  );
}
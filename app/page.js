import Image from "next/image";
import entryStyle from '../assets/scss/entry.module.scss';

/* Get data from Notion */
import { getEntries } from "/lib/notion";
const databaseId = process.env.NOTION_DATABASE_ID;

/* Display content */
export default async function Index() {
  const entries = await getEntries(databaseId);
  
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
      if (imgUrl) {
        return (
          <article key={entry.id} className={entryStyle.entry}>
          <h2 className={entryStyle.caption}>{title}</h2>
          <ul>
          <li key="date"><time dateTime={dateTime}>{date}</time></li>
          {city || country ? <li key="location">{city}, {country}</li> : <></> }
          </ul>
          <figure>
          <Image src={imgUrl} alt={title} fill={true} priority={Index === 0} />
          </figure> 
          </article>
        );
      }
    })}
    </>
  );
    
}
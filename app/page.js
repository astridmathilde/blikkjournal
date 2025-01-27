import Image from "next/image";
import { getDatabase } from "/lib/notion";

export const databaseId = process.env.NOTION_DATABASE_ID;

async function getPosts() {
  const database = await getDatabase(databaseId);
  return database;
}

export default async function Index() {
  const entries = await getPosts();

  return (
    <>
    {entries.map((entry) => {
      const title = entry.properties.Title.title[0]?.plain_text;
      const image = entry.properties.Image.files[0]?.file.url;
      const location = entry.properties.Location.rich_text[0]?.plain_text;
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
        <article key={entry.id}>
        <h2>{title}</h2>
        <ul>
        {time ? <li><time dateTime={dateTime}>{date}</time></li> : <></> }
        {location ? <li>{location}</li> : <></> }
        </ul>
        {image ? <figure><Image src={image} alt={title} fill={true} /> </figure> : <></>}
        </article>
      )
    })}
    </>
  );
}


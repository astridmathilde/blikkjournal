import Image from "next/image";
import { getProperties, getPostsByCategory } from "/lib/notion";

export const databaseId = process.env.NOTION_DATABASE_ID;

async function listProperties() {
  const data = await getProperties(databaseId);
  return data;
}

export async function generateStaticParams() {
  const response = await listProperties();
  const properties = response.properties.Category.select.options;
  
  return properties?.map((property) => {
    const slug = property.name;
    return ({ id: property.id, slug });
  });
}

export default async function Post({ params }) {
  const entries = await getPostsByCategory(databaseId, params?.slug);
  
  return (
    <>
    {entries.map((entry) => {
      const title = entry.properties.Title.title[0]?.plain_text;
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
        <figure>
        <Image src={`/images/${entry.id}.jpg`} alt={title} fill={true} />
        </figure>
        </article>
      )
    })}
    </>
  )
}
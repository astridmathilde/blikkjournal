import Image from "next/image";
import { getProperties, getPostsByCategory } from "/lib/notion";

export const databaseId = process.env.NOTION_DATABASE_ID;

export async function generateStaticParams() {
  const response = await getProperties(databaseId);
  const properties = response?.properties?.Category?.select?.options || [];
  
  return properties.map((property) => ({
    slug: property.name, // Use slug name directly
  }));
}

export default async function Post({ params }) {
  const { slug } = params; // Access params.slug directly
  const entries = await getPostsByCategory(databaseId, slug);

  return (
    <>
      {entries.map((entry) => {
        const title = entry.properties?.Title?.title[0]?.plain_text || "";
        const location = entry.properties?.Location?.rich_text[0]?.plain_text || "";
        const time = entry.properties.Time.date?.start;
        const dateTime = new Date(time).toJSON();
        const date = new Date(time).toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        });

        return (
          <article key={entry.id}>
            <h2>{title}</h2>
            <ul>
              {time ? (
                <li key="time">
                  <time dateTime={dateTime}>{date}</time>
                </li>
              ) : null}
              {location ? <li key="location">{location}</li> : null}
            </ul>
            <figure>
              <Image src={`/images/${entry.id}.jpg`} alt={title} fill={true} />
            </figure>
          </article>
        );
      })}
    </>
  );
}
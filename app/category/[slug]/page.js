import Image from "next/image";
import { changeProperty } from "/lib/notion";
import { getProperties, getPostsByCategory } from "/lib/notion";
import { uploadFile, retrieveFile } from "/lib/subabase";

export const databaseId = process.env.NOTION_DATABASE_ID;

export async function generateStaticParams() {
  const response = await getProperties(databaseId);
  const properties = response?.properties?.Category?.select?.options || [];
  
  return properties.map((property) => ({
    slug: property.name, // Use slug name directly
  }));
}

export default async function Post({ params }) {
  const { slug } = await params;
  const entries = await getPostsByCategory(databaseId, slug);
  
  return (
    <>
    {entries.map((entry) => {
      function addImage() {
        const imgName = entry.id;
        const imgUrl = entry.properties.Image.files[0]?.file.url;
        const image = retrieveFile(entry.id);
        
        uploadFile(imgUrl, imgName);
        return image;
      }
      
      function entryDate() {
        const time = entry.properties.Time.date?.start;
        
        if(!time) {
          return changeProperty(entry).properties?.Time.date?.start;
        } else {
          return time;
        }
      }
      
      const title = entry.properties?.Title?.title[0]?.plain_text || "";
      const location = entry.properties?.Location?.rich_text[0]?.plain_text || "";
      const dateTime = new Date(entryDate()).toJSON();
      const date = new Date(entryDate()).toLocaleString(
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
        <li key="date"><time dateTime={dateTime}>{date}</time></li>
        {location ? <li key="location">{location}</li> : <></> }
        </ul>
        <figure>
        <Image src={addImage()} alt={title} fill={true} />
        </figure>
        </article>
      );
    })}
    </>
  );
}

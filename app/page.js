import Image from "next/image";
import { getDatabase } from "/lib/notion";
import { uploadFile, retrieveFile } from "/lib/subabase";

export const databaseId = process.env.NOTION_DATABASE_ID;

export default async function Index() {
  const entries = await getDatabase(databaseId);

  /* Downloading the image for each entry */
    entries.forEach(image => {
    const imgName = image.id;
    const imgUrl = image.properties.Image.files[0]?.file.url;
    
    uploadFile(imgUrl, imgName);
  });
  
  return (
    <>
    {entries.map((entry) => {
      const image = retrieveFile(entry.id);
      const title = entry.properties?.Title?.title[0]?.plain_text || "";
      const location = entry.properties?.Location?.rich_text[0]?.plain_text || "";
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
        <>
        <article key={entry.id}>
        <h2>{title}</h2>
        <ul>
        {time ? <li key="date"><time dateTime={dateTime}>{date}</time></li> : <></> }
        {location ? <li key="location">{location}</li> : <></> }
        </ul>
        <figure>
        <Image src={image} alt={title} fill={true} />
        </figure> 
        </article>
        </>
      )
    })}
    </>
  );
}
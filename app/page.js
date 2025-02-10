import Image from "next/image";
import { getDatabase } from "/lib/notion";
import { changeProperty } from "/lib/notion";
import { retrieveFile, uploadFile, checkFiles } from "/lib/subabase";

export const databaseId = process.env.NOTION_DATABASE_ID;

export default async function Index() {
  const entries = await getDatabase(databaseId);
  const images = await checkFiles();
  
  return (
    <>
    {entries.map((entry) => { 
      function getImage() {
        const getImageIDs = images.map(image => `${image.name.replace(".jpg", "")}`);
        
        const imgName = entry.id;
        const imgUrl = entry.properties.Image.files[0]?.file.url;
        
        if (! getImageIDs.includes(imgName)) {
         uploadFile(imgUrl, imgName);
        }
        return retrieveFile(entry.id);
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
        <>
        <article key={entry.id}>
        <h2>{title}</h2>
        <ul>
        <li key="date"><time dateTime={dateTime}>{date}</time></li>
        {location ? <li key="location">{location}</li> : <></> }
        </ul>
        <figure>
        <Image src={getImage()} alt={title} fill={true} />
        </figure> 
        </article>
        </>
      )
    })}
    </>
  );
}
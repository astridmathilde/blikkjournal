import Image from "next/image";
import entryStyle from '../assets/scss/entry.module.scss';

/* Get colors from image */
import { useExtractColors } from "react-extract-colors";

  const src = "https://zyogtonhvhmvovtskbnr.supabase.co/storage/v1/object/public/images/public/1ef83ae9-ec68-8063-8cd7-f2b4b04d1540.jpg";
  const { colors, dominantColor, darkerColor, lighterColor, loading, error } =
  useExtractColors(src);
  
  console.log(dominantColor);

/* Get data from Notion */
import { getEntries } from "/lib/notion";
const databaseId = process.env.NOTION_DATABASE_ID;

/* Get images from Supabase */
import { createClient } from '@supabase/supabase-js';
import { uploadImage } from "/lib/supabase";
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

/* Display content */
export default async function Index() {
  const entries = await getEntries(databaseId);
  
  entries.forEach(entry => {
    const imgName = entry.id;
    const imgUrl = entry.properties.Image.files[0]?.file.url;
    
    uploadImage(imgName, imgUrl);
  });
  
  getColors();
  
  return (
    <>
    {entries.map((entry) => {
      function getImage() {
        const {data, error} = supabase.storage.from('images').getPublicUrl(`public/${entry.id}.jpg`);
        
        if (error) {
          console.log(error);
        } else {
          return data.publicUrl;
        }
      }
      
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
      
      if (getImage()) {
        return (
          <article key={entry.id} className={entryStyle.entry}>
          <h2 className={entryStyle.caption}>{title}</h2>
          <ul>
          <li key="date"><time dateTime={dateTime}>{date}</time></li>
          {city || country ? <li key="location">{city}, {country}</li> : <></> }
          </ul>
          <figure>
          <Image src={getImage()} alt={title} fill={true} priority={Index === 0} placeholder="blur" />
          </figure> 
          </article>
        );
      }
    })}
    </>
  );
  
}
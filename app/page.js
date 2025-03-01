import { unstable_cache } from "next/cache";
import Image from "next/image";
import fetch from 'node-fetch';
import styles from '../assets/scss/entry.module.scss';

/* Access data from Notion */
import { Client } from "@notionhq/client";

const databaseId = process.env.NOTION_DATABASE_ID;
const notion = new Client({
  auth: process.env.NOTION_KEY,
});

/* Access storage at Supabase */ 
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

/* Get entries */
const getEntries = unstable_cache(
  async() => {
    const notionResponse = await notion.databases.query({
      database_id: databaseId,
      sorts: [
        {
          property: "Time",
          direction: "descending"
        }
      ]
    });
    return notionResponse.results.slice(0, 24);
  },
  ['entries'],
  { revalidate: 86400, tags: ['entries']}
);

/* Get images */
async function uploadImage(imgName, imgUrl) {
  const fileName = `/public/${imgName}.jpg`;
  const supaResponse = await fetch(imgUrl); 
  const fileData = await supaResponse.arrayBuffer();
  
  const { error } = await supabase.storage.from('images').upload(fileName, fileData, {
    cacheControl: '86400',
    contentType: 'image/webp'
  });
  if (error) {
    console.log(error);
  } else {
    console.log(`Succesfully uploaded ${fileName}`);
  }
}

/* Display content */
export default async function Index() {
  const entries = await getEntries();
  
  return (
    <>
    {entries.map((entry) => {
      /* Retrieve images */
      function getImage() {
        const imgName = entry.id;
        const imgUrl = entry.properties.Image.files[0]?.file.url;
        
        const {data, error} = supabase.storage.from('images').getPublicUrl(`public/${imgName}.jpg`);
        
        if (error) {
          uploadImage(imgName, imgUrl);
        } else {
          return data.publicUrl;
        }
      }
      
      /* Display entry content */
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
      
      if (getImage()) {
      return (
        <article key={entry.id} className={styles.entry}>
        <h2 className={styles.caption}>{title}</h2>
        <ul>
        <li key="date"><time dateTime={dateTime}>{date}</time></li>
        {location ? <li key="location">{location}</li> : <></> }
        </ul>
        <figure>
        <Image src={getImage()} alt={title} fill={true} />
        </figure> 
        </article>
      );
      }
    })}
    </>
  );
  
}
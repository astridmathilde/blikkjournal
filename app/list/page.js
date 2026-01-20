/**
* App -> List -> page.js
*/

import dynamic from 'next/dynamic';

import { getEntries } from "@/lib/notion";
const ListEntry = dynamic(() => import("@/components/entry/list"))
import styles from "@/assets/scss/views/list.module.scss";

export default async function List() {
  const entries = await getEntries();
  
  return (
    <>
    <table className={styles.list}>
    <thead>
    <tr>
    <th id="image">Image</th>
    <th id="description">Description</th>
    <th id="location">Location</th>
    <th id="city">City, country</th>
    <th id="category">Category</th>
    <th id="camera">Camera</th>
    <th id="date">Date</th>
    </tr>
    </thead>
    <tbody>
    {entries.map((entry) => {      
      const entryId = entry.id;
      const title = entry.properties?.Title?.title[0]?.plain_text || "";
      const fileName = entry.properties?.Image?.files[0]?.name || "";
      const location = entry.properties?.Place?.select?.name || "";
      const city = entry.properties?.City?.select?.name || "";
      const country = entry.properties?.Country?.select?.name || "";
      const time = entry.properties.Time.date?.start;
      const camera = entry.properties?.Camera?.select?.name || "";
      const category = entry.properties?.Category?.select?.name || "";  
      
      const date = new Date(time).toLocaleString(
        'en-US',
        {
          month: 'short',
          day: '2-digit',
          year: 'numeric',
        },
      );   
    
      return <ListEntry id={entryId} title={title} fileName={fileName} location={location} city={city} country={country} category={category} camera={camera} date={date} />
    })}
    </tbody>
    </table>
    </>
  )
}
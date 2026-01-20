/** 
* App -> entry -> [entryId] -> page.js
*/

import { getEntry } from "@/lib/notion"; 
import NavBack from "@/components/nav-back";
import EntryImage from "@/components/entry-image";
import utils from "@/assets/scss/utils.module.scss";

export default async function Post({ params }) {
  const { entryId } = await params
  const entry = await getEntry(entryId);
  
  const title = entry.properties?.Title?.title[0]?.plain_text || "";
  const fileName = entry.properties?.Image?.files[0]?.name || "";
  const location = entry.properties?.Place?.select?.name || "";
  const city = entry.properties?.City?.select?.name || "";
  const country = entry.properties?.Country?.select?.name || "";
  const time = entry.properties.Time.date?.start;
  const camera = entry.properties?.Camera?.select?.name || "";
  
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
    <NavBack>
    <article key={entryId}>
    <header>
    <h2>{title}</h2>
    <ul>
    <li key="date"><span className={utils.screen_reader_text}>Date: </span><time dateTime={dateTime}>{date}</time></li>
    {location ? <li key="place"><span className={utils.screen_reader_text}>Location: </span>{location}</li> : <></> }
    <li key="city-country"><span className={utils.screen_reader_text}>City and country: </span>{city}, {country}</li>
    </ul>
    </header>

    <figure>
    <EntryImage alt={entry.title} entryId={entry.id} fill={false} width="1200" height="1200" />
    <figcaption>
    <ul>
    <li key="filename"><span className={utils.screen_reader_text}>File name: </span>{entry.fileName}</li>
    {entry.camera ? <li key="camera"><span className={utils.screen_reader_text}>Camera: </span>{entry.camera}</li> : <></> }
    </ul>
    </figcaption>
    </figure>
    </article>
    </NavBack>
  )
  
}
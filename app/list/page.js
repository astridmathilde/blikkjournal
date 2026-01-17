import { getEntries } from "../../lib/notion";
import Filter from "../../components/filter";
import EntryImage from "../../components/entry-image";
import styles from "../assets/scss/views/index.module.scss";
import utils from '../assets/scss/utils.module.scss'

export default async function Index() {
  const entries = await getEntries();
  
  return (
    <>
    <h2 className={utils.screen_reader_text}>Index</h2>
    <Filter />
    <table className={styles.index}>
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
      const name = entry.properties?.Image?.files[0]?.name || "";
      const place = entry.properties?.Place?.select?.name || "";
      const city = entry.properties?.City?.select?.name || "";
      const country = entry.properties?.Country?.select?.name || "";
      const time = entry.properties.Time.date?.start;
      const camera = entry.properties?.Camera?.select?.name || "";
      const category = entry.properties?.Category?.select?.name || "";  
      
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
        <tr key={entryId}>
        <td colSpan="2" headers="image">
        <figure>
        <EntryImage alt={title} entryId={entryId} width="40" height="40" />
        </figure> 
        <span className={styles.fileName}>{name}</span>
        </td>
        <td headers="description">{title}</td>
        <td headers="location">{place}</td>
        <td headers="city">{city}, {country}</td>
        <td headers="category">{category}</td>
        <td headers="camera">{camera}</td>
        <td headers="date">{date}</td>
        </tr>
      );
    })}
    </tbody>
    </table>
    </>
  )
}
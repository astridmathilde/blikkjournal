import styles from '../assets/scss/components/entry.module.scss';
import EntryImage from './entry-image';

export default function Entry(entry) {
  const entryId = entry.id;
  const name = entry.name;
  const title = entry.title;
  const place = entry.place;
  const city = entry.city;
  const country = entry.country;
  const category = entry.category;
  const camera = entry.camera;
  const time = entry.time;
  
  const dateTime = new Date(time).toJSON();
  const date = new Date(time).toLocaleString(
    'en-US',
    {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    },
  );
  
  const hasImg = `/api/images/${entry.id}`;
  
  if (hasImg ) {
    return (
      <article key={entryId} className={styles.entry}>
      <h2 className={styles.caption}>{title}</h2>
      {name ? <p className={styles.name}>{name}</p> : <></>}
      <ul className={styles.metadata}>
        {place ? <li className={styles.place} key="place">{place}</li> : <></> }
      <li className={styles.city} key="city">{city}</li>
      <li className={styles.country} key="country">{country}</li>
      {category ? <li className={styles.category} key="category">{category}</li> : <></> }
      {camera ? <li className={styles.camera} key="camera">{camera}</li> : <></> }
      <li className={styles.date} key="time"><time dateTime={dateTime}>{date}</time></li>
      </ul>
      <figure>
      <EntryImage alt={title} entryId={entryId}/>
      </figure> 
      </article>
    );
  } 
}
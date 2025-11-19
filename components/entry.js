import styles from '/assets/scss/entry.module.scss';
import EntryImage from '/components/entry-image';

export default function Entry(entry) {
  const entryId = entry.id;
  const imgUrl = entry.img;
  const title = entry.title;
  const place = entry.place;
  const city = entry.city;
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
  
  return (
    <article key={entryId} className={styles.entry}>
    <h2 className={styles.caption}>{title}</h2>
    <ul>
    <li className={styles.date} key="time"><time dateTime={dateTime}>{date}</time></li>
    {place ? <li className={styles.place} key="place">{place}</li> : <></> }
    {city && place !==  "Oslo School of Architecture and Design" ? <li className={styles.city} key="city">{city}</li> : <></> }
    </ul>
    <figure>
    <EntryImage src={imgUrl} alt={title} entryId={entryId}/>
    </figure> 
    </article>
  );
}
import styles from '/assets/scss/entry.module.scss';
import EntryImage from '/components/entry-image';

export default function Entry(entry) {
  const imgUrl = entry.img;
  const title = entry.title;
  const city = entry.city;
  const country = entry.country;
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
    <article key={entry.id} className={styles.entry}>
    <h2 className={styles.caption}>{title}</h2>
    <ul>
    <li key="date"><time dateTime={dateTime}>{date}</time></li>
    {city || country ? <li key="location">{city}, {country}</li> : <></> }
    </ul>
    <figure>
    <EntryImage src={imgUrl} alt={title} entryId={entry.id} databaseId={entry.databaseId} />
    </figure> 
    </article>
  );
}
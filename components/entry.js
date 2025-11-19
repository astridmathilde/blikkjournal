import styles from '/assets/scss/entry.module.scss';
import EntryImage from '/components/entry-image';

export default function Entry(entry) {
  const entryId = entry.id;
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
    <article key={entryId} className={styles.entry}>
    <h2 className={styles.caption}><time dateTime={dateTime}>{date}</time></h2>
    <ul>
    {city || country ? <li key="location">{city}, {country}</li> : <></> }
    </ul>
    <figure>
    <EntryImage src={imgUrl} alt={title} entryId={entryId}/>
    </figure> 
    </article>
  );
}
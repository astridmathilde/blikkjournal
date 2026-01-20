import Link from 'next/link';
import styles from '@/assets/scss/components/entry/gallery.module.scss';
import EntryImage from './image';

export default function GalleryEntry(entry) {
  const entryId = entry.id;
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
  
  const entryUrl = `/entry/${entryId}`;
  
  return (
    <article key={entryId} className={styles.galleryEntry}>
    <h2 className={styles.date}><time dateTime={dateTime}>{date}</time></h2>
    <ul className={styles.metadata}>
    <li className={styles.caption}><span className={styles.label}>Description: </span>{title}</li>
    {place ? <li className={styles.place} key="place"><span className={styles.label}>Location: </span>{place}</li> : <></> }
    <li className={styles.city} key="city-country"><span className={styles.label}>City, country: </span>{city}, {country}</li>
    {category ? <li className={styles.category} key="category"><span className={styles.label}>Category: </span>{category}</li> : <></> }
    {camera ? <li className={styles.camera} key="camera"><span className={styles.label}>Camera: </span>{camera}</li> : <></> }
    </ul>

    <figure>
    <Link href={entryUrl} style={{cursor: "zoom-in"}}>
    <EntryImage alt={title} entryId={entryId} width="300" height="600" fill={false} />
    </Link>
    </figure> 
    
    </article>
  );
} 
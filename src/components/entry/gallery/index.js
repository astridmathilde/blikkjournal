"use client";

import { useReturnPath } from '@/src/hooks/use-return-path';
import { useClutter } from '../../clutter/context';
import Link from 'next/link';
import styles from './style.module.scss';
import utils from '@/src/assets/scss/utils.module.scss';
import EntryImage from '../image';

export default function GalleryEntry(entry) {
  useReturnPath(); // storing current url
  
  const entryId = entry.id;
  const title = entry.title;
  const location = entry.place;
  const city = entry.city;
  const country = entry.country;
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
  
  const { level } = useClutter();
  
  return (
    <article key={entryId} className={styles.galleryEntry}>
    { level <= -2 ? (
      <h2 className={utils.screen_reader_text}><time dateTime={dateTime}>{date}</time></h2>
    ) : (
      <h2 className={styles.date}><time dateTime={dateTime}>{date}</time></h2>)
    }
    
    <ul className={styles.metadata}>
    
    { level >= 0 ? <li className={styles.caption}><span className={styles.label}>Description: </span>{title}</li> : "" }
    
    {level >= 4 && camera ? <li className={styles.camera} key="camera"><span className={styles.label}>Camera: </span>{camera}</li> : "" }
    
    {level >= 3 && location ? <li className={styles.location} key="location"><span className={styles.label}>Location: </span>{location}</li> : "" }
    
    { level >= 2 ? <li className={styles.city} key="city-country"><span className={styles.label}>City, country: </span>{city}, {country}</li> : "" }
    </ul>
    
    <figure>
    <Link href={entryUrl} style={{cursor: "zoom-in"}}>
    <EntryImage
    alt={title}
    entryId={entryId}
    width="300"
    height="350"
    fill={false}
    priority={entry.priority === "true" ? true : false}
    sizes="(max-width: 600px) 50vw, (max-width: 854px) 33vw, 25vw"
    placeholderColor={entry.dominantColor}
    />
    </Link>
    </figure> 
    
    </article>
  );
} 
"use client";

import { useReturnPath } from '@/app/hooks/use-return-path';
import { useClutter } from '../clutter/context';
import Link from 'next/link';
import styles from '../../assets/scss/components/entry/gallery.module.scss';
import utils from '../../assets/scss/utils.module.scss';
import EntryImage from './image';

export default function GalleryEntry(entry) {
  useReturnPath(); // storing current url
  
  const entryId = entry.id;
  const title = entry.title;
  const location = entry.place;
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

    {level >= 3 && camera ? <li className={styles.camera} key="camera"><span className={styles.label}>Camera: </span>{camera}</li> : "" }

    {level >= 2 && location ? <li className={styles.location} key="location"><span className={styles.label}>Location: </span>{location}</li> : "" }
    
    { level >= 1 ? <li className={styles.city} key="city-country"><span className={styles.label}>City, country: </span>{city}, {country}</li> : "" }
    
    { level >= 5 && category ? <li className={styles.category} key="category"><span className={styles.label}>Category: </span>{category}</li> : "" }
    
    </ul>
    
    <figure>
    <Link href={entryUrl} style={{cursor: "zoom-in"}}>
    <EntryImage alt={title} entryId={entryId} width="300" height="600" fill={false} preload={entry.priority === "true" ? true : false} />
    </Link>
    </figure> 
    
    </article>
  );
} 
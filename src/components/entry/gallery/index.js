"use client";

import { useRouter } from 'next/navigation';
import { useReturnPath } from '@/src/hooks/use-return-path';
import { useClutter } from '../../clutter/context';
import { buildFilterParams } from '@/src/lib/utils';

import EntryImage from '../image';

import styles from './style.module.scss';
import utils from '@/src/assets/scss/utils.module.scss';

export default function GalleryEntry({filters, ...entry}) {
  useReturnPath(); // storing current url
  const router = useRouter(); // for navigating to single entry
  
  const url = new URLSearchParams({
    ...buildFilterParams(filters)
  });
  const hasFilter = url.toString();
  const filterParams = `?${hasFilter}`; // adding the filter to single entry url
  
  const handleClick = () => {
    router.push(`/entry/${entry.id}${hasFilter ? filterParams : ""}`);
  }
  
  const { level } = useClutter();
  
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
  
  return (
    <article key={entryId} className={styles.galleryEntry}>
    { level <= -2 ? (
      <h2 className={utils.screen_reader_text}><time dateTime={dateTime}>{date}</time></h2>
    ) : (
      <h2 className={styles.date}><time dateTime={dateTime}>{date}</time></h2>)
    }
    
    <ul className={styles.metadata}>
    
    { level >= 0 ? <li className={styles.caption}><span className={styles.label}>Description: </span>{title ? title : location}</li> : "" }
    
    {level >= 4 && camera ? <li className={styles.camera} key="camera"><span className={styles.label}>Camera: </span>{camera}</li> : "" }
    
    {level >= 3 && ! title && location || level >= 3 && title && ! location || level >= 3 && ! title && ! location ? "" : level >= 3 ? (<li className={styles.location} key="location"><span className={styles.label}>Location: </span>{location}</li>) : "" }
    
    { level >= 2 ? <li className={styles.city} key="city-country"><span className={styles.label}>City, country: </span>{city}, {country}</li> : "" }
    </ul>
    
    <figure onClick={() => handleClick()} style={{cursor: "zoom-in"}}>
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
    </figure> 
    
    </article>
  );
} 
"use client";

import { useClutter } from '@/src/components/clutter/context';
import styles from './style.module.scss';
import utils from "@/src/assets/scss/utils.module.scss";

export default function SingleEntryImageWrapper({ fileName, camera, children }) {
  const { level } = useClutter();
  
  return (
    <figure className={styles.image} onLoad={() => setLoaded(true)}>
    {children}
    {level >= -5 ? (
      <figcaption className={styles.caption}>
      <ul>
      <li><span className={utils.screen_reader_text}>File name: </span>{fileName}</li>
      <li><span className={utils.screen_reader_text}>Camera: </span>{camera}</li>
      </ul>
      </figcaption>
    ) : ""}
    
    </figure>
  );
}
"use client";

import EntryImage from "./image";
import { useClutter } from "../clutter-context";
import styles from "../../assets/scss/components/entry/single-image.module.scss";
import utils from "../../assets/scss/utils.module.scss";

export default function EntrySingleImage(entry, entryId) {
  const { level } = useClutter();
  
  return (
    <figure className={styles.image}>
    <EntryImage alt={entry.title} entryId={entryId} width="600" height="600" preload={true} loading="eager" />
    {level >= -2 ? (
      <figcaption className={styles.caption}>
      <ul>
      <li><span className={utils.screen_reader_text}>File name: </span>{entry.fileName}</li>
      <li><span className={utils.screen_reader_text}>Camera: </span>{entry.camera}</li>
      </ul>
      </figcaption>
    ) : ""}
    </figure>
  )
}
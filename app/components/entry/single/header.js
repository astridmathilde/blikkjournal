"use client";

import { useClutter } from "../../clutter/context";
import styles from "../../../assets/scss/components/entry/single/header.module.scss";
import utils from "../../../assets/scss/utils.module.scss"

export default function EntryHeaderSingle(entry) {
  const { level } = useClutter();
  
  return (
    <header className={styles.header}>
    {level >= -2 ? (
      <div className={styles.title}> 
      <h2 className={styles.entryTitle}>{entry.title}</h2>
      <p><span className={utils.screen_reader_text}>Date published: </span>{entry.date}</p>
      </div>
    ) : (
      <>
      <h2 className={utils.screen_reader_text}>{entry.title}</h2>
      <p className={utils.screen_reader_text}>Date published: {entry.date}</p>
      </>
    )}
    {level >= -2 ? (
      <div className={styles.location}>
      <p><span className={utils.screen_reader_text}>Location: </span>{entry.location ? entry.location : ""}{entry.location ? <br /> : ""} {entry.city}, {entry.country}</p>
      </div>
    ) : (
      <p className={utils.screen_reader_text}>Location: {entry.location ? entry.location : ""}{entry.location ? <br /> : ""} {entry.city}, {entry.country}</p>
    )}
    </header>
  )
}
"use client";

import { useState } from "react";
import styles from "@/app/assets/scss/components/entry/single/image.module.scss";
import utils from "@/app/assets/scss/utils.module.scss";

export default function SingleEntryImageWrapper({ fileName, camera, children }) {
  const [loaded, setLoaded] = useState(false);
  
  return (
    <figure className={styles.image} onLoad={() => setLoaded(true)}>
    {children}
    {loaded && (
      <figcaption className={styles.caption}>
      <ul>
      <li><span className={utils.screen_reader_text}>File name: </span>{fileName}</li>
      <li><span className={utils.screen_reader_text}>Camera: </span>{camera}</li>
      </ul>
      </figcaption>
    )}
    </figure>
  );
}
"use client";

import { useExtractColors } from "react-extract-colors";
import styles from "../../assets/scss/components/entry/single.module.scss";


export default function SingleEntry({entryId, children}) {
  const image =  `/api/images/${entryId}`;
  const { lighterColor } = useExtractColors(image, {format: "rgb"});
  
  const opacity = 0.2;
  const imageColor = lighterColor ? lighterColor : "";
  const adjustedColor = imageColor.replace('rgb', 'rgba').replace(')', `, ${opacity})`);
  
  return (
    <article key={entryId} className={styles.singleEntry} style={{backgroundColor: `${adjustedColor}`}}>
    {children}
    </article>
  )
}
"use client";

import { useEffect } from "react";
import { useExtractColors } from "react-extract-colors";
import styles from "../../../assets/scss/components/entry/single/wrapper.module.scss";

export default function SingleEntry({entryId, children}) {
  const image =  `/api/images/${entryId}`;
  const { lighterColor } = useExtractColors(image, {format: "rgb"});
  
  const opacity = 0.2;
  const imageColor = lighterColor ? lighterColor : "";
  const adjustedColor = imageColor.replace('rgb', 'rgba').replace(')', `, ${opacity})`);
  
  
  useEffect(() => {
    if (adjustedColor) {
      document.body.style.backgroundColor = adjustedColor;
      
      let metaThemeColor = document.querySelector('meta[name="theme-color"]');
      if (!metaThemeColor) {
        metaThemeColor = document.createElement('meta');
        metaThemeColor.name = 'theme-color';
        document.head.appendChild(metaThemeColor);
      }
      metaThemeColor.content = adjustedColor;
    }
  }, [adjustedColor]);
  
  return (
    <article key={entryId} className={styles.singleEntry}>
    {children}
    </article>
  )
}
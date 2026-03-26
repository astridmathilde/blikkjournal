"use client";

import { useEffect } from "react";
import styles from "@/app/assets/scss/components/entry/single/entry.module.scss";

export default function SingleEntry({bgColor, children}) {
  
  /* Set background color (I wrote this with help from Claude 🐑) */
  useEffect(() => {
    document.body.style.backgroundColor = bgColor;
    
    let metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (!metaThemeColor) {
      metaThemeColor = document.createElement('meta');
      metaThemeColor.name = 'theme-color';
      document.head.appendChild(metaThemeColor);
    }
    metaThemeColor.content = bgColor;
  }, [bgColor]);
  /* end of Claude 🐑*/ 
  
  return (
    <article className={styles.singleEntry}>
    {children}
    </article>
  )
}
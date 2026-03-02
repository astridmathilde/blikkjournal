"use client";

import { useEffect, useState } from "react";
import { FastAverageColor } from "fast-average-color";
import styles from "../../../assets/scss/components/entry/single/wrapper.module.scss";

export default function SingleEntry({entryId, children}) {
  const [bgColor, setBgColor] = useState();
  const image =  `/api/images/${entryId}`;  
  
  /* I wrote this with help from Claude 🐑 */
  useEffect(() => {
    const fac = new FastAverageColor();
    const img = new Image();
    img.crossOrigin = "Anonymous";
    
    img.onload = () => {
      setTimeout(() => {
        fac.getColorAsync(img, {algorithm: 'simple'}).then(color => {
          const opacity = 0.2;
          const adjustedColor = color.rgba.replace(/[\d.]+\)$/g, `${opacity})`);
          
          setBgColor(adjustedColor);
          document.body.style.backgroundColor = adjustedColor;
          
          let metaThemeColor = document.querySelector('meta[name="theme-color"]');
          if (!metaThemeColor) {
            metaThemeColor = document.createElement('meta');
            metaThemeColor.name = 'theme-color';
            document.head.appendChild(metaThemeColor);
          }
          metaThemeColor.content = adjustedColor;
          console.log('EntryId:', entryId, 'Color:', adjustedColor);
        })
        .catch(error => {
          console.log('oh no:', error);
        })
      }, 100); // be certain that the image is rendered before attempting adding any colors :D
    }
    
    img.src = image;

    return() => {
      fac.destroy();
    }
  }, [image]);
  /* end of Claude 🐑*/ 

  return (
    <article className={styles.singleEntry}>
    {children}
    </article>
  )
}
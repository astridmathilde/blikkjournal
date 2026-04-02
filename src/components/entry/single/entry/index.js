"use client";

import { useEffect } from "react";

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
    <article>
    {children}
    </article>
  )
}
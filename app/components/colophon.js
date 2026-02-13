"use client"

import { useState, useEffect } from "react";
import Draggable from "./draggable"
import contentStyle from "../assets/scss/components/colophon/content.module.scss";
import linkStyle from "../assets/scss/components/colophon/link.module.scss";
import IconClose from "./icons/icon-close";

export default function Colophon({button, children}) {
  const [isOpen, makeOpen] = useState(false);
  
  useEffect(() => {
    const colophon = document.getElementById("colophon");
    
    if (colophon) {
      if (isOpen) {
        colophon.style.display = "block";
      } else {
        colophon.style.display = "none";
      }
    }
  }, [isOpen]);
  
  const handleClick = () => {
    makeOpen(!isOpen);
  }
  
  return (
    <>
    <button className={linkStyle.link} onClick={handleClick} aria-label={isOpen ? "close colophon" : "open colophon"}>{button}</button>
    
    <Draggable>
    <div id="colophon" className={contentStyle.content}>
    <button className={contentStyle.close} onClick={handleClick} aria-label={isOpen ? "close colophon" : ""}><IconClose /></button>
    {children}
    </div>
    </Draggable>
    </>
  )
  
}
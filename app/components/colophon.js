"use client"

import { useState } from "react";
import Draggable from "./draggable"
import contentStyle from "../assets/scss/components/colophon/content.module.scss";
import linkStyle from "../assets/scss/components/colophon/link.module.scss";
import IconClose from "./icons/icon-close";

export default function Colophon({button, children}) {
  const [isOpen, makeOpen] = useState(false);

  const handleClick = () => {
    makeOpen(!isOpen);
  }
  
  return (
    <>
    <button className={linkStyle.link} onClick={handleClick} aria-label={isOpen ? "close colophon" : "open colophon"}>{button}</button>
    {isOpen ? (
      <Draggable>
      <div id="colophon" className={contentStyle.content}>
      <button className={contentStyle.close} onClick={handleClick} aria-label={isOpen ? "close colophon" : ""}><IconClose /></button>
      {children}
      </div>
      </Draggable>
    ) : "" }
    </>
  )
  
}
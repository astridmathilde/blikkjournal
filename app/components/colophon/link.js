"use client"

import { useState, useEffect } from "react";
import styles from "../../assets/scss/components/colophon/link.module.scss";


export default function ColophonLink() {
  const [isOpen, open] = useState(false);

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
    open(!isOpen);
  }

  return <button className={styles.link} onClick={handleClick}>Colophon</button>
}
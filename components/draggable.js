/* A function to make elements draggable */

"use client"; 

import { useState, useEffect } from 'react';
import styles from "@/assets/scss/components/draggable.module.scss"

export default function Draggable({children}) {
  const [position, setPosition] = useState({ x: 0, y: 0});
  const [drag, setDrag] = useState(null);

  useEffect(() => {
    if (!drag) return; 

    const move = (e) => {
      const {clientX, clientY} = e.touches?.[0] || e;
      setPosition({x: clientX - drag.offsetX, y: clientY - drag.offsetY});
    }

    const up = () => setDrag(null);

    window.addEventListener('mousemove', move);
    window.addEventListener('touchmove', move);
    window.addEventListener('mouseup', up);
    window.addEventListener('touchend', up);

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('touchmove', move);
      window.removeEventListener('mouseup', up);
      window.removeEventListener('touchend', up);
    }
  }, [drag]);

  const down = (e) => {
    const {clientX, clientY} = e.touches?.[0] || e;
    setDrag({offsetX: clientX - position.x, offsetY: clientY - position.y});
  }

  return (
    <div className={styles.container} style={{left: position.x, top: position.y}} onMouseDown={down} onTouchStart={down}>
      {children}
    </div>
  )
}
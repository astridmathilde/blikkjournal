 "use client";

 import { useState, useEffect } from "react";
 import Link from "next/link";
 import styles from "../../assets/scss/components/entry/single-nav.module.scss";
 
 import IconArrowLeft from "@/app/components/icons/icon-arrow-left";
 import IconArrowRight from "@/app/components/icons/icon-arrow-right";
 
 export default function SingleEntryNav({entryId, prevEntry, nextEntry}) {
  /* Enable keyboard navigation */ 
  const [currentEntry, setEntryId] = useState(entryId);
  
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        if (prevEntry) {
          setEntryId(prevEntry.id);
        }
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        if (nextEntry) {
          setEntryId(nextEntry.id);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [prevEntry, nextEntry]);
  
  return (
    <nav className={styles.navigation}>
    <ul>
    {prevEntry && (
      <li className={styles.prev}><Link href={`/entry/${prevEntry.id}`} aria-label="Go to previous entry"><IconArrowLeft /></Link></li>
    )}
    {nextEntry && (
      <li className={styles.next}><Link href={`/entry/${nextEntry.id}`} aria-label="Go to next entry"><IconArrowRight /></Link></li>
    )}
    </ul>
    </nav>
  )
}
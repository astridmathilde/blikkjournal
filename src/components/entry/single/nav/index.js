 /**
 * Navigation between entries
 */
 
 "use client";
 
 import { useState, useEffect } from "react";
 import { useRouter } from "next/navigation";
 import { useClutter } from "@/src/components/clutter/context";
 import { buildFilterParams } from "@/src/lib/utils";
 import Link from "next/link";
 import styles from './style.module.scss';
 
 import IconArrowLeft from "@/src/components/icons/icon-arrow-left";
 import IconArrowRight from "@/src/components/icons/icon-arrow-right";
 
 export default function SingleEntryNav({entryId, prevEntry, nextEntry, filters}) {
  /* Get active filters and add to url for prev/next entry */ 
  const url = new URLSearchParams({
    ...buildFilterParams(filters)
  });
  const hasFilter = url.toString();
  const filterParams = `?${hasFilter}`;
  
  /* Enable keyboard navigation */ 
  const [currentEntryId, setCurrentEntryId] = useState(entryId);
  const router = useRouter();
  
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        if (prevEntry) {
          setCurrentEntryId(prevEntry.id);
        }
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        if (nextEntry) {
          setCurrentEntryId(nextEntry.id);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [prevEntry, nextEntry]);
  
  useEffect(() => {
    if (currentEntryId !== entryId) {
      router.push(`/entry/${currentEntryId}${hasFilter ? filterParams : ""}`);
    }
  }, [currentEntryId, router, hasFilter, filterParams]);
  
  /* Declutter things */
  const {level} = useClutter();
  
  if (level >= -5) {
    return (
      <nav className={styles.navigation}>
      <ul>
      {prevEntry && (
        <li className={styles.prev}><Link href={`/entry/${prevEntry.id}${hasFilter ? filterParams : ""}`} aria-label="Go to previous entry"><IconArrowLeft />{level >= 4 ? <span>prev</span> : "" }</Link></li>
      )}
      {nextEntry && (
        <li className={styles.next}><Link href={`/entry/${nextEntry.id}${hasFilter ? filterParams : ""}`} aria-label="Go to next entry"><IconArrowRight />{level >= 4 ? <span>next</span> : "" }</Link></li>
      )}
      </ul>
      </nav>
    )
  } else {
    null;
  }
}
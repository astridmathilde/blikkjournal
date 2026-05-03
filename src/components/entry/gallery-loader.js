/* Wrapper used for lazy-loading gallery entries */ 

"use client";

import { useEffect, useRef, useState } from "react";
import { loadMoreEntries } from "@/src/lib/actions";
import GalleryEntry from "./gallery";
import Loading from "../loading";
import styles from '@/src/assets/scss/gallery.module.scss';

export default function EntryGalleryLoader({ initialEntries, initialCursor, initialHasMore, filters }) {
  const [entries, setEntries] = useState(initialEntries);
  const [cursor, setCursor] = useState(initialCursor);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [loading, setLoading] = useState(false);
  const sentinelRef = useRef(null);
  const loadingRef = useRef(false);
  
  /* Reset entries when filters change */
  useEffect(() => {
    setEntries(initialEntries);
    setCursor(initialCursor);
    setHasMore(initialHasMore);
  }, [initialEntries, initialCursor, initialHasMore]);
  
  
  /* Loading the entries */
  useEffect(() => {
    const observer = new IntersectionObserver(
      async ([sentinel]) => {
        if (sentinel.isIntersecting && hasMore && !loadingRef.current) {
          loadingRef.current = true;
          setLoading(true);
          const data = await loadMoreEntries(cursor, filters);
          setEntries((prev) => [...prev, ...data.results]);
          setCursor(data.nextCursor);
          setHasMore(data.hasMore);
          loadingRef.current = false;
          setLoading(false);
        }
      },
      { rootMargin: "400px" }
    );
    
    if (sentinelRef.current) observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [cursor, hasMore, filters]); 
  
  return (
    <>
    <div className={styles.gallery}>
    {entries.map((entry, index) => {
      const entryId = entry.id;
      const title = entry.properties?.Title?.title[0]?.plain_text || "";
      const place = entry.properties?.Place?.select?.name || "";
      const city = entry.properties?.City?.select?.name || "";
      const country = entry.properties?.Country?.select?.name || "";
      const camera = entry.properties?.Camera?.select?.name || "";
      const category = entry.properties?.Category?.select?.name || "";
      const time = entry.properties?.Time?.date?.start;
      
      
      return (
        <GalleryEntry
        key={entryId}
        id={entryId}
        place={place}
        title={title}
        city={city}
        country={country}
        category={category}
        time={time}
        camera={camera}
        priority={index < 10}
        dominantColor={entry.dominantColor}
        filters={filters}
        />
      );
    })}
    </div>
    
    <div ref={sentinelRef} />
    {loading && <Loading />}
    </>
  );
}
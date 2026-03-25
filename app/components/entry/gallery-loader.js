/* Wrapper used for lazy-loading gallery entries */ 

"use client";

import { useEffect, useRef, useState } from "react";
import { loadMoreEntries } from "../../lib/actions";
import GalleryEntry from "@/app/components/entry/gallery";
import styles from '@/app/assets/scss/views/gallery.module.scss';

export default function EntryGalleryLoader({ initialEntries, initialCursor, initialHasMore }) {
  const [entries, setEntries] = useState(initialEntries);
  const [cursor, setCursor] = useState(initialCursor);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [loading, setLoading] = useState(false);
  const sentinelRef = useRef(null);
  const loadingRef = useRef(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      async ([sentinel]) => {
        if (sentinel.isIntersecting && hasMore && !loadingRef.current) {
          loadingRef.current = true;
          setLoading(true);
          const data = await loadMoreEntries(cursor);
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
  }, [cursor, hasMore]); 
  
  return (
    <>
    <div className={styles.gallery}>
    {entries.map((entry, index) => {
      const entryId = entry.id;
      const title = entry.properties?.Title?.title[0]?.plain_text || "";
      const name = entry.properties?.Image?.files[0]?.name || "";
      const place = entry.properties?.Place?.select?.name || "";
      const city = entry.properties?.City?.select?.name || "";
      const country = entry.properties?.Country?.select?.name || "";
      const camera = entry.properties?.Camera?.select?.name || "";
      const category = entry.properties?.Category?.select?.name || "";
      const time = entry.properties.Time.date?.start;
      
      const img = `/api/images/${entryId}`;
      
      if (img) {
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
          name={name}
          priority={index < 10}
          />
        );
      }
    })}
    </div>
    
    <div ref={sentinelRef} />
    {loading && <p className={styles.loading} style={{textAlign: 'center'}}>{"( . . . )"}</p>}
    </>
  );
}
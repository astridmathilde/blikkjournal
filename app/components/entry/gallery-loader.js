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
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      async ([sentinel]) => {
        if (sentinel.isIntersecting && hasMore && !loading) {
          setLoading(true);
          const data = await loadMoreEntries(cursor);
          setEntries((prev) => [...prev, ...data.results]);
          setCursor(data.nextCursor);
          setHasMore(data.hasMore);
          setLoading(false);
        }
      },
      {  rootMargin: "80px"}
    );
    
    if (sentinelRef.current) observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [cursor, hasMore, loading]);
  
  return (
    <>
    <div className={styles.gallery}>
    {entries.map((entry, index) => {
      const isAboveTheFold = index < 10;
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
          priority={isAboveTheFold ? "true" : ""}
          />
        );
      }
    })}
    </div>
    
    <div ref={sentinelRef} />
    </>
  );
}
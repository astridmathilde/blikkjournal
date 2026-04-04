/* Wrapper used for lazy-loading list entries in declutter mode, otherwise rendering the list as normal */ 

"use client";

import { useEffect, useRef, useState } from "react";
import { loadMoreEntries } from "@/src/lib/actions";
import { useClutter } from "../clutter/context";
import ListEntry from "./list/entry";

export default function ListEntryLoader({ initialEntries, initialCursor, initialHasMore, filters}) {
  const [entries, setEntries] = useState(initialEntries);
  const [cursor, setCursor] = useState(initialCursor);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [loading, setLoading] = useState(false);
  const sentinelRef = useRef(null);
  const loadingRef = useRef(false);
  
  const {level} = useClutter();
  const hasLazyLoad = level <= -3 || level == 6;
  
  /* Reset entries when filters change */
  useEffect(() => {
    setEntries(initialEntries);
    setCursor(initialCursor);
    setHasMore(initialHasMore);
  }, [initialEntries, initialCursor, initialHasMore]);
  
  /* Loading the entries */
  useEffect(() => {
    if (!hasLazyLoad) return; // exit when not in declutter mode
    
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
  }, [cursor, hasMore, hasLazyLoad]); 
  
  
  return (
    <>
    <tbody>
    {entries.map((entry, index) => {
      const entryId = entry.id;
      const title = entry.properties?.Title?.title[0]?.plain_text || "";
      const fileName = entry.properties?.Image?.files[0]?.name || "";
      const location = entry.properties?.Place?.select?.name || "";
      const city = entry.properties?.City?.select?.name || "";
      const country = entry.properties?.Country?.select?.name || "";
      const time = entry.properties.Time.date?.start;
      const camera = entry.properties?.Camera?.select?.name || "";
      const category = entry.properties?.Category?.select?.name || "";
      
      const date = new Date(time).toLocaleString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
      });
      
      return (
        <ListEntry
        key={entryId}
        id={entryId}
        title={title}
        fileName={fileName}
        location={location}
        city={city}
        country={country}
        category={category}
        camera={camera}
        date={date}
        priority={index < 12}
        dominantColor={entry.dominantColor}
        />
      );
    })}
    </tbody>
    {hasLazyLoad && <tfoot ref={sentinelRef} />}
    </>
  );
}
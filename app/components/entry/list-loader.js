/* Wrapper used for lazy-loading list entries in declutter mode, otherwise rendering the list as normal */ 

"use client";

import { useEffect, useRef, useState } from "react";
import { loadMoreEntries } from "../../lib/actions";
import { useClutter } from "../clutter/context";
import ListEntry from "./list";

export default function EntryListLoader({ initialEntries, initialCursor, initialHasMore }) {
  const [entries, setEntries] = useState(initialEntries);
  const [cursor, setCursor] = useState(initialCursor);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [loading, setLoading] = useState(false);
  const sentinelRef = useRef(null);
  
  const {level} = useClutter();
  const hasLazyLoad = level <= -4 || level == 6;
  
  useEffect(() => {
     if (!hasLazyLoad) return; // exit when not in declutter mode

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
        { rootMargin: "600px" }
      );
      
      if (sentinelRef.current) observer.observe(sentinelRef.current);
      return () => observer.disconnect();
  }, [cursor, hasMore, loading, hasLazyLoad]);
  
  return (
    <>
    <tbody>
    {entries.map((entry, index) => {
      const isAboveTheFold = index < 15;
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
        priority={isAboveTheFold ? "true" : ""}
        />
      );
    })}
    </tbody>
    {hasLazyLoad && <tfoot ref={sentinelRef} />}
    </>
  );
}
"use client";

import { useClutter } from "@/src/components/clutter/context";
import { buildFilterParams } from "@/src/lib/utils";
import IconChevronLeft from "@/src/components/icons/icon-chevron-left";
import IconChevronRight from "@/src/components/icons/icon-chevron-right";
import styles from './style.module.scss';
import utils from "@/src/assets/scss/utils.module.scss";

export default function ListEntryNav({ cursor, hasMore, totalEntries, currentPage, totalPages, prevCursor, prevCursors, nextCursor, nextPrevCursor, filters }) {
  
  const prevUrl = new URLSearchParams({
    cursor: prevCursor,
    page: currentPage - 1,
    prev: prevCursors,
    ...buildFilterParams(filters)
  });
  
  const nextUrl = new URLSearchParams({
    cursor: nextCursor,
    page: currentPage + 1,
    prev: nextPrevCursor,
    ...buildFilterParams(filters)
  });

  const firstPageUrl = new URLSearchParams({...buildFilterParams(filters)})
  
  const { level } = useClutter(); // clutter things
  if (level >= -2 && level !== 6) {
    return (
      <div className={styles.footer}>
      <p className={styles.totalEntries}>{totalEntries} entries</p>
      
      <div className={styles.pagination}>
      <p className={styles.currentPage}>page {currentPage}<span aria-hidden="true">/</span><span className={utils.screen_reader_text}>of </span>{totalPages}</p>
      
      <nav>
      <ul>
      {cursor ? (
        <li><a
        aria-label="Go to the previous page"
        href={prevCursor
          ? `/list?${prevUrl.toString()}`
          : `/list?${firstPageUrl.toString()}`
        }
        className={styles.prev}><IconChevronLeft /></a></li>
      ) : (
        <li aria-hidden="true" className={styles.disabled}><IconChevronLeft /></li>
      )}
      {hasMore && nextCursor ? (
        <li>
        <a aria-label="Go to the next page" href={`/list?${nextUrl.toString()}`} className={styles.next}><IconChevronRight /></a>
        </li>
      ) : (
        <li aria-hidden="true" className={styles.disabled}><IconChevronRight /></li>
      )}
      </ul>
      </nav>
      </div>
      
      </div>
    );
  }
}

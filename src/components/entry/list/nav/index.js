"use client";

import { useClutter } from "@/src/components/clutter/context";
import IconChevronLeft from "@/src/components/icons/icon-chevron-left";
import IconChevronRight from "@/src/components/icons/icon-chevron-right";
import styles from './style.module.scss';
import utils from "@/src/assets/scss/utils.module.scss";

function buildFilterParams(filters = {}) {
  const params = new URLSearchParams();
  if (filters.category && filters.category !== 'everything') params.set('category', filters.category);
  if (filters.location && filters.location !== 'everywhere') params.set('location', filters.location);
  if (filters.year && filters.year !== 'all-time') params.set('year', filters.year);
  const str = params.toString();
  return str ? `&${str}` : '';
}
export default function ListEntryNav({ cursor, hasMore, totalEntries, currentPage, totalPages, prevCursor, prevCursors, nextCursor, nextPrevCursor, filters }) {
  const { level } = useClutter();
  const filterParams = buildFilterParams(filters);
  
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
          ? `/list?cursor=${prevCursor}&page=${currentPage - 1}&prev=${prevCursors}${filterParams}`
          : `/list${filterParams ? '?' + filterParams.slice(1) : ''}`
        }
        className={styles.prev}><IconChevronLeft /></a></li>
      ) : (
        <li aria-hidden="true" className={styles.disabled}><IconChevronLeft /></li>
      )}
      {hasMore && nextCursor ? (
        <li>
        <a aria-label="Go to the next page" href={`/list?cursor=${nextCursor}&page=${currentPage + 1}&prev=${nextPrevCursor}${filterParams}`} className={styles.next}><IconChevronRight /></a>
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

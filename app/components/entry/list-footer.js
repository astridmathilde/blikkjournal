"use client";

import { useClutter } from "../clutter/context";
import IconChevronLeft from "../icons/icon-chevron-left";
import IconChevronRight from "../icons/icon-chevron-right";
import styles from "../../assets/scss/views/list-footer.module.scss";
import utils from "../../assets/scss/utils.module.scss";

export default function ListEntryNav({cursor, hasMore, totalEntries, currentPage, totalPages, prevCursor, prevCursors, nextCursor, nextPrevCursor}) {
  const {level} = useClutter();

  if (level >= -3 && level !== 6) {
  return (
    <div className={styles.footer}>
    <p className={styles.totalEntries}>{totalEntries} entries</p>
    
    <div className={styles.pagination}>
    <p className={styles.currentPage}>page {currentPage}<span aria-hidden="true">/</span><span className={utils.screen_reader_text}>of </span>{totalPages}</p>
    
    <nav aria-label="pagination">
    <ul>
    {cursor ? (
      <li><a aria-label="Go to the previous page" href={prevCursor ? `/list?cursor=${prevCursor}&page=${currentPage - 1}&prev=${prevCursors}` : `/list`} className={styles.prev}><IconChevronLeft /></a></li>
    ) : (
      <li aria-hidden="true" className={styles.disabled}><IconChevronLeft /></li>
    ) }
    {hasMore && nextCursor ? (
      <li>
      <a aria-label="Go to the next page" href={`/list?cursor=${nextCursor}&page=${currentPage + 1}&prev=${nextPrevCursor}`} className={styles.next}><IconChevronRight /></a>
      </li>
    ) : (
      <li aria-hidden="true" className={styles.disabled}><IconChevronRight /></li>
    )}
    </ul>
    </nav>
    </div>
    
    </div>
  )
}
}
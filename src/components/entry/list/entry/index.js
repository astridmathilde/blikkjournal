"use client";

import { useRouter } from 'next/navigation';
import { useReturnPath } from '@/src/hooks/use-return-path';
import { useClutter } from '@/src/components/clutter/context';
import { buildFilterParams } from '@/src/lib/utils';

import EntryImage from '../../image';
import styles from './style.module.scss';
import utils from '../../../../assets/scss/utils.module.scss';

export default function ListEntry({filters, ...entry}) {
  useReturnPath(); // storing current url 
  const router = useRouter(); // for navigating to single entry
  
  const url = new URLSearchParams({
    ...buildFilterParams(filters)
  });
  const hasFilter = url.toString();
  const filterParams = `?${hasFilter}`; // adding the filter to single entry url

  
  const handleClick = () => {
    router.push(`/entry/${entry.id}${hasFilter ? filterParams : ""}`);
  }
  
  const handleKeyEnter = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      router.push(`/entry/${entry.id}${hasFilter ? filterParams : ""}`);
    }
  }
  
  const { level } = useClutter(); // for reducing or adding clutter
  
  return (
    <tr className={styles.listEntry} key={entry.id} tabIndex="3" onClick={() => handleClick()} onKeyDown={(event) => handleKeyEnter(event)}>
    {level >= -1 || level >= 2 ? (
      <td headers="image">
      {level >= 1 ? (
        <figure className={styles.image}>
        <EntryImage
        alt={entry.title}
        entryId={entry.id}
        width="200"
        height="40"
        preload={entry.priority === "true" ? true : false}
        sizes="(max-width: 854px) 10vw, 12vw"
        placeholderColor={entry.dominantColor}
        />
        </figure>
      ) : ""
    } {level == -1 || level >= 2 || level == 0 ? (
      <span className={styles.fileName}>{entry.fileName}</span>
    ) : ""
  }
  </td>
) : "" }
<td headers="description">{entry.title ? entry.title : (<span className={utils.empty}>Untitled</span>)}</td>
<td headers="location">{entry.location ? entry.location : (<span className={utils.empty}>Secret</span>)}</td>
<td headers="city">{entry.city}, {entry.country}</td>
<td headers="category">{entry.category}</td>
{level >= 3 ? <td headers="camera">{entry.camera}</td> : ""}
<td headers="date">{entry.date}</td>
</tr>
)
}
"use client";

import { useRouter } from 'next/navigation';
import { useReturnPath } from '@/app/hooks/use-return-path';
import { useClutter } from '../clutter/context';
import styles from "../../assets/scss/components/entry/index.module.scss";
import EntryImage from './image';

export default function ListEntry(entry) {
  useReturnPath(); // storing current url 
  const router = useRouter(); // for navigating to single post
  
  const handleClick = () => {
    router.push(`/entry/${entry.id}`)
  }
  
  const handleKeyEnter = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      router.push(`/entry/${entry.id}`)
    }
  }
  
  const { level } = useClutter(); // for reducing or adding clutter
  
  return (
    <tr className={styles.listEntry} key={entry.id} tabIndex="3" onClick={() => handleClick()} onKeyDown={(event) => handleKeyEnter(event)}>
    {level >= -1 || level >= 2 ? (
      <td headers="image">
      {level >= 1 ? (
        <figure className={styles.image}>
        <EntryImage alt={entry.title} entryId={entry.id} width="200" height="40" />
        </figure>
      ) : ""
    } {level == -1 || level >= 2 || level == 0 ? (
      <span>{entry.fileName}</span>
    ) : ""
  }
  </td>
) : "" }
<td headers="description">{entry.title}</td>
<td headers="location">{entry.location}</td>
<td headers="city">{entry.city}, {entry.country}</td>
<td headers="category">{entry.category}</td>
{level >= 3 ? <td headers="camera">{entry.camera}</td> : ""}
<td headers="date">{entry.date}</td>
</tr>
)
}
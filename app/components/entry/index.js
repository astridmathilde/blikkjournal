"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useReturnPath } from '@/app/hooks/use-return-path';
import styles from "../../assets/scss/components/entry/index.module.scss";

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
  
  return (
    <tr className={styles.listEntry} key={entry.id} tabIndex="3" onClick={() => handleClick()} onKeyDown={(event) => handleKeyEnter(event)}>
    <td headers="image">
    <span>{entry.fileName}</span>
    </td>
    <td headers="description">{entry.title}</td>
    <td headers="location">{entry.location}</td>
    <td headers="city">{entry.city}, {entry.country}</td>
    <td headers="category">{entry.category}</td>
    <td headers="camera">{entry.camera}</td>
    <td headers="date">{entry.date}</td>
    </tr>
  )
}
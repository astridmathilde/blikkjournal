"use client";

import { useRouter } from "next/navigation";
import styles from "@/assets/scss/components/entry/list.module.scss";

export default function ListEntry(entry) {
  const router = useRouter();
  
  return (
    <tr className={styles.listEntry} key={entry.id} onClick={() => router.push(`/entry/${entry.id}`)} >
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
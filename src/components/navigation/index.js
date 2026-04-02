"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation'
import styles from "./style.module.scss";

export default function NavLink() {
  const pathname = usePathname();
  
  return (
    <nav className={styles.navigation} id="navigation">
    <ul>
    <li key="gallery"><Link href="/" className={styles.link + " " + `${pathname === '/' ? `${styles.active}` : ''}`}>Gallery</Link></li>
    <li key="index"><Link href="/list" className={styles.link + " " + `${pathname === '/list' ? `${styles.active}` : ''}`}>List</Link></li>
    </ul>
    </nav>
  )
}
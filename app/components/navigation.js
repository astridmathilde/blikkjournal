"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation'
import styles from "../assets/scss/components/navigation.module.scss";

export default function NavLink() {
  const pathname = usePathname();
  
  return (
    <nav className={styles.navigation} id="navigation">
    <ul>
    <li key="index"><Link href="/" className={styles.link + " " + `${pathname === '/' ? `${styles.active}` : ''}`}>Index</Link></li>
    <li key="gallery"><Link href="/gallery" className={styles.link + " " + `${pathname === '/gallery' ? `${styles.active}` : ''}`}>Gallery</Link></li>
    </ul>
    </nav>
  )
}
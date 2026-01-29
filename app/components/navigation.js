"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation'
import styles from "../assets/scss/components/navigation.module.scss";

export default function NavLink() {
  const pathname = usePathname();
  
  return (
    <nav className={styles.navigation} id="navigation">
    <ul>
    <li key="album"><Link className={`link ${pathname === '/' ? 'active' : ''}`} href="/">index</Link></li>
    <li key="list"><Link className={`link ${pathname === '/gallery' ? 'active' : ''}`} href="/gallery">gallery</Link></li>

    </ul>
    </nav>
  )
}
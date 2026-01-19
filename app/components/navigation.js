"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation'
import styles from "../assets/scss/components/navigation.module.scss";

export default function NavLink(href, children) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <nav className={styles.navigation} id="navigation">
    <ul>
    <li key="album"><Link href="/" className={isActive ? 'active' : ''}>album</Link></li>
    <li key="list"><Link href="/list" className={isActive ? 'active' : ''}>list</Link></li>
    </ul>
    </nav>
  )
}
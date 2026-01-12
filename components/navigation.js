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
    <li key="index"><Link href="/index" className={isActive ? 'active' : ''}>index</Link></li>
    </ul>
    </nav>
  )
}
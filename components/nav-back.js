/* Link for navigating back using router */ 

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "@/assets/scss/components/nav-back.module.scss"

export default function NavBack({children}) {
  const router = useRouter(); 

  return (
  <Link onClick={() => router.back()} href="#" className={styles.navBack}>
  {children}
  </Link>
  );
}
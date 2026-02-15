/* Link for navigating back using router */ 

"use client";

import { useRouter } from "next/navigation";
import { getReturnPath } from "../hooks/back-navigation";
import styles from "../assets/scss/components/nav-back.module.scss"

export default function NavBack({children}) {
  const router = useRouter();
  const returnPath = getReturnPath();

  return (
  <a onClick={() => router.push(returnPath)} href="#" className={styles.navBack}>
  {children}
  </a>
  );
}
/* Link for navigating back using router */ 

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getReturnPath } from "../hooks/use-return-path";
import styles from "../assets/scss/components/nav-back.module.scss"

export default function NavBack({children}) {
  const router = useRouter();
  const returnPath = getReturnPath();
  
  /* Closing through keyboard */
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        router.push(returnPath);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    
    return () => window.removeEventListener('keydown', handleKeyDown);
  });
  
  /* Closing by click */
  return (
    <a onClick={() => router.push(returnPath)} href="#" className={styles.navBack}>
    {children}
    </a>
  );
}
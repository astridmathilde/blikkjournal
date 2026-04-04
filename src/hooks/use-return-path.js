/** 
 * Quirky hook for easy navigation back to index/gallery
 * (preserving any view settings) after navigating between 
 * single posts
 * 
 * Written with help from Claude 🐑
 **/

"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export function useReturnPath() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const fullPath = pathname + `?${searchParams}`;
    
    const isSingleEntry = pathname.match(/^\/entry\/[^/]+$/);
    
    if (!isSingleEntry) {
      sessionStorage.setItem('returnPath', fullPath);
    }
  }, [pathname, searchParams]);
}

export function getReturnPath() {
  if (typeof window !== 'undefined') {
    return sessionStorage.getItem('returnPath') || '/';
  }
  return '/';
}
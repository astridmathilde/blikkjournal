"use client";

import { useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import styles from './style.module.scss';
import utils from "@/src/assets/scss/utils.module.scss";

export default function Filter({ categories, locations, years, startTransition }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()
  
  const [selected, setSelected] = useState({ // set local state
    category: searchParams.get('category') || 'everything',
    location: searchParams.get('location') || 'everywhere',
    year: searchParams.get('year') || 'all-time',
  });
  
  
  const updateFilter = (key, value) => {
    const reset = {
      category: "everything",
      location: "everywhere",
      year: "all-time",
    }
    
    setSelected(prev => ({ ...prev, [key]: value })); // update local state
    
    const params = new URLSearchParams(searchParams);
    
    if (value === reset[key]) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  }
  
  return (
    <div className={styles.filter}>
    
    { /* Choose category */ }
    <label htmlFor="category-filter" className={utils.screen_reader_text}>Choose a category:</label>
    <select
    name="filter-category"
    id="category-filter"
    value={selected.category}
    onChange={(e) => updateFilter('category', e.target.value)}
    >
    <option value="everything">everything</option>
    {categories.map((item) => (
      <option key={item.name} value={item.name}>{item.name}</option>
    ))}
    </select>
    
    { /* Choose location */ }
    <label htmlFor="location-filter" className={utils.screen_reader_text}>Choose a location:</label>
    <select
    name="filter-location"
    id="location-filter"
    value={selected.location}
    onChange={(e) => updateFilter('location', e.target.value)}
    >
    <option value="everywhere">everywhere</option>
    {locations.map((item) => (
      <option key={item.name} value={item.name}>{item.name}</option>
    ))}
    </select>
    
    { /* Choose year */ }
    <label htmlFor="year-filter" className={utils.screen_reader_text}>Choose a year:</label>
    <select
    name="filter-year"
    id="year-filter"
    value={selected.year}
    onChange={(e) => updateFilter('year', e.target.value)}
    >
    <option value="all-time">all time</option>
    {years.map((year) => (
      <option key={year} value={year}>{year}</option>
    ))}
    </select>
    </div>
  );
}
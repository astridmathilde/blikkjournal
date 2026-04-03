"use client";

import { useRouter, useSearchParams } from "next/navigation";
import styles from './style.module.scss';
import utils from "@/src/assets/scss/utils.module.scss";

export default function Filter({ categories, locations, years, activeFilters }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  /* Written with help from Claude 🐑 */
  const updateFilter = (key, value) => {
    const params = new URLSearchParams(searchParams);
    params.set(key, value);
    params.delete('cursor'); // reset pagination when filter changes
    params.delete('page');
    params.delete('prev');
    router.push(`?${params.toString()}`);
  };
  /* End of Claude */ 
  
  return (
    <div className={styles.filter}>
    
    { /* Choose category */ }
    <label htmlFor="category-filter" className={utils.screen_reader_text}>Choose a category:</label>
    <select
    name="filter-category"
    id="category-filter"
    value={searchParams.get('category') || 'everything'}
    onChange={e => updateFilter('category', e.target.value)}
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
    value={searchParams.get('location') || 'everywhere'}
    onChange={e => updateFilter('location', e.target.value)}
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
    value={searchParams.get('year') || 'all-time'}
    onChange={e => updateFilter('year', e.target.value)}
    >
    <option value="all-time">all time</option>
    {years.map((year) => (
      <option key={year} value={year}>{year}</option>
    ))}
    </select>
    </div>
  );
}
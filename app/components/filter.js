import { getDatabase } from "../lib/notion";
import styles from '..draggable.module.scss';
import utils from '../assets/scss/utils.module.scss';

/* Get categories */
async function displayProperties() {
  const data = await getDatabase();
  return data;
}

/* Display content */
export default async function Filter() {
  const properties = await displayProperties();
  
  const categories = properties.properties.Category.select.options;
  const locations = properties.properties.Country.select.options;
  
  const currentYear = new Date().getFullYear();
  const generateYears = (startYear, currentYear) => {
    const years = [];
    for (let i = startYear; i <= currentYear; i++) {
      years.push(i);
    }
    return years;
  }
  const years = generateYears(2018, currentYear)
  
  return (
    <div className={styles.filter}>
    <label htmlFor="category-filter" className={utils.screen_reader_text}>Choose a category:</label>
    <select name="filter-category" id="category-filter">
    <option key="everything" value="everything">everything</option>
    {categories.map((item) => (
      <option key={item.name} value={item.name}>{item.name}</option>
    ))}
    </select>
    
    <label htmlFor="location-filter" className={utils.screen_reader_text}>Choose a location:</label>
    <select name="filter-location" id="location-filter">
    <option key="everywhere" value="everywhere">everywhere</option>
    {locations.map((item) => (
      <option key={item.name} value={item.name}>{item.name}</option>
    ))}
    </select>
    
    <label htmlFor="year-filter" className={utils.screen_reader_text}>Choose a year:</label>
    <select name="filter-year" id="year-filter">
    <option key="all-time" value="all-time">all time</option>
    {years.map((year) => (
      <option key={year} value={year}>{year}</option>
    ))}
    </select>
    </div>
  );
}
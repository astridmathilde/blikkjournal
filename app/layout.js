/**
 * App -> layout.js
 */

import Link from "next/link";
import '../assets/scss/global.scss';
import styles from '../assets/scss/layout.module.scss'
import { getDatabase } from "../lib/notion";

export const siteTitle = "blikk.directory";
export const siteDescription = "a collection of things and thoughts and everyday observations";

export const viewport = {
  colorScheme: 'light',
}

export const metadata = {
  metadataBase: new URL('https://blikk.directory'),
  title: siteTitle,
  description: siteDescription,
};

/* Get the database */
const databaseId = process.env.NOTION_DATABASE_ID;

/* Get the categories */
async function displayProperties() {
  const data = await getDatabase();
  return data;
}

/* Display the content */
export default async function RootLayout({ children }) {
  const properties = await displayProperties();
  const menuItems = properties.properties.Category.select.options;
  const entries = await getDatabase(databaseId); 
  const images = await checkFiles();
  
  /* Check if the images are still in use and delete if it's no longer there, but upload it if the storage does not already contain an image for the post */
  entries.forEach((entry) => {
    const entryID = entry.id;
    const imgUrl = entry.properties.Image.files[0]?.file.url;
    
    uploadFile(imgUrl, entryID);
  });
  
  images.forEach((image) => {
    const imgName = image.name;
    const imgID = imgName.replace(".jpg", "");
    
    entries.map((entry) => {
      const entryID = entry.id;
      
      if (! entryID.includes(imgID)) {
        deleteFile(imgName);
      } 
    });
  });
  
  return (
    <html lang="en">
    <body>
    <div className={styles.wrapper}>
    <header className={styles.header}>
    <h1 className={styles.title}><Link href="/">{siteTitle}</Link></h1>
    <p className={styles.description}>{siteDescription}</p>
    <nav className={styles.categories} id="categories">
    <ul>
    <li key="all"><Link href="/">all</Link></li>
    {menuItems.map((item) => (
      <li key={item.id}><Link href={`/${item.name}`}>{item.name}</Link></li>
    ))}
    </ul>
    </nav>
    </header>
    <main className={styles.content}>
    {children}
    </main>
    <footer className={styles.footer}>
    <p className={styles.colophon}><span className={styles.author}>© <a href="https://astridmathilde.no" target="_blank" rel="external">Astrid Boberg</a></span> <span className={styles.period}>2018–{(new Date().getFullYear())}</span></p>
    <p className={styles.backtotop}><Link href="#">Back to top</Link></p>
    </footer>
    </div>
    </body>
    </html>
  );
}
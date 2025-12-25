import Link from "next/link";
import '../assets/scss/global.scss';
import styles from '../assets/scss/layout.module.scss'
import { getDatabase } from "../lib/notion";

export const siteTitle = "blikk.directory";
export const siteDescription = "a collection of things and thoughts and everyday observations";

export const viewport = {
  colorScheme: 'light dark',
}

export const metadata = {
  metadataBase: new URL('https://blikk.directory'),
  title: siteTitle,
  description: siteDescription,
};


async function displayProperties() {
  const data = await getDatabase();
  return data;
}

export default async function RootLayout({ children }) {
  const properties = await displayProperties();
  const menuItems = properties.properties.Category.select.options;
  
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
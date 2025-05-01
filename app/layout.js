import Link from "next/link";
import localFont from 'next/font/local';
import '../assets/scss/global.scss';
import styles from '../assets/scss/layout.module.scss'
import { getProperties } from "/lib/notion";

export const siteTitle = "blikkjournal";
export const siteDescription = "a collection of things and thoughts";

export const metadata = {
  metadataBase: new URL('https://astrid.observer'),
  title: siteTitle,
  description: siteDescription,
};

const databaseId = process.env.NOTION_DATABASE_ID;

const NyghtSerif = localFont({
  src: [
    {
      path: '../assets/fonts/NyghtSerif-Regular.woff2',
      weight: '400',
      style: 'normal',
    }
  ]
});

const Ronzino = localFont({
  src: [
    {
      path: '../assets/fonts/Ronzino-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Ronzino-Oblique.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../assets/fonts/Ronzino-Bold.woff2',
      weight: '600',
      style: 'normal',
    },
  ]
});

async function displayProperties() {
  const data = await getProperties(databaseId);
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
    <h1 className={NyghtSerif.className + " " + styles.title}><Link href="/">{siteTitle}</Link></h1>
    <nav className={Ronzino.className + " " + styles.categories} id="categories">
    <ul>
    <li key="all"><Link href="/">all</Link></li>
    {menuItems.map((item) => (
      <li key={item.id}><Link href={`/${item.name}`}>{item.name}</Link></li>
    ))}
    </ul>
    </nav>
    </header>
    <main className={Ronzino.className + " " + styles.content}>
    {children}
    </main>
    <footer className={Ronzino.className + " " + styles.footer}>
    <p className={styles.colophon}><span className={styles.author}>© <a href="https://astridmathilde.no" target="_blank" rel="external">Astrid Mathilde</a></span> <span className={styles.period}>2018–{(new Date().getFullYear())}</span></p>
    <p className={styles.backtotop}><Link href="#">Back to top</Link></p>
    </footer>
    </div>
    </body>
    </html>
  );
}
/**
 * App -> layout.js
 */

import Link from "next/link";
import '../assets/scss/global.scss';
import styles from '../assets/scss/layout.module.scss'
import utils from '../assets/scss/utils.module.scss' 

export const siteTitle = "blikkjournal";
export const siteDescription = "a collection of moments and everyday observations";

export const viewport = {
  colorScheme: 'light',
}

export const metadata = {
  metadataBase: new URL('https://blikk.directory'),
  title: siteTitle,
  description: siteDescription,
};

export default async function RootLayout({ children }) {
  
  return (
    <html lang="en">
    <body>
    <div className={styles.wrapper}>

    <header className={styles.header}>
    <h1 className={utils.screen_reader_text}><Link href="/">{siteTitle}</Link></h1>
    <p className={styles.description}><em>blikkjournal</em> is a collection of moments 
and everyday observations.</p>
    <nav className={styles.navigation} id="navigation">
    <ul>
    <li key="album"><Link href="/">album</Link></li>
    <li key="index"><Link href="index">index</Link></li>
    </ul>
    </nav>
    </header>

    <main className={styles.content}>
    {children}
    </main>

    <footer className={styles.footer}>
    <p className={styles.author}>© <a href="https://astridmathilde.no" target="_blank" rel="external">Astrid Boberg</a> 2018–{(new Date().getFullYear())}</p>
    <p className={styles.colophob}><Link href="colophon">Colophon</Link></p>
    <p className={styles.backtotop}><Link href="#">Back to top</Link></p>
    </footer>

    </div>
    </body>
    </html>
  );
}
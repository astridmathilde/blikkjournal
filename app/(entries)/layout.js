import localFont from 'next/font/local';
import Link from "next/link";
import '../assets/scss/global.scss';
import styles from '../assets/scss/layout.module.scss'
import utils from '../assets/scss/utils.module.scss' 

export const siteTitle = "blikkjournal";
export const siteDescription = "a collection of moments and everyday observations";

export const viewport = {
  colorScheme: 'light',
}
/*
export const metadata = {
  metadataBase: new URL('https://blikk.directory'),
  title: siteTitle,
  description: siteDescription,
};
*/
const ronzino = localFont({
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
    }
  ]
})

export default function EntryLayout({ children }) {
  
  return (
    <html lang="en" className={ronzino.className}>
    <body className={styles.wrapper}> 
    <header className={styles.header}>
    <h1 className={utils.screen_reader_text}><Link href="/">{siteTitle}</Link></h1>
    </header>
    
    <main className={styles.content}>
    {children}
    </main>
    
    <footer className={styles.footer}>
    </footer>
    </body>
    </html>
  );
}
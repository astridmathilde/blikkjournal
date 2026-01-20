/**
* App -> layout.js
*/

import localFont from 'next/font/local';
import Link from "next/link";
import '../assets/scss/global.scss';
import styles from '@/assets/scss/layout.module.scss'
import utils from '@/assets/scss/utils.module.scss' 
import Navigation from '@/components/navigation';

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

export default async function RootLayout({ children }) {
  
  return (
    <html lang="en" className={ronzino.className}>
    <body>
    <div className={styles.wrapper}>
    
    <header className={styles.header}>
    <h1 className={utils.screen_reader_text}><Link href="/">{siteTitle}</Link></h1>
    <p className={styles.description}><em>blikkjournal</em> is a collection of moments 
    and everyday observations.</p>
    <Navigation />
    </header>
    
    <main className={styles.content}>
    {children}
    </main>
    
    <footer className={styles.footer}>
    <p className={styles.author}>© <a href="https://astridmathilde.no" target="_blank" rel="external">Astrid Boberg</a> 2018–{(new Date().getFullYear())}</p>  
    </footer>
    
    </div>
    </body>
    </html>
  );
}
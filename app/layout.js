import Link from "next/link";
import localFont from 'next/font/local';
import '../assets/scss/global.scss';
import styles from '../assets/scss/layout.module.scss'

export const siteTitle = "astrid's blikkjournal";

export const metadata = {
  title: siteTitle,
  description: "a collection of moments",
};

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
})

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
    <body>
    <header className={styles.header}>
    <h1 className={NyghtSerif.className + " " + styles.title}><Link href="/">blikkjournal</Link></h1>
    </header>
    <main className={Ronzino.className + " " + styles.content}>
    {children}
    </main>
    <footer className={Ronzino.className + " " + styles.footer}>
    <p>© <a href="https://astridmathilde.no" target="_blank" rel="external">Astrid Mathilde</a> {(new Date().getFullYear())}</p>
    <p><Link href="#">Back to top</Link></p>
    </footer>
    </body>
    </html>
  );
}
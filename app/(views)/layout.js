import localFont from 'next/font/local';
import Link from "next/link";
import '../assets/scss/global.scss';
import ColophonLink from '../components/colophon-link';
import ColophonContent from '../components/colophon-content';
import styles from '../assets/scss/layout.module.scss'
import utils from '../assets/scss/utils.module.scss' 
import Navigation from '../components/navigation';

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
};*/

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

export default function RootLayout({ children }) {
  
  return (
    <html lang="en" className={ronzino.className}>
    <body className={styles.wrapper}>    
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
    <ColophonLink />
    <ColophonContent>

    <h2>Colophon</h2>
    <p>The site is coded by hand using the React framework <a href="https://nextjs.org" target="_blank" rel="external">Next.js</a>. Generative AI has not been used except for research and solving wicked problems. In those cases, the language model has been run locally using the application <a href="https://osaurus.ai" rel="external" target="_blank">Osaurus</a>, minimizing carbon emissions and resource usage.</p>
    
    <p>The photos are stored in <a href="https://notion.com" target="_blank" rel="external">Notion</a> and retrieved using <a href="https://developers.notion.com" target="_blank" rel="external">Notion API</a>. If you are curious about how everything is built, the code repository is public on <a href="https://github.com/astridmathilde/blikkjournal" target="_blank" rel="external">Github</a>.</p>
    
    <p>The typeface is <a href="https://www.collletttivo.it/typefaces/ronzino" target="_blank" rel="external">Ronzino</a> from <a href="https://www.collletttivo.it" target="_blank" rel="external">Collletttivo</a>. The icons are from <a href="https://ikonate.com" target="_blank" rel="external">Iconate</a>.</p>
    
    <p>© <a href="https://astridmathilde.no" target="_blank" rel="external">Astrid Boberg</a> 2018–{(new Date().getFullYear())}</p>
    </ColophonContent>
    </footer>
  
    </body>
    </html>
  );
}
import Link from "next/link";
import '../assets/scss/global.scss';

export const siteTitle = "astrid's blikkjournal";

export const metadata = {
  title: siteTitle,
  description: "a collection of moments",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
    <body>
    <header>
    <h1><Link href="/">blikkjournal</Link></h1>
    <p>collected moments</p>
    </header>
    <main>
    {children}
    </main>
    <footer>
    <p>© <a href="https://astridmathilde.no" target="_blank" rel="external">Astrid Mathilde</a> {(new Date().getFullYear())}</p>
    <p><Link href="#">Back to top</Link></p>
    </footer>
    </body>
    </html>
  );
}
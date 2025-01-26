import Link from "next/link";

export const metadata = {
  title: "Blikkjournal",
  description: "A collection of things I have seen or noticed, something that caught my attention",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
      <header>
      <h1><Link href="/">astrid.observer</Link></h1>
      <nav id="categories">
      <ul>
        <li><Link href="urban">Urban</Link></li>
        <li><Link href="rural">Rural</Link></li>
        <li><Link href="nature">Nature</Link></li>
        <li><Link href="misc">Misc</Link></li>
      </ul>
      </nav>
      </header>
      <main>
       {children}
      </main>
        <footer>
          <p>© <a href="https://astridboberg.no" target="_blank" rel="external">Astrid Boberg</a> {(new Date().getFullYear())}</p>
        </footer>
      </body>
    </html>
  );
}

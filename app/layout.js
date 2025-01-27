import Link from "next/link";
import { getProperties } from "/lib/notion";
import '../assets/scss/global.scss';

export const databaseId = process.env.NOTION_DATABASE_ID;

export const metadata = {
  title: "astrid.observer",
  description: "a collection of things I have seen or noticed",
};

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
    <header>
    <h1><Link href="/">astrid.observer</Link></h1>
    <nav id="categories">
    <ul>
    {menuItems.map((item) => (
      <li key={item.id}><Link href={`/${item.name}`}>{item.name}</Link></li>
    ))}
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

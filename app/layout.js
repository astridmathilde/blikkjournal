import Link from "next/link";
import { getProperties } from "/lib/notion";

export const databaseId = process.env.NOTION_DATABASE_ID;

export const metadata = {
  title: "Blikkjournal",
  description: "A collection of things I have seen or noticed, something that caught my attention",
};

async function displayProperties() {
  const data = await getProperties(databaseId);
  return data;
}

export default async function RootLayout({ children }) {
  const properties = await displayProperties();
  const menuItems = properties.properties.Category.select.options;
  console.log(menuItems);

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

import Link from "next/link";
import { getProperties, getDatabase } from "/lib/notion";
import { checkFiles } from "/lib/subabase";
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
  const entries = await getDatabase(databaseId);
  const images = await checkFiles();
  
  // Check if the image is still in use, otherwise delete it
  const getEntryIDs = entries.map(entry => `${entry.id}`);
  
  images.forEach((image) => {
    const imgName = image.name;
    const imgID = imgName.replace(".jpg", "");
    
    if (! getEntryIDs.includes(imgID)) {
       console.log(`the image ${imgID + ".jpg"} should be deleted`);
    }
  });
  
  return (
    <html lang="en">
    <body>
    <header>
    <h1><Link href="/">astrid.observer</Link></h1>
    <nav id="categories">
    <ul>
    <li key="all"><Link href="/">all</Link></li>
    {menuItems.map((item) => (
      <li key={item.id}><Link href={`/category/${item.name}`}>{item.name}</Link></li>
    ))}
    </ul>
    </nav>
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
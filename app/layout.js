import Link from "next/link";
import { getDatabase, getProperties } from "/lib/notion";
import { uploadFile, checkFiles, deleteFile } from "/lib/subabase";
import '../assets/scss/global.scss';

export const metadata = {
  title: "astrid.observer",
  description: "a collection of things I have seen or noticed",
};

/* Get the database */
const databaseId = process.env.NOTION_DATABASE_ID;

/* Get the categories */
async function displayProperties() {
  const data = await getProperties(databaseId);
  return data;
}

/* Display the content */
export default async function RootLayout({ children }) {
  const properties = await displayProperties();
  const menuItems = properties.properties.Category.select.options;
  const entries = await getDatabase(databaseId); 
  const images = await checkFiles();
  
  /* Check if the images are still in use and delete if it's no longer there, but upload it if the storage does not already contain an image for the post */
  entries.forEach((entry) => {
    const entryID = entry.id;
    const imgUrl = entry.properties.Image.files[0]?.file.url;
    
    uploadFile(imgUrl, entryID);
  });
  
  images.forEach((image) => {
    const imgName = image.name;
    const imgID = imgName.replace(".jpg", "");
    
    entries.map((entry) => {
      const entryID = entry.id;
      
      if (! entryID.includes(imgID)) {
        deleteFile(imgName);
      } 
    });
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
import { getDatabase } from "/lib/notion";

export const databaseId = process.env.NOTION_DATABASE_ID;

async function getPosts() {
  const database = await getDatabase(databaseId);
  return database;
}


export default async function Index() {
  const entries = await getPosts();
  
  return (
    <>
    {entries.map((entry) => {
      const title = entry.properties.Title.title[0]?.plain_text;
      const image = entry.properties.Image.files[0]?.file.url;
;
      return (
        <figure key={entry.id}>
        <img src={image} alt={title} />
        <figcaption>{title}</figcaption>
        </figure>
      )
    })}
    </>
  );
}


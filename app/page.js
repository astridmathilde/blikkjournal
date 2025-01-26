import { getDatabase } from "/lib/notion";

const databaseId = process.env.NOTION_DATABASE_ID;

export default async function Index() {
  const databaseEntries = await getDatabase(databaseId);
  
  return (
    <>
    <ul>
    {databaseEntries.map((entry) => (
      <li key={entry.id}>{entry.id}</li>
    ))}
    </ul>
    </>
  );
}


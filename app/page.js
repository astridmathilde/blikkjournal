import { Client } from "@notionhq/client";

export default async function Home() {
  const notion = new Client ({ 
    auth: process.env.NOTION_KEY
  })

  const data = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID
  })

  const entries = data.results;

  console.log(entries);

  return (
    <ul>
     {entries.map((entry) => (
        <li key={entry.id}>{entry.id}</li>
      ))}
    </ul>
  );
}

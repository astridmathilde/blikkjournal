import { Client } from "@notionhq/client";
import { downloadImage } from "../../lib/download-image";
import path from "path";

async function getImages() {
  const notion = new Client({
    auth: process.env.NOTION_KEY,
  });
  
  const databaseId = process.env.NOTION_DATABASE_ID;
  
  const response = await notion.databases.query({
    database_id: databaseId,
  });
  
  const entries = response.results;
  
  entries.forEach(async image => {
    const imgName = `${image.id}.jpg`;
    const imgUrl = image.properties.Image.files[0]?.file.url;
    
    if (imgUrl) {
      const tmpPath = `/tmp/${imgName}`;
      const publicPath = path.join(process.cwd(), "public/images", imgName);
      
      downloadImage(imgUrl, tmpPath).then(() => {
        fs.renameSync(tmpPath, publicPath);
      });
    }
  })
}

export default async (req) => {
  const { next_run } = await req.json()
  await getImages();
  console.log("Received event! Next invocation at:", next_run)
}

export const config = {
  schedule: "@hourly"
}
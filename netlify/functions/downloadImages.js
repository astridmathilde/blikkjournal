import { Client } from "@notionhq/client";

const notion = new Client({
  auth: process.env.NOTION_KEY,
});

const databaseId = process.env.NOTION_DATABASE_ID;

import fs from "fs";
import fetch from "node-fetch";

async function downloadImage(url, filepath) {
  try {
    const response = await fetch(url);
    const dest = fs.createWriteStream(filepath);
    await new Promise((resolve, reject) => {
      response.body.pipe(dest);
      response.body.on("end", resolve);
      dest.on("error", reject);
    });
    console.log(`${filepath.split("/")[3]} was downloaded successfully.`);
  } catch (error) {
    console.error(`Error downloading image: ${error}`);
  }
}

export async function handler(event, context) {
  const response = await notion.databases.query({
    database_id: databaseId,
    sorts: [
      {
        property: "Time",
        direction: "descending"
      }
    ],
  });
  
  const entries = response.results;
  
  entries.forEach(image => {
    const imgName = `${image.id}.jpg`;
    const imgUrl = image.properties.Image.files[0]?.file.url;
    
    if (imgUrl) {
      downloadImage(imgUrl, `/tmp/${imgName}`);
    }
  })
  
  
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Images downloaded successfully" }),
  };
}
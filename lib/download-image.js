/**
 * Function for downloading images fetched from Notion
 */

import fs from "fs";
import path from "path";
import fetch from "node-fetch";

export async function downloadImage(imageUrl, imageName) {
  const imagesPath = path.join(process.cwd(), "public/images");
  
  if (!fs.existsSync(imagesPath)) {
    fs.mkdirSync(imagesPath, { recursive: true });
  }
  
  const response = await fetch(imageUrl);
  const buffer = await response.buffer();
  
  const filePath = path.join(imagesPath, imageName);
  fs.writeFileSync(filePath, buffer);
  
  return `/images/${imageName}`;
}
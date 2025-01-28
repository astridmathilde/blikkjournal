import fs from "fs";
import fetch from "node-fetch";

export async function downloadImage(url, filepath) {
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
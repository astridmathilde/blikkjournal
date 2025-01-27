/**
 * Downloading the images and saving them locally
 * @link https://www.danvega.dev/blog/notion-api-file-expired
 */

import fs from "fs";
import fetch from "node-fetch";

export async function downloadImage(url, filepath) {
  fetch(url)
  .then(
    res =>
      new Promise((resolve, reject) => {
      const dest = fs.createWriteStream(filepath);
      res.body.pipe(dest);
      res.body.on("end", () =>
        resolve(filepath.split("/")[3] + " was downloaded successfully.")
    );
    dest.on("error", reject);
  })
)
.then(x => console.log(x));
}
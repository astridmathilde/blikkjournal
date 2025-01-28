const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");
const { getDatabase } = require("../lib/notion");

const OUTPUT_DIR = path.join(process.cwd(), "public/images");
const databaseId = process.env.NOTION_DATABASE_ID;

async function fetchImages() {
  try {
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }
    
    const entries = await getDatabase(databaseId);
    
    for (const entry of entries) {
      const imgName = `${entry.id}.jpg`;
      const imgUrl = entry.properties.Image.files[0]?.file.url;
      
      if (imgUrl) {
        console.log(`Downloading ${imgName} from ${imgUrl}`);
        const response = await fetch(imgUrl);
        
        if (!response.ok) {
          console.error(`Failed to download ${imgUrl}`);
          continue;
        }
        
        const filePath = path.join(OUTPUT_DIR, imgName);
        const fileStream = fs.createWriteStream(filePath);
        
        await new Promise((resolve, reject) => {
          response.body.pipe(fileStream);
          response.body.on("end", resolve);
          fileStream.on("error", reject);
        });
        
        console.log(`Saved ${imgName} to ${filePath}`);
      } else {
        console.warn(`No image URL found for entry: ${entry.id}`);
      }
    }
    
    console.log("Image prefetching complete.");
  } catch (error) {
    console.error("Error during image prefetching:", error);
  }
}

fetchImages();

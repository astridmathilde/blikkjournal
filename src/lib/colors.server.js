/**
* 
* Function for getting a dominant color from a single entry and then creating a new hex color by blending the existing color with white at 20% opacity -> creating a nice & soft pastel color instead 🎨
* 
* Written with help from Claude 🐑
* 
*/
import 'server-only';
import { unstable_cache } from 'next/cache';
import { getEntry } from './notion';

export const getEntryColor = unstable_cache(
  async (pageId) => {
    const fallBack = "rgba(40, 40, 40, 0.2)";

    try {
    const entry = await getEntry(pageId);
    const imgUrl = entry.properties.Image.files[0]?.file.url;
    
    if ( !imgUrl) return fallBack;
    
    const imageResponse = await fetch(imgUrl);
    const imageBuffer = Buffer.from(await imageResponse.arrayBuffer());
    
    const fac = await import('fast-average-color-node');
    const color = await fac.getAverageColor(imageBuffer);
    
    return color.hex;
  } catch (error) {
    return fallBack;
  }
  },
  ['entryColor'],
  { revalidate: 2592000, tags: ['entryColor'] }
);

export function createPastelColor(hex, opacity = 0.2) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  
  const blended = (channel) => Math.round(channel * opacity + 255 * (1 - opacity));
  
  const toHex = (channel) => blended(channel).toString(16).padStart(2, '0');
  
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}
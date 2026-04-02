/**
* 
* Function for handling images from Notion API
* 
* (Improved with help from Claude 🐑)
*
*/

import { getEntry } from '@/src/lib/notion';
import { unstable_cache } from 'next/cache';
import { NextResponse } from 'next/server';

const getImageBuffer = unstable_cache(
  async (entryId) => {
    const entry = await getEntry(entryId);
    const imgUrl = entry.properties.Image.files[0]?.file.url;
    const imageResponse = await fetch(imgUrl, { cache: 'no-store' });
    const contentType = imageResponse.headers.get('content-type');
    const buffer = Buffer.from(await imageResponse.arrayBuffer());
    return { buffer: buffer.toString('base64'), contentType };
  },
  [(entryId) => `imageBuffer-${entryId}`],
  { revalidate: 2592000, tags: ['singleEntry'] } 
);

export async function GET(request, { params }) {
  const { entryId } = await params;
  
  try {
    const { buffer, contentType } = await getImageBuffer(entryId);
    
    return new NextResponse(Buffer.from(buffer, 'base64'), {
      headers: {
        'Content-Type': contentType,
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=1, immutable'
      }
    });
  } catch (error) {
    console.error("API proxy error:", error);
    return new NextResponse(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}
/**
* 
* Function for handling images from Notion API or mock data (picsum.photos)
* 
*/

import { getEntry } from '@/app/lib/notion';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'; 

export async function GET(request, { params }) {
  const { entryId } = await params;
  
  try {
    const entry = await getEntry(entryId); 
    const imgUrl = entry.properties.Image.files[0]?.file.url;
    
    // Fetch image from URL (Notion CDN or picsum.photos for mock data)
    const imageResponse = await fetch(imgUrl);
    
    const headers = {
      'Content-Type': imageResponse.headers.get('content-type'),
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=2592000, immutable'
    };
    
    return new NextResponse(imageResponse.body, { headers });
    
  } catch (error) {
    console.error("API proxy error:", error);
    return new NextResponse(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}


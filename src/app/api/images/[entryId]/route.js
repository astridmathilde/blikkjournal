/**
* 
* Function for handling images from Notion API
* 
*/

import { getEntry } from '@/src/lib/notion';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const { entryId } = await params;
  
  try {
    const entry = await getEntry(entryId); 
    const imgUrl = entry.properties.Image.files[0]?.file.url;     
    const imageResponse = await fetch(imgUrl);
    
    const headers = {
      'Content-Type': imageResponse.headers.get('content-type'),
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400'
    };
    
    return new NextResponse(imageResponse.body, { headers });
    
  } catch (error) {
    console.error("API proxy error:", error);
    return new NextResponse(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}

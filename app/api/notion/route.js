/**
* Revalidating the cache when posts are updated, using Notion API Webhooks
* @url https://developers.notion.com/reference/webhooks
*/
import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const response = JSON.parse(await request.text());
    
    /* revalidating the cache if there is any changes */
    if (response.type === 'page.properties_updated' || response.type === 'page.created' || response.type === 'page.deleted' || response.type === 'page.undeleted') {
      revalidateTag('entries');
      revalidateTag('singleEntry');
      revalidateTag('properties');
      /* logging everything for debugging */
      console.log('cache revalidated for', response.type);
    }
    
    /* response thing */
    return NextResponse.json({ 
      received: true,
      event_type: response.type 
    });
  }
  /* error handling stuff */
  catch (error) {
    console.error(error);
    return NextResponse.json({ 
      error: 'neeei:(',
      message: error.message 
    }, { status: 500 });
  }
}
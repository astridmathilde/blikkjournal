/**
* Revalidating the cache when posts are updated, using Notion API Webhooks
* @url https://developers.notion.com/reference/webhooks
*/

import { revalidateTag, revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const parsedRequest = JSON.parse(await request.text());
    
    /* revalidating the cache if there is any changes */
    if (parsedRequest.type === 'page.properties_updated' || parsedRequest.type === 'page.created' || parsedRequest.type === 'page.deleted' || parsedRequest.type === 'page.undeleted') {
      revalidateTag('singleEntry');
      revalidateTag('properties');
      revalidateTag('entryColor');
      revalidateTag('allEntries');
      revalidatePath('/');
      revalidatePath('/list');
      console.log('cache revalidated for', parsedRequest.type);
    }
    
    /* response thing */
    return NextResponse.json({ 
      received: true,
      event_type: parsedRequest.type 
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
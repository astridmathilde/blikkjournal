/**
* Revalidating the cache when posts are updated, using Notion API Webhooks

* @url https://developers.notion.com/reference/webhooks
*/

import { revalidatePath, revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

export async function POST() {
  revalidateTag('entries');
  revalidateTag('singleEntry');
  revalidateTag('properties')
  revalidatePath('/');
  
  return NextResponse.json({ 
    revalidated: true, 
    now: Date.now() 
  });
}

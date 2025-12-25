/**
* Revalidating the cache when posts are updated, using Notion API Webhooks

* @url https://developers.notion.com/reference/webhooks
*/

import { NextResponse } from 'next/server';

export async function POST(request) {
  const response = JSON.parse(await request.text());
  
  if (response) {
    console.log(response);
    return NextResponse.json({ 
      message: 'hei:)' 
    });
  }
}

/**
* Revalidating the cache when posts are updated, using Notion API Webhooks

* @url https://developers.notion.com/reference/webhooks
*/

import { NextResponse } from 'next/server';

export async function GET(request) {
  const response = JSON.parse(await request.text());
  
  try {
    console.log(response);
    return NextResponse.json({ 
      message: 'hei:)' 
    });
  }
  
  catch (error) {
    console.error(error);
    return NextResponse.json({ 
      message: 'neeei:(' 
    });
  }
}

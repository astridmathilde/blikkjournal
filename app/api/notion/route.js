/**
* Revalidating the cache when posts are updated, using Notion API Webhooks
* @url https://developers.notion.com/reference/webhooks
*/
import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';
import { createHmac, timingSafeEqual } from "crypto"

export async function POST(request) {
  try {
    const response = JSON.parse(await request.text());
    
    /* receiving things from the webhook here */
    if (response) {
      console.log(response);
      return NextResponse.json({ 
        message: 'hei:)' 
      });
    }
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
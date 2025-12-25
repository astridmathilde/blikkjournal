/**
* Revalidating the cache when posts are updated, using Notion API Webhooks
* @url https://developers.notion.com/reference/webhooks
*/
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const response = JSON.parse(await request.text());
    
    if (response.verification_token) {
      console.log(response.verification_token);
      return NextResponse.json({ 
        message: 'hei:)' 
      });
    }
      return NextResponse.json({ 
        received: true,
        event_type: response.type 
      });
      
    } catch (error) {
      console.error(error);
      return NextResponse.json({ 
        error: 'neeei:(',
        message: error.message 
      }, { status: 500 });
    }
  }
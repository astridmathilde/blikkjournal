/**
* Revalidating the cache when posts are updated, using Notion API Webhooks
* @url https://developers.notion.com/reference/webhooks
*/
import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const response = JSON.parse(await request.text());
    /* receiving things from the webhook here */
    if (response) {
      console.log(response);
    }
  }
  /* error handling stuff */
  catch (error) {
    console.error(error);
  }
}
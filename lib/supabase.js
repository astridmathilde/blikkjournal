import fetch from 'node-fetch';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export async function uploadImage(imgName, imgUrl) {
  const fileName = `/public/${imgName}.jpg`;
  const supaResponse = await fetch(imgUrl); 
  const fileData = await supaResponse.arrayBuffer();
  
  const { error } = await supabase.storage.from('images').upload(fileName, fileData, {
    cacheControl: '8640',
    contentType: 'image/webp'
  });
  if (error) {
    console.log(error);
  } else {
    console.log(`Succesfully uploaded ${fileName}`);
  }
}
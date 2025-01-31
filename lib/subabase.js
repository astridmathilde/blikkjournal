import fetch from 'node-fetch';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export async function uploadFile(imgUrl, imgName) {
  const fileName = `/public/${imgName}.jpg`;
  const response = await fetch(imgUrl); 
  const fileData = await response.arrayBuffer();
  
  const { error } = await supabase.storage.from('images').upload(fileName, fileData, {
    cacheControl: '450000',
    contentType: 'image/jpeg',
    upsert: false
  })
  if (error) {
    console.log(error);
  } else {
    console.log(`Succesfully uploaded ${fileName}`);
  }
}

export function retrieveFile(imgName) {
  const { data } = supabase.storage.from('images').getPublicUrl(`public/${imgName}.jpg`);
  return data.publicUrl;
}

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
  const {data, error} = supabase.storage.from('images').getPublicUrl(`public/${imgName}.jpg`);
  
  if (error) {
    console.log(error);
  } else {
    return data.publicUrl;
  }
}

export async function checkFiles() {
  const { data, error } = await supabase.storage.from('images').list('public', {
    limit: 100,
    offset: 0,
    sortBy: { column: 'name', order: 'asc' },
  });

  if (error) {
    console.log(error);
  } else {
    return data;
  }
}

export async function deleteFile(imgName) {
  const fileName = `/public/${imgName}.jpg`;
  
  const { error } = await supabase.storage.from('images').remove([fileName])
  if (error) {
    console.log(error);
  } else {
    console.log(`Succesfully removed ${fileName}`);
  }
}

import { unstable_cache } from "next/cache";
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export async function uploadFile(file) {
  const { error } = await supabase.storage.from('blikkjournal').upload('/', file)
  if (error) {
    console.log("Could not upload " + file);
  } else {
    console.log("Succesfully downloaded " + file);
  }
}

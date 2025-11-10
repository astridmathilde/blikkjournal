/**
 * Image component with function for reloading image on error
 */

"use client";

import { useState } from 'react';
import Image from 'next/image';
import { getEntriesNoCache } from '/lib/notion';

export default function EntryImage({src, alt, priority, entryId, databaseId}) {
  const [imageSrc, setImageSrc] = useState(src);

  const reloadOnError = async() => {
    try {
      const allEntries = await getEntriesNoCache(databaseId);
      const singleEntry = allEntries.find((entry) => entry.id === entryId);
      
      if(singleEntry?.imageSrc) setImageSrc(singleEntry.properties.Image.files[0]?.file.url);

      console.log("reloaded image")
    } catch(err) {
      console.error("woopsie");
    }
  }
  
  return (
    <Image 
    src={imageSrc}
    alt={alt}
    fill={true}
    priority={priority}
    onError={reloadOnError} 
    
    />
  )
}
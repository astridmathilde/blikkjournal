/**
 * Image component with function for reloading image on error
 */

"use client";

import { useState } from 'react';
import Image from 'next/image';
import { getSingleEntry } from '/lib/notion';


export default function EntryImage({src, alt, priority,entryId, databaseId}) {
  const [imageSrc, setImageSrc] = useState(src);

  const reloadOnError = async() => {
    try {
      const res = await getSingleEntry(databaseId, entryId);
      if(res?.imageSrc) setImageSrc(res.properties.Image.files[0]?.file.url);
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
/**
* Components -> entry.js
* Image component with function for reloading image on error
*/

import Image from 'next/image';

export default function EntryImage({ entryId, alt }) {
  const proxySrc = `/api/images/${entryId}`;
  
  return (
    <Image 
    src={proxySrc}
    alt={alt}
    width={300}
    height={300}
    unoptimized
    />
  );
}
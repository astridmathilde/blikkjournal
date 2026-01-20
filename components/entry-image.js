/**
* Components -> entry.js
* Image component with function for reloading image on error
*/

import Image from 'next/image';

export default function EntryImage({ entryId, alt, width, height }) {
  const proxySrc = `/api/images/${entryId}`;
  
  return (
    <Image 
    src={proxySrc}
    alt={alt}
    width={width}
    height={height}
    unoptimized
    />
  );
}
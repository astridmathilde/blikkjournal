/**
* Image component with function for reloading image on error
*/

import Image from 'next/image';

export default function EntryImage({ entryId, alt, priority }) {
  const proxySrc = `/api/${entryId}`;
  
  return (
    <Image 
    src={proxySrc}
    alt={alt}
    fill={true}
    priority={priority}
    />
  );
}
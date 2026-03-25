import Image from 'next/image';

export default function EntryImage({ entryId, alt, fill, width, height, style, preload, priority, sizes}) {
  const proxySrc = `/api/images/${entryId}`;
  
  return (
    <Image 
    src={proxySrc}
    alt={alt}
    width={width}
    height={height}
    fill={fill}
    style={style}
    preload={preload}
    priority={priority}
    sizes={sizes}
    />
  );
}
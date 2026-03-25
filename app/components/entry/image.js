import Image from 'next/image';

export default function EntryImage({ entryId, alt, fill, width, height, style, priority, sizes}) {
  const proxySrc = `/api/images/${entryId}`;
  
  return (
    <Image 
    src={proxySrc}
    alt={alt}
    width={width}
    height={height}
    fill={fill}
    style={style}
    priority={priority}
    sizes={sizes}
    />
  );
}
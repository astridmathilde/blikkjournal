import Image from 'next/image';

/* Claude helped me write this 🐑 */
function colorPlaceholderDataUrl(color) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1">
    <rect width="1" height="1" fill="${color}"/>
  </svg>`;
  return `data:image/svg+xml;base64,${btoa(svg)}`;
}

export default function EntryImage({ entryId, alt, fill, width, height, style, priority, sizes, placeholderColor}) {
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
    placeholder="blur"
    blurDataURL={colorPlaceholderDataUrl(placeholderColor ?? "rgba(40, 40, 40, 0.2)")}
    />
  );
}
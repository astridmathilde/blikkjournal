import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
}

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontSize: 32,
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
       👀
      </div>
    ),
    // ImageResponse options
    {
      width: 32,
      height: 32,
      emoji: 'openmoji'
    }
  )
}
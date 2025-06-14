
/* Get colors from image */
import { useExtractColors } from "react-extract-colors";

export default function getColors() {
  const src = "https://zyogtonhvhmvovtskbnr.supabase.co/storage/v1/object/public/images/public/1ef83ae9-ec68-8063-8cd7-f2b4b04d1540.jpg";
  const { colors, dominantColor, darkerColor, lighterColor, loading, error } =
  useExtractColors(src);
  
  console.log(dominantColor);
}
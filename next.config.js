/** @type {import('next').NextConfig} */
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'blikk.directory',
        pathname: '/api/images/**',
      },
    ],
  },
  turbopack: {
    root: path.join(__dirname, '..'),
  },
};

export default nextConfig;
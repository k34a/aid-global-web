import type { NextConfig } from 'next';
import dotenv from 'dotenv';
dotenv.config();


const hostname = process.env.NEXT_PUBLIC_SUPABASE_HOSTNAME;
if (!hostname) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_HOSTNAME in .env file');
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: hostname,
      },
    ],
  },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'whewzwebzozrrgxceubm.supabase.co',
        pathname: '/storage/v1/object/public/content/images/**',
      },
    ],
  },
};

module.exports = nextConfig;

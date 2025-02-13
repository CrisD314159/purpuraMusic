import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images:{
    remotePatterns:[
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port:'',
        pathname: '/dw43hgf5p/**'
      }
    ]
  },
  experimental:{
    serverActions:{
      bodySizeLimit:'7mb'
    }
  },
  async redirects() {
    return [
      {
        source: '/dashboard',
        destination: '/dashboard/home',
        permanent: true,
      },
    ]
  },
  /* config options here */
};

export default nextConfig;

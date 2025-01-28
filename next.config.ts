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
  }
  /* config options here */
};

export default nextConfig;

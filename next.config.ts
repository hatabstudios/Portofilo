import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/GymTemplet",
        destination: "/",
        permanent: false,
      },
      {
        source: "/GymTemplate",
        destination: "/",
        permanent: false,
      },
      {
        source: "/aasifaa",
        destination: "https://aasifaa.vercel.app",
        permanent: false,
      },
      {
        source: "/aasifaa.vercel.app",
        destination: "https://aasifaa.vercel.app",
        permanent: false,
      },
      {
        source: "/majarrah",
        destination: "https://majarrah.vercel.app",
        permanent: false,
      },
      {
        source: "/Majarrah",
        destination: "https://majarrah.vercel.app",
        permanent: false,
      },
      {
        source: "/Majarrah.vercel.app",
        destination: "https://majarrah.vercel.app",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;

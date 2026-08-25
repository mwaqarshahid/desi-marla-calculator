import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/marla-to-square-feet",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

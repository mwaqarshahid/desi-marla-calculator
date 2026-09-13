import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      "/marla-to-square-feet",
      "/normal-to-lahori",
      "/normal-to-multani",
      "/lahori-to-normal",
      "/lahori-to-multani",
      "/multani-to-normal",
      "/multani-to-lahori",
    ].map((source) => ({
      source,
      destination: "/",
      permanent: true,
    }));
  },
};

export default nextConfig;

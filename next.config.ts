import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/discord",
        destination: "https://discord.gg/ycNhzjbTuY",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;

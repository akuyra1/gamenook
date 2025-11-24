import type { NextConfig } from "next";

module.exports = {
  images: {
    remotePatterns: [new URL('https://assets.example.com/account123/**')],
  },
}
const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;

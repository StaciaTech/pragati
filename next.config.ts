import type { NextConfig } from "next";
import dotenv from "dotenv";

dotenv.config();
const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
        port: "",
        pathname: "/**",
      },
    ],
  },
  devIndicators: {
    allowedDevOrigins: [
        '9000-firebase-studio-1753083471050.cluster-xpmcxs2fjnhg6xvn446ubtgpio.cloudworkstations.dev',
    ],
  },
};

export default nextConfig;

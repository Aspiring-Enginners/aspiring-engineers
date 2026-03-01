import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.theaspiringengineers.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "aspiringengstorage.blob.core.windows.net",
        pathname: "/**",
      },
      // Only allow localhost images in development
      ...(isDev
        ? [
            {
              protocol: "http" as const,
              hostname: "localhost",
              pathname: "/**",
            },
          ]
        : []),
    ],
  },
};

export default nextConfig;
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
  allowedDevOrigins: [
    "192.168.31.20",
  ],
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        // This value is evaluated by Next.js on the server. Browser code must
        // always call the same-origin /api path so the frontend domain owns the
        // authentication and CSRF cookies.
        destination: `${process.env.API_BACKEND_URL || process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080"}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;

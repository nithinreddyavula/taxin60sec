import type { MetadataRoute } from "next";

const BASE_URL = "https://tax60sec.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/dashboard",
          "/admin",
          "/ca-workspace",
          "/ca/",
          "/vault",
          "/profile",
          "/cases",
          "/payments",
          "/command-center",
          "/login",
          "/register",
          "/tax-health",
          "/calendar",
          "/subscriptions",
          "/notices",
          "/my-services",
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
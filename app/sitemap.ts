import type { MetadataRoute } from "next";

const BASE_URL = "https://tax60sec.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/services/gst-filling",
    "/health-check",
    "/tax-health",
    "/nri/repatriation",
    "/contact",
    "/ca-apply",
    "/blog",
  ];

  return staticRoutes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.7,
  }));
}
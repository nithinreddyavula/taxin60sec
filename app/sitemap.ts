import type { MetadataRoute } from "next";
import { BLOG_POSTS } from "@/lib/blog-posts";

const BASE_URL = "https://tax60sec.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/services/gst-filling",
    "/services/itr-filing",
    "/services/nri-tax-filing",
    "/services/freelancer-tax-filing",
    "/services/gst-registration",
    "/services/tax-notice",
    "/health-check",
    "/nri/repatriation",
    "/contact",
    "/ca-apply",
    "/blog",
    "/tools",
    "/deadlines",
  ];

  return [...staticRoutes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.7,
  })), ...BLOG_POSTS.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }))];
}

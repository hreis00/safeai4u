import { MetadataRoute } from "next";
import { BASE_SEO } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/admin/", "/_next/"],
    },
    sitemap: `${BASE_SEO.siteUrl}/sitemap.xml`,
  };
}

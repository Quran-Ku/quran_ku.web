import { MetadataRoute } from "next";
import { APP_CONFIG } from "@/core/constants/app-config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/open"],
    },
    sitemap: `${APP_CONFIG.canonicalUrl}/sitemap.xml`,
  };
}

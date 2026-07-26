import type { MetadataRoute } from "next";

const siteUrl =
  "https://northshore-caroline-springs-booking.northshore-6627.chatgpt-team.site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/api/", "/thank-you"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}

import type { MetadataRoute } from "next";

const siteUrl =
  "https://northshore-caroline-springs-booking.northshore-6627.chatgpt-team.site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/selective-school-preparation-caroline-springs`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];
}

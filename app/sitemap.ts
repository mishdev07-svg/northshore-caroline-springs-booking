import type { MetadataRoute } from "next";

import { publicSiteUrl } from "../lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: publicSiteUrl,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${publicSiteUrl}/tutoring-caroline-springs`,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${publicSiteUrl}/selective-school-preparation-caroline-springs`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${publicSiteUrl}/scholarship-preparation-caroline-springs`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];
}

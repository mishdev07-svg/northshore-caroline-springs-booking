import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

import { BookingLandingPage } from "../components/booking/booking-landing-page";
import robots from "./robots";
import sitemap from "./sitemap";

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    back: () => undefined,
    forward: () => undefined,
    prefetch: () => undefined,
    push: () => undefined,
    refresh: () => undefined,
    replace: () => undefined,
  }),
}));

const publicSiteUrl =
  "https://northshore-caroline-springs-booking.mishdev07.workers.dev";

describe("SEO route URLs", () => {
  it("publishes every sitemap entry under the public production host", () => {
    expect(sitemap().map((entry) => entry.url)).toEqual([
      publicSiteUrl,
      `${publicSiteUrl}/tutoring-caroline-springs`,
      `${publicSiteUrl}/selective-school-preparation-caroline-springs`,
      `${publicSiteUrl}/scholarship-preparation-caroline-springs`,
    ]);
  });

  it("advertises the public production sitemap to crawlers", () => {
    expect(robots().sitemap).toBe(`${publicSiteUrl}/sitemap.xml`);
  });

  it("publishes the public production URL in landing-page structured data", () => {
    const html = renderToStaticMarkup(
      createElement(BookingLandingPage, {
        canonicalPath: "/selective-school-preparation-caroline-springs",
        variant: "selective",
      }),
    );

    expect(html).toContain(
      `"url":"${publicSiteUrl}/selective-school-preparation-caroline-springs"`,
    );
    expect(html).not.toContain("chatgpt-team.site");
  });
});

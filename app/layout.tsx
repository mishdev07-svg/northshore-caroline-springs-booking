import type { Metadata } from "next";
import { headers } from "next/headers";

import { TrackingScripts } from "@/components/analytics/tracking-scripts";

import "./globals.css";

const fallbackSiteUrl =
  "https://northshore-caroline-springs-booking.northshore-6627.chatgpt-team.site";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host");
  const protocol =
    requestHeaders.get("x-forwarded-proto") ??
    (host?.startsWith("localhost") || host?.startsWith("127.0.0.1")
      ? "http"
      : "https");
  const siteUrl = host ? `${protocol}://${host}` : fallbackSiteUrl;

  return {
    metadataBase: new URL(siteUrl),
    title: "Tutoring Caroline Springs | Free Assessment | North Shore",
    description:
      "Prep-Year 10 tutoring, Selective School Preparation and Scholarship Preparation at North Shore Caroline Springs. Book a free initial assessment.",
    keywords: [
      "tutoring Caroline Springs",
      "maths tutoring Caroline Springs",
      "English tutoring Caroline Springs",
      "selective school preparation Caroline Springs",
      "scholarship preparation Caroline Springs",
      "North Shore Caroline Springs",
    ],
    alternates: {
      canonical: "/",
    },
    openGraph: {
      title: "Tutoring in Caroline Springs That Starts With a Clear Plan",
      description:
        "Book a free initial assessment at North Shore Coaching College Caroline Springs.",
      url: "/",
      type: "website",
      locale: "en_AU",
      siteName: "North Shore Caroline Springs",
      images: [
        {
          url: "/og.png",
          width: 1536,
          height: 864,
          alt: "North Shore Caroline Springs free learning assessment",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Tutoring in Caroline Springs | North Shore",
      description:
        "Start with a free initial assessment and a clear recommendation for the next step.",
      images: ["/og.png"],
    },
    icons: {
      icon: "/favicon.svg",
      shortcut: "/favicon.svg",
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        <TrackingScripts />
      </body>
    </html>
  );
}

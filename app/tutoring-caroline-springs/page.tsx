import type { Metadata } from "next";

import { BookingLandingPage } from "@/components/booking/booking-landing-page";

export const metadata: Metadata = {
  title: "Tutoring Caroline Springs | Free Assessment | North Shore",
  description:
    "Structured Prep-Year 10 tutoring in Caroline Springs with qualified teachers. Start with a free initial assessment and no enrolment commitment.",
  alternates: {
    canonical: "/tutoring-caroline-springs",
  },
  openGraph: {
    title: "Tutoring in Caroline Springs | North Shore",
    description:
      "Start with a free initial assessment and a clear recommendation for your child's next learning step.",
    url: "/tutoring-caroline-springs",
    type: "website",
  },
};

export default function TutoringCarolineSpringsPage() {
  return (
    <BookingLandingPage canonicalPath="/tutoring-caroline-springs" />
  );
}

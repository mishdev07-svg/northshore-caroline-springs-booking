import type { Metadata } from "next";

import { BookingLandingPage } from "@/components/booking/booking-landing-page";

export const metadata: Metadata = {
  title: "Scholarship Preparation Caroline Springs | North Shore",
  description:
    "Structured scholarship preparation in Caroline Springs with qualified teachers. Start with a free initial assessment and a clear pathway.",
  alternates: {
    canonical: "/scholarship-preparation-caroline-springs",
  },
  openGraph: {
    title: "Scholarship Preparation | Caroline Springs",
    description:
      "Begin with a free initial assessment and a structured, realistic preparation pathway.",
    url: "/scholarship-preparation-caroline-springs",
    type: "website",
  },
};

export default function ScholarshipPreparationPage() {
  return <BookingLandingPage variant="scholarship" />;
}

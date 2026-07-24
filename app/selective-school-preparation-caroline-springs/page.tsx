import type { Metadata } from "next";

import { BookingLandingPage } from "@/components/booking/booking-landing-page";

export const metadata: Metadata = {
  title: "Selective School Preparation Caroline Springs | Year 7",
  description:
    "Year 7 selective school preparation in Caroline Springs for 2028 entry. Start with a free assessment at North Shore Coaching College.",
  alternates: {
    canonical: "/selective-school-preparation-caroline-springs",
  },
  openGraph: {
    title: "Year 7 Selective Preparation | Caroline Springs",
    description:
      "Structured selective preparation with qualified teachers and additional workshops as students get closer to the exam.",
    url: "/selective-school-preparation-caroline-springs",
    type: "website",
  },
};

export default function SelectivePreparationPage() {
  return <BookingLandingPage variant="selective" />;
}

import { publicSiteUrl } from "../../lib/site-url";

import {
  FAQS,
  PROGRAMS,
  PROOF_POINTS,
  SCHEDULE,
  getLandingContent,
  type Interest,
  type LandingVariant,
} from "./booking-content";
import { BookingHero } from "./booking-hero";
import { BookingForm } from "./booking-form";
import { CampusDetails } from "./campus-details";
import { CampusHeader } from "./campus-header";
import { ProgramPathways } from "./program-pathways";
import { ScrollMotionController } from "./scroll-motion-controller";

export function BookingLandingPage({
  variant = "general",
  canonicalPath,
}: {
  variant?: LandingVariant;
  canonicalPath?: string;
}) {
  const content = getLandingContent(variant);
  const pagePath =
    canonicalPath ??
    (variant === "selective"
      ? "/selective-school-preparation-caroline-springs"
      : variant === "scholarship"
        ? "/scholarship-preparation-caroline-springs"
        : "/");
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "North Shore Coaching College Caroline Springs",
    url: `${publicSiteUrl}${pagePath}`,
    telephone: "+61 403 474 343",
    email: "carolinesprings@north-shore.com.au",
    foundingDate: "1991",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Lakeview Senior College, College Street",
      addressLocality: "Caroline Springs",
      addressRegion: "VIC",
      postalCode: "3023",
      addressCountry: "AU",
    },
    areaServed: [
      "Caroline Springs",
      "Burnside",
      "Taylors Hill",
      "Hillside",
      "Deer Park",
      "Rockbank",
      "Plumpton",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Tutoring programs",
      itemListElement: PROGRAMS.map((program) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: program.title,
          description: program.description,
        },
      })),
    },
  };

  return (
    <main
      id="top"
      className="min-h-screen bg-background pb-[calc(80px+env(safe-area-inset-bottom))] text-foreground sm:pb-0"
    >
      <ScrollMotionController />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <a
        href="#main-content"
        className="sr-only z-50 bg-white px-4 py-3 font-semibold focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>

      <CampusHeader />

      <div id="main-content">
        <BookingHero hero={content.hero} variant={variant} />
        <ProofStrip points={PROOF_POINTS} />
        <ProgramPathways
          variant={variant}
          pathway={content.pathway}
          programs={PROGRAMS}
        />
        <AssessmentBooking
          variant={variant}
          defaultInterest={content.defaultInterest}
        />
        <CampusDetails
          variant={variant}
          faqs={FAQS}
          schedule={SCHEDULE}
        />
      </div>
    </main>
  );
}

function ProofStrip({ points }: { points: typeof PROOF_POINTS }) {
  return (
    <section aria-label="North Shore teaching facts" className="border-b border-border bg-white">
      <div className="mx-auto grid max-w-7xl px-4 sm:grid-cols-3 sm:px-6 lg:px-8">
        {points.map((point, index) => (
          <div
            className={`border-b border-border py-5 last:border-b-0 sm:border-b-0 sm:px-7 sm:py-6 ${
              index === 0 ? "sm:pl-0" : "sm:border-l"
            }`}
            key={point.label}
          >
            <p className="text-xs font-bold uppercase leading-5 text-primary">
              {point.label}
            </p>
            <p className="mt-1 text-base font-bold leading-6">{point.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function AssessmentBooking({
  variant,
  defaultInterest,
}: {
  variant: LandingVariant;
  defaultInterest: Interest;
}) {
  const heading =
    variant === "selective"
      ? "Find the right selective preparation starting point."
      : variant === "scholarship"
        ? "Find the right scholarship preparation starting point."
        : "Tell us about your child. We will confirm the next step.";

  return (
    <section
      id="booking"
      aria-labelledby="booking-heading"
      className="bg-foreground px-4 py-16 text-white sm:px-6 sm:py-20 lg:px-8 lg:py-24"
    >
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-start lg:gap-20">
        <div className="lg:sticky lg:top-8">
          <p className="text-xs font-bold uppercase leading-5 text-rose">
            Free initial assessment
          </p>
          <h2
            id="booking-heading"
            className="mt-3 max-w-xl font-display text-[40px] font-semibold leading-[1.02] tracking-normal text-balance sm:text-[52px]"
          >
            {heading}
          </h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-white/75">
            This request goes directly to the North Shore Caroline Springs
            campus. There is no enrolment commitment.
          </p>
          <ol
            aria-label="Assessment booking steps"
            className="mt-9 border-t border-white/30"
          >
            <BookingStep
              index={0}
              number="01"
              text="Share year level and contact details"
            />
            <BookingStep
              index={1}
              number="02"
              text="Choose a suitable contact time"
            />
            <BookingStep
              index={2}
              number="03"
              text="The local campus confirms the assessment"
            />
          </ol>
        </div>
        <BookingForm
          defaultInterest={defaultInterest}
          sourceLabel={variant}
        />
      </div>
    </section>
  );
}

function BookingStep({
  index,
  number,
  text,
}: {
  index: number;
  number: string;
  text: string;
}) {
  return (
    <li
      className="grid min-h-16 grid-cols-[44px_1fr] items-center gap-3 border-b border-white/20 py-4 text-sm font-bold leading-6 sm:text-base"
      data-motion-kind="booking-step"
      data-motion-index={index}
    >
      <span className="font-display text-2xl font-semibold text-rose">
        {number}
      </span>
      <span>{text}</span>
    </li>
  );
}

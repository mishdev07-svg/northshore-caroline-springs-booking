import Image from "next/image";

import {
  FAQS,
  PROGRAMS,
  PROOF_POINTS,
  SCHEDULE,
  getLandingContent,
  type LandingVariant,
} from "./booking-content";
import { BookingHero } from "./booking-hero";
import { BookingForm } from "./booking-form";
import { CampusHeader } from "./campus-header";

export function BookingLandingPage({
  variant = "general",
  canonicalPath,
}: {
  variant?: LandingVariant;
  canonicalPath?: string;
}) {
  const isSelective = variant === "selective";
  const isScholarship = variant === "scholarship";
  const content = getLandingContent(variant);

  const pagePath =
    canonicalPath ??
    (isSelective
      ? "/selective-school-preparation-caroline-springs"
      : isScholarship
        ? "/scholarship-preparation-caroline-springs"
        : "/");
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "North Shore Coaching College Caroline Springs",
    url: `https://northshore-caroline-springs-booking.northshore-6627.chatgpt-team.site${pagePath}`,
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
      className="min-h-screen bg-background pb-[calc(76px+env(safe-area-inset-bottom))] text-foreground sm:pb-0"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <a
        href="#main-content"
        className="sr-only z-50 bg-card px-4 py-3 font-semibold focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>

      <CampusHeader />

      <div id="main-content">
        <BookingHero hero={content.hero} variant={variant} />

        <section className="border-b border-border bg-card">
          <div className="mx-auto grid max-w-7xl px-4 sm:grid-cols-3 sm:px-6 lg:px-8">
            {PROOF_POINTS.map((point, index) => (
              <div
                className={`border-b border-border py-5 sm:border-b-0 sm:px-7 sm:py-6 ${
                  index === 0 ? "sm:pl-0" : "sm:border-l"
                }`}
                key={point.label}
              >
                <p className="text-xs font-bold uppercase leading-5 text-primary">
                  {point.label}
                </p>
                <p className="mt-1 text-base font-bold leading-6">
                  {point.value}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section id="programs" className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <div>
              <p className="text-xs font-bold uppercase leading-5 text-primary">
                Find the right fit
              </p>
              <h2 className="mt-3 max-w-xl font-display text-[38px] font-semibold leading-[1.05] tracking-normal text-balance sm:text-[48px]">
                Support that starts with understanding.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground">
                The assessment gives your family a practical starting point.
                The Caroline Springs team then recommends the program that
                best matches your child&apos;s year level and learning priorities.
              </p>
            </div>

            <div className="border-t border-foreground">
              {PROGRAMS.map((program) => (
                <article
                  className="grid grid-cols-[42px_1fr] gap-4 border-b border-border py-6 sm:grid-cols-[58px_1fr] sm:gap-5"
                  key={program.title}
                >
                  <span className="text-sm font-bold text-primary">
                    {program.number}
                  </span>
                  <div>
                    <h3 className="font-display text-2xl font-semibold leading-7 tracking-normal">
                      {program.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
                      {program.description}
                    </p>
                    {variant === "general" ? (
                      <a
                        href={program.href}
                        data-track-event="service_link_clicked"
                        data-track-label={program.title}
                        data-track-location="programs"
                        className="mt-3 inline-flex min-h-11 items-center text-sm font-bold text-primary underline decoration-primary/35 underline-offset-4 transition hover:decoration-primary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-4"
                      >
                        View this program
                      </a>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-border bg-secondary px-4 py-14 sm:px-6 sm:py-18 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-20">
            <div>
              <p className="text-xs font-bold uppercase leading-5 text-primary">
                {content.pathway.eyebrow}
              </p>
              <h2 className="mt-3 font-display text-[36px] font-semibold leading-[1.05] tracking-normal text-balance sm:text-[46px]">
                {content.pathway.title}
              </h2>
            </div>
            <div>
              <p className="max-w-2xl text-base leading-7 text-muted-foreground">
                {content.pathway.description}
              </p>
              <a
                href={content.pathway.href}
                data-track-event="cta_clicked"
                data-track-label={content.pathway.cta}
                data-track-location="pathway"
                className="mt-5 inline-flex min-h-11 items-center justify-center rounded-[4px] bg-primary px-5 text-sm font-bold text-primary-foreground transition hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                {content.pathway.cta}
              </a>
            </div>
          </div>
        </section>

        <section id="booking" className="bg-foreground px-4 py-16 text-white sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <div>
              <p className="text-xs font-bold uppercase leading-5 text-[#ff9aa2]">
                Free initial assessment
              </p>
              <h2 className="mt-3 max-w-xl font-display text-[38px] font-semibold leading-[1.05] tracking-normal text-balance sm:text-[48px]">
                {isSelective
                  ? "Find the right selective preparation starting point."
                  : isScholarship
                    ? "Find the right scholarship preparation starting point."
                    : "Tell us about your child. We will confirm the next step."}
              </h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-white/72">
                This request goes directly to the North Shore Caroline Springs
                campus. There is no enrolment commitment.
              </p>
              <div className="mt-8 border-t border-white/25">
                <BookingStep number="1" text="Share year level and contact details" />
                <BookingStep number="2" text="Choose a suitable contact time" />
                <BookingStep number="3" text="The local campus confirms the assessment" />
              </div>
            </div>
            <BookingForm
              defaultInterest={content.defaultInterest}
              sourceLabel={variant}
            />
          </div>
        </section>

        <section id="location" className="bg-secondary px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-end lg:gap-20">
            <div>
              <p className="text-xs font-bold uppercase leading-5 text-primary">
                North Shore Caroline Springs
              </p>
              <h2 className="mt-3 max-w-xl font-display text-[38px] font-semibold leading-[1.05] tracking-normal text-balance sm:text-[48px]">
                Lakeview Senior College, Caroline Springs.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground">
                Classes are held at College Street, Caroline Springs VIC 3023.
                Free on-site parking is available from The Parade side, near
                Caroline Springs Library.
              </p>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Lakeview+Senior+College+College+Street+Caroline+Springs+VIC+3023"
                target="_blank"
                rel="noreferrer"
                data-track-event="directions_clicked"
                data-track-location="location"
                className="mt-6 inline-flex min-h-11 items-center rounded-[4px] bg-primary px-5 text-sm font-bold text-primary-foreground transition hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-4 active:translate-y-px"
              >
                Get directions
              </a>
            </div>

            <dl className="border-t border-foreground">
              {SCHEDULE.map((item) => (
                <div
                  className="grid gap-1 border-b border-foreground/20 py-4 sm:grid-cols-[100px_1fr] sm:gap-5"
                  key={item.label}
                >
                  <dt className="text-sm font-bold">{item.label}</dt>
                  <dd className="m-0 text-sm leading-6 text-muted-foreground">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
            <div>
              <p className="text-xs font-bold uppercase leading-5 text-primary">
                Common questions
              </p>
              <h2 className="mt-3 font-display text-[38px] font-semibold leading-[1.05] tracking-normal sm:text-[48px]">
                Before you book.
              </h2>
            </div>
            <div className="border-t border-foreground">
              {FAQS.map((faq) => (
                <details className="group border-b border-border py-5" key={faq.question}>
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-bold leading-6 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-4">
                    {faq.question}
                    <span className="shrink-0 text-xl font-normal text-primary transition-transform group-open:rotate-45" aria-hidden="true">
                      +
                    </span>
                  </summary>
                  <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-primary px-4 py-14 text-primary-foreground sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase leading-5 text-white/78">
                North Shore Caroline Springs
              </p>
              <h2 className="mt-2 max-w-3xl font-display text-[36px] font-semibold leading-[1.05] tracking-normal text-balance sm:text-[44px]">
                {isSelective
                  ? "Start preparing before the exam feels close."
                  : isScholarship
                    ? "Begin with a clear, realistic preparation plan."
                    : "Give your child a clearer learning starting point."}
              </h2>
            </div>
            <a
              href="#booking"
              data-track-event="cta_clicked"
              data-track-label="Book my free assessment"
              data-track-location="final"
              className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-[4px] bg-white px-6 text-sm font-bold text-foreground transition hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary active:translate-y-px"
            >
              Book my free assessment
            </a>
          </div>
        </section>
      </div>

      <footer className="border-t border-border bg-card px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-7 md:grid-cols-[1fr_auto_auto] md:items-end md:gap-10">
          <div className="flex items-center gap-3">
            <Image
              src="/images/north-shore-logo.png"
              alt="North Shore Coaching College"
              width={376}
              height={211}
              unoptimized
              className="h-auto w-[142px]"
            />
            <p className="border-l border-border pl-3 text-xs font-bold uppercase leading-5 text-primary">
              Caroline Springs Campus
            </p>
          </div>
          <div className="text-sm leading-6">
            <p className="font-bold">Lakeview Senior College</p>
            <p className="text-muted-foreground">
              College Street, Caroline Springs VIC 3023
            </p>
          </div>
          <div className="text-sm leading-6 md:text-right">
            <a
              className="font-bold hover:text-primary"
              href="tel:0403474343"
              data-track-event="phone_clicked"
              data-track-location="footer"
            >
              0403 474 343
            </a>
            <a
              className="block text-muted-foreground hover:text-primary"
              href="mailto:carolinesprings@north-shore.com.au"
            >
              carolinesprings@north-shore.com.au
            </a>
          </div>
        </div>
        <div className="mx-auto mt-7 flex max-w-7xl flex-col gap-3 border-t border-border pt-5 text-xs leading-5 text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>Copyright 2026 North Shore Coaching College Caroline Springs.</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <a
              href="https://www.north-shore.com.au/privacy-policy/"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-foreground hover:text-primary"
            >
              Privacy policy
            </a>
            <a
              href="https://www.north-shore.com.au/"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-foreground hover:text-primary"
            >
              North Shore Australia
            </a>
          </div>
        </div>
      </footer>

      <nav
        aria-label="Quick contact actions"
        className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t border-border bg-card/96 px-3 pb-[calc(10px+env(safe-area-inset-bottom))] pt-2 shadow-[0_-10px_30px_rgba(12,18,25,0.12)] backdrop-blur sm:hidden"
      >
        <a
          href="tel:0403474343"
          data-track-event="phone_clicked"
          data-track-location="mobile_bar"
          className="inline-flex min-h-12 items-center justify-center rounded-[4px] border border-foreground bg-card px-3 text-sm font-bold text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          Call campus
        </a>
        <a
          href="#booking"
          data-track-event="cta_clicked"
          data-track-label="Free assessment"
          data-track-location="mobile_bar"
          className="inline-flex min-h-12 items-center justify-center rounded-[4px] bg-primary px-3 text-sm font-bold text-primary-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          Free assessment
        </a>
      </nav>
    </main>
  );
}

function BookingStep({ number, text }: { number: string; text: string }) {
  return (
    <p className="grid grid-cols-[28px_1fr] gap-3 border-b border-white/20 py-4 text-sm font-bold leading-6 sm:text-base">
      <span className="text-[#ff9aa2]">{number}.</span>
      <span>{text}</span>
    </p>
  );
}

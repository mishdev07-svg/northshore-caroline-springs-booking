import Image from "next/image";

import { BookingForm } from "./booking-form";

const programs = [
  {
    number: "01",
    title: "Prep-Year 10 tutoring",
    description:
      "Structured tutoring from Prep to Year 10 for stronger foundations, confidence, and study habits.",
  },
  {
    number: "02",
    title: "Selective School Preparation",
    description:
      "Steady, structured preparation with additional workshops provided throughout the week as students get closer to the exam.",
  },
  {
    number: "03",
    title: "Scholarship Preparation",
    description:
      "Structured guidance for families exploring scholarship pathways, without unrealistic outcome promises.",
  },
];

const proofPoints = [
  { label: "Established", value: "Founded in 1991" },
  {
    label: "National network",
    value: "Over 65 campuses",
  },
  {
    label: "Teaching",
    value: "Structured programs with qualified teachers",
  },
];

const schedule = [
  {
    label: "Saturday",
    value: "9:30am-1:00pm: Grade 3, 4, 9 and 10 classes only",
  },
  {
    label: "Sunday",
    value: "9:30am-1:00pm",
  },
];

const faqs = [
  {
    question: "What happens after I request an assessment?",
    answer:
      "The Caroline Springs campus contacts you to confirm a suitable assessment time and asks any final questions about your child's year level and learning priorities.",
  },
  {
    question: "Is it too late to join during Term 3?",
    answer:
      "No. Students can join during the term and pay pro-rata fees for the remaining lessons.",
  },
  {
    question: "Where are classes held?",
    answer:
      "Classes are held at Lakeview Senior College, College Street, Caroline Springs VIC 3023. Free on-site parking is available from The Parade side near Caroline Springs Library.",
  },
  {
    question: "Can my child try a class before enrolling?",
    answer:
      "Free trial classes are available by booking for new families who are close to enrolling. If you are unsure what support is needed, begin with the free assessment.",
  },
  {
    question: "Does tutoring guarantee a selective or scholarship outcome?",
    answer:
      "No. These pathways are competitive and depend on many factors. North Shore provides structured preparation, qualified teachers, and consistent practice.",
  },
];

type LandingVariant = "general" | "selective";

export function BookingLandingPage({
  variant = "general",
}: {
  variant?: LandingVariant;
}) {
  const isSelective = variant === "selective";
  const hero = isSelective
    ? {
        eyebrow: "Selective School Preparation · Caroline Springs",
        title: "Year 7 selective preparation for 2028 entry.",
        description:
          "Build exam-ready thinking steadily with a structured local program, qualified teachers, and additional workshops as students get closer to the exam.",
        detail:
          "Start with a free initial assessment. No outcome guarantees and no enrolment commitment.",
      }
    : {
        eyebrow: "North Shore Caroline Springs · Lakeview Senior College",
        title: "Tutoring in Caroline Springs that starts with a clear plan.",
        description:
          "Book a free initial assessment to understand where your child needs support and which structured program fits best.",
        detail:
          "Prep-Year 10 tutoring, Selective School Preparation and Scholarship Preparation.",
      };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "North Shore Coaching College Caroline Springs",
    url: "https://northshore-caroline-springs-booking.northshore-6627.chatgpt-team.site",
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
      itemListElement: programs.map((program) => ({
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
    <main id="top" className="min-h-screen bg-background text-foreground">
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

      <p className="bg-primary px-4 py-3 text-center text-sm font-bold leading-5 text-primary-foreground">
        Term 3 is underway. New students can still join and pay only for the
        remaining lessons.
      </p>

      <header className="border-b border-border bg-card">
        <div className="mx-auto flex min-h-24 max-w-7xl items-center justify-between gap-3 px-4 sm:min-h-28 sm:px-6 lg:px-8">
          <a
            href="#top"
            className="flex min-w-0 items-center gap-3 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-4"
            aria-label="North Shore Coaching College Caroline Springs home"
          >
            <Image
              src="/images/north-shore-logo.png"
              alt="North Shore Coaching College"
              width={376}
              height={211}
              priority
              unoptimized
              className="h-auto w-[138px] shrink-0 sm:w-[176px]"
            />
            <span className="border-l border-border pl-3 text-[11px] font-bold uppercase leading-4 text-primary sm:text-xs">
              Caroline Springs
              <span className="block text-foreground">Campus</span>
            </span>
          </a>

          <div className="flex shrink-0 items-center gap-5">
            <a
              href="tel:0403474343"
              className="hidden text-sm font-bold transition-colors hover:text-primary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-4 sm:inline"
            >
              0403 474 343
            </a>
            <a
              href="#booking"
              className="inline-flex min-h-11 items-center justify-center rounded-[4px] bg-primary px-3 text-sm font-bold text-primary-foreground transition hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-4 active:translate-y-px sm:px-5"
            >
              <span className="sm:hidden">Book</span>
              <span className="hidden sm:inline">Book free assessment</span>
            </a>
          </div>
        </div>
      </header>

      <div id="main-content">
        <section className="relative flex min-h-[520px] items-end overflow-hidden text-white md:min-h-[560px] lg:min-h-[640px]">
          <Image
            src="/images/booking-hero-v0.jpg"
            alt="Primary school students working in a classroom"
            fill
            priority
            unoptimized
            sizes="100vw"
            className="object-cover object-[57%_center] sm:object-center"
          />
          <div className="absolute inset-0 bg-foreground/65" />

          <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-10 pt-16 sm:px-6 sm:pb-14 lg:px-8 lg:pb-16">
            <p className="mb-4 text-xs font-bold uppercase leading-5 sm:text-sm">
              {hero.eyebrow}
            </p>
            <h1 className="max-w-3xl font-display text-[44px] font-semibold leading-none tracking-normal text-balance sm:text-[56px] lg:text-[68px]">
              {hero.title}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/90 sm:text-lg sm:leading-8">
              {hero.description}
            </p>
            <div className="mt-7 flex max-w-xl flex-col gap-3 sm:flex-row">
              <a
                href="#booking"
                className="inline-flex min-h-12 items-center justify-center rounded-[4px] bg-primary px-5 text-sm font-bold text-primary-foreground transition hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-foreground active:translate-y-px"
              >
                Book my free assessment
              </a>
              <a
                href="tel:0403474343"
                className="inline-flex min-h-12 items-center justify-center rounded-[4px] border border-white bg-white px-5 text-sm font-bold text-foreground transition hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-foreground active:translate-y-px"
              >
                Call the Caroline Springs campus
              </a>
            </div>
            <p className="mt-5 max-w-2xl text-sm leading-6 text-white/78">
              {hero.detail}
            </p>
          </div>
        </section>

        <section className="border-b border-border bg-card">
          <div className="mx-auto grid max-w-7xl px-4 sm:grid-cols-3 sm:px-6 lg:px-8">
            {proofPoints.map((point, index) => (
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
              {programs.map((program) => (
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
                {isSelective ? "A steady preparation pathway" : "Year 7 families"}
              </p>
              <h2 className="mt-3 font-display text-[36px] font-semibold leading-[1.05] tracking-normal text-balance sm:text-[46px]">
                {isSelective
                  ? "Build the skills before exam pressure arrives."
                  : "Planning for 2028 selective entry?"}
              </h2>
            </div>
            <div>
              <p className="max-w-2xl text-base leading-7 text-muted-foreground">
                Year 7 is a practical time to begin structured preparation for
                Year 9 selective entry. Students build reasoning, reading,
                writing and problem-solving habits, with additional workshops
                provided throughout the week as the exam approaches.
              </p>
              {!isSelective ? (
                <a
                  href="/selective-school-preparation-caroline-springs"
                  className="mt-5 inline-flex min-h-11 items-center justify-center rounded-[4px] border border-foreground bg-foreground px-5 text-sm font-bold text-white transition hover:bg-foreground/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                  Explore selective preparation
                </a>
              ) : (
                <a
                  href="#booking"
                  className="mt-5 inline-flex min-h-11 items-center justify-center rounded-[4px] bg-primary px-5 text-sm font-bold text-primary-foreground transition hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                  Start with the free assessment
                </a>
              )}
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
              defaultInterest={
                isSelective
                  ? "Selective School Preparation"
                  : "Not sure yet"
              }
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
                className="mt-6 inline-flex min-h-11 items-center rounded-[4px] bg-primary px-5 text-sm font-bold text-primary-foreground transition hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-4 active:translate-y-px"
              >
                Get directions
              </a>
            </div>

            <dl className="border-t border-foreground">
              {schedule.map((item) => (
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
              {faqs.map((faq) => (
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
                  : "It is not too late to make Term 3 count."}
              </h2>
            </div>
            <a
              href="#booking"
              className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-[4px] bg-white px-6 text-sm font-bold text-foreground transition hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary active:translate-y-px"
            >
              Book my free assessment
            </a>
          </div>
        </section>
      </div>

      <footer className="border-t border-border bg-card px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
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
          <div className="text-sm leading-6 sm:text-right">
            <a className="font-bold hover:text-primary" href="tel:0403474343">
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
      </footer>
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

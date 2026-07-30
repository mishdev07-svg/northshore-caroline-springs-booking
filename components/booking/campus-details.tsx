import { ArrowRight, ChevronDown, MapPin, Phone } from "lucide-react";
import Image from "next/image";

import {
  FAQS,
  SCHEDULE,
  type LandingVariant,
} from "./booking-content";

type CampusDetailsProps = {
  variant: LandingVariant;
  faqs: typeof FAQS;
  schedule: typeof SCHEDULE;
};

export function CampusDetails({
  variant,
  faqs,
  schedule,
}: CampusDetailsProps) {
  const finalHeading =
    variant === "selective"
      ? "Start preparing before the exam feels close."
      : variant === "scholarship"
        ? "Begin with a clear, realistic preparation plan."
        : "Give your child a clearer learning starting point.";

  return (
    <>
      <section
        id="location"
        aria-labelledby="location-heading"
        className="bg-secondary px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
      >
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-24">
          <div>
            <p className="text-xs font-bold uppercase leading-5 text-primary">
              North Shore Caroline Springs
            </p>
            <h2
              id="location-heading"
              className="mt-3 max-w-2xl font-display text-[40px] font-semibold leading-[1.02] tracking-normal text-balance sm:text-[52px]"
            >
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
              className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-[4px] bg-primary px-5 text-sm font-bold text-primary-foreground transition-[background-color,transform] duration-200 hover:bg-primary-deep focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-4 active:translate-y-px"
            >
              <MapPin aria-hidden="true" size={18} />
              Get directions
            </a>
          </div>

          <div className="lg:pt-2">
            <p className="text-xs font-bold uppercase leading-5 text-primary">
              Weekend class times
            </p>
            <dl className="mt-4 border-t-2 border-foreground">
              {schedule.map((item) => (
                <div
                  className="grid gap-2 border-b border-foreground/25 py-5 sm:grid-cols-[112px_1fr] sm:gap-6"
                  key={item.label}
                >
                  <dt className="text-base font-bold leading-7">
                    {item.label}
                  </dt>
                  <dd className="m-0 text-base leading-7 text-muted-foreground">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              Assessment times are confirmed directly with the Caroline
              Springs campus.
            </p>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="faq-heading"
        className="bg-background px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
      >
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
          <div>
            <p className="text-xs font-bold uppercase leading-5 text-primary">
              Common questions
            </p>
            <h2
              id="faq-heading"
              className="mt-3 font-display text-[40px] font-semibold leading-[1.02] tracking-normal sm:text-[52px]"
            >
              Before you book.
            </h2>
          </div>
          <div className="border-t-2 border-foreground">
            {faqs.map((faq) => (
              <details
                className="campus-faq border-b border-border"
                key={faq.question}
              >
                <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-5 font-bold leading-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4">
                  <span>{faq.question}</span>
                  <ChevronDown
                    aria-hidden="true"
                    className="campus-faq__indicator shrink-0 text-primary"
                    size={20}
                    strokeWidth={2.25}
                  />
                </summary>
                <p className="campus-faq__answer max-w-2xl pb-6 pr-10 text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section
        aria-labelledby="final-cta-heading"
        className="bg-primary px-4 py-14 text-primary-foreground sm:px-6 sm:py-16 lg:px-8"
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-7 sm:flex-row sm:items-center sm:justify-between sm:gap-10">
          <div>
            <p className="text-sm font-bold uppercase leading-5 text-white">
              North Shore Caroline Springs
            </p>
            <h2
              id="final-cta-heading"
              className="mt-2 max-w-3xl font-display text-[38px] font-semibold leading-[1.03] tracking-normal text-balance sm:text-[46px]"
            >
              {finalHeading}
            </h2>
          </div>
          <a
            href="#booking"
            data-track-event="cta_clicked"
            data-track-label="Book my free assessment"
            data-track-location="final"
            className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-[4px] bg-white px-6 text-sm font-bold text-foreground transition-[background-color,transform] duration-200 hover:bg-signal focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary active:translate-y-px"
          >
            Book my free assessment
            <ArrowRight aria-hidden="true" size={18} />
          </a>
        </div>
      </section>

      <footer className="border-t border-border bg-white px-4 py-9 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1fr_auto_auto] md:items-end md:gap-12">
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
              className="inline-flex items-center gap-2 font-bold transition-colors duration-200 hover:text-primary"
              href="tel:0403474343"
              data-track-event="phone_clicked"
              data-track-location="footer"
            >
              <Phone aria-hidden="true" size={16} />
              0403 474 343
            </a>
            <a
              className="block text-muted-foreground transition-colors duration-200 hover:text-primary"
              href="mailto:carolinesprings@north-shore.com.au"
            >
              carolinesprings@north-shore.com.au
            </a>
          </div>
        </div>
        <div className="mx-auto mt-8 flex max-w-7xl flex-col gap-3 border-t border-border pt-5 text-xs leading-5 text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>Copyright 2026 North Shore Coaching College Caroline Springs.</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <a
              href="https://www.north-shore.com.au/privacy-policy/"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-foreground transition-colors duration-200 hover:text-primary"
            >
              Privacy policy
            </a>
            <a
              href="https://www.north-shore.com.au/"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-foreground transition-colors duration-200 hover:text-primary"
            >
              North Shore Australia
            </a>
          </div>
        </div>
      </footer>

      <nav
        aria-label="Quick contact actions"
        className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t border-border bg-white/96 px-3 pb-[calc(10px+env(safe-area-inset-bottom))] pt-2 shadow-[0_-10px_30px_rgba(12,18,25,0.12)] backdrop-blur sm:hidden"
      >
        <a
          href="tel:0403474343"
          data-track-event="phone_clicked"
          data-track-location="mobile_bar"
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[4px] border border-foreground bg-white px-3 text-sm font-bold text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          <Phone aria-hidden="true" size={17} />
          Call campus
        </a>
        <a
          href="#booking"
          data-track-event="cta_clicked"
          data-track-label="Free assessment"
          data-track-location="mobile_bar"
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[4px] bg-primary px-3 text-sm font-bold text-primary-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          Free assessment
          <ArrowRight aria-hidden="true" size={17} />
        </a>
      </nav>
    </>
  );
}

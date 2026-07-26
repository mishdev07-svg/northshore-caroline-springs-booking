import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Assessment Request Received | North Shore Caroline Springs",
  description:
    "Your free assessment request has been received by North Shore Caroline Springs.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ThankYouPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-card px-4 py-5 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
          <Link
            href="/"
            className="focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-4"
            aria-label="North Shore Caroline Springs home"
          >
            <Image
              src="/images/north-shore-logo.png"
              alt="North Shore Coaching College"
              width={376}
              height={211}
              priority
              unoptimized
              className="h-auto w-[154px] sm:w-[176px]"
            />
          </Link>
          <p className="text-right text-xs font-bold uppercase leading-5 text-primary">
            Caroline Springs Campus
          </p>
        </div>
      </header>

      <section className="px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-16">
          <div>
            <p className="text-xs font-bold uppercase leading-5 text-primary">
              Request received
            </p>
            <h1 className="mt-3 max-w-3xl font-display text-[44px] font-semibold leading-none tracking-normal text-balance sm:text-[58px]">
              Thank you. The local team will confirm the next step.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
              North Shore Caroline Springs has received your free assessment
              request. The campus will contact you to confirm a suitable time
              and ask any final questions about your child&apos;s learning
              priorities.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="tel:0403474343"
                data-track-event="phone_clicked"
                data-track-location="thank_you"
                className="inline-flex min-h-12 items-center justify-center rounded-[4px] bg-primary px-6 text-sm font-bold text-primary-foreground transition hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-4"
              >
                Call 0403 474 343
              </a>
              <Link
                href="/"
                className="inline-flex min-h-12 items-center justify-center rounded-[4px] border border-foreground bg-card px-6 text-sm font-bold transition hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-4"
              >
                Return to the website
              </Link>
            </div>
          </div>

          <aside className="border-t border-foreground bg-secondary px-5 py-6 sm:px-7 sm:py-8">
            <p className="text-xs font-bold uppercase leading-5 text-primary">
              What happens now
            </p>
            <ol className="mt-4 border-t border-foreground/20">
              <ConfirmationStep
                number="1"
                text="The Caroline Springs campus reviews your request."
              />
              <ConfirmationStep
                number="2"
                text="We contact you to confirm an assessment time."
              />
              <ConfirmationStep
                number="3"
                text="Your family receives a clear recommendation with no enrolment commitment."
              />
            </ol>
            <p className="mt-6 text-sm font-bold leading-6">
              Lakeview Senior College
            </p>
            <p className="text-sm leading-6 text-muted-foreground">
              College Street, Caroline Springs VIC 3023
            </p>
          </aside>
        </div>
      </section>
    </main>
  );
}

function ConfirmationStep({
  number,
  text,
}: {
  number: string;
  text: string;
}) {
  return (
    <li className="grid grid-cols-[28px_1fr] gap-3 border-b border-foreground/15 py-4 text-sm font-semibold leading-6">
      <span className="text-primary">{number}.</span>
      <span>{text}</span>
    </li>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Check, Phone } from "lucide-react";

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

      <section className="bg-secondary px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-20">
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
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[4px] bg-primary px-6 text-sm font-bold text-primary-foreground transition-[background-color,transform] duration-200 hover:bg-primary-deep focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-4 active:translate-y-px"
              >
                <Phone aria-hidden="true" size={18} strokeWidth={2} />
                Call 0403 474 343
              </a>
              <Link
                href="/"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[4px] border border-foreground bg-card px-6 text-sm font-bold transition-[background-color,transform] duration-200 hover:bg-white focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-4 active:translate-y-px"
              >
                <ArrowLeft aria-hidden="true" size={18} strokeWidth={2} />
                Return to the website
              </Link>
            </div>
          </div>

          <aside className="bg-foreground px-5 py-7 text-primary-foreground sm:px-7 sm:py-9">
            <p className="text-xs font-bold uppercase leading-5 text-rose">
              What happens now
            </p>
            <ol
              className="learning-path learning-path--confirmation"
              aria-label="Confirmation process"
            >
              <li>Assess</li>
              <li>Plan</li>
              <li>Progress</li>
            </ol>
            <ol className="mt-8 border-t border-white/30">
              <ConfirmationStep text="The Caroline Springs campus reviews your request." />
              <ConfirmationStep text="We contact you to confirm an assessment time." />
              <ConfirmationStep text="Your family receives a clear recommendation with no enrolment commitment." />
            </ol>
            <div className="mt-7 border-t border-white/30 pt-5">
              <p className="text-sm font-bold leading-6">
                Lakeview Senior College
              </p>
              <p className="text-sm leading-6 text-white/70">
                College Street, Caroline Springs VIC 3023
              </p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

function ConfirmationStep({
  text,
}: {
  text: string;
}) {
  return (
    <li className="grid grid-cols-[24px_1fr] gap-3 border-b border-white/20 py-4 text-sm font-semibold leading-6">
      <Check
        aria-hidden="true"
        className="mt-0.5 text-signal"
        size={18}
        strokeWidth={2.5}
      />
      <span>{text}</span>
    </li>
  );
}

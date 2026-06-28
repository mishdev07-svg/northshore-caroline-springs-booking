import Image from "next/image";

import { BookingForm } from "./booking-form";

const programs = [
  {
    title: "Prep-Year 7 tutoring",
    description:
      "Structured English and maths support for stronger foundations, confidence, and study habits through Term 3.",
  },
  {
    title: "Year 7 Selective Preparation",
    description:
      "Sunday selective preparation with a complimentary Monday 6-7pm online workshop included for enrolled students.",
  },
  {
    title: "Scholarship Preparation",
    description:
      "Aspirational preparation for families exploring scholarship pathways, with qualified teachers and clear next steps.",
  },
];

const schedule = [
  "Saturday: Year 4 and Years 9-10",
  "Sunday 9:30am-2:00pm: Prep-Year 7, Scholarship Preparation, Selective Entry Preparation",
  "Monday 6:00-7:00pm: Selective Entry online workshop",
];

export function BookingLandingPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="absolute left-0 right-0 top-0 z-20">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
          <a
            href="#top"
            className="text-sm font-semibold text-primary-foreground focus:outline-none focus:ring-2 focus:ring-primary-foreground focus:ring-offset-2 focus:ring-offset-primary"
          >
            North Shore Caroline Springs
          </a>
          <nav
            className="hidden items-center gap-6 text-sm font-medium text-primary-foreground/85 md:flex"
            aria-label="Main navigation"
          >
            <a className="transition hover:text-primary-foreground" href="#programs">
              Programs
            </a>
            <a className="transition hover:text-primary-foreground" href="#booking">
              Booking
            </a>
            <a className="transition hover:text-primary-foreground" href="#location">
              Location
            </a>
          </nav>
          <a
            href="tel:0403474343"
            className="rounded-md border border-primary-foreground/35 px-3 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary-foreground/10 focus:outline-none focus:ring-2 focus:ring-primary-foreground focus:ring-offset-2 focus:ring-offset-primary"
          >
            Call 0403 474 343
          </a>
        </div>
      </header>

      <section
        id="top"
        className="relative flex min-h-[82vh] items-end overflow-hidden px-4 pb-14 pt-28 sm:px-6 lg:px-8"
      >
        <Image
          src="https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=1800&q=85"
          alt="Teacher helping primary school students during a small group learning session"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-foreground/60" />
        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-7 text-primary-foreground">
          <p className="max-w-2xl text-base font-semibold">
            Term 3 enrolments are open at Lakeview Senior College
          </p>
          <div className="grid gap-6 lg:grid-cols-[1fr_360px] lg:items-end">
            <div className="max-w-3xl">
              <h1 className="text-balance text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
                North Shore Caroline Springs
              </h1>
              <p className="mt-5 max-w-2xl text-pretty text-lg leading-8 text-primary-foreground/88">
                Book a free assessment or ask about a free trial class for Term
                3 tutoring, selective preparation, and scholarship preparation.
              </p>
            </div>
            <div className="grid gap-3 sm:max-w-sm lg:justify-self-end">
              <a
                href="#booking"
                className="min-h-12 rounded-md bg-primary px-5 py-3 text-center text-base font-semibold text-primary-foreground transition hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary-foreground focus:ring-offset-2 focus:ring-offset-primary active:scale-[0.99]"
              >
                Book A Free Assessment
              </a>
              <a
                href="#booking"
                className="min-h-12 rounded-md border border-primary-foreground/45 px-5 py-3 text-center text-base font-semibold text-primary-foreground transition hover:bg-primary-foreground/10 focus:outline-none focus:ring-2 focus:ring-primary-foreground focus:ring-offset-2 focus:ring-offset-primary active:scale-[0.99]"
              >
                Ask About A Free Trial Class
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-card">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 py-6 sm:grid-cols-3 sm:px-6 lg:px-8">
          <Metric label="Founded" value="1991" />
          <Metric label="National network" value="66 campuses" />
          <Metric label="Early bird" value="$50 off until 25 July" />
        </div>
      </section>

      <section id="programs" className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-semibold text-primary">
              Tuition that Works.
            </p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">
              Start with the right next step for your child.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">
              Not sure what your child needs this term? Start with a free
              initial assessment. Already interested in joining? Ask about a
              free trial class and experience the North Shore learning
              environment before enrolling.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {programs.map((program) => (
              <article
                className="rounded-lg border border-border bg-card p-5 shadow-sm"
                key={program.title}
              >
                <h3 className="text-lg font-semibold leading-7">
                  {program.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {program.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="booking" className="bg-secondary px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold text-primary">
              Free assessment or trial class
            </p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">
              Book A Free Assessment Or Trial Class
            </h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              For Term 3 enrolments at North Shore Coaching College Caroline
              Springs. Complete the form and the local team will confirm the
              best assessment or trial class time.
            </p>
            <div className="mt-8 grid gap-4 border-l-2 border-primary pl-5">
              <Step title="1. Tell us the year level" />
              <Step title="2. Choose assessment, trial, or call first" />
              <Step title="3. We confirm the booking time" />
            </div>
          </div>
          <BookingForm />
        </div>
      </section>

      <section id="location" className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold text-primary">
              Caroline Springs campus
            </p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">
              Easy local access for western Melbourne families.
            </h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              Classes are held at Lakeview Senior College, College Street,
              Caroline Springs VIC 3023. Free on-site parking is nearby on The
              Parade, next to the library side.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-5 shadow-sm">
            <h3 className="text-lg font-semibold">Current class schedule</h3>
            <ul className="mt-4 grid gap-3">
              {schedule.map((item) => (
                <li
                  className="rounded-md bg-muted px-4 py-3 text-sm leading-6 text-muted-foreground"
                  key={item}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <footer className="border-t border-border bg-foreground px-4 py-8 text-primary-foreground sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-semibold">North Shore Coaching College</p>
            <p className="mt-1 text-sm text-primary-foreground/72">
              Caroline Springs campus
            </p>
          </div>
          <div className="flex flex-col gap-2 text-sm sm:items-end">
            <a className="font-semibold" href="tel:0403474343">
              0403 474 343
            </a>
            <a
              className="text-primary-foreground/82"
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

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-l border-border pl-4">
      <p className="text-sm leading-6 text-muted-foreground">{label}</p>
      <p className="text-xl font-semibold leading-8">{value}</p>
    </div>
  );
}

function Step({ title }: { title: string }) {
  return <p className="text-base font-semibold leading-7">{title}</p>;
}

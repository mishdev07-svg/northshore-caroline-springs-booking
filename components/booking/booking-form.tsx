"use client";

import { useState } from "react";

const yearLevels = [
  "Prep",
  "Year 1",
  "Year 2",
  "Year 3",
  "Year 4",
  "Year 5",
  "Year 6",
  "Year 7",
  "Year 8",
  "Year 9",
  "Year 10",
];

const interests = [
  "Prep-Year 7 tutoring",
  "Year 7 Selective Preparation",
  "Scholarship Preparation",
  "Not sure yet",
];

const nextSteps = [
  "Free initial assessment",
  "Free trial class",
  "Please call me first",
];

export function BookingForm() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <form
      className="grid gap-4 rounded-lg border border-border bg-card p-5 text-card-foreground shadow-sm sm:p-6"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Parent name" htmlFor="parent-name">
          <input
            id="parent-name"
            name="parentName"
            required
            className="h-11 rounded-md border border-input bg-background px-3 text-base outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/20"
          />
        </Field>
        <Field label="Mobile number" htmlFor="mobile">
          <input
            id="mobile"
            name="mobile"
            type="tel"
            required
            className="h-11 rounded-md border border-input bg-background px-3 text-base outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/20"
          />
        </Field>
      </div>

      <Field label="Email" htmlFor="email">
        <input
          id="email"
          name="email"
          type="email"
          required
          className="h-11 rounded-md border border-input bg-background px-3 text-base outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/20"
        />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Child name" htmlFor="child-name">
          <input
            id="child-name"
            name="childName"
            required
            className="h-11 rounded-md border border-input bg-background px-3 text-base outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/20"
          />
        </Field>
        <Field label="Child year level" htmlFor="year-level">
          <select
            id="year-level"
            name="yearLevel"
            required
            className="h-11 rounded-md border border-input bg-background px-3 text-base outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/20"
          >
            <option value="">Select year level</option>
            {yearLevels.map((yearLevel) => (
              <option key={yearLevel}>{yearLevel}</option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Suburb" htmlFor="suburb">
        <input
          id="suburb"
          name="suburb"
          required
          className="h-11 rounded-md border border-input bg-background px-3 text-base outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/20"
        />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Main interest" htmlFor="interest">
          <select
            id="interest"
            name="interest"
            required
            className="h-11 rounded-md border border-input bg-background px-3 text-base outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/20"
          >
            <option value="">Select interest</option>
            {interests.map((interest) => (
              <option key={interest}>{interest}</option>
            ))}
          </select>
        </Field>
        <Field label="Preferred next step" htmlFor="next-step">
          <select
            id="next-step"
            name="nextStep"
            required
            className="h-11 rounded-md border border-input bg-background px-3 text-base outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/20"
          >
            <option value="">Select next step</option>
            {nextSteps.map((nextStep) => (
              <option key={nextStep}>{nextStep}</option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Preferred days/times" htmlFor="preferred-time">
        <textarea
          id="preferred-time"
          name="preferredTime"
          required
          rows={3}
          className="min-h-24 rounded-md border border-input bg-background px-3 py-2 text-base leading-7 outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/20"
        />
      </Field>

      <label className="flex gap-3 rounded-md bg-secondary p-3 text-sm leading-6 text-secondary-foreground">
        <input
          name="consent"
          type="checkbox"
          required
          className="mt-1 h-4 w-4 accent-primary"
        />
        <span>
          I consent to be contacted by phone, SMS, or email about assessment,
          trial class, and enrolment options.
        </span>
      </label>

      <button
        type="submit"
        className="min-h-12 rounded-md bg-primary px-5 py-3 text-base font-semibold text-primary-foreground transition hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 active:scale-[0.99]"
      >
        Book A Free Assessment
      </button>

      <p className="text-sm leading-6 text-muted-foreground" aria-live="polite">
        {submitted
          ? "Thank you. North Shore Coaching College Caroline Springs will contact you shortly to confirm your assessment or trial class time. If your enquiry is urgent, call 0403 474 343."
          : "Free trial classes are available by booking. Urgent enquiries can call 0403 474 343."}
      </p>
    </form>
  );
}

function Field({
  children,
  htmlFor,
  label,
}: {
  children: React.ReactNode;
  htmlFor: string;
  label: string;
}) {
  return (
    <label className="grid gap-2 text-sm font-medium" htmlFor={htmlFor}>
      <span>{label}</span>
      {children}
    </label>
  );
}

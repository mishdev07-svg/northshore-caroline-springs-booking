"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

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
  "Prep-Year 10 tutoring",
  "Selective School Preparation",
  "Scholarship Preparation",
  "Not sure yet",
];

const inputClassName =
  "min-h-12 w-full rounded-[4px] border border-input bg-background px-3 text-base outline-none transition placeholder:text-muted-foreground/70 focus:border-ring focus:ring-2 focus:ring-ring/20";

type FormStatus = "idle" | "submitting" | "success" | "error";

type BookingFormProps = {
  defaultInterest?: (typeof interests)[number];
  sourceLabel?: string;
};

export function BookingForm({
  defaultInterest = "Not sure yet",
  sourceLabel = "general",
}: BookingFormProps) {
  const router = useRouter();
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [startedAt] = useState(() => Date.now());

  if (status === "success") {
    return (
      <div className="rounded-[6px] bg-card p-6 text-card-foreground shadow-[0_18px_50px_rgba(12,18,25,0.18)] sm:p-8">
        <p className="text-xs font-bold uppercase leading-5 text-primary">
          Request received
        </p>
        <h3 className="mt-3 font-display text-3xl font-semibold leading-tight sm:text-4xl">
          Thank you. The local team will be in touch.
        </h3>
        <p className="mt-4 text-base leading-7 text-muted-foreground">
          North Shore Caroline Springs will contact you to confirm the most
          suitable assessment time and ask any final questions about your
          child&apos;s learning priorities.
        </p>
        <a
          href="tel:0403474343"
          data-track-event="phone_clicked"
          data-track-location="form_success"
          className="mt-7 inline-flex min-h-12 w-full items-center justify-center rounded-[4px] bg-primary px-5 text-base font-bold text-primary-foreground transition hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          Call 0403 474 343
        </a>
      </div>
    );
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const tracking = getTracking();

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          parentName: getFormValue(formData, "parentName"),
          mobile: getFormValue(formData, "mobile"),
          email: getFormValue(formData, "email"),
          yearLevel: getFormValue(formData, "yearLevel"),
          interest: getFormValue(formData, "interest"),
          preferredTime: getFormValue(formData, "preferredTime"),
          consent: formData.get("consent") === "on",
          website: getFormValue(formData, "website"),
          startedAt,
          landingPage: window.location.pathname,
          utmSource: tracking.utmSource,
          utmMedium: tracking.utmMedium,
          utmCampaign: tracking.utmCampaign || sourceLabel,
          utmContent: tracking.utmContent,
          utmTerm: tracking.utmTerm,
        }),
      });

      const result = (await response.json()) as {
        error?: string;
        reference?: number;
      };
      if (!response.ok) {
        throw new Error(result.error || "The request could not be saved.");
      }

      const interest = getFormValue(formData, "interest");
      const leadEvent = {
        lead_type: getFormValue(formData, "interest"),
        page_type: sourceLabel,
        transaction_id: result.reference ? String(result.reference) : "",
      };

      if (typeof window.gtag === "function") {
        window.gtag("event", "generate_lead", leadEvent);
      } else {
        window.dataLayer?.push({
          event: "generate_lead",
          ...leadEvent,
        });
      }
      window.fbq?.("track", "Lead", {
        content_name: interest,
      });

      setStatus("success");

      let hasRedirected = false;
      const showConfirmation = () => {
        if (hasRedirected) return;
        hasRedirected = true;
        router.push("/thank-you");
      };

      const googleAdsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
      const googleAdsLeadLabel =
        process.env.NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL;

      if (
        typeof window.gtag === "function" &&
        googleAdsId &&
        googleAdsLeadLabel
      ) {
        window.gtag("event", "conversion", {
          send_to: `${googleAdsId}/${googleAdsLeadLabel}`,
          transaction_id: result.reference ? String(result.reference) : "",
          event_callback: showConfirmation,
          event_timeout: 1200,
        });
        window.setTimeout(showConfirmation, 1300);
      } else {
        showConfirmation();
      }
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "The request could not be saved. Please call the campus.",
      );
      setStatus("error");
    }
  }

  return (
    <form
      className="grid gap-4 rounded-[6px] bg-card p-5 text-card-foreground shadow-[0_18px_50px_rgba(12,18,25,0.18)] sm:p-7"
      onSubmit={handleSubmit}
    >
      <div>
        <p className="text-xs font-bold uppercase leading-5 text-primary">
          Caroline Springs campus
        </p>
        <h3 className="mt-2 font-display text-3xl font-semibold leading-tight tracking-normal">
          Book the free assessment
        </h3>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Four essentials, then the local team will contact you to confirm the
          appointment. No enrolment commitment.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Parent or guardian name" htmlFor="parent-name">
          <input
            id="parent-name"
            name="parentName"
            autoComplete="name"
            required
            maxLength={80}
            className={inputClassName}
          />
        </Field>
        <Field label="Mobile number" htmlFor="mobile">
          <input
            id="mobile"
            name="mobile"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            required
            maxLength={30}
            placeholder="04xx xxx xxx"
            className={inputClassName}
          />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Child's year level" htmlFor="year-level">
          <select
            id="year-level"
            name="yearLevel"
            required
            defaultValue=""
            className={inputClassName}
          >
            <option value="" disabled>
              Select year level
            </option>
            {yearLevels.map((yearLevel) => (
              <option key={yearLevel}>{yearLevel}</option>
            ))}
          </select>
        </Field>
        <Field label="Main interest" htmlFor="interest">
          <select
            id="interest"
            name="interest"
            required
            defaultValue={defaultInterest}
            className={inputClassName}
          >
            {interests.map((interest) => (
              <option key={interest}>{interest}</option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Email (optional)" htmlFor="email">
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          maxLength={120}
          className={inputClassName}
        />
      </Field>

      <Field
        label="Best contact day or time (optional)"
        htmlFor="preferred-time"
      >
        <input
          id="preferred-time"
          name="preferredTime"
          maxLength={120}
          placeholder="For example: weekdays after 5pm"
          className={inputClassName}
        />
      </Field>

      <div
        className="absolute left-[-10000px] top-auto h-px w-px overflow-hidden"
        aria-hidden="true"
      >
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <label className="flex gap-3 rounded-[4px] bg-secondary p-3 text-sm leading-6 text-secondary-foreground">
        <input
          name="consent"
          type="checkbox"
          required
          className="mt-1 h-4 w-4 shrink-0 accent-primary"
        />
        <span>
          I agree to North Shore Caroline Springs contacting me by phone, SMS,
          or email about this assessment and enrolment options.
        </span>
      </label>

      {status === "error" ? (
        <p
          className="rounded-[4px] border border-primary/30 bg-secondary p-3 text-sm font-semibold leading-6 text-foreground"
          role="alert"
        >
          {errorMessage} Call{" "}
          <a
            className="text-primary underline"
            href="tel:0403474343"
            data-track-event="phone_clicked"
            data-track-location="form_error"
          >
            0403 474 343
          </a>
          .
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="min-h-12 rounded-[4px] bg-primary px-5 py-3 text-base font-bold text-primary-foreground transition hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 active:translate-y-px disabled:cursor-wait disabled:opacity-70"
      >
        {status === "submitting"
          ? "Sending request..."
          : "Request my free assessment"}
      </button>

      <p className="text-center text-sm leading-6 text-muted-foreground">
        Prefer to speak now?{" "}
        <a
          className="font-bold text-foreground hover:text-primary"
          href="tel:0403474343"
          data-track-event="phone_clicked"
          data-track-location="form"
        >
          Call 0403 474 343
        </a>
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
    <label className="grid gap-2 text-sm font-semibold" htmlFor={htmlFor}>
      <span>{label}</span>
      {children}
    </label>
  );
}

function getFormValue(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function getTracking() {
  const params = new URLSearchParams(window.location.search);
  const stored = readStoredCampaign();

  return {
    utmSource: params.get("utm_source") || stored.utm_source || "",
    utmMedium: params.get("utm_medium") || stored.utm_medium || "",
    utmCampaign: params.get("utm_campaign") || stored.utm_campaign || "",
    utmContent: params.get("utm_content") || stored.utm_content || "",
    utmTerm: params.get("utm_term") || stored.utm_term || "",
  };
}

function readStoredCampaign(): Partial<Record<string, string>> {
  try {
    const stored = window.sessionStorage.getItem("northshore_campaign");
    return stored
      ? (JSON.parse(stored) as Partial<Record<string, string>>)
      : {};
  } catch {
    return {};
  }
}

declare global {
  interface Window {
    __northshoreTrackingBound?: boolean;
    dataLayer?: Array<Record<string, unknown>>;
    fbq?: (command: string, event: string, params?: Record<string, unknown>) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

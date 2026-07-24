import { and, desc, eq, gt } from "drizzle-orm";

import { ensureLeadsSchema, getDb } from "@/db";
import { leads } from "@/db/schema";

const VALID_YEAR_LEVELS = new Set([
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
]);

const VALID_INTERESTS = new Set([
  "Prep-Year 10 tutoring",
  "Selective School Preparation",
  "Scholarship Preparation",
  "Not sure yet",
]);

type LeadPayload = {
  parentName?: unknown;
  mobile?: unknown;
  email?: unknown;
  yearLevel?: unknown;
  interest?: unknown;
  preferredTime?: unknown;
  consent?: unknown;
  website?: unknown;
  startedAt?: unknown;
  landingPage?: unknown;
  utmSource?: unknown;
  utmMedium?: unknown;
  utmCampaign?: unknown;
  utmContent?: unknown;
  utmTerm?: unknown;
};

export async function POST(request: Request) {
  try {
    if (!isSameOrigin(request)) {
      return Response.json({ error: "Invalid request origin." }, { status: 403 });
    }

    const payload = (await request.json()) as LeadPayload;

    if (asText(payload.website, 200)) {
      return Response.json({ received: true }, { status: 201 });
    }

    const startedAt = Number(payload.startedAt);
    if (
      !Number.isFinite(startedAt) ||
      startedAt > Date.now() ||
      Date.now() - startedAt < 1200
    ) {
      return Response.json({ error: "Please try the form again." }, { status: 400 });
    }

    const parentName = asText(payload.parentName, 80);
    const mobile = normalizeMobile(asText(payload.mobile, 30));
    const email = asText(payload.email, 120).toLowerCase();
    const yearLevel = asText(payload.yearLevel, 20);
    const interest = asText(payload.interest, 60);
    const preferredTime = asText(payload.preferredTime, 120);

    if (!parentName || parentName.length < 2) {
      return Response.json({ error: "Enter the parent or guardian name." }, { status: 400 });
    }

    if (!isValidMobile(mobile)) {
      return Response.json({ error: "Enter a valid mobile number." }, { status: 400 });
    }

    if (email && !isValidEmail(email)) {
      return Response.json({ error: "Enter a valid email address." }, { status: 400 });
    }

    if (!VALID_YEAR_LEVELS.has(yearLevel)) {
      return Response.json({ error: "Choose the child's year level." }, { status: 400 });
    }

    if (!VALID_INTERESTS.has(interest)) {
      return Response.json({ error: "Choose the main area of interest." }, { status: 400 });
    }

    if (payload.consent !== true) {
      return Response.json({ error: "Consent is required so the campus can contact you." }, { status: 400 });
    }

    await ensureLeadsSchema();
    const db = getDb();
    const duplicateWindow = new Date(Date.now() - 5 * 60 * 1000);
    const [existing] = await db
      .select({ id: leads.id })
      .from(leads)
      .where(
        and(
          eq(leads.mobile, mobile),
          gt(leads.createdAt, duplicateWindow),
        ),
      )
      .orderBy(desc(leads.createdAt))
      .limit(1);

    if (existing) {
      return Response.json({ received: true, reference: existing.id });
    }

    const [lead] = await db
      .insert(leads)
      .values({
        parentName,
        mobile,
        email: email || null,
        yearLevel,
        interest,
        preferredTime: preferredTime || null,
        landingPage: asText(payload.landingPage, 200) || null,
        utmSource: asText(payload.utmSource, 120) || null,
        utmMedium: asText(payload.utmMedium, 120) || null,
        utmCampaign: asText(payload.utmCampaign, 120) || null,
        utmContent: asText(payload.utmContent, 120) || null,
        utmTerm: asText(payload.utmTerm, 120) || null,
      })
      .returning({ id: leads.id });

    return Response.json(
      { received: true, reference: lead.id },
      { status: 201 },
    );
  } catch (error) {
    console.error("Lead submission failed", error);
    return Response.json(
      {
        error:
          "We could not save the request. Please call the Caroline Springs campus.",
      },
      { status: 500 },
    );
  }
}

function asText(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function normalizeMobile(value: string) {
  const hasPlus = value.startsWith("+");
  const digits = value.replace(/\D/g, "");
  return hasPlus ? `+${digits}` : digits;
}

function isValidMobile(value: string) {
  return /^\+?\d{8,15}$/.test(value);
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return true;

  try {
    return new URL(origin).host === new URL(request.url).host;
  } catch {
    return false;
  }
}

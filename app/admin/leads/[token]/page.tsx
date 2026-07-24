import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { desc } from "drizzle-orm";

import { ensureLeadsSchema, getDb } from "@/db";
import { leads } from "@/db/schema";
import { isValidAdminToken } from "@/lib/admin-token";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Assessment Leads | North Shore Caroline Springs",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function LeadsPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  if (!isValidAdminToken(token)) notFound();

  await ensureLeadsSchema();
  const db = getDb();
  const rows = await db
    .select()
    .from(leads)
    .orderBy(desc(leads.createdAt), desc(leads.id))
    .limit(250);

  const newLeadCount = rows.filter((lead) => lead.status === "new").length;

  return (
    <main className="min-h-screen bg-background px-4 py-8 text-foreground sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-col gap-5 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase leading-5 text-primary">
              North Shore Caroline Springs
            </p>
            <h1 className="mt-2 font-display text-4xl font-semibold leading-tight sm:text-5xl">
              Assessment leads
            </h1>
            <p className="mt-3 text-base leading-7 text-muted-foreground">
              {newLeadCount} new request{newLeadCount === 1 ? "" : "s"} ·{" "}
              {rows.length} shown
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={`/api/admin/leads/export/${encodeURIComponent(token)}`}
              className="inline-flex min-h-11 items-center justify-center rounded-[4px] bg-primary px-4 text-sm font-bold text-primary-foreground transition hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              Export CSV
            </a>
            <a
              href="/"
              className="inline-flex min-h-11 items-center justify-center rounded-[4px] border border-border bg-card px-4 text-sm font-bold transition hover:border-foreground/40 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              View website
            </a>
          </div>
        </header>

        {rows.length === 0 ? (
          <section className="py-20 text-center">
            <h2 className="font-display text-3xl font-semibold">
              No assessment requests yet
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-base leading-7 text-muted-foreground">
              New website requests will appear here as soon as a parent submits
              the assessment form.
            </p>
          </section>
        ) : (
          <section className="py-7" aria-label="Website assessment requests">
            <div className="overflow-x-auto border-y border-border bg-card">
              <table className="w-full min-w-[1080px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-border bg-secondary text-xs font-bold uppercase leading-5">
                    <th className="px-4 py-3">Received</th>
                    <th className="px-4 py-3">Parent</th>
                    <th className="px-4 py-3">Contact</th>
                    <th className="px-4 py-3">Student</th>
                    <th className="px-4 py-3">Interest</th>
                    <th className="px-4 py-3">Best time</th>
                    <th className="px-4 py-3">Source</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((lead) => (
                    <tr
                      key={lead.id}
                      className="border-b border-border align-top last:border-b-0"
                    >
                      <td className="px-4 py-4 text-sm leading-6">
                        <span className="block font-bold">#{lead.id}</span>
                        <span className="text-muted-foreground">
                          {formatMelbourneTime(lead.createdAt)}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-sm font-bold leading-6">
                        {lead.parentName}
                      </td>
                      <td className="px-4 py-4 text-sm leading-6">
                        <a
                          className="block font-bold text-primary hover:underline"
                          href={`tel:${lead.mobile}`}
                        >
                          {formatMobile(lead.mobile)}
                        </a>
                        {lead.email ? (
                          <a
                            className="block text-muted-foreground hover:text-primary hover:underline"
                            href={`mailto:${lead.email}`}
                          >
                            {lead.email}
                          </a>
                        ) : null}
                      </td>
                      <td className="px-4 py-4 text-sm leading-6">
                        {lead.yearLevel}
                      </td>
                      <td className="px-4 py-4 text-sm leading-6">
                        {lead.interest}
                      </td>
                      <td className="px-4 py-4 text-sm leading-6 text-muted-foreground">
                        {lead.preferredTime || "Any suitable time"}
                      </td>
                      <td className="px-4 py-4 text-sm leading-6">
                        <span className="block font-bold">
                          {lead.utmSource || "Direct / unknown"}
                        </span>
                        <span className="block max-w-[230px] truncate text-muted-foreground">
                          {lead.utmCampaign || lead.landingPage || "No campaign"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

function formatMelbourneTime(date: Date) {
  return new Intl.DateTimeFormat("en-AU", {
    timeZone: "Australia/Melbourne",
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

function formatMobile(value: string) {
  if (/^04\d{8}$/.test(value)) {
    return `${value.slice(0, 4)} ${value.slice(4, 7)} ${value.slice(7)}`;
  }
  return value;
}

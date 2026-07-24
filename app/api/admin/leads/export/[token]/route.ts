import { desc } from "drizzle-orm";

import { ensureLeadsSchema, getDb } from "@/db";
import { leads } from "@/db/schema";
import { isValidAdminToken } from "@/lib/admin-token";

export async function GET(
  _request: Request,
  context: { params: Promise<{ token: string }> },
) {
  const { token } = await context.params;
  if (!isValidAdminToken(token)) {
    return Response.json({ error: "Not authorised." }, { status: 403 });
  }

  await ensureLeadsSchema();
  const db = getDb();
  const rows = await db
    .select()
    .from(leads)
    .orderBy(desc(leads.createdAt), desc(leads.id));

  const header = [
    "Reference",
    "Received",
    "Status",
    "Parent name",
    "Mobile",
    "Email",
    "Year level",
    "Interest",
    "Preferred contact time",
    "Landing page",
    "UTM source",
    "UTM medium",
    "UTM campaign",
    "UTM content",
    "UTM term",
  ];

  const csv = [
    header,
    ...rows.map((lead) => [
      lead.id,
      lead.createdAt.toISOString(),
      lead.status,
      lead.parentName,
      lead.mobile,
      lead.email ?? "",
      lead.yearLevel,
      lead.interest,
      lead.preferredTime ?? "",
      lead.landingPage ?? "",
      lead.utmSource ?? "",
      lead.utmMedium ?? "",
      lead.utmCampaign ?? "",
      lead.utmContent ?? "",
      lead.utmTerm ?? "",
    ]),
  ]
    .map((row) => row.map(toCsvCell).join(","))
    .join("\r\n");

  return new Response(csv, {
    headers: {
      "Content-Disposition": `attachment; filename="north-shore-caroline-springs-leads-${new Date()
        .toISOString()
        .slice(0, 10)}.csv"`,
      "Content-Type": "text/csv; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

function toCsvCell(value: unknown) {
  const text = String(value ?? "");
  return `"${text.replaceAll('"', '""')}"`;
}

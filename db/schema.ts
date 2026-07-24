import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const leads = sqliteTable(
  "leads",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    createdAt: integer("created_at", { mode: "timestamp_ms" })
      .notNull()
      .$defaultFn(() => new Date()),
    status: text("status").notNull().default("new"),
    parentName: text("parent_name").notNull(),
    mobile: text("mobile").notNull(),
    email: text("email"),
    yearLevel: text("year_level").notNull(),
    interest: text("interest").notNull(),
    preferredTime: text("preferred_time"),
    landingPage: text("landing_page"),
    utmSource: text("utm_source"),
    utmMedium: text("utm_medium"),
    utmCampaign: text("utm_campaign"),
    utmContent: text("utm_content"),
    utmTerm: text("utm_term"),
  },
  (table) => [
    index("leads_mobile_created_idx").on(table.mobile, table.createdAt),
    index("leads_status_created_idx").on(table.status, table.createdAt),
  ],
);

import { env } from "cloudflare:workers";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "./schema";

export function getDb() {
  if (!env.DB) {
    throw new Error(
      "Cloudflare D1 binding `DB` is unavailable. Set the `d1` field in .openai/hosting.json to `DB` or let your control plane inject the real binding values before using the database."
    );
  }

  return drizzle(env.DB, { schema });
}

export async function ensureLeadsSchema() {
  if (!env.DB) {
    throw new Error("Cloudflare D1 binding `DB` is unavailable.");
  }

  await env.DB.batch([
    env.DB.prepare(`
      CREATE TABLE IF NOT EXISTS leads (
        id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        created_at INTEGER NOT NULL,
        status TEXT DEFAULT 'new' NOT NULL,
        parent_name TEXT NOT NULL,
        mobile TEXT NOT NULL,
        email TEXT,
        year_level TEXT NOT NULL,
        interest TEXT NOT NULL,
        preferred_time TEXT,
        landing_page TEXT,
        utm_source TEXT,
        utm_medium TEXT,
        utm_campaign TEXT,
        utm_content TEXT,
        utm_term TEXT
      )
    `),
    env.DB.prepare(
      "CREATE INDEX IF NOT EXISTS leads_mobile_created_idx ON leads (mobile, created_at)",
    ),
    env.DB.prepare(
      "CREATE INDEX IF NOT EXISTS leads_status_created_idx ON leads (status, created_at)",
    ),
  ]);
}

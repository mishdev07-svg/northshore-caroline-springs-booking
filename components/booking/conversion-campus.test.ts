import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

const bookingDirectory = dirname(fileURLToPath(import.meta.url));

function readSource(path: string): string {
  try {
    return readFileSync(resolve(bookingDirectory, path), "utf8").replace(
      /\r\n/g,
      "\n",
    );
  } catch {
    return "";
  }
}

function hashSection(source: string, startMarker: string, endMarker: string) {
  const start = source.indexOf(startMarker);
  const end = source.indexOf(endMarker, start);

  expect(start).toBeGreaterThanOrEqual(0);
  expect(end).toBeGreaterThan(start);

  return createHash("sha256")
    .update(source.slice(start, end))
    .digest("hex");
}

describe("conversion and campus contracts", () => {
  it("keeps form submission and campaign storage behavior frozen", () => {
    const source = readSource("booking-form.tsx");

    expect(
      hashSection(
        source,
        "  async function handleSubmit",
        "\n  return (",
      ),
    ).toBe(
      "94df7d3151fec11ac4c71398f40610137d1c6418633f671ae23d96a0a99d35af",
    );
    expect(
      hashSection(source, "function getFormValue", "\ndeclare global"),
    ).toBe(
      "80f6bff243eb0fcc3d9424da4b319ef02d1c68626e7f99a5e4ba90ee3441f593",
    );
  });

  it("uses the shared interest contract and approved form treatment", () => {
    const source = readSource("booking-form.tsx");

    expect(source).toContain(
      'import { INTERESTS, type Interest } from "./booking-content";',
    );
    expect(source).toMatch(
      /import\s+\{[^}]*ArrowRight[^}]*Check[^}]*Phone[^}]*\}\s+from\s+"lucide-react";/s,
    );
    expect(source).toContain("defaultInterest?: Interest;");
    expect(source).not.toContain("const interests =");
    expect(source).toContain("{INTERESTS.map((interest) => (");
    expect(source).toContain(
      '"min-h-12 w-full rounded-[4px] border border-input bg-white px-3 text-base text-foreground outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20"',
    );
    expect(source).toContain("Request my free assessment");
    expect(source).toContain("Sending request...");
    expect(source).toContain('name="consent"');
    expect(source).toContain('name="website"');
    expect(source).toContain('data-track-location="form_error"');
    expect(source).toContain(
      'className="border border-primary/30 bg-secondary px-4 py-3 text-sm font-semibold leading-6 text-foreground"',
    );
    expect(source).not.toContain("border-l-4");
  });

  it("extracts the campus, FAQ, footer, and mobile action surfaces", () => {
    const source = readSource("campus-details.tsx");

    expect(source).toMatch(
      /import\s+\{[^}]*ArrowRight[^}]*ChevronDown[^}]*MapPin[^}]*Phone[^}]*\}\s+from\s+"lucide-react";/s,
    );
    expect(source).toContain("export function CampusDetails");
    expect(source).toContain('id="location"');
    expect(source).toContain("{schedule.map((item) => (");
    expect(source).toContain("{faqs.map((faq) => (");
    expect(source).toContain("<details");
    expect(source).toContain("<summary");
    expect(source).toContain('data-track-event="directions_clicked"');
    expect(source).toContain('data-track-location="location"');
    expect(source).toContain('data-track-label="Book my free assessment"');
    expect(source).toContain('data-track-location="final"');
    expect(source).toContain('data-track-location="footer"');
    expect(source).toContain('aria-label="Quick contact actions"');
    expect(source).toContain('data-track-location="mobile_bar"');
  });

  it("uses restrained 200ms FAQ transitions without disclosure height animation", () => {
    const css = readSource("../../app/globals.css");
    const indicatorRule = css.match(
      /\.campus-faq__indicator\s*\{([\s\S]*?)\}/,
    )?.[1];
    const answerRule = css.match(
      /\.campus-faq__answer\s*\{([\s\S]*?)\}/,
    )?.[1];

    expect(indicatorRule ?? "").toContain("transition: transform 200ms");
    expect(answerRule ?? "").toContain("transition:");
    expect(answerRule ?? "").toContain("200ms");
    expect(indicatorRule ?? "").not.toMatch(/(?:max-)?height/);
    expect(answerRule ?? "").not.toMatch(/(?:max-)?height/);
  });

  it("keeps the landing page as the approved section orchestrator", () => {
    const source = readSource("booking-landing-page.tsx");

    expect(source).toMatch(
      /<CampusHeader\s*\/>[\s\S]*<BookingHero hero=\{content\.hero\} variant=\{variant\}\s*\/>[\s\S]*<ProofStrip points=\{PROOF_POINTS\}\s*\/>[\s\S]*<ProgramPathways[\s\S]*variant=\{variant\}[\s\S]*pathway=\{content\.pathway\}[\s\S]*programs=\{PROGRAMS\}[\s\S]*\/>[\s\S]*<AssessmentBooking[\s\S]*variant=\{variant\}[\s\S]*defaultInterest=\{content\.defaultInterest\}[\s\S]*\/>[\s\S]*<CampusDetails[\s\S]*variant=\{variant\}[\s\S]*faqs=\{FAQS\}[\s\S]*schedule=\{SCHEDULE\}[\s\S]*\/>/,
    );
    expect(source.match(/data-motion-kind="booking-step"/g)).toHaveLength(1);
    expect(source).toContain("data-motion-index={index}");
    expect(source).toContain("Share year level and contact details");
    expect(source).toContain("Choose a suitable contact time");
    expect(source).toContain(
      "The local campus confirms the assessment",
    );
    expect(source).not.toContain('data-track-event="directions_clicked"');
    expect(source).not.toContain('aria-label="Quick contact actions"');
  });
});

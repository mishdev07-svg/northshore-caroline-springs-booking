import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

const thankYouDirectory = dirname(fileURLToPath(import.meta.url));

function readSource(): string {
  return readFileSync(resolve(thankYouDirectory, "page.tsx"), "utf8");
}

describe("thank-you confirmation page", () => {
  it("keeps the confirmation content while using the shared Academic Momentum path", () => {
    const source = readSource();

    expect(source).toMatch(
      /import\s+\{[^}]*ArrowLeft[^}]*Check[^}]*Phone[^}]*\}\s+from\s+"lucide-react";/s,
    );
    expect(source).toContain('index: false');
    expect(source).toContain('follow: false');
    expect(source).toContain("Thank you. The local team will confirm the next step.");
    expect(source).toContain("0403 474 343");
    expect(source).toContain("Lakeview Senior College");
    expect(source).toContain("Return to the website");
    expect(source).toContain('className="learning-path learning-path--confirmation"');
    expect(source).toContain('<li>Assess</li>');
    expect(source).toContain('<li>Plan</li>');
    expect(source).toContain('<li>Progress</li>');
    expect(source).toContain("<Phone");
    expect(source).toContain("<ArrowLeft");
    expect(source).toContain("<Check");
    expect(source).toContain('data-track-event="phone_clicked"');
    expect(source).toContain('data-track-location="thank_you"');
  });
});

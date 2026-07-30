import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

const bookingDirectory = dirname(fileURLToPath(import.meta.url));

function readSource(path: string): string {
  try {
    return readFileSync(resolve(bookingDirectory, path), "utf8");
  } catch {
    return "";
  }
}

function contrastAgainstHeroRed(whiteAlpha: number): number {
  const red = [0xdf, 0x1f, 0x2d];
  const text = red.map((channel) => 255 * whiteAlpha + channel * (1 - whiteAlpha));
  const luminance = (color: number[]) =>
    color
      .map((channel) => channel / 255)
      .map((channel) =>
        channel <= 0.04045
          ? channel / 12.92
          : ((channel + 0.055) / 1.055) ** 2.4,
      )
      .reduce(
        (total, channel, index) =>
          total + channel * [0.2126, 0.7152, 0.0722][index],
        0,
      );

  return (luminance(text) + 0.05) / (luminance(red) + 0.05);
}

describe("academic momentum header and hero contracts", () => {
  it("preserves the campus header identity, navigation, and analytics", () => {
    const source = readSource("campus-header.tsx");

    expect(source).toContain('src="/images/north-shore-logo.png"');
    expect(source).toContain("North Shore Coaching College");
    expect(source).toContain("Caroline Springs");
    expect(source).toContain("Campus");
    expect(source).toContain("Lakeview Senior College");
    expect(source).not.toMatch(
      /className="campus-brand"\s+aria-label=/,
    );
    expect(source).toContain("Start with a free initial assessment.");
    expect(source).toMatch(/import\s+\{[^}]*ArrowRight[^}]*Phone[^}]*\}/s);
    expect(source).toContain('<a href="#programs">Programs</a>');
    expect(source).toContain('<a href="#booking">How it works</a>');
    expect(source).toContain('<a href="#location">Location</a>');
    expect(source).toContain('data-track-event="phone_clicked"');
    expect(source).toContain('data-track-location="header"');
    expect(source).toContain('data-track-label="Book free assessment"');
  });

  it("uses the supplied hero image and the approved content structure", () => {
    const source = readSource("booking-hero.tsx");

    expect(source).toContain(
      'src="/images/booking-hero-academic-momentum.png"',
    );
    expect(source).toContain(
      'alt="Student working through practice material"',
    );
    expect(source).not.toContain(
      'className="hero-media-mask" aria-hidden="true"',
    );
    expect(source).toMatch(/\sfill\s/);
    expect(source).toMatch(/\spriority\s/);
    expect(source).toContain('sizes="100vw"');
    expect(source).not.toContain("unoptimized");
    expect(source).toContain("{hero.eyebrow}");
    expect(source).toContain("{hero.description}");
    expect(source).toContain("{hero.detail}");
    expect(source.match(/className="hero-line"/g)).toHaveLength(2);
    expect(source).toContain('className="hero-support"');
    expect(source).toContain(
      '<ol className="learning-path" aria-label="Assessment process">',
    );
    expect(source).toContain("<li>Assess</li>");
    expect(source).toContain("<li>Plan</li>");
    expect(source).toContain("<li>Progress</li>");
    expect(source).toContain('data-track-label="Book my free assessment"');
    expect(source).toContain('data-track-location="hero"');
  });

  it("replaces only the landing header and hero boundary", () => {
    const source = readSource("booking-landing-page.tsx");

    expect(source).toContain("<CampusHeader />");
    expect(source).toContain(
      "<BookingHero hero={content.hero} variant={variant} />",
    );
    expect(source).not.toContain("booking-hero-v0.jpg");
    expect(source).toContain("<ProofStrip points={PROOF_POINTS} />");
    expect(source).toContain("<AssessmentBooking");
    expect(source).toContain("<CampusDetails");
    expect(source).not.toContain('id="location"');
    expect(source).not.toContain('aria-label="Quick contact actions"');
  });

  it("keeps the focal sequence bounded and reduced-motion complete", () => {
    const source = readSource("../../app/globals.css");

    expect(source).toMatch(
      /\.academic-hero \{[\s\S]*?min-height: 560px;/,
    );
    expect(source).toContain(".hero-display {\n  font-size: 48px;");
    expect(source).toContain("animation: hero-line-enter 620ms var(--ease-out) both;");
    expect(source).toContain("animation-delay: 70ms;");
    expect(source).toContain(
      "animation: hero-mask-resolve 760ms var(--ease-out) 40ms both;",
    );
    expect(source).toContain(
      "animation: hero-support-enter 480ms var(--ease-out) 220ms both;",
    );
    expect(source).toContain(
      "animation: learning-path-draw 540ms var(--ease-out) 320ms forwards;",
    );
    expect(source).toContain("@keyframes hero-line-enter");
    expect(source).toContain("@keyframes hero-mask-resolve");
    expect(source).toContain("@keyframes hero-support-enter");
    expect(source).toContain("@keyframes learning-path-draw");
    expect(source).toMatch(
      /@media \(prefers-reduced-motion: reduce\)[\s\S]*\.hero-line > span,[\s\S]*\.learning-path::before[\s\S]*animation: none;/,
    );
    expect(source).toMatch(
      /@media \(prefers-reduced-motion: reduce\)[\s\S]*\.learning-path::before\s*\{[\s\S]*transform: scaleX\(1\);/,
    );
  });

  it("keeps normal-sized hero text at WCAG AA contrast", () => {
    const source = readSource("../../app/globals.css");

    expect(source).toMatch(
      /\.hero-description \{[\s\S]*?color: var\(--primary-foreground\);[\s\S]*?\}/,
    );
    expect(source).toMatch(
      /\.hero-detail \{[\s\S]*?color: rgb\(255 255 255 \/ 0\.96\);[\s\S]*?\}/,
    );
    expect(contrastAgainstHeroRed(1)).toBeGreaterThanOrEqual(4.5);
    expect(contrastAgainstHeroRed(0.96)).toBeGreaterThanOrEqual(4.5);
  });
});

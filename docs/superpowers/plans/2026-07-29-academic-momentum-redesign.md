# Academic Momentum Booking Funnel Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the North Shore Caroline Springs booking funnel as the approved red-led Academic Momentum experience while preserving every verified fact, campaign route, lead workflow, and conversion-tracking hook.

**Architecture:** Keep the existing shared route architecture and server-rendered landing page. Extract verified marketing content into a typed data module, split the oversized presentation component into focused sections, and add one small `IntersectionObserver` client controller for below-fold choreography. Hero entrance motion stays CSS-first; no animation library, WebGL, canvas, video, or JavaScript scroll loop is introduced.

**Tech Stack:** Next.js 16, React 19, TypeScript 5.9, Vinext/Vite, Tailwind CSS 4, Fontsource, Lucide React, Vitest, Cloudflare Workers, Sites.

## Global Constraints

- Correct phone number: `0403 474 343`.
- Correct campus: Lakeview Senior College, College Street, Caroline Springs VIC 3023.
- Saturday schedule: `9:30am-1:00pm: Grade 3, 4, 9 and 10 classes only`.
- Sunday schedule: `9:30am-1:00pm`.
- Keep Prep-Year 10 tutoring, Selective School Preparation, Scholarship Preparation, and Not sure yet as form interests.
- Keep additional selective workshops throughout the week closer to the exam.
- Preserve `/api/leads`, the anti-spam field, consent, campaign attribution,
  Meta `Lead`, GA `generate_lead`, the Google Ads callback and transaction ID,
  and the `/thank-you` redirect.
- Preserve sitemap, robots, metadata, schema, privacy links, and all campaign-specific routes.
- Use Instrument Serif only for major persuasive display roles; use DM Sans Variable for body and interface roles.
- Brand red is `#DF1F2D`; ink is `#131416`; warm white is `#FFFDFB`; ice blue is `#EAF3FF`; soft rose is `#F8DDE0`; signal yellow is `#FFD24A`.
- Use fixed breakpoint type sizes, never viewport-width font interpolation.
- No 3D, WebGL, canvas, autoplay video, sound, particles, shaders, or infinite decorative animation.
- No animation dependency and no per-frame JavaScript scroll listener.
- Every motion path must have a static reduced-motion fallback with all content visible.
- Do not fabricate testimonials, results, awards, urgency, scarcity, or outcome promises.
- Generated imagery must not imply that it depicts the Caroline Springs campus or enrolled students.
- Cards remain at 8px radius or less and are used only for the form or genuinely framed items.

---

## File Structure

### Create

- `components/booking/booking-content.ts`
  Owns verified programs, proof, schedules, FAQs, route-specific hero copy, route-specific pathway copy, and `LandingVariant`.

- `components/booking/booking-content.test.ts`
  Protects the exact phone, schedules, interests, routes, and no-guarantee messaging.

- `components/booking/campus-header.tsx`
  Owns the offer strip, logo, desktop anchors, phone action, and compact mobile CTA.

- `components/booking/booking-hero.tsx`
  Owns the full-bleed red hero, responsive image treatment, route copy, hero actions, and Assess/Plan/Progress path.

- `components/booking/program-pathways.tsx`
  Owns program rows and the route-specific preparation pathway section.

- `components/booking/campus-details.tsx`
  Owns location, schedule, FAQs, footer, final CTA, and mobile fixed actions.

- `components/booking/motion-config.ts`
  Owns capped delay calculations and supported motion kinds.

- `components/booking/motion-config.test.ts`
  Verifies delay caps and reduced-motion-safe timing data.

- `components/booking/scroll-motion-controller.tsx`
  Adds one-time visibility state through `IntersectionObserver`; it never listens to the scroll event.

- `public/images/booking-hero-academic-momentum.png`
  Face-free, unbranded study image generated for the hero.

### Modify

- `app/layout.tsx`
  Imports the Fontsource assets and retains metadata/tracking structure.

- `app/globals.css`
  Defines the approved semantic tokens, type roles, focal hero animation, below-fold transitions, responsive rules, focus states, and reduced-motion behaviour.

- `components/booking/booking-landing-page.tsx`
  Becomes the typed orchestration layer for the extracted sections.

- `components/booking/booking-form.tsx`
  Receives visual and interaction polish only; submission and conversion logic remain unchanged.

- `app/thank-you/page.tsx`
  Adopts the approved type, colour, icon, and learning-path system.

- `package.json`
- `package-lock.json`
  Add Fontsource, Lucide React, Vitest, and a `test` script.

- `.gitignore`
  Ignores `.superpowers/` companion artifacts and local audit logs.

### Remove

- `public/fonts/manrope-latin-variable.woff2`
- `public/fonts/newsreader-latin-variable.woff2`
  Remove only after the new self-hosted Fontsource imports pass the production build.

---

### Task 1: Establish The Type, Colour, And Test Foundation

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`
- Modify: `app/layout.tsx`
- Modify: `app/globals.css`
- Modify: `.gitignore`
- Remove: `public/fonts/manrope-latin-variable.woff2`
- Remove: `public/fonts/newsreader-latin-variable.woff2`

**Interfaces:**
- Consumes: Existing root layout and Tailwind token mapping.
- Produces: `--color-*`, `--font-display`, `--font-body`, approved focus styles, and the `npm test` command used by later tasks.

- [ ] **Step 1: Record the clean baseline**

Run:

```powershell
npm run lint
npm run build
```

Expected: both commands exit `0` before dependencies or styles change.

- [ ] **Step 2: Install exact runtime and test dependencies**

Run:

```powershell
npm install @fontsource/instrument-serif @fontsource-variable/dm-sans lucide-react
npm install --save-dev vitest
```

Expected: `package.json` and `package-lock.json` include all four packages. Fontsource's current package names are `@fontsource/instrument-serif` and `@fontsource-variable/dm-sans`.

- [ ] **Step 3: Add the test command**

Change the scripts block in `package.json` to include:

```json
{
  "scripts": {
    "dev": "vinext dev",
    "build": "vinext build",
    "deploy": "vinext deploy",
    "start": "vinext start",
    "lint": "eslint . --ignore-pattern dist --ignore-pattern .next",
    "test": "vitest run --passWithNoTests",
    "db:generate": "drizzle-kit generate"
  }
}
```

- [ ] **Step 4: Import only the required font assets**

At the top of `app/layout.tsx`, before local component imports, add:

```tsx
import "@fontsource-variable/dm-sans/wght.css";
import "@fontsource/instrument-serif/400.css";
import "@fontsource/instrument-serif/400-italic.css";
```

Do not change `generateMetadata`, `TrackingScripts`, or the HTML language.

- [ ] **Step 5: Replace the old font faces and semantic tokens**

Remove the two local `@font-face` blocks from `app/globals.css`. Establish:

```css
:root {
  --background: #fffdfb;
  --foreground: #131416;
  --card: #ffffff;
  --card-foreground: #131416;
  --primary: #df1f2d;
  --primary-foreground: #ffffff;
  --primary-deep: #9f1020;
  --secondary: #eaf3ff;
  --secondary-foreground: #131416;
  --muted: #eef0f2;
  --muted-foreground: #55585f;
  --rose: #f8dde0;
  --signal: #ffd24a;
  --border: #cfd3d8;
  --input: #aeb5be;
  --ring: #df1f2d;
  --font-display: "Instrument Serif", Georgia, serif;
  --font-body: "DM Sans Variable", Arial, sans-serif;
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
}
```

Map the additional primitives in `@theme inline`:

```css
--color-primary-deep: var(--primary-deep);
--color-rose: var(--rose);
--color-signal: var(--signal);
```

Set the body to `font-family: var(--font-body)` and retain the existing selection and reduced-motion rules.

- [ ] **Step 6: Protect local companion and audit artifacts**

Append these exact lines to `.gitignore`:

```gitignore
.superpowers/
impeccable-dev.log
impeccable-dev.err.log
```

- [ ] **Step 7: Verify the new font bundle before deleting old files**

Run:

```powershell
npm test
npm run lint
npm run build
```

Expected: test command exits `0` with no test files yet, lint exits `0`, and production build exits `0` with Fontsource CSS bundled.

- [ ] **Step 8: Remove the two obsolete local WOFF2 files**

Delete only:

```text
public/fonts/manrope-latin-variable.woff2
public/fonts/newsreader-latin-variable.woff2
```

Run `npm run build` again. Expected: exit `0` with no missing font requests.

- [ ] **Step 9: Commit the design foundation**

```powershell
git add package.json package-lock.json app/layout.tsx app/globals.css .gitignore public/fonts
git commit -m "Build Academic Momentum design foundation"
```

---

### Task 2: Extract And Lock Verified Marketing Content

**Files:**
- Create: `components/booking/booking-content.ts`
- Create: `components/booking/booking-content.test.ts`
- Modify: `components/booking/booking-landing-page.tsx`

**Interfaces:**
- Produces:
  - `type LandingVariant = "general" | "selective" | "scholarship"`
  - `INTERESTS`
  - `PROGRAMS`
  - `PROOF_POINTS`
  - `SCHEDULE`
  - `FAQS`
  - `getLandingContent(variant: LandingVariant): LandingContent`
- Later tasks consume these exports without redefining marketing facts.

- [ ] **Step 1: Write the failing content contract tests**

Create `components/booking/booking-content.test.ts`:

```ts
import { describe, expect, it } from "vitest";

import {
  FAQS,
  INTERESTS,
  PROGRAMS,
  PROOF_POINTS,
  SCHEDULE,
  getLandingContent,
} from "./booking-content";

describe("booking content contracts", () => {
  it("preserves the approved program set", () => {
    expect(PROGRAMS.map((program) => program.title)).toEqual([
      "Prep-Year 10 tutoring",
      "Selective School Preparation",
      "Scholarship Preparation",
    ]);
  });

  it("preserves the four approved form interests", () => {
    expect(INTERESTS).toEqual([
      "Prep-Year 10 tutoring",
      "Selective School Preparation",
      "Scholarship Preparation",
      "Not sure yet",
    ]);
  });

  it("preserves the selective workshop promise", () => {
    const selective = PROGRAMS.find(
      (program) => program.title === "Selective School Preparation",
    );

    expect(selective?.description).toContain(
      "additional workshops provided throughout the week as students get closer to the exam",
    );
  });

  it("preserves the exact weekend schedule", () => {
    expect(SCHEDULE).toEqual([
      {
        label: "Saturday",
        value: "9:30am-1:00pm: Grade 3, 4, 9 and 10 classes only",
      },
      { label: "Sunday", value: "9:30am-1:00pm" },
    ]);
  });

  it("preserves verified proof and no-guarantee language", () => {
    expect(PROOF_POINTS.map((point) => point.value)).toEqual([
      "Founded in 1991",
      "Over 65 campuses",
      "Structured programs with qualified teachers",
    ]);
    expect(
      FAQS.some((faq) =>
        faq.answer.includes("These pathways are competitive"),
      ),
    ).toBe(true);
  });

  it("maps each route to the correct default interest", () => {
    expect(getLandingContent("general").defaultInterest).toBe("Not sure yet");
    expect(getLandingContent("selective").defaultInterest).toBe(
      "Selective School Preparation",
    );
    expect(getLandingContent("scholarship").defaultInterest).toBe(
      "Scholarship Preparation",
    );
  });
});
```

- [ ] **Step 2: Run the tests and verify the module is missing**

Run:

```powershell
npm test -- components/booking/booking-content.test.ts
```

Expected: fail because `./booking-content` does not exist.

- [ ] **Step 3: Create the typed content module**

Create `components/booking/booking-content.ts` with:

```ts
export type LandingVariant = "general" | "selective" | "scholarship";

export const INTERESTS = [
  "Prep-Year 10 tutoring",
  "Selective School Preparation",
  "Scholarship Preparation",
  "Not sure yet",
] as const;

export type Interest = (typeof INTERESTS)[number];

export type LandingContent = {
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    detail: string;
  };
  pathway: {
    eyebrow: string;
    title: string;
    description: string;
    href: string;
    cta: string;
  };
  defaultInterest: Interest;
};
```

Move the current `programs`, `proofPoints`, `schedule`, and `faqs` arrays into uppercase exports without changing any string. Move the current three hero branches and three pathway branches into a `Record<LandingVariant, LandingContent>`, then implement:

```ts
export function getLandingContent(
  variant: LandingVariant,
): LandingContent {
  return LANDING_CONTENT[variant];
}
```

- [ ] **Step 4: Make the landing page consume the typed module**

In `booking-landing-page.tsx`, replace local arrays and conditional hero/pathway objects with:

```tsx
import {
  FAQS,
  PROGRAMS,
  PROOF_POINTS,
  SCHEDULE,
  getLandingContent,
  type LandingVariant,
} from "./booking-content";

const content = getLandingContent(variant);
```

Keep the existing rendered markup unchanged for this task. Replace only variable names and the `defaultInterest` source.

- [ ] **Step 5: Run focused and full verification**

Run:

```powershell
npm test -- components/booking/booking-content.test.ts
npm run lint
npm run build
```

Expected: all commands exit `0`; rendered copy is unchanged.

- [ ] **Step 6: Commit the content safety layer**

```powershell
git add components/booking/booking-content.ts components/booking/booking-content.test.ts components/booking/booking-landing-page.tsx
git commit -m "Protect verified booking content"
```

---

### Task 3: Generate The Hero Asset And Build The Header And Hero

**Files:**
- Create: `public/images/booking-hero-academic-momentum.png`
- Create: `components/booking/campus-header.tsx`
- Create: `components/booking/booking-hero.tsx`
- Modify: `components/booking/booking-landing-page.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: `LandingVariant`, `LandingContent["hero"]`, existing analytics `data-track-*` attributes.
- Produces:

```ts
type BookingHeroProps = {
  hero: LandingContent["hero"];
  variant: LandingVariant;
};
```

and:

```ts
export function CampusHeader(): React.ReactNode;
export function BookingHero(props: BookingHeroProps): React.ReactNode;
```

- [ ] **Step 1: Generate the face-free production image**

Use the image-generation tool with this prompt:

```text
High-end editorial education photograph, horizontal 3:2 composition. Tight
overhead-oblique close-up of a secondary-school student's hands writing in a
generic workbook beside a neat notebook, pencil, red pen and ruler. Natural
bright Australian classroom window light, candid documentary photography,
realistic hands and skin, restrained red stationery, subject concentrated in
the right and lower thirds, generous quiet negative space on the left for a
headline. No face, no extra fingers, no logos, no uniforms, no school branding,
no readable questions, no visible test name, no text overlay, no artificial
gloss, no staged smiling students.
```

Copy the selected built-in image-generation output from its generated-images location to `public/images/booking-hero-academic-momentum.png`. Inspect it at original resolution. Reject and regenerate if a face, malformed hand, legible test text, logo, or school identity appears.

- [ ] **Step 2: Create the campus header**

Create `campus-header.tsx` with the current offer copy and logo. Use Lucide `Phone` and `ArrowRight` icons for the phone and booking actions. Preserve:

```tsx
data-track-event="phone_clicked"
data-track-location="header"
```

and:

```tsx
data-track-event="cta_clicked"
data-track-label="Book free assessment"
data-track-location="header"
```

Desktop anchors are exactly:

```tsx
<a href="#programs">Programs</a>
<a href="#booking">How it works</a>
<a href="#location">Location</a>
```

The mobile header shows the full logo plus a compact arrow-icon booking action.

- [ ] **Step 3: Create the full-bleed red hero**

Create `booking-hero.tsx`. Render the generated image with `next/image`:

```tsx
<Image
  src="/images/booking-hero-academic-momentum.png"
  alt="Student working through practice material"
  fill
  priority
  sizes="100vw"
  className="hero-study-image object-cover"
/>
```

Do not add `unoptimized`; production verification must confirm that the deployed image response is optimised. Do not describe the image as the Caroline Springs campus.

Render the existing `hero.eyebrow`, `hero.title`, `hero.description`, and `hero.detail`. Keep the two existing tracking contracts on the assessment and phone actions. Wrap the two visual headline lines in `.hero-line > span`; keep the description, detail, and both actions inside one `.hero-support` wrapper so they settle as a single motion group. Add the path:

```tsx
<ol className="learning-path" aria-label="Assessment process">
  <li>Assess</li>
  <li>Plan</li>
  <li>Progress</li>
</ol>
```

- [ ] **Step 4: Add the focal animation and responsive crop**

Add named CSS classes to `app/globals.css` rather than large arbitrary class strings:

```css
.hero-line {
  overflow: hidden;
}

.hero-line > span {
  display: block;
  animation: hero-line-enter 620ms var(--ease-out) both;
}

.hero-line + .hero-line > span {
  animation-delay: 70ms;
}

.hero-media-mask {
  clip-path: polygon(42% 0, 100% 0, 100% 100%, 56% 100%);
  animation: hero-mask-resolve 760ms var(--ease-out) 40ms both;
}

.hero-study-image {
  filter: grayscale(1) contrast(1.08);
  mix-blend-mode: multiply;
  opacity: 0.42;
  object-position: 68% 74%;
}

.hero-support {
  animation: hero-support-enter 480ms var(--ease-out) 220ms both;
}

.learning-path::before {
  transform: scaleX(0);
  transform-origin: left;
  animation: learning-path-draw 540ms var(--ease-out) 320ms forwards;
}
```

Define the four named keyframes. `hero-mask-resolve` starts from a narrower
right-edge diagonal polygon and ends at the polygon above; `hero-line-enter`
uses only `translateY(100%)`; `hero-support-enter` uses no more than
`translateY(10px)` plus opacity; `learning-path-draw` ends at `scaleX(1)`.
The image mask, two headline lines, support wrapper, and path line are the five
focal animation groups. Nothing else in the hero receives an entrance
animation, and the complete sequence ends at `860ms`.

Use fixed type sizes:

```css
.hero-display { font-size: 48px; }
@media (min-width: 640px) { .hero-display { font-size: 68px; } }
@media (min-width: 1024px) { .hero-display { font-size: 84px; } }
```

Under `prefers-reduced-motion: reduce`, set all hero animations to `none` and the learning-path line to `transform: scaleX(1)`.

- [ ] **Step 5: Integrate the new header and hero**

In `booking-landing-page.tsx`, replace only the offer strip, header, and hero blocks:

```tsx
<CampusHeader />
<BookingHero hero={content.hero} variant={variant} />
```

Keep structured data, skip link, proof, programs, form, location, FAQs, footer, and mobile actions unchanged in this task.

- [ ] **Step 6: Verify first-viewport behaviour**

Run:

```powershell
npm test
npm run lint
npm run build
```

Start the local site and inspect:

```text
/tutoring-caroline-springs
/selective-school-preparation-caroline-springs
/scholarship-preparation-caroline-springs
```

At 390x844 and 1440x900 verify:

- the logo is not covered;
- the campus is visible in the first viewport;
- the image crop contains study materials and no face;
- the CTA is visible without scrolling;
- the next section is hinted;
- reduced motion leaves a complete static hero;
- no horizontal overflow exists.

- [ ] **Step 7: Commit the header and hero**

```powershell
git add public/images components/booking/campus-header.tsx components/booking/booking-hero.tsx components/booking/booking-landing-page.tsx app/globals.css
git commit -m "Build red Academic Momentum hero"
```

---

### Task 4: Build The Lightweight Scroll Motion And Program Narrative

**Files:**
- Create: `components/booking/motion-config.ts`
- Create: `components/booking/motion-config.test.ts`
- Create: `components/booking/scroll-motion-controller.tsx`
- Create: `components/booking/program-pathways.tsx`
- Modify: `components/booking/booking-landing-page.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- Produces:

```ts
export type MotionKind =
  | "program"
  | "program-number"
  | "pathway"
  | "path-line"
  | "booking-step";
export function getMotionDelay(kind: MotionKind, index: number): number;
export function ScrollMotionController(): null;
```

- `ProgramPathways` consumes `variant`, `content.pathway`, and `PROGRAMS`.

- [ ] **Step 1: Write the failing motion timing tests**

Create `motion-config.test.ts`:

```ts
import { describe, expect, it } from "vitest";

import { getMotionDelay } from "./motion-config";

describe("getMotionDelay", () => {
  it("stages program rows without exceeding the motion budget", () => {
    expect(getMotionDelay("program", 0)).toBe(0);
    expect(getMotionDelay("program", 1)).toBe(70);
    expect(getMotionDelay("program", 20)).toBe(210);
  });

  it("keeps pathway and booking feedback faster than program staging", () => {
    expect(getMotionDelay("pathway", 2)).toBe(120);
    expect(getMotionDelay("booking-step", 2)).toBe(100);
  });

  it("caps number and path-line staging", () => {
    expect(getMotionDelay("program-number", 20)).toBe(210);
    expect(getMotionDelay("path-line", 20)).toBe(120);
  });

  it("handles negative indexes as the first item", () => {
    expect(getMotionDelay("program", -1)).toBe(0);
  });
});
```

- [ ] **Step 2: Run the focused test and verify failure**

```powershell
npm test -- components/booking/motion-config.test.ts
```

Expected: fail because `motion-config.ts` does not exist.

- [ ] **Step 3: Implement capped motion timing**

Create `motion-config.ts`:

```ts
export type MotionKind =
  | "program"
  | "program-number"
  | "pathway"
  | "path-line"
  | "booking-step";

const MOTION_STEP_MS: Record<MotionKind, number> = {
  program: 70,
  "program-number": 70,
  pathway: 60,
  "path-line": 120,
  "booking-step": 50,
};

const MOTION_CAP_MS: Record<MotionKind, number> = {
  program: 210,
  "program-number": 210,
  pathway: 180,
  "path-line": 120,
  "booking-step": 150,
};

export function getMotionDelay(kind: MotionKind, index: number): number {
  const safeIndex = Math.max(0, index);
  return Math.min(safeIndex * MOTION_STEP_MS[kind], MOTION_CAP_MS[kind]);
}
```

Run the focused test. Expected: three passing tests.

- [ ] **Step 4: Implement the observer controller**

Create `scroll-motion-controller.tsx`:

```tsx
"use client";

import { useEffect } from "react";

import { getMotionDelay, type MotionKind } from "./motion-config";

export function ScrollMotionController() {
  useEffect(() => {
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>("[data-motion-kind]"),
    );
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion || !("IntersectionObserver" in window)) {
      nodes.forEach((node) => {
        node.dataset.motionState = "visible";
      });
      return;
    }

    nodes.forEach((node) => {
      const kind = node.dataset.motionKind as MotionKind;
      const index = Number(node.dataset.motionIndex ?? 0);
      node.style.setProperty(
        "--motion-delay",
        `${getMotionDelay(kind, index)}ms`,
      );
      node.dataset.motionState = "pending";
    });

    document.documentElement.dataset.motion = "enabled";

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const node = entry.target as HTMLElement;
          node.dataset.motionState = "visible";
          observer.unobserve(node);
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" },
    );

    nodes.forEach((node) => observer.observe(node));

    return () => {
      observer.disconnect();
      delete document.documentElement.dataset.motion;
    };
  }, []);

  return null;
}
```

- [ ] **Step 5: Create the program and pathway component**

Create `program-pathways.tsx` with:

```ts
type ProgramPathwaysProps = {
  variant: LandingVariant;
  pathway: LandingContent["pathway"];
  programs: typeof PROGRAMS;
};
```

Use unframed program rows. Add to each row:

```tsx
data-motion-kind="program"
data-motion-index={index}
```

Wrap each program number in an overflow-hidden `.program-number-mask` and mark
its inner span separately:

```tsx
data-motion-kind="program-number"
data-motion-index={index}
```

Add one semantic-free `.learning-path-rail` with two `aria-hidden="true"`
segments: one continuing from the hero into the program list and one entering
the preparation pathway. Mark each segment:

```tsx
data-motion-kind="path-line"
data-motion-index={segmentIndex}
```

Add to the pathway copy and CTA:

```tsx
data-motion-kind="pathway"
data-motion-index="0"
```

Keep every existing program `href`, `data-track-*` attribute, and variant rule.

- [ ] **Step 6: Add the lightweight transition CSS**

Add:

```css
[data-motion-kind] {
  opacity: 1;
  transform: none;
}

html[data-motion="enabled"]
  [data-motion-kind="program"][data-motion-state="pending"],
html[data-motion="enabled"]
  [data-motion-kind="pathway"][data-motion-state="pending"],
html[data-motion="enabled"]
  [data-motion-kind="booking-step"][data-motion-state="pending"] {
  opacity: 0.01;
  transform: translateY(14px);
}

html[data-motion="enabled"]
  [data-motion-kind="program"][data-motion-state="visible"],
html[data-motion="enabled"]
  [data-motion-kind="pathway"][data-motion-state="visible"],
html[data-motion="enabled"]
  [data-motion-kind="booking-step"][data-motion-state="visible"] {
  opacity: 1;
  transform: translateY(0);
  transition:
    opacity 480ms var(--ease-out) var(--motion-delay, 0ms),
    transform 560ms var(--ease-out) var(--motion-delay, 0ms);
}

.program-number-mask {
  display: block;
  overflow: hidden;
}

.program-number-mask > [data-motion-kind="program-number"] {
  display: block;
}

html[data-motion="enabled"]
  [data-motion-kind="program-number"][data-motion-state="pending"] {
  clip-path: inset(0 0 100% 0);
}

html[data-motion="enabled"]
  [data-motion-kind="program-number"][data-motion-state="visible"] {
  clip-path: inset(0);
  transition: clip-path 460ms var(--ease-out) var(--motion-delay, 0ms);
}

.learning-path-rail [data-motion-kind="path-line"] {
  display: block;
  width: 2px;
  min-height: 72px;
  background: var(--signal);
  transform: scaleY(1);
  transform-origin: top;
}

html[data-motion="enabled"]
  [data-motion-kind="path-line"][data-motion-state="pending"] {
  transform: scaleY(0);
}

html[data-motion="enabled"]
  [data-motion-kind="path-line"][data-motion-state="visible"] {
  transform: scaleY(1);
  transition: transform 620ms var(--ease-out) var(--motion-delay, 0ms);
}

@media (prefers-reduced-motion: reduce) {
  [data-motion-kind] {
    opacity: 1 !important;
    transform: none !important;
    clip-path: none !important;
    transition: none !important;
  }
}
```

Use the signal-yellow path rail as the persistent continuity element. Program
numbers reveal through their short mask; they do not use the generic
fade-and-rise. Do not add an animation to every heading or paragraph, and do
not add parallax or a second moving image crop.

- [ ] **Step 7: Integrate the controller and program section**

In `booking-landing-page.tsx`, render once near the start of `<main>`:

```tsx
<ScrollMotionController />
```

Replace the existing programs and pathway blocks with:

```tsx
<ProgramPathways
  variant={variant}
  pathway={content.pathway}
  programs={PROGRAMS}
/>
```

- [ ] **Step 8: Verify tests, fallback, and scroll smoothness**

Run:

```powershell
npm test
npm run lint
npm run build
```

In the browser verify:

- program rows animate once;
- the path advances without a continuous JavaScript scroll listener;
- rapid up/down scrolling does not restart or flicker;
- tab navigation never waits for animation;
- reduced motion is static;
- the page remains readable if JavaScript is disabled.

- [ ] **Step 9: Commit the motion narrative**

```powershell
git add components/booking/motion-config.ts components/booking/motion-config.test.ts components/booking/scroll-motion-controller.tsx components/booking/program-pathways.tsx components/booking/booking-landing-page.tsx app/globals.css
git commit -m "Add lightweight learning-path motion"
```

---

### Task 5: Rebuild The Conversion And Campus Sections

**Files:**
- Create: `components/booking/campus-details.tsx`
- Modify: `components/booking/booking-form.tsx`
- Modify: `components/booking/booking-landing-page.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- `CampusDetails` consumes `variant`, `FAQS`, and `SCHEDULE`.
- `BookingForm` keeps its existing public props:

```ts
type BookingFormProps = {
  defaultInterest?: Interest;
  sourceLabel?: string;
};
```

- [ ] **Step 1: Freeze the form submission logic before visual edits**

Read and identify the boundaries from `async function handleSubmit` through the `catch` block. Do not change:

- request URL or payload keys;
- tracking storage lookup;
- GA or Meta event names;
- Google Ads `send_to`;
- transaction ID;
- event callback timeout;
- thank-you route;
- status transitions.

Record the current `git diff -- components/booking/booking-form.tsx` as empty before proceeding.

- [ ] **Step 2: Restyle the form without touching data flow**

Change only rendered markup classes and add Lucide `ArrowRight`, `Check`, and `Phone` icons. Keep labels and field names exact. Use:

```tsx
const inputClassName =
  "min-h-12 w-full rounded-[4px] border border-input bg-white px-3 text-base text-foreground outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20";
```

Import the shared interest type and options:

```tsx
import { INTERESTS, type Interest } from "./booking-content";

type BookingFormProps = {
  defaultInterest?: Interest;
  sourceLabel?: string;
};
```

Delete the local `interests` array and render the select options from
`INTERESTS`; do not change the option order or values.

The submit button remains textually:

```text
Request my free assessment
```

The loading label remains:

```text
Sending request...
```

Error content keeps the phone fallback. Consent remains required.

- [ ] **Step 3: Create the campus details component**

Move the current location, schedule, FAQ, final CTA, footer, and mobile fixed actions into `campus-details.tsx` without changing facts or tracking attributes.

Use Lucide:

- `MapPin` for directions;
- `Phone` for phone actions;
- `ChevronDown` for FAQ disclosure;
- `ArrowRight` for assessment CTAs.

Do not put sections inside cards. Keep the FAQ as native `<details>` elements.
Use an ice-blue or warm-white full-width location band, an unframed schedule,
and a full-width red final CTA. Set the FAQ indicator and answer transition to
`200ms`; do not animate native disclosure height.

- [ ] **Step 4: Recompose the booking section**

Keep the ink background and one white form card. Mark the three existing booking steps:

```tsx
data-motion-kind="booking-step"
data-motion-index={index}
```

Render `BookingForm` with:

```tsx
<BookingForm
  defaultInterest={content.defaultInterest}
  sourceLabel={variant}
/>
```

Keep the request destination and no-enrolment-commitment copy.

- [ ] **Step 5: Recompose the landing page**

`booking-landing-page.tsx` should now read as an orchestrator:

```tsx
<CampusHeader />
<BookingHero hero={content.hero} variant={variant} />
<ProofStrip points={PROOF_POINTS} />
<ProgramPathways
  variant={variant}
  pathway={content.pathway}
  programs={PROGRAMS}
/>
<AssessmentBooking
  variant={variant}
  defaultInterest={content.defaultInterest}
/>
<CampusDetails
  variant={variant}
  faqs={FAQS}
  schedule={SCHEDULE}
/>
```

`ProofStrip` and `AssessmentBooking` may remain small local functions in the orchestrator because they are used only there.

- [ ] **Step 6: Run behaviour verification**

Run:

```powershell
npm test
npm run lint
npm run build
```

Submit one local test lead with valid values. Expected:

- button displays `Sending request...`;
- API returns success;
- GA event path is called;
- Meta event path is called;
- Google Ads callback path remains conditional on IDs;
- route changes to `/thank-you`.

Also trigger one validation error and confirm the phone fallback remains usable.

- [ ] **Step 7: Commit conversion and campus polish**

Before commit, run:

```powershell
git diff --word-diff=porcelain -- components/booking/booking-form.tsx
```

Confirm no request, payload, tracking, or redirect code changed.

Then commit:

```powershell
git add components/booking/campus-details.tsx components/booking/booking-form.tsx components/booking/booking-landing-page.tsx app/globals.css
git commit -m "Polish booking and campus experience"
```

---

### Task 6: Align The Thank-You Page And Verify Every Route

**Files:**
- Modify: `app/thank-you/page.tsx`
- Modify: `app/globals.css`
- Test: all public routes

**Interfaces:**
- Consumes: global type/colour tokens and existing tracking attributes.
- Produces: a conversion confirmation page visually consistent with the approved funnel.

- [ ] **Step 1: Apply the approved system to the thank-you page**

Keep metadata, `robots.index: false`, copy, phone, address, and return link unchanged. Use Lucide `Check`, `Phone`, and `ArrowLeft` icons. Replace the secondary panel with the same Assess/Plan/Progress line used by the landing page.

Do not add a second form, upsell, testimonial, or new claim.

- [ ] **Step 2: Verify route-specific content**

Open each route and confirm the expected first headline and form default:

```text
/tutoring-caroline-springs
  General tutoring headline
  Main interest: Not sure yet

/selective-school-preparation-caroline-springs
  Selective headline
  Main interest: Selective School Preparation

/scholarship-preparation-caroline-springs
  Scholarship headline
  Main interest: Scholarship Preparation

/thank-you
  Request received
  No indexing
```

- [ ] **Step 3: Verify navigation and analytics contracts**

Check each visible control:

- header assessment CTA;
- hero assessment CTA;
- hero phone action;
- program links;
- pathway CTA;
- form phone action;
- directions;
- final CTA;
- footer phone;
- mobile fixed phone and assessment actions.

Expected: existing `data-track-event`, `data-track-label`, and `data-track-location` attributes remain present.

- [ ] **Step 4: Run the full local test gate**

```powershell
npm test
npm run lint
npm run build
```

Expected: all commands exit `0`.

- [ ] **Step 5: Commit route parity**

```powershell
git add app/thank-you/page.tsx app/globals.css
git commit -m "Align confirmation page with new funnel"
```

---

### Task 7: Audit, Optimise, Publish, And Verify Production

**Files:**
- Modify only files required by verified audit findings.
- Read: `.openai/hosting.json`
- Read: `.env.example`
- Update: production source and deployment version

**Interfaces:**
- Consumes: the complete local redesign.
- Produces: verified GitHub source, saved Sites version, and public Cloudflare deployment.

- [ ] **Step 1: Load the Impeccable craft floor before final UI edits**

Read:

```text
C:\Users\devsy\.agents\skills\impeccable\reference\craft-floor.md
C:\Users\devsy\.agents\skills\impeccable\reference\audit.md
C:\Users\devsy\.agents\skills\impeccable\reference\optimize.md
C:\Users\devsy\.agents\skills\impeccable\reference\polish.md
```

Apply only findings relevant to the approved design. Do not replace the visual direction.

- [ ] **Step 2: Run the mechanical detector**

Run once after all UI edits:

```powershell
node C:\Users\devsy\.agents\skills\impeccable\scripts\detect.mjs --json app/globals.css app/thank-you/page.tsx components/booking
```

Expected: no unexplained high-severity findings. Fix confirmed findings and rerun lint/build, not the detector, unless the detector output explicitly requires a confirmation run.

- [ ] **Step 3: Capture the visual matrix**

Run the local site and capture:

```text
390x844
768x1024
1440x900
1920x1080
```

For each viewport inspect:

- full logo visibility;
- first-viewport campus and CTA;
- image crop;
- next-section hint;
- no text overlap;
- no horizontal overflow;
- no form overflow;
- mobile bar does not cover content;
- schedule text remains exact;
- FAQ indicators align;
- footer content wraps cleanly.

- [ ] **Step 4: Verify motion and performance budgets**

Check normal and reduced motion:

- focal entrance completes in less than 900ms;
- no more than five hero elements animate concurrently;
- scroll reveals run once;
- no infinite decorative loop exists;
- no `scroll` event listener is added;
- reduced motion shows final states immediately;
- keyboard focus does not wait for transitions.

Inspect console and network:

- no runtime errors;
- no missing font or image assets;
- no external font request;
- hero asset loads from the same origin;
- the optimised hero response transferred for the desktop viewport is no larger than 250 KB;
- no animation library bundle.

- [ ] **Step 5: Run the final code gate**

```powershell
npm test
npm run lint
npm run build
git status --short
```

Expected: tests, lint, and build exit `0`. Git status contains only intentional redesign files plus unrelated pre-existing untracked files, which remain untouched.

- [ ] **Step 6: Commit final audit fixes**

Stage only redesign files:

```powershell
git add app/layout.tsx app/globals.css app/thank-you/page.tsx components/booking/booking-content.ts components/booking/booking-content.test.ts components/booking/campus-header.tsx components/booking/booking-hero.tsx components/booking/program-pathways.tsx components/booking/motion-config.ts components/booking/motion-config.test.ts components/booking/scroll-motion-controller.tsx components/booking/campus-details.tsx components/booking/booking-form.tsx components/booking/booking-landing-page.tsx public/images/booking-hero-academic-momentum.png package.json package-lock.json .gitignore
git commit -m "Finish Academic Momentum website redesign"
```

If no audit fixes remain after earlier commits, skip this empty commit.

- [ ] **Step 7: Push the exact source state**

Capture:

```powershell
git rev-parse HEAD
```

Push the same commit to `origin/main` and the existing Sites source remote. Never persist a temporary credential.

- [ ] **Step 8: Save and deploy through Sites**

Read `.openai/hosting.json` and reuse its exact `project_id`. Build an archive from the exact pushed commit, save a new Sites version referencing that commit, and deploy only the saved version.

If Sites access remains private because of the existing workspace configuration, keep it as the saved authenticated version and continue with the established public Cloudflare deployment.

- [ ] **Step 9: Deploy the public Cloudflare Worker**

Run:

```powershell
npm run deploy
```

Expected: deployment completes and returns the established public Workers URL.

- [ ] **Step 10: Verify production**

Verify HTTP `200`, correct title, new red hero, new fonts, generated image, and successful navigation on:

```text
/tutoring-caroline-springs
/selective-school-preparation-caroline-springs
/scholarship-preparation-caroline-springs
/thank-you
/sitemap.xml
/robots.txt
```

Submit one production lead only if a non-customer test record can be clearly identified and removed from the private lead dashboard. Otherwise verify production form validation and use the already-confirmed local submission path.

- [ ] **Step 11: Report the release**

Report:

- production URL;
- commit SHA;
- tests, lint, build, detector, viewport, reduced-motion, and route results;
- any Google Ads identifiers still needed before campaign launch;
- unchanged pre-existing untracked files.

# North Shore Caroline Springs Academic Momentum Redesign

**Date:** 2026-07-29  
**Surface mode:** Persuade  
**Status:** Visual direction approved; implementation pending  
**Primary audience:** Parents and guardians considering tutoring for a Prep-Year 10 student

## Goal

Turn the existing North Shore Caroline Springs booking website into a lucid,
high-end, conversion-focused experience that feels recognisably North Shore.
The redesign must make the free initial assessment easy to understand and book,
while increasing visual confidence through stronger typography, more deliberate
brand red, restrained face-free study imagery, and purposeful motion.

Success means:

- the free assessment remains the unmistakable primary action;
- the Caroline Springs campus identity is visible in the first viewport;
- the experience feels polished on a phone before it is judged on desktop;
- motion improves continuity without slowing mid-range laptops or phones;
- every existing verified fact, schedule, route, form behaviour, tracking hook,
  and lead-storage workflow continues to work.

## Non-Goals

- No 3D, WebGL, canvas rendering, autoplay video, sound, particles, or shader effects.
- No fabricated testimonials, results, awards, urgency, availability, or outcome claims.
- No implication that generated imagery depicts the actual Caroline Springs campus.
- No new booking backend, CRM, analytics provider, or program offer.
- No landing-page copy rewrite beyond small clarity edits that preserve meaning.
- No animation dependency when CSS and the browser platform can provide the effect.

## Approved Visual Direction

The approved direction is **Academic Momentum**.

It combines the credibility of an established tutoring organisation with the
energy of visible academic progress. The page should feel editorial, precise,
optimistic, and local. It should not feel like a traditional school brochure,
a generic franchise template, or an experimental technology studio.

The visual thesis is:

> A clear starting point becomes a visible learning path.

That idea controls the typography, colour dosage, imagery, section transitions,
and motion system.

## Typography

### Families

- **Display:** Instrument Serif, regular and italic.
- **Body and interface:** DM Sans variable, weights 400, 500, 600, and 700.
- Both families will be self-hosted as Latin WOFF2 files with `font-display: swap`.
- Only used files and weights will be loaded.

Instrument Serif appears only in major persuasive headings and selected program
names. DM Sans carries navigation, body text, form controls, labels, proof,
buttons, metadata, and legal content. The display face adds authority without
being allowed to reduce form clarity.

### Role Scale

Font sizes use fixed breakpoint steps rather than viewport-width interpolation.

| Role | Mobile | Tablet | Desktop | Notes |
|---|---:|---:|---:|---|
| Hero display | 48px | 68px | 84px | 0.9-0.96 line height |
| Section display | 38px | 48px | 58px | Maximum 14 words where practical |
| Program title | 25px | 28px | 32px | Display face |
| Lead/body | 17px | 18px | 18px | 1.55-1.65 line height |
| Body | 16px | 16px | 16px | 45-70 character measure |
| Interface | 14px | 14px | 14px | DM Sans 600-700 |
| Label/metadata | 12px | 12px | 12px | Uppercase only for short labels |

Body text remains at least 16px. Text on red or ink surfaces receives slightly
more line height and adequate weight. Long headings must wrap cleanly at 320px,
200% zoom, and across all three campaign variants.

## Colour System

North Shore red becomes an architectural colour that owns major page regions,
not a small accent scattered across links.

| Role | Colour | Use |
|---|---|---|
| Brand/action red | `#DF1F2D` | Hero, final conversion band, primary actions on light surfaces |
| Deep red | `#9F1020` | Red hover/pressed state and selected details |
| Ink | `#131416` | Primary text, booking section, header controls |
| Warm white | `#FFFDFB` | Main canvas and cards |
| Ice blue | `#EAF3FF` | Program and location breathing space |
| Soft rose | `#F8DDE0` | Quiet supporting surfaces and error background |
| Signal yellow | `#FFD24A` | Learning-path line and limited directional highlights |

Red owns the hero and final CTA band. Ice blue separates educational content
from conversion content. Yellow is reserved for the Assess, Plan, Progress path
and must not compete with the primary action. No information relies on colour
alone. All text, controls, focus rings, and separators must meet WCAG AA.

## Image Direction

The current people-heavy classroom image will be replaced.

The new hero image should be a tight, face-free study scene:

- hands working through a workbook or notes;
- pencil, ruler, notebook, and natural classroom light;
- no visible logos, uniforms, branded school environment, or legible test content;
- no staged group of smiling students;
- no claim that the image depicts Lakeview Senior College or current students.

The image is treated as a red duotone backdrop and blended into the full-bleed
hero. It is not placed in a rectangular card. Responsive crops must continue to
show study materials rather than a face. The final image is exported in AVIF or
WebP at responsive sizes, with a practical target below 250 KB for the largest
initially loaded source.

## Page Structure

The shared landing-page component continues to power the general tutoring,
selective preparation, and scholarship preparation routes.

### 1. Offer Strip And Header

- Slim ink offer strip with the free-assessment and pro-rata message.
- White header with the official logo, Caroline Springs campus label, three
  anchor links on desktop, phone access, and a compact assessment CTA.
- Mobile header keeps the logo and one compact booking action.
- The logo must remain fully visible and must never collide with the offer strip.

### 2. Full-Bleed Red Hero

- Red owns the viewport.
- Face-free study imagery is blended into the background.
- Existing route-specific headline and description remain authoritative.
- Primary CTA: `Book my free assessment`.
- Secondary action: call `0403 474 343`.
- The campus and Lakeview Senior College are first-viewport signals.
- The lower edge hints at the next program section on mobile and desktop.

### 3. Assess, Plan, Progress Path

The horizontal hero path establishes the motion and narrative system:

1. Assess the student's starting point.
2. Plan the appropriate program.
3. Progress with structured support.

The line continues visually into the program section as a restrained vertical
guide. It is explanatory, not decorative.

### 4. Program Section

- Full-width ice-blue band.
- Three unframed rows or columns with large `01`, `02`, and `03` markers.
- No decorative card grid.
- General route keeps the service links.
- Selective and scholarship routes retain their specialised message.
- On mobile, content is shortened through layout and spacing rather than hiding facts.

### 5. Preparation Pathway

- A strong red or white editorial transition based on the route variant.
- The learning-path line advances as the section enters.
- Supporting text remains within 65 characters per line.
- Existing no-guarantee language remains intact.

### 6. Assessment Booking Section

- Ink background separates decision content from data entry.
- White form surface remains a single card with no nested cards.
- The three booking steps use the same learning-path markers.
- Field labels, consent, error state, loading state, phone fallback, and thank-you
  redirect remain functional.
- Form motion is limited to focus, error, submission, and success feedback.

### 7. Location And Schedule

- Ice-blue or warm-white full-width band.
- Address, parking guidance, directions, Saturday schedule, and Sunday schedule
  remain exact.
- Schedule remains scan-friendly without a decorative card.

### 8. FAQ, Final CTA, And Footer

- FAQ uses precise open/close motion and visible focus states.
- Final conversion band returns to North Shore red.
- Footer retains campus details, phone, email, privacy, and North Shore Australia.
- Mobile fixed actions remain available without covering content.

## Motion System

The motion reference is Lusion's continuity between sections, not its 3D load or
animation volume. North Shore uses one product-specific motif: the learning path.

### Focal Entrance

On first load:

1. The hero image resolves through a bounded diagonal mask.
2. Headline lines reveal through controlled clipping.
3. Supporting copy and actions settle into place.
4. The Assess, Plan, Progress line draws once.

Total focal sequence remains under 900ms. Content is visible by default if
scripts fail.

### Scroll Choreography

- The learning-path line advances as the program and pathway sections enter.
- Program numbers reveal through a short mask, not a generic fade-and-rise.
- One study-image crop may shift by no more than 12px to preserve continuity.
- The booking steps complete sequentially as the booking section becomes visible.
- FAQ expansion and button feedback use 150-280ms transitions.
- No nonessential infinite loops.

### Implementation Budget

- CSS transforms, opacity, and bounded clip paths only.
- `IntersectionObserver` adds state classes; there is no JavaScript scroll loop.
- CSS scroll-driven animation may enhance the path where supported, with a
  complete static fallback.
- No animation library.
- No more than five elements animate concurrently during the focal sequence.
- Expensive effects stop when offscreen.
- `prefers-reduced-motion: reduce` disables authored movement and leaves all
  content visible in its final state.

## Responsive Behaviour

### Mobile

- Hero content uses fixed responsive type steps and avoids text over a busy crop.
- CTA buttons stack when needed and remain at least 48px high.
- The fixed action bar respects safe-area insets.
- The page has no horizontal overflow at 320px.
- Program rows become a clear vertical sequence.
- The form remains one column and does not exceed the viewport.

### Tablet

- Hero retains the full-bleed image treatment.
- Program content may use a two-stage grid without creating orphaned items.
- Booking content moves to two columns only when both columns remain comfortable.

### Desktop

- Hero text remains within 60% of the content width.
- Body copy stays within a readable measure.
- Large headings do not become oversized relative to their sections.
- The next section remains partially visible on common laptop and wide displays.

## Accessibility

- Semantic landmarks, heading order, labels, details/summary behaviour, and skip
  link remain correct.
- Keyboard focus is always visible.
- Body text contrast is at least 4.5:1; large text and controls are at least 3:1.
- Animations never carry information without text and position.
- Reduced motion provides the complete experience without movement.
- Form errors use text plus border/icon treatment, not colour alone.
- Tap targets are at least 44px, with primary actions targeting 48px.

## Performance

- Preserve server rendering and avoid converting the landing page into a large
  client component.
- Add at most one small client-side motion controller based on
  `IntersectionObserver`.
- Self-host only required font files.
- Optimise the hero image and provide accurate `sizes`.
- Avoid layout-shifting animation and reserve image dimensions.
- Target no horizontal overflow, no console errors, and no animation-related CLS.
- Target a mobile LCP below 2.5 seconds under a representative throttled test
  where the local tooling supports measurement.

## Existing Behaviour To Preserve

- Correct phone: `0403 474 343`.
- Correct location and parking guidance.
- Saturday: `9:30am-1:00pm: Grade 3, 4, 9 and 10 classes only`.
- Sunday: `9:30am-1:00pm`.
- Prep-Year 10 tutoring, Selective School Preparation, Scholarship Preparation,
  and Not sure yet interest options.
- Additional selective workshops throughout the week closer to the exam.
- Lead API, anti-spam field, consent requirement, campaign attribution, Meta
  event, GA lead event, Google Ads conversion callback, and thank-you redirect.
- Sitemap, robots, schema, privacy links, metadata, and campaign-specific routes.

## Verification

Before release:

1. Run lint and production build.
2. Run the Impeccable detector for typography, responsiveness, accessibility,
   performance, and the final changed UI.
3. Capture and visually inspect screenshots at 390x844, 768x1024, 1440x900,
   and one wide desktop viewport.
4. Verify no blank media, image crop problems, overlapping text, covered content,
   or horizontal overflow.
5. Verify the hero entrance and scroll choreography at normal and reduced motion.
6. Verify keyboard navigation, focus order, FAQ behaviour, mobile actions, phone
   links, directions, all program links, and all campaign routes.
7. Submit a test lead locally and confirm error, loading, success, conversion,
   and thank-you paths.
8. Recheck the production deployment after publishing.


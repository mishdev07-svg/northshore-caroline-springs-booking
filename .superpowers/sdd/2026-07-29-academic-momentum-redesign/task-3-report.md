# Task 3 Report: Academic Momentum Header And Hero

**Status:** DONE
**Implementation commit:** `47e9f1a87f5a4d4f3c4afbc344e3e601c08acf16`
**Completed:** 2026-07-30

## Implementation

- Integrated the supplied, previously generated production asset at
  `public/images/booking-hero-academic-momentum.png` without regenerating or
  replacing it.
- Added `CampusHeader` with the current assessment offer, full official logo,
  Caroline Springs and Lakeview Senior College identity, exact desktop anchors,
  Lucide phone/arrow icons, responsive mobile action, and preserved analytics
  attributes.
- Added `BookingHero` with route-owned hero copy, two headline motion wrappers,
  one support motion wrapper, preserved hero analytics, the three-step learning
  path, and the required optimized `next/image` contract.
- Added named CSS for the red editorial composition, exact 48/68/84px display
  sizes, diagonal image mask, right-weighted responsive crop, interaction
  states, and reduced-motion fallback.
- Replaced only the offer/header/hero integration boundary in
  `booking-landing-page.tsx`. Structured data, proof, programs, form, location,
  FAQs, footer, and mobile actions were left unchanged.
- Added a source-contract regression suite covering brand/navigation,
  analytics, image optimization, content grouping, integration scope, motion
  timing, responsive height, and reduced-motion behavior.

## TDD Evidence

1. Added four Task 3 contract tests before production implementation.
   Initial result: 4 failed for the expected missing-component, old-integration,
   and missing-motion reasons.
2. Implemented the header, hero, integration, and CSS.
   Result: targeted suite passed 4/4.
3. Mobile inspection showed the fixed action bar obscuring the next-section
   cue. Added the 560px base-height assertion first; it failed against 620px,
   then passed after the responsive correction.
4. Self-review found the required image alt text was suppressed by an
   `aria-hidden` mask. Added the accessibility assertion first; it failed, then
   passed after removing `aria-hidden`.
5. Final targeted result:
   `1 test file passed, 4 tests passed`.

## Verification

- `npm.cmd test -- components/booking/booking-hero.test.ts`
  - PASS: 1 file, 4 tests.
- `npm.cmd test`
  - PASS: 2 files, 10 tests.
- `npm.cmd run lint`
  - PASS: ESLint exited 0 with no findings.
- `npm.cmd run build`
  - PASS: all five vinext build stages completed.
  - Confirmed build output includes the tutoring, selective preparation, and
    scholarship preparation routes.
- `git diff --cached --check`
  - PASS: no whitespace errors.
- Local server cleanup
  - Port 3001 listener stopped.
  - `task-3-dev-server.log` and `task-3-dev-server.err.log` removed.
  - No matching local log artifacts remained before commit.

## Visual And Motion Review

The supplied 1536x1024 image was inspected at original resolution. It is
face-free, unbranded, right-weighted, and shows coherent hands and study
materials without readable test identity.

All three routes were inspected at 390x844 and 1440x900:

- Full logo remained visible and uncropped.
- Caroline Springs Campus and Lakeview Senior College were visible in the first
  viewport.
- Hero crop retained the writing hand, workbook, notebook, ruler, and red pen
  without revealing a face.
- Primary assessment CTA remained visible without scrolling.
- The proof band was visibly hinted below the hero.
- Document scroll width equaled client width on every inspected route.
- Browser console contained no warnings or errors.
- The image loaded through the local optimizer endpoint
  (`/_vinext/image?...`) and completed successfully.

Computed motion audit confirmed exactly five focal groups:

- Image mask: 760ms with 40ms delay, ending at 800ms.
- Headline line one: 620ms.
- Headline line two: 620ms with 70ms delay, ending at 690ms.
- Support group: 480ms with 220ms delay, ending at 700ms.
- Learning path line: 540ms with 320ms delay, ending at 860ms.

The parsed reduced-motion media rule sets all hero animations to `none` and
forces the learning-path line to `scaleX(1)`.

## Files Changed

- `app/globals.css`
- `components/booking/booking-hero.test.ts`
- `components/booking/booking-hero.tsx`
- `components/booking/booking-landing-page.tsx`
- `components/booking/campus-header.tsx`
- `public/images/booking-hero-academic-momentum.png`

## Self-Review

- **Philosophy alignment: 9/10.** The first viewport is red-led, editorial,
  campus-specific, and restrained rather than promotional or card-heavy.
- **Visual hierarchy: 9/10.** The display headline leads, actions remain clear,
  and the diagonal study image supports rather than competes with the copy.
- **Craft quality: 9/10.** Logo, crop, fixed type sizes, touch targets, focus
  states, responsive geometry, and next-section cue held across target sizes.
- **Functionality: 9/10.** Exact route copy and analytics are preserved, all
  anchors remain usable, and the hero image is optimized and accessible.
- **Originality: 8/10.** The red field, diagonal documentary image, and learning
  path feel distinctive while staying appropriate for an education campus.

## Risks And Concerns

- No blocking concerns.
- Headline line breaks use route-specific word counts tied to the approved
  current copy. Future hero-title edits should revisit those break points.
- The browser surface did not expose reduced-motion emulation. Reduced motion
  was verified through the parsed CSS media rule and automated regression
  contract, while the complete settled state was visually inspected.
- Optimized image delivery was confirmed locally through vinext and the
  production build passed; no external deployment was part of Task 3.

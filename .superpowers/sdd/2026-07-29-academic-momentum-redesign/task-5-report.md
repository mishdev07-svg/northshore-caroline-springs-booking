# Task 5 Report: Conversion And Campus Sections

**Status:** DONE
**Completed:** 2026-07-30
**Branch:** `codex/academic-momentum`
**Workspace:** `C:\Users\devsy\Desktop\northshore-cs\booking-site\.worktrees\academic-momentum`

## Implementation

- Rebuilt the ink assessment band around one white booking form card.
- Preserved the three approved booking steps and added the required
  `booking-step` motion indexes.
- Restyled `BookingForm` with the approved input class, shared `INTERESTS` and
  `Interest` contracts, and Lucide `ArrowRight`, `Check`, and `Phone` icons.
- Added `CampusDetails` to own the full-width location/schedule band, native
  FAQs, red final CTA, complete footer, and fixed mobile actions.
- Kept the campus and schedule surfaces unframed on the ice-blue band.
- Kept FAQ disclosure native and added only 200ms color, opacity, and chevron
  transitions. No disclosure height is animated.
- Reduced `BookingLandingPage` to the approved section orchestrator with small
  local `ProofStrip` and `AssessmentBooking` functions.
- Preserved all approved business facts, links, route rules, form labels,
  field names, and analytics attributes.

## Behavior Freeze Evidence

Before any production edit:

```powershell
git status --short --branch
git diff -- components/booking/booking-form.tsx
```

Result:

- Branch was `codex/academic-momentum`.
- Worktree was clean.
- `booking-form.tsx` diff was empty.

The existing submit block and tracking helpers were normalized to LF and
hashed before implementation:

```text
handleSubmit:
94df7d3151fec11ac4c71398f40610137d1c6418633f671ae23d96a0a99d35af

getFormValue/getTracking/readStoredCampaign:
80f6bff243eb0fcc3d9424da4b319ef02d1c68626e7f99a5e4ba90ee3441f593
```

Both hashes are unchanged after implementation and are enforced by
`conversion-campus.test.ts`.

The frozen handler still contains:

- `POST /api/leads`;
- payload keys `parentName`, `mobile`, `email`, `yearLevel`, `interest`,
  `preferredTime`, `consent`, `website`, `startedAt`, `landingPage`,
  `utmSource`, `utmMedium`, `utmCampaign`, `utmContent`, and `utmTerm`;
- required consent and the `website` anti-spam field;
- URL and `northshore_campaign` session tracking lookup;
- GA `generate_lead`;
- Meta `Lead`;
- conditional Google Ads `send_to`, transaction ID, `event_callback`,
  `event_timeout: 1200`, and the 1300ms fallback;
- `idle -> submitting -> success/error` status transitions;
- `/thank-you` routing.

Final form review:

```powershell
git diff --word-diff=porcelain -- components/booking/booking-form.tsx
```

Filtering that word diff for `/api/leads`, payload fields, status calls,
tracking event names, transaction fields, callback/timeout fields, and
`/thank-you` returned no matches. The diff contains imports, shared typing,
interest option reuse, rendered markup, classes, and approved icons only.

The old `booking-form.tsx` plus `booking-landing-page.tsx` and the new
`booking-form.tsx`, orchestrator, and `campus-details.tsx` were compared for
all `data-track-event`, `data-track-label`, and `data-track-location`
attributes:

```text
old=18 current=18
Compare-Object: no differences
```

`booking-content.ts` has no Task 5 diff. The exact Saturday and Sunday facts,
FAQ copy, proof points, route content, and interest values therefore remain
unchanged.

## TDD Evidence

### RED

Added `conversion-campus.test.ts` and updated the landing boundary assertion
in `booking-hero.test.ts` before production implementation.

Command:

```powershell
npm.cmd test -- components/booking/conversion-campus.test.ts components/booking/booking-hero.test.ts --reporter=dot
```

Expected result:

- 2 failed test files;
- 5 failed tests and 5 passed tests;
- frozen behavior hashes already passed;
- failures identified the missing shared form contract, missing
  `CampusDetails`, missing 200ms FAQ rules, and old landing composition.

### GREEN

After the minimal implementation:

```powershell
npm.cmd test -- components/booking/conversion-campus.test.ts components/booking/booking-hero.test.ts --reporter=dot
```

Result:

- 2 passed test files;
- 10 passed tests;
- exit code 0.

Final focused command:

```powershell
npm.cmd test -- components/booking/conversion-campus.test.ts components/booking/booking-hero.test.ts components/booking/booking-content.test.ts --reporter=dot
```

Result:

- 3 passed test files;
- 16 passed tests;
- exit code 0.

## Final Verification

```powershell
npm.cmd test
npm.cmd run lint
npm.cmd run build
git diff --check
```

Results:

- Full tests: 5 files passed, 22 tests passed.
- Lint: ESLint exited 0 with no findings.
- Build: all five vinext stages completed; all expected app and API routes
  were emitted.
- Whitespace: no errors.
- Build retained vinext's informational route-classification notice.
- Git printed only the existing LF-to-CRLF working-copy notices.

## Local Browser Validation

The app was validated locally at `http://127.0.0.1:3105`.

Desktop, `1440x1000`:

- assessment band rendered as ink with one white form card;
- all three booking steps settled to `visible` with computed opacity `1`;
- ice-blue location/schedule band remained unframed;
- exact Saturday and Sunday facts were visible;
- FAQ, final CTA, and footer composition rendered without overlap.

Mobile, `390x844`:

- no horizontal overflow (`scrollWidth` did not exceed `innerWidth`);
- mobile assessment action landed at `#booking`;
- all three booking steps were visible;
- form fields and CTA fit without horizontal clipping;
- main bottom padding was `80px`;
- fixed action bar height was about `66.7px`;
- at page end the footer bottom remained about 13px above the fixed bar.

FAQ interaction:

- native `<details>` opened successfully;
- first answer text was present and readable;
- answer transition durations were `0.2s, 0.2s`;
- indicator transition duration was `0.2s`;
- indicator rotated to the open state;
- no height or max-height animation exists.

Validation error:

- submitted `Task 5 Validation Check` with mobile `123`;
- API returned `Enter a valid mobile number.`;
- the error alert retained one visible `tel:0403474343` fallback link.

## Local Test Submission

Exactly one successful, clearly non-customer local lead was submitted:

```text
parent_name: TASK 5 LOCAL TEST - DELETE
mobile: 0400000505
email: task5-local-test@example.com
year_level: Year 7
interest: Not sure yet
preferred_time: LOCAL TEST ONLY - DELETE
utm_source: task5_local
utm_medium: codex
utm_campaign: conversion_validation
```

Evidence:

- dev log recorded `POST /api/leads 201 in 181ms`;
- browser route changed to `http://127.0.0.1:3105/thank-you`;
- thank-you page rendered `Thank you. The local team will confirm the next
  step.`;
- local Miniflare D1 stored the row as `id=1`.

Cleanup:

1. Stopped listener PID `38660`.
2. Confirmed port `3105` had no `LISTENING` socket.
3. Selected the local D1 row by `id=1` and
   `task5-local-test@example.com`.
4. Deleted with the additional parent-name guard
   `TASK 5 LOCAL TEST - DELETE`.
5. SQLite returned `changes: 1`.
6. Follow-up count for the ID or email returned `0`.
7. Removed `task-5-dev-server.log` and
   `task-5-dev-server.err.log`.

No customer or production record was created or retained.

## Runtime Limitations

### Analytics Runtime

For local validation only, the dev server was restarted with clearly fake GA,
Google Ads, lead-label, and Meta IDs. The expected `google-tag`,
`campaign-attribution`, `marketing-click-events`, and `meta-pixel` script
elements appeared in the DOM.

Under vinext dev, both available browser surfaces reported `window.gtag`,
`window.fbq`, and `window.dataLayer` as unavailable, so GA, Meta, and the
conditional Google Ads callback could not be observed dynamically. The fake
Meta ID also produced the expected invalid-pixel warning. No real analytics
account received an event.

This is not a source-code ambiguity:

- the complete submit block hash is unchanged;
- the exact GA, Meta, and Google Ads paths remain in that frozen block;
- the form word diff contains no tracking change;
- the behavior contract test enforces the unchanged block;
- all 18 analytics attributes were preserved.

### Loading Label Timing

The successful local API response completed in 181ms. By the time the browser
sampler read the button, the form had already been replaced and routing had
started, so the transient `Sending request...` state was not captured
visually. The exact label remains unchanged and is enforced by the focused
source contract.

## Visual And Accessibility Self-Review

- No section is wrapped in a decorative card.
- The assessment band has one white form card and no nested card surface.
- Campus, schedule, FAQ, and CTA sections are full-width bands.
- All requested icons come from Lucide.
- Form labels, names, required fields, autocomplete values, hidden anti-spam
  field, and error `role="alert"` remain present.
- Consent remains required.
- FAQ disclosure remains native and keyboard operable.
- Focus-visible rings are present on FAQ summaries and action controls.
- Mobile controls meet the existing minimum 44px target; key actions are 48px.
- The fixed mobile bar has reserved page-bottom clearance.
- Text remained readable without overlap at desktop and mobile widths.
- Reduced-motion rules still disable transitions globally.
- No new gradients, decorative orbs, nested cards, fabricated metrics, or
  unsupported claims were introduced.

## Files Changed

- `app/globals.css`
- `components/booking/booking-form.tsx`
- `components/booking/booking-hero.test.ts`
- `components/booking/booking-landing-page.tsx`
- `components/booking/campus-details.tsx`
- `components/booking/conversion-campus.test.ts`
- `.superpowers/sdd/2026-07-29-academic-momentum-redesign/task-5-report.md`

## Concerns

- No blocking implementation concern.
- Runtime analytics dispatch could not be observed under vinext dev; frozen
  source and contract evidence are complete.
- The transient loading label was too brief to sample on the 181ms local
  response; its exact string is contract-tested.

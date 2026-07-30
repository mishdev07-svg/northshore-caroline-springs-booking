# Task 4 Report: Lightweight Scroll Motion And Program Narrative

**Status:** DONE
**Implementation commit:** `57301323aac2e4df3a402527f3cdd157f7b68d10`
**Completed:** 2026-07-30

## Implementation

- Added the typed, capped `getMotionDelay` timing API for program rows,
  program numbers, pathways, path lines, and booking steps.
- Added one client `IntersectionObserver` controller with the specified
  `0.18` threshold and `0px 0px -8% 0px` root margin.
- Added the unframed ice-blue `ProgramPathways` section with:
  - all three existing programs and route rules;
  - masked program numbers;
  - one signal-yellow learning-path rail with two hidden semantic-free
    segments;
  - route-specific pathway copy and CTA;
  - preserved program/pathway href and `data-track-*` contracts.
- Added restrained motion hooks to program rows, program numbers, the two rail
  segments, pathway copy/CTA, and the three booking steps. No general heading
  or paragraph animation was added.
- Added fallback-first CSS. Content is visible by default and becomes pending
  only after the controller enables motion on the document root.
- Added complete reduced-motion CSS that removes opacity, transform,
  clip-path, and transition effects.

## TDD Evidence

### RED

Created `components/booking/motion-config.test.ts` before the production
module and ran:

```powershell
npm.cmd test -- components/booking/motion-config.test.ts
```

Result: expected failure, exit code 1.

- `1 failed` test file
- `0 tests` collected
- Failure: `Cannot find module './motion-config'`

The failure was caused by the intentionally missing production API, not a test
syntax or assertion error.

### GREEN

Added the minimal typed step/cap tables and `getMotionDelay`, then reran the
same command.

Result:

- `1 passed` test file
- `4 passed` tests
- Exit code 0

The brief says "three passing tests" in its expected-result prose, but the
provided test file contains four test cases; all four pass.

## Verification

- `npm.cmd test -- components/booking/motion-config.test.ts components/booking/booking-hero.test.ts`
  - PASS: 2 files, 9 tests.
- `npm.cmd test`
  - PASS: 3 files, 15 tests.
- `npm.cmd run lint`
  - PASS: ESLint exited 0 with no findings.
- `npm.cmd run build`
  - PASS: all five vinext build stages completed.
  - Build output includes the general, tutoring, selective, and scholarship
    routes.
- `git diff --cached --check`
  - PASS: no whitespace errors.
- Source audit
  - Exactly one `IntersectionObserver`.
  - No scroll event listener, parallax, or animation dependency.
- Local server cleanup
  - Port 3104 listener stopped.
  - Temporary Task 4 dev-server logs removed.

## Browser And Contract Review

- General route rendered all three existing program links:
  `/tutoring-caroline-springs`,
  `/selective-school-preparation-caroline-springs`, and
  `/scholarship-preparation-caroline-springs`.
- Selective and scholarship routes rendered no program links, preserving the
  existing variant rule.
- Selective pathway rendered "Build the skills before exam pressure arrives."
  with `href="#booking"`.
- Scholarship pathway rendered "Prepare consistently without outcome
  promises." with `href="#booking"`.
- Pathway and program analytics attributes remained present.
- Program rows, masks, rail segments, pathway groups, and booking steps revealed
  once. A rapid up/down scroll left all previously revealed nodes `visible`,
  with no restart or flicker.
- Booking-step computed delays were `0ms`, `50ms`, and `100ms`.
- The desktop program surface was visually inspected as ice-blue, unframed,
  and legible with one yellow rail.
- At 390x844 the section had no horizontal overflow, text overlap, or clipped
  controls; below-viewport rows remained pending until encountered.
- Browser console inspection returned no warnings or errors.

## Motion Fallback Self-Review

### Masked Elements

Initial browser verification found that fully clipped number targets and
`scaleY(0)` rail targets can have zero effective intersection geometry. Rows
revealed, but the independently observed masks could remain pending.

The controller still uses one observer, but a visible program row now releases
its own number and the first rail segment; a visible pathway releases the
second segment. Retesting confirmed all masks and both rail segments resolve.

### No JavaScript

The server-rendered HTML returned status 200 and contained:

- the full program narrative;
- all three general-route program hrefs;
- the route-specific pathway copy.

The SSR HTML contained neither `data-motion="enabled"` nor
`data-motion-state="pending"`. Default CSS keeps every motion node visible, so
content and focusable links do not wait for client JavaScript.

### Reduced Motion

The controller checks reduced motion before setting pending states and marks
all nodes visible immediately. The browser parsed the reduced-motion rule as:

```css
[data-motion-kind] {
  opacity: 1 !important;
  transform: none !important;
  clip-path: none !important;
  transition: none !important;
}
```

The existing global reduced-motion rules also disable hero animation and smooth
scrolling.

## Files Changed

- `app/globals.css`
- `components/booking/booking-landing-page.tsx`
- `components/booking/motion-config.test.ts`
- `components/booking/motion-config.ts`
- `components/booking/program-pathways.tsx`
- `components/booking/scroll-motion-controller.tsx`

## Concerns

- No blocking concerns.
- The available browser surface did not expose reduced-motion emulation.
  Reduced motion was verified through the parsed media rule, controller branch,
  and fully settled default state rather than an emulated visual run.
- Vinext emitted its existing informational route-classification notice during
  build; the build completed successfully.

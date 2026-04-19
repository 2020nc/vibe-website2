# AGENTS.md

## Project scope
This repository is a Next.js app using TypeScript and Tailwind.
Treat the current workspace as the source of truth.

## Default behavior
- Inspect the repo before editing.
- Prefer small, local changes over broad refactors.
- Preserve the existing architecture, naming, and visual language.
- Do not introduce new dependencies unless explicitly requested.
- Do not change environment variables, secrets, backend wiring, database schema, or API contracts unless explicitly requested.

## Edit policy
- First identify the exact page/component involved.
- State a short plan before making edits.
- Touch the minimum number of files needed.
- Prefer editing existing components instead of creating parallel versions.
- Do not duplicate sections, components, styles, or logic.
- If a request is visual, keep logic/state/validation/submission unchanged unless the task explicitly asks otherwise.

## Validation policy
After changes:
- run `npm run build` if available;
- run `npm run lint` if available;
- report what files were changed;
- report any residual manual checks needed in browser/responsive view.

## Guardrails for this repository
Unless explicitly requested, avoid touching files that may already contain unrelated local work, especially:
- `app/admin/login/page.tsx`
- `app/locatie/page.tsx`
- `app/sarbatori/page.tsx`
- `components/DayAtVibe.tsx`
- `components/HolidayMenu.tsx`
- `components/MenuStarter.tsx`

## Reservation page rule
For tasks about the reservations page, treat `app/rezervari/page.tsx` as the primary entry point first.
If the page imports local reservation-specific components, edit only the smallest relevant surface.

## Styling rules for visual tasks
- Keep the current brand palette and overall tone.
- Prefer Tailwind class edits over structural rewrites.
- Preserve accessibility, keyboard focus, and touch comfort.
- Maintain responsive behavior on mobile, tablet, and desktop.
- Avoid heavy effects, decorative motion, sliders, carousels, or layout churn unless explicitly requested.

## Output format
At the end of each task, return:
1. short summary of what changed;
2. files modified;
3. commands run;
4. result of validation;
5. remaining manual checks.

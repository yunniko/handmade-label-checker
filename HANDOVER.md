# Handover — handmade-label-checker
Last verified: 2026-09-15 at cb46c7e

Free label checklists for handmade soap, cosmetic, and candle sellers. Goal: `GOALS.md` G-001.
Parent initiative: `E:\CLAUDE\projects\svc-lab\`. Charter: `E:\CLAUDE\COMPANY\`.

## Current state

- Built, all four checks green: ESLint clean, 14/14 Vitest unit tests, production build clean (7
  routes, confirms `next@16.3.5`, no known RCE), 7/7 Playwright e2e tests.
- Domain-expert review (federal cosmetic/consumer-product regulatory law) was **not a rubber
  stamp**: found and required fixing 6 blocking issues — a wrong CFR citation (16 CFR
  1500.17(a)(14) doesn't exist, corrected to (a)(13)), an overstated candle lead-wick-ban scope
  (applies only to metal-cored wicks above a 0.06% lead threshold, not "no lead" universally), a
  missing candle wrapper-labeling requirement, a materially misleading "true soap has no federal
  label mandate" claim (it does, under the FPLA/16 CFR 500, including a stricter dual-unit
  net-quantity rule than FDA cosmetics), a missing MoCRA adverse-event contact-info requirement
  (in force since 2024-12-29), and an overbroad rule treating all melt-and-pour soap bases as
  automatically cosmetic — plus several caveat-level fixes. All applied and re-verified — see
  `docs/domain-reference.md` for the full list.
- **Live**: https://handmade-label-checker.svc.julienika.cz — deployed 2026-09-15, all 7 routes
  curl-verified 200 (home, `/soap-cosmetic-label-checklist`, `/candle-label-checklist`,
  `/label-requirements-reference`, `/ads.txt`, `/sitemap.xml`, `/robots.txt`).
- SEO review (curl-based): robots.txt points at sitemap.xml, sitemap.xml lists all 4 real routes,
  title/description/OG/Twitter-card tags present and unique per page, FAQPage JSON-LD present on
  both tool pages. No canonical `<link>` tag — pre-existing template-wide gap present on every
  prior service, not a new regression.
- Hub page (`julienika-home`) and sitemap index updated, redeployed, and curl-verified live.
- Manual security checklist clean: no `.env`/secrets present, `.gitignore` covers `.env`/
  `.env.local`, no server routes/endpoints, only the shared escaped `JsonLd` helper uses
  `dangerouslySetInnerHTML`, no uploads, no `eval`/dynamic `import()`, no third-party network
  calls beyond AdSense.
- `RESUME.md` is now stale (service shipped) but could not be deleted — `rm` is blocked in this
  session's sandbox, same limitation noted on every prior service; left for a future session.

## How things fit together

- `lib/label-data.ts` — every sourced CPSC/FDA/MoCRA checklist item and citation, with retrieval
  dates in the header comment.
- `lib/soap-cosmetic-rules.ts` / `lib/candle-label-rules.ts` — pure classification/checklist logic,
  framework-free, unit-tested without booting Next.
- Three pages: `/soap-cosmetic-label-checklist`, `/candle-label-checklist`,
  `/label-requirements-reference`.
- No database, no accounts, no file upload, no server routes — fully static/client-side.

## Rules in force

- Deliberately scoped as an informational checklist, not a legal-text generator or compliance
  guarantee — don't add a feature implying certification; every page keeps its disclaimer.
- The candle checklist keeps the one hard federal requirement (lead-free wick) structurally
  distinct from the voluntary ASTM F2058-derived safety themes (`isVoluntaryTheme` in
  `lib/label-data.ts`) — don't collapse that distinction.
- The exact ASTM F2058 text is a paid standard, not sourced — the candle checklist paraphrases and
  says so explicitly; don't replace with invented "exact" wording.
- Every citation in `lib/label-data.ts` traces to a primary federal source — see that file's header
  before changing any claim.
- `npm install`/`npm ci` need `--legacy-peer-deps` (portfolio-wide npm/arborist workaround).

## Next steps and open questions

- **COMPANY-doc reconciliation needed** (this session cannot edit `COMPANY\**`): add
  `handmade-label-checker` to `COMPANY\INFRASTRUCTURE_DEPLOY.md`'s port registry (`127.0.0.1:30240`,
  no DB, domain `handmade-label-checker.svc.julienika.cz`) and `COMPANY\GOALS.md`'s project index.
- Jewelry/bead-and-wire labeling (backlog idea #28) was deprioritized as too calculator-shaped —
  see svc-lab's `GOALS.md`.

## Deploy log

| Date | Commit | What changed | How verified |
|---|---|---|---|
| 2026-09-15 | cb46c7e | Initial deploy, port 30240 | `deploy-service.ps1` verified live HTTPS 200; independently curl-confirmed all 7 routes and that julienika.cz + natural-dye-mordant-calculator were unaffected |

## Decisions

`docs/decisions/README.md` (D001).

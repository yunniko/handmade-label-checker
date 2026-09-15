# Goals — handmade-label-checker

Owner writes goals here; The Company plans, executes, and logs against them.
Statuses: `DRAFT` · `ACTIVE` · `BLOCKED` · `DONE`.
Parent initiative: `E:\CLAUDE\projects\svc-lab\` (same milestone-gate waiver
and standing deploy pre-approval apply here). Template/numbering
conventions in `E:\CLAUDE\COMPANY\GOALS.md`.

## Active goals

### G-001 · Handmade soap/cosmetic/candle label checklist — ACTIVE
- **What:** Three tools: a soap/cosmetic classifier + label checklist
  (`/soap-cosmetic-label-checklist` — CPSC true-soap test, then a matching
  FDA-cosmetic or true-soap checklist), a candle label checklist
  (`/candle-label-checklist` — one hard federal requirement plus voluntary
  safety themes, kept visibly distinct), and a sourced reference page
  (`/label-requirements-reference`). No database, no accounts.
- **Why:** svc-lab's backlog had 0 clean unshipped ideas, triggering the
  research-pass rule; the research pass (2026-09-15) confirmed via direct
  WebFetch of fda.gov and cpsc.gov that no dedicated interactive tool exists
  for this checklist, with a built-in audience from soap-lye-calculator's
  and candle-fragrance-calculator's own users. See svc-lab's `GOALS.md`
  backlog idea #27 for the full signal writeup and the harm-risk caution
  this idea was explicitly flagged with — mitigated by scoping this as a
  checklist (not generated legal text), citing only primary-source federal
  rules, and an explicit disclaimer on every page.
- **Acceptance criteria:** every regulatory claim sourced from a primary
  federal source (FDA.gov, CPSC.gov, eCFR) — not memory or a secondary
  blog; classification logic and checklist-evaluation logic unit-tested;
  e2e-tested for all three tools; domain-expert-reviewed for regulatory
  accuracy before shipping, specifically the true-soap/cosmetic boundary
  and the candle voluntary-vs-federal distinction; live and reachable over
  HTTPS; sitemap present.
- **Constraints:** No database, no accounts, no paid dependencies. Must not
  claim to generate legally-compliant label text or guarantee compliance —
  informational checklist only, disclaimer required on every tool page.

**Milestones:**
- [x] M1 — Build: `lib/label-data.ts` (sourced FDA/CPSC/candle-safety data),
      `lib/soap-cosmetic-rules.ts` and `lib/candle-label-rules.ts` (pure
      classification/checklist logic), three tool pages. 14 unit tests, 7
      e2e tests, ESLint clean, production build clean (7 routes).
- [x] M1b — Domain-expert review (federal cosmetic/consumer-product
      regulatory accuracy). Not a rubber stamp: found and fixed 6 blocking
      issues (wrong CFR citation, overstated candle wick-ban scope, a
      missing candle wrapper-labeling requirement, a misleading "true soap
      has no federal mandate" claim, a missing MoCRA contact-info
      requirement, an overbroad melt-and-pour rule) plus caveat-level fixes.
      All applied, re-verified green. See `docs/domain-reference.md`.
- [ ] M2 — Ship: security review, push, deploy, hub page + sitemap index
      update. **BLOCKED: session budget** — see `RESUME.md`.
- [ ] M3 — Monetization once AdSense approves this domain (already wired
      via the shared `ADSENSE_PUBLISHER_ID` env var).

**Progress log** (newest first):
- 2026-09-15 — Goal created, M1 built (svc-lab daily automation, unattended
  run). Scaffolded from `svc-lab/template` via Read/Write per file (`cp -r`
  hit the same non-bypassable Bash approval gate documented on every prior
  service's own log). Sourced the true-soap test and FDA cosmetic labeling
  checklist via direct WebFetch of cpsc.gov/FAQ/Soap and fda.gov's "Summary
  of Cosmetics Labeling Requirements"; candle safety themes sourced via
  WebSearch/WebFetch of candles.org and secondary summaries of ASTM F2058,
  with an explicit caveat that the verbatim ASTM text is a paid standard
  not available to quote — see `lib/label-data.ts`'s header comment.

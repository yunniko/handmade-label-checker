# handmade-label-checker

> **SUSPENDED (Owner, 2026-09-27)** — part of the svc-lab family, suspended because it did not work out as expected.
> No new work; security upkeep only while anything of it is live. Treat its code, formulas and
> decisions as a **lower-reliability reference**: they may or may not still work, so re-verify before
> reusing anything. Rules: `E:\CLAUDE\COMPANY\GOALS.md` → "Suspended projects".

Free label checklists for handmade soap, cosmetic, and candle sellers. Three tools:

- **Soap & cosmetic label checklist** — answer four questions to classify a product as true soap
  (CPSC-regulated) or a cosmetic (FDA-regulated) using the CPSC's own three-part test, then check
  a label draft against the matching sourced checklist.
- **Candle label checklist** — the one hard federal requirement (lead-free wick) plus the
  well-documented voluntary candle safety-warning themes, clearly separated from each other.
- **Label requirements reference** — every checklist item in one place, with its citation.

Deliberately scoped as an informational checklist, not a legal-text generator or a compliance
guarantee — every page carries a "not legal advice, verify current requirements" disclaimer.
Everything runs client-side in the browser — no upload, no account, no database.

## Run locally

```
npm install --legacy-peer-deps
npm run dev
```

## Test

```
npx eslint .
npm run build
npx vitest run
npx playwright test
```

See `HANDOVER.md` for current state and `docs/decisions/` for the record of significant decisions.
Parent initiative: `E:\CLAUDE\projects\svc-lab\`. Company-wide standards: `E:\CLAUDE\COMPANY\`.

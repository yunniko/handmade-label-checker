# handmade-label-checker — project conventions

Read `HANDOVER.md` first: current state, decision record, next steps. Goal in `GOALS.md` (G-001).
Parent initiative in `E:\CLAUDE\projects\svc-lab\`; company-wide standards in `E:\CLAUDE\COMPANY\`.

- Stack: Next.js App Router, TypeScript, Tailwind. No database, no auth, no accounts, no file
  upload — every checklist runs client-side from checkbox inputs.
- All regulatory data (CPSC true-soap test, FDA 21 CFR 701/740 checklist items, candle safety
  items) lives in `lib/label-data.ts` with a header comment citing every primary source and its
  retrieval date — see that file before changing any claim or citation.
- Classification/checklist logic is in `lib/soap-cosmetic-rules.ts` and `lib/candle-label-rules.ts`,
  kept pure and framework-free so it's unit-testable without booting Next.
- This project is deliberately scoped as an **informational checklist, not a legal-text generator
  or compliance guarantee** — a conscious risk-mitigation choice given the regulatory domain (see
  svc-lab's `GOALS.md` backlog idea #27 for the full reasoning). Don't add a feature that would
  make the tool sound like it certifies compliance; every tool page needs its disclaimer.
- The candle checklist keeps the one hard federal requirement (lead-free wick) visually and
  structurally distinct from the voluntary ASTM F2058-derived safety themes (`isVoluntaryTheme` in
  `lib/label-data.ts`) — don't collapse that distinction into a single pass/fail score.
- The exact verbatim ASTM F2058 text is a paid standard and was not available to source — the
  candle checklist paraphrases the safety themes and says so explicitly. Don't replace the
  paraphrase with invented "exact" wording.
- `npm install`/`npm ci` need `--legacy-peer-deps` (a live npm/arborist bug, not specific to this
  project — see `svc-lab/HANDOVER.md`).
- Two test layers: `npx vitest run` (`tests/unit/*.test.ts` — pure classification/checklist logic)
  and `npx playwright test` (`tests/e2e/*.spec.ts` — real checkbox-driven flows for all three
  tools). Both must pass, plus `npx eslint .` and `npm run build`, before calling a change done.
- See `E:\CLAUDE\COMPANY\INFRASTRUCTURE_DEPLOY.md` for the redeploy command once live.

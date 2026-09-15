# Resume — handmade-label-checker

**Status: built, domain-expert-reviewed, fixes applied and re-verified. NOT pushed, NOT deployed.**
Stopping here on session budget — see svc-lab/GOALS.md's `BLOCKED: session budget` entry.

## Done and verified this run
- Full 3-tool build: soap/cosmetic classifier + checklist, candle checklist, sourced reference page.
- `lib/label-data.ts`, `lib/soap-cosmetic-rules.ts`, `lib/candle-label-rules.ts` — pure, tested.
- Domain-expert review (federal cosmetic/consumer-product regulatory law) was NOT a rubber stamp:
  found 6 blocking issues (wrong CFR citation, overstated candle wick-ban scope, a missing candle
  wrapper-labeling requirement, a materially misleading "true soap has no federal mandate" claim,
  a missing MoCRA contact-info requirement, an overbroad melt-and-pour rule) plus several caveat-
  level fixes — ALL APPLIED. See `docs/domain-reference.md` for the full list.
- Re-verified green after every fix: `npx eslint .` clean, `npx vitest run` 14/14, `npm run build`
  clean (7 routes, confirms next@16.3.5), `npx playwright test` 7/7.

## Not yet done
1. **Security review** (manual checklist per svc-lab's playbook step 6a-e) — not yet run.
2. `git init`, repo-local `git config user.email 12hv89@gmail.com`, `git add -A`, commit.
3. Push via `powershell -File E:/CLAUDE/projects/svc-lab/automation/scripts/init-repo.ps1 -Name handmade-label-checker -SourceDir E:/CLAUDE/projects/handmade-label-checker`
4. Pick/confirm a free port — this project's `docker-compose.yml` already has `30240` and
   `playwright.config.ts` already has `30241` (next free slots after natural-dye-mordant-calculator's
   30230/30231) — **re-verify live freeness**, the registry may be stale.
5. Deploy via `powershell -File E:/CLAUDE/projects/svc-lab/automation/scripts/deploy-service.ps1 -Name handmade-label-checker -Port 30240 -Domain handmade-label-checker.svc.julienika.cz`
6. SEO review (curl-based) once live.
7. Hub page (`julienika-home`) + sitemap index update, redeploy.
8. `svc-lab/GOALS.md`: mark backlog idea #27 Shipped, add shipped-services table row, note
   COMPANY-doc reconciliation (port 30240, no DB, domain `handmade-label-checker.svc.julienika.cz`).
9. Write final `HANDOVER.md` (current one is a placeholder-free draft but not yet reflecting a live
   deploy — regenerate once deployed, per STANDARDS.md's snapshot rule).
10. Delete this file once shipped.

## Not yet done — HANDOVER.md
No `HANDOVER.md` has been written yet for this project. Write one before/at ship time following
the exact structure used by natural-dye-mordant-calculator's own `HANDOVER.md`.

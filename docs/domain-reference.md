# Domain reference — U.S. federal labeling law for handmade soap/cosmetics/candles

This documents what changed as a direct result of a 2026-09-15 domain-expert review, not a
transcript of the review itself. The review was explicitly not a rubber stamp — see the findings
below. Full agent output is not reproduced here; ask a future session to re-run the review if the
raw findings are needed again.

## Fix-required findings, all applied

1. **Wrong CFR citation for the candle lead-wick ban**: every reference said `16 CFR
   1500.17(a)(14)`, which does not exist — the correct paragraph is `(a)(13)`. Fixed throughout
   `lib/label-data.ts`.
2. **Overstated scope of the lead-wick ban**: the rule bans only *metal-cored* wicks with lead
   content above 0.06% of the metal core's weight — nonmetal-cored wicks (cotton, paper, wood) are
   exempt entirely. The checklist previously said "wick contains no lead core" as if it applied
   universally. Fixed: `wick-lead-limit` item now states the actual scope and threshold.
3. **Missing the one real label statement the candle rule requires**: candles using a metal-cored
   wick must have an outer-wrapper statement "Conforms to 16 CFR 1500.17(a)(13)" and a General
   Certificate of Conformity on file. Added as a new `wrapper-conformance-statement` item.
4. **True soap was told it has no federal label mandate — it does.** True soap is a general
   consumer commodity under the Fair Packaging and Labeling Act (FTC, 16 CFR Part 500): identity
   statement, net quantity in BOTH avoirdupois and metric units (16 CFR 500.8 — stricter than the
   FDA cosmetic rule, where metric is optional), and manufacturer name/address are all federally
   required. `TRUE_SOAP_LABEL_NOTES` was rewritten from three non-mandate "notes" into a real
   FPLA-based checklist.
5. **Missing MoCRA contact-information requirement**: every cosmetic label must carry a domestic
   address/phone/electronic contact for adverse-event reports, in force since 2024-12-29 (21 U.S.C.
   364e(a)). Added as `mocra-contact-info` to `COSMETIC_LABEL_CHECKLIST`.
6. **Melt-and-pour bases were told they're always cosmetic**: many melt-and-pour bases are genuine
   saponified soap; the composition test is about the finished product, not who did the
   saponifying. Reworded the classifier's reasoning text and the UI question in
   `lib/soap-cosmetic-rules.ts` / `app/_components/soap-cosmetic-tool.tsx` to say so, rather than
   asserting melt-and-pour is always a cosmetic.

## Caveats applied (not wrong, but needed a note or fix)

- 21 CFR 740 Subpart B has six warning categories, not three — reworded the `special-warning` item
  to say "three of six" and name all six.
- MoCRA's ingredient-driven reclassification risk (from the source comment) is now visible to the
  user via a new true-soap checklist item and a candle/soap-page FAQ entry, not just a code comment.
- Fixed the `identity` item's citation from 21 CFR 701.10 alone to "701.10 and 701.11" (701.11 is
  the actual identity-labeling section; 701.10 defines the panel it goes on).
- Noted the 701.12(b) exception allowing street address to be omitted if listed in a current city
  directory.
- Added the fragrance/flavor and trade-secret ("and other ingredients") declaration exemptions to
  the ingredient-order item.
- Softened the "type size commensurate with container" line with the actual 701.13(i) scale.
- Reworded the true-soap criteria sourcing to cite 21 CFR 701.20 as the primary regulation, with
  CPSC's FAQ noted as a restatement.
- Fixed a latent UI bug where the candle "missing requirement" message hardcoded a single
  lead-wick sentence — now generic across however many federal-requirement items are missing
  (relevant now that there are two).
- Softened the "every item checked off" success messages on both tools to say the checklist is not
  exhaustive, rather than implying completeness.

## Not applied — flagged as open, lower stakes

- Whether FTC/FPLA labeling explicitly applies to packaged candles (by analogy to true soap) —
  the reviewer reasoned from the general "consumer commodity not regulated by FDA" principle but
  found no FTC document naming candles specifically. Not added without stronger sourcing.
- The exact MoCRA small-business exemption threshold (~$1M average annual sales) is sourced from
  secondary (law-firm/consultancy) summaries, not FDA's own page directly — presented with that
  caveat in the `mocra-scope-note` item rather than stated as a hard figure.
- The fragrance-allergen disclosure rule under MoCRA is a proposed rule with a moving compliance
  date — deliberately not added as a checklist item since its final content/date isn't settled.
- State/local labeling rules (e.g. California Prop 65) are out of scope — the site's disclaimer
  says to verify locally, which is the limit of what a federal-only tool can respectably claim.
- Whether the six voluntary candle-safety themes actually match ASTM F2058's own required content
  could not be verified by either the build or the review pass — the standard is paywalled. The
  disclosure of this gap (in `lib/label-data.ts`'s header comment and the candle page's own FAQ) is
  the mitigation, not a claim of verified accuracy.

## Sources

- 21 CFR 701.20, 21 CFR Part 701 Subpart B, 21 CFR Part 740 Subpart B — Cornell LII / govinfo CFR
  text (eCFR.gov was unreachable during this review — redirected to an "unblock" page on every
  request; govinfo's CFR XML endpoints worked reliably as an alternative).
- 21 U.S.C. 364e(a) (MoCRA contact-info requirement).
- 16 CFR 1500.17(a)(13) and the 2003 Federal Register final rule on metal-cored candlewicks.
- 16 CFR 500.8 and the FTC's Fair Packaging and Labeling Act regulations.
- FDA, "Summary of Cosmetics Labeling Requirements"; FDA's MoCRA guidance page.
- CPSC, "Soap" FAQ; CPSC, "Business Guidance — Candles."
- National Candle Association, "Understanding Safety Standards."

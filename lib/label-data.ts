// Sourced reference data for handmade soap/cosmetic/candle label checklists.
//
// Sources (retrieved 2026-09-15, verified against primary text via a
// domain-expert review pass the same day — see docs/domain-reference.md):
// - 21 CFR 701.20 (the actual FDA regulation behind the "true soap"
//   exclusion — CPSC's FAQ below is a restatement of it, not the primary
//   source) and 21 CFR Part 701 Subpart B (cosmetic label elements).
// - 21 CFR Part 740 Subpart B (six category-specific required warnings).
// - 21 U.S.C. 364e(a) — MoCRA's mandatory domestic contact-information
//   requirement, in force since 2024-12-29.
// - CPSC, "Soap" FAQ: https://www.cpsc.gov/FAQ/Soap
// - FDA, "Summary of Cosmetics Labeling Requirements":
//   https://www.fda.gov/cosmetics/cosmetics-labeling-regulations/summary-cosmetics-labeling-requirements
// - Fair Packaging and Labeling Act (15 U.S.C. 1451-1461) and 16 CFR Part
//   500 (FTC) — the federal labeling mandate that DOES apply to true soap
//   as a general consumer commodity, including 16 CFR 500.8's dual
//   avoirdupois+metric net-quantity requirement.
// - 16 CFR 1500.17(a)(13), Federal Hazardous Substances Act, and CPSC's
//   "Business Guidance — Candles" page (the metal-cored-wick lead limit,
//   scope, and the wrapper-conformance-statement/certificate obligations).
// - National Candle Association, "Understanding Safety Standards" (the
//   voluntary ASTM F2058 candle warning-label themes).
//
// Explicit limits on this data:
// - The exact verbatim wording of ASTM F2058/F2417 is inside a paid
//   standard document that was not available to fetch. The voluntary
//   safety THEMES below are well documented secondhand, but this file does
//   NOT claim to reproduce ASTM's verbatim legal text.
// - MoCRA's fragrance-allergen disclosure rule is a proposed rule, not yet
//   in force as of this writing — not included as a checklist item because
//   its final content/date isn't settled; see the FAQ note instead.
// - This is a federal-law summary, not a substitute for state/local rules
//   or professional advice — every page says so.

export const SOAP_LABEL_CFR = "21 CFR 701 and 21 CFR 740";

export const TRUE_SOAP_CRITERIA = [
  {
    id: "composition",
    label:
      "The bulk of the nonvolatile matter is an alkali salt of fatty acids (made by combining fats/oils with an alkali such as lye)",
    source: "21 CFR 701.20(a)(1), restated by CPSC as part 1 of its 3-part true-soap test",
  },
  {
    id: "cleaning-action",
    label:
      "The product's detergent/cleaning action comes from those alkali-fatty-acid compounds themselves, not from added synthetic detergents",
    source: "21 CFR 701.20(a)(1), restated by CPSC as part 2 of its 3-part true-soap test",
  },
  {
    id: "labeling-claims",
    label:
      "The product is labeled, sold, and represented solely as soap for cleansing — no claims about moisturizing, deodorizing, treating a skin condition (e.g. acne, eczema), or killing germs",
    source: "21 CFR 701.20(a)(2), restated by CPSC as part 3 of its 3-part true-soap test",
  },
] as const;

export type CosmeticChecklistItem = {
  id: string;
  label: string;
  detail: string;
  citation: string;
};

// 21 CFR Part 701 Subpart B and Part 740 Subpart B, as verified against
// Cornell LII / govinfo primary text (a 2026-09-15 domain-expert review
// found and corrected several citation/completeness gaps from the initial
// FDA-summary-only draft — see docs/domain-reference.md).
export const COSMETIC_LABEL_CHECKLIST: CosmeticChecklistItem[] = [
  {
    id: "identity",
    label: "Product identity statement",
    detail:
      "The label states what the product is (e.g. \"moisturizing bar soap\", \"body lotion\") on the principal display panel — the panel most likely seen at purchase.",
    citation: "21 CFR 701.10 (principal display panel) and 701.11 (identity labeling)",
  },
  {
    id: "net-quantity",
    label: "Net quantity of contents, correct units and placement",
    detail:
      "Solid/semisolid products: stated in avoirdupois ounces and pounds. Liquids: U.S. fluid ounces, pints, quarts, or gallons. Metric units may additionally appear (optional for FDA cosmetics — true soap's FPLA rule is different, see the true-soap checklist). Placed in the bottom area of the principal display panel, parallel to the base, in type size that scales with container size (roughly 1/16 inch minimum on a small package, larger on bigger ones).",
    citation: "21 CFR 701.13, including the 701.13(i) type-size scale and 701.13(r) optional metric",
  },
  {
    id: "ingredient-order",
    label: "Ingredients listed in descending order of predominance",
    detail:
      "Ingredients are listed by their common/usual (FDA-recognized) names, generally most-to-least by weight. Color additives and ingredients present at 1% or less may be listed in any order after the others. Fragrance or flavor can be declared simply as \"fragrance\"/\"flavor\"; a genuine trade-secret ingredient may be listed as \"and other ingredients.\"",
    citation: "21 CFR 701.3",
  },
  {
    id: "ingredient-conspicuous",
    label: "Ingredient declaration is conspicuous and legible",
    detail:
      "Placed on any information panel so it is likely to be read at purchase, in a minimum type size (about 1/16 inch tall, or 1/32 inch if the total label area is under 12 square inches).",
    citation: "21 CFR 701.3",
  },
  {
    id: "name-address",
    label: "Manufacturer, packer, or distributor name and address",
    detail:
      "Name and street address, city, state, and ZIP code of the manufacturer, packer, or distributor (the street address may be omitted if the firm is listed in a current city or telephone directory). If the party named did not make the product, a qualifying phrase is required (e.g. \"Distributed by\" or \"Manufactured for\").",
    citation: "21 CFR 701.12",
  },
  {
    id: "mocra-contact-info",
    label: "Domestic contact information for adverse-event reports",
    detail:
      "A domestic address, domestic phone number, or electronic contact information (a website is acceptable) through which you can receive adverse event reports. This has been a federal requirement for every cosmetic label since December 29, 2024 — it is separate from, and in addition to, the manufacturer/distributor name-and-address item above.",
    citation: "21 U.S.C. 364e(a) (MoCRA), in force since 2024-12-29",
  },
  {
    id: "language-conspicuousness",
    label: "English language, prominent and conspicuous",
    detail:
      "All required label statements are in English and presented with enough prominence that an ordinary consumer is likely to notice and read them under customary shopping conditions.",
    citation: "21 CFR 701.2",
  },
  {
    id: "country-of-origin",
    label: "Country of origin (imported products only)",
    detail:
      "If the product is imported, the label states the English name of the country of origin.",
    citation: "Tariff Act of 1930, 19 U.S.C. 1304",
  },
  {
    id: "special-warning",
    label: "Category-specific required warning, if applicable",
    detail:
      "Three of the six categories FDA calls out by name in 21 CFR Part 740 Subpart B are self-pressurized (aerosol) cosmetics, feminine deodorant sprays, and children's bubble bath; the other three are foaming detergent bath products, coal tar hair dyes, and suntanning preparations without a sunscreen. A product whose safety has not been adequately substantiated must carry: \"Warning — The safety of this product has not been determined.\" This checklist flags that category-specific warnings exist; it does not attempt to reproduce every category's exact required wording — check 21 CFR 740 directly for the verbatim text your product needs.",
    citation: "21 CFR Part 740 Subpart B",
  },
  {
    id: "mocra-scope-note",
    label: "MoCRA obligations this checklist does not cover",
    detail:
      "MoCRA (2022) also introduced facility registration, product listing, and safety-substantiation requirements. A small business under roughly $1 million in average annual U.S. cosmetic sales may be exempt from registration/listing — but that exemption does NOT cover labeling or safety substantiation. This checklist covers label content only; check FDA's MoCRA page for the registration/listing/substantiation rules separately.",
    citation: "MoCRA (2022); FDA's MoCRA guidance page for current exemption thresholds",
  },
];

// True soap is generally exempt from FDA's cosmetic-ingredient-declaration
// rule (21 CFR 701), but — corrected after the 2026-09-15 domain-expert
// review — it is NOT federally unregulated: as a general consumer
// commodity outside FDA's cosmetic rules, it falls under the Fair
// Packaging and Labeling Act, administered by the FTC (16 CFR Part 500),
// which does mandate an identity statement, a net-quantity statement, and
// manufacturer name/address. This list was previously framed as "not a
// federal mandate" for all three of those — that framing was wrong and has
// been replaced.
export const TRUE_SOAP_LABEL_NOTES: CosmeticChecklistItem[] = [
  {
    id: "identity",
    label: "Statement of identity (e.g. \"soap\")",
    detail:
      "True soap is a general consumer commodity outside FDA's cosmetic rules, but it is federally required to carry a statement of identity under the Fair Packaging and Labeling Act.",
    citation: "FPLA, 15 U.S.C. 1451-1461, administered by the FTC under 16 CFR Part 500",
  },
  {
    id: "net-quantity-dual-units",
    label: "Net quantity of contents, in BOTH avoirdupois AND metric units",
    detail:
      "Unlike the FDA cosmetic rule (where metric is optional), the FTC's rule for general consumer commodities requires BOTH avoirdupois (pound/ounce) AND metric (kilogram/gram) units to appear.",
    citation: "16 CFR 500.8",
  },
  {
    id: "name-address",
    label: "Manufacturer, packer, or distributor name and address",
    detail: "Name and place of business of the manufacturer, packer, or distributor.",
    citation: "FPLA, 16 CFR Part 500",
  },
  {
    id: "not-fda-cosmetic-ingredient-rule",
    label: "Not subject to FDA's detailed cosmetic ingredient-declaration format",
    detail:
      "The FDA's specific 21 CFR 701.3 ingredient-order/format rule does not federally apply to true soap the way it does to a cosmetic — but any cosmetic-type ingredient or claim can still pull the product into FDA cosmetic jurisdiction under MoCRA (2022), even without an explicit claim. If in doubt, re-check the classifier above.",
    citation: "21 CFR 701.20; MoCRA (2022), per CPSC's own Soap FAQ",
  },
  {
    id: "voluntary-ingredient-list",
    label: "Listing ingredients anyway is still common best practice",
    detail:
      "Many true-soap sellers voluntarily list ingredients for allergen transparency and consumer trust, even without the FDA cosmetic format mandate.",
    citation: "Industry best practice, not a specific federal mandate",
  },
  {
    id: "other-layers",
    label: "Marketplace and state/local rules may still apply",
    detail:
      "Selling platforms (e.g. Etsy) and some state or local jurisdictions impose their own labeling rules independent of this federal split. Check your specific marketplace's seller policies and your state's regulations.",
    citation: "Not a federal citation — verify locally",
  },
];

export type CandleChecklistItem = {
  id: string;
  label: string;
  detail: string;
  citation: string;
  isVoluntaryTheme: boolean;
};

export const CANDLE_LABEL_CHECKLIST: CandleChecklistItem[] = [
  {
    id: "wick-lead-limit",
    label: "Wick is nonmetal-cored, or (if metal-cored) its lead content is at or below the legal limit",
    detail:
      "The federal ban applies only to METAL-CORED wicks with a lead content above 0.06% of the metal core's weight — nonmetal-cored wicks (cotton, paper, wood) are exempt from this specific rule entirely. Confirm with your wick supplier which kind you have, and if metal-cored, get their lead-content confirmation.",
    citation: "16 CFR 1500.17(a)(13), Federal Hazardous Substances Act (effective for candles made/imported on or after 2003-10-15)",
    isVoluntaryTheme: false,
  },
  {
    id: "wrapper-conformance-statement",
    label: "If using a metal-cored wick: outer wrapper states conformance, and a certificate is on file",
    detail:
      "Only applies to candles using a metal-cored wick (nonmetal-cored-wick candles are exempt from this item). The product's outer shipping wrapper must state \"Conforms to 16 CFR 1500.17(a)(13),\" and the manufacturer/importer must issue a General Certificate of Conformity citing that section.",
    citation: "16 CFR 1500.17(a)(13); CPSC \"Business Guidance — Candles\"",
    isVoluntaryTheme: false,
  },
  {
    id: "burn-within-sight",
    label: "\"Never leave a burning candle unattended\" warning",
    detail:
      "Never leave a burning candle unattended, and always burn within sight.",
    citation:
      "Theme from the voluntary ASTM F2058 candle warning-label standard (CPSC/ASTM/National Candle Association, 2007) — this checklist paraphrases the theme, not ASTM's verbatim copyrighted text; consult ASTM F2058 directly or the NCA's member labeling resources for exact compliant wording. Voluntary does not mean optional in practice — these standards are commonly used as the benchmark in product-liability and CPSC hazard analysis.",
    isVoluntaryTheme: true,
  },
  {
    id: "away-from-flammables",
    label: "\"Keep away from things that can catch fire\" warning",
    detail:
      "Keep burning candles well away from curtains, paper, furniture, and anything else that could catch fire, and burn on a stable, heat-resistant surface.",
    citation:
      "Theme from the voluntary ASTM F2058 candle warning-label standard — paraphrased, not verbatim.",
    isVoluntaryTheme: true,
  },
  {
    id: "away-from-children-pets",
    label: "\"Keep out of reach of children and pets\" warning",
    detail: "Keep burning candles, and matches/lighters, out of reach of children and pets.",
    citation:
      "Theme from the voluntary ASTM F2058 candle warning-label standard — paraphrased, not verbatim.",
    isVoluntaryTheme: true,
  },
  {
    id: "trim-wick",
    label: "\"Trim wick to 1/4 inch before lighting\" guidance",
    detail:
      "A long or untrimmed wick produces a larger flame, more soot, and a higher risk of the flame reaching container walls — trimming to about 1/4 inch before each burn is standard industry guidance.",
    citation: "Widely published industry practice (e.g. National Candle Association guidance) — not independently confirmed as part of ASTM F2058's own required text",
    isVoluntaryTheme: true,
  },
  {
    id: "discard-stub",
    label: "\"Stop burning with roughly 1/2 inch of wax remaining\" guidance",
    detail:
      "Burning a candle down too far lets the flame get close to the container or holder, which can overheat glass or ignite the base — stopping with a small amount of wax left is standard guidance, not a specific legal figure.",
    citation: "Widely published industry practice — treat the exact inch figure as a rule of thumb, not a regulation; not independently confirmed as part of ASTM F2058's own required text",
    isVoluntaryTheme: true,
  },
];

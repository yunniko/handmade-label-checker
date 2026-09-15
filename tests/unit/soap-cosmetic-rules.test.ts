import { describe, expect, it } from "vitest";
import {
  classifySoapProduct,
  evaluateLabelChecklist,
  getLabelChecklistFor,
} from "../../lib/soap-cosmetic-rules";
import { COSMETIC_LABEL_CHECKLIST, TRUE_SOAP_LABEL_NOTES } from "../../lib/label-data";

describe("classifySoapProduct", () => {
  it("classifies a plain saponified bar with no claims and no synthetic detergents as true soap", () => {
    const result = classifySoapProduct({
      saponifiedFromFatsAndLye: true,
      containsAddedSyntheticDetergents: false,
      labeledSolelyAsSoapForCleansing: true,
      hasCosmeticClaims: false,
    });
    expect(result.classification).toBe("true-soap");
    expect(result.reasons.join(" ")).toMatch(/all three parts/i);
  });

  it("classifies a non-saponified (syndet/melt-and-pour) bar as a cosmetic regardless of other answers", () => {
    const result = classifySoapProduct({
      saponifiedFromFatsAndLye: false,
      containsAddedSyntheticDetergents: false,
      labeledSolelyAsSoapForCleansing: true,
      hasCosmeticClaims: false,
    });
    expect(result.classification).toBe("cosmetic");
    expect(result.reasons.some((r) => /melt-and-pour/i.test(r))).toBe(true);
  });

  it("classifies a saponified bar marketed with a moisturizing claim as a cosmetic", () => {
    const result = classifySoapProduct({
      saponifiedFromFatsAndLye: true,
      containsAddedSyntheticDetergents: false,
      labeledSolelyAsSoapForCleansing: false,
      hasCosmeticClaims: true,
    });
    expect(result.classification).toBe("cosmetic");
    expect(result.reasons.some((r) => /cosmetic-type claim/i.test(r))).toBe(true);
  });

  it("treats an otherwise-true-soap bar with added synthetic detergents as borderline, not self-certified", () => {
    const result = classifySoapProduct({
      saponifiedFromFatsAndLye: true,
      containsAddedSyntheticDetergents: true,
      labeledSolelyAsSoapForCleansing: true,
      hasCosmeticClaims: false,
    });
    expect(result.classification).toBe("borderline");
    expect(result.reasons.some((r) => /contact the FDA/i.test(r))).toBe(true);
  });

  it("classifies as cosmetic when not labeled/sold solely as soap, even without an explicit cosmetic claim", () => {
    const result = classifySoapProduct({
      saponifiedFromFatsAndLye: true,
      containsAddedSyntheticDetergents: false,
      labeledSolelyAsSoapForCleansing: false,
      hasCosmeticClaims: false,
    });
    expect(result.classification).toBe("cosmetic");
  });
});

describe("getLabelChecklistFor", () => {
  it("returns the true-soap (FPLA-based) list for true-soap classification", () => {
    expect(getLabelChecklistFor("true-soap")).toBe(TRUE_SOAP_LABEL_NOTES);
  });

  it("returns the full FDA cosmetic checklist for cosmetic classification", () => {
    expect(getLabelChecklistFor("cosmetic")).toBe(COSMETIC_LABEL_CHECKLIST);
  });

  it("also returns the fuller cosmetic checklist for borderline classification (safer default)", () => {
    expect(getLabelChecklistFor("borderline")).toBe(COSMETIC_LABEL_CHECKLIST);
  });
});

describe("evaluateLabelChecklist", () => {
  it("marks only the answered items as present, leaving the rest missing", () => {
    const evaluated = evaluateLabelChecklist("cosmetic", {
      identity: true,
      "net-quantity": true,
    });
    const present = evaluated.filter((i) => i.present).map((i) => i.id);
    const missing = evaluated.filter((i) => !i.present).map((i) => i.id);
    expect(present.sort()).toEqual(["identity", "net-quantity"]);
    expect(missing).toContain("ingredient-order");
    expect(missing).toContain("name-address");
    expect(missing).toContain("mocra-contact-info");
  });

  it("evaluates against the true-soap (FPLA-based) list when classification is true-soap", () => {
    const evaluated = evaluateLabelChecklist("true-soap", {});
    expect(evaluated.map((i) => i.id)).toEqual(
      TRUE_SOAP_LABEL_NOTES.map((i) => i.id),
    );
    expect(evaluated.every((i) => !i.present)).toBe(true);
  });
});

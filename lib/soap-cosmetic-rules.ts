import {
  COSMETIC_LABEL_CHECKLIST,
  TRUE_SOAP_LABEL_NOTES,
  type CosmeticChecklistItem,
} from "./label-data";

export type SoapClassificationInput = {
  /** Made primarily by combining fats/oils with an alkali (lye), not a pre-made melt-and-pour or syndet base. */
  saponifiedFromFatsAndLye: boolean;
  /** Contains added synthetic detergents beyond what saponification itself produces. */
  containsAddedSyntheticDetergents: boolean;
  /** Labeled, sold, and represented solely as soap for cleansing. */
  labeledSolelyAsSoapForCleansing: boolean;
  /** Any cosmetic-type claim: moisturizing, deodorizing, treating a skin condition, killing germs, anti-aging, etc. */
  hasCosmeticClaims: boolean;
};

export type SoapClassification = "true-soap" | "cosmetic" | "borderline";

export type SoapClassificationResult = {
  classification: SoapClassification;
  reasons: string[];
};

// Applies the CPSC's own three-part "true soap" test (see lib/label-data.ts
// for the exact source). All three parts must hold for true-soap status;
// failing any one of them means the product is regulated as an FDA cosmetic
// (or, for a health/disease claim, potentially a drug — out of scope here,
// flagged as borderline so the user is told to get real guidance).
export function classifySoapProduct(
  input: SoapClassificationInput,
): SoapClassificationResult {
  const reasons: string[] = [];

  if (!input.saponifiedFromFatsAndLye) {
    reasons.push(
      "Not primarily composed of an alkali salt of fatty acids from saponification (or you're not sure) — this fails the FDA's composition test for true soap (21 CFR 701.20(a)), so it's treated as a cosmetic. Note: many melt-and-pour bases ARE genuine saponified soap — if you're using one, check its own ingredient list rather than assuming either way.",
    );
    return { classification: "cosmetic", reasons };
  }

  if (input.containsAddedSyntheticDetergents) {
    reasons.push(
      "Contains added synthetic detergents beyond what saponification itself produces — the CPSC notes this alone can reclassify a product as a cosmetic.",
    );
  }

  if (input.hasCosmeticClaims) {
    reasons.push(
      "Carries a cosmetic-type claim (moisturizing, deodorizing, treating a skin condition, killing germs, anti-aging, etc.) — the CPSC notes any such claim can classify the product as a cosmetic or drug, even if the composition is otherwise true soap.",
    );
  }

  if (!input.labeledSolelyAsSoapForCleansing && !input.hasCosmeticClaims) {
    reasons.push(
      "Not labeled/sold/represented solely as soap for cleansing — check exactly how the product is marketed, since this is one of the CPSC's three required conditions.",
    );
  }

  const failedClaimsTest =
    input.hasCosmeticClaims || !input.labeledSolelyAsSoapForCleansing;

  if (!input.containsAddedSyntheticDetergents && !failedClaimsTest) {
    reasons.push(
      "Meets all three parts of the CPSC's true-soap test: saponified composition, cleaning action from the alkali-fatty-acid compounds themselves, and labeled/sold/represented solely as soap for cleansing.",
    );
    return { classification: "true-soap", reasons };
  }

  if (input.containsAddedSyntheticDetergents && !failedClaimsTest) {
    // Composition/claims otherwise look like true soap, but the detergent
    // question is exactly the kind of borderline case CPSC says to take to
    // the FDA rather than a tool self-certifying.
    reasons.push(
      "This is a borderline case (saponified base, no cosmetic claims, but added synthetic detergents present) — the CPSC's own guidance for cases like this is to contact the FDA directly rather than self-classify.",
    );
    return { classification: "borderline", reasons };
  }

  return { classification: "cosmetic", reasons };
}

export function getLabelChecklistFor(
  classification: SoapClassification,
): CosmeticChecklistItem[] {
  if (classification === "true-soap") {
    return TRUE_SOAP_LABEL_NOTES;
  }
  // Both "cosmetic" and "borderline" get the fuller FDA cosmetic checklist —
  // for a borderline product, following the stricter cosmetic rules while
  // awaiting FDA guidance is the safer default.
  return COSMETIC_LABEL_CHECKLIST;
}

export type ChecklistAnswers = Record<string, boolean>;
export type EvaluatedChecklistItem = CosmeticChecklistItem & { present: boolean };

// Marks each checklist item present/missing against what the user says is
// already on their label draft, so the UI can show a concrete "what's
// missing" list rather than just a static reference.
export function evaluateLabelChecklist(
  classification: SoapClassification,
  answers: ChecklistAnswers,
): EvaluatedChecklistItem[] {
  return getLabelChecklistFor(classification).map((item) => ({
    ...item,
    present: Boolean(answers[item.id]),
  }));
}

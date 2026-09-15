import { CANDLE_LABEL_CHECKLIST, type CandleChecklistItem } from "./label-data";

export type CandleChecklistAnswers = Record<string, boolean>;

export type EvaluatedCandleItem = CandleChecklistItem & { present: boolean };

export type CandleChecklistResult = {
  items: EvaluatedCandleItem[];
  missingRequired: EvaluatedCandleItem[];
  missingRecommended: EvaluatedCandleItem[];
  allRequiredPresent: boolean;
};

// The only hard federal requirement in the candle list is the lead-free wick
// rule (isVoluntaryTheme: false in lib/label-data.ts) — everything else is a
// well-documented voluntary industry theme. This function keeps that
// distinction visible in the result rather than flattening everything into
// one pass/fail score, since conflating a legal ban with a voluntary
// guideline would overstate what this tool can actually certify.
export function evaluateCandleChecklist(
  answers: CandleChecklistAnswers,
): CandleChecklistResult {
  const items: EvaluatedCandleItem[] = CANDLE_LABEL_CHECKLIST.map((item) => ({
    ...item,
    present: Boolean(answers[item.id]),
  }));

  const missingRequired = items.filter(
    (item) => !item.isVoluntaryTheme && !item.present,
  );
  const missingRecommended = items.filter(
    (item) => item.isVoluntaryTheme && !item.present,
  );

  return {
    items,
    missingRequired,
    missingRecommended,
    allRequiredPresent: missingRequired.length === 0,
  };
}

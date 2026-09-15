import { describe, expect, it } from "vitest";
import { evaluateCandleChecklist } from "../../lib/candle-label-rules";

describe("evaluateCandleChecklist", () => {
  it("flags the two federal-requirement items as missingRequired when unanswered, distinct from voluntary themes", () => {
    const result = evaluateCandleChecklist({});
    expect(result.allRequiredPresent).toBe(false);
    expect(result.missingRequired.map((i) => i.id).sort()).toEqual(
      ["wick-lead-limit", "wrapper-conformance-statement"].sort(),
    );
    expect(result.missingRecommended.length).toBeGreaterThan(0);
    expect(result.missingRecommended.every((i) => i.isVoluntaryTheme)).toBe(true);
  });

  it("reports allRequiredPresent true once both federal-requirement items are confirmed, even if voluntary themes are missing", () => {
    const result = evaluateCandleChecklist({
      "wick-lead-limit": true,
      "wrapper-conformance-statement": true,
    });
    expect(result.allRequiredPresent).toBe(true);
    expect(result.missingRequired).toEqual([]);
    expect(result.missingRecommended.length).toBeGreaterThan(0);
  });

  it("marks every item present when all ids are answered true", () => {
    const allIds = evaluateCandleChecklist({}).items.map((i) => i.id);
    const answers = Object.fromEntries(allIds.map((id) => [id, true]));
    const result = evaluateCandleChecklist(answers);
    expect(result.items.every((i) => i.present)).toBe(true);
    expect(result.missingRequired).toEqual([]);
    expect(result.missingRecommended).toEqual([]);
  });

  it("never conflates the federal requirements with the voluntary themes in the item list itself", () => {
    const result = evaluateCandleChecklist({});
    const legalItems = result.items.filter((i) => !i.isVoluntaryTheme);
    expect(legalItems.map((i) => i.id).sort()).toEqual(
      ["wick-lead-limit", "wrapper-conformance-statement"].sort(),
    );
  });
});

"use client";

import { useMemo, useState } from "react";
import {
  classifySoapProduct,
  evaluateLabelChecklist,
  type ChecklistAnswers,
} from "@/lib/soap-cosmetic-rules";

const CLASSIFICATION_LABEL: Record<string, string> = {
  "true-soap": "True soap (CPSC-regulated)",
  cosmetic: "Cosmetic (FDA-regulated)",
  borderline: "Borderline — get real guidance before relying on either checklist",
};

export function SoapCosmeticTool() {
  const [saponifiedFromFatsAndLye, setSaponifiedFromFatsAndLye] = useState(true);
  const [containsAddedSyntheticDetergents, setContainsAddedSyntheticDetergents] =
    useState(false);
  const [labeledSolelyAsSoapForCleansing, setLabeledSolelyAsSoapForCleansing] =
    useState(true);
  const [hasCosmeticClaims, setHasCosmeticClaims] = useState(false);
  const [answers, setAnswers] = useState<ChecklistAnswers>({});

  const result = useMemo(
    () =>
      classifySoapProduct({
        saponifiedFromFatsAndLye,
        containsAddedSyntheticDetergents,
        labeledSolelyAsSoapForCleansing,
        hasCosmeticClaims,
      }),
    [
      saponifiedFromFatsAndLye,
      containsAddedSyntheticDetergents,
      labeledSolelyAsSoapForCleansing,
      hasCosmeticClaims,
    ],
  );

  const checklist = useMemo(
    () => evaluateLabelChecklist(result.classification, answers),
    [result.classification, answers],
  );

  const missing = checklist.filter((item) => !item.present);

  function toggleAnswer(id: string) {
    setAnswers((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  return (
    <div className="rounded-lg border border-gray-200 p-5">
      <h3 className="font-semibold text-gray-900">Step 1 — classify your product</h3>
      <div className="mt-3 space-y-3">
        <label className="flex items-start gap-2 text-sm text-gray-700">
          <input
            type="checkbox"
            checked={saponifiedFromFatsAndLye}
            onChange={(e) => setSaponifiedFromFatsAndLye(e.target.checked)}
            data-testid="q-saponified"
            className="mt-1"
          />
          The bulk of the finished bar is an alkali salt of fatty acids from saponification
          (check your melt-and-pour base&rsquo;s own ingredient list if you use one — bases vary)
        </label>
        <label className="flex items-start gap-2 text-sm text-gray-700">
          <input
            type="checkbox"
            checked={containsAddedSyntheticDetergents}
            onChange={(e) => setContainsAddedSyntheticDetergents(e.target.checked)}
            data-testid="q-synthetic-detergents"
            className="mt-1"
          />
          Contains added synthetic detergents beyond what saponification itself produces
        </label>
        <label className="flex items-start gap-2 text-sm text-gray-700">
          <input
            type="checkbox"
            checked={labeledSolelyAsSoapForCleansing}
            onChange={(e) => setLabeledSolelyAsSoapForCleansing(e.target.checked)}
            data-testid="q-labeled-solely-soap"
            className="mt-1"
          />
          Labeled, sold, and represented solely as soap for cleansing
        </label>
        <label className="flex items-start gap-2 text-sm text-gray-700">
          <input
            type="checkbox"
            checked={hasCosmeticClaims}
            onChange={(e) => setHasCosmeticClaims(e.target.checked)}
            data-testid="q-cosmetic-claims"
            className="mt-1"
          />
          Makes any cosmetic-type claim (moisturizing, deodorizing, treating a skin condition,
          killing germs, anti-aging, etc.)
        </label>
      </div>

      <div
        className="mt-5 rounded border border-gray-100 bg-gray-50 p-4"
        data-testid="classification-result"
      >
        <h4 className="font-semibold text-gray-900">
          {CLASSIFICATION_LABEL[result.classification]}
        </h4>
        <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-gray-600">
          {result.reasons.map((reason) => (
            <li key={reason}>{reason}</li>
          ))}
        </ul>
      </div>

      <h3 className="mt-6 font-semibold text-gray-900">
        Step 2 — what&rsquo;s already on your label?
      </h3>
      <p className="mt-1 text-sm text-gray-600">
        Check off what your current label draft already has. Anything left unchecked shows up as
        missing below.
      </p>
      <div className="mt-3 space-y-3" data-testid="checklist-items">
        {checklist.map((item) => (
          <label
            key={item.id}
            className="flex items-start gap-2 text-sm text-gray-700"
            data-testid={`checklist-item-${item.id}`}
          >
            <input
              type="checkbox"
              checked={item.present}
              onChange={() => toggleAnswer(item.id)}
              className="mt-1"
            />
            <span>
              <span className="font-medium text-gray-900">{item.label}</span>
              <span className="block text-xs text-gray-500">
                {item.detail} ({item.citation})
              </span>
            </span>
          </label>
        ))}
      </div>

      <div
        className="mt-5 rounded border border-gray-100 bg-gray-50 p-4"
        data-testid="missing-summary"
      >
        {missing.length === 0 ? (
          <p className="text-sm font-medium text-green-700">
            Every item in this checklist is checked off. This checklist is not exhaustive and is
            not a compliance guarantee — see the disclaimer below.
          </p>
        ) : (
          <>
            <p className="text-sm font-medium text-gray-900">
              {missing.length} item{missing.length === 1 ? "" : "s"} still missing:
            </p>
            <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-gray-600">
              {missing.map((item) => (
                <li key={item.id}>{item.label}</li>
              ))}
            </ul>
          </>
        )}
      </div>

      <p className="mt-4 text-xs text-gray-500">
        This checklist is informational, not legal advice — it does not guarantee your label is
        compliant. Verify current requirements with the FDA, the CPSC, or a qualified professional
        before selling a product.
      </p>
    </div>
  );
}

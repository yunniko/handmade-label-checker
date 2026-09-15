"use client";

import { useMemo, useState } from "react";
import {
  evaluateCandleChecklist,
  type CandleChecklistAnswers,
} from "@/lib/candle-label-rules";

export function CandleChecklistTool() {
  const [answers, setAnswers] = useState<CandleChecklistAnswers>({});

  const result = useMemo(() => evaluateCandleChecklist(answers), [answers]);

  function toggleAnswer(id: string) {
    setAnswers((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  return (
    <div className="rounded-lg border border-gray-200 p-5">
      <h3 className="font-semibold text-gray-900">Check off what your candle already has</h3>
      <div className="mt-3 space-y-3" data-testid="candle-checklist-items">
        {result.items.map((item) => (
          <label
            key={item.id}
            className="flex items-start gap-2 text-sm text-gray-700"
            data-testid={`candle-item-${item.id}`}
          >
            <input
              type="checkbox"
              checked={item.present}
              onChange={() => toggleAnswer(item.id)}
              className="mt-1"
            />
            <span>
              <span className="font-medium text-gray-900">
                {item.label}
                {!item.isVoluntaryTheme && (
                  <span className="ml-2 rounded bg-red-100 px-1.5 py-0.5 text-xs font-semibold text-red-700">
                    Federal requirement
                  </span>
                )}
                {item.isVoluntaryTheme && (
                  <span className="ml-2 rounded bg-blue-100 px-1.5 py-0.5 text-xs font-semibold text-blue-700">
                    Voluntary theme
                  </span>
                )}
              </span>
              <span className="block text-xs text-gray-500">
                {item.detail} ({item.citation})
              </span>
            </span>
          </label>
        ))}
      </div>

      <div
        className="mt-5 rounded border border-gray-100 bg-gray-50 p-4"
        data-testid="candle-summary"
      >
        {!result.allRequiredPresent ? (
          <p className="text-sm font-medium text-red-700" data-testid="candle-required-warning">
            Missing {result.missingRequired.length} federal requirement
            {result.missingRequired.length === 1 ? "" : "s"} in this list:{" "}
            {result.missingRequired.map((item) => item.label).join("; ")}. These are legal
            requirements, not suggestions.
          </p>
        ) : (
          <p className="text-sm font-medium text-green-700">
            Every federal requirement in this list is checked off — this list is not exhaustive.
          </p>
        )}
        {result.missingRecommended.length > 0 && (
          <p className="mt-2 text-sm text-gray-600">
            {result.missingRecommended.length} voluntary safety theme
            {result.missingRecommended.length === 1 ? "" : "s"} not yet reflected on your label:{" "}
            {result.missingRecommended.map((item) => item.label).join(", ")}.
          </p>
        )}
      </div>

      <p className="mt-4 text-xs text-gray-500">
        The voluntary warning themes above paraphrase the well-documented substance of the
        industry&rsquo;s ASTM F2058 candle warning-label standard (developed with CPSC and the
        National Candle Association) — they are not a verbatim quote of that copyrighted standard.
        For exact compliant wording, consult ASTM F2058 directly or the National Candle
        Association&rsquo;s member resources. This checklist is informational, not legal advice.
      </p>
    </div>
  );
}

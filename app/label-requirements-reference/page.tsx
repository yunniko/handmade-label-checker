import type { Metadata } from "next";
import Link from "next/link";
import {
  CANDLE_LABEL_CHECKLIST,
  COSMETIC_LABEL_CHECKLIST,
  TRUE_SOAP_CRITERIA,
  TRUE_SOAP_LABEL_NOTES,
} from "@/lib/label-data";

export const metadata: Metadata = {
  title: "Label Requirements Reference",
  description:
    "The sourced federal rules behind the soap/cosmetic and candle label checklists — FDA 21 CFR 701/740, the CPSC's true-soap test, and candle safety sourcing, with citations for every item.",
};

export default function Page() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-12">
      <nav className="mb-6 text-sm">
        <Link href="/" className="text-blue-600 hover:underline">
          ← All tools
        </Link>
      </nav>

      <h1 className="text-3xl font-semibold">Label Requirements Reference</h1>
      <p className="mt-3 text-gray-600">
        Every item used by the two checklists, with its source. This page is a reference, not
        legal advice — requirements can change; verify current rules with the FDA or CPSC directly.
      </p>

      <section className="mt-8">
        <h2 className="text-xl font-semibold">CPSC&rsquo;s three-part &ldquo;true soap&rdquo; test</h2>
        <p className="mt-2 text-sm text-gray-600">
          All three parts must hold for a product to be regulated as true soap rather than an FDA
          cosmetic.
        </p>
        <ul className="mt-3 space-y-3">
          {TRUE_SOAP_CRITERIA.map((item) => (
            <li key={item.id} className="rounded border border-gray-200 p-3">
              <p className="text-sm text-gray-900">{item.label}</p>
              <p className="mt-1 text-xs text-gray-500">{item.source}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold">FDA cosmetic label elements</h2>
        <p className="mt-2 text-sm text-gray-600">
          Applies once a product is classified as an FDA cosmetic (or is borderline).
        </p>
        <ul className="mt-3 space-y-3">
          {COSMETIC_LABEL_CHECKLIST.map((item) => (
            <li key={item.id} className="rounded border border-gray-200 p-3">
              <p className="text-sm font-medium text-gray-900">{item.label}</p>
              <p className="mt-1 text-sm text-gray-600">{item.detail}</p>
              <p className="mt-1 text-xs text-gray-500">{item.citation}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold">True-soap label notes</h2>
        <p className="mt-2 text-sm text-gray-600">
          Applies once a product is classified as true soap — a narrower federal mandate than the
          cosmetic list above.
        </p>
        <ul className="mt-3 space-y-3">
          {TRUE_SOAP_LABEL_NOTES.map((item) => (
            <li key={item.id} className="rounded border border-gray-200 p-3">
              <p className="text-sm font-medium text-gray-900">{item.label}</p>
              <p className="mt-1 text-sm text-gray-600">{item.detail}</p>
              <p className="mt-1 text-xs text-gray-500">{item.citation}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold">Candle label items</h2>
        <p className="mt-2 text-sm text-gray-600">
          Only the lead-free-wick item is a hard federal requirement; the rest are well-documented
          voluntary safety themes, paraphrased rather than quoted verbatim.
        </p>
        <ul className="mt-3 space-y-3">
          {CANDLE_LABEL_CHECKLIST.map((item) => (
            <li key={item.id} className="rounded border border-gray-200 p-3">
              <p className="text-sm font-medium text-gray-900">
                {item.label}{" "}
                {!item.isVoluntaryTheme && (
                  <span className="ml-1 rounded bg-red-100 px-1.5 py-0.5 text-xs font-semibold text-red-700">
                    Federal requirement
                  </span>
                )}
              </p>
              <p className="mt-1 text-sm text-gray-600">{item.detail}</p>
              <p className="mt-1 text-xs text-gray-500">{item.citation}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold">Sources</h2>
        <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-gray-600">
          <li>
            FDA, &ldquo;Summary of Cosmetics Labeling Requirements&rdquo; (fda.gov), retrieved
            2026-09-15
          </li>
          <li>CPSC, &ldquo;Soap&rdquo; FAQ (cpsc.gov/FAQ/Soap), retrieved 2026-09-15</li>
          <li>
            National Candle Association, &ldquo;Understanding Safety Standards&rdquo;
            (candles.org), retrieved 2026-09-15
          </li>
          <li>16 CFR 1500.17(a)(14), Federal Hazardous Substances Act (lead-wick ban)</li>
        </ul>
      </section>
    </main>
  );
}

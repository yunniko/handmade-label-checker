import type { Metadata } from "next";
import Link from "next/link";
import { CandleChecklistTool } from "../_components/candle-checklist-tool";
import { JsonLd } from "@/lib/json-ld";

export const metadata: Metadata = {
  title: "Candle Label Checklist",
  description:
    "Check your handmade candle label against the one hard federal requirement (lead-free wick) and the well-documented voluntary candle safety-warning themes.",
};

const FAQ = [
  {
    question: "Is a fire-safety warning legally required on candle labels?",
    answer:
      "The specific warning-label wording comes from a voluntary industry standard (ASTM F2058, developed with the CPSC and the National Candle Association), not a federal mandate — but the vast majority of candle makers, including small sellers, follow it. The two items in this checklist that are hard federal requirements are the metal-cored-wick lead limit and (for metal-cored-wick candles) the wrapper conformance statement.",
  },
  {
    question: "Why can't this tool show the exact warning-label wording?",
    answer:
      "The verbatim text of ASTM F2058 is inside a paid ASTM standard document, which is copyrighted and wasn't available to source for this project. This checklist paraphrases the well-documented safety themes instead of guessing at or reproducing text it can't verify — consult ASTM F2058 directly or the National Candle Association's member resources for exact compliant wording.",
  },
  {
    question: "Does the lead-wick rule apply to my cotton wick?",
    answer:
      "No — the federal limit applies only to metal-cored wicks (a lead content above 0.06% of the metal core's weight is banned). Nonmetal-cored wicks — cotton, paper, wood — are exempt from this specific rule entirely. If you do use a metal-cored wick, ask your supplier for lead-content confirmation, and check whether the wrapper-statement and certificate-of-conformity items apply to you.",
  },
  {
    question: "Is this legal advice?",
    answer:
      "No. This is an informational checklist, not a compliance guarantee. Verify current requirements with the CPSC or a qualified professional before selling a product.",
  },
];

export default function Page() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-12">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQ.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
          })),
        }}
      />

      <nav className="mb-6 text-sm">
        <Link href="/" className="text-blue-600 hover:underline">
          ← All tools
        </Link>
      </nav>

      <h1 className="text-3xl font-semibold">Candle Label Checklist</h1>
      <p className="mt-3 text-gray-600">
        One hard federal requirement (lead-free wick) plus the well-documented voluntary safety
        themes candle sellers typically put on their labels.
      </p>

      <div className="mt-6">
        <CandleChecklistTool />
      </div>

      <p className="mt-4 text-sm text-gray-500">
        Selling soap or cosmetics too?{" "}
        <Link href="/soap-cosmetic-label-checklist" className="underline">
          Check that label
        </Link>
        .
      </p>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">Frequently asked questions</h2>
        <dl className="mt-3 space-y-4">
          {FAQ.map((item) => (
            <div key={item.question}>
              <dt className="font-medium text-gray-900">{item.question}</dt>
              <dd className="mt-1 text-gray-600">{item.answer}</dd>
            </div>
          ))}
        </dl>
      </section>
    </main>
  );
}

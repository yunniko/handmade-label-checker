import type { Metadata } from "next";
import Link from "next/link";
import { SoapCosmeticTool } from "../_components/soap-cosmetic-tool";
import { JsonLd } from "@/lib/json-ld";

export const metadata: Metadata = {
  title: "Soap & Cosmetic Label Checklist",
  description:
    "Find out whether your handmade bar is regulated as true soap (CPSC) or as a cosmetic (FDA), then check your label draft against the matching sourced checklist.",
};

const FAQ = [
  {
    question: "Why does it matter whether my product is \"true soap\" or a cosmetic?",
    answer:
      "The CPSC and FDA apply different labeling rules depending on which category your product falls into. True soap is generally regulated by the CPSC and exempt from FDA's detailed cosmetic ingredient-declaration rule; a cosmetic (including a soap-shaped bar that makes a moisturizing, deodorizing, or other cosmetic claim) must follow FDA's 21 CFR 701/740 labeling rules.",
  },
  {
    question: "My bar is saponified from oils and lye but also has added synthetic detergents — what is it?",
    answer:
      "This is exactly the kind of borderline case the CPSC itself says to take to the FDA directly rather than self-classify. This tool flags it as borderline rather than guessing.",
  },
  {
    question: "Is true soap federally unregulated for labeling, then?",
    answer:
      "No — true soap still has to carry an identity statement, a net-quantity statement (in both avoirdupois and metric units), and a manufacturer name/address under the Fair Packaging and Labeling Act. What it's exempt from is specifically FDA's more detailed cosmetic ingredient-declaration format. Listing ingredients anyway is still common best practice for allergen transparency.",
  },
  {
    question: "What is MoCRA and does it affect true soap?",
    answer:
      "MoCRA (2022) expanded FDA's cosmetic jurisdiction and can reclassify a product as a cosmetic based on its ingredients, even without an explicit cosmetic claim. It also added a mandatory adverse-event contact-information requirement for cosmetics, in force since December 29, 2024. Re-check the classifier above if your product's status feels borderline.",
  },
  {
    question: "Is this legal advice?",
    answer:
      "No. This is an informational checklist built from primary FDA and CPSC sources, not a compliance guarantee. Verify current requirements with the FDA, the CPSC, or a qualified professional before selling a product.",
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

      <h1 className="text-3xl font-semibold">Soap & Cosmetic Label Checklist</h1>
      <p className="mt-3 text-gray-600">
        Answer four questions to classify your product using the CPSC&rsquo;s own three-part
        &ldquo;true soap&rdquo; test, then check your label draft against the matching checklist.
      </p>

      <div className="mt-6">
        <SoapCosmeticTool />
      </div>

      <p className="mt-4 text-sm text-gray-500">
        Selling candles too?{" "}
        <Link href="/candle-label-checklist" className="underline">
          Check your candle label
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

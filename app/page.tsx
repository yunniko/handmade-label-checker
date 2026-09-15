import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Handmade Label Checker",
  description:
    "Free label checklists for handmade soap, cosmetics, and candles — true-soap-vs-cosmetic classification and sourced FDA/CPSC label element checklists. No signup, no upload, not legal advice.",
};

const TOOLS = [
  {
    href: "/soap-cosmetic-label-checklist",
    title: "Soap & cosmetic label checklist",
    description:
      "Answer a few questions to find out whether your bar is regulated as true soap or as an FDA cosmetic, then get the matching label-element checklist.",
  },
  {
    href: "/candle-label-checklist",
    title: "Candle label checklist",
    description:
      "Check your candle label against the one hard federal requirement (lead-free wick) and the well-documented voluntary safety-warning themes.",
  },
  {
    href: "/label-requirements-reference",
    title: "Label requirements reference",
    description:
      "The sourced federal rules and citations behind both checklists, in one place — FDA 21 CFR 701/740, the CPSC true-soap test, and candle safety sourcing.",
  },
];

export default function Home() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-3xl font-semibold">Handmade Label Checker</h1>
      <p className="mt-3 text-gray-600">
        Free label checklists for handmade soap, cosmetic, and candle sellers — built from primary
        FDA and CPSC sources, not legal advice. Runs entirely in your browser; nothing you type is
        uploaded anywhere.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {TOOLS.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            data-testid={`tool-card-${tool.href.slice(1)}`}
            className="rounded-lg border border-gray-200 p-5 hover:border-gray-400"
          >
            <h2 className="font-semibold text-blue-700">{tool.title}</h2>
            <p className="mt-1 text-sm text-gray-600">{tool.description}</p>
          </Link>
        ))}
      </div>

      <p className="mt-8 text-xs text-gray-500">
        This site provides general informational checklists, not legal advice. Label requirements
        can change and may vary by state or marketplace — verify current requirements with the FDA,
        the CPSC, or a qualified professional before selling a product.
      </p>
    </main>
  );
}

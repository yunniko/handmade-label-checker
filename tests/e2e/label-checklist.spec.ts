import { expect, test } from "@playwright/test";

test("home page links to all three tools", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Handmade Label Checker" })).toBeVisible();
  await expect(page.getByTestId("tool-card-soap-cosmetic-label-checklist")).toBeVisible();
  await expect(page.getByTestId("tool-card-candle-label-checklist")).toBeVisible();
  await expect(page.getByTestId("tool-card-label-requirements-reference")).toBeVisible();
});

test("soap/cosmetic checklist: default answers classify as true soap", async ({ page }) => {
  await page.goto("/soap-cosmetic-label-checklist");
  await expect(page.getByTestId("classification-result")).toContainText("True soap");
});

test("soap/cosmetic checklist: a cosmetic claim reclassifies the product and swaps the checklist", async ({
  page,
}) => {
  await page.goto("/soap-cosmetic-label-checklist");
  await page.getByTestId("q-cosmetic-claims").check();
  await expect(page.getByTestId("classification-result")).toContainText("Cosmetic");
  await expect(page.getByTestId("checklist-item-ingredient-order")).toBeVisible();
});

test("soap/cosmetic checklist: added synthetic detergents with no claims is flagged borderline", async ({
  page,
}) => {
  await page.goto("/soap-cosmetic-label-checklist");
  await page.getByTestId("q-synthetic-detergents").check();
  await expect(page.getByTestId("classification-result")).toContainText("Borderline");
});

test("soap/cosmetic checklist: checking off every item clears the missing-items summary", async ({
  page,
}) => {
  await page.goto("/soap-cosmetic-label-checklist");
  await expect(page.getByTestId("missing-summary")).toContainText("missing");
  const items = page.getByTestId("checklist-items").locator("input[type=checkbox]");
  const count = await items.count();
  for (let i = 0; i < count; i++) {
    await items.nth(i).check();
  }
  await expect(page.getByTestId("missing-summary")).toContainText("checked off");
});

test("candle checklist: the two federal-requirement items are distinct from voluntary themes", async ({
  page,
}) => {
  await page.goto("/candle-label-checklist");
  await expect(page.getByTestId("candle-required-warning")).toBeVisible();
  await expect(page.getByTestId("candle-item-wick-lead-limit")).toContainText("Federal requirement");
  await expect(page.getByTestId("candle-item-wrapper-conformance-statement")).toContainText(
    "Federal requirement",
  );
  await expect(page.getByTestId("candle-item-burn-within-sight")).toContainText("Voluntary theme");

  await page.getByTestId("candle-item-wick-lead-limit").locator("input").check();
  await page.getByTestId("candle-item-wrapper-conformance-statement").locator("input").check();
  await expect(page.getByTestId("candle-required-warning")).toHaveCount(0);
});

test("reference page renders sourced sections", async ({ page }) => {
  await page.goto("/label-requirements-reference");
  await expect(page.getByRole("heading", { name: "Label Requirements Reference" })).toBeVisible();
  await expect(page.getByText("21 CFR 701.3").first()).toBeVisible();
  await expect(page.getByText("21 CFR 701.20").first()).toBeVisible();
});

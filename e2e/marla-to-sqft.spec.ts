import { test, expect } from "@playwright/test";

test.describe("Marla to Square Feet tab", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.getByRole("tab", { name: /marla to square feet/i }).click();
  });

  test("uses the same convert form as Marla Converter", async ({ page }) => {
    await expect(page.locator("#sqft-area-input")).toBeVisible();
    await expect(page.locator("#source-sqft")).toBeVisible();
    await expect(page.locator("#target-sqft")).toBeVisible();
    await expect(page.getByRole("button", { name: /swap/i })).toBeVisible();
    await expect(page.getByRole("button", { name: "Convert", exact: true })).toBeVisible();
    await expect(page.locator("#source-sqft")).toHaveValue("normal");
    await expect(page.locator("#target-sqft")).toHaveValue("sqFt");
  });

  test("converts Standard Marla to square feet", async ({ page }) => {
    await page.locator("#sqft-area-input").fill("1");
    await page.locator("#source-sqft").selectOption("normal");
    await page.locator("#target-sqft").selectOption("sqFt");
    await page.getByRole("button", { name: "Convert", exact: true }).click();

    await expect(page.getByText(/1.*Standard Marla.*=.*272\.2500.*Square Feet/i)).toBeVisible();
  });

  test("converts square feet back to Standard Marla", async ({ page }) => {
    await page.locator("#sqft-area-input").fill("272.25");
    await page.locator("#source-sqft").selectOption("sqFt");
    await page.locator("#target-sqft").selectOption("normal");
    await page.getByRole("button", { name: "Convert", exact: true }).click();

    await expect(page.getByText(/272\.25.*Square Feet.*=.*1\.0000.*Standard Marla/i)).toBeVisible();
  });

  test("converts Lahori Marla to square feet", async ({ page }) => {
    await page.locator("#sqft-area-input").fill("2");
    await page.locator("#source-sqft").selectOption("lahori");
    await page.locator("#target-sqft").selectOption("sqFt");
    await page.getByRole("button", { name: "Convert", exact: true }).click();

    await expect(page.getByText(/2.*Lahori Marla.*=.*450\.0000.*Square Feet/i)).toBeVisible();
  });

  test("swap exchanges From and To", async ({ page }) => {
    await page.locator("#source-sqft").selectOption("multani");
    await page.locator("#target-sqft").selectOption("sqFt");
    await page.getByRole("button", { name: /swap/i }).click();

    await expect(page.locator("#source-sqft")).toHaveValue("sqFt");
    await expect(page.locator("#target-sqft")).toHaveValue("multani");
  });

  test("converts Standard Marla to square yards", async ({ page }) => {
    await page.locator("#sqft-area-input").fill("1");
    await page.locator("#source-sqft").selectOption("normal");
    await page.locator("#target-sqft").selectOption("sqYd");
    await page.getByRole("button", { name: "Convert", exact: true }).click();

    await expect(page.getByText(/1.*Standard Marla.*=.*30\.2500.*Square Yards/i)).toBeVisible();
  });

  test("converts Lahori Marla to square yards", async ({ page }) => {
    await page.locator("#sqft-area-input").fill("1");
    await page.locator("#source-sqft").selectOption("lahori");
    await page.locator("#target-sqft").selectOption("sqYd");
    await page.getByRole("button", { name: "Convert", exact: true }).click();

    await expect(page.getByText(/1.*Lahori Marla.*=.*25\.0000.*Square Yards/i)).toBeVisible();
  });

  test("converts square yards to square feet", async ({ page }) => {
    await page.locator("#sqft-area-input").fill("1");
    await page.locator("#source-sqft").selectOption("sqYd");
    await page.locator("#target-sqft").selectOption("sqFt");
    await page.getByRole("button", { name: "Convert", exact: true }).click();

    await expect(page.getByText(/1.*Square Yards.*=.*9\.0000.*Square Feet/i)).toBeVisible();
  });
});

test.describe("Page intro", () => {
  test("shows the tagline above the calculator", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: /convert between standard, lahori & multani marla/i,
      })
    ).toBeVisible();
    await expect(page.getByRole("article", { name: /marla conversion calculator/i })).toBeVisible();
  });
});

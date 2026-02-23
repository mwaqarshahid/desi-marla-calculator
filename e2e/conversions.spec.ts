import { test, expect } from "@playwright/test";

test.describe("Marla conversions", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("converts Normal to Lahori Marla correctly", async ({ page }) => {
    await page.getByLabel(/area.*marla/i).fill("5");
    await page.locator("#source-marla").selectOption("normal");
    await page.locator("#target-marla").selectOption("lahori");
    await page.getByRole("button", { name: /convert/i }).click();

    // 5 Normal = 1361.25 sq ft => 1361.25/225 ≈ 6.045 Lahori (FP may show 6.0450 or 6.0500)
    await expect(page.getByText(/5.*Normal Marla.*=.*6\.0[45]\d.*Lahori Marla/i)).toBeVisible();
    await expect(page.getByText(/Equivalent area.*1[,]?361\.25.*sq ft/i)).toBeVisible();
  });

  test("converts Normal to Multani Marla correctly", async ({ page }) => {
    await page.getByLabel(/area.*marla/i).fill("5");
    await page.locator("#source-marla").selectOption("normal");
    await page.locator("#target-marla").selectOption("multani");
    await page.getByRole("button", { name: /convert/i }).click();

    // 5 Normal = 1361.25 sq ft => 1361.25/270 ≈ 5.0417 Multani
    await expect(page.getByText(/5.*Normal Marla.*=.*5\.04\d.*Multani Marla/i)).toBeVisible();
    await expect(page.getByText(/Equivalent area.*1[,]?361\.25.*sq ft/i)).toBeVisible();
  });

  test("converts Lahori to Normal Marla correctly", async ({ page }) => {
    await page.getByLabel(/area.*marla/i).fill("4");
    await page.locator("#source-marla").selectOption("lahori");
    await page.locator("#target-marla").selectOption("normal");
    await page.getByRole("button", { name: /convert/i }).click();

    // 4 Lahori = 900 sq ft => 900/272.25 ≈ 3.3058 Normal
    await expect(page.getByText(/4.*Lahori Marla.*=.*3\.305[78].*Normal Marla/i)).toBeVisible();
    await expect(page.getByText(/Equivalent area.*900.*sq ft/i)).toBeVisible();
  });

  test("converts Lahori to Multani Marla correctly", async ({ page }) => {
    await page.getByLabel(/area.*marla/i).fill("10");
    await page.locator("#source-marla").selectOption("lahori");
    await page.locator("#target-marla").selectOption("multani");
    await page.getByRole("button", { name: /convert/i }).click();

    // 10 Lahori = 2250 sq ft => 2250/270 = 8.3333 Multani
    await expect(page.getByText(/10.*Lahori Marla.*=.*8\.333[23].*Multani Marla/i)).toBeVisible();
    await expect(page.getByText(/Equivalent area.*2[,]?250.*sq ft/i)).toBeVisible();
  });

  test("converts Multani to Normal Marla correctly", async ({ page }) => {
    await page.getByLabel(/area.*marla/i).fill("10");
    await page.locator("#source-marla").selectOption("multani");
    await page.locator("#target-marla").selectOption("normal");
    await page.getByRole("button", { name: /convert/i }).click();

    // 10 Multani = 2700 sq ft => 2700/272.25 ≈ 9.9173 Normal
    await expect(page.getByText(/10.*Multani Marla.*=.*9\.917[234].*Normal Marla/i)).toBeVisible();
    await expect(page.getByText(/Equivalent area.*2[,]?700.*sq ft/i)).toBeVisible();
  });

  test("converts Multani to Lahori Marla correctly", async ({ page }) => {
    await page.getByLabel(/area.*marla/i).fill("5");
    await page.locator("#source-marla").selectOption("multani");
    await page.locator("#target-marla").selectOption("lahori");
    await page.getByRole("button", { name: /convert/i }).click();

    // 5 Multani = 1350 sq ft => 1350/225 = 6 Lahori (exact)
    await expect(page.getByText(/5.*Multani Marla.*=.*6\.0000.*Lahori Marla/i)).toBeVisible();
    await expect(page.getByText(/Equivalent area.*1[,]?350.*sq ft/i)).toBeVisible();
  });
});

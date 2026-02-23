import { test, expect } from "@playwright/test";

test.describe("Calculator", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("home page loads with calculator visible", async ({ page }) => {
    await expect(page.getByRole("article", { name: /marla conversion calculator/i })).toBeVisible();
    await expect(page.getByLabel(/area.*marla/i)).toBeVisible();
    await expect(page.getByRole("button", { name: /convert/i })).toBeVisible();
  });

  test("Enter key triggers conversion", async ({ page }) => {
    await page.getByLabel(/area.*marla/i).fill("1");
    await page.locator("#source-marla").selectOption("normal");
    await page.locator("#target-marla").selectOption("multani");
    await page.getByLabel(/area.*marla/i).press("Enter");

    // 1 Normal = 272.25 sq ft => 272.25 / 270 = 1.0083 Multani
    await expect(page.getByText(/1\.0083.*Multani Marla/i)).toBeVisible();
  });

  test("swap button exchanges From and To", async ({ page }) => {
    await page.locator("#source-marla").selectOption("normal");
    await page.locator("#target-marla").selectOption("multani");
    await page.getByRole("button", { name: /swap/i }).click();

    await expect(page.locator("#source-marla")).toHaveValue("multani");
    await expect(page.locator("#target-marla")).toHaveValue("normal");
  });

  test("shows error for empty input", async ({ page }) => {
    await page.getByRole("button", { name: /convert/i }).click();
    await expect(page.getByText(/please enter a valid number/i)).toBeVisible();
  });

  test("shows error for negative input", async ({ page }) => {
    await page.getByLabel(/area.*marla/i).fill("-5");
    await page.getByRole("button", { name: /convert/i }).click();
    await expect(page.getByText(/non-negative number/i)).toBeVisible();
  });

  test("reference section shows sq ft per marla", async ({ page }) => {
    await expect(page.getByRole("heading", { name: /Reference.*1 Marla/i })).toBeVisible();
    await expect(page.getByText("272.25")).toBeVisible();
    await expect(page.getByText("225")).toBeVisible();
    await expect(page.getByText("270")).toBeVisible();
  });
});

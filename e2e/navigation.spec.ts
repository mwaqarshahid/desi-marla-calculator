import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
  test("logo links to home", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: /desi marla calculator/i }).click();
    await expect(page).toHaveURL("/");
  });

  test("old conversion URLs redirect home", async ({ page }) => {
    await page.goto("/normal-to-lahori");
    await expect(page).toHaveURL("/");
    await expect(page.getByRole("article", { name: /marla conversion calculator/i })).toBeVisible();
  });
});

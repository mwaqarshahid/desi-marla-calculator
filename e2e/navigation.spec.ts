import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
  test("quick link navigates to conversion page", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Normal Marla → Lahori Marla" }).click();
    await expect(page).toHaveURL(/\/normal-to-lahori/);
  });

  test("logo links to home", async ({ page }) => {
    await page.goto("/normal-to-multani");
    await page.getByRole("link", { name: /DMC.*home|Go to home/i }).click();
    await expect(page).toHaveURL("/");
  });
});

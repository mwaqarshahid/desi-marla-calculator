import { test, expect } from "@playwright/test";

test.describe("Calculator on conversion page", () => {
  test("normal-to-lahori page has From=Normal, To=Lahori pre-selected", async ({ page }) => {
    await page.goto("/normal-to-lahori");
    await expect(page.locator("#source-marla")).toHaveValue("normal");
    await expect(page.locator("#target-marla")).toHaveValue("lahori");
  });

  test("conversion then result on dedicated page", async ({ page }) => {
    await page.goto("/lahori-to-normal");
    await page.getByLabel(/area.*marla/i).fill("4");
    await page.getByRole("button", { name: "Convert", exact: true }).click();
    // 4 Lahori = 900 sq ft => 900 / 272.25 = 3.3058 Normal
    await expect(page.getByText(/3\.3058.*Normal Marla/i)).toBeVisible();
  });
});

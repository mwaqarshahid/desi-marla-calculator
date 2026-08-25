import { test, expect } from "@playwright/test";

test.describe("Marla to Square Feet tab", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.getByRole("tab", { name: /marla to square feet/i }).click();
  });

  test("shows all three marla types and square feet", async ({ page }) => {
    await expect(page.locator("#area-normal")).toBeVisible();
    await expect(page.locator("#area-lahori")).toBeVisible();
    await expect(page.locator("#area-multani")).toBeVisible();
    await expect(page.locator("#area-sqft")).toBeVisible();
  });

  test("converting Normal Marla updates the rest including square feet", async ({
    page,
  }) => {
    await page.locator("#area-normal").fill("1");

    // 1 Normal = 272.25 sq ft => 272.25/225 = 1.2100 Lahori, 272.25/270 = 1.0083 Multani
    await expect(page.locator("#area-sqft")).toHaveValue("272.2500");
    await expect(page.locator("#area-lahori")).toHaveValue("1.2100");
    await expect(page.locator("#area-multani")).toHaveValue("1.0083");
    await expect(page.locator("#area-normal")).toHaveValue("1");
  });

  test("converting square feet updates all three marla types", async ({
    page,
  }) => {
    await page.locator("#area-sqft").fill("225");

    // 225 sq ft = 1 Lahori, 225/272.25 ≈ 0.8264 Normal, 225/270 ≈ 0.8333 Multani
    await expect(page.locator("#area-lahori")).toHaveValue("1.0000");
    await expect(page.locator("#area-normal")).toHaveValue("0.8264");
    await expect(page.locator("#area-multani")).toHaveValue("0.8333");
    await expect(page.locator("#area-sqft")).toHaveValue("225");
  });

  test("converting Lahori Marla updates the rest", async ({ page }) => {
    await page.locator("#area-lahori").fill("2");

    // 2 Lahori = 450 sq ft => 450/272.25 ≈ 1.6529 Normal, 450/270 ≈ 1.6667 Multani
    await expect(page.locator("#area-sqft")).toHaveValue("450.0000");
    await expect(page.locator("#area-normal")).toHaveValue("1.6529");
    await expect(page.locator("#area-multani")).toHaveValue("1.6667");
  });

  test("clearing one field clears the rest", async ({ page }) => {
    await page.locator("#area-multani").fill("5");
    await expect(page.locator("#area-sqft")).not.toHaveValue("");

    await page.locator("#area-multani").fill("");
    await expect(page.locator("#area-normal")).toHaveValue("");
    await expect(page.locator("#area-lahori")).toHaveValue("");
    await expect(page.locator("#area-sqft")).toHaveValue("");
  });
});

test.describe("Header and tabs stay in sync", () => {
  test("featured card opens the sq ft tab on the same page", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /live converter/i }).click();
    await expect(page).toHaveURL("/");
    await expect(page.getByRole("tab", { name: /marla to square feet/i })).toHaveAttribute(
      "aria-selected",
      "true"
    );
    await expect(page.locator("#area-sqft")).toBeVisible();
    await expect(
      page.getByRole("navigation", { name: "Primary" }).getByRole("button", { name: /marla to square feet/i })
    ).toHaveAttribute("aria-pressed", "true");
  });

  test("header mode switches the tab without changing the route", async ({ page }) => {
    await page.goto("/");
    await page
      .getByRole("navigation", { name: "Primary" })
      .getByRole("button", { name: /marla to square feet/i })
      .click();
    await expect(page).toHaveURL("/");
    await expect(page.getByRole("tab", { name: /marla to square feet/i })).toHaveAttribute(
      "aria-selected",
      "true"
    );
    await expect(page.locator("#area-sqft")).toBeVisible();

    await page
      .getByRole("navigation", { name: "Primary" })
      .getByRole("button", { name: /marla converter/i })
      .click();
    await expect(page.getByRole("tab", { name: /marla converter/i })).toHaveAttribute(
      "aria-selected",
      "true"
    );
    await expect(page.getByLabel(/area.*marla/i)).toBeVisible();
  });

  test("selecting a tab updates the header", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("tab", { name: /marla to square feet/i }).click();
    await expect(
      page.getByRole("navigation", { name: "Primary" }).getByRole("button", { name: /marla to square feet/i })
    ).toHaveAttribute("aria-pressed", "true");
    await expect(
      page.getByRole("navigation", { name: "Primary" }).getByRole("button", { name: /marla converter/i })
    ).toHaveAttribute("aria-pressed", "false");

    await page.getByRole("tab", { name: /marla converter/i }).click();
    await expect(
      page.getByRole("navigation", { name: "Primary" }).getByRole("button", { name: /marla converter/i })
    ).toHaveAttribute("aria-pressed", "true");
  });
});

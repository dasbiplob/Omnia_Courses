const { test, expect } = require("@playwright/test");

test("Render statistics", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("No shopping lists yet.").toBeVisible());
});

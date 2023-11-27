const { test, expect } = require("@playwright/test");

test("Lists page render correctly", async ({ page }) => {
  await page.goto("/lists");
  await expect(page.getByText("Add a shopping list")).toBeVisible();
  await expect(page.getByText("Active shopping lists")).toBeVisible();
});

test("Can create a shopping list", async ({ page }) => {
  await page.goto("/lists");
  const listName = `Shopping List ${Math.random()}`;
  await page.locator("input[type=text]").type(listName);
  await page.getByTestId("add-list-btn").click();
  await expect(page.getByText(listName)).toBeVisible();
});

test("Single List page render correctly", async ({ page }) => {
  await page.goto("/lists");
  const listName = `Shopping List ${Math.random()}`;
  await page.getByTestId("list-name-input").type(listName);
  await page.getByTestId("add-list-btn").click();
  const list = page.getByRole("listitem").filter({ hasText: listName });
  await expect(list).toBeVisible();
  await expect(list).click();
  await page.getByText(listName).toBeVisible();
});

test("Can create a shopping list item", async ({ page }) => {
  await page.goto("/lists");
  const listName = `Shopping List ${Math.random()}`;
  await page.locator("input[type=text]").type(listName);
  await page.getByTestId("add-list-btn").click();
  const list = page.getByRole("listitem").filter({ hasText: listName });
  await expect(list).toBeVisible();
  await expect(list).click();
  await page.getByText(listName).toBeVisible();

  const itemName = `Item ${Math.random()}`;
  await page.getByTestId("item-name-input").type(itemName);
  await page.getByTestId("add-list-btn").click();
  const item = page.getByRole("listitem").filter({ hasText: itemName });
  await expect(item).toBeVisible();
});

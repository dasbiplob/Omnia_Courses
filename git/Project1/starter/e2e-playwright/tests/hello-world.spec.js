const { test, expect } = require("@playwright/test");

test("Main page has expected title and URL.", async ({ page }) => {
  await page.goto("https://project1-wsd-deployment-i.onrender.com/");
  await expect(page).toHaveTitle("Shared shopping lists");
  await expect(page).toHaveURL("hhttps://project1-wsd-deployment-i.onrender.com/");
});

test("Lists page has expected heading", async ({ page }) => {
  await page.goto("https://project1-wsd-deployment-i.onrender.com/lists");
  await expect(page.locator("h2")).toHaveText(["Add a list", "Active shopping lists"]);
});

test("Can create a list.", async ({ page }) => {
  await page.goto("https://project1-wsd-deployment-i.onrender.com/listss");
  await page.locator("input[type=text]").type("Test_list");
  await page.locator("input[type=submit]").first().click();
});

test("Deactivate a list.", async ({ page }) => {
  await page.goto("https://project1-wsd-deployment-i.onrender.com/lists");
  await page.locator("input[type=text]").type("Test_list");
  await page.locator("input[type=submit]").nth(1).click();
});


test("Can open a list page.", async ({ page }) => {
  await page.goto("https://project1-wsd-deployment-i.onrender.com/lists");
  const listName = `My list: ${Math.random()}`;
  await page.locator("input[type=text]").type(listName);
  await page.locator("input[type=submit]").first().click();
  await page.locator(`a >> text='${listName}'`).click();
  await expect(page.locator("h1")).toHaveText(listName);
});

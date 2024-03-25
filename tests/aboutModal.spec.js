// @ts-check
import { test, expect } from "@playwright/test";

test("About Modal Test", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await expect(page.isVisible("#loginPage")).resolves.toBe(true);
  await page.fill("#email", "user@ss.org");
  await page.fill("#password", "Speedgolf1");
  await page.click("#loginBtn");
  await expect(page.locator("#feedModeTab")).toBeVisible();
  await page.click("#menuBtn");
  await expect(page.getByRole("menuitem", { name: "About" })).toBeVisible();
  await page.getByRole("menuitem", { name: "About" }).click();
  await expect(page.locator("#aboutSpeedScore")).toBeVisible();
  await page.getByRole("button", { name: "×" }).click();
  await expect(page.locator("#aboutSpeedScore")).toBeHidden();
  await page.click("#menuBtn");
  await page.getByRole("menuitem", { name: "About" }).click();
  await expect(page.locator("#aboutSpeedScore")).toBeVisible();
  await page.getByRole("button", { name: "OK" }).click();
  await expect(page.locator("#aboutSpeedScore")).toBeHidden();
});

// The below test case is generated mostly using Playwright test case generator. The code will be commented as we already have test case above to check the About modal. We cna us the below one also to check the About modal.

// test("About Modal Test 2", async ({ page }) => {
//   await page.goto("http://localhost:3000/");
//   await expect(page.isVisible("#loginPage")).resolves.toBe(true);
//   await page.getByRole("textbox", { name: "Email:" }).click();
//   await page.getByRole("textbox", { name: "Email:" }).fill("user@ss.org");
//   await page.getByRole("textbox", { name: "Password:" }).click();
//   await page.getByRole("textbox", { name: "Password:" }).fill("Speedgolf1");
//   await page.getByRole("button", { name: "Log In" }).click();
//   await expect(page.locator("#feedModeTab")).toBeVisible();
//   await page.getByLabel("Actions").click();
//   await page.getByRole("menuitem", { name: "About" }).click();
//   await expect(page.getByRole("menuitem", { name: "About" })).toBeVisible();
//   await page.getByRole("button", { name: "×" }).click();
//   await expect(page.locator("#aboutSpeedScore")).toBeHidden();
//   await page.getByLabel("Actions").click();
//   await page.getByRole("menuitem", { name: "About" }).click();
//   await expect(page.getByRole("menuitem", { name: "About" })).toBeVisible();
//   await page.getByRole("button", { name: "OK" }).click();
//   await expect(page.locator("#aboutSpeedScore")).toBeHidden();
// });

// @ts-check
import { test, expect } from "@playwright/test";
import { addRound } from "./helpers";
import moment from "moment";

test("Rounds Listing Page Test", async ({ page }) => {
  //await setTimeout(() => {}, 100);
  await page.goto("http://localhost:3000/");
  await expect(page.isVisible("#loginPage")).resolves.toBe(true);
  await page.fill("#email", "user@ss.org");
  await page.fill("#password", "Speedgolf1");
  await page.click("#loginBtn");
  await expect(page.locator("#feedModeTab")).toBeVisible();
  await page.click("#roundsMode");
  await expect(page.getByRole("heading", { name: "Rounds" })).toBeVisible();
});

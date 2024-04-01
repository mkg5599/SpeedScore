// @ts-check
import { test, expect } from "@playwright/test";
import { login } from "./helpers";

test("Rounds Listing Page Test", async ({ page }) => {
  //await setTimeout(() => {}, 100);
  await page.goto("http://localhost:3000/");
  await login(page, "user@ss.org", "Speedgolf1");
  await page.click("#roundsMode");
  await expect(page.getByRole("heading", { name: "Rounds" })).toBeVisible();
});

test("Add Rounds Page Testing", async ({ page }) => {
  //await setTimeout(() => {}, 100);
  await page.goto("http://localhost:3000/");
  await expect(page.isVisible("#loginPage")).resolves.toBe(true);
  await login(page, "user@ss.org", "Speedgolf1");
  await expect(page.locator("#feedModeTab")).toBeVisible();
  await page.click("#roundsMode");
  await expect(page.getByRole("heading", { name: "Rounds" })).toBeVisible();
  await expect(page.getByRole("button", { name: "New Round" })).toBeVisible();
  await page.getByRole("button", { name: "New Round" }).click();
  await expect(page.getByRole("heading", { name: "Add Round" })).toBeVisible();
  await page.getByLabel("Course:").fill("test");
  await page.getByLabel("Distance:").fill("1");
  await page.getByRole("button", { name: "Add Round" }).click();
  await expect(page.getByRole("heading", { name: "Rounds" })).toBeVisible();
});

test("Edit Rounds Page Testing", async ({ page }) => {
  //await setTimeout(() => {}, 100);
  await page.goto("http://localhost:3000/");
  await expect(page.isVisible("#loginPage")).resolves.toBe(true);
  await login(page, "user@ss.org", "Speedgolf1");
  await expect(page.locator("#feedModeTab")).toBeVisible();
  await page.click("#roundsMode");
  await expect(page.getByRole("heading", { name: "Rounds" })).toBeVisible();
  await page
    .getByRole("row", { name: "2022-10-14 Red Wolf 140:00 (" })
    .getByLabel("View and Edit Round")
    .click();
  await page.getByLabel("Course:").fill("test edit mode");
  await page.getByRole("button", { name: "Edit Round" }).click();
  await expect(page.getByRole("heading", { name: "Rounds" })).toBeVisible();
});

test("Distance field Test in View/Edit page", async ({ page }) => {
  //await setTimeout(() => {}, 100);
  await page.goto("http://localhost:3000/");
  await expect(page.isVisible("#loginPage")).resolves.toBe(true);
  await login(page, "user@ss.org", "Speedgolf1");
  await expect(page.locator("#feedModeTab")).toBeVisible();
  await page.click("#roundsMode");
  await expect(page.getByRole("heading", { name: "Rounds" })).toBeVisible();
  await page
    .getByRole("row", { name: "2022-10-14 Red Wolf 140:00 (" })
    .getByLabel("View and Edit Round")
    .click();
  await expect(page.getByLabel("Distance:")).toBeVisible();
  await expect(page.getByText("Miles", { exact: true })).toBeVisible();
  await expect(page.getByLabel("Miles")).toBeVisible();
  await expect(page.getByText("Kilometers")).toBeVisible();
  await expect(page.getByText("Enter a distance value (in")).toBeVisible();
});

test("Rounds Listing Page Sorting Test", async ({ page }) => {
  //await setTimeout(() => {}, 100);
  await page.goto("http://localhost:3000/");
  await login(page, "user@ss.org", "Speedgolf1");
  await page.click("#roundsMode");
  await expect(page.getByRole("heading", { name: "Rounds" })).toBeVisible();
  await page.getByLabel("Sort ascending by date").click();
  await expect(page.getByLabel("Sort ascending by date")).toBeVisible();
  await expect(page.getByRole("cell", { name: "-10-05" })).toBeVisible();
  await page.getByLabel("Sort ascending by date").click();
  await expect(page.getByLabel("Sort ascending by date")).toBeVisible();
  await expect(page.getByRole("cell", { name: "-10-14" })).toBeVisible();
  await page.getByLabel("Sort ascending by course").click();
  await expect(page.getByLabel("Sort ascending by course")).toBeVisible();
  await expect(page.getByRole("cell", { name: "Bryden Canyon" })).toBeVisible();
  await page.getByLabel("Sort ascending by course").click();
  await expect(page.getByLabel("Sort ascending by course")).toBeVisible();
  await expect(page.getByRole("cell", { name: "Red Wolf" })).toBeVisible();
  await page
    .getByRole("columnheader", { name: "Sort ascending by score Score" })
    .getByLabel("Sort ascending by score")
    .click();
  await expect(
    page
      .getByRole("columnheader", { name: "Sort ascending by score Score" })
      .getByLabel("Sort ascending by score")
  ).toBeVisible();
  await expect(
    page.getByRole("cell", { name: ":00 (76 in 55:00)" })
  ).toBeVisible();
  await page
    .getByRole("columnheader", { name: "Sort ascending by score Score" })
    .getByLabel("Sort ascending by score")
    .click();
  await expect(
    page
      .getByRole("columnheader", { name: "Sort ascending by score Score" })
      .getByLabel("Sort ascending by score")
  ).toBeVisible();
  await expect(
    page.getByRole("cell", { name: ":00 (80 in 60:00)" }).first()
  ).toBeVisible();
  await page
    .getByRole("columnheader", { name: "Sort ascending by score Distance" })
    .getByLabel("Sort ascending by score")
    .click();
  await expect(
    page
      .getByRole("columnheader", { name: "Sort ascending by score Distance" })
      .getByLabel("Sort ascending by score")
  ).toBeVisible();
  await expect(
    page.getByRole("cell", { name: "0", exact: true }).first()
  ).toBeVisible();
  await page
    .getByRole("columnheader", { name: "Sort ascending by score Distance" })
    .getByLabel("Sort ascending by score")
    .click();
  await expect(
    page
      .getByRole("columnheader", { name: "Sort ascending by score Distance" })
      .getByLabel("Sort ascending by score")
  ).toBeVisible();
  await expect(
    page.getByRole("cell", { name: "0", exact: true }).first()
  ).toBeVisible();
});

test("Rounds Listing Page Deletion Test", async ({ page }) => {
  //await setTimeout(() => {}, 100);
  await page.goto("http://localhost:3000/");
  await login(page, "user@ss.org", "Speedgolf1");
  await page.click("#roundsMode");
  await expect(page.getByRole("heading", { name: "Rounds" })).toBeVisible();
  await page
    .getByRole("row", { name: "2022-10-10 Palouse Ridge 140:" })
    .getByLabel("Delete Round")
    .click();
  await expect(page.locator("#exampleModal")).toBeVisible();
  await expect(
    page.locator("div").filter({ hasText: /^Delete Round\?$/ })
  ).toBeVisible();
  await expect(page.getByText("Do you really want to delete")).toBeVisible();
  await expect(page.getByRole("button", { name: "No, Cancel" })).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Yes, Delete Round" })
  ).toBeVisible();
  await expect(page.getByRole("button", { name: "Close" })).toBeVisible();

  await page.getByRole("button", { name: "Yes, Delete Round" }).click();
});

test("Rounds Listing Page Search Test", async ({ page }) => {
  //await setTimeout(() => {}, 100);
  await page.goto("http://localhost:3000/");
  await login(page, "user@ss.org", "Speedgolf1");
  await page.click("#roundsMode");
  await expect(page.getByRole("heading", { name: "Rounds" })).toBeVisible();
  await expect(page.getByText("Search/Filter:")).toBeVisible();
  await expect(page.locator("#searchInputRounds")).toBeVisible();
  await page.locator("#searchInputRounds").click();
  await page.locator("#searchInputRounds").fill("re");
  await expect(page.getByText("Total 1 rounds")).toBeVisible();
  await page.getByRole("cell", { name: "Red Wolf" }).click();
  await expect(page.getByRole("cell", { name: "Red Wolf" })).toBeVisible();
});

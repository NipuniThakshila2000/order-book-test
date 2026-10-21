import { chromium } from "playwright";

const browser = await chromium.launch({ headless: true });
const errors = [];
for (const viewport of [{ name: "desktop", width: 1280, height: 800 }, { name: "mobile", width: 390, height: 844 }]) {
  const page = await browser.newPage({ viewport });
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto(process.env.DESIGN_SMOKE_URL || "http://127.0.0.1:8080/", { waitUntil: "networkidle" });
  await page.screenshot({ path: `screenshots/design-${viewport.name}.png`, fullPage: true });
  console.log(viewport.name, await page.title(), await page.locator("h1").first().textContent());
  if (viewport.name === "mobile") {
    await page.getByRole("button", { name: "Open menu" }).click();
    console.log("mobile menu visible", await page.getByText("Journey Sections").isVisible());
  } else {
    await page.getByRole("link", { name: "Enter the journey" }).first().click();
    console.log("journey path", new URL(page.url()).pathname);
  }
  await page.close();
}
await browser.close();
if (errors.length) { console.error(errors); process.exitCode = 1; }

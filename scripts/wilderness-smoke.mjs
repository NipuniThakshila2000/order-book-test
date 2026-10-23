import { chromium } from "playwright";

const origin = process.argv[2] || "http://127.0.0.1:8080";
const browser = await chromium.launch({ headless: true });
try {
  for (const viewport of [{ width: 1280, height: 800, name: "desktop" }, { width: 390, height: 844, name: "mobile" }]) {
    const page = await browser.newPage({ viewport });
    const errors = [];
    page.on("pageerror", error => errors.push(error.message));
    page.on("response", response => { if (response.status() >= 400 && !response.url().endsWith("/api/auth/get-session")) errors.push(`${response.status()} ${response.url()}`); });
    await page.goto(`${origin}/wilderness`, { waitUntil: "networkidle" });
    await page.screenshot({ path: `screenshots/wilderness-${viewport.name}.png`, fullPage: true });
    await page.getByRole("button", { name: /Begin the experience/ }).click();
    await page.getByRole("button", { name: /Talk to the Clerk/ }).click();
    await page.getByRole("textbox", { name: "Your response to the Clerk" }).fill("I keep avoiding difficult conversations at work. I want to answer honestly without blaming my colleague.");
    await page.getByRole("button", { name: /Add to conversation/ }).click();
    await page.getByRole("button", { name: /Finish speaking and review/ }).click();
    await page.getByRole("button", { name: /Choose patterns/ }).click();
    await page.getByRole("button", { name: /Fear of man/ }).click();
    await page.getByRole("button", { name: /Enter the court/ }).click();
    for (let i = 0; i < 7; i++) {
      await page.getByRole("textbox", { name: "Your response" }).fill(`My reflection for step ${i + 1}: I choose to respond honestly and with care.`);
      await page.getByRole("button", { name: i === 6 ? /Finish practice/ : /Complete this step/ }).click();
    }
    await page.getByRole("heading", { name: /Carry the light forward/ }).waitFor();
    await page.screenshot({ path: `screenshots/wilderness-finish-${viewport.name}.png`, fullPage: true });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    if (overflow || errors.length) throw new Error(`${viewport.name}: overflow=${overflow}; errors=${errors.join(" | ")}`);
    console.log(`${viewport.name}: full flow passed`);
    await page.close();
  }
} finally {
  await browser.close();
}

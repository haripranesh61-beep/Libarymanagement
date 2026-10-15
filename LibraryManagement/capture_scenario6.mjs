import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

const BASE = process.env.APP_URL || "http://127.0.0.1:5173/";
const OUT = path.resolve("screenshots");
const WAIT = 900;
fs.mkdirSync(OUT, { recursive: true });
let activeExperiment = "Experiment-1-REST-API";

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 900, height: 1400 }, deviceScaleFactor: 1 });
page.setDefaultTimeout(5000);

async function shot(name) {
  await page.waitForTimeout(WAIT);
  const folder = path.join(OUT, activeExperiment);
  fs.mkdirSync(folder, { recursive: true });
  await page.screenshot({ path: path.join(folder, name + ".png"), fullPage: true });
  console.log("Captured:", name);
}
async function clickText(text) {
  const loc = page.getByRole("button", { name: text, exact: true }).first();
  if (await loc.count()) await loc.click();
  else console.warn("Button not found:", text);
}
async function captureExperiment1() {
  await page.goto(BASE, { waitUntil: "domcontentloaded", timeout: 30000 });
  await shot("Experiment-1_a_home");
  await clickText("Books");
  await shot("Experiment-1_b_book-list");
  const search = page.getByRole("searchbox").first();
  if (await search.count()) {
    await search.fill("hobbit");
    await shot("Experiment-1_c_search");
    await search.fill("");
  }
  const category = page.locator("select").first();
  if (await category.count()) {
    const options = await category.locator("option").allTextContents();
    const candidate = options.find(x => x.trim() && x.trim() !== "All");
    if (candidate) { await category.selectOption({ label: candidate.trim() }); await shot("Experiment-1_d_category-filter"); }
    await category.selectOption({ label: "All" }).catch(()=>{});
  }
  const details = page.getByRole("button", { name: /details|view/i }).first();
  if (await details.count()) { await details.click(); await shot("Experiment-1_e_book-details"); }
  else {
    const book = page.locator(".book-card button").first();
    if (await book.count()) { await book.click(); await shot("Experiment-1_e_book-details"); }
  }
}
async function captureExperiment2() {
  activeExperiment = "Experiment-2-Optimization";
  await page.goto(BASE, { waitUntil: "domcontentloaded", timeout: 30000 });
  await clickText("Books");
  const borrow = page.getByRole("button", { name: /borrow/i }).first();
  if (await borrow.count()) { await borrow.click(); await shot("Experiment-2_a_borrow-action"); }
  await clickText("My Borrowing");
  await shot("Experiment-2_b_borrowing-dashboard");
  const renew = page.getByRole("button", { name: /renew/i }).first();
  if (await renew.count()) { await renew.click(); await shot("Experiment-2_c_renew-action"); }
  const ret = page.getByRole("button", { name: /return/i }).first();
  if (await ret.count()) { await ret.click(); await shot("Experiment-2_d_return-action"); }
  await clickText("Member Profile");
  await shot("Experiment-2_e_member-profile");
}
async function captureExperiment3() {
  activeExperiment = "Experiment-3-Deployment";
  // The supplied project demonstrates local app behavior; deployment screenshots require actual deployment URLs.
  await page.goto(BASE, { waitUntil: "domcontentloaded", timeout: 30000 });
  await clickText("Books");
  await shot("Experiment-3_a_local-production-preview");
  console.warn("For GitHub Pages, Netlify, and Vercel evidence, set APP_URL to each real deployed URL and capture separately. Do not claim deployment without live URLs.");
}
try {
  await captureExperiment1();
  await captureExperiment2();
  await captureExperiment3();
  console.log("Capture finished. Review warnings and screenshots before submission.");
} finally {
  await browser.close();
}

import assert from "node:assert/strict"
import fs from "node:fs"
import os from "node:os"
import path from "node:path"
import test from "node:test"
import { fileURLToPath } from "node:url"
import {
  icsErSlugsFromSiteData,
  isIcsErArticlePath,
  runFirewall,
} from "./firewall-parent-lint.mjs"

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")

function withFixture(files) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "ics-firewall-"))
  for (const [rel, body] of Object.entries(files)) {
    const full = path.join(root, rel)
    fs.mkdirSync(path.dirname(full), { recursive: true })
    fs.writeFileSync(full, body)
  }
  return root
}

const SITE_DATA = `export const publications = [
  { slug: "why-index", series: "ICS-IA", title: "Why an index" },
  { slug: "contaminants-in-baby-wipes", series: "ICS-ER", title: "Contaminants in baby wipes" },
]
`

function labels(root) {
  return runFirewall(root).errors.map((error) => error.split(":")[0])
}

test("ICS-ER slugs come only from flat registered records", () => {
  const source = `
    export const publicationSeries = { "ICS-ER": { id: "ICS-ER", name: "Evidence Review" } }
    export const publications = [
      { slug: "why-index", series: "ICS-IA" },
      { slug: "contaminants-in-baby-wipes", series: "ICS-ER" },
    ]
  `
  assert.deepEqual(icsErSlugsFromSiteData(source), ["contaminants-in-baby-wipes"])
})

test("literature units are allowed only under the registered ICS-ER article path", () => {
  assert.equal(
    isIcsErArticlePath("app/articles/contaminants-in-baby-wipes/page.tsx", ["contaminants-in-baby-wipes"]),
    true,
  )
  assert.equal(isIcsErArticlePath("app/articles/page.tsx", ["contaminants-in-baby-wipes"]), false)
  assert.equal(isIcsErArticlePath("app/site-data.ts", ["contaminants-in-baby-wipes"]), false)
  assert.equal(
    isIcsErArticlePath("app/articles/why-index/page.tsx", ["contaminants-in-baby-wipes"]),
    false,
  )
})

test("a registered ICS-ER page may render literature units", () => {
  const root = withFixture({
    "app/site-data.ts": SITE_DATA,
    "app/articles/contaminants-in-baby-wipes/page.tsx":
      "Sodium benzoate at 200 to 3500 ppm, one cell at 3 ppb, and lead at 1,000 µg/kg or 1,000 ug/kg.",
  })
  assert.deepEqual(labels(root), [])
})

test("literature units stay blocked on ICS-IA pages, the articles index, site data, and unregistered slugs", () => {
  const cases = [
    ["app/articles/why-index/page.tsx", "Lead at 5 ppm."],
    ["app/articles/page.tsx", "A result of 5 ppm."],
    ["app/page.tsx", "A result of 4 ppm."],
    ["app/articles/not-registered/page.tsx", "A result of 9 ppm."],
    ["app/site-data.ts", `${SITE_DATA}\nconst note = "5 ppm"\n`],
  ]
  for (const [file, body] of cases) {
    const files = { "app/site-data.ts": SITE_DATA, [file]: body }
    const found = labels(withFixture(files))
    assert.ok(found.includes("NUMERIC_THRESHOLD"), `${file} should block literature units, got ${found.join(", ")}`)
  }
})

test("P97, clean/dirty, published_limit, and ICS-limit wording stay blocked on ICS-ER pages", () => {
  const cases = [
    ["The screen used P97 as a cutoff", "PERCENTILE_TOKEN"],
    ["The screen used P45 as a cutoff", "PERCENTILE_TOKEN"],
    ["This is a clean subcategory.", "CLEAN_DIRTY_DESIGNATION"],
    ["This is a dirty subcategory.", "CLEAN_DIRTY_DESIGNATION"],
    ["Do not print published_limit_ppb.", "WORKBENCH_FIELD"],
    ["The ICS limit is 5 ppm.", "ICS_LIMIT_WORDING"],
    ["An ICS-ER threshold would be out of scope.", "ICS_LIMIT_WORDING"],
    ["No certification ceiling is stated.", "ICS_LIMIT_WORDING"],
  ]
  for (const [body, label] of cases) {
    const root = withFixture({
      "app/site-data.ts": SITE_DATA,
      "app/articles/contaminants-in-baby-wipes/page.tsx": body,
    })
    const found = labels(root)
    assert.ok(found.includes(label), `"${body}" should keep ${label}, got ${found.join(", ") || "no findings"}`)
    if (body.includes("ppm") || body.includes("ppb")) {
      assert.equal(found.includes("NUMERIC_THRESHOLD"), false, `"${body}" should still allow the literature unit`)
    }
  }
})

test("brand fields, reserved links, and feed keys stay blocked", () => {
  const brandRoot = withFixture({
    "app/site-data.ts": SITE_DATA,
    "lib/brands.ts": "export const row = { result_ppb: 1 }",
  })
  assert.ok(labels(brandRoot).includes("BRAND_CONTAMINATION_FIELD"))

  const reservedRoot = withFixture({
    "app/site-data.ts": SITE_DATA,
    "lib/site-registry.ts": 'export const row = { status: "reserved", publicLink: true }',
  })
  assert.ok(labels(reservedRoot).includes("RESERVED_PUBLIC_LINK"))

  const feedRoot = withFixture({
    "app/site-data.ts": SITE_DATA,
    "public/data/example.json": '{ "lead_ppb": 1 }\n',
  })
  assert.ok(labels(feedRoot).includes("DATA_FEED_FORBIDDEN_KEY"))
})

test("the workspace registers one ICS-ER article and the firewall accepts it", () => {
  const source = fs.readFileSync(path.join(repoRoot, "app/site-data.ts"), "utf8")
  assert.deepEqual(icsErSlugsFromSiteData(source), ["contaminants-in-baby-wipes"])
  const { errors } = runFirewall(repoRoot)
  assert.deepEqual(errors, [])
})

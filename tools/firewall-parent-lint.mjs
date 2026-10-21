#!/usr/bin/env node
// firewall-parent-lint.mjs — the parent-side firewall (source-level, build-blocking).
//
// The PARENT owns institutional/governance intent and must publish NO standards
// math and NO brand-level contamination data. The risks this catches:
//
//   1. NO DERIVATION TOKEN. No published threshold value, percentile (P97/P45),
//      clean/dirty subcategory designation, or numeric concentration unit in any
//      rendered parent page (app/). The parent describes that standards exist and
//      links to the program; it never renders an ICS limit. Regulatory-cap context
//      is not reproduced on governance pages either.
//
//      NARROW EXCEPTION. Literature units (ppb, ppm, µg/kg, ug/kg) are allowed
//      only on app/articles/<slug>/** files whose slug is registered in
//      app/site-data.ts with series "ICS-ER". Those units are source
//      concentrations on an evidence review. The exception does not extend to
//      any other path, including app/site-data.ts, the articles index, ICS-IA
//      pages, or an articles file whose slug is not registered ICS-ER.
//      P97/P45, clean/dirty subcategory wording, published_limit_*, and
//      ICS-limit wording stay blocked on ICS-ER pages.
//   2. NO BRAND CONTAMINATION FIELDS. lib/brands.ts must not carry a COA,
//      contamination value, pass-margin, per-analyte result, or threshold field
//      (Class A is identity-only; Part 12).
//   3. NO ENUMERATION SURFACE. No reserved vertical exposes a public link, and no
//      sitemap/route enumerates brands. (The runtime no-list guarantee is asserted
//      by the parent-infra post-deploy crawler; this is the source-level guard.)
//
// Cross-domain canonical + cross-site duplication are deploy-time, cross-origin
// properties — those belong to the post-deploy crawler, not this lint.

import fs from "node:fs"
import path from "node:path"
import { fileURLToPath, pathToFileURL } from "node:url"

const thisFile = fileURLToPath(import.meta.url)

// Strip comments so the firewall's own explanatory text ("NEVER a COA / a
// contamination value …") is not mistaken for a violation — the same disclaimer
// trap the index lint had to avoid. The `[^:]` guard keeps https:// intact.
export function stripComments(s) {
  return s.replace(/\/\*[\s\S]*?\*\//g, " ").replace(/(^|[^:])\/\/[^\n]*/g, "$1")
}

// Literature concentration units. Allowed only on registered ICS-ER article files.
export const LITERATURE_UNIT =
  /\b\d[\d.,]*\s*(?:ppb|µg\/kg|ug\/kg|ppm)\b/gi

const ALWAYS_BLOCKED = [
  { re: /\bP(?:97|45)\b(?![\d.])/g, label: "PERCENTILE_TOKEN" },
  { re: /\b(?:clean|dirty)\s+subcategor\w+/gi, label: "CLEAN_DIRTY_DESIGNATION" },
  { re: /\bpublished_limit_ppb\b/g, label: "WORKBENCH_FIELD" },
  { re: /\bICS(?:-ER)?\s+(?:certification\s+)?(?:limits?|ceilings?|thresholds?)\b/gi, label: "ICS_LIMIT_WORDING" },
  { re: /\bcertification\s+ceilings?\b/gi, label: "ICS_LIMIT_WORDING" },
]

const LITERATURE_UNIT_RULE = { re: LITERATURE_UNIT, label: "NUMERIC_THRESHOLD" }

// Flat object literals only. A nested brace fails closed: the slug is not
// recognized, and literature units on that page stay blocked.
export function icsErSlugsFromSiteData(source) {
  const slugs = []
  const re = /\{[^{}]*\}/g
  let match
  while ((match = re.exec(source)) !== null) {
    const block = match[0]
    if (!/series:\s*["']ICS-ER["']/.test(block)) continue
    const slug = block.match(/slug:\s*["']([^"']+)["']/)
    if (slug && slug[1] && !slug[1].includes("/") && !slug[1].includes("..")) slugs.push(slug[1])
  }
  return slugs
}

export function isIcsErArticlePath(relPath, slugs) {
  const norm = String(relPath).split(path.sep).join("/")
  return slugs.some((slug) => norm.startsWith(`app/articles/${slug}/`))
}

export function derivationFindings(text, { allowLiteratureUnits }) {
  const findings = []
  const rules = allowLiteratureUnits ? ALWAYS_BLOCKED : [...ALWAYS_BLOCKED, LITERATURE_UNIT_RULE]
  for (const { re, label } of rules) {
    re.lastIndex = 0
    const match = re.exec(text)
    if (match) findings.push({ label, match: match[0] })
  }
  return findings
}

function walk(dir, cb) {
  if (!fs.existsSync(dir)) return
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(full, cb)
    else cb(full)
  }
}

export function runFirewall(root) {
  const errors = []
  const appDir = path.join(root, "app")
  const pageFiles = []
  walk(appDir, (file) => {
    if (/\.(tsx|ts)$/.test(file)) pageFiles.push(file)
  })

  const siteDataPath = path.join(root, "app/site-data.ts")
  const erSlugs = fs.existsSync(siteDataPath)
    ? icsErSlugsFromSiteData(fs.readFileSync(siteDataPath, "utf8"))
    : []

  for (const file of pageFiles) {
    const text = stripComments(fs.readFileSync(file, "utf8"))
    const rel = path.relative(root, file)
    const allowLiteratureUnits = isIcsErArticlePath(rel, erSlugs)
    for (const finding of derivationFindings(text, { allowLiteratureUnits })) {
      errors.push(
        `${finding.label}: ${rel} contains "${finding.match}" — the parent must not render standards math, ICS limits, or literature units outside a registered ICS-ER article.`,
      )
    }
  }

  const brandsFile = path.join(root, "lib/brands.ts")
  if (fs.existsSync(brandsFile)) {
    const text = stripComments(fs.readFileSync(brandsFile, "utf8"))
    const forbiddenFields = [
      /\bcoa\b/i,
      /\bcontamination\b/i,
      /\bpass_?margin\b/i,
      /\banalyte_?(value|result)\b/i,
      /\bppb\b/i,
      /\bresult_ppb\b/i,
    ]
    for (const re of forbiddenFields) {
      const match = text.match(re)
      if (match) errors.push(`BRAND_CONTAMINATION_FIELD: lib/brands.ts references "${match[0]}" — Class A is identity-only (Part 12).`)
    }
  }

  const registryFile = path.join(root, "lib/site-registry.ts")
  if (fs.existsSync(registryFile)) {
    const text = fs.readFileSync(registryFile, "utf8")
    if (/status:\s*"reserved"[^}]*publicLink:\s*true/s.test(text.replace(/\n/g, " "))) {
      errors.push("RESERVED_PUBLIC_LINK: a reserved vertical exposes publicLink:true — reserved cards are parent-only, no live link.")
    }
  }

  const dataDir = path.join(root, "public/data")
  if (fs.existsSync(dataDir)) {
    const forbiddenKey =
      /contamination|ppb|µg|ug_?kg|\bthreshold\b|percentile|\bp(?:97|45|90)\b|clean_?dirty|\bdirty\b|limit_ppb|published_limit|pass_?margin/i
    for (const file of fs.readdirSync(dataDir)) {
      if (!file.endsWith(".json")) continue
      const rel = `public/data/${file}`
      let json
      try {
        json = JSON.parse(fs.readFileSync(path.join(dataDir, file), "utf8"))
      } catch {
        errors.push(`DATA_FEED_PARSE: ${rel} is not valid JSON.`)
        continue
      }
      const offending = new Set()
      const walkKeys = (obj) => {
        if (Array.isArray(obj)) return obj.forEach(walkKeys)
        if (obj && typeof obj === "object") {
          for (const [key, value] of Object.entries(obj)) {
            if (forbiddenKey.test(key)) offending.add(key)
            walkKeys(value)
          }
        }
      }
      walkKeys(json)
      if (offending.size) {
        errors.push(
          `DATA_FEED_FORBIDDEN_KEY: ${rel} has key(s) [${[...offending].join(", ")}] — feeds carry literature/stewardship counts only, never contamination/threshold data.`,
        )
      }
    }
  }

  return { errors, pageFiles, erSlugs }
}

function invokedDirectly() {
  const entry = process.argv[1]
  if (!entry) return false
  return pathToFileURL(path.resolve(entry)).href === pathToFileURL(thisFile).href
}

if (invokedDirectly()) {
  const { errors, pageFiles, erSlugs } = runFirewall(process.cwd())
  if (errors.length) {
    console.error(`firewall-parent-lint: ${errors.length} violation(s):`)
    for (const error of errors) console.error(`  ✗ ${error}`)
    process.exit(1)
  }
  console.log(
    `firewall-parent-lint: OK (${pageFiles.length} page files scanned; literature units allowed on ${erSlugs.length} registered ICS-ER article path(s); no percentiles, no clean/dirty designations, no ICS-limit wording, no brand contamination fields, no reserved public links).`,
  )
  process.exit(0)
}

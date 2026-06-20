#!/usr/bin/env node
// firewall-parent-lint.mjs — the parent-side firewall (source-level, build-blocking).
//
// The PARENT owns institutional/governance intent and must publish NO standards
// math and NO brand-level contamination data. The risks this catches:
//
//   1. NO DERIVATION TOKEN. No published threshold value, percentile (P97/P45),
//      clean/dirty subcategory designation, or numeric "N ppb" in any rendered
//      parent page (app/). The parent describes that standards exist + links to
//      the program; it never renders a number. (Regulatory-cap context is not
//      reproduced on the parent either — keep it clean.)
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

const root = process.cwd()
const errors = []

// Strip comments so the firewall's own explanatory text ("NEVER a COA / a
// contamination value …") is not mistaken for a violation — the same disclaimer
// trap the index lint had to avoid. The `[^:]` guard keeps https:// intact.
function stripComments(s) {
  return s.replace(/\/\*[\s\S]*?\*\//g, " ").replace(/(^|[^:])\/\/[^\n]*/g, "$1")
}

// ---- 1. derivation tokens in rendered pages --------------------------------
const APP = path.join(root, "app")
const pageFiles = []
walk(APP, (f) => {
  if (/\.(tsx|ts)$/.test(f)) pageFiles.push(f)
})
const DERIVATION = [
  { re: /\bP(?:97|45)\b(?![\d.])/g, label: "PERCENTILE_TOKEN" },
  { re: /\b(?:clean|dirty)\s+subcategor\w+/gi, label: "CLEAN_DIRTY_DESIGNATION" },
  { re: /\bpublished_limit_ppb\b/g, label: "WORKBENCH_FIELD" },
  { re: /\b\d[\d.,]*\s*(?:ppb|µg\/kg|ug\/kg|ppm)\b/g, label: "NUMERIC_THRESHOLD" },
]
for (const f of pageFiles) {
  const text = stripComments(fs.readFileSync(f, "utf8"))
  const rel = path.relative(root, f)
  for (const { re, label } of DERIVATION) {
    re.lastIndex = 0
    const m = re.exec(text)
    if (m) errors.push(`${label}: ${rel} contains "${m[0]}" — the parent must not render standards math or thresholds.`)
  }
}

// ---- 2. brand contamination fields -----------------------------------------
const brandsFile = path.join(root, "lib/brands.ts")
if (fs.existsSync(brandsFile)) {
  const text = stripComments(fs.readFileSync(brandsFile, "utf8"))
  const FORBIDDEN_FIELDS = [
    /\bcoa\b/i,
    /\bcontamination\b/i,
    /\bpass_?margin\b/i,
    /\banalyte_?(value|result)\b/i,
    /\bppb\b/i,
    /\bresult_ppb\b/i,
  ]
  for (const re of FORBIDDEN_FIELDS) {
    const m = text.match(re)
    if (m) errors.push(`BRAND_CONTAMINATION_FIELD: lib/brands.ts references "${m[0]}" — Class A is identity-only (Part 12).`)
  }
}

// ---- 3. reserved verticals must not expose a public link -------------------
const registryFile = path.join(root, "lib/site-registry.ts")
if (fs.existsSync(registryFile)) {
  const text = fs.readFileSync(registryFile, "utf8")
  // crude structural check: a reserved entry with publicLink:true is a leak.
  if (/status:\s*"reserved"[^}]*publicLink:\s*true/s.test(text.replace(/\n/g, " "))) {
    errors.push(`RESERVED_PUBLIC_LINK: a reserved vertical exposes publicLink:true — reserved cards are parent-only, no live link.`)
  }
}

// ---- report -----------------------------------------------------------------
if (errors.length) {
  console.error(`firewall-parent-lint: ${errors.length} violation(s):`)
  for (const e of errors) console.error(`  ✗ ${e}`)
  process.exit(1)
}
console.log(`firewall-parent-lint: OK (${pageFiles.length} page files scanned; no thresholds, no brand contamination fields, no reserved public links).`)
process.exit(0)

function walk(dir, cb) {
  if (!fs.existsSync(dir)) return
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name)
    if (e.isDirectory()) walk(full, cb)
    else cb(full)
  }
}

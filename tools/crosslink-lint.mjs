#!/usr/bin/env node
// crosslink-lint.mjs — cross-property authority + entity-name regression guard
// for the PARENT (contaminantstandards.com). Deterministic, build-blocking.
//
// Why this exists: the ICS network only compounds SEO/answer-engine authority if
// (a) every property names its siblings with ONE canonical entity string and
// (b) a rendered mention of a sibling property is a real <a>, not dead text. A
// plain-text "Heavy Metal Index" leaks the cross-property link that would tell a
// crawler these faces belong to one institution. This lint stops both from
// regressing after the 2026-08-10 cross-property linking pass.
//
// Directions honored here (parent → children are all allowed):
//   parent → index  : allowed (cite the literature base)
//   parent → cert   : allowed (name the program it governs)
//   parent → tested : allowed
// The parent has no forbidden outbound direction; the index→cert prohibition is
// enforced by the INDEX's own lint, not here.
//
// Checks:
//   1. ENTITY NAME (blocking) — the only correct operator string is
//      "Institute of Contaminant Standards". "Institute for Contaminant
//      Standards" and any "Contamination Standards" are naming-rule violations
//      (CLAUDE.md Part 14 / project_entity_naming_rule). Scans app + components
//      + lib so the JSON-LD entity graph (lib/org-schema.ts) is covered.
//   2. UNLINKED SIBLING MENTION (blocking) — a rendered surface (app/**/*.tsx,
//      components/**/*.tsx) that prints a sibling's display name must also carry
//      a link to that sibling's domain in the same file.
//   3. BARE PRIMARY-SOURCE CITATION (warning) — a DOI printed in visible text
//      with no accompanying doi.org / href link. Warn-only: the parent rarely
//      cites primary sources directly (it links the index for that).

import fs from "node:fs"
import path from "node:path"

const root = process.cwd()
const errors = []
const warnings = []

function walk(dir, cb) {
  if (!fs.existsSync(dir)) return
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name)
    if (e.isDirectory()) walk(full, cb)
    else cb(full)
  }
}

// Strip line + block comments so the lint's own explanatory prose can safely name
// the forbidden strings. The [^:] guard keeps https:// intact.
function stripComments(s) {
  return s.replace(/\/\*[\s\S]*?\*\//g, " ").replace(/(^|[^:])\/\/[^\n]*/g, "$1")
}

const sourceFiles = []
for (const d of ["app", "components", "lib"]) {
  walk(path.join(root, d), (f) => {
    if (/\.(tsx|ts)$/.test(f) && !f.endsWith(".test.ts")) sourceFiles.push(f)
  })
}

// ---- 1. entity name -------------------------------------------------------
const BAD_ENTITY = [
  { re: /Institute\s+for\s+Contaminant\s+Standards/gi, fix: "Institute of Contaminant Standards" },
  { re: /Institute\s+of\s+Contamination\s+Standards/gi, fix: "Institute of Contaminant Standards" },
  { re: /Contamination\s+Standards/gi, fix: "Contaminant Standards" },
]
for (const f of sourceFiles) {
  const text = stripComments(fs.readFileSync(f, "utf8"))
  const rel = path.relative(root, f)
  for (const { re, fix } of BAD_ENTITY) {
    re.lastIndex = 0
    const m = re.exec(text)
    if (m) errors.push(`ENTITY_NAME: ${rel} contains "${m[0]}" — the only correct form is "${fix}".`)
  }
}

// ---- 2. unlinked sibling mention -----------------------------------------
// display-name (as rendered) → the domain a link to it must contain.
const SIBLINGS = [
  { name: /Heavy Metal Index/g, domain: "heavymetalindex.com", label: "index" },
  { name: /Forever Chemicals Index/g, domain: "foreverchemicalsindex.com", label: "index" },
  { name: /Heavy Metal Tested\s*&(?:amp;)?\s*Certified/g, domain: "heavymetalcertified.com", label: "cert" },
  { name: /Heavy Metal Certified/g, domain: "heavymetalcertified.com", label: "cert" },
]
const renderFiles = sourceFiles.filter((f) => /\/(app|components)\//.test(f))
for (const f of renderFiles) {
  const raw = fs.readFileSync(f, "utf8")
  const text = stripComments(raw)
  const rel = path.relative(root, f)
  for (const { name, domain, label } of SIBLINGS) {
    name.lastIndex = 0
    if (name.test(text) && !text.includes(domain)) {
      errors.push(
        `UNLINKED_SIBLING: ${rel} names the ${label} property but carries no link to ${domain} — a sibling mention must be a real link, not dead text.`,
      )
    }
  }
}

// ---- 3. bare primary-source citation (warn) ------------------------------
const DOI = /\b10\.\d{4,9}\/[^\s"'<>)]+/g
for (const f of renderFiles) {
  const text = stripComments(fs.readFileSync(f, "utf8"))
  const rel = path.relative(root, f)
  DOI.lastIndex = 0
  let m
  while ((m = DOI.exec(text)) !== null) {
    const around = text.slice(Math.max(0, m.index - 60), m.index + m[0].length + 20)
    if (!/doi\.org|href/.test(around)) {
      warnings.push(`BARE_DOI: ${rel} prints DOI "${m[0]}" without a doi.org link.`)
    }
  }
}

// ---- report ---------------------------------------------------------------
for (const w of warnings) console.warn(`  ⚠ ${w}`)
if (errors.length) {
  console.error(`crosslink-lint: ${errors.length} violation(s):`)
  for (const e of errors) console.error(`  ✗ ${e}`)
  process.exit(1)
}
console.log(
  `crosslink-lint: OK (${sourceFiles.length} source files; entity name canonical, no unlinked sibling mentions${warnings.length ? `; ${warnings.length} warning(s)` : ""}).`,
)
process.exit(0)

#!/usr/bin/env node
// build-data-feeds.mjs — generate the parent site's authority data feeds from the
// Heavy Metal Index corpus. Run locally (the HMI repo is not present on Vercel);
// the emitted public/data/*.json are COMMITTED snapshots, refreshed when HMI changes.
//
// FIREWALL: every feed carries LITERATURE/STEWARDSHIP counts only — study counts,
// jurisdictions, page counts, publication years. NEVER a contamination value, a ppb,
// a threshold, or a percentile. firewall-parent-lint.mjs scans these outputs.
//
// Headline counts replicate tools/build-corpus-counter.mjs normalization so the
// parent's numbers match the index's published homepage figures exactly.

import fs from "node:fs"
import path from "node:path"

const HMI = process.env.HMI_REPO || path.join(process.env.HOME, "Desktop/heavy-metal-index")
const OUT = path.join(process.cwd(), "public/data")
fs.mkdirSync(OUT, { recursive: true })

const sourcesDir = path.join(HMI, "wiki/sources")
if (!fs.existsSync(sourcesDir)) {
  console.error(`HMI corpus not found at ${HMI} (set HMI_REPO). Cannot build feeds.`)
  process.exit(1)
}

// --- frontmatter extraction (minimal; the fields are simple scalars/arrays) ----
function frontmatter(text) {
  if (!text.startsWith("---")) return {}
  const end = text.indexOf("\n---", 3)
  if (end < 0) return {}
  return text.slice(3, end)
}
function scalar(fm, key) {
  const m = fm.match(new RegExp(`^${key}:\\s*(.+)$`, "m"))
  return m ? m[1].trim().replace(/^["']|["']$/g, "") : null
}
function arrayField(fm, key) {
  // inline:  key: [A, B, C]
  const inline = fm.match(new RegExp(`^${key}:\\s*\\[([^\\]]*)\\]`, "m"))
  if (inline) return inline[1].split(",").map((s) => s.trim().replace(/^["']|["']$/g, "")).filter(Boolean)
  // block:   key:\n  - A\n  - B
  const block = fm.match(new RegExp(`^${key}:\\s*\\n((?:\\s*-\\s*.+\\n?)+)`, "m"))
  if (block) return block[1].split("\n").map((l) => l.replace(/^\s*-\s*/, "").trim().replace(/^["']|["']$/g, "")).filter(Boolean)
  return []
}

// --- normalization (mirrors build-corpus-counter.mjs) --------------------------
const TYPE_MAP = new Map([
  ["peer-reviewed", "peer_reviewed"], ["peer_reviewed", "peer_reviewed"], ["study", "peer_reviewed"],
  ["systematic-review", "peer_reviewed"], ["review-chapter", "peer_reviewed"], ["meta-analysis", "peer_reviewed"],
  ["gov-report", "government"], ["government_report", "government"], ["government-report", "government"],
  ["government_dataset", "government"], ["gov-data", "government"], ["gov-guidance", "government"],
  ["government_documentation", "government"], ["regulation", "government"],
])
const DB_PATTERNS = [/\btds\b/i, /\bgems\b/i, /\bcompliance\b/i, /\bsurvey\b/i, /\bsurveillance\b/i, /\bmonitoring\b/i,
  /fy\d{4}/i, /-tds-/i, /^fda\d{4}-(infant|baby|juice|food|toxic|compliance|survey|tds|special|analytical)/i,
  /^efsa-?\d/i, /^fsa\d{4}-/i, /^who-?(gems|tds)/i, /^codex-/i, /^atsdr-/i]

const stats = { peer_reviewed: 0, government: 0, a_tier: 0, sources_total: 0, dois: 0 }
const jurisdictionCounts = {}
const yearCounts = {}
const databaseSet = new Set()

for (const file of fs.readdirSync(sourcesDir)) {
  if (!file.endsWith(".md") || file === "index.md" || file === "_TEMPLATE.md") continue
  const fm = frontmatter(fs.readFileSync(path.join(sourcesDir, file), "utf8"))
  stats.sources_total += 1
  const cite = scalar(fm, "cite_key") || path.basename(file, ".md")
  const type = (scalar(fm, "source_type") || "").toLowerCase()
  const norm = TYPE_MAP.get(type)
  if (norm === "peer_reviewed") stats.peer_reviewed += 1
  else if (norm === "government") stats.government += 1
  if ((scalar(fm, "evidence_tier") || "").toUpperCase() === "A") stats.a_tier += 1
  if (scalar(fm, "doi")) stats.dois += 1
  if (DB_PATTERNS.some((p) => p.test(cite))) databaseSet.add(cite)
  for (const j of arrayField(fm, "jurisdictions")) {
    const code = j.toUpperCase()
    jurisdictionCounts[code] = (jurisdictionCounts[code] || 0) + 1
  }
  const year = scalar(fm, "year")
  if (year && /^\d{4}$/.test(year)) yearCounts[year] = (yearCounts[year] || 0) + 1
}

const countPages = (dir) => {
  const d = path.join(HMI, dir)
  if (!fs.existsSync(d)) return 0
  return fs.readdirSync(d).filter((f) => f.endsWith(".md") && f !== "index.md" && f !== "_TEMPLATE.md").length
}

// --- fingerprint: per-metal source counts -------------------------------------
const metalsDir = path.join(HMI, "wiki/metals")
const fingerprint = []
if (fs.existsSync(metalsDir)) {
  for (const file of fs.readdirSync(metalsDir)) {
    if (!file.endsWith(".md") || file === "index.md") continue
    const fm = frontmatter(fs.readFileSync(path.join(metalsDir, file), "utf8"))
    const title = scalar(fm, "title") || path.basename(file, ".md")
    const sources = parseInt(scalar(fm, "sources") || "0", 10) || 0
    if (sources > 0) fingerprint.push({ metal: title, slug: path.basename(file, ".md"), count: sources })
  }
  fingerprint.sort((a, b) => b.count - a.count)
}

// --- emit ---------------------------------------------------------------------
const authority = {
  _note: "Literature/stewardship counts only. No contamination values, thresholds, or percentiles.",
  generated: process.env.FEED_DATE || null,
  sources_total: stats.sources_total,
  peer_reviewed: stats.peer_reviewed,
  government: stats.government,
  databases: databaseSet.size,
  a_tier: stats.a_tier,
  dois: stats.dois,
  jurisdictions: Object.keys(jurisdictionCounts).length,
  ingredients: countPages("wiki/ingredients"),
  products: countPages("wiki/products"),
  metals: countPages("wiki/metals"),
  regulations: countPages("wiki/regulations"),
}
const studyDensity = {
  _note: "Number of studies in the ICS corpus by study jurisdiction. NOT contamination levels.",
  jurisdictions: Object.entries(jurisdictionCounts).map(([code, count]) => ({ code, count })).sort((a, b) => b.count - a.count),
}
const studiesByYear = {
  _note: "Indexed studies by publication year (corpus growth). Not certification activity.",
  years: Object.entries(yearCounts).map(([year, count]) => ({ year: +year, count })).sort((a, b) => a.year - b.year),
}
const fingerprintFeed = {
  _note: "Per-metal study volume (depth of evidence). NOT risk level or threshold.",
  metals: fingerprint,
}

fs.writeFileSync(path.join(OUT, "authority-stats.json"), JSON.stringify(authority, null, 2))
fs.writeFileSync(path.join(OUT, "study-density.json"), JSON.stringify(studyDensity, null, 2))
fs.writeFileSync(path.join(OUT, "studies-by-year.json"), JSON.stringify(studiesByYear, null, 2))
fs.writeFileSync(path.join(OUT, "fingerprint.json"), JSON.stringify(fingerprintFeed, null, 2))

console.log(`data-feeds: ${authority.sources_total} sources (${authority.peer_reviewed} peer-reviewed, ${authority.government} gov, ${authority.databases} databases, ${authority.a_tier} A-tier, ${authority.dois} DOIs), ${authority.jurisdictions} jurisdictions, ${authority.metals} metals, ${authority.products} products, ${authority.regulations} regulations.`)
console.log(`  study-density: ${studyDensity.jurisdictions.length} jurisdictions (top: ${studyDensity.jurisdictions.slice(0, 5).map((j) => j.code + ":" + j.count).join(", ")})`)
console.log(`  fingerprint: ${fingerprint.length} metals · studies-by-year: ${studiesByYear.years.length} years`)

// Brand registry — the parent-owned canonical Brand entities, Class A
// (public_registry). FIREWALL RULES (CLAUDE.md Part 12 + EU database right):
//
//   - Opt-in only. A brand renders publicly ONLY when indexable === true. The
//     default is false (protects the client book / EU database right).
//   - Identity only. Name, site, logo, the programs held (as chips), products in
//     scope by IDENTITY ONLY (name/GTIN/category). NEVER a contamination value, a
//     COA, a pass-margin, a per-analyte number, or any threshold tested against.
//   - No enumeration (plan S7). There is NO browsable "all certified brands"
//     directory. Search resolves a SPECIFIC query to at most ONE brand; an
//     ambiguous or too-generic query returns guidance, never a list. Probing the
//     box must not reconstruct the opt-in client book.
//
// In production this reads the physically-separate published-projection datastore
// (allow-by-projection, fail-closed — NOT a filtered read of the CRM DB). For the
// scaffold it is a typed literal of opt-in brands with identity-only fields.

export interface BrandProductIdentity {
  name: string
  gtin?: string
  category: string
}

export interface Brand {
  slug: string
  legalName: string
  displayName: string
  website?: string
  /** Opt-in. Public surfaces render this brand ONLY when true. */
  indexable: boolean
  /** Programs held, rendered as chips. */
  programs: string[]
  /** Products in scope — IDENTITY ONLY. No numbers. */
  products: BrandProductIdentity[]
  /** Live mark status, read at runtime in production. */
  markStatus: "active" | "suspended" | "expired"
  /** Opaque verification ids (resolve on the verify subdomain). */
  certificateIds: string[]
}

// Scaffold data. Two opt-in brands; identity only.
const BRANDS: Brand[] = [
  {
    slug: "example-foods",
    legalName: "Example Foods, Inc.",
    displayName: "Example Foods",
    website: "https://example.com",
    indexable: true,
    programs: ["Heavy Metal Tested & Certified"],
    products: [
      { name: "Example Infant Oatmeal", gtin: "00012345678905", category: "Baby cereals" },
      { name: "Example Toddler Puffs", category: "Teething and snacks" },
    ],
    markStatus: "active",
    certificateIds: ["HMTC-EX-0001"],
  },
  {
    slug: "northwater-seafood",
    legalName: "Northwater Seafood Co.",
    displayName: "Northwater Seafood",
    website: "https://northwater.example",
    indexable: true,
    programs: ["Heavy Metal Tested & Certified"],
    products: [{ name: "Northwater Canned Tuna", category: "Canned seafood" }],
    markStatus: "active",
    certificateIds: ["HMTC-NW-0007"],
  },
]

const MIN_QUERY_LEN = 3

function normalize(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim()
}

export function getPublicBrand(slug: string): Brand | undefined {
  const b = BRANDS.find((x) => x.slug === slug)
  return b && b.indexable ? b : undefined
}

export type SearchResult =
  | { kind: "match"; brand: Brand }
  | { kind: "too_generic" }
  | { kind: "ambiguous" }
  | { kind: "none" }

// Firewall-safe resolver. Returns at most ONE brand. Never returns a list, never
// a count. A query that is too short/generic, or that matches more than one opt-in
// brand, returns guidance — so the box cannot be used to enumerate the client book.
export function resolveBrand(rawQuery: string): SearchResult {
  const q = normalize(rawQuery)
  if (q.length < MIN_QUERY_LEN) return { kind: "too_generic" }

  const pool = BRANDS.filter((b) => b.indexable)
  const matches = pool.filter((b) => {
    const hay = normalize(`${b.displayName} ${b.legalName} ${b.website ?? ""}`)
    return hay.includes(q)
  })

  // Guard against generic single-word probes ("foods", "seafood", "co") that would
  // resolve a brand the searcher does not actually know: require the query to be a
  // reasonably specific fragment of the brand identity (≥ 4 chars OR a multi-word
  // token), so confirmation requires already knowing the brand.
  const specificEnough = q.length >= 4 || q.includes(" ")
  if (!specificEnough) return { kind: "too_generic" }

  if (matches.length === 1) return { kind: "match", brand: matches[0] }
  if (matches.length > 1) return { kind: "ambiguous" }
  return { kind: "none" }
}

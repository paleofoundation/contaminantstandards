// SiteRegistry — the single source of truth for every property in the ICS
// network, keyed by ROLE, never by a hardcoded domain string. Canonicals, the
// network-hub cards, the schema.org subOrganization edges, and the firewall all
// derive from this. A domain flip (e.g. heavymetalcertified.com → a freed
// heavymetaltested.com) is a one-row edit here, not a code change across the app.
//
// In production this is a database table (SiteRegistry) the parent owns; for the
// scaffold it is a typed literal. Reserved verticals render as "in development"
// cards on the PARENT ONLY (no live link, no indexable stub) — the multi-vertical
// institutional story ("a standards body for contaminants, plural") is the whole
// reason ICS exists.

export type SiteRole = "parent" | "index" | "cert" | "portal" | "verify"
export type SiteStatus = "live" | "reserved" | "interim"

export interface SiteEntry {
  role: SiteRole
  /** Domain WITHOUT protocol. Empty string for a reserved property not yet secured. */
  domain: string
  status: SiteStatus
  /** Whether this property is indexable / linkable from the public hub. */
  publicLink: boolean
}

export interface Vertical {
  key: string
  /** Program names, not domain strings — the pattern reads as a repeatable system. */
  displayName: string
  status: SiteStatus
  /** One-line institutional description (governance intent, never transactional). */
  blurb: string
  sites: SiteEntry[]
}

export const PARENT: SiteEntry = {
  role: "parent",
  domain: "contaminantstandards.com",
  status: "live",
  publicLink: true,
}

export const PORTAL: SiteEntry = {
  // ONE auth host (plan S2). Aliases (portal./app.) 301 here, never serve.
  role: "portal",
  domain: "apply.contaminantstandards.com",
  status: "live",
  publicLink: false, // noindex, auth-gated
}

export const VERIFY: SiteEntry = {
  role: "verify",
  domain: "verify.contaminantstandards.com",
  status: "live",
  publicLink: false, // noindex, single-record
}

export const VERTICALS: Vertical[] = [
  {
    key: "heavy-metals",
    displayName: "Heavy Metals",
    status: "live",
    blurb:
      "Certification against the complete heavy-metals food-and-supply-chain literature. Ten-analyte panel, published per subcategory in native basis.",
    sites: [
      { role: "index", domain: "heavymetalindex.com", status: "live", publicLink: true },
      { role: "cert", domain: "heavymetalcertified.com", status: "live", publicLink: true },
    ],
  },
  {
    key: "microplastics",
    displayName: "Microplastics",
    status: "reserved",
    blurb:
      "A contaminant standard for microplastics, in development. The same architecture: an independent literature index and a certification authority, governed in common, firewalled by data class.",
    sites: [
      { role: "index", domain: "microplasticsindex.com", status: "reserved", publicLink: false },
      { role: "cert", domain: "microplasticstested.com", status: "reserved", publicLink: false },
    ],
  },
  {
    key: "forever-chemicals",
    displayName: "Forever Chemicals (PFAS)",
    status: "reserved",
    blurb:
      "A contaminant standard for PFAS, in development. Same model, same firewall — an independent index of the literature and a separate certification standard.",
    sites: [
      { role: "index", domain: "foreverchemicalsindex.com", status: "reserved", publicLink: false },
      { role: "cert", domain: "foreverchemicalstested.com", status: "reserved", publicLink: false },
    ],
  },
]

export function liveVerticals(): Vertical[] {
  return VERTICALS.filter((v) => v.status === "live")
}

export function siteOf(vertical: Vertical, role: SiteRole): SiteEntry | undefined {
  return vertical.sites.find((s) => s.role === role)
}

export function httpsUrl(domain: string): string {
  return `https://${domain}`
}

/** The parent's own base URL, used for self-canonical (never cross-domain). */
export const PARENT_BASE = httpsUrl(PARENT.domain)

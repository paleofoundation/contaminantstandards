// Single source of truth for ICS network destinations. Each face has its own
// activation gate. Reserved domains never become public merely because another
// face of the same vertical is live.
export type SiteRole = "parent" | "index" | "cert" | "portal" | "verify"
export type SiteStatus = "live" | "reserved" | "interim"

export interface SiteEntry {
  role: SiteRole
  label: string
  /** Domain without protocol; empty until a reserved name is approved. */
  domain: string
  status: SiteStatus
  publicLink: boolean
}

export interface Vertical {
  key: string
  displayName: string
  status: SiteStatus
  blurb: string
  sites: [SiteEntry & { role: "index" }, SiteEntry & { role: "cert" }]
  /** TODO Q11: informational target only, never a public application link yet. */
  certificationHub: { path: string; status: "reserved"; publicLink: false }
}

export const PARENT: SiteEntry = {
  role: "parent", label: "Institute of Contaminant Standards",
  domain: "contaminantstandards.com", status: "live", publicLink: true,
}
export const PORTAL: SiteEntry = {
  role: "portal", label: "Application portal",
  domain: "apply.contaminantstandards.com", status: "live", publicLink: false,
}
export const VERIFY: SiteEntry = {
  role: "verify", label: "Certificate verification",
  domain: "verify.contaminantstandards.com", status: "live", publicLink: false,
}

const certificationHub = (program: string): Vertical["certificationHub"] => ({
  // TODO Q11: cert sites will link here only after the hub exists and is approved.
  path: `/certify?program=${program}`, status: "reserved", publicLink: false,
})

export const VERTICALS: Vertical[] = [
  {
    key: "heavy-metals", displayName: "Heavy Metals", status: "live",
    blurb: "Independent heavy-metals evidence and a separate certification standard per product category with scheduled retesting.",
    sites: [
      { role: "index", label: "Heavy Metal Index", domain: "heavymetalindex.com", status: "live", publicLink: true },
      { role: "cert", label: "Heavy Metal Tested & Certified", domain: "heavymetalcertified.com", status: "live", publicLink: true },
    ],
    certificationHub: certificationHub("heavy-metals"),
  },
  {
    key: "forever-chemicals", displayName: "Forever Chemicals (PFAS)", status: "reserved",
    blurb: "An independent PFAS literature index and a separate certification program are in development.",
    sites: [
      // TODO ICS-HUB-WIRE-1: flip ONLY the PFAS index after Elon FCI deploy PASS.
      // The cert requires its own separate activation PASS; keep both reserved in PREP.
      { role: "index", label: "Forever Chemicals Index", domain: "foreverchemicalsindex.com", status: "reserved", publicLink: false },
      { role: "cert", label: "Forever Chemicals Tested", domain: "foreverchemicalstested.com", status: "reserved", publicLink: false },
    ],
    certificationHub: certificationHub("pfas"),
  },
  {
    key: "microplastics", displayName: "Microplastics", status: "reserved",
    blurb: "An independent microplastics literature index and a separate certification program are in development.",
    sites: [
      { role: "index", label: "Microplastics Index", domain: "microplasticsindex.com", status: "reserved", publicLink: false },
      { role: "cert", label: "Microplastics Tested", domain: "microplasticstested.com", status: "reserved", publicLink: false },
    ],
    certificationHub: certificationHub("microplastics"),
  },
  ...[3, 4, 5, 6].map((position): Vertical => ({
    key: `vertical-${position}`, displayName: "TBD", status: "reserved",
    blurb: "Reserved. Names and domains await Elon approval.",
    sites: [
      { role: "index", label: "TBD", domain: "", status: "reserved", publicLink: false },
      { role: "cert", label: "TBD", domain: "", status: "reserved", publicLink: false },
    ],
    certificationHub: certificationHub(`vertical-${position}`),
  })),
]

export function isPublicSite(site: SiteEntry): boolean {
  return site.status === "live" && site.publicLink && site.domain.length > 0
}

/** The index can cite the parent and other indexes, never a cert or intake. */
export function publicSites(vertical: Vertical, from: SiteRole = "parent"): SiteEntry[] {
  return vertical.sites.filter((site) => isPublicSite(site) && (from !== "index" || site.role === "index"))
}

export function liveVerticals(): Vertical[] {
  return VERTICALS.filter((vertical) => publicSites(vertical).length > 0)
}

export function publicNetworkSites(from: SiteRole = "parent"): SiteEntry[] {
  return VERTICALS.flatMap((vertical) => publicSites(vertical, from))
}

export function siteOf(vertical: Vertical, role: SiteRole): SiteEntry | undefined {
  return vertical.sites.find((site) => site.role === role)
}

export function httpsUrl(domain: string): string { return `https://${domain}` }
export function siblingLinkAttrs(title?: string): { target: "_blank"; rel: "noopener"; title?: string } {
  return { target: "_blank", rel: "noopener", ...(title ? { title } : {}) }
}
export const PARENT_BASE = httpsUrl(PARENT.domain)

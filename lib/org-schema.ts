import { PARENT_BASE, httpsUrl, publicNetworkSites } from "./site-registry"

export function parentOrganizationJsonLd() {
  const sites = publicNetworkSites()
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${PARENT_BASE}/#organization`,
    name: "Institute of Contaminant Standards",
    alternateName: "ICS",
    url: PARENT_BASE,
    // Both live faces are discoverable; independent indexes are not cert subsidiaries.
    sameAs: sites.map((site) => httpsUrl(site.domain)),
    subOrganization: sites.filter((site) => site.role === "cert").map((site) => ({
      "@type": "Organization",
      "@id": `${httpsUrl(site.domain)}/#organization`,
      name: site.label,
      url: httpsUrl(site.domain),
      parentOrganization: { "@id": `${PARENT_BASE}/#organization` },
    })),
  }
}

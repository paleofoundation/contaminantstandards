// schema.org Organization hierarchy for the ICS network (plan 6.B).
//
// One stable @id per entity (homepage #organization), referenced across all
// sites so Google fuses them into ONE cluster and reads "the program (child) and
// the body behind it (parent)" — structurally child-#1 / parent-#2 on
// transactional terms.
//
// The PARENT declares subOrganization: [live cert programs]. Each child cert site
// declares parentOrganization: ICS (in its own build). The independent literature
// INDEX is deliberately NOT a subOrganization — its independence is the moat, so
// it keeps publisher: Paleo Foundation and is never framed as a certification
// sub-brand. We therefore omit the index from the org tree (it relates by one-way
// citation, not by org membership).

import { PARENT_BASE, httpsUrl, liveVerticals, siteOf } from "./site-registry"

export function parentOrganizationJsonLd() {
  const subOrgs = liveVerticals()
    .map((v) => {
      const cert = siteOf(v, "cert")
      if (!cert || !cert.publicLink) return null
      const base = httpsUrl(cert.domain)
      return {
        "@type": "Organization",
        "@id": `${base}/#organization`,
        name: `Heavy Metal Tested & Certified`,
        url: base,
        parentOrganization: { "@id": `${PARENT_BASE}/#organization` },
      }
    })
    .filter(Boolean)

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${PARENT_BASE}/#organization`,
    name: "The Institute for Contaminant Standards",
    alternateName: "ICS",
    url: PARENT_BASE,
    description:
      "An independent standards body that operates per-contaminant certification programs, each backed by a separate, independent literature index. Governs heavy metals, with microplastics and PFAS in development.",
    subOrganization: subOrgs,
  }
}

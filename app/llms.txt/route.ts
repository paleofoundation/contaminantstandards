import { publications, SITE_ORIGIN } from "../site-data";

export function GET() {
  const papers = publications
    .map(
      (paper) =>
        `- ${paper.identifier}. ${paper.title}: ${SITE_ORIGIN}/articles/${paper.slug}`,
    )
    .join("\n");

  const body = `# Institute of Contaminant Standards (ICS)

ICS is the institutional governance body for independent contaminant evidence indexes and certification programs. It is a trade name of Paleo Certified, Inc.

## Canonical organization
- Website: ${SITE_ORIGIN}
- Evidence stewardship: ${SITE_ORIGIN}/evidence
- Governance: ${SITE_ORIGIN}/governance
- Policy register: ${SITE_ORIGIN}/governance/policies
- Network: ${SITE_ORIGIN}/network
- Brand registry: ${SITE_ORIGIN}/registry
- Contact routes: ${SITE_ORIGIN}/contact
- Licensing and reuse: ${SITE_ORIGIN}/licensing

## Named research and standards authority
- Karen Pendergrass: ${SITE_ORIGIN}/people/karen-pendergrass
- Role: Founder, Chief Executive Officer, Standards Architect, and Research Lead
- ORCID: https://orcid.org/0000-0002-2348-7259

## Operational network
- Heavy Metal Index (public literature and regulatory evidence): https://heavymetalindex.com/
- Heavy Metal Tested & Certified (published standards and certification program): https://heavymetalcertified.com/

## Institutional publications
${papers}

## Publication boundary
ICS publishes institutional governance and methods analysis, and evidence reviews of the measured literature. An evidence review reports source measurements on the source's own basis and does not set a certification limit. Current certification limits remain authoritative on Heavy Metal Tested & Certified. Literature and occurrence evidence remain authoritative on the Heavy Metal Index.

## Institutional responsibilities maintained here
- Legal operator and trade-name identity
- Named leadership, roles, and conflicts
- Standards governance, impartiality, recusal, consultation, and appeals
- Publication ethics, corrections, retractions, and versioning
- Public brand identity and current-state certificate verification
- Licensing, media, regulatory, legal, and privacy contact routes
`;

  return new Response(body, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
}

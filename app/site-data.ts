export const SITE_ORIGIN = "https://contaminantstandards.com";
export const ORGANIZATION_ID = `${SITE_ORIGIN}/#organization`;
export const WEBSITE_ID = `${SITE_ORIGIN}/#website`;
export const KAREN_PATH = "/people/karen-pendergrass";
export const KAREN_ID = `${SITE_ORIGIN}${KAREN_PATH}#person`;

export const karenProfiles = {
  orcid: "https://orcid.org/0000-0002-2348-7259",
  scholar: "https://scholar.google.com/citations?user=xnzAh-wAAAAJ&hl=en",
  personal: "https://karenpendergrass.com/",
  paleoFoundation: "https://paleofoundation.com/about",
  microbiomeMedicine: "https://microbiomemedicine.com/",
};

export const publications = [
  {
    slug: "why-heavy-metal-evidence-requires-an-independent-public-index",
    identifier: "ICS-IA-2026-001",
    number: "01",
    title: "Why Heavy-Metal Evidence Requires an Independent Public Index",
    shortTitle: "Why heavy-metal evidence requires an independent public index",
    description:
      "Why literature evidence must remain publicly traceable and structurally separate from certification decisions.",
    topic: "Institutional architecture",
    datePublished: "2026-08-17",
    dateModified: "2026-08-17",
    readingTime: "10 min read",
  },
  {
    slug: "from-evidence-to-threshold",
    identifier: "ICS-IA-2026-002",
    number: "02",
    title: "From Evidence to Threshold: Why Occurrence Data and Certification Limits Must Remain Separate",
    shortTitle: "From evidence to threshold",
    description:
      "A governance model for keeping descriptive occurrence evidence distinct from normative certification limits.",
    topic: "Evidence boundary",
    datePublished: "2026-08-17",
    dateModified: "2026-08-17",
    readingTime: "11 min read",
  },
  {
    slug: "standards-as-living-records",
    identifier: "ICS-IA-2026-003",
    number: "03",
    title: "Standards as Living Records: Why Version History Is Part of Conformity",
    shortTitle: "Standards as living records",
    description:
      "Why an auditable standard needs stable editions, explicit effective dates, durable superseded records, and certificates that resolve to the rule in force.",
    topic: "Version governance",
    datePublished: "2026-08-17",
    dateModified: "2026-08-17",
    readingTime: "9 min read",
  },
  {
    slug: "a-number-without-a-basis-is-not-a-comparable-result",
    identifier: "ICS-IA-2026-004",
    number: "04",
    title: "A Number Without a Basis Is Not a Comparable Result",
    shortTitle: "A number without a basis is not a comparable result",
    description:
      "How product form, edible portion, preparation, moisture, units, and sampling identity determine what an elemental result actually means.",
    topic: "Measurement comparability",
    datePublished: "2026-08-17",
    dateModified: "2026-08-17",
    readingTime: "10 min read",
  },
  {
    slug: "analyte-identity-is-not-a-footnote",
    identifier: "ICS-IA-2026-005",
    number: "05",
    title: "Analyte Identity Is Not a Footnote: Why “Total Metal” Can Answer the Wrong Question",
    shortTitle: "Analyte identity is not a footnote",
    description:
      "Why total-element results, chemical species, operational fractions, and method-defined analytes must remain distinct in evidence and standards.",
    topic: "Analytical identity",
    datePublished: "2026-08-17",
    dateModified: "2026-08-17",
    readingTime: "10 min read",
  },
];

export function canonical(path = "/") {
  return new URL(path, SITE_ORIGIN).toString();
}

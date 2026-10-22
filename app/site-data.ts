import { orcidUrl } from "./people-data";

export const SITE_ORIGIN = "https://contaminantstandards.com";
export const ORGANIZATION_ID = `${SITE_ORIGIN}/#organization`;
export const WEBSITE_ID = `${SITE_ORIGIN}/#website`;
export const KAREN_PATH = "/people/karen-pendergrass";
export const KAREN_ID = `${SITE_ORIGIN}${KAREN_PATH}#person`;

export const publicationSeries = {
  "ICS-IA": {
    id: "ICS-IA",
    name: "Institutional Analysis",
    masthead: "ICS INSTITUTIONAL ANALYSIS",
    volumeLabel: "VOL. 1 · 2026",
    classLabel: "GOVERNANCE & METHODS",
    formatPrefix: "Institutional analysis",
    articleSection: "Institutional Analysis",
    citationJournal: "ICS Institutional Analysis",
  },
  "ICS-ER": {
    id: "ICS-ER",
    name: "Evidence Review",
    masthead: "ICS EVIDENCE REVIEW",
    volumeLabel: "ICS-ER · 2026",
    classLabel: "CROSS-CONTAMINANT RECORD",
    formatPrefix: "Evidence review",
    articleSection: "Evidence Review",
    citationJournal: "ICS Evidence Review",
  },
} as const;

export type PublicationSeriesId = keyof typeof publicationSeries;

export function publicationReadLabel(series: PublicationSeriesId) {
  return series === "ICS-ER" ? "Read review" : "Read analysis";
}

export type Publication = {
  slug: string;
  identifier: string;
  series: PublicationSeriesId;
  number: string;
  title: string;
  shortTitle: string;
  description: string;
  topic: string;
  datePublished: string;
  dateModified: string;
  readingTime: string;
  citations?: string[];
};

export const karenProfiles = {
  orcid: orcidUrl("karen"),
  scholar: "https://scholar.google.com/citations?user=xnzAh-wAAAAJ&hl=en",
  personal: "https://karenpendergrass.com/",
  paleoFoundation: "https://paleofoundation.com/about",
  microbiomeMedicine: "https://microbiomemedicine.com/",
};

export const publications: Publication[] = [
  {
    slug: "why-heavy-metal-evidence-requires-an-independent-public-index",
    identifier: "ICS-IA-2026-001",
    series: "ICS-IA",
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
    series: "ICS-IA",
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
    series: "ICS-IA",
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
    series: "ICS-IA",
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
    series: "ICS-IA",
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
  {
    slug: "contaminants-in-baby-wipes",
    identifier: "ICS-ER-2026-001",
    series: "ICS-ER",
    number: "06",
    title: "Contaminants in Baby Wipes",
    shortTitle: "Contaminants in baby wipes",
    description:
      "What has been measured in wet wipes for preservatives, fragrance allergens, phthalates, PFAS, microfibers, and heavy metals, on each source's own basis, and why a concentration in a wipe is not yet a dose to an infant.",
    topic: "Evidence review",
    datePublished: "2026-10-21",
    dateModified: "2026-10-21",
    readingTime: "28 min read",
    citations: [
      "https://doi.org/10.83376/hmi.heavy-metals-in-baby-wipes",
      "https://heavymetalindex.com/synthesis/contaminants-in-baby-wipes-beyond-metals",
      "https://doi.org/10.83376/hmi.antimony-in-baby-products",
    ],
  },
];

export function canonical(path = "/") {
  return new URL(path, SITE_ORIGIN).toString();
}

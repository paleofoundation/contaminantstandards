import type { Metadata } from "next";
import { headers } from "next/headers";
import type { ReactNode } from "react";
import { PersonName } from "../person-name";
import { orcidUrl } from "../people-data";
import { JsonLd } from "../json-ld";
import {
  canonical,
  KAREN_ID,
  ORGANIZATION_ID,
  SITE_ORIGIN,
  publicationSeries,
  type PublicationSeriesId,
} from "../site-data";

export type PublicationRecord = {
  slug: string;
  identifier: string;
  title: string;
  description: string;
  datePublished: string;
  dateModified: string;
  readingTime: string;
  series?: PublicationSeriesId;
  citations?: string[];
};

function seriesOf(record: PublicationRecord) {
  return publicationSeries[record.series ?? "ICS-IA"];
}

async function requestOrigin() {
  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") ??
    requestHeaders.get("host") ??
    "institute-contaminant-standards.kmfp.chatgpt.site";
  const protocol =
    requestHeaders.get("x-forwarded-proto") ??
    (host.startsWith("localhost") ? "http" : "https");
  return `${protocol}://${host}`;
}

export async function publicationMetadata(record: PublicationRecord): Promise<Metadata> {
  await requestOrigin();
  const path = `/articles/${record.slug}`;

  return {
    title: `${record.title} | ICS`,
    description: record.description,
    alternates: { canonical: canonical(path) },
    authors: [{ name: "Karen Pendergrass", url: canonical("/people/karen-pendergrass") }],
    other: { citation_author_orcid: orcidUrl("karen") },
    openGraph: {
      title: record.title,
      description: record.description,
      type: "article",
      url: canonical(path),
      siteName: "Institute of Contaminant Standards",
      publishedTime: record.datePublished,
      modifiedTime: record.dateModified,
      authors: [canonical("/people/karen-pendergrass")],
      images: [],
    },
    twitter: {
      card: "summary",
      title: record.title,
      description: record.description,
      images: [],
    },
  };
}

export function PublicationJsonLd({
  record,
  keywords,
}: {
  record: PublicationRecord;
  keywords: string[];
}) {
  const url = canonical(`/articles/${record.slug}`);
  const series = seriesOf(record);

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Article",
        "@id": `${url}#article`,
        headline: record.title,
        description: record.description,
        url,
        mainEntityOfPage: url,
        identifier: record.identifier,
        datePublished: record.datePublished,
        dateModified: record.dateModified,
        inLanguage: "en",
        articleSection: series.articleSection,
        keywords,
        author: { "@id": KAREN_ID },
        publisher: { "@id": ORGANIZATION_ID },
        isPartOf: { "@id": `${SITE_ORIGIN}/articles#publication-register` },
        publishingPrinciples: canonical("/governance/policies"),
        copyrightHolder: { "@id": ORGANIZATION_ID },
        copyrightYear: 2026,
        ...(record.citations?.length ? { citation: record.citations } : {}),
      }}
    />
  );
}

export function PublicationHeader({
  record,
  dek,
}: {
  record: PublicationRecord;
  dek: string;
}) {
  const publicationDate = new Date(`${record.datePublished}T00:00:00Z`).toLocaleDateString(
    "en-GB",
    { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" },
  );
  const series = seriesOf(record);

  return (
    <header className="publication-header">
      <div className="publication-masthead">
        <span>{series.masthead}</span>
        <span>{series.volumeLabel}</span>
      </div>
      <p className="publication-class">{series.classLabel}</p>
      <h1>{record.title}</h1>
      <p className="publication-dek">{dek}</p>
      <div className="publication-byline">
        <div>
          <span>AUTHOR</span>
          <PersonName person="karen" href="/people/karen-pendergrass" />
          <small>Standards Architect &amp; Research Lead</small>
        </div>
        <div><span>PUBLISHED</span><b>{publicationDate}</b></div>
        <div><span>RECORD</span><b>{record.identifier}</b></div>
        <div><span>FORMAT</span><b>{series.formatPrefix} · {record.readingTime}</b></div>
      </div>
    </header>
  );
}

export function ArticleSection({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="paper-section">
      <div className="paper-section-label"><span>{number}</span><p>{title}</p></div>
      <div className="paper-section-body">{children}</div>
    </section>
  );
}

export type PublicationReference = {
  label: string;
  href: string;
  /** Stable key used by inline citation markers. Optional for pages without inline markers. */
  id?: string;
  apa?: {
    authors: string;
    date: string;
    title: string;
    italicTitle: boolean;
    source?: string;
    volume?: string;
    issue?: string;
    pages?: string;
    articleNumber?: string;
    publisher?: string;
    description?: string;
  };
};

function ApaReference({ reference }: { reference: PublicationReference }) {
  const entry = reference.apa;
  if (!entry) return <a href={reference.href}>{reference.label}</a>;
  const author = entry.authors === "Pendergrass, K."
    ? <PersonName person="karen">{entry.authors}</PersonName>
    : entry.authors;
  return (
    <>
      {entry.authors ? <>{author}{entry.authors.endsWith(".") ? " " : ". "}({entry.date}). </> : null}
      {entry.italicTitle ? <i>{entry.title}</i> : entry.title}
      {entry.description ? (entry.description.startsWith("Master’s thesis")
        ? <> [{entry.description}]</>
        : <> ({entry.description})</>) : null}.
      {entry.source ? <> <i>{entry.source}{entry.volume ? `, ${entry.volume}` : ""}</i>{entry.issue ? `(${entry.issue})` : ""}{entry.pages ? `, ${entry.pages}` : ""}{entry.articleNumber ? `${entry.volume ? "," : "."} Article ${entry.articleNumber}` : ""}{!entry.authors ? ` (${entry.date})` : ""}.</> : null}
      {entry.publisher ? <> {entry.publisher}.</> : null}{" "}
      <a href={reference.href} target="_blank" rel="noopener">{reference.href}</a>
    </>
  );
}

/** Anchor id of the nth (1-based) reference entry in PublicationFooter. */
export function referenceAnchor(n: number) {
  return `ref-${n}`;
}

/**
 * Build an inline citation marker bound to a page's reference list. Markers
 * render as bracketed numbers that link to the matching entry in the footer,
 * so numbering always follows the order of the reference list. An unknown
 * key fails the build rather than rendering a marker that points nowhere.
 */
export function createCite(references: PublicationReference[]) {
  const numbers = new Map<string, number>();
  references.forEach((reference, index) => {
    if (!reference.id) return;
    if (numbers.has(reference.id)) {
      throw new Error(`Duplicate reference id: ${reference.id}`);
    }
    numbers.set(reference.id, index + 1);
  });

  return function Cite({ ids }: { ids: string[] }) {
    const resolved = ids.map((id) => {
      const n = numbers.get(id);
      if (n === undefined) {
        throw new Error(`Unknown reference id: ${id}`);
      }
      return n;
    }).sort((a, b) => a - b);
    return (
      <sup className="cite-marker">
        [
        {resolved.map((n, index) => (
          <span key={n}>
            {index > 0 ? ", " : null}
            <a href={`#${referenceAnchor(n)}`} aria-label={`Reference ${n}`}>{n}</a>
          </span>
        ))}
        ]
      </sup>
    );
  };
}

export function PublicationFooter({
  record,
  references,
  referenceStyle,
  referenceOrder,
}: {
  record: PublicationRecord;
  references: PublicationReference[];
  referenceStyle?: "apa";
  referenceOrder?: "citation" | "alphabetical";
}) {
  const series = seriesOf(record);
  const evidenceReview = record.series === "ICS-ER";
  const entries = references.map((reference, index) => ({ reference, index }));
  if (referenceStyle === "apa" && referenceOrder !== "citation") {
    entries.sort((a, b) => {
      const key = (reference: PublicationReference) => {
        const entry = reference.apa;
        return entry ? `${entry.authors || entry.title} ${entry.date} ${entry.title}` : reference.label;
      };
      return key(a.reference).localeCompare(key(b.reference), "en", { sensitivity: "base" });
    });
  }

  return (
    <>
      <section className={`paper-references${referenceStyle === "apa" ? " paper-references--apa" : ""}`}>
        <div>
          <p className="section-kicker">{evidenceReview ? "SOURCES REVIEWED" : "REFERENCES & INSTITUTIONAL RECORDS"}</p>
          <h2>{referenceStyle === "apa" ? "References" : evidenceReview ? "Sources for this evidence review" : "Sources used in this analysis"}</h2>
        </div>
        <ol>
          {entries.map(({ reference, index }) => (
            <li key={reference.href} id={referenceAnchor(index + 1)}>
              {referenceStyle === "apa" ? <>
                <span className="paper-reference-number">[{index + 1}]</span>
                <div className="paper-reference-entry"><ApaReference reference={reference} /></div>
              </> : <a href={reference.href} target="_blank" rel="noopener">
                {reference.label} ↗
              </a>}
            </li>
          ))}
        </ol>
      </section>
      <section className="citation-box">
        <div>
          <span>SUGGESTED CITATION</span>
          <p>
            {evidenceReview ? (
              <><PersonName person="karen">Pendergrass, K.</PersonName> (2026). “{record.title}.” <i>{series.citationJournal}</i>. {record.identifier}. Institute of Contaminant Standards.</>
            ) : (
              <><PersonName person="karen">Pendergrass, K.</PersonName> (2026). “{record.title}.” <i>{series.citationJournal}</i>, Vol. 1. {record.identifier}. Institute of Contaminant Standards.</>
            )}
          </p>
        </div>
        <a href="/articles">Publication register →</a>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import { headers } from "next/headers";
import type { ReactNode } from "react";
import { JsonLd } from "../json-ld";
import {
  canonical,
  KAREN_ID,
  ORGANIZATION_ID,
  SITE_ORIGIN,
} from "../site-data";

export type PublicationRecord = {
  slug: string;
  identifier: string;
  title: string;
  description: string;
  datePublished: string;
  dateModified: string;
  readingTime: string;
};

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
        articleSection: "Institutional Analysis",
        keywords,
        author: { "@id": KAREN_ID },
        publisher: { "@id": ORGANIZATION_ID },
        isPartOf: { "@id": `${SITE_ORIGIN}/articles#publication-register` },
        publishingPrinciples: canonical("/governance/policies"),
        copyrightHolder: { "@id": ORGANIZATION_ID },
        copyrightYear: 2026,
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

  return (
    <header className="publication-header">
      <div className="publication-masthead">
        <span>ICS INSTITUTIONAL ANALYSIS</span>
        <span>VOL. 1 · 2026</span>
      </div>
      <p className="publication-class">GOVERNANCE &amp; METHODS</p>
      <h1>{record.title}</h1>
      <p className="publication-dek">{dek}</p>
      <div className="publication-byline">
        <div>
          <span>AUTHOR</span>
          <a href="/people/karen-pendergrass">Karen Pendergrass</a>
          <small>Standards Architect &amp; Research Lead</small>
        </div>
        <div><span>PUBLISHED</span><b>{publicationDate}</b></div>
        <div><span>RECORD</span><b>{record.identifier}</b></div>
        <div><span>FORMAT</span><b>Institutional analysis · {record.readingTime}</b></div>
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

export function PublicationFooter({
  record,
  references,
}: {
  record: PublicationRecord;
  references: { label: string; href: string }[];
}) {
  return (
    <>
      <section className="paper-references">
        <div>
          <p className="section-kicker">REFERENCES &amp; INSTITUTIONAL RECORDS</p>
          <h2>Sources used in this analysis</h2>
        </div>
        <ol>
          {references.map((reference) => (
            <li key={reference.href}>
              <a href={reference.href} target="_blank" rel="noopener">
                {reference.label} ↗
              </a>
            </li>
          ))}
        </ol>
      </section>
      <section className="citation-box">
        <div>
          <span>SUGGESTED CITATION</span>
          <p>
            Pendergrass, K. (2026). “{record.title}.” <i>ICS Institutional Analysis</i>,
            Vol. 1. {record.identifier}. Institute of Contaminant Standards.
          </p>
        </div>
        <a href="/articles">Publication register →</a>
      </section>
    </>
  );
}

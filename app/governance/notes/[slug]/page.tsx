import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PersonName } from "../../../person-name";
import { orcidUrl } from "../../../people-data";
import { JsonLd } from "../../../json-ld";
import { SiteFrame } from "../../../site-chrome";
import { canonical, KAREN_ID, ORGANIZATION_ID } from "../../../site-data";
import { governanceNoteBySlug, governanceNotes, type GovernanceNote } from "../notes";

const PUBLISHED = "1 September 2026";
const PUBLISHED_ISO = "2026-09-01";

export function generateStaticParams() {
  return governanceNotes.map((note) => ({ slug: note.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const note = governanceNoteBySlug(slug);
  if (!note) return { title: "Evidence governance note not found" };
  const url = canonical(`/governance/notes/${note.slug}`);
  const title = `${note.title} | ICS Evidence Governance Note`;
  return {
    title,
    description: note.disposition,
    alternates: { canonical: url },
    authors: [{ name: "Karen Pendergrass", url: canonical("/people/karen-pendergrass") }],
    other: { citation_author_orcid: orcidUrl("karen") },
    openGraph: {
      title: note.title,
      description: note.disposition,
      type: "article",
      url,
      siteName: "Institute of Contaminant Standards",
      publishedTime: PUBLISHED_ISO,
      modifiedTime: PUBLISHED_ISO,
      authors: [canonical("/people/karen-pendergrass")],
      images: [],
    },
    twitter: {
      card: "summary",
      title: note.title,
      description: note.disposition,
      images: [],
    },
  };
}

function noteJsonLd(note: GovernanceNote) {
  const url = canonical(`/governance/notes/${note.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline: note.title,
    description: note.disposition,
    url,
    mainEntityOfPage: url,
    identifier: note.identifier,
    datePublished: PUBLISHED_ISO,
    dateModified: PUBLISHED_ISO,
    inLanguage: "en",
    articleSection: "Evidence Governance Notes",
    keywords: [note.analytes, "evidence governance", "standards scope", "certification firewall"],
    author: { "@id": KAREN_ID },
    publisher: { "@id": ORGANIZATION_ID },
    isPartOf: { "@id": `${canonical("/governance/notes")}#register` },
    isBasedOn: note.hmi,
    citation: [note.hmi, note.hmtc],
    publishingPrinciples: canonical("/governance/policies"),
  };
}

export default async function EvidenceGovernanceNotePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const note = governanceNoteBySlug(slug);
  if (!note) notFound();

  return (
    <SiteFrame>
      <JsonLd data={noteJsonLd(note)} />
      <main className="publication-page">
        <header className="publication-header">
          <div className="publication-masthead">
            <span>ICS EVIDENCE GOVERNANCE NOTE</span>
            <span>REGISTER · 2026</span>
          </div>
          <p className="publication-class">EVIDENCE BOUNDARY &amp; STANDARDS DISPOSITION</p>
          <h1>{note.title}</h1>
          <p className="publication-dek">{note.disposition}</p>
          <div className="publication-byline">
            <div>
              <span>AUTHOR</span>
              <PersonName person="karen" href="/people/karen-pendergrass" />
              <small>Standards Architect &amp; Research Lead</small>
            </div>
            <div>
              <span>PUBLISHED</span>
              <b>{PUBLISHED}</b>
            </div>
            <div>
              <span>RECORD</span>
              <b>{note.identifier}</b>
            </div>
            <div>
              <span>EVIDENCE</span>
              <b>{note.anchorSources} anchor sources</b>
            </div>
          </div>
        </header>

        <article className="paper-body">
          <aside className="paper-abstract">
            <span>BOUNDARY RULING</span>
            <p>{note.boundary}</p>
          </aside>

          <section className="paper-section">
            <div className="paper-section-label">
              <span>01</span>
              <p>What the evidence record establishes</p>
            </div>
            <div className="paper-section-body">
              <p className="paper-lead">
                The controlling scientific record is the public <a href="https://heavymetalindex.com">Heavy Metal Index</a> synthesis, supported by {note.anchorSources} named anchor sources and expressed for {note.analytes}.
              </p>
              <p>
                ICS does not reproduce the source extraction here. Keeping the evidence on the independent index preserves source-level methods, units, species, basis, uncertainty, and review state. This note records only the institutional consequence of that evidence.
              </p>
            </div>
          </section>

          <section className="paper-section">
            <div className="paper-section-label">
              <span>02</span>
              <p>Governance disposition</p>
            </div>
            <div className="paper-section-body">
              <p className="paper-lead">{note.disposition}</p>
              <p>
                This disposition may change taxonomy, analyte coverage, test basis, surveillance priority, disclosure, or claim language. It does not allow a market occurrence percentile or a dramatic single study to become an initial certification value.
              </p>
            </div>
          </section>

          <section className="paper-section">
            <div className="paper-section-label">
              <span>03</span>
              <p>Publication package</p>
            </div>
            <div className="paper-section-body">
              <p>
                The finding is published in two additional authority layers: the HMI evidence record and the HMTc certification interpretation. Distribution should prioritize {note.audience.join(", ")} while preserving those distinct roles in headlines, briefings, interviews, and social posts.
              </p>
              <div className="paper-principles">
                <div>
                  <b>Evidence</b>
                  <p>
                    <a href={note.hmi}>Open the HMI synthesis ↗</a>
                  </p>
                </div>
                <div>
                  <b>Certification</b>
                  <p>
                    <a href={note.hmtc}>Open the HMTc analysis ↗</a>
                  </p>
                </div>
                <div>
                  <b>Governance</b>
                  <p>
                    <a href="/governance/policies">Open the policy register →</a>
                  </p>
                </div>
                <div>
                  <b>Audience</b>
                  <p>{note.audience.join(" · ")}</p>
                </div>
              </div>
            </div>
          </section>
        </article>

        <section className="citation-box">
          <div>
            <span>SUGGESTED CITATION</span>
            <p>
              <PersonName person="karen">Pendergrass, K.</PersonName> (2026). “{note.title}.” <i>ICS Evidence Governance Notes</i>. {note.identifier}. Institute of Contaminant Standards.
            </p>
          </div>
          <a href="/governance/notes">Evidence governance register →</a>
        </section>
      </main>
    </SiteFrame>
  );
}

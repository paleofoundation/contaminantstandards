import type { Metadata } from "next";
import { PageHero, SiteFrame } from "../../site-chrome";
import { canonical } from "../../site-data";
import { governanceNotes } from "./notes";

const pageUrl = canonical("/governance/notes");

export const metadata: Metadata = {
  title: "Evidence Governance Notes | Institute of Contaminant Standards",
  description:
    "Finding-by-finding governance dispositions connecting public Heavy Metal Index evidence to standards scope without allowing occurrence data to select certification limits.",
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "Evidence Governance Notes | Institute of Contaminant Standards",
    description:
      "Finding-by-finding governance dispositions connecting public Heavy Metal Index evidence to standards scope without allowing occurrence data to select certification limits.",
    type: "website",
    url: pageUrl,
    images: [],
  },
  twitter: {
    card: "summary",
    title: "Evidence Governance Notes | Institute of Contaminant Standards",
    description:
      "Finding-by-finding governance dispositions connecting public Heavy Metal Index evidence to standards scope without allowing occurrence data to select certification limits.",
    images: [],
  },
};

export default function EvidenceGovernanceNotesPage() {
  return (
    <SiteFrame>
      <main>
        <PageHero
          index="03 / EVIDENCE GOVERNANCE"
          eyebrow="A disposition for every major finding"
          title={<>Evidence may change the work<br /><em>without choosing the limit.</em></>}
          description={
            <>
              These notes record what each major <a href="https://heavymetalindex.com">Heavy Metal Index</a> synthesis changes in category scope, testing, surveillance, or claim language—and what it cannot change under the institutional firewall.
            </>
          }
          aside={
            <div className="principle-seal">
              <span>24</span>
              <p>PUBLIC<br />DISPOSITIONS</p>
              <small>2026 REGISTER</small>
            </div>
          }
        />

        <section className="governance-section" id="register">
          <div className="governance-heading">
            <p>REGISTER / 2026</p>
            <h2>One evidence finding, one visible governance consequence.</h2>
            <p>
              The evidence page remains the scientific record. HMTc publishes any certification interpretation. ICS records the boundary, decision right, and standards-governance action.
            </p>
          </div>
          <div className="latest-publication-grid">
            {governanceNotes.map((note) => (
              <a href={`/governance/notes/${note.slug}`} key={note.identifier}>
                <span>{note.number.slice(-2)} · GOVERNANCE NOTE</span>
                <h3>{note.title}</h3>
                <p>{note.disposition}</p>
                <b>{note.analytes} →</b>
              </a>
            ))}
          </div>
        </section>
      </main>
    </SiteFrame>
  );
}

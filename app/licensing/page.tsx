import type { Metadata } from "next";
import { PageHero, SiteFrame } from "../site-chrome";
import { canonical } from "../site-data";

export const metadata: Metadata = {
  title: "Licensing & Reuse | Institute of Contaminant Standards",
  description:
    "Institutional licensing route for Heavy Metal Index prose, structured data, and commercial integrations.",
  alternates: { canonical: canonical("/licensing") },
};

const layers = [
  {
    code: "01",
    title: "Published prose",
    status: "CC BY 4.0",
    body:
      "Narrative Heavy Metal Index pages may be quoted, translated, and reused with attribution to the page and persistent identifier where one is assigned.",
  },
  {
    code: "02",
    title: "Structured evidence database",
    status: "Database rights reserved",
    body:
      "Reading and citing individual records is permitted. Systematic extraction, substantial republication, and commercial products built on the curated database require a licence from Paleo Certified, Inc.",
  },
  {
    code: "03",
    title: "Underlying source documents",
    status: "Source terms apply",
    body:
      "Papers, agency reports, and third-party datasets remain governed by their own rights holders. The Institute does not relicense those works.",
  },
  {
    code: "04",
    title: "Certification marks & standards",
    status: "Program-governed",
    body:
      "Certification marks, standards editions, and program materials are governed separately by Heavy Metal Tested & Certified and are not included in the Index licence.",
  },
];

export default function LicensingPage() {
  return (
    <SiteFrame>
      <main>
        <PageHero
          index="06 / LICENSING"
          eyebrow="Reuse and database rights"
          title={<>Open to read.<br /><em>Structured to license.</em></>}
          description="The Institute separates public reading and citation from substantial commercial re-use of the curated evidence database."
          aside={
            <div className="page-register">
              <span>RIGHTS HOLDER</span>
              <dl>
                <div><dt>Legal entity</dt><dd>Paleo Certified, Inc.</dd></div>
                <div><dt>Public prose</dt><dd>CC BY 4.0</dd></div>
                <div><dt>Structured database</dt><dd>Rights reserved</dd></div>
              </dl>
            </div>
          }
        />

        <section className="licensing-register" aria-label="Licensing layers">
          {layers.map((layer) => (
            <article key={layer.code}>
              <span>{layer.code}</span>
              <div>
                <p className="section-kicker">{layer.status}</p>
                <h2>{layer.title}</h2>
                <p>{layer.body}</p>
              </div>
            </article>
          ))}
        </section>

        <section className="page-closing">
          <p>COMMERCIAL AND RESEARCH USE</p>
          <h2>Describe the intended use,<br />scope, and distribution.</h2>
          <a className="button button-paper" href="mailto:karen@paleofoundation.com?subject=ICS%20licensing%20inquiry">
            Request licensing guidance <span aria-hidden="true">→</span>
          </a>
          <a className="text-link-light" href="https://heavymetalindex.com/licensing/" target="_blank" rel="noopener">
            Read the complete Heavy Metal Index licence posture ↗
          </a>
          <a className="text-link-light" href="https://heavymetalcertified.com/" target="_blank" rel="noopener">
            Certification programme terms ↗
          </a>
        </section>
      </main>
    </SiteFrame>
  );
}

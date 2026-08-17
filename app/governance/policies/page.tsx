import type { Metadata } from "next";
import { JsonLd } from "../../json-ld";
import { canonical, ORGANIZATION_ID } from "../../site-data";
import { PageHero, SiteFrame, Status } from "../../site-chrome";

const pageUrl = canonical("/governance/policies");

export const metadata: Metadata = {
  title: "Governance Policy Register | Institute of Contaminant Standards",
  description:
    "ICS policies for impartiality, conflicts and recusal, publication ethics, corrections, standards consultation, and appeals.",
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "Governance Policy Register | ICS",
    description:
      "Published institutional controls for impartiality, conflicts, publications, corrections, consultation, and appeals.",
    type: "website",
    url: pageUrl,
    images: [],
  },
  twitter: {
    card: "summary",
    title: "Governance Policy Register | ICS",
    description:
      "Published institutional controls for impartiality, conflicts, publications, corrections, consultation, and appeals.",
    images: [],
  },
};

const policyRegister = [
  ["POL-01", "Standards & impartiality charter", "Framework current · committee being constituted", "#impartiality"],
  ["POL-02", "Conflict of interest & recusal", "Current", "#conflicts"],
  ["POL-03", "Publication ethics", "Current", "#publication-ethics"],
  ["POL-04", "Corrections, retractions & versioning", "Current", "#corrections"],
  ["POL-05", "Standards consultation & appeals", "Current framework", "#consultation"],
];

const policyJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${pageUrl}#policy-register`,
  name: "ICS Governance Policy Register",
  description:
    "Published institutional controls for impartiality, conflicts, publications, corrections, consultation, and appeals.",
  url: pageUrl,
  datePublished: "2026-08-17",
  dateModified: "2026-08-17",
  publisher: { "@id": ORGANIZATION_ID },
  hasPart: policyRegister.map(([identifier, name, status, anchor]) => ({
    "@type": "DigitalDocument",
    "@id": `${pageUrl}${anchor}`,
    identifier,
    name,
    description: status,
    inLanguage: "en",
  })),
};

export default function GovernancePoliciesPage() {
  return (
    <SiteFrame>
      <JsonLd data={policyJsonLd} />
      <main>
        <PageHero
          index="02.1 / POLICY REGISTER"
          eyebrow="Published institutional controls"
          title={<>Governance must be<br /><em>operational in writing.</em></>}
          description="These policies define the review, disclosure, correction, consultation, and appeal controls around ICS standards and institutional publications. Each document has a stable identifier and revision record."
          aside={
            <div className="page-register">
              <span>DOCUMENT CONTROL</span>
              <dl>
                <div><dt>Register edition</dt><dd>1.0</dd></div>
                <div><dt>Effective</dt><dd>17 AUG 2026</dd></div>
                <div><dt>Policy records</dt><dd>5</dd></div>
                <div><dt>Document owner</dt><dd>ICS</dd></div>
              </dl>
            </div>
          }
        />

        <section className="policy-register-index" aria-label="Governance policy register">
          <div>
            <p className="section-kicker section-kicker-light">REGISTER</p>
            <h2>Current institutional policies</h2>
          </div>
          <div>
            {policyRegister.map(([identifier, name, status, href]) => (
              <a href={href} key={identifier}>
                <span>{identifier}</span><b>{name}</b><small>{status}</small>
              </a>
            ))}
          </div>
        </section>

        <article className="policy-document" id="impartiality">
          <header>
            <div><span>POL-01</span><Status>Framework current</Status></div>
            <h2>Standards &amp; impartiality charter</h2>
            <p>Version 1.0 · Effective 17 August 2026 · Committee being constituted</p>
          </header>
          <div className="policy-copy">
            <section>
              <h3>Purpose</h3>
              <p>
                The Standards &amp; Impartiality Committee is the independent review
                body for material standards-method changes, unresolved conflicts,
                contested exceptions, and decisions where operating leadership’s
                commercial or authorship interests could impair impartiality.
              </p>
            </section>
            <section>
              <h3>Composition and appointment</h3>
              <p>
                Members are appointed only after a documented competence and conflict
                review. A voting majority must be free from certified-brand ownership,
                certification-revenue dependence, and current ICS operating roles.
                Members, appointment dates, relevant expertise, interests, and terms
                will be published when the committee is seated.
              </p>
            </section>
            <section>
              <h3>Authority</h3>
              <p>
                The committee may require additional evidence, return a proposal for
                revision, impose a recusal, commission external review, or block a
                material method change until the stated concern is resolved. It does
                not operate audits, licensing, or routine certification decisions.
              </p>
            </section>
            <section>
              <h3>Current-state disclosure</h3>
              <p>
                The committee is being constituted. ICS will not describe the body as
                independent oversight already in operation until appointments,
                conflicts, and decision rights have been formally recorded.
              </p>
            </section>
          </div>
        </article>

        <article className="policy-document" id="conflicts">
          <header>
            <div><span>POL-02</span><Status tone="live">Current</Status></div>
            <h2>Conflict of interest &amp; recusal</h2>
            <p>Version 1.0 · Effective 17 August 2026</p>
          </header>
          <div className="policy-copy">
            <section>
              <h3>Disclosure</h3>
              <p>
                A person participating in evidence curation, standards design,
                certification review, enforcement, or publication must disclose any
                financial, employment, family, authorship, advisory, or advocacy
                interest that a reasonable reviewer could consider material.
              </p>
            </section>
            <section>
              <h3>Recusal</h3>
              <p>
                A disclosed interest triggers written review. Where impartiality
                cannot be protected through limited participation, the person is
                removed from discussion, access to restricted records, and the final
                decision. The decision record names the function recused without
                publishing protected commercial data.
              </p>
            </section>
            <section>
              <h3>Concentrated roles</h3>
              <p>
                Holding more than one operating role is not concealed. Executive,
                research, standards, licensing, and audit responsibilities are named
                publicly. Material decisions involving concentrated authority receive
                the independent review required by the applicable procedure.
              </p>
            </section>
          </div>
        </article>

        <article className="policy-document" id="publication-ethics">
          <header>
            <div><span>POL-03</span><Status tone="live">Current</Status></div>
            <h2>Publication ethics</h2>
            <p>Version 1.0 · Effective 17 August 2026</p>
          </header>
          <div className="policy-copy">
            <section>
              <h3>Classification</h3>
              <p>
                Every publication is labeled by its actual status: institutional
                analysis, technical report, preprint, peer-reviewed article, standard,
                briefing, or correction. A DOI is treated as a persistent identifier,
                not as evidence of peer review.
              </p>
            </section>
            <section>
              <h3>Authorship and contribution</h3>
              <p>
                Named authors must have made a substantial intellectual contribution,
                approved the published work, and accepted accountability for their
                part. Technical, editorial, data, and advisory contributions that do
                not meet authorship criteria are acknowledged by function.
              </p>
            </section>
            <section>
              <h3>Evidence and limitations</h3>
              <p>
                Consequential factual statements must resolve to public sources or a
                described institutional record. Methods, assumptions, material
                limitations, funding, affiliations, and relevant conflicts are stated
                where they affect interpretation.
              </p>
            </section>
            <section>
              <h3>Publication boundaries</h3>
              <p>
                Institutional analysis does not become a certification standard.
                Literature-index findings do not become program endorsements. Private
                applicant, brand, or certified-lot data is not published on an open
                research surface without a lawful, governed basis.
              </p>
            </section>
          </div>
        </article>

        <article className="policy-document" id="corrections">
          <header>
            <div><span>POL-04</span><Status tone="live">Current</Status></div>
            <h2>Corrections, retractions &amp; versioning</h2>
            <p>Version 1.0 · Effective 17 August 2026</p>
          </header>
          <div className="policy-copy">
            <section>
              <h3>Correction</h3>
              <p>
                A material error that does not invalidate the work is corrected with a
                dated notice stating what changed and why. The corrected record retains
                its original publication date and adds a modification date.
              </p>
            </section>
            <section>
              <h3>Retraction or withdrawal</h3>
              <p>
                A work is retracted or withdrawn when its central conclusion is no
                longer supportable, the underlying record is unreliable, or publication
                violated applicable ethical or legal requirements. The stable page
                remains available with the reason and status prominently stated.
              </p>
            </section>
            <section>
              <h3>Standards versioning</h3>
              <p>
                A superseded standard remains at a stable address with its edition,
                effective dates, and successor identified. A certificate is interpreted
                against the edition and basis stated on that certificate, while public
                verification reports its current operating status.
              </p>
            </section>
          </div>
        </article>

        <article className="policy-document" id="consultation">
          <header>
            <div><span>POL-05</span><Status tone="live">Current framework</Status></div>
            <h2>Standards consultation &amp; appeals</h2>
            <p>Version 1.0 · Effective 17 August 2026</p>
          </header>
          <div className="policy-copy">
            <section>
              <h3>Consultation</h3>
              <p>
                A material change to analyte scope, basis, limit-selection method,
                ratchet rule, or transition policy receives a dated proposal explaining
                the rationale, evidence, affected categories, and intended effective date.
                Comments are evaluated by issue, not by the commercial status of the commenter.
              </p>
            </section>
            <section>
              <h3>Appeal</h3>
              <p>
                A party directly affected by a standards or certification decision may
                appeal a claimed error in method application, evidence identity,
                conflict handling, or procedure. An appeal does not stay an urgent
                public-protection or mark-control action unless the reviewer orders it.
              </p>
            </section>
            <section>
              <h3>Record</h3>
              <p>
                The appeal record identifies the issue, reviewer, recusals, disposition,
                and any resulting correction or standards change. Confidential business
                information is separated from the public procedural record.
              </p>
            </section>
          </div>
        </article>

        <section className="policy-revision-note">
          <p className="section-kicker section-kicker-light">REVISION RULE</p>
          <h2>Policy changes leave a version trail.</h2>
          <p>
            This register is edition 1.0. Later editions will identify the provision
            changed, the approving authority, the effective date, and the superseded
            record. Silent replacement is not the institutional method.
          </p>
        </section>
      </main>
    </SiteFrame>
  );
}

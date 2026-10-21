import type { Metadata } from "next";
import { PageHero, SiteFrame, Status } from "../site-chrome";
import { canonical } from "../site-data";

export const metadata: Metadata = {
  title: "Governance | Institute of Contaminant Standards",
  description:
    "How ICS separates evidence from certification, sets initial standards, governs conflicts, and enforces mark use.",
  alternates: { canonical: canonical("/governance") },
  openGraph: {
    title: "Governance | Institute of Contaminant Standards",
    description: "How ICS separates evidence from certification, sets standards, governs conflicts, and enforces mark use.",
    type: "website",
    url: canonical("/governance"),
    images: [],
  },
  twitter: {
    card: "summary",
    title: "Governance | Institute of Contaminant Standards",
    description: "How ICS separates evidence from certification, sets standards, governs conflicts, and enforces mark use.",
    images: [],
  },
};

const powers = [
  {
    number: "01",
    title: "The index",
    scope: "May publish literature and regulatory evidence.",
    prohibition: "May not publish a certification threshold, endorse a certifier, or expose brand-level program data.",
  },
  {
    number: "02",
    title: "The certification program",
    scope: "May publish the standard, methodology, analyte coverage, and certification requirements.",
    prohibition: "May cite the index for context, but may not make the index justify or endorse a certification decision.",
  },
  {
    number: "03",
    title: "The Institute",
    scope: "May govern method, impartiality, registry structure, verification, enforcement, and revision rules.",
    prohibition: "May not publish program threshold tables or private brand-level records on the institutional surface.",
  },
];

export default function GovernancePage() {
  return (
    <SiteFrame>
      <main>
        <PageHero
          index="02 / GOVERNANCE"
          eyebrow="Rules before reputation"
          title={<>Independence is<br /><em>an enforceable structure.</em></>}
          description="ICS governs how a contaminant certification standard is set, kept independent, reviewed, versioned, and enforced. Each program publishes its own limits and methodology; this institutional surface publishes the rules around them."
          aside={
            <div className="principle-seal">
              <span>ICS</span>
              <p>NO CLAIM<br />WITHOUT A SOURCE</p>
              <small>GOVERNANCE REGISTER</small>
            </div>
          }
        />

        <section className="governance-policy-banner">
          <div>
            <p className="section-kicker section-kicker-light">PUBLISHED CONTROLS</p>
            <h2>Impartiality, conflicts, publication ethics, corrections, and appeals.</h2>
            <p>
              The governance model now resolves to a controlled policy register with
              identifiers, effective dates, current status, and a versioning rule.
            </p>
          </div>
          <a className="button button-paper" href="/governance/policies">Open policy register <span aria-hidden="true">→</span></a>
        </section>

        <section className="governance-policy-banner">
          <div>
            <p className="section-kicker section-kicker-light">EVIDENCE GOVERNANCE NOTES</p>
            <h2>Every major synthesis now has a public standards disposition.</h2>
            <p>
              The register states what each finding changes in scope, testing, surveillance, or claims—and why it cannot silently choose a limit.
            </p>
          </div>
          <a className="button button-paper" href="/governance/notes">Open evidence notes <span aria-hidden="true">→</span></a>
        </section>

        <section className="governance-section powers-section">
          <div className="governance-heading">
            <p>01 / SEPARATION OF POWERS</p>
            <h2>What each face may publish is fixed.</h2>
            <p>
              The firewall is defined by permissions and prohibitions, not by whether
              two properties share an operator.
            </p>
          </div>
          <div className="power-list">
            {powers.map((power) => (
              <article key={power.number}>
                <span>{power.number}</span>
                <h3>{power.title}</h3>
                <div>
                  <p className="may-label">MAY</p>
                  <p>{power.scope}</p>
                </div>
                <div>
                  <p className="may-label">MAY NOT</p>
                  <p>{power.prohibition}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mechanical-firewall">
          <div>
            <p className="section-kicker section-kicker-light">02 / MECHANICAL FIREWALL</p>
            <h2>Enforced in the build and in the data plane.</h2>
          </div>
          <div className="firewall-controls">
            <article>
              <span>BUILD BARRIER</span>
              <h3>Threshold language is rejected on index surfaces.</h3>
              <p>
                A build-blocking check prevents certification-framed thresholds,
                percentile candidates, and derivation records from publishing on the
                literature index.
              </p>
            </article>
            <article>
              <span>DATA BARRIER</span>
              <h3>Public properties cannot read private program records.</h3>
              <p>
                Evidence, standards workbench records, certified-lot findings, and
                brand-level data occupy separate data states and publication paths.
              </p>
            </article>
            <article>
              <span>CITATION BARRIER</span>
              <h3>The program may cite the index. The index never cites back.</h3>
              <p>
                One-way citation supplies literature context without allowing the
                evidence surface to endorse a commercial certification decision.
              </p>
            </article>
          </div>
        </section>

        <section className="governance-section method-policy">
          <div className="governance-heading">
            <p>03 / HOW INITIAL STANDARDS ARE SET</p>
            <h2>Government-anchored at publication. Separately ratcheted later.</h2>
            <p>
              The literature index describes occurrence and context. It does not
              choose an initial certification value.
            </p>
          </div>

          <div className="policy-sequence">
            <article>
              <span>1</span>
              <h3>Define the exact cell</h3>
              <p>Fix product form, intended consumer, analyte species, unit, and native basis.</p>
            </article>
            <article>
              <span>2</span>
              <h3>Find applicable sovereign rules</h3>
              <p>Identify credible government maximum levels that govern the exact cell.</p>
            </article>
            <article className="policy-featured">
              <span>3</span>
              <h3>Select the strictest applicable maximum</h3>
              <p>Preserve formulation splits and cite the controlling instrument.</p>
            </article>
            <article>
              <span>4</span>
              <h3>Disclose the unresolved edge</h3>
              <p>Use sovereign read-across, a documented control, or keep the cell in development.</p>
            </article>
          </div>

          <div className="ratchet-note">
            <span>POST-PUBLICATION</span>
            <h3>The Standards Ratchet uses eligible certified-lot data, never the public occurrence pool.</h3>
            <p>
              Tightening requires broad, sustained performance under the separate
              governed trigger and a published transition record. The starting
              anchor and the later ratchet use different data, at different times,
              for different purposes.
            </p>
          </div>
        </section>

        <section className="oversight-section">
          <div className="oversight-copy">
            <p className="section-kicker section-kicker-light">04 / OVERSIGHT & CONFLICTS</p>
            <h2>Common ownership is disclosed. Authority to overrule must be real.</h2>
            <p>
              ICS is operated under Paleo Certified, Inc., which also operates the
              literature index. That relationship is stated plainly. Structural
              independence depends on documented decision rights, recusal rules,
              data separation, and outside review rather than obscured ownership.
            </p>
          </div>
          <div className="oversight-register">
            <article>
              <Status>Being constituted</Status>
              <h3>Standards & impartiality committee</h3>
              <p>
                The governance model assigns review and override authority to members
                without certified-brand or certification-revenue interests. Committee
                composition and the conflict register will publish as appointments are completed.
              </p>
            </article>
            <article>
              <Status>Published by rule</Status>
              <h3>Conflict and separation policy</h3>
              <p>
                Literature curation, methodology authority, and final certification
                decisions are separated by role, with conflicts declared and recusals recorded.
              </p>
            </article>
            <article>
              <Status>In pursuit</Status>
              <h3>ISO/IEC 17065 accreditation</h3>
              <p>
                ICS is pursuing third-party accreditation of its product-certification
                controls. Until granted, accreditation is stated as an objective, never a credential.
              </p>
            </article>
          </div>
        </section>

        <section className="governance-section mark-enforcement">
          <div className="governance-heading">
            <p>05 / MARK USE & ENFORCEMENT</p>
            <h2>A certificate states what was tested. It does not declare a product “safe.”</h2>
          </div>
          <div className="mark-grid">
            <article>
              <p className="section-kicker">MARK USE</p>
              <h3>Coverage travels with the certificate.</h3>
              <p>
                The mark identifies a stated standard, basis, analyte panel, and
                certificate number. Covered and uncovered analytes remain visible
                alongside the claim.
              </p>
            </article>
            <article>
              <p className="section-kicker">ENFORCEMENT</p>
              <h3>Status is current, not ceremonial.</h3>
              <p>
                Certifications are live relationships. A mark can be suspended or
                withdrawn, and verification must reflect the current state at the
                moment a record is checked.
              </p>
            </article>
            <article>
              <p className="section-kicker">PUBLIC NOTICE</p>
              <h3>Enforcement is reported as an event.</h3>
              <p>
                Public notices name a party only where the matter is already public
                record. The institutional site does not become a brand directory.
              </p>
            </article>
          </div>
        </section>

        <section className="current-program-callout">
          <div>
            <Status tone="live">Current program</Status>
            <h2>Heavy Metal Tested &amp; Certified</h2>
            <p>
              Current standards, effective dates, methodology, and certification
              applications are published by the program, not duplicated by ICS.
            </p>
          </div>
          <a className="button button-paper" href="https://heavymetalcertified.com/standards/" target="_blank" rel="noopener">
            Open the standards index <span aria-hidden="true">↗</span>
          </a>
        </section>
      </main>
    </SiteFrame>
  );
}

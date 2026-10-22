import type { Metadata } from "next";
import {
  InteriorHero,
  PageNav,
  SectionIntro,
  InteriorClosing,
} from "../interior";
import { SiteFrame, Status } from "../site-chrome";
import { canonical } from "../site-data";

export const metadata: Metadata = {
  title: "Governance | Institute of Contaminant Standards",
  description:
    "How ICS separates evidence from certification, sets initial standards, governs conflicts, and enforces mark use.",
  alternates: { canonical: canonical("/governance") },
  openGraph: {
    title: "Governance | Institute of Contaminant Standards",
    description:
      "How ICS separates evidence from certification, sets standards, governs conflicts, and enforces mark use.",
    type: "website",
    url: canonical("/governance"),
    images: [],
  },
  twitter: {
    card: "summary",
    title: "Governance | Institute of Contaminant Standards",
    description:
      "How ICS separates evidence from certification, sets standards, governs conflicts, and enforces mark use.",
    images: [],
  },
};

const powers = [
  {
    number: "01",
    title: "The index",
    scope: "May publish literature and regulatory evidence.",
    prohibition:
      "May not publish a certification threshold, endorse a certifier, or expose brand-level program data.",
  },
  {
    number: "02",
    title: "The certification program",
    scope:
      "May publish the standard, methodology, analyte coverage, and certification requirements.",
    prohibition:
      "May cite the index for context, but may not make the index justify or endorse a certification decision.",
  },
  {
    number: "03",
    title: "The Institute",
    scope:
      "May govern method, impartiality, registry structure, verification, enforcement, and revision rules.",
    prohibition:
      "May not publish program threshold tables or private brand-level records on the institutional surface.",
  },
];

export default function GovernancePage() {
  return (
    <SiteFrame>
      <main className="interior governance-interior">
        <InteriorHero
          label="ICS GOVERNANCE"
          title={
            <>
              Trust needs structure.
              <br />
              <em>Here is ours.</em>
            </>
          }
          description="How evidence stays independent, standards stay accountable, and certification claims remain open to scrutiny."
        >
          <div className="governance-hero-note">
            <span className="inside-label">THE INSTITUTIONAL COMMITMENT</span>
            <p>
              Clear roles.
              <br />
              Visible decisions.
              <br />
              <em>Traceable change.</em>
            </p>
            <a href="/governance/policies">
              Read the published policies <span aria-hidden="true">↗</span>
            </a>
          </div>
        </InteriorHero>
        <PageNav
          items={[
            { href: "#separation", label: "Independence" },
            { href: "#standards", label: "Standards" },
            { href: "#oversight", label: "Oversight" },
            { href: "#enforcement", label: "Enforcement" },
            { href: "#records", label: "Public records" },
          ]}
        />
        <section className="inside-container inside-section" id="separation">
          <SectionIntro
            label="01 / INDEPENDENCE"
            title={
              <>
                Connected institutions.
                <br />
                <em>Separate decision rights.</em>
              </>
            }
          >
            <p>
              Independence is defined by what each part of the network can
              publish, decide, and access. These boundaries apply even when
              properties share an operator.
            </p>
          </SectionIntro>
          <div className="governance-powers">
            {powers.map((p) => (
              <article key={p.number}>
                <span className="inside-label">
                  {p.number} / RESPONSIBILITY
                </span>
                <h3>{p.title}</h3>
                <div>
                  <span className="power-caption">ITS ROLE</span>
                  <p>{p.scope.replace("May ", "")}</p>
                </div>
                <div>
                  <span className="power-caption">ITS BOUNDARY</span>
                  <p>{p.prohibition}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="governance-safeguards">
            <div>
              <p className="inside-label">HOW THE SEPARATION IS ENFORCED</p>
              <h3>Boundaries built into the system.</h3>
            </div>
            <div>
              <article>
                <b>Publication controls</b>
                <p>
                  Build checks prevent certification-framed thresholds and
                  derivation records from publishing on the literature index.
                </p>
              </article>
              <article>
                <b>Data separation</b>
                <p>
                  Evidence, standards workbench records, certified-lot findings,
                  and private brand records follow separate data states and
                  publication paths.
                </p>
              </article>
              <article>
                <b>One-way citation</b>
                <p>
                  A certification program may cite the index for literature
                  context. The index does not endorse a certification decision.
                </p>
              </article>
            </div>
          </div>
        </section>
        <section className="inside-band" id="standards">
          <div className="inside-container inside-section">
            <SectionIntro
              label="02 / HOW STANDARDS ARE SET"
              title={
                <>
                  A documented starting point.
                  <br />
                  <em>A governed path forward.</em>
                </>
              }
            >
              <p>
                Initial standards are government-anchored. Later revisions
                follow a separate process. The public literature index describes
                occurrence and context; it does not choose a certification
                value.
              </p>
            </SectionIntro>
            <ol className="inside-steps">
              {[
                {
                  title: "Define the exact scope",
                  text: "Fix the product form, intended consumer, analyte species, unit, and native basis.",
                },
                {
                  title: "Find applicable rules",
                  text: "Identify credible government maximum levels that govern that exact scope.",
                },
                {
                  title: "Choose the controlling rule",
                  text: "Select the strictest applicable maximum, preserve formulation splits, and cite the instrument.",
                },
                {
                  title: "Disclose unresolved cases",
                  text: "Use documented sovereign read-across or controls, or keep the scope in development.",
                },
              ].map((s, i) => (
                <li key={s.title}>
                  <span>0{i + 1}</span>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </li>
              ))}
            </ol>
            <div className="inside-note">
              <span className="inside-label">
                AFTER PUBLICATION / THE STANDARDS RATCHET
              </span>
              <h3>Revision follows eligible certified-lot data.</h3>
              <p>
                Tightening requires broad, sustained performance under a
                separately governed trigger and a published transition record.
                The public occurrence pool does not determine the ratchet. Each
                program publishes its current standards, effective dates, and
                methods.
              </p>
              <a
                className="inside-sub-link"
                href="https://heavymetalcertified.com/standards/"
              >
                View the HMTc standards index ↗
              </a>
            </div>
          </div>
        </section>
        <section className="inside-container inside-section" id="oversight">
          <SectionIntro
            label="03 / OVERSIGHT & CONFLICTS"
            title={
              <>
                Accountability starts
                <br />
                <em>with disclosure.</em>
              </>
            }
          >
            <p>
              ICS is a trade name of Paleo Certified, Inc., which also operates
              the literature index. Decision rights, conflict declarations,
              recusals, and outside review make the structure assessable.
            </p>
          </SectionIntro>
          <div className="oversight-cards">
            <article>
              <Status>Being constituted</Status>
              <h3>Standards &amp; impartiality committee</h3>
              <p>
                The model assigns review and override authority to members
                without certified-brand or certification-revenue interests.
                Membership and the conflict register will publish as
                appointments are completed.
              </p>
            </article>
            <article>
              <Status>Published by rule</Status>
              <h3>Conflict &amp; separation policy</h3>
              <p>
                Literature curation, methodology authority, and final
                certification decisions are separated by role. Conflicts are
                declared and recusals recorded.
              </p>
              <a className="inside-sub-link" href="/governance/policies">
                Inspect the policy register →
              </a>
            </article>
            <article>
              <Status>In pursuit</Status>
              <h3>ISO/IEC 17065 accreditation</h3>
              <p>
                ICS is pursuing third-party accreditation of its
                product-certification controls. Accreditation remains an
                objective until granted.
              </p>
            </article>
          </div>
        </section>
        <section className="inside-dark" id="enforcement">
          <div className="inside-container inside-section">
            <SectionIntro
              label="04 / MARK USE & ENFORCEMENT"
              title={
                <>
                  A claim has a scope.
                  <br />
                  <em>A certificate has a status.</em>
                </>
              }
            >
              <p>
                A certificate states what was tested. It does not declare a
                product “safe.”
              </p>
            </SectionIntro>
            <div className="role-trio">
              <article>
                <span className="inside-label">MARK USE</span>
                <h3>Coverage travels with the claim.</h3>
                <p>
                  The standard, basis, analyte panel, and certificate number
                  accompany the mark. Covered and uncovered analytes remain
                  visible.
                </p>
              </article>
              <article>
                <span className="inside-label">LIVE STATUS</span>
                <h3>Verification reflects today.</h3>
                <p>
                  Marks can be suspended or withdrawn. Verification must reflect
                  the current state when a record is checked.
                </p>
              </article>
              <article>
                <span className="inside-label">PUBLIC NOTICE</span>
                <h3>Enforcement leaves a record.</h3>
                <p>
                  Notices name a party only where the matter is already public
                  record. Institutional reporting preserves the boundary around
                  private brand records.
                </p>
              </article>
            </div>
          </div>
        </section>
        <section className="inside-container inside-section" id="records">
          <SectionIntro
            label="05 / THE PUBLIC RECORD"
            title={
              <>
                Read the rules.
                <br />
                <em>Follow their consequences.</em>
              </>
            }
          />
          <div className="document-pair">
            <a href="/governance/policies">
              <span className="inside-label">CONTROLLED POLICY REGISTER</span>
              <h3>Policies &amp; procedures</h3>
              <p>
                Impartiality, conflicts, publication ethics, corrections, and
                appeals—with identifiers, effective dates, status, and
                versioning.
              </p>
              <span className="inside-row-link">
                Open the policy register <b aria-hidden="true">↗</b>
              </span>
            </a>
            <a href="/governance/notes">
              <span className="inside-label">EVIDENCE GOVERNANCE REGISTER</span>
              <h3>Evidence governance notes</h3>
              <p>
                What a research finding changes in scope, testing, surveillance,
                or claims, and why it cannot silently choose a limit.
              </p>
              <span className="inside-row-link">
                Explore the evidence notes <b aria-hidden="true">↗</b>
              </span>
            </a>
          </div>
        </section>
        <InteriorClosing
          label="NAMED RESPONSIBILITY"
          title={
            <>
              Know who holds
              <br />
              <em>each responsibility.</em>
            </>
          }
          href="/about#people"
          link="Meet the people behind ICS"
        />
      </main>
    </SiteFrame>
  );
}

import { SiteFrame, Status } from "./site-chrome";

const corpus = [
  ["Peer-reviewed studies", "2,547"],
  ["Government reports & datasets", "179"],
  ["Programmatic databases", "57"],
  ["Jurisdictions covered", "187"],
  ["A-tier curated sources", "1,502"],
  ["Structured evidence records", "695"],
];

const futurePrograms = [
  {
    code: "HM",
    title: "Heavy metals",
    status: "Operational",
    description: "The active literature index and certification program.",
    tone: "live" as const,
  },
  {
    code: "MP",
    title: "Microplastics",
    status: "In development",
    description: "The same independent-index and certification architecture.",
    tone: "quiet" as const,
  },
  {
    code: "PF",
    title: "Forever chemicals (PFAS)",
    status: "In development",
    description: "A separate evidence index and standard under common governance.",
    tone: "quiet" as const,
  },
];

export default function Home() {
  return (
    <SiteFrame>
      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">
              Independent institutional governance
              <span>across contaminant programs</span>
            </p>
            <h1 id="hero-title">
              Standards should be <em>traceable.</em>
            </h1>
            <p className="hero-dek">
              The Institute of Contaminant Standards governs how contaminant
              certification standards are set, kept independent, versioned, and
              enforced across a growing network of evidence and program sites.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="/network">
                View the network <span aria-hidden="true">→</span>
              </a>
              <a className="button button-quiet" href="/governance">
                Read the governance rules <span aria-hidden="true">→</span>
              </a>
            </div>
            <p className="founder-credit">
              <span>Named accountability</span>
              Founded and led by Karen Pendergrass, Standards Architect.
              <a href="/about#people">About the Institute →</a>
            </p>
          </div>

          <aside className="ledger-wrap" aria-label="Heavy Metal Index corpus snapshot">
            <div className="ledger-shadow ledger-shadow-one" aria-hidden="true" />
            <div className="ledger-shadow ledger-shadow-two" aria-hidden="true" />
            <div className="ledger-card">
              <div className="ledger-head">
                <span>Current evidence system</span>
                <span>13 AUG 2026</span>
              </div>
              <div className="ledger-seal" aria-hidden="true">
                <span>ICS</span>
                <small>GOVERNED NETWORK</small>
              </div>
              <dl>
                {corpus.map(([label, value]) => (
                  <div key={label}>
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
              <p className="ledger-note">
                Counts are rebuilt from the Heavy Metal Index evidence corpus. The
                Institute governs the architecture; the Index remains the public
                literature surface.
              </p>
            </div>
          </aside>
        </section>

        <section className="proof-strip" aria-label="Institutional mandate">
          <span>Govern the method.</span>
          <i aria-hidden="true" />
          <span>Separate the data.</span>
          <i aria-hidden="true" />
          <span>Version the standard.</span>
          <i aria-hidden="true" />
          <span>Enforce the mark.</span>
        </section>

        <section className="section mandate-section" id="mandate">
          <div className="section-heading">
            <p className="section-kicker">01 / INSTITUTIONAL MANDATE</p>
            <h2>One institution behind the scenes. Separate public faces in front.</h2>
            <p>
              ICS does not publish contaminant thresholds or brand-level data. It
              establishes the governance rules that determine which surface may
              publish what, who can decide, and how a current certification remains
              verifiable.
            </p>
          </div>

          <div className="mandate-grid">
            <article>
              <span>G / 01</span>
              <h3>Govern</h3>
              <p>
                Define how standards are created, reviewed, versioned, tightened,
                and superseded across contaminant programs.
              </p>
            </article>
            <article>
              <span>S / 02</span>
              <h3>Separate</h3>
              <p>
                Keep literature evidence, certification arithmetic, and private
                program records in distinct data classes and public properties.
              </p>
            </article>
            <article>
              <span>E / 03</span>
              <h3>Enforce</h3>
              <p>
                Govern mark use, certification status, suspension, withdrawal, and
                the verification record that reflects the relationship now.
              </p>
            </article>
          </div>
        </section>

        <section className="architecture-section" id="architecture">
          <div className="architecture-intro">
            <p className="section-kicker section-kicker-light">02 / SEPARATION OF POWERS</p>
            <h2>Three faces. Three data classes. One-way citation.</h2>
            <p>
              Common operation is disclosed. Independence is protected by what each
              surface can read, calculate, and publish.
            </p>
          </div>

          <div className="face-grid">
            <article>
              <span className="face-letter">A</span>
              <p className="face-label">PUBLIC LITERATURE</p>
              <h3>The index</h3>
              <p>
                Reports occurrence, toxicology, methods, and regulatory values as
                the sources state them. It sets no certification threshold and
                endorses no certifier.
              </p>
              <a href="https://heavymetalindex.com" target="_blank" rel="noreferrer">
                Open the active index ↗
              </a>
            </article>
            <article>
              <span className="face-letter">B</span>
              <p className="face-label">CONFORMITY SYSTEM</p>
              <h3>The program</h3>
              <p>
                Publishes the current standard, methodology, analyte coverage, mark
                rules, and certification pathway. It may cite the index one way for
                literature context.
              </p>
              <a href="https://heavymetalcertified.com" target="_blank" rel="noreferrer">
                Open the active program ↗
              </a>
            </article>
            <article className="face-institute">
              <span className="face-letter">C</span>
              <p className="face-label">INSTITUTIONAL AUTHORITY</p>
              <h3>The Institute</h3>
              <p>
                Governs the method, impartiality structure, registry, verification,
                and enforcement. It publishes neither threshold tables nor private
                brand data.
              </p>
              <a href="/governance">Read the rules →</a>
            </article>
          </div>

          <div className="citation-rule" aria-label="One-way citation rule">
            <span>INDEX</span>
            <b aria-hidden="true">←</b>
            <span>PROGRAM CITES LITERATURE CONTEXT</span>
            <i aria-hidden="true">NO REVERSE ENDORSEMENT</i>
          </div>
        </section>

        <section className="section network-preview" id="network">
          <div className="section-heading">
            <p className="section-kicker">03 / CONTAMINANT NETWORK</p>
            <h2>A repeatable architecture, built to extend beyond heavy metals.</h2>
            <p>
              Each contaminant receives its own independent evidence index and its
              own certification program. ICS supplies the common governance layer,
              not a blended data pool.
            </p>
          </div>

          <div className="program-rail">
            {futurePrograms.map((program) => (
              <article key={program.code}>
                <div className="program-rail-head">
                  <span>{program.code}</span>
                  <Status tone={program.tone}>{program.status}</Status>
                </div>
                <h3>{program.title}</h3>
                <p>{program.description}</p>
              </article>
            ))}
          </div>

          <a className="text-link" href="/network">
            See domains, public faces, and development status <span aria-hidden="true">→</span>
          </a>
        </section>

        <section className="governance-preview">
          <div className="governance-preview-copy">
            <p className="section-kicker section-kicker-light">04 / GOVERNANCE</p>
            <h2>The institution publishes the rules. Each program publishes the standard.</h2>
            <p>
              Initial HMTc values begin with the strictest applicable credible
              sovereign maximum in the product&apos;s native basis. Public occurrence
              evidence describes markets and research gaps; it does not choose the
              initial limit. Later tightening uses only eligible certified-lot data
              under the separate governed ratchet.
            </p>
            <a className="button button-outline-light" href="/governance">
              Read the complete governance model <span aria-hidden="true">→</span>
            </a>
          </div>
          <div className="governance-register">
            {[
              ["01", "Government-anchored initial values"],
              ["02", "Native-basis and species discipline"],
              ["03", "Versioned standards with stable history"],
              ["04", "Named authority and conflict disclosure"],
              ["05", "Current-state mark verification"],
            ].map(([number, label]) => (
              <div key={number}>
                <span>{number}</span>
                <p>{label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section people-preview" id="people">
          <div className="people-preview-copy">
            <p className="section-kicker">05 / PEOPLE & AUTHORITY</p>
            <h2>The institution is primary. Its decision-makers are named.</h2>
            <p>
              ICS publishes responsibility by function: who leads, who develops the
              standards, who operates licensing and auditing, and where independent
              oversight enters the decision chain.
            </p>
            <a className="text-link people-link" href="/about#people">
              Meet the organization <span aria-hidden="true">→</span>
            </a>
          </div>
          <div className="authority-preview" aria-label="Named authority by function">
            <div>
              <span>Executive leadership</span>
              <p>Karen Pendergrass · Kimberly Eyer</p>
            </div>
            <div>
              <span>Standards &amp; research</span>
              <p>Karen Pendergrass</p>
            </div>
            <div>
              <span>Licensing operations</span>
              <p>Jonathan D. Pendergrass</p>
            </div>
            <div>
              <span>Auditing operations</span>
              <p>Jennifer Eyer</p>
            </div>
          </div>
        </section>

        <section className="closing-section">
          <div>
            <p className="section-kicker section-kicker-light">CURRENT PROGRAM</p>
            <h2>One active standard.<br />A network built to grow.</h2>
          </div>
          <div className="closing-actions">
            <a className="button button-paper" href="https://heavymetalcertified.com" target="_blank" rel="noreferrer">
              Heavy Metal Tested &amp; Certified <span aria-hidden="true">↗</span>
            </a>
            <a href="/network">View the future network →</a>
          </div>
        </section>
      </main>
    </SiteFrame>
  );
}

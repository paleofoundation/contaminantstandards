import { SiteFrame, Status } from "./site-chrome";
import { publications } from "./site-data";
import { authorityStats } from "../lib/feeds";
import Image from "next/image";

const evidence = authorityStats();
const formatCount = (value: number) => value.toLocaleString("en-US");
const corpus = [
  ["Peer-reviewed studies", formatCount(evidence.peer_reviewed)],
  ["Government reports & datasets", formatCount(evidence.government)],
  ["Programmatic databases", formatCount(evidence.databases)],
  ["Jurisdictions covered", formatCount(evidence.jurisdictions)],
  ["A-tier curated sources", formatCount(evidence.a_tier)],
  ["Sources with a DOI", formatCount(evidence.dois)],
];
const corpusDate = evidence.generated
  ? new Date(`${evidence.generated}T00:00:00Z`)
      .toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric", timeZone: "UTC" })
      .toUpperCase()
  : "CURRENT";
const leadPublication = publications[0];
const additionalPublications = publications.slice(1);
const formatPublicationDate = (value: string) =>
  new Date(`${value}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });

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
              <a href="/people/karen-pendergrass">View research profile →</a>
            </p>
          </div>

          <aside className="ledger-wrap" aria-label="Heavy Metal Index corpus snapshot">
            <div className="ledger-shadow ledger-shadow-one" aria-hidden="true" />
            <div className="ledger-shadow ledger-shadow-two" aria-hidden="true" />
            <div className="ledger-card">
              <div className="ledger-head">
                <span>Current evidence system</span>
                <span>{corpusDate}</span>
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

        <section className="journal-home" aria-labelledby="journal-home-title">
          <header className="journal-home-head">
            <div>
              <p className="section-kicker">PUBLICATIONS</p>
              <h2 id="journal-home-title">Latest from the Institute</h2>
            </div>
            <a href="/articles">View all publications →</a>
          </header>

          <div className="journal-home-grid">
            <a className="journal-lead" href={`/articles/${leadPublication.slug}`}>
              <p className="journal-meta">
                <span>{leadPublication.topic}</span>
                <time dateTime={leadPublication.datePublished}>
                  {formatPublicationDate(leadPublication.datePublished)}
                </time>
              </p>
              <h3>{leadPublication.title}</h3>
              <p className="journal-dek">{leadPublication.description}</p>
              <p className="journal-byline">
                <span>By Karen Pendergrass</span>
                <span>{leadPublication.identifier}</span>
                <span>{leadPublication.readingTime}</span>
              </p>
            </a>

            <div className="journal-latest">
              <p className="journal-latest-label">LATEST ANALYSIS</p>
              {additionalPublications.map((publication) => (
                <a href={`/articles/${publication.slug}`} key={publication.identifier}>
                  <p className="journal-meta">
                    <span>{publication.topic}</span>
                    <time dateTime={publication.datePublished}>
                      {formatPublicationDate(publication.datePublished)}
                    </time>
                  </p>
                  <h3>{publication.title}</h3>
                  <p>{publication.description}</p>
                  <b>Read analysis →</b>
                </a>
              ))}
              <a className="journal-register-link" href="/articles">
                Publication register, citations, and article records →
              </a>
            </div>
          </div>
        </section>

        <section className="evidence-home" aria-labelledby="evidence-home-title">
          <div className="evidence-home-head">
            <div>
              <p className="section-kicker">EVIDENCE STEWARDSHIP</p>
              <h2 id="evidence-home-title">The public record behind the work.</h2>
            </div>
            <p>
              Current corpus totals are regenerated from the Heavy Metal Index.
              Detailed evidence remains on the independent index; ICS maintains the
              governance and provenance boundary around it.
            </p>
          </div>
          <div className="evidence-home-stats">
            <a href="https://heavymetalindex.com/sources/" target="_blank" rel="noopener">
              <strong>{formatCount(evidence.peer_reviewed)}</strong>
              <span>Peer-reviewed studies</span>
            </a>
            <a href="https://heavymetalindex.com/sources/" target="_blank" rel="noopener">
              <strong>{formatCount(evidence.sources_total)}</strong>
              <span>Source records</span>
            </a>
            <a href="https://heavymetalindex.com/regulations/" target="_blank" rel="noopener">
              <strong>{formatCount(evidence.jurisdictions)}</strong>
              <span>Jurisdictions represented</span>
            </a>
            <a href="https://heavymetalindex.com/sources/" target="_blank" rel="noopener">
              <strong>{formatCount(evidence.dois)}</strong>
              <span>Sources with a DOI</span>
            </a>
          </div>
          <a className="evidence-home-link" href="/evidence">
            View the coverage atlas and complete stewardship record →
          </a>
        </section>

        <section className="operational-proof" aria-labelledby="proof-title">
          <div className="operational-proof-head">
            <p className="section-kicker section-kicker-light">THE NETWORK IN OPERATION</p>
            <h2 id="proof-title">Authority should resolve to a public record.</h2>
            <p>
              Evidence, standards, and named methodological leadership are published
              on separate, source-linked surfaces under one disclosed institution.
            </p>
          </div>
          <div className="proof-records">
            <a href="https://heavymetalindex.com" target="_blank" rel="noopener">
              <span>01 / EVIDENCE</span>
              <strong>Heavy Metal Index</strong>
              <p>{formatCount(evidence.peer_reviewed)} peer-reviewed studies · {formatCount(evidence.jurisdictions)} jurisdictions · source-resolving evidence records.</p>
              <b>Open the public index ↗</b>
            </a>
            <a href="https://heavymetalcertified.com/standards" target="_blank" rel="noopener">
              <span>02 / STANDARD</span>
              <strong>Heavy Metal Tested &amp; Certified</strong>
              <p>Published limits, Big 8 analyte coverage, standards editions, and current program rules.</p>
              <b>Open published standards ↗</b>
            </a>
            <a href="/people/karen-pendergrass">
              <span>03 / NAMED AUTHORITY</span>
              <strong>Karen Pendergrass</strong>
              <p>15+ years in standards architecture · microbial metallomics research · ORCID-linked record.</p>
              <b>Open research profile →</b>
            </a>
          </div>
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
              <a href="https://heavymetalindex.com" target="_blank" rel="noopener">
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
              <a href="https://heavymetalcertified.com" target="_blank" rel="noopener">
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

        <section className="research-leadership" id="people">
          <div className="research-leadership-portrait">
            <Image src="/karen-pendergrass.avif" width={1023} height={1537} sizes="(max-width: 880px) 100vw, 38vw" alt="Karen Pendergrass" />
            <span>FOUNDER · STANDARDS ARCHITECT · RESEARCH LEAD</span>
          </div>
          <div className="research-leadership-copy">
            <p className="section-kicker section-kicker-light">05 / RESEARCH &amp; STANDARDS LEADERSHIP</p>
            <h2>Karen Pendergrass</h2>
            <p className="research-leadership-dek">
              More than fifteen years building certification frameworks, now joined
              to a research program in heavy metals, food metallomics, and microbial
              metallomics.
            </p>
            <p>
              Karen is the architect of the Heavy Metal Index evidence system and
              the Heavy Metal Tested &amp; Certified methodology. Her executive,
              methodological, and research responsibilities are named so the work
              remains attributable and open to review.
            </p>
            <div className="research-leadership-links">
              <a className="button button-paper" href="/people/karen-pendergrass">Research profile <span aria-hidden="true">→</span></a>
              <a href="https://orcid.org/0000-0002-2348-7259" target="_blank" rel="noopener">ORCID 0000-0002-2348-7259 ↗</a>
            </div>
          </div>
        </section>

        <section className="closing-section">
          <div>
            <p className="section-kicker section-kicker-light">CURRENT PROGRAM</p>
            <h2>One active standard.<br />A network built to grow.</h2>
          </div>
          <div className="closing-actions">
            <a className="button button-paper" href="https://heavymetalcertified.com" target="_blank" rel="noopener">
              Heavy Metal Tested &amp; Certified <span aria-hidden="true">↗</span>
            </a>
            <a href="/network">View the future network →</a>
          </div>
        </section>
      </main>
    </SiteFrame>
  );
}

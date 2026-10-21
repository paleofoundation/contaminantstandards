import Image from "next/image";
import { authorityStats } from "../lib/feeds";
import { SiteFrame } from "./site-chrome";
import { publicationReadLabel, publications } from "./site-data";

const evidence = authorityStats();
const formatCount = (value: number) => value.toLocaleString("en-US");
const leadPublication = publications[0];
const additionalPublications = publications.slice(1, 2);
const publicationCards = publications.slice(2);
const formatPublicationDate = (value: string) =>
  new Date(`${value}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });

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

          <aside className="hero-register" aria-label="Institutional scope">
            <p>Institutional scope</p>
            <dl>
              <div><dt>Governance</dt><dd>Common institutional policy</dd></div>
              <div><dt>Evidence</dt><dd>Independently published indexes</dd></div>
              <div><dt>Programs</dt><dd>Separate certification authorities</dd></div>
              <div><dt>Registry</dt><dd>Current-state verification</dd></div>
            </dl>
            <a href="/governance">Read the institutional model →</a>
          </aside>
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
                  <b>{publicationReadLabel(publication.series)} →</b>
                </a>
              ))}
              <a className="journal-register-link" href="/articles">
                Publication register, citations, and article records →
              </a>
            </div>
          </div>

          <div className="journal-card-grid" aria-label="More Institute publications">
            {publicationCards.map((publication) => (
              <a href={`/articles/${publication.slug}`} key={publication.identifier}>
                <div className="journal-card-meta">
                  <span>{publication.topic}</span>
                  <span>{publication.identifier}</span>
                </div>
                <h3>{publication.title}</h3>
                <p>{publication.description}</p>
                <div className="journal-card-foot">
                  <time dateTime={publication.datePublished}>
                    {formatPublicationDate(publication.datePublished)}
                  </time>
                  <b>{publicationReadLabel(publication.series)} →</b>
                </div>
              </a>
            ))}
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

        <section className="institutional-index" aria-labelledby="institutional-index-title">
          <header className="institutional-index-head">
            <p className="section-kicker">THE INSTITUTION</p>
            <h2 id="institutional-index-title">A public record of governance.</h2>
            <p>
              The Institute publishes the rules and accountability structure. Evidence,
              standards, and certification records remain on their designated surfaces.
            </p>
          </header>
          <div className="institutional-index-list">
            <a href="/governance">
              <span>01</span><strong>Governance</strong><p>How standards are made, versioned, and enforced.</p><b>View →</b>
            </a>
            <a href="/evidence">
              <span>02</span><strong>Evidence stewardship</strong><p>Corpus provenance, scope, and coverage.</p><b>View →</b>
            </a>
            <a href="/network">
              <span>03</span><strong>Network</strong><p>Independent indexes and separate program authorities.</p><b>View →</b>
            </a>
            <a href="/governance/policies">
              <span>04</span><strong>Policy register</strong><p>Current institutional policies and revision records.</p><b>View →</b>
            </a>
          </div>
        </section>

        <section className="research-leadership" id="people">
          <div className="research-leadership-portrait">
            <Image src="/karen-pendergrass.avif" width={1023} height={1537} sizes="(max-width: 880px) 100vw, 34vw" alt="Karen Pendergrass" />
            <span>FOUNDER · STANDARDS ARCHITECT · RESEARCH LEAD</span>
          </div>
          <div className="research-leadership-copy">
            <p className="section-kicker">RESEARCH &amp; STANDARDS LEADERSHIP</p>
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

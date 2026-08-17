import type { Metadata } from "next";
import { PageHero, SiteFrame, Status } from "../site-chrome";

export const metadata: Metadata = {
  title: "Institutional Analysis | Institute of Contaminant Standards",
  description:
    "Analysis from ICS on standards governance, evidence separation, versioning, and institutional independence.",
};

const articles = [
  {
    number: "01",
    title: "Why a certification standard needs an independent index",
    description:
      "The case for keeping literature evidence and conformity decisions on separate public faces, and why independence depends on enforceable data boundaries rather than branding alone.",
    topic: "Institutional architecture",
  },
  {
    number: "02",
    title: "Standards as living, versioned documents",
    description:
      "How a standard changes across editions, why superseded versions remain at stable addresses, and what that means for a certificate cited years later.",
    topic: "Version governance",
  },
  {
    number: "03",
    title: "Why occurrence evidence and certification limits have different jobs",
    description:
      "Public occurrence evidence characterizes markets and research gaps. Government maximums anchor initial HMTc limits; eligible certified-lot data governs later tightening.",
    topic: "Evidence boundary",
  },
];

export default function ArticlesPage() {
  return (
    <SiteFrame>
      <main>
        <PageHero
          index="04 / ARTICLES"
          eyebrow="Institutional analysis"
          title={<>The rules deserve<br /><em>their own record.</em></>}
          description="Analysis from ICS on how contaminant standards are set, separated from evidence, reviewed, versioned, and enforced. Standards and applications remain authoritative only on each program's own site."
          aside={
            <div className="editorial-note">
              <span>EDITORIAL SCOPE</span>
              <p>Governance, institutional design, standards systems, independence, and enforcement.</p>
              <small>NO THRESHOLD TABLES · NO BRAND DIRECTORY</small>
            </div>
          }
        />

        <section className="article-register">
          <div className="article-register-head">
            <p>PUBLICATION REGISTER</p>
            <span>In-preparation items are labeled. Nothing is presented as published before it is complete.</span>
          </div>
          <div className="article-list">
            {articles.map((article) => (
              <article key={article.number}>
                <span className="article-number">{article.number}</span>
                <div>
                  <p className="article-topic">{article.topic}</p>
                  <h2>{article.title}</h2>
                  <p>{article.description}</p>
                </div>
                <Status>In preparation</Status>
              </article>
            ))}
          </div>
        </section>

        <section className="publication-boundary">
          <div>
            <p className="section-kicker section-kicker-light">THE PUBLICATION BOUNDARY</p>
            <h2>Institutional analysis here. Standards on the program site. Literature on the index.</h2>
          </div>
          <div className="publication-destinations">
            <a href="/governance">
              <span>ICS</span>
              <b>Institutional governance →</b>
            </a>
            <a href="https://heavymetalcertified.com" target="_blank" rel="noreferrer">
              <span>HMTc</span>
              <b>Current standard &amp; certification ↗</b>
            </a>
            <a href="https://heavymetalindex.com" target="_blank" rel="noreferrer">
              <span>HMI</span>
              <b>Literature evidence ↗</b>
            </a>
          </div>
        </section>

        <section className="journal-callout">
          <div>
            <p className="section-kicker">SCHOLARLY SYNTHESIS</p>
            <h2>Research papers belong in the Journal of Food Metallomics.</h2>
            <p>
              The ICS article register is for institutional analysis. Formal research
              and synthesis work remains on the scholarly publication surface.
            </p>
          </div>
          <a className="button button-primary" href="https://heavymetalcertified.com/journal-of-food-metallomics" target="_blank" rel="noreferrer">
            Visit the journal <span aria-hidden="true">↗</span>
          </a>
        </section>
      </main>
    </SiteFrame>
  );
}

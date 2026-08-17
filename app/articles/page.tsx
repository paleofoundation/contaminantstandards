import type { Metadata } from "next";
import { PageHero, SiteFrame, Status } from "../site-chrome";
import { canonical, publications } from "../site-data";

export const metadata: Metadata = {
  title: "Institutional Analysis | Institute of Contaminant Standards",
  description:
    "Analysis from ICS on standards governance, evidence separation, versioning, and institutional independence.",
  alternates: { canonical: canonical("/articles") },
  openGraph: {
    title: "Institutional Analysis | Institute of Contaminant Standards",
    description: "Published ICS analysis on evidence architecture, standards governance, and institutional independence.",
    type: "website",
    url: canonical("/articles"),
    images: [],
  },
  twitter: {
    card: "summary",
    title: "Institutional Analysis | Institute of Contaminant Standards",
    description: "Published ICS analysis on evidence architecture, standards governance, and institutional independence.",
    images: [],
  },
};

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
            <span>Publication status, author, record identifier, and stable route are stated for every item.</span>
          </div>
          <div className="article-list">
            {publications.map((article) => (
              <article key={article.number}>
                <span className="article-number">{article.number}</span>
                <div>
                  <p className="article-topic">{article.topic}</p>
                  <h2><a href={`/articles/${article.slug}`}>{article.title}</a></h2>
                  <p>{article.description}</p>
                  <a className="article-open" href={`/articles/${article.slug}`}>{article.identifier} · Read analysis →</a>
                </div>
                <Status tone="live">Published</Status>
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
            <a href="https://heavymetalcertified.com" target="_blank" rel="noopener">
              <span>HMTc</span>
              <b>Current standard &amp; certification ↗</b>
            </a>
            <a href="https://heavymetalindex.com" target="_blank" rel="noopener">
              <span>HMI</span>
              <b>Literature evidence ↗</b>
            </a>
          </div>
        </section>

        <section className="journal-callout">
          <div>
            <p className="section-kicker">SCHOLARLY SYNTHESIS</p>
            <h2>Research papers remain distinct from institutional analysis.</h2>
            <p>
              The ICS register publishes governance and methods analysis. Formal research
              and synthesis work remains on the scholarly publication surface, with its
              own identifiers and publication-status record.
            </p>
          </div>
          <a className="button button-primary" href="https://heavymetalcertified.com/journal-of-food-metallomics" target="_blank" rel="noopener">
            Visit the journal <span aria-hidden="true">↗</span>
          </a>
        </section>
      </main>
    </SiteFrame>
  );
}

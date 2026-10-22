import type { Metadata } from "next";
import { InteriorHero, PageNav, SectionIntro } from "../interior";
import { SiteFrame } from "../site-chrome";
import { PublicationLibrary } from "./publication-library";
import {
  canonical,
  publicationReadLabel,
  publicationSeries,
  publications,
} from "../site-data";

export const metadata: Metadata = {
  title: "Articles | Institute of Contaminant Standards",
  description:
    "Institutional analysis and evidence reviews from ICS. Evidence reviews report what the literature measured, on each source's own basis, and do not set certification limits.",
  alternates: { canonical: canonical("/articles") },
  openGraph: {
    title: "Articles | Institute of Contaminant Standards",
    description:
      "Published ICS institutional analysis and evidence reviews. Evidence reviews do not set certification limits.",
    type: "website",
    url: canonical("/articles"),
    images: [],
  },
  twitter: {
    card: "summary",
    title: "Articles | Institute of Contaminant Standards",
    description:
      "Published ICS institutional analysis and evidence reviews. Evidence reviews do not set certification limits.",
    images: [],
  },
};

export default function ArticlesPage() {
  const latest = [...publications].sort((a, b) =>
    b.datePublished.localeCompare(a.datePublished),
  )[0];
  return (
    <SiteFrame>
      <main className="interior publications-interior">
        <InteriorHero
          label="PUBLICATIONS FROM ICS"
          title={
            <>
              The thinking behind
              <br />
              <em>the standards.</em>
            </>
          }
          description="Evidence reviews and institutional analysis. Explore what the literature has measured, how standards are governed, and why the distinction matters."
        >
          <div className="publications-hero-detail">
            <span>{String(publications.length).padStart(2, "0")}</span>
            <div>
              <b>Published records</b>
              <p>
                Two series. Named authors.
                <br />
                Persistent identifiers.
              </p>
            </div>
          </div>
        </InteriorHero>
        <PageNav
          items={[
            { href: "#latest", label: "Latest publication" },
            { href: "#library", label: "Browse the library" },
            { href: "#further-reading", label: "Further reading" },
          ]}
        />
        <section className="inside-container inside-section" id="latest">
          <p className="inside-label">
            LATEST / {publicationSeries[latest.series].name}
          </p>
          <a className="publication-feature" href={`/articles/${latest.slug}`}>
            <div className="publication-feature-art">
              <span className="inside-label">
                {publicationSeries[latest.series].masthead}
              </span>
              <div className="review-orbits" aria-hidden="true">
                <span />
                <span />
                <span />
                <b>
                  Look
                  <br />
                  <em>closer.</em>
                </b>
              </div>
              <span className="inside-label">{latest.identifier}</span>
            </div>
            <div className="publication-feature-copy">
              <div className="publication-meta">
                <span>
                  {new Date(
                    latest.datePublished + "T00:00:00Z",
                  ).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    timeZone: "UTC",
                  })}
                </span>
                <span>{latest.readingTime}</span>
              </div>
              <h2>{latest.title}</h2>
              <p>{latest.description}</p>
              <div className="publication-author">
                Karen Pendergrass{" "}
                <span>Standards Architect &amp; Research Lead</span>
              </div>
              <span className="inside-row-link">
                {publicationReadLabel(latest.series)}
                <b aria-hidden="true">↗</b>
              </span>
            </div>
          </a>
        </section>
        <section className="inside-band" id="library">
          <div className="inside-container inside-section">
            <SectionIntro
              label="THE PUBLICATION LIBRARY"
              title={
                <>
                  Explore the <em>record.</em>
                </>
              }
            >
              <p>
                Evidence reviews report source measurements on their original
                basis. Institutional analysis examines governance and methods.
                Neither series sets a certification limit.
              </p>
            </SectionIntro>
            <PublicationLibrary publications={publications} />
          </div>
        </section>
        <section
          className="inside-container inside-section"
          id="further-reading"
        >
          <SectionIntro
            label="FURTHER READING"
            title={
              <>
                Find the right
                <br />
                <em>source for your question.</em>
              </>
            }
          />
          <div className="reading-destinations">
            <a href="/governance/notes">
              <span className="inside-label">RESEARCH INTO GOVERNANCE</span>
              <h3>Evidence governance notes</h3>
              <p>
                Follow the implications of a finding for scope, testing,
                surveillance, and claims.
              </p>
              <span className="inside-row-link">
                Explore the register <b aria-hidden="true">↗</b>
              </span>
            </a>
            <a href="https://heavymetalcertified.com/journal-of-food-metallomics">
              <span className="inside-label">SCHOLARLY SYNTHESIS</span>
              <h3>Journal of Food Metallomics</h3>
              <p>
                Formal research and synthesis, with its own identifiers and
                publication-status record.
              </p>
              <span className="inside-row-link">
                Visit the journal <b aria-hidden="true">↗</b>
              </span>
            </a>
            <a href="https://heavymetalindex.com">
              <span className="inside-label">SOURCE LITERATURE</span>
              <h3>Heavy Metal Index</h3>
              <p>
                The independent literature index. Current standards and
                certification requirements live on the program site.
              </p>
              <span className="inside-row-link">
                Explore the index <b aria-hidden="true">↗</b>
              </span>
            </a>
          </div>
        </section>
      </main>
    </SiteFrame>
  );
}

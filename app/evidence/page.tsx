import type { Metadata } from "next";
import CorpusGrowthChart from "../../components/CorpusGrowthChart";
import EvidenceCoverageAtlas from "../../components/EvidenceCoverageAtlas";
import FingerprintGrid from "../../components/FingerprintGrid";
import StatMetrics from "../../components/StatMetrics";
import { authorityStats } from "../../lib/feeds";
import { PageHero, SiteFrame } from "../site-chrome";
import { canonical } from "../site-data";

export const metadata: Metadata = {
  title: "Evidence Stewardship | Institute of Contaminant Standards",
  description:
    "Current stewardship metrics for the Heavy Metal Index evidence corpus, including source coverage, geographic study density, contaminant depth, and publication-year coverage.",
  alternates: { canonical: canonical("/evidence") },
};

const formatCount = (value: number) => value.toLocaleString("en-US");

export default function EvidencePage() {
  const evidence = authorityStats();

  return (
    <SiteFrame>
      <main>
        <PageHero
          index="02 / EVIDENCE"
          eyebrow="Corpus stewardship"
          title={<>The evidence remains<br /><em>public and inspectable.</em></>}
          description="ICS maintains the institutional boundary around the evidence system. The underlying literature, source records, and detailed claims remain authoritative on the independent Heavy Metal Index."
          aside={
            <div className="page-register">
              <span>CURRENT CORPUS</span>
              <dl>
                <div><dt>Source records</dt><dd>{formatCount(evidence.sources_total)}</dd></div>
                <div><dt>Peer-reviewed</dt><dd>{formatCount(evidence.peer_reviewed)}</dd></div>
                <div><dt>Jurisdictions</dt><dd>{formatCount(evidence.jurisdictions)}</dd></div>
                <div><dt>Snapshot</dt><dd>{evidence.generated ?? "Current"}</dd></div>
              </dl>
            </div>
          }
        />

        <section className="evidence-page-intro">
          <p className="section-kicker">STEWARDSHIP, NOT CERTIFICATION MATH</p>
          <h2>What the corpus covers—not what any product passes.</h2>
          <p>
            These figures describe the breadth, provenance, and geographic shape of
            the literature. They do not encode contamination severity, product
            ratings, certification thresholds, or brand-level results.
          </p>
        </section>

        <section className="evidence-block" aria-labelledby="evidence-counts">
          <div className="evidence-block-head">
            <p className="section-kicker">01 / CORPUS</p>
            <h2 id="evidence-counts">Evidence at a glance</h2>
            <p>Every total resolves to the public evidence property.</p>
          </div>
          <StatMetrics />
        </section>

        <section className="evidence-block" aria-labelledby="evidence-geography">
          <div className="evidence-block-head">
            <p className="section-kicker">02 / GEOGRAPHY</p>
            <h2 id="evidence-geography">A global problem, unevenly studied</h2>
            <p>Study density reveals where the published record is deep and where it remains thin.</p>
          </div>
          <EvidenceCoverageAtlas />
        </section>

        <section className="evidence-block" aria-labelledby="evidence-depth">
          <div className="evidence-block-head">
            <p className="section-kicker">03 / CONTAMINANTS</p>
            <h2 id="evidence-depth">Where the literature concentrates</h2>
            <p>Ring depth represents source volume, not risk level.</p>
          </div>
          <FingerprintGrid limit={12} />
        </section>

        <section className="evidence-block" aria-labelledby="evidence-time">
          <div className="evidence-block-head">
            <p className="section-kicker">04 / TIME</p>
            <h2 id="evidence-time">A deepening, current record</h2>
            <p>Publication-year coverage shows the cadence of the indexed literature.</p>
          </div>
          <CorpusGrowthChart since={2000} />
        </section>

        <section className="page-closing">
          <p>PRIMARY EVIDENCE PROPERTY</p>
          <h2>Inspect the sources,<br />not only the totals.</h2>
          <a className="button button-paper" href="https://heavymetalindex.com/" target="_blank" rel="noopener">
            Open the Heavy Metal Index <span aria-hidden="true">↗</span>
          </a>
        </section>
      </main>
    </SiteFrame>
  );
}

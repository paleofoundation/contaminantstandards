import { VERTICALS, siteOf, httpsUrl, siblingLinkAttrs } from "../lib/site-registry"
import StatMetrics from "../components/StatMetrics"
import EvidenceCoverageAtlas from "../components/EvidenceCoverageAtlas"
import FingerprintGrid from "../components/FingerprintGrid"
import CorpusGrowthChart from "../components/CorpusGrowthChart"

// The PARENT homepage answers an institutional question — "who governs contaminant
// certification, and how is it kept independent" — NOT a transactional one ("get
// certified"). The authority modules (metrics, the Evidence Coverage Atlas, the
// coverage fingerprint, corpus growth) describe the SHAPE of the evidence base and
// link to the index for every actual claim; they never reproduce a claim, a
// threshold, or a contamination value (the firewall). H1 leads with the institution.

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <h1>The Institute of Contaminant Standards</h1>
        <p className="lede">
          An independent standards body for contaminants in food and the supply chain. Each
          program is backed by its own independent index of the complete scientific literature and a
          separate certification standard — governed in common, kept independent by a hard
          data-class firewall.
        </p>
        <p className="hero-actions">
          <a href="/network" className="btn">
            See the network
          </a>
          <a href="/governance" className="btn btn-secondary">
            How standards are governed
          </a>
        </p>
      </section>

      <section className="band">
        <h2 className="band-title">The evidence base, by the numbers</h2>
        <p className="band-sub">
          The standards rest on the complete heavy-metals literature — curated, traceable, and
          complete within scope. Every figure links to the independent index.
        </p>
        <StatMetrics />
      </section>

      <section className="band">
        <h2 className="band-title">A global problem, unevenly studied</h2>
        <EvidenceCoverageAtlas />
      </section>

      <section className="band">
        <h2 className="band-title">Where the literature concentrates</h2>
        <p className="band-sub">
          Depth of evidence per contaminant — the ring shows relative study volume, not level of
          risk. Click through to the metal&apos;s review on the index.
        </p>
        <FingerprintGrid limit={12} />
      </section>

      <section className="band">
        <h2 className="band-title">Programs</h2>
        <div className="card-grid">
          {VERTICALS.map((v) => {
            const cert = siteOf(v, "cert")
            const index = siteOf(v, "index")
            const isLive = v.status === "live"
            return (
              <article key={v.key} className={`card ${isLive ? "card-live" : "card-reserved"}`}>
                <h3>
                  {v.displayName}
                  {!isLive && <span className="chip">In development</span>}
                </h3>
                <p>{v.blurb}</p>
                {isLive ? (
                  <ul className="card-links">
                    {cert?.publicLink && (
                      <li>
                        <a
                          href={httpsUrl(cert.domain)}
                          {...siblingLinkAttrs(`${v.displayName} Tested & Certified — the certification program`)}
                        >
                          Get {v.displayName} Certified →
                        </a>
                      </li>
                    )}
                    {index?.publicLink && (
                      <li>
                        <a
                          href={httpsUrl(index.domain)}
                          {...siblingLinkAttrs(`${v.displayName} — the independent literature index`)}
                        >
                          The literature index
                        </a>
                      </li>
                    )}
                  </ul>
                ) : (
                  <p className="reserved-note">
                    The {v.displayName} program is in development. The same architecture — an
                    independent index and a separate certification standard — applies.
                  </p>
                )}
              </article>
            )
          })}
        </div>
      </section>

      <section className="band">
        <h2 className="band-title">A deepening, current record</h2>
        <CorpusGrowthChart since={2000} />
      </section>

      <section className="institutional">
        <h2>Independence is the product</h2>
        <p>
          ICS does not test products and does not sell a badge. It governs standards: how a
          certification limit is set, how the evidence behind it is kept independent and traceable,
          how the mark is used, and how enforcement works. The threshold math, the certified-product
          directory, and the application live on each program&apos;s own site; the literature lives
          on the independent index. ICS describes how those pieces fit and keeps them apart — it
          publishes no threshold values and no brand-level data itself.
        </p>
        <p>
          <a href="/governance">How standards are governed</a> ·{" "}
          <a href="/registry">Look up a certified brand</a> · <a href="/verify">Verify a certificate</a> ·{" "}
          <a href="/articles">Read the articles</a> · <a href="/apply">Apply for certification</a>
        </p>
      </section>
    </>
  )
}

import { VERTICALS, siteOf, httpsUrl } from "../lib/site-registry"

// The PARENT homepage answers an institutional question — "who runs and governs
// contaminant certification" — NOT a transactional one ("get heavy metal
// certified"). That intent split is what keeps the parent off the child's #1
// transactional term (plan 6.B). The H1 leads with the institution; every
// call-to-action is a REFERRAL to a child program, never a conversion here.

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <h1>The Institute for Contaminant Standards</h1>
        <p className="lede">
          An independent standards body for contaminants in food and the supply chain. Each
          program is backed by its own independent index of the complete scientific literature
          and a separate certification standard — governed in common, kept independent by a hard
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

      <section className="verticals">
        <h2>Programs</h2>
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
                      // Transactional/branded anchor — parent authority spent to lift the
                      // child on the term the child must own.
                      <li>
                        <a href={httpsUrl(cert.domain)}>Get {v.displayName} Certified →</a>
                      </li>
                    )}
                    {index?.publicLink && (
                      // Evidence anchor — one-way citation to the independent index.
                      <li>
                        <a href={httpsUrl(index.domain)}>The literature index</a>
                      </li>
                    )}
                  </ul>
                ) : (
                  // Reserved: card-only, NO live link, NO indexable stub. The
                  // multi-vertical institutional story is the point of ICS.
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

      <section className="institutional">
        <h2>What ICS is</h2>
        <p>
          ICS does not test products and does not sell a badge. It governs standards: how a
          certification limit is set, how the evidence behind it is kept independent and
          traceable, how the mark is used, and how enforcement works. The standards themselves,
          the application, and the certified-product directory live on each program&apos;s own
          site. ICS is the body that stands behind them.
        </p>
        <p>
          <a href="/registry">Look up a certified brand</a> · <a href="/verify">Verify a certificate</a> ·{" "}
          <a href="/apply">Apply for certification</a>
        </p>
      </section>
    </>
  )
}

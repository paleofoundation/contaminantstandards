import type { Metadata } from "next";
import {
  InteriorHero,
  PageNav,
  SectionIntro,
  InteriorClosing,
  MaterialMark,
} from "../interior";
import { SiteFrame, Status } from "../site-chrome";
import { canonical } from "../site-data";

export const metadata: Metadata = {
  title: "Contaminant Network | Institute of Contaminant Standards",
  description:
    "The evidence-index and certification-program network governed by the Institute of Contaminant Standards.",
  alternates: { canonical: canonical("/network") },
  openGraph: {
    title: "Contaminant Network | Institute of Contaminant Standards",
    description:
      "The evidence-index and certification-program network governed by ICS.",
    type: "website",
    url: canonical("/network"),
    images: [],
  },
  twitter: {
    card: "summary",
    title: "Contaminant Network | Institute of Contaminant Standards",
    description:
      "The evidence-index and certification-program network governed by ICS.",
    images: [],
  },
};

const programs = [
  {
    code: "01 / HM",
    title: "Heavy metals",
    status: "Operational",
    tone: "live" as const,
    description:
      "The active program covers an eight-total laboratory panel, core iAs and Cr-VI species controls, and MeHg wherever a credible methylation pathway makes it material.",
    index: {
      label: "Heavy Metal Index",
      domain: "heavymetalindex.com",
      href: "https://heavymetalindex.com",
      note: "Independent literature and regulatory evidence",
      linked: true,
    },
    standard: {
      label: "Heavy Metal Tested & Certified",
      domain: "heavymetalcertified.com",
      href: "https://heavymetalcertified.com",
      note: "Certification standard, program, and applications",
    },
  },
  {
    code: "02 / MP",
    title: "Microplastics",
    status: "In development",
    tone: "quiet" as const,
    description:
      "A contaminant standard for microplastics using the same structural model: an independent literature index and a separate certification authority under common governance.",
    index: {
      label: "Microplastics Index",
      domain: "microplasticsindex.com",
      href: "https://microplasticsindex.com",
      note: "Literature index in development",
      linked: false,
    },
    standard: {
      label: "Microplastics Tested",
      domain: "microplasticstested.com",
      href: "https://microplasticstested.com",
      note: "Certification program in development",
    },
  },
  {
    code: "03 / PF",
    title: "Forever chemicals (PFAS)",
    status: "In development",
    tone: "quiet" as const,
    description:
      "A public PFAS evidence index, with a certification pathway in development. The index and the certification property stay separate under the same data-class firewall.",
    index: {
      label: "Forever Chemicals Index",
      domain: "foreverchemicalsindex.com",
      href: "https://foreverchemicalsindex.com",
      note: "Public PFAS evidence index",
      linked: true,
    },
    standard: {
      label: "Forever Chemicals Tested",
      domain: "foreverchemicalstested.com",
      href: null,
      note: "Certification destination reserved; not yet live",
    },
  },
];

export default function NetworkPage() {
  return (
    <SiteFrame>
      <main className="interior network-interior">
        <InteriorHero
          label="OUR NETWORK"
          title={
            <>
              Connected by purpose.
              <br />
              <em>Clear by design.</em>
            </>
          }
          description="Find the research, the certification program, or the evidence behind a laboratory record. Every part of the ICS network has a distinct job."
        >
          <div className="network-map">
            <p className="inside-label">
              ONE INSTITUTION · DISTINCT RESPONSIBILITIES
            </p>
            <div className="network-map-core">
              <span>ICS</span>
              <p>
                Shared governance.
                <br />
                Accountable standards.
              </p>
            </div>
            <div className="network-map-branches">
              <a href="#programs">
                <small>01 / RESEARCH</small>
                <b>Evidence indexes</b>
                <span>Explore the literature ↘</span>
              </a>
              <a href="/apply">
                <small>02 / CERTIFICATION</small>
                <b>Certification programs</b>
                <span>Find your pathway ↗</span>
              </a>
            </div>
            <a className="network-map-foot" href="#infrastructure">
              Verified evidence &amp; connected sourcing{" "}
              <span aria-hidden="true">↓</span>
            </a>
          </div>
        </InteriorHero>
        <PageNav
          items={[
            { href: "#programs", label: "Contaminant programs" },
            { href: "#infrastructure", label: "Shared infrastructure" },
            { href: "#roles", label: "How it fits together" },
          ]}
        />
        <section className="inside-section inside-container" id="programs">
          <SectionIntro
            label="01 / CONTAMINANT PROGRAMS"
            title={
              <>
                Explore by <em>contaminant.</em>
              </>
            }
          >
            <p>
              Each field pairs a public evidence index with a separate
              certification program. Availability is shown at the program level.
            </p>
          </SectionIntro>
          <div className="network-programs">
            {programs.map((p, i) => (
              <article
                className={`network-program ${i === 0 ? "is-live" : ""}`}
                id={
                  i === 0 ? "heavy-metals" : i === 1 ? "microplastics" : "pfas"
                }
                key={p.code}
              >
                <div className="network-program-top">
                  <span className="inside-label">{p.code}</span>
                  <Status tone={p.tone}>
                    {i === 0 ? "Established program" : p.status}
                  </Status>
                </div>
                <MaterialMark
                  kind={i === 0 ? "metals" : i === 1 ? "plastics" : "pfas"}
                />
                <h3>{i === 2 ? "PFAS" : p.title}</h3>
                <p>
                  {i === 0
                    ? "A public research index and an active certification pathway for heavy metals in products."
                    : i === 1
                      ? "A dedicated evidence index and certification pathway for microplastics are in development."
                      : "A public PFAS evidence index, with a certification pathway in development."}
                </p>
                <div className="network-destinations">
                  <div>
                    <span className="inside-label">EXPLORE THE EVIDENCE</span>
                    {p.index.linked ? (
                      <a href={p.index.href}>
                        {p.index.label}
                        <span aria-hidden="true">↗</span>
                      </a>
                    ) : (
                      <b>{p.index.label}</b>
                    )}
                    <small>
                      {p.index.domain}
                      {p.index.linked ? "" : " · In development"}
                    </small>
                  </div>
                  <div>
                    <span className="inside-label">FIND THE PROGRAM</span>
                    {p.tone === "live" ? (
                      <a href={p.standard.href!}>
                        {p.standard.label}
                        <span aria-hidden="true">↗</span>
                      </a>
                    ) : (
                      <b>{p.standard.label}</b>
                    )}
                    <small>
                      {p.standard.domain}
                      {p.tone !== "live" ? " · Applications not open" : ""}
                    </small>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section className="inside-band" id="infrastructure">
          <div className="inside-container inside-section">
            <SectionIntro
              label="02 / SHARED INFRASTRUCTURE"
              title={
                <>
                  Follow the record.
                  <br />
                  <em>Connect the next step.</em>
                </>
              }
            >
              <p>
                Two shared services help evidence travel with a laboratory
                record or an ingredient lot.
              </p>
            </SectionIntro>
            <div className="service-pair">
              <article>
                <div className="service-heading">
                  <span className="service-letter">T↗</span>
                  <Status tone="live">Operational</Status>
                </div>
                <h3>TECRID</h3>
                <p>
                  A Test Evidence Credential Record Identifier gives a versioned
                  laboratory evidence record a persistent address, with visible
                  provenance and machine-readable findings.
                </p>
                <a className="inside-row-link" href="https://tecrid.com">
                  Explore TECRID <span aria-hidden="true">↗</span>
                </a>
                <a
                  className="inside-sub-link"
                  href="https://tecrid.com/what-is-a-tecrid"
                >
                  What is a TECRID? ↗
                </a>
              </article>
              <article>
                <div className="service-heading">
                  <span className="service-letter">V↗</span>
                  <Status>Demo &amp; pilot</Status>
                </div>
                <h3>Verified Lot Exchange</h3>
                <p>
                  Ingredient sourcing connected to lot-level evidence. Explore
                  suppliers, products, and the documentation that supports each
                  lot.
                </p>
                <a className="inside-row-link" href="https://vle.exchange">
                  Explore VLE.exchange <span aria-hidden="true">↗</span>
                </a>
              </article>
            </div>
          </div>
        </section>
        <section className="inside-container inside-section" id="roles">
          <SectionIntro
            label="03 / HOW IT FITS TOGETHER"
            title={
              <>
                One framework.
                <br />
                <em>Distinct responsibilities.</em>
              </>
            }
          >
            <p>
              ICS governs the relationships between these services. Public
              research, certification decisions, and private application records
              keep their own boundaries.
            </p>
          </SectionIntro>
          <div className="role-trio">
            <article>
              <span className="inside-label">RESEARCH</span>
              <h3>The index informs.</h3>
              <p>
                Literature and regulatory evidence remain traceable to their
                sources. The index does not make certification decisions.
              </p>
            </article>
            <article>
              <span className="inside-label">CERTIFICATION</span>
              <h3>The program decides.</h3>
              <p>
                Each program publishes its standards, methods, evidence
                requirements, and certification pathway.
              </p>
            </article>
            <article>
              <span className="inside-label">GOVERNANCE</span>
              <h3>The Institute governs.</h3>
              <p>
                ICS sets the rules for independence, verification, changes to
                standards, and mark enforcement.
              </p>
            </article>
          </div>
          <a className="inside-sub-link" href="/apply">
            For brands: start or continue in the ICS certification portal ↗
          </a>
        </section>
        <InteriorClosing
          label="THE PRINCIPLE THAT CONNECTS US"
          title={
            <>
              A connected network.
              <br />
              <em>Accountable at every step.</em>
            </>
          }
          href="/governance"
          link="Explore our governance"
        />
      </main>
    </SiteFrame>
  );
}

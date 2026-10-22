import type { Metadata } from "next";
import { PageHero, SiteFrame, Status } from "../site-chrome";
import { canonical } from "../site-data";

export const metadata: Metadata = {
  title: "Contaminant Network | Institute of Contaminant Standards",
  description:
    "The evidence-index and certification-program network governed by the Institute of Contaminant Standards.",
  alternates: { canonical: canonical("/network") },
  openGraph: {
    title: "Contaminant Network | Institute of Contaminant Standards",
    description: "The evidence-index and certification-program network governed by ICS.",
    type: "website",
    url: canonical("/network"),
    images: [],
  },
  twitter: {
    card: "summary",
    title: "Contaminant Network | Institute of Contaminant Standards",
    description: "The evidence-index and certification-program network governed by ICS.",
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
      "A PFAS evidence and conformity system, designed as separate public properties with the same data-class firewall and common institutional rules.",
    index: {
      label: "Forever Chemicals Index",
      domain: "foreverchemicalsindex.com",
      href: "https://foreverchemicalsindex.com",
      note: "Literature index in development",
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
      <main>
        <PageHero
          index="01 / NETWORK"
          eyebrow="The contaminant portfolio"
          title={<>One institution.<br /><em>Separate public faces.</em></>}
          description="Every contaminant receives its own literature index and its own certification program. ICS governs the shared architecture while the evidence, thresholds, and operating records remain in the data class where they belong."
          aside={
            <div className="page-register">
              <span>NETWORK REGISTER</span>
              <dl>
                <div><dt>Operational programs</dt><dd>1</dd></div>
                <div><dt>Programs in development</dt><dd>2</dd></div>
                <div><dt>Shared infrastructure services</dt><dd>2</dd></div>
                <div><dt>Public faces per contaminant</dt><dd>2</dd></div>
                <div><dt>Shared governance body</dt><dd>ICS</dd></div>
              </dl>
            </div>
          }
        />

        <section className="network-rule">
          <span>THE REPEATABLE MODEL</span>
          <div><b>Independent index</b><i aria-hidden="true">＋</i><b>Certification program</b><i aria-hidden="true">＋</i><b>ICS governance</b></div>
        </section>

        <section className="program-network" aria-label="Contaminant programs">
          {programs.map((program) => (
            <article className="program-track" id={program.code.includes("MP") ? "microplastics" : program.code.includes("PF") ? "pfas" : "heavy-metals"} key={program.code}>
              <div className="track-intro">
                <p>{program.code}</p>
                <Status tone={program.tone}>{program.status}</Status>
                <h2>{program.title}</h2>
                <p>{program.description}</p>
              </div>

              <div className="track-faces">
                <div className="track-face index-face">
                  <span>LITERATURE INDEX</span>
                  <h3>{program.index.label}</h3>
                  <p>{program.index.note}</p>
                  {program.tone === "live" ? <a href={program.index.href} target="_blank" rel="noopener">{program.index.domain} ↗</a> : <span className="domain-not-live">{program.index.domain} · In development</span>}
                </div>

                <div className="track-arrow" aria-hidden="true">
                  <span>ONE-WAY<br />CITATION</span>
                  <b>←</b>
                </div>

                <div className="track-face standard-face">
                  <span>CERTIFICATION PROGRAM</span>
                  <h3>{program.standard.label}</h3>
                  <p>{program.standard.note}</p>
                  {program.standard.href && program.tone === "live" ? (
                    <a href={program.standard.href} target="_blank" rel="noopener">
                      {program.standard.domain} ↗
                    </a>
                  ) : (
                    <span className="domain-not-live">{program.standard.domain}</span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </section>

        <section className="shared-services-section">
          <div className="shared-services-intro">
            <p className="section-kicker section-kicker-light">SHARED INSTITUTION</p>
            <h2>Central authority without a central data pool.</h2>
            <p>
              ICS supplies common governance and, as the network grows, common
              verification infrastructure. Applications remain with the active
              program while there is only one operational certification pathway.
            </p>
          </div>
          <div className="service-grid">
            <article>
              <Status tone="live">Available</Status>
              <h3>Institutional authority</h3>
              <p>Governance, network structure, leadership, and institutional analysis.</p>
              <a href="https://contaminantstandards.com" target="_blank" rel="noopener">contaminantstandards.com ↗</a>
            </article>
            <article className="service-tec">
              <Status tone="live">Operational</Status>
              <h3>TECRID Registry</h3>
              <p>
                TECRID stands for Test Evidence Credential Record Identifier. Each
                identifier resolves a versioned laboratory evidence record with visible
                provenance and structured, machine-readable findings.
              </p>
              <a href="https://tecrid.com/what-is-a-tecrid" target="_blank" rel="noopener">What is a TECRID? ↗</a>
            </article>
            <article>
              <Status>Demo &amp; pilot</Status>
              <h3>Verified Lot Exchange</h3>
              <p>Ingredient sourcing connected to lot-level evidence, supplier information, and supporting documentation.</p>
              <a href="https://vle.exchange">Explore VLE.exchange ↗</a>
            </article>
            <article>
              <Status>Program-routed</Status>
              <h3>Applications</h3>
              <p>
                With one active program, applications belong on the Heavy Metal
                Tested &amp; Certified site rather than behind a redundant ICS portal.
              </p>
              <a href="https://heavymetalcertified.com" target="_blank" rel="noopener">Go to the active program ↗</a>
            </article>
          </div>
        </section>

        <section className="page-closing">
          <p>THE INSTITUTIONAL RULE</p>
          <h2>The network can grow.<br />The firewall does not move.</h2>
          <a className="button button-paper" href="/governance">Read governance <span aria-hidden="true">→</span></a>
        </section>
      </main>
    </SiteFrame>
  );
}

import type { Metadata } from "next";
import { PageHero, SiteFrame, Status } from "../site-chrome";
import { canonical } from "../site-data";
import { liveVerticals } from "../../lib/site-registry";
import { NetworkFaces } from "../../components/NetworkFaces";

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

export default function NetworkPage() {
  const programs = liveVerticals();
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
                <div><dt>Operational programs</dt><dd>{programs.length}</dd></div>
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
            <article className="program-track" key={program.key}>
              <div className="track-intro">
                <Status tone="live">Public network</Status>
                <h2><a href={`/network/${program.key}`}>{program.displayName}</a></h2>
                <p>{program.blurb}</p>
              </div>
              <NetworkFaces vertical={program} />
            </article>
          ))}
        </section>

        <section className="shared-services-section">
          <div className="shared-services-intro">
            <p className="section-kicker section-kicker-light">SHARED INSTITUTION</p>
            <h2>Central authority without a central data pool.</h2>
            <p>
              ICS supplies common governance and, as the network grows, common
              verification infrastructure. A shared multi-program application
              hub is in development.
            </p>
          </div>
          <div className="service-grid">
            <article>
              <Status tone="live">Available</Status>
              <h3>Institutional authority</h3>
              <p>Governance, network structure, leadership, and institutional analysis.</p>
              <a href="https://contaminantstandards.com" target="_blank" rel="noopener">contaminantstandards.com ↗</a>
            </article>
            <article>
              <Status>Deferred shared service</Status>
              <h3>Certificate verification</h3>
              <p>
                Designed as single-record verification with no public brand directory.
                It will be surfaced when the shared service is operational.
              </p>
            </article>
            <article>
              <Status>In development</Status>
              <h3>Applications</h3>
              <p>A shared application hub is planned for the certification programs. It is not open for applications here.</p>
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

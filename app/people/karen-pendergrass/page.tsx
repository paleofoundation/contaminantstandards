import type { Metadata } from "next";
import Image from "next/image";
import { PersonName } from "../../person-name";
import { orcidUrl, researchers } from "../../people-data";
import { headers } from "next/headers";
import { JsonLd } from "../../json-ld";
import {
  canonical,
  KAREN_ID,
  KAREN_PATH,
  karenProfiles,
  ORGANIZATION_ID,
  SITE_ORIGIN,
} from "../../site-data";
import { SiteFrame, Status } from "../../site-chrome";

const title = "Karen Pendergrass | Standards Architect & Microbial Metallomics Researcher";
const description =
  "Karen Pendergrass is the founder and Standards Architect of ICS, architect of the Heavy Metal Index evidence system, and a researcher in heavy metals and microbial metallomics.";

async function requestOrigin() {
  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") ??
    requestHeaders.get("host") ??
    "institute-contaminant-standards.kmfp.chatgpt.site";
  const protocol =
    requestHeaders.get("x-forwarded-proto") ??
    (host.startsWith("localhost") ? "http" : "https");
  return `${protocol}://${host}`;
}

export async function generateMetadata(): Promise<Metadata> {
  const origin = await requestOrigin();
  const image = `${origin}/karen-pendergrass.avif`;

  return {
    title,
    description,
    alternates: { canonical: canonical(KAREN_PATH) },
    authors: [{ name: "Karen Pendergrass", url: canonical(KAREN_PATH) }],
    other: { citation_author_orcid: orcidUrl("karen") },
    openGraph: {
      title,
      description,
      type: "profile",
      url: canonical(KAREN_PATH),
      siteName: "Institute of Contaminant Standards",
      images: [{ url: image, width: 1023, height: 1537, alt: "Karen Pendergrass" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

const timeline = [
  {
    year: "2010",
    title: "Paleo Foundation established",
    body: "Began building published certification frameworks and the standards architecture that now spans Paleo, Keto, Grain-Free, and contaminant programs.",
  },
  {
    year: "2025",
    title: "Microbial metallomics research",
    body: "Published research examining metal-driven biological mechanisms and developed the microbial metallomics research program at Microbiome Medicine.",
  },
  {
    year: "2025",
    title: "Beneficial Microbes Conference speaker",
    body: "Invited to speak at the 11th Beneficial Microbes Conference on the intersection of microbes, metals, and human health.",
  },
  {
    year: "2026",
    title: "Heavy-metal evidence and standards systems",
    body: "Architected the Heavy Metal Index evidence system, the HMTc methodology, and the Institute governance model that keeps evidence and certification decisions structurally separate.",
  },
];

const selectedWorks = [
  {
    type: "Preprint · DOI-registered",
    year: "2026",
    title:
      "Heavy Metals, Microbial Metallomics, and the US Obesity Epidemic: A Unified Environmental Framework",
    identifier: "DOI 10.5281/zenodo.18434951",
    href: "https://doi.org/10.5281/zenodo.18434951",
  },
  {
    type: "Preprint · DOI-registered",
    year: "2026",
    title: "Heavy Metals in Fertilizers: A Historical Analysis of Contamination Trends (1960–2025)",
    identifier: "DOI 10.5281/zenodo.18439158",
    href: "https://doi.org/10.5281/zenodo.18439158",
  },
  {
    type: "Research paper",
    year: "2025",
    title:
      "Microbial Metallomics and Parkinson’s Disease: A Unified Metal-Driven Framework Linking Ferroptosis, Dysbiosis, and α-Synuclein Pathology",
    identifier: "Microbiome Medicine",
    href: "https://microbiomemedicine.com/wp-content/uploads/2025/12/Microbial-Metallomics-and-Parkinsons-Disease-A-Unified-Metal-Driven-Framework-Linking-Ferroptosis-Dysbiosis-and-%CE%B1-Synuclein-Pathology.pdf",
  },
];

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${SITE_ORIGIN}${KAREN_PATH}#profile-page`,
  url: canonical(KAREN_PATH),
  name: title,
  description,
  dateModified: "2026-08-17",
  mainEntity: {
    "@type": "Person",
    "@id": KAREN_ID,
    name: "Karen Pendergrass",
    givenName: "Karen",
    familyName: "Pendergrass",
    url: canonical(KAREN_PATH),
    image: canonical("/karen-pendergrass.avif"),
    jobTitle: "Founder, Chief Executive Officer, Standards Architect, and Research Lead",
    description:
      "Standards architect and microbial metallomics researcher with more than fifteen years of certification-framework development.",
    identifier: [
      { "@type": "PropertyValue", propertyID: "ORCID", value: researchers.karen.orcid },
      { "@type": "PropertyValue", propertyID: "Google Scholar", value: "xnzAh-wAAAAJ" },
    ],
    worksFor: { "@id": ORGANIZATION_ID },
    affiliation: [
      { "@id": ORGANIZATION_ID },
      {
        "@type": "Organization",
        name: "Paleo Foundation",
        url: "https://paleofoundation.com/",
      },
      {
        "@type": "Organization",
        name: "Microbiome Medicine",
        url: "https://microbiomemedicine.com/",
      },
    ],
    sameAs: [
      karenProfiles.orcid,
      karenProfiles.scholar,
      karenProfiles.personal,
      karenProfiles.paleoFoundation,
      karenProfiles.microbiomeMedicine,
    ],
    knowsAbout: [
      "Contaminant standards architecture",
      "Heavy metals",
      "Food metallomics",
      "Microbial metallomics",
      "Evidence systems",
      "Certification methodology",
      "Microbiome research",
    ],
    subjectOf: [
      {
        "@type": "ScholarlyArticle",
        name: selectedWorks[0].title,
        identifier: "https://doi.org/10.5281/zenodo.18434951",
        url: selectedWorks[0].href,
      },
      {
        "@type": "ScholarlyArticle",
        name: selectedWorks[1].title,
        identifier: "https://doi.org/10.5281/zenodo.18439158",
        url: selectedWorks[1].href,
      },
      {
        "@type": "Event",
        name: "11th Beneficial Microbes Conference",
        url: "https://beneficialmicrobes.events/programme.html",
      },
    ],
  },
};

export default function KarenPendergrassPage() {
  return (
    <SiteFrame>
      <JsonLd data={personJsonLd} />
      <main>
        <section className="profile-hero">
          <div className="profile-portrait">
            <Image
              src="/karen-pendergrass.avif"
              width={1023}
              height={1537}
              sizes="(max-width: 880px) 100vw, 36vw"
              alt="Karen Pendergrass"
            />
            <span>ICS / NAMED AUTHORITY / KP</span>
          </div>
          <div className="profile-hero-copy">
            <p className="page-index">PEOPLE / <PersonName person="karen" /></p>
            <p className="eyebrow">Standards architecture · microbial metallomics</p>
            <h1><PersonName person="karen">Karen<br /><em>Pendergrass</em></PersonName></h1>
            <p className="profile-lede">
              Founder and Standards Architect of the Institute of Contaminant
              Standards. <PersonName person="karen">Karen</PersonName> leads the research and methodological systems behind
              the <a href="https://heavymetalindex.com/" target="_blank" rel="noopener">Heavy Metal Index</a> and
              {" "}<a href="https://heavymetalcertified.com/" target="_blank" rel="noopener">Heavy Metal Tested &amp; Certified</a>.
            </p>
            <div className="profile-credentials" aria-label="Career record">
              <div><strong>15+</strong><span>years in standards architecture</span></div>
              <div><strong>2010</strong><span>Paleo Foundation established</span></div>
              <div><strong>ORCID</strong><span>{researchers.karen.orcid}</span></div>
            </div>
          </div>
        </section>

        <section className="profile-statement">
          <p className="section-kicker section-kicker-light">RESEARCH &amp; STANDARDS MANDATE</p>
          <h2>Heavy-metal authority built across evidence, biology, and standards.</h2>
          <div>
            <p>
              <PersonName person="karen">Karen’s</PersonName> work joins three disciplines that are often treated separately:
              contaminant occurrence evidence, the biological behavior of metals in
              microbial systems, and the institutional design of certification standards.
            </p>
            <p>
              At ICS, she is accountable for standards architecture and research
              direction. Her operational role is stated explicitly so that methods,
              decisions, publications, and conflicts remain attributable and reviewable.
            </p>
          </div>
        </section>

        <section className="profile-section profile-timeline-section">
          <div className="profile-section-head">
            <p className="section-kicker">01 / PROFESSIONAL RECORD</p>
            <h2>A standards practice developed over more than fifteen years.</h2>
          </div>
          <div className="profile-timeline">
            {timeline.map((entry) => (
              <article key={`${entry.year}-${entry.title}`}>
                <span>{entry.year}</span>
                <div>
                  <h3>{entry.title}</h3>
                  <p>{entry.body}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="profile-section works-section">
          <div className="profile-section-head">
            <p className="section-kicker section-kicker-light">02 / SELECTED WORK</p>
            <h2>Research records with stable external sources.</h2>
          </div>
          <div className="works-register">
            {selectedWorks.map((work, index) => (
              <article key={work.href}>
                <span className="work-number">0{index + 1}</span>
                <div>
                  <p>{work.type} · {work.year}</p>
                  <h3>{work.title}</h3>
                  <a href={work.href} target="_blank" rel="noopener">
                    {work.identifier} ↗
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="profile-section conference-record">
          <div>
            <p className="section-kicker">03 / CONFERENCE RECORD</p>
            <Status tone="live">Official program</Status>
            <h2>11th Beneficial Microbes Conference</h2>
            <p>
              Invited speaker on the intersection of microbial systems, metals, and
              human health, appearing in the official program alongside academic and
              industry researchers.
            </p>
          </div>
          <a
            className="button button-primary"
            href="https://beneficialmicrobes.events/programme.html"
            target="_blank"
            rel="noopener"
          >
            View official program <span aria-hidden="true">↗</span>
          </a>
        </section>

        <section className="profile-section profile-identifiers">
          <div className="profile-section-head">
            <p className="section-kicker section-kicker-light">04 / IDENTIFIERS &amp; AFFILIATIONS</p>
            <h2>One person record across the research network.</h2>
          </div>
          <div className="identifier-grid">
            <a href={karenProfiles.orcid} target="_blank" rel="noopener"><span>Research identifier</span><b>ORCID ↗</b></a>
            <a href={karenProfiles.scholar} target="_blank" rel="noopener"><span>Citation record</span><b>Google Scholar ↗</b></a>
            <a href={karenProfiles.paleoFoundation} target="_blank" rel="noopener"><span>Standards practice</span><b>Paleo Foundation ↗</b></a>
            <a href={karenProfiles.microbiomeMedicine} target="_blank" rel="noopener"><span>Research program</span><b>Microbiome Medicine ↗</b></a>
          </div>
        </section>

        <section className="profile-disclosure">
          <div>
            <p className="section-kicker section-kicker-light">DISCLOSURE</p>
            <h2>Authority is named. Publication status is not blurred.</h2>
          </div>
          <p>
            <PersonName person="karen">Karen</PersonName> holds executive, research, and standards responsibilities within
            ICS and Paleo Certified, Inc. DOI registration supplies a persistent
            research record; it is not presented as peer review. Each work is labeled
            by its actual publication status, and institutional analyses remain
            distinct from certification standards and literature-index records.
          </p>
        </section>
      </main>
    </SiteFrame>
  );
}

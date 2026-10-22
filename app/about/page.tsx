import type { Metadata } from "next";
import {
  InteriorHero,
  PageNav,
  SectionIntro,
  InteriorClosing,
} from "../interior";
import Image from "next/image";
import { SiteFrame, Status } from "../site-chrome";
import { canonical } from "../site-data";

export const metadata: Metadata = {
  title: "About & People | Institute of Contaminant Standards",
  description:
    "The named leadership, standards, research, licensing, auditing, and oversight structure of the Institute of Contaminant Standards.",
  alternates: { canonical: canonical("/about") },
  openGraph: {
    title: "About & People | Institute of Contaminant Standards",
    description:
      "Named authority, operating responsibilities, and oversight boundaries at ICS.",
    type: "website",
    url: canonical("/about"),
    images: [],
  },
  twitter: {
    card: "summary",
    title: "About & People | Institute of Contaminant Standards",
    description:
      "Named authority, operating responsibilities, and oversight boundaries at ICS.",
    images: [],
  },
};

const authorityMap = [
  {
    number: "01",
    function: "Executive leadership",
    people: "Karen Pendergrass · Kimberly Eyer",
    authority:
      "Institutional direction, organizational accountability, and program continuity.",
    status: "Named",
  },
  {
    number: "02",
    function: "Standards & research",
    people: "Karen Pendergrass",
    authority:
      "Standards architecture, methodology development, evidence systems, and research direction.",
    status: "Named",
  },
  {
    number: "03",
    function: "Certification operations",
    people: "Jonathan D. Pendergrass · Jennifer Eyer",
    authority:
      "Licensing, mark administration, compliance auditing, and operating records.",
    status: "Named",
  },
  {
    number: "04",
    function: "Independent oversight",
    people: "Standards & impartiality committee",
    authority:
      "Independent review and override authority, subject to conflict and recusal controls.",
    status: "Being constituted",
  },
  {
    number: "05",
    function: "External contributors & advisers",
    people: "Engagement-based public register",
    authority:
      "Scope-specific technical contribution without implied institutional decision authority.",
    status: "Published when active",
  },
];

const people = [
  {
    initials: "KP",
    name: "Karen Pendergrass",
    title: "Founder & Chief Executive Officer",
    functions: "Executive leadership · Standards Architect · Research lead",
    description:
      "Karen holds the Institute’s executive, standards, and research responsibilities. Across more than fifteen years of standards architecture, she developed certification frameworks and now leads ICS work in heavy metals, food metallomics, and microbial metallomics. She is the architect of the Heavy Metal Index evidence system and Heavy Metal Tested & Certified methodology.",
    image: "/karen-pendergrass.avif",
    links: [
      {
        label: "Google Scholar",
        href: "https://scholar.google.com/citations?user=xnzAh-wAAAAJ&hl=en",
      },
      { label: "Heavy Metal Index", href: "https://heavymetalindex.com/" },
      { label: "HMTc methodology", href: "https://heavymetalcertified.com/" },
      {
        label: "ORCID 0000-0002-2348-7259",
        href: "https://orcid.org/0000-0002-2348-7259",
      },
      { label: "Full research profile", href: "/people/karen-pendergrass" },
    ],
  },
  {
    initials: "KE",
    name: "Kimberly Eyer",
    title: "Co-Founder · Executive Leadership",
    functions: "Executive leadership · Published standards co-author",
    description:
      "Kimberly is a co-founder of the organization and serves in executive leadership. She is a named co-author on the organization’s published certification standards, providing a public scholarly record alongside her institutional role.",
    links: [
      {
        label: "ORCID 0000-0001-6194-6148",
        href: "https://orcid.org/0000-0001-6194-6148",
      },
    ],
  },
  {
    initials: "JP",
    name: "Jonathan D. Pendergrass",
    title: "Chief Licensing Operator",
    functions: "Licensing · Mark administration · Enforcement operations",
    description:
      "Jonathan leads licensing operations, including trademark licensing, certification compliance administration, and infringement enforcement. His function is operational: maintaining the agreements and controls through which certification marks remain governed in use.",
    links: [
      {
        label: "ORCID 0009-0003-5199-0737",
        href: "https://orcid.org/0009-0003-5199-0737",
      },
    ],
  },
  {
    initials: "JE",
    name: "Jennifer Eyer",
    title: "Chief of Auditing",
    functions: "Audit operations · Product review · Compliance records",
    description:
      "Jennifer leads the auditing function responsible for reviewing products against the applicable certification requirements and maintaining the compliance record that supports certification decisions and ongoing status.",
    links: [],
  },
];

export default function AboutPage() {
  return (
    <SiteFrame>
      <main className="interior about-interior">
        <InteriorHero
          label="ABOUT THE INSTITUTE"
          title={
            <>
              Better evidence.
              <br />
              <em>Greater trust.</em>
            </>
          }
          description="The Institute of Contaminant Standards connects independent research, certification programs, and evidence infrastructure through one accountable institutional framework."
        >
          <div className="about-hero-record">
            <span className="about-ics">ICS</span>
            <p>
              Research.
              <br />
              Standards.
              <br />
              Accountability.
            </p>
            <div>
              <span>LEGAL OPERATOR</span>
              <b>Paleo Certified, Inc.</b>
              <small>Institute of Contaminant Standards is a trade name.</small>
            </div>
          </div>
        </InteriorHero>
        <PageNav
          items={[
            { href: "#purpose", label: "Our purpose" },
            { href: "#people", label: "Our people" },
            { href: "#authority", label: "Responsibilities" },
            { href: "#independent-oversight", label: "Independent oversight" },
          ]}
        />
        <section
          className="inside-container inside-section about-purpose"
          id="purpose"
        >
          <div>
            <p className="inside-label">01 / OUR PURPOSE</p>
            <h2>
              Trust is stronger
              <br />
              <em>when you can trace it.</em>
            </h2>
          </div>
          <div>
            <p className="inside-lead">
              ICS governs the system around a contaminant standard.
            </p>
            <p>
              We set the shared rules for data separation, standards methods,
              mark governance, verification, and enforcement. Our network gives
              research, certification, and laboratory records distinct roles
              within that framework.
            </p>
            <p>
              Current standards, effective dates, and applications belong to
              each certification program. Literature findings remain on the
              independent index. ICS makes the responsibilities across those
              boundaries visible.
            </p>
            <a className="inside-sub-link" href="/network">
              Meet the ICS network ↗
            </a>
          </div>
        </section>
        <section className="inside-band" id="people">
          <div className="inside-container inside-section">
            <SectionIntro
              label="02 / OUR PEOPLE"
              title={
                <>
                  Named people.
                  <br />
                  <em>Visible responsibility.</em>
                </>
              }
            >
              <p>
                These profiles describe operating leadership and current
                responsibilities. Independent oversight is disclosed separately
                below.
              </p>
            </SectionIntro>
            <div className="leadership-grid">
              {people.map((p, i) => (
                <article
                  key={p.name}
                  className={`leadership-person ${i === 0 ? "founder-person" : ""}`}
                >
                  <div className="leadership-identity">
                    {p.image ? (
                      <Image
                        src={p.image}
                        width={1023}
                        height={1537}
                        sizes="(max-width: 700px) 100vw, 35vw"
                        alt={p.name}
                      />
                    ) : (
                      <span className="leadership-initials" aria-hidden="true">
                        {p.initials}
                      </span>
                    )}
                    <span className="inside-label">ICS / {p.initials}</span>
                  </div>
                  <div className="leadership-copy">
                    <p className="inside-label">{p.functions}</p>
                    <h3>{p.name}</h3>
                    <p className="leadership-title">{p.title}</p>
                    <p>{p.description}</p>
                    <div className="leadership-links">
                      {p.links.map((l) => (
                        <a key={l.href} href={l.href}>
                          {l.label} <span aria-hidden="true">↗</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="inside-container inside-section" id="authority">
          <SectionIntro
            label="03 / RESPONSIBILITIES"
            title={
              <>
                Know who
                <br />
                <em>can decide what.</em>
              </>
            }
          >
            <p>
              A person may hold more than one disclosed responsibility. This map
              makes that concentration visible and identifies where operational
              separation or review enters.
            </p>
          </SectionIntro>
          <div className="responsibility-list">
            {authorityMap.map((r) => (
              <article key={r.number}>
                <span className="inside-label">{r.number}</span>
                <div>
                  <h3>{r.function}</h3>
                  <p className="responsibility-names">{r.people}</p>
                </div>
                <p>{r.authority}</p>
                <Status tone={r.status === "Named" ? "live" : "quiet"}>
                  {r.status}
                </Status>
              </article>
            ))}
          </div>
        </section>
        <section className="inside-dark" id="independent-oversight">
          <div className="inside-container inside-section">
            <SectionIntro
              label="04 / INDEPENDENT OVERSIGHT"
              title={
                <>
                  Operating leadership.
                  <br />
                  <em>Independent review.</em>
                </>
              }
            >
              <p>
                Operating roles and independent oversight have different
                responsibilities. Their status is stated explicitly.
              </p>
            </SectionIntro>
            <div className="oversight-pair">
              <article>
                <Status>Being constituted</Status>
                <h3>Standards &amp; impartiality committee</h3>
                <p>
                  Committee members will be named after formal appointment,
                  conflict review, and acceptance of documented review and
                  override authority. The committee is not presented as seated
                  before that process is complete.
                </p>
              </article>
              <article>
                <Status>Engagement-based</Status>
                <h3>External contributors &amp; advisers</h3>
                <p>
                  Contributors are identified with the specific work or scope
                  they support. An advisory contribution does not imply
                  institutional decision authority.
                </p>
              </article>
            </div>
          </div>
        </section>
        <InteriorClosing
          label="OUR COMMITMENT TO ACCOUNTABILITY"
          title={
            <>
              Name the role.
              <br />
              <em>Make the rules visible.</em>
            </>
          }
          href="/governance"
          link="Read our governance model"
        />
      </main>
    </SiteFrame>
  );
}

import type { Metadata } from "next";
import { PageHero, SiteFrame, Status } from "../site-chrome";

export const metadata: Metadata = {
  title: "About & People | Institute of Contaminant Standards",
  description:
    "The named leadership, standards, research, licensing, auditing, and oversight structure of the Institute of Contaminant Standards.",
};

const authorityMap = [
  {
    number: "01",
    function: "Executive leadership",
    people: "Karen Pendergrass · Kimberly Eyer",
    authority: "Institutional direction, organizational accountability, and program continuity.",
    status: "Named",
  },
  {
    number: "02",
    function: "Standards & research",
    people: "Karen Pendergrass",
    authority: "Standards architecture, methodology development, evidence systems, and research direction.",
    status: "Named",
  },
  {
    number: "03",
    function: "Certification operations",
    people: "Jonathan D. Pendergrass · Jennifer Eyer",
    authority: "Licensing, mark administration, compliance auditing, and operating records.",
    status: "Named",
  },
  {
    number: "04",
    function: "Independent oversight",
    people: "Standards & impartiality committee",
    authority: "Independent review and override authority, subject to conflict and recusal controls.",
    status: "Being constituted",
  },
  {
    number: "05",
    function: "External contributors & advisers",
    people: "Engagement-based public register",
    authority: "Scope-specific technical contribution without implied institutional decision authority.",
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
      "Karen holds the Institute’s executive, standards, and research responsibilities. She is the architect of the Heavy Metal Index evidence system and the Heavy Metal Tested & Certified methodology. Her methodological and operational roles are disclosed because authority should remain attributable and reviewable.",
    image: "/karen-pendergrass.avif",
    links: [
      { label: "Google Scholar", href: "https://scholar.google.com/citations?user=xnzAh-wAAAAJ&hl=en" },
      { label: "ORCID 0000-0002-2348-7259", href: "https://orcid.org/0000-0002-2348-7259" },
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
      { label: "ORCID 0000-0001-6194-6148", href: "https://orcid.org/0000-0001-6194-6148" },
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
      { label: "ORCID 0009-0003-5199-0737", href: "https://orcid.org/0009-0003-5199-0737" },
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
      <main>
        <PageHero
          index="03 / ABOUT"
          eyebrow="Named authority, explicit boundaries"
          title={<>An institution is<br /><em>who can decide what.</em></>}
          description="ICS publishes its people by authority rather than prestige. The record shows who holds executive, methodological, licensing, and auditing responsibility, and distinguishes those operating roles from independent oversight."
          aside={
            <div className="page-register">
              <span>ORGANIZATION REGISTER</span>
              <dl>
                <div><dt>Legal entity</dt><dd>Paleo Certified, Inc.</dd></div>
                <div><dt>Institutional trade name</dt><dd>ICS</dd></div>
                <div><dt>Named operating leaders</dt><dd>4</dd></div>
                <div><dt>Active certification programs</dt><dd>1</dd></div>
              </dl>
            </div>
          }
        />

        <section className="about-mandate">
          <div>
            <p className="section-kicker section-kicker-light">THE INSTITUTION</p>
            <h2>ICS governs the system around a standard.</h2>
          </div>
          <div>
            <p>
              The Institute of Contaminant Standards is a trade name of Paleo
              Certified, Inc. It governs the architecture shared by contaminant
              evidence indexes and certification programs: separation of data,
              standards-method rules, mark governance, verification, and enforcement.
            </p>
            <p>
              Current thresholds, effective dates, and applications remain on each
              certification program’s own site. Literature findings remain on each
              independent index. ICS names who holds authority across those boundaries.
            </p>
          </div>
        </section>

        <section className="about-authority" id="authority">
          <div className="about-heading">
            <p className="section-kicker">01 / AUTHORITY MAP</p>
            <h2>Responsibility is organized by function.</h2>
            <p>
              A person may hold more than one disclosed responsibility. The map makes
              that concentration visible and identifies where review or operational
              separation must enter.
            </p>
          </div>

          <div className="authority-map">
            {authorityMap.map((row) => (
              <article key={row.number}>
                <span className="authority-number">{row.number}</span>
                <h3>{row.function}</h3>
                <p className="authority-people">{row.people}</p>
                <p className="authority-scope">{row.authority}</p>
                <Status tone={row.status === "Named" ? "live" : "quiet"}>{row.status}</Status>
              </article>
            ))}
          </div>
        </section>

        <section className="people-section" id="people">
          <div className="people-heading">
            <p className="section-kicker section-kicker-light">02 / NAMED PEOPLE</p>
            <h2>Operating authority has a public record.</h2>
            <p>
              Profiles state current institutional responsibility. External identifiers
              are linked where they exist; the absence of an identifier is not replaced
              with a decorative credential.
            </p>
          </div>

          <div className="people-grid">
            {people.map((person) => (
              <article className="person-card" key={person.name}>
                <div className="person-identity">
                  {person.image ? (
                    <img src={person.image} width="1023" height="1537" alt={person.name} />
                  ) : (
                    <span className="person-monogram" aria-hidden="true">{person.initials}</span>
                  )}
                  <span className="person-index">ICS / {person.initials}</span>
                </div>
                <div className="person-copy">
                  <p className="person-function">{person.functions}</p>
                  <h3>{person.name}</h3>
                  <p className="person-title">{person.title}</p>
                  <p className="person-description">{person.description}</p>
                  {person.links.length > 0 ? (
                    <div className="person-links">
                      {person.links.map((link) => (
                        <a href={link.href} target="_blank" rel="noreferrer" key={link.href}>
                          {link.label} ↗
                        </a>
                      ))}
                    </div>
                  ) : (
                    <p className="person-record-note">Institutional role record</p>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="oversight-boundary">
          <div>
            <p className="section-kicker section-kicker-light">03 / OVERSIGHT BOUNDARY</p>
            <h2>Operating leadership is not presented as independent oversight.</h2>
          </div>
          <div className="oversight-boundary-grid">
            <article>
              <Status>Being constituted</Status>
              <h3>Independent oversight</h3>
              <p>
                Committee members will be named after formal appointment, conflict
                review, and acceptance of documented review and override authority.
                Until then, the function is shown without implying that a committee is seated.
              </p>
            </article>
            <article>
              <Status>Engagement-based</Status>
              <h3>External contributors & advisers</h3>
              <p>
                Contributors and advisers are identified with the specific work or
                scope they support. ICS does not maintain an honorary masthead that
                implies decision authority where none exists.
              </p>
            </article>
          </div>
        </section>

        <section className="page-closing about-closing">
          <div>
            <p className="section-kicker section-kicker-light">THE ACCOUNTABILITY RULE</p>
            <h2>Name the role.<br />State the boundary.</h2>
          </div>
          <a className="button button-paper" href="/governance">
            Read governance <span aria-hidden="true">→</span>
          </a>
        </section>
      </main>
    </SiteFrame>
  );
}

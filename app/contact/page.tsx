import type { Metadata } from "next";
import { PageHero, SiteFrame } from "../site-chrome";
import { canonical } from "../site-data";

export const metadata: Metadata = {
  title: "Contact | Institute of Contaminant Standards",
  description:
    "Institutional contact routes for corrections, licensing, media, regulatory, legal, and privacy matters.",
  alternates: { canonical: canonical("/contact") },
};

const routes = [
  {
    code: "01",
    title: "Corrections & editorial",
    description:
      "Report a factual error, broken provenance link, outdated regulatory value, or missing source. Include the page URL, challenged claim, proposed correction, and supporting source.",
    subject: "ICS editorial correction",
  },
  {
    code: "02",
    title: "Commercial licensing",
    description:
      "For structured-data reuse, enterprise integration, derivative works, and commercial AI or analytics uses.",
    subject: "ICS licensing inquiry",
  },
  {
    code: "03",
    title: "Media & speaking",
    description:
      "For interview requests, fact checking, conference invitations, and briefings on contaminant evidence or standards architecture.",
    subject: "ICS media or speaking inquiry",
  },
  {
    code: "04",
    title: "Regulatory & legal",
    description:
      "For regulator correspondence, formal process, standards questions, and legal notices. Legal process should name Paleo Certified, Inc.",
    subject: "ICS regulatory or legal inquiry",
  },
  {
    code: "05",
    title: "Privacy",
    description:
      "For access, correction, deletion, restriction, objection, or other applicable data-protection requests.",
    subject: "ICS privacy request",
  },
];

export default function ContactPage() {
  return (
    <SiteFrame>
      <main>
        <PageHero
          index="05 / CONTACT"
          eyebrow="Institutional correspondence"
          title={<>A public route for<br /><em>every accountable function.</em></>}
          description="The Institute maintains one published correspondence record for its evidence, governance, licensing, media, regulatory, legal, and privacy responsibilities."
          aside={
            <div className="page-register">
              <span>CONTACT RECORD</span>
              <dl>
                <div><dt>Operator</dt><dd>Paleo Certified, Inc.</dd></div>
                <div><dt>Institution</dt><dd>ICS</dd></div>
                <div><dt>Primary address</dt><dd>karen@paleofoundation.com</dd></div>
              </dl>
            </div>
          }
        />

        <section className="contact-register" aria-label="Institutional contact routes">
          {routes.map((route) => (
            <article key={route.code}>
              <span>{route.code}</span>
              <div>
                <h2>{route.title}</h2>
                <p>{route.description}</p>
              </div>
              <a href={"mailto:karen@paleofoundation.com?subject=" + encodeURIComponent(route.subject)}>
                Email the Institute →
              </a>
            </article>
          ))}
        </section>

        <section className="record-note">
          <p className="section-kicker">HEAVY METAL INDEX CORRECTIONS</p>
          <h2>Source-specific corrections remain attached to the public evidence record.</h2>
          <p>
            The Heavy Metal Index maintains its own correction workflow and version
            history. Submit Index corrections on its published contact page or use
            the editorial route above when attachments or institutional review are needed.
          </p>
          <a href="https://heavymetalindex.com/contact/" target="_blank" rel="noopener">
            Open the Index correction route ↗
          </a>
        </section>
      </main>
    </SiteFrame>
  );
}

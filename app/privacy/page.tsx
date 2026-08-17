import type { Metadata } from "next";
import { PageHero, SiteFrame } from "../site-chrome";
import { canonical } from "../site-data";

export const metadata: Metadata = {
  title: "Privacy Notice | Institute of Contaminant Standards",
  description: "How the Institute of Contaminant Standards handles personal data.",
  alternates: { canonical: canonical("/privacy") },
};

export default function PrivacyPage() {
  return (
    <SiteFrame>
      <main>
        <PageHero
          index="07 / PRIVACY"
          eyebrow="Privacy notice"
          title={<>Limited collection.<br /><em>Named accountability.</em></>}
          description="This public institutional site is designed to collect as little personal data as practical while preserving security, correspondence, and verifiable public records."
        />
        <article className="legal-document">
          <p className="document-meta">Version 1.0 · Effective 17 August 2026</p>
          <h2>Controller</h2>
          <p>
            The Institute of Contaminant Standards is a trade name of Paleo Certified,
            Inc. Correspondence about this notice may be sent through the <a href="/contact">published privacy route</a>.
          </p>
          <h2>Data processed</h2>
          <p>
            Hosting and security providers may process IP address, user agent, requested
            URL, referrer, timestamps, errors, and security events. Registry and certificate
            searches may appear in request URLs and technical logs. If you contact the
            Institute, we process the details and message content you provide.
          </p>
          <h2>Purposes and legal bases</h2>
          <p>
            Data is used to deliver and secure the site, diagnose failures, prevent abuse,
            respond to correspondence, preserve governance and correction records, perform
            contractual steps, and meet legal obligations. The applicable basis may include
            legitimate interests, contract, legal obligation, consent, or another lawful basis.
          </p>
          <h2>Cookies and analytics</h2>
          <p>
            The site does not use advertising cookies or behavioural advertising. Hosting
            infrastructure may use essential security and delivery mechanisms. Any future
            analytics implementation will be reflected in this notice.
          </p>
          <h2>Sharing, transfers, and retention</h2>
          <p>
            Data may be handled by hosting, security, email, professional-adviser, or public-
            authority recipients where necessary. Providers may process data outside Cyprus or
            the EEA under applicable safeguards. Records are retained only as needed for their
            operational, contractual, evidentiary, or legal purpose.
          </p>
          <h2>Your rights</h2>
          <p>
            Depending on applicable law, you may request access, correction, deletion,
            restriction, portability, objection, or withdrawal of consent. You may also lodge
            a complaint with the Cyprus Office of the Commissioner for Personal Data Protection.
          </p>
        </article>
      </main>
    </SiteFrame>
  );
}

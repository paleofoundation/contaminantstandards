import type { Metadata } from "next";
import { PageHero, SiteFrame } from "../site-chrome";
import { canonical } from "../site-data";

export const metadata: Metadata = {
  title: "Terms of Use | Institute of Contaminant Standards",
  description: "Terms governing use of contaminantstandards.com.",
  alternates: { canonical: canonical("/terms") },
};

export default function TermsPage() {
  return (
    <SiteFrame>
      <main>
        <PageHero
          index="08 / TERMS"
          eyebrow="Terms of use"
          title={<>Institutional record.<br /><em>Not professional advice.</em></>}
          description="These terms govern use of contaminantstandards.com and distinguish the Institute’s institutional record from its evidence and certification properties."
        />
        <article className="legal-document">
          <p className="document-meta">Version 1.0 · Effective 17 August 2026</p>
          <h2>Operator and scope</h2>
          <p>
            This site is operated by the Institute of Contaminant Standards, a trade
            name of Paleo Certified, Inc. It publishes institutional governance,
            leadership, policy, registry, and publication records.
          </p>
          <h2>Reference use</h2>
          <p>
            The site is not medical, legal, regulatory, product-safety, or investment
            advice and is not a substitute for professional judgment. Readers remain
            responsible for regulatory compliance, risk assessment, and reliance decisions.
          </p>
          <h2>Property boundaries</h2>
          <p>
            Literature and occurrence evidence are authoritative on the
            <a href="https://heavymetalindex.com/" target="_blank" rel="noopener"> Heavy Metal Index</a>.
            Current certification limits, program requirements, applications, and mark
            rules are authoritative on
            <a href="https://heavymetalcertified.com/" target="_blank" rel="noopener"> Heavy Metal Tested &amp; Certified</a>.
          </p>
          <h2>Intellectual property and database rights</h2>
          <p>
            Trademarks, institutional materials, structured registers, and curated
            databases may be protected by copyright, trademark, database-right, and
            related law. Ordinary reading, linking, and citation are welcomed.
            Substantial extraction, republication, or commercial reuse requires the
            permission described on the <a href="/licensing">licensing page</a>.
          </p>
          <h2>No warranty and limitation</h2>
          <p>
            The site is provided as-is and as-available. To the maximum extent permitted
            by law, Paleo Certified, Inc. disclaims warranties and liability arising from
            use, inability to access, or reliance on this site or linked third-party sources.
          </p>
          <h2>Corrections and changes</h2>
          <p>
            Factual challenges are welcome through the <a href="/contact">published contact route</a>.
            Policies and terms may change as the institution and applicable requirements
            develop; material revisions receive a new version and effective date.
          </p>
        </article>
      </main>
    </SiteFrame>
  );
}

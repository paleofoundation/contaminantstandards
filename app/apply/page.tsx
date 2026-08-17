import type { Metadata } from "next"
import Link from "next/link"
import { PORTAL, httpsUrl } from "../../lib/site-registry"
import { PageHero, SiteFrame } from "../site-chrome"

// Apply hub — a single SSO entry point to the authenticated portal. The parent's
// CTA is always a REFERRAL to the portal, never a conversion page on the parent
// (keeps the parent off the child's transactional term). One account, one brand
// profile, a multi-program cart across verticals, one billing cycle.

export const metadata: Metadata = {
  title: "Apply for certification",
  description:
    "Apply for contaminant certification through one account and one application, across every ICS program.",
  alternates: { canonical: "/apply" },
}

export default function ApplyPage() {
  const portalUrl = httpsUrl(PORTAL.domain)
  return (
    <SiteFrame>
      <main>
        <PageHero
          index="09 / APPLY"
          eyebrow="Program-routed application"
          title={<>One account.<br /><em>One governed pathway.</em></>}
          description="Applications, private evidence, and billing remain outside the public institutional record."
        />
        <section className="utility-section">
          <p className="utility-lead">
            Add products once, assign them to the programs in scope, satisfy the
            evidence checklist, and review one quote and invoice.
          </p>
          <a href={portalUrl} className="button button-primary">
            Start an application <span aria-hidden="true">→</span>
          </a>
          <div className="utility-process">
            <h2>How it works</h2>
            <ol>
              <li>Sign in through the authenticated application portal.</li>
              <li>Create or select the brand profile used across ICS programs.</li>
              <li>Add products and assign the relevant program lines.</li>
              <li>Upload accredited laboratory evidence against the program checklist.</li>
              <li>Review the combined quote, payment, and mark issuance record.</li>
            </ol>
          </div>
          <p className="utility-note">
            Application documents are not public. To confirm an existing relationship,
            use <Link href="/registry">the registry</Link> or <Link href="/verify">certificate verification</Link>.
          </p>
        </section>
      </main>
    </SiteFrame>
  )
}

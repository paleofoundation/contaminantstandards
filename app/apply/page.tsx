import type { Metadata } from "next"
import { PORTAL, httpsUrl } from "../../lib/site-registry"

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
    <>
      <h1>Apply for certification</h1>
      <p className="lede">
        One account, one brand profile, one application — across every ICS program. Add your
        products once, assign them to the programs you want, satisfy a combined evidence checklist
        (one lab report can cover several programs), and review a single quote and invoice.
      </p>

      <p className="hero-actions">
        <a href={portalUrl} className="btn">
          Start an application →
        </a>
      </p>

      <h2>How it works</h2>
      <ol>
        <li>Sign in once on the application portal.</li>
        <li>Create or select your brand profile (shared across every program).</li>
        <li>Add your products and assign them to program lines — heavy metals today, more as programs come online.</li>
        <li>Upload accredited lab evidence; it auto-matches the checklist where coverage, limit of quantitation, and scope allow.</li>
        <li>Review one combined quote with any bundle discounts, pay once, and download your marks on issuance.</li>
      </ol>

      <p className="muted">
        The application, your documents, and your billing live in the authenticated portal. They
        are never public. To confirm an existing certification, use{" "}
        <a href="/registry">the registry</a> or <a href="/verify">certificate verification</a>.
      </p>
    </>
  )
}

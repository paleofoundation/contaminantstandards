import type { Metadata } from "next"
import { getPublicBrand } from "../../lib/brands"
import { PageHero, SiteFrame } from "../site-chrome"

// Certificate verification — single owner for all certs from all verticals. In
// production this lives on verify.contaminantstandards.com (noindex, single-record)
// and reads LIVE cert state at runtime so a suspension reflects instantly. It is
// NEVER a browsable directory and NEVER renders a threshold value — it proves
// WHICH standard a product was certified to via an opaque id, never WHAT the
// number was.

export const metadata: Metadata = {
  title: "Verify a certificate",
  description: "Verify a single HMTc certificate by its number.",
  robots: { index: false, follow: false }, // noindex — single-record verification surface
  alternates: { canonical: "/verify" },
}

// Scaffold resolver: map a certificate id to its brand (opt-in only) and live mark.
function resolveCertificate(certId: string) {
  const id = certId.trim().toUpperCase()
  // In production: runtime read of the Certificate public projection.
  const slugs = ["example-foods", "northwater-seafood"]
  for (const slug of slugs) {
    const b = getPublicBrand(slug)
    if (b && b.certificateIds.map((c) => c.toUpperCase()).includes(id)) {
      return { brand: b, certId: id }
    }
  }
  return null
}

export default async function VerifyPage({
  searchParams,
}: {
  searchParams: Promise<{ cert?: string }>
}) {
  const { cert } = await searchParams
  const record = cert ? resolveCertificate(cert) : null

  return (
    <SiteFrame>
      <main>
        <PageHero
          index="04 / VERIFY"
          eyebrow="Single-record verification"
          title={<>A certificate is valid<br /><em>only in its current state.</em></>}
          description="Enter one certificate number to confirm its issuing program and present mark status. This surface does not provide a directory."
        />
        <section className="utility-section">
          <form method="get" className="search-form">
            <label htmlFor="cert">Certificate number</label>
            <div>
              <input id="cert" name="cert" type="text" defaultValue={cert ?? ""} placeholder="Enter the full certificate number" autoComplete="off" />
              <button type="submit">Verify</button>
            </div>
          </form>
          {cert && (
            <div className="verify-result" aria-live="polite">
              {record ? (
                <div className="result-card">
                  <p className="verify-ok">Valid certificate</p>
                  <dl>
                    <dt>Brand</dt>
                    <dd><a href={`/registry/${record.brand.slug}`}>{record.brand.displayName}</a></dd>
                    <dt>Programs</dt>
                    <dd>{record.brand.programs.join(", ")}</dd>
                    <dt>Mark status</dt>
                    <dd className={`mark mark-${record.brand.markStatus}`}>{record.brand.markStatus}</dd>
                    <dt>Certificate</dt>
                    <dd>{record.certId}</dd>
                  </dl>
                </div>
              ) : (
                <p className="verify-fail">No certificate matches that number.</p>
              )}
            </div>
          )}
        </section>
      </main>
    </SiteFrame>
  )
}

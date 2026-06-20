import type { Metadata } from "next"
import { getPublicBrand } from "../../lib/brands"

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
    <>
      <h1>Verify a certificate</h1>
      <p className="lede">
        Enter a certificate number to confirm it is genuine, which program issued it, and whether
        the mark is currently active. Verification confirms which standard a product was certified
        to; it does not publish the threshold value.
      </p>

      <form method="get" className="search-form">
        <label htmlFor="cert">Certificate number</label>
        <input id="cert" name="cert" type="text" defaultValue={cert ?? ""} placeholder="e.g. HMTC-EX-0001" autoComplete="off" />
        <button type="submit">Verify</button>
      </form>

      {cert && (
        <div className="verify-result" aria-live="polite">
          {record ? (
            <div className="result-card">
              <p className="verify-ok">✓ Valid certificate</p>
              <dl>
                <dt>Brand</dt>
                <dd>
                  <a href={`/registry/${record.brand.slug}`}>{record.brand.displayName}</a>
                </dd>
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
    </>
  )
}

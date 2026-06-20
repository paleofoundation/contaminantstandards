import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getPublicBrand } from "../../../lib/brands"
import { httpsUrl, VERIFY } from "../../../lib/site-registry"

// Canonical Brand page (Class A). Identity ONLY: name, site, programs as chips,
// products by identity, live mark status, verify links. NEVER a contamination
// value, a COA, a pass-margin, a per-analyte number, or a threshold. Renders only
// for an opt-in (indexable) brand; a non-opted brand 404s (it is not public).

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const brand = getPublicBrand(slug)
  if (!brand) return { title: "Brand not found" }
  return {
    title: `${brand.displayName} — certification`,
    description: `${brand.displayName} holds ${brand.programs.join(", ")}. Certification status and products in scope.`,
    alternates: { canonical: `/registry/${brand.slug}` },
  }
}

export default async function BrandPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const brand = getPublicBrand(slug)
  if (!brand) notFound()

  return (
    <article className="brand-page">
      <h1>{brand.displayName}</h1>
      {brand.website && (
        <p>
          <a href={brand.website} rel="nofollow">
            {brand.website.replace(/^https?:\/\//, "")}
          </a>
        </p>
      )}

      <div className="program-chips">
        {brand.programs.map((p) => (
          <span key={p} className="chip chip-program">
            {p}
          </span>
        ))}
        <span className={`chip mark mark-${brand.markStatus}`}>Mark: {brand.markStatus}</span>
      </div>

      <h2>Products in scope</h2>
      <ul className="product-identity-list">
        {brand.products.map((p) => (
          <li key={p.name}>
            <strong>{p.name}</strong> — {p.category}
            {p.gtin && <span className="gtin"> · GTIN {p.gtin}</span>}
          </li>
        ))}
      </ul>
      <p className="muted">
        Products are listed by identity only. The certification limits and the evidence behind
        them live on the program site; this registry entry carries no test values.
      </p>

      <h2>Verify a certificate</h2>
      <ul>
        {brand.certificateIds.map((id) => (
          <li key={id}>
            <a href={`${httpsUrl(VERIFY.domain)}/?cert=${encodeURIComponent(id)}`}>
              Verify {id} →
            </a>
          </li>
        ))}
      </ul>
    </article>
  )
}

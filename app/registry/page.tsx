import type { Metadata } from "next"
import { resolveBrand } from "../../lib/brands"

export const metadata: Metadata = {
  title: "Brand registry",
  description:
    "Confirm a brand's certification by name. The registry is search-only by design — there is no browsable list of certified brands.",
  alternates: { canonical: "/registry" },
}

// Server-rendered search. There is deliberately NO directory listing: you confirm
// a brand you already know by name; you cannot browse or enumerate the client book
// (plan S7, EU database right). The result is always a single brand or guidance.
export default async function RegistryPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const { q } = await searchParams
  const result = q ? resolveBrand(q) : null

  return (
    <>
      <h1>Brand registry</h1>
      <p className="lede">
        Confirm a brand&apos;s certification by name. This registry is search-only — there is no
        browsable directory of certified brands, to protect the certified brands&apos; commercial
        information.
      </p>

      <form method="get" className="search-form">
        <label htmlFor="q">Brand name</label>
        <input id="q" name="q" type="search" defaultValue={q ?? ""} placeholder="e.g. Example Foods" autoComplete="off" />
        <button type="submit">Confirm certification</button>
      </form>

      {result && (
        <div className="search-result" aria-live="polite">
          {result.kind === "match" ? (
            <div className="result-card">
              <h2>
                <a href={`/registry/${result.brand.slug}`}>{result.brand.displayName}</a>
              </h2>
              <p>
                {result.brand.programs.join(", ")} —{" "}
                <span className={`mark mark-${result.brand.markStatus}`}>{result.brand.markStatus}</span>
              </p>
              <p>
                <a href={`/registry/${result.brand.slug}`}>View registry entry →</a>
              </p>
            </div>
          ) : result.kind === "none" ? (
            <p>No certified brand matches that name.</p>
          ) : (
            <p>
              {result.kind === "ambiguous"
                ? "More than one brand matches. Enter the full brand name to confirm."
                : "Enter the brand's specific name to confirm its certification."}
            </p>
          )}
        </div>
      )}

      <p className="muted">
        To verify a specific certificate, use{" "}
        <a href="/verify">certificate verification</a>.
      </p>
    </>
  )
}

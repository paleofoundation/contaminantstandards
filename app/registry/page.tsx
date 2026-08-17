import type { Metadata } from "next"
import { resolveBrand } from "../../lib/brands"
import { PageHero, SiteFrame } from "../site-chrome"

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
    <SiteFrame>
      <main>
        <PageHero
          index="03 / REGISTRY"
          eyebrow="Public identity record"
          title={<>Confirm a brand.<br /><em>Do not enumerate the client book.</em></>}
          description="The registry resolves a brand a reader already knows. It intentionally provides no browsable directory and publishes identity and current mark status only."
        />
        <section className="utility-section">
          <form method="get" className="search-form">
            <label htmlFor="q">Brand name</label>
            <div>
              <input id="q" name="q" type="search" defaultValue={q ?? ""} placeholder="Enter the full brand name" autoComplete="off" />
              <button type="submit">Confirm certification</button>
            </div>
          </form>
          {result && (
            <div className="search-result" aria-live="polite">
              {result.kind === "match" ? (
                <div className="result-card">
                  <p className="section-kicker">MATCHED RECORD</p>
                  <h2><a href={`/registry/${result.brand.slug}`}>{result.brand.displayName}</a></h2>
                  <p>
                    {result.brand.programs.join(", ")} —{" "}
                    <span className={`mark mark-${result.brand.markStatus}`}>{result.brand.markStatus}</span>
                  </p>
                  <a className="text-link" href={`/registry/${result.brand.slug}`}>View registry entry →</a>
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
          <p className="utility-note">
            To verify a specific certificate, use <a href="/verify">certificate verification</a>.
          </p>
        </section>
      </main>
    </SiteFrame>
  )
}

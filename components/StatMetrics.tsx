import { authorityStats } from "../lib/feeds"

// Stewardship metric strip. FIREWALL-honest framing: these are counts of the
// LITERATURE the standards rest on (completeness within scope, Cochrane's flex) —
// never "our research output" / authorship, never a contamination count. Each tile
// links one-way to the index (evidence intent stays the index's).

const fmt = (n: number) => n.toLocaleString("en-US")
const HMI = "https://heavymetalindex.com"

export default function StatMetrics() {
  const s = authorityStats()
  const tiles: { value: number; label: string; href: string }[] = [
    { value: s.peer_reviewed, label: "Peer-reviewed studies", href: `${HMI}/sources/` },
    { value: s.government, label: "Government reports & datasets", href: `${HMI}/sources/` },
    { value: s.databases, label: "Programmatic databases", href: `${HMI}/sources/` },
    { value: s.a_tier, label: "A-tier curated sources", href: `${HMI}/sources/` },
    { value: s.dois, label: "Sources with a DOI", href: `${HMI}/sources/` },
    { value: s.jurisdictions, label: "Jurisdictions", href: `${HMI}/regulations/` },
    { value: s.metals, label: "Contaminant profiles", href: `${HMI}/metals/` },
    { value: s.products, label: "Product categories", href: `${HMI}/products/` },
    { value: s.ingredients, label: "Ingredient profiles", href: `${HMI}/ingredients/` },
    { value: s.regulations, label: "Regulations tracked", href: `${HMI}/regulations/` },
  ]
  return (
    <div className="stat-metrics">
      {tiles.map((t) => (
        <a key={t.label} className="stat-tile" href={t.href}>
          <span className="stat-value">{fmt(t.value)}</span>
          <span className="stat-label">{t.label}</span>
        </a>
      ))}
    </div>
  )
}

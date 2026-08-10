import { geoNaturalEarth1, geoPath } from "d3-geo"
import { feature } from "topojson-client"
import countries from "i18n-iso-countries"
import { studyDensity, worldTopo } from "../lib/feeds"

// Evidence Coverage Atlas — a country choropleth shaded by the NUMBER OF STUDIES in
// the ICS corpus per study jurisdiction. FIREWALL: this is evidence/study density,
// NOT contamination levels. Under-studied (light) regions are framed as the gap ICS
// is working to fill — never as "clean/safe." Neutral SEQUENTIAL blue ramp only (a
// diverging good→bad ramp would imply a value judgment the firewall forbids).
//
// Server-rendered static SVG (no client JS, no map library) — d3-geo projects each
// country to a path and we fill by log-scaled study count.

const W = 900
const H = 460

// linear interpolation between two hex colors
function lerpHex(a: string, b: string, t: number): string {
  const pa = [1, 3, 5].map((i) => parseInt(a.slice(i, i + 2), 16))
  const pb = [1, 3, 5].map((i) => parseInt(b.slice(i, i + 2), 16))
  const p = pa.map((v, i) => Math.round(v + (pb[i] - v) * t))
  return "#" + p.map((v) => v.toString(16).padStart(2, "0")).join("")
}

export default function EvidenceCoverageAtlas() {
  const density = studyDensity()
  const topo = worldTopo()

  // numeric ISO id -> study count
  const byNumeric = new Map<string, number>()
  for (const { code, count } of density.jurisdictions) {
    const num = countries.alpha2ToNumeric(code) // EU and other non-country codes return undefined
    if (num) byNumeric.set(String(parseInt(num, 10)), count)
  }
  const max = Math.max(1, ...density.jurisdictions.map((j) => j.count))

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fc = feature(topo, topo.objects.countries) as any
  const projection = geoNaturalEarth1().fitSize([W, H - 20], { type: "Sphere" })
  const pathGen = geoPath(projection)

  const LIGHT = "#eef2f7" // studied a little
  const DEEP = "#1d384f" // most-studied
  const GAP = "#f1efe9" // no studies in corpus (under-represented)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const paths = fc.features.map((f: any) => {
    const d = pathGen(f)
    if (!d) return null
    const count = byNumeric.get(String(f.id)) ?? 0
    const t = count > 0 ? Math.log(count + 1) / Math.log(max + 1) : 0
    const fill = count > 0 ? lerpHex(LIGHT, DEEP, t) : GAP
    return { id: String(f.id), d, fill }
  })

  const topList = density.jurisdictions.slice(0, 6)

  return (
    <figure className="atlas">
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Evidence Coverage Atlas — studies in the corpus by jurisdiction" className="atlas-svg">
        <rect x={0} y={0} width={W} height={H} fill="transparent" />
        {paths.filter(Boolean).map((p: { id: string; d: string; fill: string }, i: number) => (
          <path key={i} d={p.d} fill={p.fill} stroke="#ffffff" strokeWidth={0.4} />
        ))}
      </svg>
      <div className="atlas-legend">
        <span className="atlas-legend-label">Studies in the corpus</span>
        <span className="atlas-swatch" style={{ background: GAP }} title="under-represented" /> none yet
        <span className="atlas-ramp" />
        <span>most</span>
      </div>
      <figcaption className="atlas-caption">
        Geographic concentration of the scientific literature ICS indexes — <strong>study density,
        not contamination levels</strong>. Lighter regions are <em>under-represented in the global
        literature</em> (a gap ICS is working to fill), not regions shown to be cleaner. Most-studied:{" "}
        {topList.map((j, i) => (
          <span key={j.code}>
            {i > 0 ? " · " : ""}
            {j.code} ({j.count})
          </span>
        ))}
        . The evidence behind every figure lives on the{" "}
        <a
          href="https://heavymetalindex.com"
          target="_blank"
          rel="noopener"
          title="Heavy Metal Index — the independent literature evidence base"
        >
          Heavy Metal Index
        </a>
        .
      </figcaption>
    </figure>
  )
}

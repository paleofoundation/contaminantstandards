import { studiesByYear } from "../lib/feeds"

// Corpus growth — per-year bars of indexed studies by PUBLICATION YEAR. FIREWALL:
// this is the literature's publication cadence / corpus coverage over time, NOT
// "our output per year" and NOT certification activity. Server-rendered SVG.

const W = 900
const H = 200
const PAD_B = 24
const PAD_L = 4

export default function CorpusGrowthChart({ since = 2000 }: { since?: number }) {
  const all = studiesByYear().years.filter((y) => y.year >= since && y.year <= 2026)
  if (all.length === 0) return null
  const max = Math.max(...all.map((y) => y.count))
  const bw = (W - PAD_L * 2) / all.length
  const chartH = H - PAD_B
  return (
    <figure className="growth">
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Indexed studies by publication year" className="growth-svg">
        {all.map((y, i) => {
          const h = (y.count / max) * (chartH - 6)
          const x = PAD_L + i * bw
          const labelEvery = all.length > 16 ? 4 : 2
          return (
            <g key={y.year}>
              <rect x={x + 1} y={chartH - h} width={bw - 2} height={h} fill="#1d384f" rx={1.5} opacity={0.88} />
              {i % labelEvery === 0 && (
                <text x={x + bw / 2} y={H - 8} textAnchor="middle" className="growth-x">
                  {y.year}
                </text>
              )}
            </g>
          )
        })}
      </svg>
      <figcaption className="growth-caption">
        Indexed studies by publication year (corpus coverage over time). Source records on the{" "}
        <a href="https://heavymetalindex.com/sources/">Heavy Metal Index</a>.
      </figcaption>
    </figure>
  )
}

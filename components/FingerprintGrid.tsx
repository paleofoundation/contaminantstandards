import { fingerprint } from "../lib/feeds"

// Coverage fingerprint — tiles for the most-studied contaminants, each with a ring
// whose fill = relative STUDY VOLUME (depth of evidence). FIREWALL: saturation
// encodes study count, NOT risk level or threshold. Legend says so explicitly.

const HMI = "https://heavymetalindex.com"
const RING = 34
const R = 14
const C = 2 * Math.PI * R

export default function FingerprintGrid({ limit = 12 }: { limit?: number }) {
  const metals = fingerprint().metals.slice(0, limit)
  const max = Math.max(1, ...metals.map((m) => m.count))
  return (
    <div className="fingerprint">
      {metals.map((m) => {
        const t = Math.log(m.count + 1) / Math.log(max + 1)
        const dash = C * t
        return (
          <a
            key={m.slug}
            className="fp-tile"
            href={`${HMI}/metals/${m.slug}`}
            target="_blank"
            rel="noopener"
            title={`${m.slug} — metal review on the Heavy Metal Index`}
          >
            <svg viewBox={`0 0 ${RING} ${RING}`} className="fp-ring" aria-hidden="true">
              <circle cx={RING / 2} cy={RING / 2} r={R} fill="none" stroke="#e3e1dc" strokeWidth={3} />
              <circle
                cx={RING / 2}
                cy={RING / 2}
                r={R}
                fill="none"
                stroke="#1d384f"
                strokeWidth={3}
                strokeDasharray={`${dash} ${C}`}
                strokeLinecap="round"
                transform={`rotate(-90 ${RING / 2} ${RING / 2})`}
              />
            </svg>
            <span className="fp-name">{m.metal}</span>
            <span className="fp-count">{m.count.toLocaleString("en-US")} studies</span>
          </a>
        )
      })}
    </div>
  )
}

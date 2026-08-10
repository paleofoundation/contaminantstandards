import type { Metadata } from "next"
import { VERTICALS, PARENT, PORTAL, VERIFY, httpsUrl, siblingLinkAttrs } from "../../lib/site-registry"

export const metadata: Metadata = {
  title: "The network",
  description:
    "The properties of the Institute of Contaminant Standards network: per-contaminant literature indexes, certification programs, the registry, and verification — and how the firewall keeps them independent.",
  alternates: { canonical: "/network" },
}

const ROLE_LABEL: Record<string, string> = {
  index: "Literature index (independent evidence)",
  cert: "Certification standard & program",
  parent: "Institutional authority",
  portal: "Application portal (authenticated)",
  verify: "Certificate verification",
}

export default function NetworkPage() {
  return (
    <>
      <h1>The network</h1>
      <p className="lede">
        ICS operates one institution behind the scenes and several independent public faces in
        front. Each contaminant has its own literature index and its own certification standard,
        kept apart by a hard data-class firewall: the index reports what the literature says, the
        certifier sets the standard, and the connection is one-way citation — never the reverse.
      </p>

      {VERTICALS.map((v) => (
        <section key={v.key} className="network-vertical">
          <h2>
            {v.displayName}
            {v.status !== "live" && <span className="chip">In development</span>}
          </h2>
          <p>{v.blurb}</p>
          <ul className="property-list">
            {v.sites.map((s) => (
              <li key={s.role}>
                <span className="role">{ROLE_LABEL[s.role]}</span>
                {s.publicLink ? (
                  <a
                    href={httpsUrl(s.domain)}
                    {...siblingLinkAttrs(`${v.displayName} — ${ROLE_LABEL[s.role]}`)}
                  >
                    {s.domain}
                  </a>
                ) : (
                  <span className="muted">{s.domain || "domain reserved"}</span>
                )}
              </li>
            ))}
          </ul>
        </section>
      ))}

      <section className="network-vertical">
        <h2>Shared institution</h2>
        <ul className="property-list">
          <li>
            <span className="role">{ROLE_LABEL.parent}</span>
            <a href={httpsUrl(PARENT.domain)}>{PARENT.domain}</a>
          </li>
          <li>
            <span className="role">{ROLE_LABEL.verify}</span>
            <span className="muted">{VERIFY.domain} (single-record, no directory)</span>
          </li>
          <li>
            <span className="role">{ROLE_LABEL.portal}</span>
            <span className="muted">{PORTAL.domain} (authenticated)</span>
          </li>
        </ul>
      </section>
    </>
  )
}

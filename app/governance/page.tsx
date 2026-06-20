import type { Metadata } from "next"

// Governance — the parent's institutional/governance intent (the territory it
// owns, uncontested by any child). NON-NUMERIC: it describes that standards exist,
// how they are set and kept independent, and how the mark and enforcement work —
// it never publishes a threshold value or percentile (those live on the program).

export const metadata: Metadata = {
  title: "Governance",
  description:
    "How the Institute for Contaminant Standards governs its certification programs: standards-setting independence, the firewall, mark use, and enforcement.",
  alternates: { canonical: "/governance" },
}

export default function GovernancePage() {
  return (
    <>
      <h1>Governance</h1>
      <p className="lede">
        ICS governs how a contaminant certification standard is set, kept independent, and
        enforced. This page describes the institution&apos;s rules. The standards themselves — the
        limits, the methodology, the per-subcategory values — are published by each program on its
        own site.
      </p>

      <h2>Independence and the firewall</h2>
      <p>
        Every program has two separate faces: an independent index that reports the complete
        scientific literature, and a certification standard applied to that evidence. The two are
        kept apart by a hard data-class rule. The index never publishes a certification threshold
        and never endorses the certifier; the certifier cites the index one way. Common ownership
        does not compromise independence — a firewall breach would, and the firewall is enforced
        in code, not in an org chart.
      </p>

      <h2>How standards are set</h2>
      <p>
        A standard is set per analyte, per product subcategory, in the product&apos;s native basis,
        against the occurrence distribution in the literature, and capped by the lowest applicable
        regulatory ceiling. The program states honestly where its limit sits relative to that
        evidence. Standards are living, versioned, dated documents; each edition supersedes the
        last at a stable address so prior citations resolve. The methodology is published in full
        on each program site.
      </p>

      <h2>Mark use</h2>
      <p>
        The mark certifies that a product was tested to a stated standard, in a stated basis, on a
        stated analyte panel, with the covered and uncovered analytes disclosed alongside it. It is
        not a claim that a product is &quot;safe.&quot; Mark-use rules, including which analytes a
        certificate covers, travel with every certificate and are verifiable by number.
      </p>

      <h2>Enforcement</h2>
      <p>
        Certifications are live relationships. A mark can be suspended or withdrawn; verification
        reflects the current state at the moment it is checked. Public enforcement notices are
        published as regulatory events, named only where already a matter of public record.
      </p>

      <p className="muted">
        Current program: Heavy Metal Tested &amp; Certified (standard version and effective dates
        are published on <a href="https://heavymetalcertified.com/standards/">the program&apos;s standards index</a>).
      </p>
    </>
  )
}

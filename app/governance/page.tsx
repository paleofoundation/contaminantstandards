import type { Metadata } from "next"

// Governance — the parent's institutional/governance intent (the territory it
// owns, uncontested by any child). NON-NUMERIC: it describes that standards exist,
// how they are set and kept independent, and how the mark and enforcement work —
// it never publishes a threshold value or percentile (those live on the program).

export const metadata: Metadata = {
  title: "Governance",
  description:
    "How the Institute of Contaminant Standards governs its certification programs: standards-setting independence, the firewall, mark use, and enforcement.",
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

      <h2>Separation of powers</h2>
      <p>
        Each contaminant program runs on three separate faces, and the separation is the point.
        What each may publish is fixed:
      </p>
      <ul className="sop-list">
        <li>
          <strong>The index</strong> (an independent literature reference) reports what the complete
          peer-reviewed and regulatory literature says — occurrence data, regulatory limits as
          reported, evidence. It never publishes a certification threshold, never sets a standard,
          and never endorses the certifier.
        </li>
        <li>
          <strong>The certification program</strong> applies that evidence to set a standard and
          certify products. It publishes its thresholds and methodology openly, and cites the index
          one way for the evidence — the index never cites back.
        </li>
        <li>
          <strong>The Institute (ICS)</strong> governs how a standard is set and kept independent,
          runs the registry and verification, and publishes no threshold values and no brand-level
          data itself.
        </li>
      </ul>
      <p>
        This is enforced in code, not in an org chart: a build-blocking check rejects any threshold,
        percentile, or derived value on an index surface, and a separate published data plane means
        the public sites physically cannot read private or derivation data. Common ownership does
        not compromise independence — a firewall breach would, so the firewall is the mechanism, and
        it is mechanical.
      </p>

      <h2>Independent oversight &amp; conflicts of interest</h2>
      <p>
        ICS is operated under Paleo Certified Inc., which also operates the literature index — and
        ICS states that plainly rather than obscuring it, because hiding common ownership is less
        defensible than governing it. Independence is preserved structurally, on the model used by
        accredited certification bodies (ISO/IEC 17065):
      </p>
      <ul className="sop-list">
        <li>
          An <strong>independent standards &amp; impartiality committee</strong> — members with no
          certified-brand or certification-revenue interest — holds documented authority to review
          and overrule standards and certification decisions. No single interest predominates.
        </li>
        <li>
          A <strong>published conflict-of-interest and separation policy</strong>: the people who
          curate the literature do not make final certification decisions, and the institute&apos;s
          leadership sits outside the certification-decision chain.
        </li>
        <li>
          The institute is <strong>pursuing ISO/IEC 17065 accreditation</strong> as third-party
          validation of these controls.
        </li>
      </ul>
      <p className="muted">
        Committee composition, the conflict-of-interest register, and the full policy are published
        as the committee is seated. Leadership is named, not hidden — authority here comes from who
        can overrule whom, not from a masthead.
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
        are published on{" "}
        <a
          href="https://heavymetalcertified.com/standards/"
          target="_blank"
          rel="noopener"
          title="Heavy Metal Tested & Certified — published standards index"
        >
          the program&apos;s standards index
        </a>
        ).
      </p>
    </>
  )
}

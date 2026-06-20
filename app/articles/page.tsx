import type { Metadata } from "next"

// Institutional articles — the parent register. These rank for governance /
// institutional / cross-program intent ("who certifies contaminants," "how are
// standards set," "standards-body independence"), NEVER for the child's
// transactional terms. Each article supports a child by linking to it with a
// transactional anchor and cites the index by link — it never reproduces the
// program's money-page copy or the index's evidence (plan 6.C).

export const metadata: Metadata = {
  title: "Articles",
  description:
    "Institutional analysis from the Institute for Contaminant Standards: how contaminant standards are set, kept independent, and governed across programs.",
  alternates: { canonical: "/articles" },
}

const ARTICLES = [
  {
    slug: "why-an-independent-index",
    title: "Why a certification standard needs an independent index",
    blurb:
      "The case for keeping the evidence and the standard on separate, independent faces — and why common ownership does not compromise it.",
  },
  {
    slug: "standards-as-living-documents",
    title: "Standards as living, versioned documents",
    blurb:
      "How a contaminant standard ratchets over editions, why each version stays at a stable address, and what that means for a certificate cited years later.",
  },
]

export default function ArticlesPage() {
  return (
    <>
      <h1>Articles</h1>
      <p className="lede">
        Analysis from the institution: how contaminant standards are set, kept independent, and
        governed across programs. For the standards themselves and how to get certified, the
        authoritative source is the program — {""}
        <a href="https://heavymetalcertified.com">Heavy Metal Certified</a>.
      </p>
      <ul className="article-list">
        {ARTICLES.map((a) => (
          <li key={a.slug}>
            <h2>{a.title}</h2>
            <p>{a.blurb}</p>
            <p className="muted">(Article in preparation.)</p>
          </li>
        ))}
      </ul>
    </>
  )
}

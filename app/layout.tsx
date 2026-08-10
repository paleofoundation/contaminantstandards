import type { Metadata } from "next"
import { PARENT_BASE } from "../lib/site-registry"
import { parentOrganizationJsonLd } from "../lib/org-schema"
import "./globals.css"

// metadataBase makes every page's canonical self-canonical to the parent domain.
// No page on this site ever sets rel=canonical to another domain (the single rule
// whose violation folded the old paleofoundation.com ↔ heavymetaltested.com pair).
export const metadata: Metadata = {
  metadataBase: new URL(PARENT_BASE),
  title: {
    default: "The Institute of Contaminant Standards",
    template: "%s · The Institute of Contaminant Standards",
  },
  description:
    "The independent standards body behind the Heavy Metal Tested & Certified program and the contaminant certification network. Governance, master registry, certificate verification, and the application hub.",
  alternates: { canonical: "/" },
  openGraph: {
    siteName: "The Institute of Contaminant Standards",
    type: "website",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const orgJsonLd = parentOrganizationJsonLd()
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          // The org graph is the cross-site #id cluster (plan 6.B).
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </head>
      <body>
        <header className="site-header">
          <a href="/" className="brand">
            The Institute of <strong>Contaminant Standards</strong>
          </a>
          <nav className="site-nav">
            <a href="/network">Network</a>
            <a href="/registry">Registry</a>
            <a href="/governance">Governance</a>
            <a href="/articles">Articles</a>
            <a href="/apply">Apply</a>
          </nav>
        </header>
        <main className="site-main">{children}</main>
        <footer className="site-footer">
          <p>
            The Institute of Contaminant Standards (ICS) is the independent body that
            governs the Heavy Metal Tested &amp; Certified program. For the certification
            itself, the standards, and how to get certified, the authoritative source is the
            program:{" "}
            <a
              href="https://heavymetalcertified.com"
              target="_blank"
              rel="noopener"
              title="Heavy Metal Tested & Certified — the certification program ICS governs"
            >
              heavymetalcertified.com
            </a>
            .
          </p>
          <p className="legal">
            ICS operates under Paleo Certified Inc. The literature evidence is reported
            independently at{" "}
            <a
              href="https://heavymetalindex.com"
              target="_blank"
              rel="noopener"
              title="Heavy Metal Index — the independent literature evidence base ICS cites"
            >
              the Heavy Metal Index
            </a>
            , which ICS cites one way and never the reverse.
          </p>
        </footer>
      </body>
    </html>
  )
}

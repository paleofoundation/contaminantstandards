import type { ReactNode } from "react";
import Link from "next/link";

const navigation = [
  { href: "/evidence", label: "Evidence" },
  { href: "/articles", label: "Publications" },
  { href: "/network", label: "Network" },
  { href: "/governance", label: "Governance" },
  { href: "/about", label: "About" },
  { href: "/registry", label: "Registry" },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="brand-lockup" href="/" aria-label="Institute of Contaminant Standards home">
        <span className="brand-mark" aria-hidden="true">
          <span>I</span>
          <span>C</span>
          <span>S</span>
        </span>
        <span className="brand-name">
          Institute of
          <br />
          Contaminant Standards
        </span>
      </Link>

      <nav className="main-nav" aria-label="Primary navigation">
        {navigation.map((item) => (
          <a href={item.href} key={item.href}>
            {item.label}
          </a>
        ))}
      </nav>

      <a
        className="header-action"
        href="https://heavymetalcertified.com"
        target="_blank"
        rel="noopener"
      >
        Current program <span aria-hidden="true">↗</span>
      </a>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <span className="footer-mark">ICS</span>
        <p>
          Institute of Contaminant Standards
          <small>A trade name of Paleo Certified, Inc.</small>
        </p>
      </div>

      <div className="footer-links">
        {navigation.map((item) => (
          <a href={item.href} key={item.href}>
            {item.label}
          </a>
        ))}
        <a href="https://heavymetalindex.com" target="_blank" rel="noopener">
          Heavy Metal Index ↗
        </a>
        <a href="https://heavymetalcertified.com" target="_blank" rel="noopener">
          HMTc program ↗
        </a>
        <a href="/people/karen-pendergrass">Karen Pendergrass</a>
        <a href="/governance/policies">Policy register</a>
        <a href="/contact">Contact</a>
        <a href="/licensing">Licensing</a>
        <a href="/privacy">Privacy</a>
        <a href="/terms">Terms</a>
      </div>

      <p className="footer-legal">
        <span>Operated by the Institute of Contaminant Standards</span>
        <span>© 2026 Paleo Certified, Inc.</span>
      </p>
    </footer>
  );
}

export function SiteFrame({ children }: { children: ReactNode }) {
  return (
    <div className="site-shell">
      <SiteHeader />
      {children}
      <SiteFooter />
    </div>
  );
}

export function PageHero({
  index,
  eyebrow,
  title,
  description,
  aside,
}: {
  index: string;
  eyebrow: string;
  title: ReactNode;
  description: string;
  aside?: ReactNode;
}) {
  return (
    <section className="page-hero">
      <div className="page-hero-copy">
        <p className="page-index">{index}</p>
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="page-dek">{description}</p>
      </div>
      {aside ? <aside className="page-hero-aside">{aside}</aside> : null}
    </section>
  );
}

export function Status({ children, tone = "quiet" }: { children: ReactNode; tone?: "live" | "quiet" }) {
  return <span className={`status status-${tone}`}>{children}</span>;
}

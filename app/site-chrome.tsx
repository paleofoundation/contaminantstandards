import type { ReactNode } from "react";

const navigation = [
  { href: "/network", label: "Our network" },
  { href: "/governance", label: "Governance" },
  { href: "/articles", label: "Publications" },
  { href: "/about", label: "About ICS" },
];

export function SiteHeader() {
  return <>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <header className="site-header">
      <a className="brand-lockup" href="/" aria-label="Institute of Contaminant Standards home"><span className="brand-mark" aria-hidden="true"><span>I</span><span>C</span><span>S</span></span><span className="brand-name">Institute of<br />Contaminant Standards</span></a>
      <nav className="main-nav" aria-label="Primary navigation">{navigation.map(item => <a href={item.href} key={item.href}>{item.label}</a>)}</nav>
      <a className="header-action" href="/network">Explore the network <span aria-hidden="true">↗</span></a>
      <details className="mobile-navigation"><summary>Menu <span aria-hidden="true">＋</span></summary><nav aria-label="Mobile navigation"><a href="/">Institute home</a>{navigation.map(item => <a href={item.href} key={item.href}>{item.label}</a>)}<a href="https://tecrid.com">TECRID ↗</a><a href="https://vle.exchange">Verified Lot Exchange ↗</a></nav></details>
    </header>
  </>;
}

export function SiteFooter() {
  return <footer className="institution-footer"><div className="wrap">
    <div className="footer-upper"><div className="footer-identity"><a href="/" className="footer-wordmark">ICS<span>Institute of<br />Contaminant Standards</span></a><p>Better evidence. Higher standards.<br />Greater trust.</p><a href="/people/karen-pendergrass">Founded by Karen Pendergrass <span aria-hidden="true">↗</span></a></div>
      <div className="footer-column"><h2>The Institute</h2>{navigation.map(item => <a href={item.href} key={item.href}>{item.label}</a>)}<a href="/people/karen-pendergrass">Leadership &amp; research</a><a href="/evidence">Evidence stewardship</a><a href="/registry">Brand registry</a><a href="/contact">Contact</a></div>
      <div className="footer-column"><h2>Our network</h2><a href="https://heavymetalindex.com">Heavy Metal Index ↗</a><a href="https://heavymetalcertified.com">Heavy Metal Certified ↗</a><a href="/network#microplastics">Microplastics programs</a><a href="/network#pfas">PFAS programs</a><a href="https://tecrid.com">TECRID ↗</a><a href="https://vle.exchange">Verified Lot Exchange ↗</a></div>
      <div className="footer-column"><h2>Accountability</h2><a href="/governance/policies">Policy register</a><a href="/governance/notes">Evidence governance notes</a><a href="https://tecrid.com/what-is-a-tecrid">What is a TECRID? ↗</a><a href="/licensing">Licensing</a><a href="/privacy">Privacy</a><a href="/terms">Terms</a></div>
    </div><div className="footer-lower"><span>© 2026 Paleo Certified, Inc. <span className="footer-entity">A trade name of Paleo Certified, Inc.</span></span><span>Research. Standards. Accountability.</span></div>
  </div></footer>;
}

export function SiteFrame({ children }: { children: ReactNode }) {
  return <div className="site-shell"><SiteHeader /><div id="main-content" tabIndex={-1}>{children}</div><SiteFooter /></div>;
}

export function PageHero({ index, eyebrow, title, description, aside }: { index: string; eyebrow: string; title: ReactNode; description: ReactNode; aside?: ReactNode }) {
  return <section className="page-hero"><div className="page-hero-copy"><p className="page-index">{index}</p><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="page-dek">{description}</p></div>{aside ? <aside className="page-hero-aside">{aside}</aside> : null}</section>;
}
export function Status({ children, tone = "quiet" }: { children: ReactNode; tone?: "live" | "quiet" }) {
  return <span className={`status status-${tone}`}>{children}</span>;
}

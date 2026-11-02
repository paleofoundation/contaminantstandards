import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { PersonName } from "./person-name";

const navigation = [
  { href: "/network", label: "Our network" },
  { href: "/apply", label: "Certification" },
  { href: "/governance", label: "Governance" },
  { href: "/articles", label: "Publications" },
  { href: "/about", label: "About ICS" },
];

export function SiteHeader() {
  return <>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <header className="site-header">
      <Link className="brand-lockup" href="/" aria-label="Institute of Contaminant Standards home"><Image className="ics-logo" src="/ics-logo-transparent.png" width={564} height={110} alt="Institute of Contaminant Standards" priority unoptimized /></Link>
      <nav className="main-nav" aria-label="Primary navigation">{navigation.map(item => <Link href={item.href} key={item.href}>{item.label}</Link>)}</nav>
      <Link className="header-action" href="/login">Log in <span aria-hidden="true">↗</span></Link>
      <details className="mobile-navigation"><summary>Menu <span aria-hidden="true">＋</span></summary><nav aria-label="Mobile navigation"><Link href="/">Institute home</Link>{navigation.map(item => <Link href={item.href} key={item.href}>{item.label}</Link>)}<Link href="/login">Log in to your portal ↗</Link><a href="https://tecrid.com">TECRID ↗</a><a href="https://vle.exchange">Verified Lot Exchange ↗</a></nav></details>
    </header>
  </>;
}

export function SiteFooter() {
  return <footer className="institution-footer"><div className="wrap">
    <div className="footer-upper"><div className="footer-identity"><Link href="/" className="footer-wordmark" aria-label="Institute of Contaminant Standards home"><Image className="ics-logo" src="/ics-logo.png" width={564} height={110} alt="Institute of Contaminant Standards" unoptimized /></Link><p>Better evidence. Higher standards.<br />Greater trust.</p><span className="footer-founder">Founded by <PersonName person="karen" href="/people/karen-pendergrass" /> <span aria-hidden="true">↗</span></span></div>
      <div className="footer-column"><h2>The Institute</h2>{navigation.map(item => <Link href={item.href} key={item.href}>{item.label}</Link>)}<Link href="/login">Certification portal</Link><Link href="/people/karen-pendergrass">Leadership &amp; research</Link><Link href="/evidence">Evidence stewardship</Link><Link href="/registry">Brand registry</Link><Link href="/contact">Contact</Link></div>
      <div className="footer-column"><h2>Our network</h2><a href="https://heavymetalindex.com">Heavy Metal Index ↗</a><a href="https://foreverchemicalsindex.com">Forever Chemicals Index ↗</a><a href="https://heavymetalcertified.com">Heavy Metal Certified ↗</a><Link href="/network#microplastics">Microplastics programs</Link><Link href="/network#pfas">PFAS programs</Link><a href="https://tecrid.com">TECRID ↗</a><a href="https://vle.exchange">Verified Lot Exchange ↗</a></div>
      <div className="footer-column"><h2>Accountability</h2><Link href="/governance/policies">Policy register</Link><Link href="/governance/notes">Evidence governance notes</Link><a href="https://tecrid.com/what-is-a-tecrid">What is a TECRID? ↗</a><Link href="/licensing">Licensing</Link><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link></div>
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

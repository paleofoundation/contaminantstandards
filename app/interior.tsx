import type { ReactNode } from "react";
import Link from "next/link";
import "./interior.css";

export function InteriorHero({
  label,
  title,
  description,
  children,
}: {
  label: string;
  title: ReactNode;
  description: string;
  children?: ReactNode;
}) {
  return (
    <section className="inside-hero">
      <div className="inside-container inside-hero-grid">
        <div>
          <p className="inside-label">
            <span className="inside-dot" />
            {label}
          </p>
          <h1>{title}</h1>
          <p className="inside-dek">{description}</p>
        </div>
        {children ? <div className="inside-hero-detail">{children}</div> : null}
      </div>
    </section>
  );
}
export function PageNav({
  items,
}: {
  items: { href: string; label: string }[];
}) {
  return (
    <nav className="inside-nav" aria-label="On this page">
      <div className="inside-container">
        <span>ON THIS PAGE</span>
        {items.map((item, i) => (
          <a key={item.href} href={item.href}>
            <small>0{i + 1}</small>
            {item.label}
            <span aria-hidden="true">↓</span>
          </a>
        ))}
      </div>
    </nav>
  );
}
export function SectionIntro({
  label,
  title,
  children,
}: {
  label: string;
  title: ReactNode;
  children?: ReactNode;
}) {
  return (
    <header className="inside-section-head">
      <div>
        <p className="inside-label">{label}</p>
        <h2>{title}</h2>
      </div>
      {children ? <div className="inside-section-dek">{children}</div> : null}
    </header>
  );
}
export function InteriorClosing({
  label,
  title,
  href,
  link,
}: {
  label: string;
  title: ReactNode;
  href: string;
  link: string;
}) {
  return (
    <section className="inside-closing">
      <div className="inside-container">
        <div>
          <p className="inside-label">{label}</p>
          <h2>{title}</h2>
        </div>
        <Link className="inside-button" href={href}>
          {link}
          <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </section>
  );
}
export function MaterialMark({
  kind,
}: {
  kind: "metals" | "plastics" | "pfas";
}) {
  return (
    <div className={`inside-material ${kind}`} aria-hidden="true">
      {kind === "metals" ? (
        <>
          <small>82</small>
          <b>Pb</b>
          <small>207.2</small>
        </>
      ) : kind === "plastics" ? (
        <svg viewBox="0 0 120 100">
          <path d="M14 35 38 17 58 42 40 67 14 55Z M74 10 93 18 86 39 67 31Z M69 59 99 51 111 77 85 91 67 80Z" />
        </svg>
      ) : (
        <svg viewBox="0 0 120 100">
          <path d="m15 50 23-15 25 15 24-15 22 15 M38 35V16 M63 50v23 M87 35V16 M15 50v22" />
          <circle cx="15" cy="50" r="5" />
          <circle cx="38" cy="35" r="5" />
          <circle cx="63" cy="50" r="5" />
          <circle cx="87" cy="35" r="5" />
          <circle cx="109" cy="50" r="5" />
        </svg>
      )}
    </div>
  );
}

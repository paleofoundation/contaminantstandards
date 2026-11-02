import Image from "next/image";
import { authorityStats } from "../lib/feeds";
import { SiteFrame } from "./site-chrome";
import { publications } from "./site-data";

const fields = [
  { n: "01", code: "HM", title: "Heavy metals", text: "Trace the evidence. Understand the standard. Find the certification pathway.", index: "Heavy Metal Index", href: "https://heavymetalindex.com", program: "Heavy Metal Certified", programHref: "https://heavymetalcertified.com", status: "Established program", style: "metals" },
  { n: "02", code: "MP", title: "Microplastics", text: "A dedicated evidence index and a distinct certification program for microplastics.", index: "Microplastics Index", href: "/network#microplastics", program: "Microplastics certification", programHref: "/network#microplastics", status: "In development", style: "plastics" },
  { n: "03", code: "PF", title: "PFAS", text: "A public PFAS evidence index, with a certification pathway in development.", index: "Forever Chemicals Index", href: "https://foreverchemicalsindex.com", program: "PFAS certification", programHref: "/network#pfas", status: "In development", style: "pfas" },
];

export default function Home() {
  const evidence = authorityStats();
  const evidenceCounts = [["Peer-reviewed studies", evidence.peer_reviewed], ["Source records", evidence.sources_total], ["Jurisdictions represented", evidence.jurisdictions], ["Sources with a DOI", evidence.dois]] as const;
  const latestPublications = [...publications].sort((a, b) => b.datePublished.localeCompare(a.datePublished));
  return <SiteFrame>
    <main id="top" className="institute-home">
      <section className="institute-hero" aria-labelledby="hero-title">

        <div className="institute-hero-inner">
          <div className="institute-hero-copy">
            <p className="label light"><span className="signal-dot" />INSTITUTE OF CONTAMINANT STANDARDS</p>
            <h1 id="hero-title">Small things.<br /><em>Extraordinary</em><br />standards.</h1>
            <p className="institute-dek">What we cannot see still matters. We connect contaminant research, independent standards, and certification—so evidence can become action.</p>
            <div className="institute-actions"><a className="ics-button gold" href="/apply">Explore certification <span aria-hidden="true">↗</span></a><a className="hero-text-link" href="#network">Meet the network <span aria-hidden="true">↓</span></a></div>
          </div>
          <div className="hero-botanical"><Image src="/ics-marigold.webp" alt="Golden marigolds among richly textured blue-gray foliage" fill sizes="(max-width: 800px) 100vw, 50vw" priority /><div className="botanical-caption"><span>LOOK CLOSER.</span><span>Evidence is in the details.</span></div><div className="botanical-seal" aria-hidden="true"><span>ICS</span><small>RESEARCH<br />TO REAL WORLD</small></div></div>
        </div>
        <div className="hero-baseline"><span>RESEARCH. STANDARDS. REAL-WORLD CONFIDENCE.</span><a href="/about">The Institute of Contaminant Standards <span aria-hidden="true">↗</span></a></div>
      </section>

      <section className="certification-entry" aria-labelledby="portal-heading"><div className="wrap certification-entry-inner"><div><p className="label">THE ICS CERTIFICATION PORTAL</p><h2 id="portal-heading">Your certifications.<br /><em>One place.</em></h2></div><div><p>One account for your brand, products, laboratory evidence, and certification journey. Start with Heavy Metal Tested &amp; Certified. PFAS and microplastics programs are in development.</p><div className="portal-entry-actions"><a className="ics-button navy" href="/apply">Start an application <span aria-hidden="true">↗</span></a><a className="text-link" href="/login">Already registered? Log in <span aria-hidden="true">→</span></a></div></div></div></section>

      <section className="institute-intro wrap" aria-labelledby="intro-title">
        <p className="label">OUR PURPOSE</p>
        <div><h2 id="intro-title">Trust is stronger when<br /><em>you can trace it.</em></h2><p>Contaminant evidence is only useful when its sources, meaning, and limits are clear. ICS brings independent research indexes, certification programs, and shared evidence infrastructure under one institutional framework.</p><a className="text-link" href="/about">About the Institute <span aria-hidden="true">↗</span></a></div>
        <aside><span className="small-cross" aria-hidden="true">＋</span><p>One institution.<br />Distinct responsibilities.<br />Accountable standards.</p><span className="label">THE PRINCIPLE THAT CONNECTS US</span></aside>
      </section>

      <section className="network-section" id="network" aria-labelledby="network-title">
        <div className="wrap">
          <div className="section-topline"><p className="label">01 / THE ICS NETWORK</p><a className="text-link" href="/network">Full network directory <span aria-hidden="true">↗</span></a></div>
          <div className="section-title-row"><h2 id="network-title">Connected by purpose.<br /><em>Defined by their role.</em></h2><p>Explore the evidence, find a certification program, or follow a laboratory record to its source.</p></div>
          <div className="directory-subhead" id="indexes"><h3>Contaminant indexes &amp; certification</h3><span>THREE AREAS OF FOCUS</span></div>
          <div className="contaminant-grid">{fields.map(field => <article className={`contaminant-card ${field.style}`} key={field.code}>
            <div className="card-top"><span className="label">{field.n} / {field.code}</span><span className={`program-state ${field.n === "01" ? "active" : ""}`}>{field.status}</span></div>
            <div className={`material-symbol ${field.style}`} aria-hidden="true">{field.style === "metals" ? <><span>82</span><b>Pb</b><small>207.2</small></> : field.style === "plastics" ? <svg viewBox="0 0 120 100"><path d="M14 35 38 17 58 42 40 67 14 55Z M74 10 93 18 86 39 67 31Z M69 59 99 51 111 77 85 91 67 80Z" /></svg> : <svg viewBox="0 0 120 100"><path d="m15 50 23-15 25 15 24-15 22 15 M38 35V16 M38 35 24 15 M63 50v23 M63 50l14 22 M87 35V16 M15 50v22" /><circle cx="15" cy="50" r="5"/><circle cx="38" cy="35" r="5"/><circle cx="63" cy="50" r="5"/><circle cx="87" cy="35" r="5"/><circle cx="109" cy="50" r="5"/></svg>}</div>
            <h3>{field.title}</h3><p>{field.text}</p><div className="program-links"><a href={field.href}>{field.index}<span aria-hidden="true">{field.href.startsWith("https") ? "↗" : "→"}</span></a><a href={field.programHref}>{field.program}<span aria-hidden="true">{field.programHref.startsWith("https") ? "↗" : "→"}</span></a></div>
          </article>)}</div>
          <div className="directory-subhead"><h3>Shared infrastructure</h3><span>CONNECTING EVIDENCE TO ACTION</span></div>
          <div className="infrastructure-grid">
            <a className="infrastructure-card tecrid-card" href="https://tecrid.com"><div className="infra-top"><span className="infra-monogram" aria-hidden="true">T<span>↗</span></span><span className="label">EVIDENCE VERIFICATION</span></div><h3>TECRID</h3><p>A persistent identifier for versioned laboratory evidence. Follow the record, its provenance, and its findings.</p><span className="infra-bottom">Explore TECRID <span aria-hidden="true">↗</span></span></a>
            <a className="infrastructure-card vle-card" href="https://vle.exchange"><div className="infra-top"><span className="infra-monogram vle-monogram" aria-hidden="true">V<span>↗</span></span><span className="label">SOURCING · DEMO &amp; PILOT</span></div><h3>Verified Lot Exchange</h3><p>Connect ingredient sourcing with lot-level evidence. Explore suppliers, products, and supporting documentation.</p><span className="infra-bottom">Explore VLE.exchange <span aria-hidden="true">↗</span></span></a>
          </div>
          <p className="network-note">Each index and certification program has its own remit. Programs marked “in development” are not presented as active certification services.</p>
        </div>
      </section>

      <section className="stewardship-section wrap" aria-labelledby="stewardship-title">
        <div className="section-topline"><p className="label">THE PUBLIC EVIDENCE BASE</p><a className="text-link" href="/evidence">Explore the evidence atlas <span aria-hidden="true">↗</span></a></div>
        <h2 id="stewardship-title">A foundation you can inspect.</h2>
        <p className="stewardship-description">The Heavy Metal Index literature corpus supports independent research. These stewardship counts describe the evidence base, not certification outcomes.</p>
        <dl className="stewardship-counts">{evidenceCounts.map(([label, value]) => <div key={label}><dd>{value.toLocaleString("en-US")}</dd><dt>{label}</dt></div>)}</dl>
        <p className="stewardship-date">Published feed snapshot: <time dateTime={evidence.generated ?? undefined}>{evidence.generated ?? "Date not recorded"}</time>. <a href="https://heavymetalindex.com/sources/">Inspect the source library ↗</a></p>
      </section>

      <section className="principles-section wrap" aria-labelledby="principles-title">
        <div className="principles-intro"><p className="label">02 / THE GOVERNANCE MODEL</p><h2 id="principles-title">A connected network.<br /><em>Clear boundaries.</em></h2><p>ICS sets the rules for how evidence is used, how standards change, and who is accountable for a certification decision.</p><a className="text-link" href="/governance">Explore our governance <span aria-hidden="true">↗</span></a></div>
        <div className="principles-list">
          <article><span>01</span><div><h3>Evidence stays independent.</h3><p>Public indexes describe the literature. A published finding is not a certification decision.</p></div></article>
          <article><span>02</span><div><h3>Standards stay accountable.</h3><p>Certification programs define requirements, review evidence, and control the use of their marks.</p></div></article>
          <article><span>03</span><div><h3>Changes stay traceable.</h3><p>Versioned records, visible methods, and governance policies make decisions open to scrutiny.</p></div></article>
        </div>
      </section>

      <section className="publications-section" aria-labelledby="publications-title"><div className="wrap">
        <div className="section-topline"><p className="label">03 / FROM THE INSTITUTE</p><a className="text-link" href="/articles">All publications <span aria-hidden="true">↗</span></a></div><h2 id="publications-title">The thinking behind<br /><em>the standards.</em></h2>
        <div className="journal-grid">{latestPublications.map(p => <a className="journal-entry" href={`/articles/${p.slug}`} key={p.identifier}><div className="journal-meta"><span>{p.topic}</span><span>{p.readingTime}</span></div><h3>{p.shortTitle}</h3><p>{p.description}</p><span className="journal-bottom">{p.identifier}<b aria-hidden="true">↗</b></span></a>)}</div>
        <a className="governance-register-link" href="/governance/notes"><span><span className="label">THE EVIDENCE GOVERNANCE REGISTER</span><b>From a research finding to a visible governance consequence.</b></span><span aria-hidden="true">↗</span></a>
      </div></section>
      <section className="institute-closing wrap"><p className="label">FIND YOUR STARTING POINT</p><h2>Follow the evidence.<br /><em>Find your next step.</em></h2><div className="closing-paths"><a href="#indexes"><span>FOR RESEARCHERS &amp; READERS</span><b>Explore the indexes ↗</b></a><a href="/apply"><span>FOR BRANDS &amp; PRODUCERS</span><b>Start your certification journey ↗</b></a><a href="https://vle.exchange"><span>FOR BUYERS &amp; SUPPLIERS</span><b>Explore the lot exchange ↗</b></a></div></section>
    </main>
  </SiteFrame>;
}

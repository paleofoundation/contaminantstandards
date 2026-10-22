import type { Metadata } from "next";
import { PORTAL, httpsUrl } from "../../lib/site-registry";
import { PageHero, SiteFrame } from "../site-chrome";

export const metadata: Metadata = {
  title: "Certification applications",
  description: "One ICS account for your certification journey. Start with Heavy Metal Tested & Certified; PFAS and microplastics programs are in development.",
  alternates: { canonical: "/apply" },
};

export default function ApplyPage() {
  const portal = httpsUrl(PORTAL.domain);
  return <SiteFrame><main>
    <PageHero index="ICS / CERTIFICATION" eyebrow="One account. A connected certification journey." title={<>Your next standard.<br /><em>Starts here.</em></>} description="Manage your brand, products, laboratory evidence, and applications in the ICS certification portal." aside={<a className="ics-button gold" href={`${portal}/login`}>Already registered? Log in <span aria-hidden="true">↗</span></a>} />
    <section className="application-hub wrap">
      <p className="label">CHOOSE YOUR PROGRAM</p>
      <h2>One home for your certifications.</h2>
      <p className="utility-lead">Existing Heavy Metal Tested &amp; Certified members can use their current account. Each program keeps its own evidence requirements and certification decisions.</p>
      <div className="contaminant-grid">
        <article className="contaminant-card metals"><div className="card-top"><span className="label">01 / HEAVY METALS</span><span className="program-state active">Available now</span></div><h3>Heavy Metal Tested<br />&amp; Certified</h3><p>Build your brand profile, add products and lab evidence, assess readiness, and apply when your baseline qualifies.</p><a className="ics-button navy" href={`${portal}/hmt/get-started`}>Get started <span aria-hidden="true">↗</span></a><a className="text-link" style={{marginTop:18,alignSelf:"start"}} href={`${portal}/login?returnTo=/portal/readiness`}>Continue in your workspace →</a></article>
        <article className="contaminant-card"><div className="card-top"><span className="label">02 / PFAS</span><span className="program-state">In development</span></div><h3>PFAS<br />certification</h3><p>A future certification pathway for forever chemicals, planned within the same ICS account.</p><span className="program-unavailable">Applications are not yet open.</span></article>
        <article className="contaminant-card"><div className="card-top"><span className="label">03 / MICROPLASTICS</span><span className="program-state">In development</span></div><h3>Microplastics<br />certification</h3><p>A future certification pathway for microplastics, planned within the same ICS account.</p><span className="program-unavailable">Applications are not yet open.</span></article>
      </div>
      <div className="utility-process"><h2>From first step to application.</h2><ol><li>Learn about the program and create your account.</li><li>Add your brand, products, and laboratory records.</li><li>Review readiness and any additional evidence needed.</li><li>Submit your application when the program requirements are met.</li></ol></div>
      <p className="utility-note">Read the <a href="https://heavymetalcertified.com">Heavy Metal Tested &amp; Certified program information</a>. Your application documents stay in the private portal. Public research, governance, and certificate verification remain separate.</p>
    </section>
  </main></SiteFrame>;
}

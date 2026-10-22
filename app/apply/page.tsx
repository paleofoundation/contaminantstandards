import type { Metadata } from "next";
import {
  InteriorHero,
  PageNav,
  SectionIntro,
  InteriorClosing,
  MaterialMark,
} from "../interior";
import { PORTAL, httpsUrl } from "../../lib/site-registry";
import { SiteFrame, Status } from "../site-chrome";

export const metadata: Metadata = {
  title: "Certification applications",
  description:
    "One ICS account for your certification journey. Start with Heavy Metal Tested & Certified; PFAS and microplastics programs are in development.",
  alternates: { canonical: "/apply" },
};

export default function ApplyPage() {
  const portal = httpsUrl(PORTAL.domain);
  return (
    <SiteFrame>
      <main className="interior certification-interior">
        <InteriorHero
          label="ICS CERTIFICATION"
          title={
            <>
              Your next standard.
              <br />
              <em>Starts here.</em>
            </>
          }
          description="One account for your brand, products, laboratory evidence, and certification journey. Choose your program and take the next step."
        >
          <div className="portal-welcome">
            <p className="inside-label">THE ICS CERTIFICATION PORTAL</p>
            <h2>
              Your certifications.
              <br />
              <em>One place.</em>
            </h2>
            <p>
              Already a Heavy Metal Tested &amp; Certified member? Continue with
              your existing account.
            </p>
            <a className="inside-button" href={`${portal}/login`}>
              Log in to your workspace <span aria-hidden="true">↗</span>
            </a>
            <small>
              Brand profiles · Product records · Laboratory evidence
            </small>
          </div>
        </InteriorHero>
        <PageNav
          items={[
            { href: "#choose-program", label: "Choose a program" },
            { href: "#journey", label: "Your certification journey" },
            { href: "#questions", label: "Before you begin" },
          ]}
        />
        <section
          className="inside-section inside-container"
          id="choose-program"
        >
          <SectionIntro
            label="01 / CHOOSE YOUR PROGRAM"
            title={
              <>
                Find your <em>starting point.</em>
              </>
            }
          >
            <p>
              Each certification program has its own requirements and decisions.
              Your ICS account brings the application work together.
            </p>
          </SectionIntro>
          <article className="cert-feature">
            <div className="cert-feature-art">
              <MaterialMark kind="metals" />
              <span className="inside-label">RESEARCH TO REAL WORLD</span>
            </div>
            <div className="cert-feature-copy">
              <Status tone="live">Applications open</Status>
              <h3>
                Heavy Metal
                <br />
                Tested &amp; Certified
              </h3>
              <p>
                Build your brand profile, add products and laboratory evidence,
                and review your readiness for certification.
              </p>
              <div className="inside-actions">
                <a
                  className="inside-button dark"
                  href={`${portal}/hmt/get-started`}
                >
                  Start your application <span aria-hidden="true">↗</span>
                </a>
                <a
                  className="inside-sub-link"
                  href="https://heavymetalcertified.com"
                >
                  Explore the program ↗
                </a>
              </div>
              <a
                className="inside-sub-link"
                href={`${portal}/login?returnTo=/portal/readiness`}
              >
                Already started? Continue your readiness review →
              </a>
            </div>
          </article>
          <div className="future-programs">
            <article>
              <MaterialMark kind="pfas" />
              <div>
                <Status>In development</Status>
                <h3>PFAS certification</h3>
                <p>
                  A future pathway for forever chemicals. Applications are not
                  yet open.
                </p>
              </div>
            </article>
            <article>
              <MaterialMark kind="plastics" />
              <div>
                <Status>In development</Status>
                <h3>Microplastics certification</h3>
                <p>
                  A future pathway for microplastics. Applications are not yet
                  open.
                </p>
              </div>
            </article>
          </div>
        </section>
        <section className="inside-band" id="journey">
          <div className="inside-container inside-section">
            <SectionIntro
              label="02 / YOUR CERTIFICATION JOURNEY"
              title={
                <>
                  A clear path.
                  <br />
                  <em>From evidence to application.</em>
                </>
              }
            />
            <ol className="inside-steps">
              {[
                {
                  title: "Create your account",
                  text: "Choose the active program and set up your brand workspace.",
                },
                {
                  title: "Build your evidence record",
                  text: "Add your products and the laboratory records that support them.",
                },
                {
                  title: "Review your readiness",
                  text: "See where your evidence meets the program requirements and what else is needed.",
                },
                {
                  title: "Submit your application",
                  text: "Apply when the program requirements are met. Certification remains subject to program review.",
                },
              ].map((s, i) => (
                <li key={s.title}>
                  <span>0{i + 1}</span>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
        <section
          className="inside-container inside-section faq-layout"
          id="questions"
        >
          <div>
            <p className="inside-label">03 / BEFORE YOU BEGIN</p>
            <h2>
              A few useful
              <br />
              <em>things to know.</em>
            </h2>
          </div>
          <div className="inside-faq">
            <details open>
              <summary>
                Can I use my existing HMTc account?
                <span aria-hidden="true">＋</span>
              </summary>
              <p>
                Yes. Existing Heavy Metal Tested &amp; Certified members can log
                in with their current account and continue in the ICS portal.
              </p>
            </details>
            <details>
              <summary>
                What should I prepare?<span aria-hidden="true">＋</span>
              </summary>
              <p>
                Your brand details, product information, and available
                laboratory evidence. The readiness review identifies any
                additional evidence needed for your products.
              </p>
            </details>
            <details>
              <summary>
                Where do I find the current standard?
                <span aria-hidden="true">＋</span>
              </summary>
              <p>
                Current standards, methods, and program requirements are
                published on the{" "}
                <a href="https://heavymetalcertified.com/standards/">
                  Heavy Metal Tested &amp; Certified program site ↗
                </a>
                .
              </p>
            </details>
            <details>
              <summary>
                Are application records public?
                <span aria-hidden="true">＋</span>
              </summary>
              <p>
                Your application documents stay in the private portal. Public
                literature, institutional governance, and certificate
                verification have separate roles.
              </p>
            </details>
          </div>
        </section>
        <InteriorClosing
          label="READY FOR YOUR NEXT STEP?"
          title={
            <>
              Bring your evidence.
              <br />
              <em>Build your application.</em>
            </>
          }
          href={`${portal}/hmt/get-started`}
          link="Get started with HMTc"
        />
      </main>
    </SiteFrame>
  );
}

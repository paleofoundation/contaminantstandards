import referenceData from "./references.json";
import type { Metadata } from "next";
import { SiteFrame } from "../../site-chrome";
import { publications } from "../../site-data";
import {
  ArticleSection,
  createCite,
  type PublicationReference,
  PublicationFooter,
  PublicationHeader,
  PublicationJsonLd,
  publicationMetadata,
} from "../article-tools";

const article = publications[2];

const references: PublicationReference[] = referenceData;
const Cite = createCite(references);

export async function generateMetadata(): Promise<Metadata> {
  return publicationMetadata(article);
}

export default function StandardsAsLivingRecordsArticle() {
  return (
    <SiteFrame>
      <PublicationJsonLd
        record={article}
        keywords={[
          "standards versioning",
          "conformity assessment",
          "effective dates",
          "standards revision",
          "certificate traceability",
          "governance",
        ]}
      />
      <main className="publication-page">
        <PublicationHeader
          record={article}
          dek="A standard may improve over time without making its past disappear. The institutional test is whether every decision can still be resolved to the exact edition, effective date, and rule that governed it."
        />

        <article className="paper-body">
          <aside className="paper-abstract">
            <span>ABSTRACT</span>
            <p>
              Standards are revised because evidence, regulation, methods, products,
              and institutional experience change. Revision becomes a governance
              failure when a current document silently replaces the rule under which
              an earlier certification was made. This analysis describes a version
              model in which editions are stable records, effective dates are
              explicit, superseded text remains available, and every certificate
              resolves to the standard that actually governed the decision.
            </p>
          </aside>

          <ArticleSection number="01" title="A current standard is not the whole record">
            <p className="paper-lead">
              A standards body needs two truths at once: one edition is current, and
              every prior edition that governed a real decision remains historically
              real.
            </p>
            <p>
              Websites make silent replacement easy. A file can be updated at the
              same address, a date can be changed, and the previous text can vanish.
              That may be convenient for ordinary guidance. It is inadequate for a
              conformity system whose certificates, laboratory reports, contracts,
              and enforcement decisions may be examined years later.
            </p>
            <p>
              The question is not merely what the standard says today. It is what the
              standard said on the date a defined product was assessed, which edition
              the applicant accepted, which transition rule applied, and whether a
              later correction changed meaning or only repaired presentation.<Cite ids={["policies"]} />
            </p>
          </ArticleSection>

          <ArticleSection number="02" title="The edition is the unit of accountability">
            <p>
              A defensible edition has a stable identifier, publication date,
              effective date, status, and durable address. It also identifies the
              authority that approved it and the document it supersedes. These are
              not administrative decorations. Together they establish the rule set
              against which a conformity decision can be reconstructed.
            </p>
            <div className="paper-principles">
              <div><b>Stable identity</b><p>An edition identifier does not migrate to different substantive text.</p></div>
              <div><b>Declared status</b><p>Draft, current, superseded, corrected, and withdrawn records are visibly distinct.</p></div>
              <div><b>Effective date</b><p>Publication and enforceability are separate events when transition is required.</p></div>
              <div><b>Durable history</b><p>A superseded edition remains readable and cannot be mistaken for the current rule.</p></div>
            </div>
            <p>
              ISO and IEC procedures similarly treat confirmation, revision,
              amendment, and withdrawal as explicit outcomes and preserve reference
              copies of withdrawn editions. The relevant lesson is architectural:
              revision produces a new governed record; it does not make the earlier
              record unknowable.<Cite ids={["directives"]} /> FDA’s Elemental Analysis Manual also provides a public method history and access to archived material.<Cite ids={["archive"]} />
            </p>
          </ArticleSection>

          <ArticleSection number="03" title="Publication date and effective date do different work">
            <p>
              A new edition may need to be visible before it becomes enforceable.
              Laboratories may need to validate a method, applicants may need to
              change specifications, and certificate holders may need time to
              complete an already-open cycle. The publication date begins public
              notice. The effective date determines when the new rule controls.
            </p>
            <p>
              A transition policy must also state what happens to work in progress.
              An application submitted under one edition should not move between
              standards according to invisible discretion. The governing event might
              be application acceptance, sample collection, laboratory receipt, or
              certification decision—but it must be named in advance and used
              consistently.
            </p>
            <blockquote>
              Transition is not a courtesy period outside the standard. It is part of
              the standard’s temporal scope.
            </blockquote>
          </ArticleSection>

          <ArticleSection number="04" title="Certificates must resolve backward">
            <p>
              A current registry answers whether a certification relationship is
              active now. A certificate record must answer an additional historical
              question: under which standard edition was this determination made?
              The link between the certificate and the governing edition should be
              direct, not inferred from a filename or the year printed on a badge. The program’s published standards register provides an entry point to its requirements.<Cite ids={["standards"]} />
            </p>
            <ol className="paper-sequence">
              <li><span>1</span><div><b>Name the edition</b><p>The certificate record states the stable standard identifier.</p></div></li>
              <li><span>2</span><div><b>Preserve the decision date</b><p>The relevant assessment and effective dates remain machine-readable.</p></div></li>
              <li><span>3</span><div><b>Resolve the text</b><p>The cited edition remains accessible even after supersession.</p></div></li>
              <li><span>4</span><div><b>State current status separately</b><p>Historical validity and present licensing status are not collapsed into one claim.</p></div></li>
            </ol>
            <p>
              This structure protects both the public and the certificate holder. A
              later, stricter edition does not retroactively falsify a compliant past
              decision. Conversely, a historical pass does not create a perpetual
              right to represent current certification.
            </p>
          </ArticleSection>

          <ArticleSection number="05" title="Correction, revision, and withdrawal are not synonyms">
            <p>
              A correction repairs an error in a published record. A revision changes
              the governed requirements or their meaning. A withdrawal ends the
              document’s current authority. Treating all three as an undifferentiated
              “update” hides whether the conformity rule itself changed.
            </p>
            <p>
              Editorial corrections may be recorded against the same edition when
              they do not alter obligation or interpretation. A substantive change
              requires a new edition and a new effective date. Where a defect could
              have changed certification decisions, the institution must also state
              the review population, corrective action, and whether affected records
              were re-evaluated.
            </p>
          </ArticleSection>

          <ArticleSection number="06" title="Conclusion">
            <p className="paper-lead">
              Version history is not an archive added after standards work. It is the
              mechanism that makes standards work auditable across time.
            </p>
            <p>
              A living standard can become more demanding, more precise, or better
              aligned with evidence without rewriting its own past. Stable editions,
              explicit transitions, durable superseded records, and certificate-level
              resolution turn change from a source of ambiguity into a controlled
              institutional act.
            </p>
          </ArticleSection>
        </article>

        <PublicationFooter
          record={article}
          references={references}
        />
      </main>
    </SiteFrame>
  );
}

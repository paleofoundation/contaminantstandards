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

const article = publications[1];

const references: PublicationReference[] = referenceData;
const Cite = createCite(references);

export async function generateMetadata(): Promise<Metadata> {
  return publicationMetadata(article);
}

export default function EvidenceThresholdArticle() {
  return (
    <SiteFrame>
      <PublicationJsonLd
        record={article}
        keywords={[
          "heavy-metal limits",
          "occurrence evidence",
          "certification thresholds",
          "standards methodology",
          "native basis",
          "standards ratchet",
        ]}
      />
      <main className="publication-page">
        <PublicationHeader
          record={article}
          dek="Occurrence data describes what has been observed. A certification limit states what a conformity system will permit. Confusing these jobs produces thresholds that are statistically impressive but institutionally indefensible."
        />

        <article className="paper-body">
          <aside className="paper-abstract">
            <span>ABSTRACT</span>
            <p>
              This analysis distinguishes the descriptive role of heavy-metal
              occurrence evidence from the normative role of a certification limit.
              It explains why public occurrence distributions should not select an
              initial certification threshold, presents the government-anchored model
              used by <a href="https://heavymetalcertified.com/program/structure">Heavy Metal Tested &amp; Certified</a>, and describes a separate
              post-publication ratchet based on eligible certified-lot performance.
            </p>
          </aside>

          <ArticleSection number="01" title="Two questions that look deceptively similar">
            <p className="paper-lead">
              “What concentrations have been observed?” and “What concentration will
              this certification permit?” both produce numbers. They are not the same
              scientific or institutional question.
            </p>
            <p>
              Occurrence research describes a sampled world. It may reveal typical
              values, tails, regional patterns, method effects, vulnerable matrices,
              or gaps in surveillance. Its distributions depend on which products
              were sampled, when and where they were collected, how non-detects were
              treated, which analyte species were measured, and whether the reported
              basis matches the product as sold or consumed.<Cite ids={["hmi"]} />
            </p>
            <p>
              A certification limit is a rule of conformity. It determines whether a
              defined product, on a defined basis, for a defined analyte, satisfies a
              published requirement. That rule has legal, commercial, and governance
              consequences. It therefore needs an authority basis that remains valid
              even when the available occurrence literature is sparse, biased, or
              rapidly changing.<Cite ids={["structure"]} />
            </p>
          </ArticleSection>

          <ArticleSection number="02" title="Why a market percentile is not an initial standard">
            <p>
              A percentile may be an informative description of an occurrence pool.
              It does not, by itself, establish what should be permitted. If the pool
              overrepresents one geography, laboratory method, product form, or
              quality tier, the percentile inherits that structure. If contaminated
              products dominate the observed market, a market-derived limit can
              normalize poor performance. If only high-performing products were
              tested, the same method can set a limit that the broader category was
              never given a fair opportunity to satisfy.
            </p>
            <blockquote>
              A descriptive distribution cannot supply its own normative authority.
              It can inform context, surveillance, and later review; it cannot silently
              become the rule it is being used to judge.
            </blockquote>
            <p>
              This is not an argument against statistical evidence. It is an argument
              for assigning statistical evidence to the correct decision. Occurrence
              findings are indispensable for understanding exposure, prioritizing
              research, identifying anomalous matrices, and testing whether a standard
              is producing meaningful improvement. Those uses do not require the
              occurrence pool to select the initial limit.
            </p>
          </ArticleSection>

          <ArticleSection number="03" title="The government-anchored initial value">
            <p>
              Heavy Metal Tested &amp; Certified begins with the strictest applicable
              credible government maximum for the exact product-and-analyte cell. The
              purpose of that rule is not to assume that every government value is
              optimal. It is to make the initial authority source public, external,
              and reproducible.<Cite ids={["standards"]} />
            </p>
            <ol className="paper-sequence">
              <li><span>1</span><div><b>Define the exact cell</b><p>Fix product matrix, form, intended consumer, analyte species, unit, and native reporting basis.</p></div></li>
              <li><span>2</span><div><b>Identify applicable sovereign rules</b><p>Collect credible maximum levels that genuinely govern that cell rather than a superficially similar one.</p></div></li>
              <li><span>3</span><div><b>Select the strictest applicable maximum</b><p>Preserve formulation, species, age, and jurisdictional distinctions instead of averaging them away.</p></div></li>
              <li><span>4</span><div><b>Disclose the unresolved edge</b><p>Use a documented sovereign read-across or control, or leave the cell in development rather than manufacture false precision.</p></div></li>
            </ol>
            <p>
              A reader can challenge any step: whether the rule is credible, whether
              it applies to the matrix, whether the basis is comparable, or whether a
              stricter instrument was missed. The challenge is possible because the
              method does not hide the authority source inside a proprietary score.<Cite ids={["governance"]} />
            </p>
          </ArticleSection>

          <ArticleSection number="04" title="Species and native basis are part of the limit">
            <p>
              A concentration without its analyte species and reporting basis is
              incomplete. Total arsenic is not interchangeable with inorganic
              arsenic. Total mercury is not automatically equivalent to methylmercury.
              Chromium measurements do not answer the same question when hexavalent
              chromium is the material species of concern. The standard must state
              which form it regulates and how an applicable total-metal control
              interacts with a species-specific rule.
            </p>
            <p>
              Basis is equally consequential. Dry, wet, prepared, drained, reconstituted,
              and as-sold values can differ substantially without any change in the
              underlying material. Converting between them requires explicit assumptions,
              and those assumptions can introduce more uncertainty than the apparent
              precision of the resulting number suggests.
            </p>
            <p>
              HMTc therefore keeps the initial standard in the native basis of the
              controlling instrument wherever possible. A conversion may be shown for
              context, but it does not erase the native record from which the rule
              derives.
            </p>
          </ArticleSection>

          <ArticleSection number="05" title="A separate ratchet after publication">
            <p>
              Government anchoring answers the initial-authority problem. It does not
              require a standard to remain static. A certification system may tighten
              a published value when its own eligible operating evidence demonstrates
              that the category can sustain a more demanding requirement.
            </p>
            <p>
              That later decision uses a different dataset: governed, eligible
              certified-lot results collected under the program’s defined laboratory,
              basis, identity, and quality controls. It does not draw the new threshold
              from the public occurrence pool. The evidence is narrower but more
              comparable to the population the program regulates.
            </p>
            <div className="paper-principles">
              <div><b>Eligibility</b><p>Only results meeting the published lot, method, identity, and quality rules enter the ratchet.</p></div>
              <div><b>Breadth</b><p>A narrow cluster of exceptional performers cannot unilaterally redefine a category.</p></div>
              <div><b>Persistence</b><p>Performance must be sustained, not produced by a temporary or seasonal window.</p></div>
              <div><b>Transition</b><p>A tightened edition receives an effective date, version record, and documented implementation period.</p></div>
            </div>
            <p>
              The separation of datasets also protects the public index. Certified-lot
              findings may contain brand-level and commercial information that does
              not belong on a literature surface. The ratchet may publish its rule,
              aggregate basis, and resulting edition without turning the independent
              index into a private program-data mirror.
            </p>
          </ArticleSection>

          <ArticleSection number="06" title="Governance consequences">
            <p>
              Separating occurrence evidence from certification limits creates clear
              accountability. Literature curators are responsible for faithfully
              describing the source record. Standards architects are responsible for
              applying the published initial-value and ratchet rules. Certification
              operators are responsible for lot eligibility, mark use, and current
              status. Institutional oversight is responsible for conflicts, review,
              overrides, corrections, and version history.
            </p>
            <p>
              The model also makes claims easier to interpret. The index can report a
              high or low observed concentration without implying that a product would
              pass certification. The program can publish a strict limit without
              implying that every product below it is safe in every context. Each
              statement remains within the authority of the system that made it.
            </p>
          </ArticleSection>

          <ArticleSection number="07" title="Conclusion">
            <p className="paper-lead">
              Occurrence evidence and certification limits should inform one another
              without becoming one another. The boundary preserves the scientific
              meaning of the evidence and the institutional legitimacy of the standard.
            </p>
            <p>
              An initial government anchor makes the authority source external and
              reproducible. A separate certified-lot ratchet permits later tightening
              under controlled, category-relevant evidence. Public occurrence research
              remains free to describe the world as it is found—including evidence
              that challenges the standard—without being recruited to justify a
              decision it did not make.
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

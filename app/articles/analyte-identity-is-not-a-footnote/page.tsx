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

const article = publications[4];

const references: PublicationReference[] = referenceData;
const Cite = createCite(references);

export async function generateMetadata(): Promise<Metadata> {
  return publicationMetadata(article);
}

export default function AnalyteIdentityArticle() {
  return (
    <SiteFrame>
      <PublicationJsonLd
        record={article}
        keywords={[
          "analyte identity",
          "elemental speciation",
          "total arsenic",
          "inorganic arsenic",
          "methylmercury",
          "food metallomics",
        ]}
      />
      <main className="publication-page">
        <PublicationHeader
          record={article}
          dek="An element name is not always an analyte definition. Total concentration, chemical species, oxidation state, and method-defined fraction can answer different toxicological and regulatory questions."
        />

        <article className="paper-body">
          <aside className="paper-abstract">
            <span>ABSTRACT</span>
            <p>
              Heavy-metal records are often organized under elemental names even when
              the reported analytes are not interchangeable. This analysis distinguishes
              total-element measurements from chemical species and operationally
              defined fractions, using arsenic and mercury to show why analyte identity
              affects toxicological interpretation, regulatory applicability, evidence
              synthesis, and conformity. It proposes a species-disciplined data model
              for contaminant standards.
            </p>
          </aside>

          <ArticleSection number="01" title="The periodic-table label is not enough">
            <p className="paper-lead">
              “Arsenic” can name an element, a family of compounds, a total-element
              measurement, or a particular species. Those meanings cannot be exchanged
              simply because they share a symbol.
            </p>
            <p>
              Toxicity, bioavailability, metabolism, and regulatory treatment may
              differ among chemical forms. An elemental total can be a valuable
              screening measure, but it may not identify the portion that a health-
              based interpretation or legal limit addresses. Conversely, a
              species-specific method may not describe the total elemental burden.<Cite ids={["arsenic"]} />
            </p>
            <p>
              The same discipline applies beyond arsenic. Total mercury and
              methylmercury are related but distinct measurands. Chromium species can
              carry different toxicological meaning. A standards system must know
              whether it is regulating an element, a species, a sum of defined
              species, or a method-dependent fraction.
            </p>
          </ArticleSection>

          <ArticleSection number="02" title="Total and species answer different questions">
            <p>
              A total-element method commonly destroys or transforms the original
              chemical forms during digestion and measures the element after that
              preparation. The result answers how much of the element was recovered
              under the method. It does not reconstruct how that element was
              distributed among chemical species in the intact sample.<Cite ids={["eam"]} />
            </p>
            <p>
              Speciation requires separation and identification that preserve or
              account for chemical form. FDA’s method for arsenic species in rice and
              rice-containing foods uses chromatographic separation coupled to
              ICP-MS and defines inorganic arsenic as the sum of arsenite and
              arsenate, while also determining selected methylated species. That
              analyte definition is much more specific than “arsenic.”<Cite ids={["speciation"]} />
            </p>
            <blockquote>
              A total result is not an inferior species result. It is a different
              result with a different scope.
            </blockquote>
          </ArticleSection>

          <ArticleSection number="03" title="The method participates in analyte identity">
            <p>
              Some analytes are operationally defined: what is measured depends on
              extraction, digestion, separation, detection, calibration, and
              calculation rules. Recovery can vary by species and matrix. Species may
              interconvert during preparation. Chromatographic interferences may be
              matrix-specific. The method therefore does more than produce a number;
              it helps define the quantity to which the number refers.<Cite ids={["vim"]} />
            </p>
            <div className="paper-principles">
              <div><b>Elemental scope</b><p>State whether the result is total, dissolved, extractable, or otherwise fraction-defined.</p></div>
              <div><b>Species scope</b><p>Name each chemical species included and the rule for any reported sum.</p></div>
              <div><b>Method scope</b><p>Retain extraction, separation, detection, performance, and matrix applicability.</p></div>
              <div><b>Calculation scope</b><p>State whether results are expressed as the element, compound, ion, or another defined equivalent.</p></div>
            </div>
            <p>
              A database that stores only “metal,” value, and unit loses the
              distinction at ingestion. It cannot reliably recover that distinction
              later from the article title or instrument name.
            </p>
          </ArticleSection>

          <ArticleSection number="04" title="Substitution creates false certainty">
            <p>
              The most tempting shortcut is to compare a total-element result with a
              species-specific requirement. Depending on the direction of
              substitution, this may be presented as conservative. But conservatism
              does not make two analytes identical, and it does not answer whether
              the substituted measurement is authorized for conformity.
            </p>
            <p>
              A total result may serve as a governed screen when the total is below a
              species-specific maximum, because the species cannot exceed the total
              under a valid mass balance. Even then, the standard must explicitly
              authorize the screen, define method performance, and specify what
              happens when the screen does not resolve conformity. The laboratory
              should not invent that policy at the reporting stage.
            </p>
            <p>
              The reverse substitution is generally more problematic: a measured
              subset cannot establish the unmeasured total. A species-specific result
              also cannot be generalized to unmeasured species without an explicit,
              evidence-based rule.
            </p>
          </ArticleSection>

          <ArticleSection number="05" title="A species-disciplined standards architecture">
            <p>
              Evidence records and certification cells should use the same identity
              discipline while remaining separate systems. The evidence index stores
              what each source measured. The program states what each requirement
              regulates. A comparison is permitted only when the identities align or
              a published read-across rule applies. Codex’s general contaminant standard likewise identifies the contaminant and commodity covered by a requirement.<Cite ids={["codex"]} />
            </p>
            <ol className="paper-sequence">
              <li><span>1</span><div><b>Name</b><p>Assign an unambiguous analyte identifier, not only a display label.</p></div></li>
              <li><span>2</span><div><b>Define</b><p>State included species, fractions, expression basis, and any calculated sum.</p></div></li>
              <li><span>3</span><div><b>Bind</b><p>Link the analyte definition to eligible methods and matrix-performance requirements.</p></div></li>
              <li><span>4</span><div><b>Govern substitution</b><p>Publish screening and read-across rules instead of relying on ad hoc interpretation.</p></div></li>
              <li><span>5</span><div><b>Preserve</b><p>Keep native source terminology alongside the normalized identity and mapping rationale.</p></div></li>
            </ol>
          </ArticleSection>

          <ArticleSection number="06" title="Conclusion">
            <p className="paper-lead">
              Granular analyte identity is not needless complexity. It is what keeps a
              precise-looking number from answering a question that was never measured.
            </p>
            <p>
              Total-element analysis, speciation, and operational fractions each have
              legitimate roles. Authority comes from naming those roles, retaining
              the method-defined boundaries, and preventing an evidence or
              certification system from exchanging one analyte for another without a
              visible rule.
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

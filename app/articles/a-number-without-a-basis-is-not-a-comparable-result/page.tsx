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

const article = publications[3];

const references: PublicationReference[] = referenceData;
const Cite = createCite(references);

export async function generateMetadata(): Promise<Metadata> {
  return publicationMetadata(article);
}

export default function ReportingBasisArticle() {
  return (
    <SiteFrame>
      <PublicationJsonLd
        record={article}
        keywords={[
          "measurement comparability",
          "reporting basis",
          "food contaminants",
          "sample preparation",
          "moisture basis",
          "elemental analysis",
        ]}
      />
      <main className="publication-page">
        <PublicationHeader
          record={article}
          dek="The concentration is only the visible end of a measurement. Product identity, edible portion, preparation state, moisture basis, units, sampling, and method determine what that number can legitimately be compared with."
        />

        <article className="paper-body">
          <aside className="paper-abstract">
            <span>ABSTRACT</span>
            <p>
              Elemental concentrations appear comparable when they share a unit, but
              the same unit can describe materially different measurands. This
              analysis explains why product form, edible portion, preparation,
              moisture, homogenization, analytical portion, and regulatory basis must
              travel with a result. It proposes a minimum comparability record for
              evidence indexes and contaminant standards.
            </p>
          </aside>

          <ArticleSection number="01" title="The unit does not define the result">
            <p className="paper-lead">
              Two values expressed in the same mass-per-mass unit are not necessarily
              measurements of the same thing.
            </p>
            <p>
              One value may describe a dry powder as sold; another may describe the
              same product reconstituted according to label directions. One may
              represent the drained edible portion; another the entire container.
              One may be corrected to dry matter; another may retain native moisture.
              The numerals and units can look compatible while the measured
              quantities are not.
            </p>
            <p>
              Metrology starts with the measurand—the quantity intended to be
              measured. For food contaminants, the measurand cannot be adequately
              specified by naming an element and a unit. Product matrix, state,
              portion, and analytical definition are part of the quantity.<Cite ids={["vim"]} />
            </p>
          </ArticleSection>

          <ArticleSection number="02" title="Product state is a scientific variable">
            <p>
              Food moves through states that change concentration without necessarily
              changing the absolute amount of an element in the source material.
              Drying removes water. Reconstitution adds it. Draining removes liquid
              that may contain a different analyte concentration than the retained
              solids. Cooking can add water, remove water, or redistribute material
              between food and cooking medium.
            </p>
            <p>
              Regulatory instruments therefore attach limits to defined states. EU
              contaminant rules, for example, distinguish products as placed on the
              market from products ready to use after reconstitution and require
              processing, dilution, or concentration factors to be justified when a
              specific limit is absent for a processed form. The basis is part of the
              rule, not an after-the-fact conversion preference.<Cite ids={["eu"]} />
            </p>
            <blockquote>
              A conversion can aid interpretation. It cannot silently replace the
              native product state that gave a value its legal or scientific meaning.
            </blockquote>
          </ArticleSection>

          <ArticleSection number="03" title="Edible portion and preparation define the sample">
            <p>
              Before an instrument measures anything, someone decides what counts as
              the sample. Rind may be removed or retained. A canned product may be
              drained or analyzed with its liquid. A powder may be prepared with a
              specified volume of water. Those decisions define the population to
              which the result speaks.
            </p>
            <p>
              FDA’s Elemental Analysis Manual gives product-specific edible-portion
              instructions and separate procedures for homogenization.<Cite ids={["edible"]} /> The emphasis
              is consequential: a representative analytical portion can be obtained
              only after the analytical sample is made sufficiently homogeneous for
              the portion size used. Otherwise, instrument precision may conceal
              sample-level non-representativeness.<Cite ids={["homogenization"]} />
            </p>
            <div className="paper-principles">
              <div><b>Identity</b><p>Name the exact food, formulation class, and physical form represented.</p></div>
              <div><b>Portion</b><p>State what was removed, drained, retained, combined, or prepared.</p></div>
              <div><b>Homogenization</b><p>Record how the analytical sample became suitable for representative subsampling.</p></div>
              <div><b>Analytical portion</b><p>Retain the mass or volume actually taken into the method.</p></div>
            </div>
          </ArticleSection>

          <ArticleSection number="04" title="Normalization creates assumptions">
            <p>
              Converting from dry to wet basis, from concentrate to prepared product,
              or from serving to mass can be mathematically straightforward. The
              evidentiary question is whether the necessary factor was measured,
              reported, imputed from a label, or borrowed from another source.
            </p>
            <p>
              A measured moisture fraction and an assumed category-average moisture
              fraction do not carry the same uncertainty. Neither should overwrite
              the source value. A rigorous index preserves the native record, stores
              the transformation as a separate operation, names the factor, and
              marks whether that factor was source-reported or inferred.
            </p>
            <ol className="paper-sequence">
              <li><span>1</span><div><b>Preserve</b><p>Keep the source-reported value, unit, basis, and product state unchanged.</p></div></li>
              <li><span>2</span><div><b>Declare</b><p>State the target basis and why comparison requires it.</p></div></li>
              <li><span>3</span><div><b>Transform</b><p>Record the formula, factor, provenance, and direction of conversion.</p></div></li>
              <li><span>4</span><div><b>Qualify</b><p>Carry forward the uncertainty and any limitation created by the transformation.</p></div></li>
            </ol>
          </ArticleSection>

          <ArticleSection number="05" title="The minimum comparability record">
            <p>
              Evidence should not enter a pooled distribution merely because a parser
              can align the units. Before aggregation, the record should resolve at
              least the analyte, matrix, product form, edible portion, preparation
              state, reporting basis, sampling unit, analytical portion, method, and
              treatment of non-detects. Codex’s general contaminant standard likewise specifies the commodity and portion to which a maximum level applies.<Cite ids={["codex"]} />
            </p>
            <p>
              A standard needs the same discipline. The conformity cell must state
              the product identity and native basis to which the requirement applies.
              If a laboratory reports on a different basis, the conversion rule and
              responsibility for the supporting factor must be known before the
              result can be judged.
            </p>
          </ArticleSection>

          <ArticleSection number="06" title="Conclusion">
            <p className="paper-lead">
              Comparability is not a visual property of a spreadsheet. It is a claim
              that two results describe sufficiently aligned measurands.
            </p>
            <p>
              Preserving native basis may make a dataset less tidy. That is a sign of
              scientific honesty, not a defect. A useful evidence system makes
              differences visible, permits justified transformations, and refuses to
              manufacture comparability by deleting the context that gives each
              number meaning.
            </p>
          </ArticleSection>
        </article>

        <PublicationFooter
          record={article}
          references={references}
          referenceStyle="apa"
          referenceOrder="citation"
        />
      </main>
    </SiteFrame>
  );
}

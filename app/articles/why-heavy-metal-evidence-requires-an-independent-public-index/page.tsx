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

const article = publications[0];

const references: PublicationReference[] = referenceData;
const Cite = createCite(references);

export async function generateMetadata(): Promise<Metadata> {
  return publicationMetadata(article);
}

export default function IndependentIndexArticle() {
  return (
    <SiteFrame>
      <PublicationJsonLd
        record={article}
        keywords={[
          "heavy metals",
          "evidence index",
          "certification governance",
          "data provenance",
          "institutional independence",
        ]}
      />
      <main className="publication-page">
        <PublicationHeader
          record={article}
          dek="Certification becomes defensible only when the evidence it cites can be examined without passing through the certification decision itself. Independence is therefore a property of the data architecture—not a slogan attached to a brand."
        />

        <article className="paper-body">
          <aside className="paper-abstract">
            <span>ABSTRACT</span>
            <p>
              Heavy-metal occurrence evidence and certification decisions answer
              different questions. This analysis sets out why the literature record
              should remain public, source-resolving, and structurally independent
              from the conformity system that applies a standard. It describes the
              minimum architecture required for provenance, correction, versioning,
              and one-way citation across an evidence index, a certification program,
              and the institution that governs both.
            </p>
          </aside>

          <ArticleSection number="01" title="The institutional problem">
            <p className="paper-lead">
              A certification program can be technically demanding and still be
              epistemically weak. The weakness appears when the program controls the
              evidence record used to justify its own limits, selects favorable
              findings without a visible search history, or changes the source base
              without leaving a durable public trace.
            </p>
            <p>
              In that arrangement, an outsider cannot distinguish a conclusion
              derived from the literature from a conclusion selected for the needs
              of the certification program. The problem is not automatically fraud or
              poor intent. It is a structural conflict: one surface is asked to
              describe the evidence and defend a commercial conformity decision at
              the same time.
            </p>
            <p>
              Heavy-metal evidence makes this especially consequential. Measurements
              vary by matrix, product form, geography, analyte species, laboratory
              method, reporting basis, detection limit, and sampling design. A single
              concentration copied from a paper is not a standard and may not even be
              comparable with the next concentration in the table. The evidence
              system must retain enough context for those differences to remain visible.
            </p>
          </ArticleSection>

          <ArticleSection number="02" title="The independent public index">
            <p>
              An independent index is a public evidence layer with a deliberately
              narrow mandate. It may report what a source measured, how the work was
              performed, which population or product was studied, what regulatory
              instrument applies, and where uncertainty remains. It may correct its
              extraction or interpretation. It may not publish a certification limit,
              endorse a certification decision, or expose private program data.
            </p>
            <div className="paper-principles">
              <div><b>Source resolution</b><p>Every consequential value resolves to a literature, regulatory, or dataset record.</p></div>
              <div><b>Method retention</b><p>Species, basis, units, matrix, sampling, and analytical method travel with the value.</p></div>
              <div><b>Revision history</b><p>Corrections and superseded interpretations remain attributable and dated.</p></div>
              <div><b>Non-endorsement</b><p>The index describes evidence without selecting a certification outcome.</p></div>
            </div>
            <p>
              The <a href="https://heavymetalindex.com/">Heavy Metal Index</a> implements this role as a source-led corpus. Its
              public function is to make occurrence, toxicology, methods, and
              regulatory material inspectable. Its scale is useful, but scale alone
              is not the authority signal. Authority comes from the path between a
              public statement and the record that supports it.<Cite ids={["hmi"]} />
            </p>
          </ArticleSection>

          <ArticleSection number="03" title="Independence is data topology">
            <p>
              Separate logos are not separation. A genuine boundary determines which
              system may read which data, which system may publish which claim, and
              the direction in which a citation may travel.
            </p>
            <blockquote>
              The certification program may cite the index for literature context.
              The index does not cite the certification program back and does not
              convert a program decision into evidence.
            </blockquote>
            <p>
              This one-way rule prevents a feedback loop in which certification
              status is treated as scientific validation and then re-enters the
              literature surface as support for the certification. It also protects
              the evidence index from brand-level operating records, failed
              applications, licensed-mark data, and certified-lot results that belong
              to a different data class.<Cite ids={["structure"]} />
            </p>
            <p>
              The Institute occupies a third position. It governs permissions,
              conflicts, versioning, review, mark use, and enforcement. It does not
              duplicate the program’s threshold tables or the index’s literature
              database. Institutional authority is exercised by maintaining the
              boundary and publishing the rules by which it can be audited.<Cite ids={["governance"]} />
            </p>
          </ArticleSection>

          <ArticleSection number="04" title="The provenance chain">
            <p>
              A defensible evidence statement should be reconstructable through a
              chain: source discovery, source record, extraction, normalization,
              interpretation, publication, and correction. Each transition needs a
              named method and a stable identifier.<Cite ids={["policies"]} />
            </p>
            <ol className="paper-sequence">
              <li><span>1</span><div><b>Discover</b><p>Record the search route and the source considered, including exclusions that affect scope.</p></div></li>
              <li><span>2</span><div><b>Extract</b><p>Preserve the reported value with its units, species, basis, matrix, method, and source location.</p></div></li>
              <li><span>3</span><div><b>Normalize</b><p>Apply transparent conversions without erasing the native reported record.</p></div></li>
              <li><span>4</span><div><b>Publish</b><p>Expose the evidence statement with a stable route back to its source and methods.</p></div></li>
              <li><span>5</span><div><b>Correct</b><p>Amend errors through a dated record rather than silently replacing the historical claim.</p></div></li>
            </ol>
            <p>
              This structure permits disagreement without forcing trust. A reader may
              contest an inclusion decision, conversion, or interpretation at the
              exact point where it occurred. That is more valuable than a generic
              assurance that experts reviewed the work.
            </p>
          </ArticleSection>

          <ArticleSection number="05" title="What the architecture prevents">
            <p>
              The separation model is designed to prevent three recurring failures.
              First, it prevents cherry-picked literature from becoming an invisible
              threshold rationale. Second, it prevents private performance data from
              quietly rewriting the public picture of a market. Third, it prevents a
              certification mark from being mistaken for a scientific conclusion
              about a product’s total safety.
            </p>
            <p>
              The model does not eliminate judgment. It makes judgment locatable. A
              source selection belongs to the index method. A standard-setting choice
              belongs to the program method. A conflict, override, or enforcement
              action belongs to the institutional record. Concentrated authority can
              then be disclosed, reviewed, and—where policy requires—overruled.
            </p>
          </ArticleSection>

          <ArticleSection number="06" title="Conclusion">
            <p className="paper-lead">
              A heavy-metal standard should not ask the public to trust a private
              summary of public evidence. The evidence should remain independently
              inspectable, and the certification decision should be published as a
              separate normative act with its own method and accountability.
            </p>
            <p>
              The resulting system is deliberately less convenient than a single
              blended database. That inconvenience is a governance control. It keeps
              description separate from decision, evidence separate from conformity,
              and scientific disagreement separate from mark administration. Those
              boundaries are what make a traceable standard possible.
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

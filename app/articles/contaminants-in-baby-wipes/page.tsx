import type { Metadata } from "next";
import { SiteFrame } from "../../site-chrome";
import { publications } from "../../site-data";
import {
  ArticleSection,
  PublicationFooter,
  PublicationHeader,
  PublicationJsonLd,
  publicationMetadata,
} from "../article-tools";

function requireArticle() {
  const found = publications.find((item) => item.identifier === "ICS-ER-2026-001");
  if (!found) {
    throw new Error("ICS-ER-2026-001 is not registered");
  }
  return found;
}

const article = requireArticle();

export async function generateMetadata(): Promise<Metadata> {
  return publicationMetadata(article);
}

const directRows = [
  ["Phenoxyethanol", "Baby wipe (named sample)", "8368 µg/g (max)", "Whole wipe", "20 products; present in all", "Celeiro 2015", "Abstract prints 800 µg/g; conflict retained"],
  ["Methylparaben (as acid)", "Baby wipe", "3017 µg/g", "Whole wipe", "NR", "Celeiro 2015", "Expressed as acid; not lotion basis"],
  ["Methylparaben", "Baby wipes", "GM 4914; median 3709; 7.6 to 332,237 ng/g", "Wet weight", "50; detection 100%", "Rocha 2020", "Compliance and intake claims held"],
  ["Sodium benzoate", "Wet tissue (expressed liquid)", "200 to 3500 ppm", "Lotion", "62; in 46", "Bae 2018", "Lotion basis excludes substrate"],
  ["Benzoic acid", "Wet wipe (external-skin use)", "0.29 to 1.28 mg/g", "Whole wipe", "105; in 11%", "Pack 2021", "Not all baby wipes; model excluded"],
  ["Methylisothiazolinone + methylchloroisothiazolinone", "Wet tissue (expressed liquid)", "MIT 140 ppm; MCIT 5 ppm", "Lotion", "one sample", "Bae 2018", "Single co-occurring sample"],
  ["Diethyl phthalate", "Baby wipe", "55.5 µg/g", "Whole wipe", "18/20 had phthalates; DEP in 80%", "Celeiro 2015", "Named-sample value, not a limit"],
  ["Di(2-ethylhexyl) phthalate", "Baby wipe", "0.161 µg/g", "Whole wipe", "NR", "Celeiro 2015", "Named-sample value"],
  ["Benzyl alcohol", "Baby wipe", "2446 µg/g", "Whole wipe", "NR", "Celeiro 2015", "Fragrance-free sample excepted"],
  ["Galaxolide (musk)", "Baby wipe", "10.8 µg/g", "Whole wipe", "NR", "Celeiro 2015", "Musk panel-count wording conflict noted"],
  ["30-PFAS panel", "Baby wipes", "No detections", "2.3 ng/sample capability", "denominator 18 vs 19 (held)", "Consumer Reports 2026", "Not peer reviewed; not evidence of absence"],
  ["Microfiber release (water)", "Commercial nonwoven", "1 to 44 mg/g; 33,000 to 424,000 per g", "Laboratory release", "15 products", "Kwon 2022", "Not plastic-specific; not a baby-wipe sample; one maximum held"],
];

const metalRows = [
  ["Antimony", "40.6, 61.3, 70.6", "Detected in 12 of 24; 187.86 to 19,558.35; highest labeled rayon", "Numeric in 20 of 21; 15.02 to 450.45", "Solution 695.40; fiber 565.46, 537.86, and 476.69; packaging 0.03 and 0.04", "Oxidation state"],
  ["Lead", "0.4, 0.8, 1.4", "Detected in six; 7.23 to 55.67", "Not detected; row unit not adopted", "Solution 3.10; fiber 3.11 and 0.29; packaging 3.20 and 3.16, with a conflicting sentence", "None beyond the total"],
  ["Arsenic, total", "0.0 in all three", "Detected in the three United States sheets; 47.14 to 71.75", "Not detected; row unit not adopted", "Solution 11.80; fiber 0.34; packaging 1.01", "Inorganic arsenic"],
  ["Mercury, total", "0.0", "Not detected", "Not detected; row unit not adopted", "Solution 2.90; fiber 0.63 and 0.67", "Methylmercury"],
  ["Cadmium", "0.0", "Not detected", "Not detected; row unit not adopted", "Solution 0.20, 0.20, and 0.30; fiber 0.08, below the stated quantification limit; packaging 0.13", "None beyond the total"],
  ["Chromium, total", "0.5 to 0.6", "Not in panel", "Not read", "Not in results", "Hexavalent chromium"],
  ["Nickel", "Not in panel", "Detected in two; 261.26 and 1,242.63", "Not read", "Solution 53.40 or 20.20; fiber 28.46 or 10.53; packaging 3.60", "Release per unit area"],
  ["Tin", "Not in panel", "Not in panel", "Not read", "Not in panel", "Total tin and organotin species"],
  ["Aluminum", "Not in panel", "Not in panel", "Not read", "Not in panel", "All forms"],
];

const instrumentRows = [
  ["EU Regulation (EC) No 1223/2009", "Regulation", "Ingredient prohibition; trace allowance without a figure", "None", "None", "None", "None", "None", "None"],
  ["Korea safety standard, Article 6(2)", "Government standard, for unintentional traces", "Content, µg/g", "20 (50 in clay powders)", "10", "1", "5", "10 (30 color makeup, 35 eye makeup)", "10"],
  ["Health Canada guidance, section 4", "Guidance", "Content, ppm", "10", "3", "1", "3", "None", "5"],
  ["BVL 2017 orientation values", "Orientation value", "Content, mg/kg, cosmetics in general", "2.0", "0.5", "0.1", "0.1", "None", "0.5"],
  ["Washington RCW 70A.560.020(2)", "State statute", "Content, ppm", "1", "None", "None", "None", "None", "None"],
  ["21 CFR 700.13", "Federal regulation", "Content, ppm", "None", "None", "Below 1", "None", "None", "None"],
  ["OEKO-TEX STANDARD 100, Annex 4, class I", "Private certification", "Extractable, mg/kg", "0.2", "0.2", "0.02", "0.1", "1.0", "30.0"],
];

function EvidenceTable({
  caption,
  headers,
  rows,
}: {
  caption: string;
  headers: string[];
  rows: string[][];
}) {
  return (
    <div className="paper-table-wrap">
      <table className="paper-table">
        <caption>{caption}</caption>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header} scope="col">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.join("|")}>
              {row.map((cell, index) => (
                <td key={`${cell}-${index}`}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const references = [
  { label: "Heavy Metal Index. Contaminants in baby wipes beyond the metal panel (2026). Non-metal synthesis ported here. No DOI is registered for that page.", href: "https://heavymetalindex.com/synthesis/contaminants-in-baby-wipes-beyond-metals" },
  { label: "Heavy Metal Index. Heavy metals in baby wipes.", href: "https://doi.org/10.83376/hmi.heavy-metals-in-baby-wipes" },
  { label: "Heavy Metal Index. Antimony in baby products. Wipe-relevant antimony only is drawn from this page.", href: "https://doi.org/10.83376/hmi.antimony-in-baby-products" },
  { label: "Celeiro et al. (2015). Fragrance allergens, musks, phthalates, and preservatives in baby wipes. Journal of Chromatography A.", href: "https://doi.org/10.1016/j.chroma.2015.01.049" },
  { label: "Bae et al. (2018). Safety of commercial wet tissues. Expressed-liquid survey.", href: "https://doi.org/10.13103/JFHS.2018.33.1.83" },
  { label: "Pack et al. (2021). Preservatives in wet wipes sold for external skin use.", href: "https://doi.org/10.1016/j.scitotenv.2021.146829" },
  { label: "Rocha et al. (2020). Parabens in commercial baby wipes from Brazil.", href: "https://doi.org/10.21577/0100-4042.20170494" },
  { label: "Alanazi et al. (2023). Methylisothiazolinone and methylchloroisothiazolinone in leave-on baby wet wipes. Concentration rows held.", href: "https://doi.org/10.3390/molecules28041760" },
  { label: "China Association for Quality Promotion of Consumer Products Safety (2 April 2026). Monitoring report on baby wet wipes sold online.", href: "https://cpqs.org.cn/archives/3229" },
  { label: "Vanneste et al. (2013). Methylisothiazolinone in a mislabeled household wet wipe. Adjacent matrix.", href: "https://doi.org/10.1111/cod.12143" },
  { label: "Regulation (EC) No 1223/2009 on cosmetic products. Context only. No current-law verification was performed for this review.", href: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32009R1223" },
  { label: "Yu et al. (2016). Label survey of potential allergens in diaper wipes.", href: "https://doi.org/10.1097/DER.0000000000000177" },
  { label: "Marinho et al. (2021). São Paulo label and pH survey of wet wipes.", href: "https://doi.org/10.1016/j.abd.2020.09.011" },
  { label: "Hamann (2019). Ingredient-list screen of leave-on products, including baby wipes.", href: "https://doi.org/10.1097/DER.0000000000000438" },
  { label: "Mangır and Özkaya (2026). Istanbul label survey, wet-wipe subgroup.", href: "https://doi.org/10.1111/cod.70207" },
  { label: "Newton et al. (2022). Label survey of feminine hygiene wipes. Adjacent matrix.", href: "https://doi.org/10.1097/jw9.0000000000000060" },
  { label: "Isufi et al. (2025). Contact allergens in children, 2010 to 2024. Context, including nickel sulfate prevalence.", href: "https://doi.org/10.1111/cod.14753" },
  { label: "Lai et al. (2025). Phthalates in disposable diaper inner layers. Adjacent matrix.", href: "https://doi.org/10.3390/toxics13030218" },
  { label: "Park et al. (2019). Phthalates and package-air volatile organic compounds in sanitary pads and diapers. Adjacent matrix.", href: "https://doi.org/10.1016/j.reprotox.2019.01.005" },
  { label: "Consumer Reports (11 June 2026). Consumer-laboratory report of a PFAS panel in baby wipes. Not peer reviewed. Denominator held.", href: "https://www.consumerreports.org/babies-kids/baby-wipes/pfas-in-baby-wipes-safety-a2172742579/" },
  { label: "Wicks et al. (2025). PFAS in reusable feminine hygiene products. Adjacent matrix.", href: "https://doi.org/10.1021/acs.estlett.5c00553" },
  { label: "Zhou et al. (2023). PFAS in personal hygiene products. Adjacent matrix.", href: "https://doi.org/10.1021/acs.est.2c08912" },
  { label: "Kwon et al. (2022). Microfiber shedding from nonwoven materials, including wipes.", href: "https://doi.org/10.1007/s11356-022-20053-z" },
  { label: "Nacci et al. (2025). Fibers and additives in disposable wet wipes.", href: "https://doi.org/10.1016/j.jaap.2025.107200" },
  { label: "Ó Briain et al. (2020). Wet wipes as a source of white microplastic fibers.", href: "https://doi.org/10.1016/j.watres.2020.116021" },
  { label: "Washington State Department of Ecology. Metals in Children's and Consumer Products and Packaging. Publication 14-04-014 (2014, contact revision 2021).", href: "https://apps.ecology.wa.gov/publications/SummaryPages/1404014.html" },
  { label: "Choi, Song, and Kim (2016). Heavy metals on the nonwoven in wet wipes, ICP-MS.", href: "https://doi.org/10.12925/jkocs.2016.33.1.195" },
  { label: "Göçer (2025). Baby wet wipes, solution, fiber, and packaging. Master's thesis, İstanbul Üniversitesi-Cerrahpaşa. YÖK Tez No 988276.", href: "https://tez.yok.gov.tr" },
  { label: "Washington State Department of Ecology (2012). Quality Assurance Project Plan 12-07-021.", href: "https://apps.ecology.wa.gov/publications/documents/1207021.pdf" },
  { label: "Washington State Department of Ecology (2012). Quality Assurance Project Plan 12-07-022.", href: "https://apps.ecology.wa.gov/publications/documents/1207022.pdf" },
  { label: "Washington State Department of Ecology (2012). Quality Assurance Project Plan 12-07-023.", href: "https://apps.ecology.wa.gov/publications/documents/1207023.pdf" },
  { label: "Washington State Department of Ecology (2012). Quality Assurance Project Plan 12-07-024.", href: "https://apps.ecology.wa.gov/publications/documents/1207024.pdf" },
  { label: "Biver, Turner, and Filella (2021). Antimony release from polyester textiles into artificial sweat. Adjacent textile matrix.", href: "https://doi.org/10.1016/j.yrtph.2020.104824" },
  { label: "Borca, Huthwelker, and Filella (2025). Antimony speciation in consumer plastics and synthetic textiles. Adjacent matrix.", href: "https://doi.org/10.1016/j.jes.2024.02.006" },
  { label: "Nyamukamba et al. (2023). Selected substances in disposable diapers, South Africa. Adjacent matrix.", href: "https://doi.org/10.3390/ijerph20021023" },
  { label: "IARC Monographs Volume 131 (2023). Trivalent and pentavalent antimony.", href: "https://www.ncbi.nlm.nih.gov/books/NBK598316/" },
  { label: "ATSDR (October 2019). Toxicological Profile for Antimony and Compounds.", href: "https://www.atsdr.cdc.gov/toxprofiledocs/" },
  { label: "Health Canada. Guidance on heavy metal impurities in cosmetics, section 4.", href: "https://www.canada.ca/en/health-canada/services/consumer-product-safety/reports-publications/industry-professionals/guidance-heavy-metal-impurities-cosmetics.html" },
  { label: "Federal Office of Consumer Protection and Food Safety (BVL) (2017). Technically avoidable heavy metal contents in cosmetic products.", href: "https://doi.org/10.1007/s00003-016-1044-2" },
  { label: "Revised Code of Washington 70A.560.020.", href: "https://app.leg.wa.gov/RCW/default.aspx?cite=70A.560.020" },
  { label: "21 CFR 700.13. Mercury in cosmetics.", href: "https://www.ecfr.gov/current/title-21/chapter-I/subchapter-G/part-700/subpart-B/section-700.13" },
  { label: "Korea cosmetic safety standard, Article 6(2), as reproduced for the metals companion.", href: "https://kcia.or.kr/cid/cs/law.php" },
  { label: "OEKO-TEX STANDARD 100, Annex 4 limit-value document cited by the metals companion. The antimony companion did not examine this annex.", href: "https://www.oeko-tex.com/importedmedia/downloadfiles/OEKO-TEX_STANDARD_100_Limit_Values_and_Individual_Substances_According_to_Appendices_4_5_EN_DE.pdf" },
  { label: "Lavender et al. (2012). Newborn skin-hydration randomized trial. Not an absorption study.", href: "https://doi.org/10.1186/1471-2431-12-59" },
  { label: "Carr et al. (2019). Diaper dermatitis prevalence. Context only.", href: "https://doi.org/10.1111/pde.14047" },
  { label: "Chang and Nakrani (2014). Six children with allergic contact dermatitis attributed to methylisothiazolinone in wet wipes.", href: "https://doi.org/10.1542/peds.2013-1453" },
  { label: "Admani, Matiz, and Jacob (2014). Perianal dermatitis attributed to methylisothiazolinone in wet wipes.", href: "https://doi.org/10.1111/pde.12328" },
  { label: "Boyapati et al. (2013). Hand dermatitis attributed to methylisothiazolinone in baby wipes.", href: "https://doi.org/10.1111/ajd.12062" },
  { label: "Cahill, Toholka, and Nixon (2014). Methylisothiazolinone in baby wipes, Australian letter.", href: "https://doi.org/10.5694/mja13.10946" },
  { label: "Warshaw et al. (2017). North American Contact Dermatitis Group wet-wipe allergens, 2011 to 2014.", href: "https://doi.org/10.1097/DER.0000000000000248" },
  { label: "Guin, Kincannon, and Church (2001). Preservative-related hand eczema from baby wipes. Adult series.", href: "https://doi.org/10.1053/ajcd.2001.28052" },
  { label: "Domingos-Ancement, Misery, and Deydier (2025). Hexamidine diisethionate case. Adult.", href: "https://doi.org/10.1111/cod.70055" },
];

export default function ContaminantsInBabyWipesReview() {
  return (
    <SiteFrame>
      <PublicationJsonLd
        record={article}
        keywords={[
          "baby wipes",
          "wet wipes",
          "preservatives",
          "methylisothiazolinone",
          "formaldehyde",
          "parabens",
          "fragrance allergens",
          "phthalates",
          "PFAS",
          "microfibers",
          "heavy metals",
          "antimony",
          "dermal exposure",
        ]}
      />
      <main className="publication-page">
        <PublicationHeader
          record={article}
          dek="Preservatives, fragrance allergens, phthalates, PFAS, microfibers, and heavy metals have each been measured in wet wipes or wipe components. The record is uneven, much of it comes from adjacent products rather than infant wipes, and no study has measured how much of any of these crosses infant skin, so a concentration in a wipe is not yet a dose."
        />

        <article className="paper-body">
          <aside className="paper-abstract">
            <span>ABSTRACT</span>
            <p>
              This evidence review, ICS-ER-2026-001, covers what has been measured in wet wipes: preservatives and formaldehyde, fragrance allergens and musks, phthalates, per- and polyfluoroalkyl substances, microfibers, and heavy metals. Heavy metals are also recorded in the companion synthesis on the <a href="https://heavymetalindex.com/synthesis/heavy-metals-in-baby-wipes">Heavy Metal Index</a>, <a href="https://heavymetalindex.com/synthesis/heavy-metals-in-baby-wipes">Heavy metals in baby wipes</a> (<a href="https://doi.org/10.83376/hmi.heavy-metals-in-baby-wipes">10.83376/hmi.heavy-metals-in-baby-wipes</a>). The non-metal record is ported from <a href="https://heavymetalindex.com/synthesis/contaminants-in-baby-wipes-beyond-metals">Contaminants in baby wipes beyond the metal panel</a>. The record is real but uneven. The most complete direct chemistry on wipes marketed for infants comes from a single multi-analyte study. Several of the strongest preservative and phthalate datasets are on a lotion or an adjacent-product basis rather than a whole infant wipe. The one direct PFAS document is a consumer-laboratory report with an unresolved denominator. The clinical record of wipe-associated allergy is drawn mostly from older children and adults. Four metal datasets report on different analytical bases, and antimony is the only metal detected in all four. No study measures the fraction of any of these substances that crosses infant skin from a wipe, and none supplies together the transfer, frequency, contact, and absorption terms a dose would require. A concentration in a wipe is therefore not yet a dose. This review sets out what has been measured, in whose units, with what method constraints, and what measurements would close the gap. It ranks no products and proposes no limit.
            </p>
          </aside>

          <ArticleSection number="01" title="Scope">
            <p className="paper-lead">
              The question this review can answer is narrow: what has actually been measured in wet wipes, and what can those measurements, and only those measurements, support.
            </p>
            <p>
              It is not a market survey and not a risk assessment. It reports a held corpus as already synthesized on the Heavy Metal Index: what those documents measured, in their own units, with their own stated constraints. Every concentration below is traced to one of those syntheses. Where a synthesis marks a conflict, a model, or a hold, this review keeps that status. It does not supply a number the syntheses do not print.
            </p>
            <p>
              Three distinctions run through the non-metal record. The first separates an intentionally added ingredient, such as a declared preservative, from an unintended residue, such as a phthalate plasticizer. The second separates a declared ingredient on a label from a laboratory detection in a sample. A label establishes what a maker said it added, not how much is present. A detection establishes a concentration in a specimen, not a dose to a child. The third separates the material of the wipe, its fibers, from particles released by the wipe, which are a different measurement again.
            </p>
            <p>
              A baby wipe is also three objects: a nonwoven sheet, a liquid that wets it, and a package. Each can carry a metal by a different route. The metal datasets do not share a preparation, so a concentration in one is not interchangeable with a concentration in another, or with the unit in which a cosmetic or textile instrument is written.
            </p>
            <p>
              The record is geographically uneven and spread across more than a decade of sampling. Direct chemistry on wipes marketed for infants is thin. Several of the strongest chemical studies examine adult or household matrices, and several of the strongest clinical reports concern older children or adults. Those boundaries are marked wherever they apply.
            </p>
          </ArticleSection>

          <ArticleSection number="02" title="Preservatives and formaldehyde">
            <p>
              The most complete direct-wipe chemistry comes from a 2015 Galician study of 20 commercial products, 13 marketed as baby wipes and 7 as wet toilet papers, each weighed and extracted whole and analyzed by gas chromatography-mass spectrometry. Parabens there are expressed as acid, and concentrations refer to weighed whole-wipe material, not to expressed lotion or dry fiber. Phenoxyethanol was present in every one of the 20 products. The highest baby-wipe cell is reported in the data table as 8368 µg/g, a value that conflicts with the same paper&apos;s abstract figure of 800 µg/g and is therefore carried as moderate confidence with the conflict attached. Methylparaben reached 3017 µg/g as acid in one baby wipe, with ethylparaben at 704 and butylparaben at 600 µg/g as acid in the same sample, and propylparaben at 486 µg/g as acid in another. A set of branched-paraben identifications from the same tables is held, because the paper&apos;s text and its table disagree on which isomers were found. Those values are retained for audit only and are not settled evidence.
            </p>
            <p>
              A 2018 Korean survey of 62 commercial wet tissues analyzed the expressed liquid, explicitly excluding the nonwoven substrate, so its numbers are lotion-basis, not whole-wipe. It reported one sample in which methylchloroisothiazolinone at 5 ppm and methylisothiazolinone at 140 ppm co-occurred, cetylpyridinium chloride at 7 to 13 ppm in five products, sodium benzoate at 200 to 3500 ppm in 46 products, and methylparaben at 9 ppm in a single product, with propylparaben not detected. Its formaldehyde result, 0.069 to 1.796 µg/g in 59 of 62 products, is held because the abstract and body of the paper disagree on the lower bound, and its formaldehyde detection limits are printed in mg/L rather than on a product-mass basis. The expressed-liquid pH ranged from 4.0 to 8.2.
            </p>
            <p>
              A 2021 Korean study of 105 wet wipes intended for external skin use, which should not be described as 105 baby wipes, reports whole-wipe concentrations in mg/g separately from expressed-lotion concentrations in mg/L and warns against merging them. On the whole-wipe basis it detected iodopropynyl butylcarbamate at 0.003 to 0.055 mg/g in 22 percent of products, cetylpyridinium chloride at 0.003 to 0.64 mg/g in 30 percent, benzoic acid at 0.29 to 1.28 mg/g in 11 percent, phenoxyethanol at 0.02 to 3.65 mg/g in 8.6 percent, and caprylyl glycol at 0.27 to 0.39 mg/g in 2.9 percent. The isothiazolinones, benzisothiazolinone, and the parabens were not detected in either whole wipes or lotions. Its probabilistic exposure model is held separately and is discussed under dose below.
            </p>
            <p>
              A 2020 Brazilian study of 50 baby wipes, analyzed on a stated wet-weight basis, found methylparaben in every product, with a geometric mean of 4914 ng/g, a median of 3709 ng/g, and a range of 7.6 to 332,237 ng/g. Ethylparaben, propylparaben, and butylparaben had geometric means of 16.9, 44.1, and 2.5 ng/g and detection frequencies of 66, 94, and 70 percent. Benzylparaben was not detected. The sum of parabens had a geometric mean of 5348 ng/g, a figure that conflicts with the abstract&apos;s 5344 and is carried with that note. The paper&apos;s compliance assertion and its estimated daily intake are held, because the stated noncompliance arithmetic is incompatible in scale with the printed concentrations, and the dose figures are modeled rather than measured.
            </p>
            <p>
              Two sources are held in full. A 2023 Riyadh study of eight leave-on baby wet wipes reported methylisothiazolinone means from 0.1247 to 2.9090 ppm and methylchloroisothiazolinone means from 0.8295 to 3.1652 ppm, but its positive-count statements conflict between prose and table, several means fall below its own validated working range, and the product-versus-extract basis of the ppm figures is unclear. All of its concentration rows are held. A 2026 Chinese consumer-quality monitoring report, which is not a peer-reviewed study and whose own authors question the infant classification of two sampled items, reported formaldehyde in four anonymized samples at 42.8, 32.8, 71.8, and 7.7 mg/kg, methylisothiazolinone at 50.73 mg/kg in one sample and a censored result below 0.60 mg/kg with methylchloroisothiazolinone at 2.12 mg/kg in another, eleven phenoxyethanol cells in µg/g, methanol at 626.42 mg/kg in one sample, and ethanol at 52 and 268 µg/g with one censored entry below 33 µg/g. Its paraben and phthalate panels are reported as panel-level nondetections, which cannot be read as analyte-specific absence, and its narrative and annex disagree on how many formaldehyde results the report treats as above its comparator. No detection limits are recoverable from it.
            </p>
            <p>
              A separate 2013 analysis of a single household wipe, an adjacent rather than infant matrix, measured methylchloroisothiazolinone at 34 ppm and methylisothiazolinone at 26 ppm, a total of 60 ppm, in a product whose supplier had denied isothiazolinone content. It is a documented label-discordance example, not a frequency estimate.
            </p>
            <p>
              The held consolidation of the EU Cosmetics Regulation is context only. It requires a &quot;releases formaldehyde&quot; warning above a total released level of 0.001 percent, that is 10 ppm, restricts certain parabens in leave-on products for the diaper area of children under three (the regulation&apos;s text says nappy area), and permits the methylchloroisothiazolinone and methylisothiazolinone mixture and methylisothiazolinone only in rinse-off products. A releaser-warning level is neither a contamination figure nor a safety figure, and no current-law verification was performed.
            </p>
          </ArticleSection>

          <ArticleSection number="03" title="Fragrance allergens and musks">
            <p>
              Direct quantitative fragrance data again come mainly from the 2015 multi-analyte study, which reported nineteen targeted fragrance allergens across its samples: benzyl alcohol at 2446 µg/g in one baby wipe, limonene at 180 µg/g and linalool at 76.0 µg/g in another, hexylcinnamal at 60.1 µg/g, and the polycyclic musk galaxolide at 10.8 µg/g in a baby wipe and 21.4 µg/g in a wet toilet paper. One of its baby wipes was identified as fragrance-free and carried no fragrance cells, an exception that should be preserved against the abstract&apos;s blanket claim that all samples contained fragrance allergens.
            </p>
            <p>
              Everything else in this class is label evidence, which establishes declared composition and nothing more. A 2016 survey of 63 baby-wipe ingredient lists found fragrance declared in 21, botanical extracts in 60, methylisothiazolinone in 4, methylchloroisothiazolinone in 1, and parabens in 6. A 2021 São Paulo label survey of 42 products counted phenoxyethanol in 29, sodium benzoate in 16, methylparaben in 12, and methylisothiazolinone in 9. A 2019 North American survey of best-selling lists, analyzed at denominators of 31 and 39 after deduplication, found no list naming methylisothiazolinone, with phenoxyethanol in 14 and 20 and sodium benzoate in 20 and 23. A 2026 Istanbul in-store survey isolated a 25-product wet-wipe subgroup, 14 of them pediatric, and reported a mean of 1.4 declared fragrance ingredients, 0.9 declared preservatives, and an investigator-assigned allergen-load score of 3.4, which is a label score and not a concentration. A declared-ingredient count is not a concentration, an absorbed dose, or a clinical reaction rate, and a fragrance-free label cannot prove the absence of every sensitizer.
            </p>
          </ArticleSection>

          <ArticleSection number="04" title="Phthalates">
            <p>
              Direct baby-wipe phthalate measurements are confined to the 2015 multi-analyte study, which reported diethyl phthalate at 55.5 µg/g in one baby wipe, dibutyl phthalate at 0.176 µg/g, di(2-ethylhexyl) phthalate at 0.161 µg/g, and dicyclohexyl phthalate at 0.108 µg/g in named samples, with a higher diethyl phthalate value of 412 µg/g appearing in a wet toilet paper rather than a baby wipe. Five phthalate analytes were found across 18 of the 20 products, with diethyl phthalate in 80 percent.
            </p>
            <p>
              Two further phthalate studies are adjacent matrices and are reported separately for that reason. A 2025 Guangzhou study measured the skin-contact inner layer of diapers used by 66 children aged 0.1 to 4.0 years and reported median concentrations in ng/g of 252 for diethyl phthalate, 333 for diisobutyl phthalate, 948 for di-n-butyl phthalate, and 1670 for di(2-ethylhexyl) phthalate, with a summed median of 3420 ng/g at 100 percent detection. A 2019 six-country study of sanitary pads and diapers reported, in parts per billion on excised-sample weight, dibutyl phthalate at 52.1 to 7820.4 and di(2-ethylhexyl) phthalate at 5.5 to 197.4 in pads, and dibutyl phthalate at 13.4 to 1609.7 and di(2-ethylhexyl) phthalate at 12.6 to 62.8 in diapers, with benzyl butyl phthalate not detected. Its original table bodies are missing from the held rendering, so only its prose values are available. Neither diaper study is a baby-wipe measurement. The Chinese monitoring report&apos;s phthalate panel is a panel-level nondetection and does not establish analyte-specific absence.
            </p>
          </ArticleSection>

          <ArticleSection number="05" title="PFAS">
            <p>
              The only direct baby-wipe PFAS document is a 2026 consumer-laboratory report, not peer reviewed, which tested 30 individual PFAS and reported no detections at a stated capability of 2.3 nanograms per sample, an absolute per-sample mass. Its tested-product denominator is unresolved, with the source itself printing both 18 and 19 products in different places, so the finding is held, and it may be described only as reported nondetection across its panel. The per-sample capability cannot be converted to a concentration, and the source itself acknowledges that trace or unmeasured compounds could remain. The nondetection is not evidence that every PFAS compound is absent.
            </p>
            <p>
              Two peer-reviewed PFAS studies are adjacent matrices. A 2025 study of 59 reusable feminine-hygiene products reported targeted extractable PFAS, summed across 42 analytes, at a median of 380 ng/g with a range of 21.4 to 2200 ng/g in a purposively selected high-fluorine subset, alongside total-fluorine screening values reaching 77,000 ppm in some layers. Its fluorine cutoffs classify manufacturing practice and are not analytical or safety figures. A 2023 study of 91 personal-hygiene products reported mean summed PFAS, across 21 detected analytes, of 5.46 ng/g in pads, 0.39 in panty liners, below the quantitation limit in tampons, 4.72 in menstrual cups, 14.95 in diaper top layers, and 0.16 in a bactericidal liquid, with mean perfluorooctanoic acid of 11.68 ng/g in diaper top layers. A targeted-PFAS sum must be kept distinct from total fluorine, and an absolute mass per sample must be kept distinct from a mass-normalized concentration.
            </p>
          </ArticleSection>

          <ArticleSection number="06" title="Microfibers and microplastics">
            <p>
              Three kinds of measurement must be kept apart here: what the substrate is made of, what it sheds in a laboratory, and what is found in the environment. A 2022 laboratory-release study of 15 commercial nonwovens, which were not a baby-wipe market sample, measured waterborne release spanning, for example, 44 plus or minus 3 mg/g and 424,000 fibers per gram in one product and 1 plus or minus 1 mg/g and 33,000 fibers per gram in another, with airborne counts reported separately. Its single highest gravimetric value is held because the authors attribute it to retained lotion rather than fiber, and the shedding is not plastic-specific, since cellulosic and synthetic fibers were both counted. A 2025 study of 12 UK-market wipe types identified cellulose-based fibers in the flushable and biodegradable products and synthetic plus cellulosic fibers in conventional products, and reported approximate fiber dimensions, but it offered qualitative composition rather than released-particle burden, and one of its own conclusion sentences conflicts with its detailed tables and is held. A 2020 study of 17 purchased products, 11 of them wipes, identified polyethylene terephthalate, polypropylene, and cellulose among them and reported that two of four flushable products contained polyethylene terephthalate. Its environmental component found, for example, 1441 plus or minus 631.2 total microplastics per kilogram and 1323 plus or minus 651.8 white fibers per kilogram of intertidal sediment on one sampling occasion. Environmental abundance is a separate question from release during use, which is separate again from transfer to infant skin, for which the corpus holds no direct measurement.
            </p>
          </ArticleSection>

          <ArticleSection number="07" title="Other measured attributes">
            <p>
              Package-air volatile organic compounds were measured in the 2019 pad-and-diaper study by direct injection of 750 µL of headspace, a packaging-air measurement and not a body exposure, at a stated reporting level of 0.001 ppb per compound. The highest reported toluene in a pad package was 5.471 ppb, with lower values in diaper packages. The Chinese monitoring report&apos;s methanol and ethanol values appear above. Expressed-liquid pH was 4.0 to 8.2 in the 2018 Korean survey, and one product in a 2016 Korean official report carried a total bacterial count of 400,000 colony-forming units per gram with fungi not detected, which is a microbial-quality observation and not a chemical concentration. The direct United States baby-wipe volatile-organic-compound record remains a gap, discussed below.
            </p>
          </ArticleSection>

          <ArticleSection number="08" title="A selected direct-measurement table">
            <p>
              The following records are direct measurements on a single, compatible basis, chosen so that no row requires a conversion or a cross-matrix comparison to be read. Held and adjacent-matrix values are excluded from this table and are discussed in the prose above with their qualifications. Values are whole-wipe unless the matrix column says otherwise. Metal results are not in this table. They are reported on their own bases in the next section.
            </p>
            <EvidenceTable
              caption="No row in this table may be added to another, summed across classes, or converted to a per-wipe amount or a dose. NR means the source did not report that count."
              headers={["Analyte", "Product / matrix", "Printed value", "Basis", "n / detection", "Source", "Limitation"]}
              rows={directRows}
            />
          </ArticleSection>

          <ArticleSection number="09" title="Heavy metals">
            <p className="paper-lead">
              Four datasets have measured heavy metals in baby wipes or wipe parts. They answer four different questions, and antimony is the only metal detected in all four.
            </p>
            <p>
              The Washington State results are parts per million in components that had already screened positive by X-ray fluorescence. The Korean results are micrograms per liter in a digest of the sheet. The Chinese results are a per-liter antimony reading from an annex image, with no described preparation. The Turkish results are parts per billion of the solution that entered the instrument, with the squeezed liquid, the digested fiber, and the digested packaging kept apart. The table below sets them side by side without converting any of them. Products are identified only by the codes their authors assigned.
            </p>
            <h3>Washington State: screened components in parts per million</h3>
            <p>
              Publication 14-04-014, first published in 2014 and revised in 2021 to update contact details, screened children&apos;s and consumer products by X-ray fluorescence and sent components in which the screen found a metal of concern to a contract laboratory, which used inductively coupled plasma mass spectrometry and cold-vapor atomic absorption for mercury. These rows are a screened list, not a sample of wipes on the market. Across that screen, antimony was detected in 57 percent of 150 children&apos;s-product components. The report&apos;s frame of reference includes the Washington Children&apos;s Safe Products Act reporting trigger of 100 ppm for chemicals of high concern to children. That trigger is a manufacturer reporting trigger, not a health-based maximum, and this review does not apply it as a score for a wipe.
            </p>
            <p>
              Three wipe components were reported at 40.6, 61.3, and 70.6 ppm antimony, with lead at 0.4, 0.8, and 1.4 ppm and total chromium at 0.5 to 0.6 ppm. Arsenic, cadmium, and mercury are printed as 0.0 in those rows. The report does not identify the fiber, does not say whether the component was the sheet, the lotion, or both, and has no column for nickel, tin, or aluminum. It also states that hexavalent chromium analysis was outside the study, so the chromium figures are total chromium.
            </p>
            <p>
              The results report does not describe the digestion used on the wipe rows. The methods sentence cites four 2012 quality-assurance project plans, and each of those plans specifies microwave digestion by EPA 3052 with measurement by ICP-MS, or cold-vapor atomic absorption for mercury, with a reporting level of 1.0 ppm for antimony, arsenic, cadmium, and lead and 0.1 ppm for mercury. Chromium at 1.0 ppm appears only in Publications 12-07-023 and 12-07-024, and nickel appears in none of them. The plans record the intended method design. They do not state that a particular wipe row was digested that way. Because the results report does not apply the plans&apos; reporting levels to the wipe rows, lead at 0.4 and 0.8 ppm and chromium at 0.5 and 0.6 ppm are left as printed here, and a printed 0.0 is not restated as a value below 1.0 ppm.
            </p>
            <p>
              Packaging was analyzed separately. One moist-wipes package was reported at 95.8 ppm antimony, and one breast-wipes package at 38.0 ppm antimony, 0.6 ppm cadmium, 7.6 ppm chromium, and 30.8 ppm lead. Those results describe the packages.
            </p>
            <h3>Korea: digested sheets in micrograms per liter</h3>
            <p>
              Choi, Song, and Kim digested the nonwoven sheet of 24 wet wipes, three of them bought in the United States and the rest in Korea, in nitric and hydrofluoric acid by microwave, and measured arsenic, cadmium, lead, nickel, antimony, and thallium by ICP-MS, with mercury measured separately on a direct analyzer without digestion. Each result is the mean of three preparations, reported in micrograms per liter of the digest solution. A dash in their tables means not detected relative to the levels in their Table 4. In that study, 12 wet-wipe sheets were labeled rayon plus polyester and 5 were labeled rayon plus polyethylene terephthalate, while the rest carried labels of rayon alone, cotton, rayon with polyester and cotton, pulp with polypropylene, or no fiber statement. Those labels are what the authors printed. They are not a fiber analysis.
            </p>
            <p>
              Antimony was detected in 12 of the 24 sheets, from 187.86 ± 5.24 to 19,558.35 ± 3,537.3 µg/L, and the highest result belongs to the infant sheet labeled rayon alone (code ML). Lead was detected in six sheets, from 7.23 to 55.67 µg/L. Arsenic was detected only in the three United States sheets, from 47.14 to 71.75 µg/L. Nickel was detected in two sheets: 261.26 ± 5.14 µg/L in an infant sheet labeled rayon, polyester, and cotton, and 1,242.63 ± 43.71 µg/L in a United States sheet labeled cloth-like. The other twenty-two sheets had no detectable nickel. Cadmium, mercury, and thallium were not detected in any wet wipe. The mercury quantification level is internally inconsistent in the paper, printed as 0.80 µg/L in Table 4 and 0.08 µg/L in the methods paragraph, so the mercury nondetections carry that uncertainty.
            </p>
            <p>
              A content estimate requires a mass and a final volume, and the paper does not supply both unambiguously. Section 2.2 gives approximately 0.2 g of sample in 7 mL of 70 percent nitric acid and 1 mL of 50 percent hydrofluoric acid, after which the digest was transferred and diluted with 25 mL of water. It does not say the solution was made up to 25 mL. The metals companion calculates sheet concentrations from volume assumptions the authors did not state. This review does not adopt those reconstructions. They are not printed in the paper, they are not results, and they are not compared with any instrument here. The approximately 0.2 g is the mass placed in a digestion vessel, not the mass of a wipe a caregiver uses, and the 25 mL is water added to the digest, not a wipe&apos;s lotion load. Mask-pack results in the same paper are a separate table. The authors did not publish that split for the wet wipes, and this review does not carry mask-pack figures as wipe results.
            </p>
            <h3>China: a per-liter antimony reading from an annex image</h3>
            <p>
              On 2 April 2026 a monitoring report covered 21 baby wipes bought online, tested by a national textile and garment testing laboratory. The sample-by-sample results exist only as an annex image. Read from that image, total antimony on a per-liter label, taken as micrograms per liter, is numeric in 20 of the 21 columns, with stable low and high reads of 15.02 and 450.45 µg/L. One column is not detected. The narrative attributes that nondetection to a named product, which is not named here, and because the fiber cell for that column did not read clearly enough to adopt, the nondetection is not treated as a result for any fiber type. Lead, cadmium, arsenic, and mercury read as not detected, on a row whose unit could not be read clearly enough to adopt, and no column for nickel, tin, aluminum, or chromium was read.
            </p>
            <p>
              The report does not describe the preparation that produced the per-liter antimony figure. It is not the Korean digest, it is not a milligram-per-kilogram content, and the two per-liter datasets are therefore not averaged or compared as if they shared a method. The report states that the Chinese infant-wipe standards it consulted set no antimony figure, and that total antimony was added to the monitoring for that reason. A laboratory summary of GB/T 27728.2-2024, a recommended standard for wet wipes for children, lists lead, arsenic, cadmium, and mercury as test items for infant wipes and lists neither nickel nor antimony. The summary gives no numeric figures, and the standard&apos;s own text was not available.
            </p>
            <h3>Turkey: lotion, fiber, and packaging in parts per billion</h3>
            <p>
              Göçer&apos;s master&apos;s thesis examined ten baby wipes bought in Turkey and coded A through J. It is the only dataset that separates the three objects that make up a wipe. The liquid was squeezed from the sheet by hand and was not digested. Fiber and packaging were dried, about 0.2 g of each was digested in 65 percent nitric acid, and 10 mL of water was added. The acid volume is not stated, and the thesis does not say the digest was made up to 10 mL, so no milligram-per-kilogram figure can be calculated. One methods sentence reports results in µg/mL, but the calibration, the levels, and the discussion all use ppb of the instrument solution, and the ppb figures are the ones reported here, without rescaling. The calibration extends to 50 ppb.
            </p>
            <p>
              Antimony was the largest signal. Solution antimony in product I was 695.40 ppb, which the English abstract rounds to 695.4 ppb. Fiber antimony was printed as 565.46 ppb (D) and 537.86 ppb (J), and section 4.1 also prints 476.69 ppb (I). All of those antimony results sit above the top of the stated calibration curve. Packaging antimony was 0.03 and 0.04 ppb, at or below the thesis quantification level of 0.10 ppb.
            </p>
            <p>
              The other metals were measured at far lower levels, and several maxima are printed differently in different sentences. Solution nickel is given as 53.40 ppb (G) and, elsewhere, as 20.20 ppb with no code. Fiber nickel is given as 28.46 ppb (I) and, elsewhere, 10.53 ppb (B), each described as the highest. Packaging nickel was 3.60 ppb (B). Total arsenic was 11.80 ppb in solution A, 1.01 ppb in packaging C, and 0.34 ppb in fiber D. Solution lead is given as 3.10 ppb in section 4.1, fiber lead as 3.11 ppb (F) and 0.29 ppb (J), and packaging lead as 3.20 ppb (H) and 3.16 ppb (J), although a later sentence prints 3.10 and 0.50 ppb as packaging lead for D and C. Solution cadmium was 0.20, 0.20, and 0.30 ppb in A, B, and C, with a packaging maximum of 0.13 ppb (E). Fiber cadmium of 0.08 ppb (D) is described as above the quantification level, although Table 4 sets that level at 0.11. Total mercury was 2.90 ppb in solution C and 0.63 and 0.67 ppb in fibers A and B. Table 8 prints 2 ppb for solution D, which is not used as the result. Thallium is printed only for fiber, 0.70 ppb in J, while Table 8 describes thallium as below the quantification level. Where the thesis prints two values for one result, both are kept and neither is averaged. Chromium appears in the reagent list and not in the results. The thesis&apos;s comparisons of its results with drinking-water maxima and with its own restatement of a lead figure are not adopted, because a drinking-water maximum is not a dermal figure and the restated figure does not carry the unit of the legal text.
            </p>
            <h3>Adjacent products</h3>
            <p>
              Two diaper studies describe metals in products worn against the same skin. They are context for the dermal route and are not wipe results. Nyamukamba and colleagues extracted 20 disposable diapers bought in Cape Town in artificial sweat and in a laboratory urine. In the results text, sweat-extract nickel ranged from 0.022 to 0.197 mg/kg, one urine extract reached 0.224 mg/kg nickel, and sweat-extract total chromium ranged from 0.013 to 0.119 mg/kg. Section 2.3 says the filtrate was analyzed by ICP-MS, whereas the instrument description names an optical emission instrument. The ranges above are taken from the results text rather than from either method sentence. Antimony was not in that panel. The authors compared their nickel results with an OEKO-TEX value they state as 0.1 mg/kg. The metals companion cites class I extractable nickel at 1.0 mg/kg in an Annex 4 edition. Because the two figures differ, and because a diaper extract is not a wipe, this review does not score these diaper results against either figure. The panel did not include tin, aluminum, or mercury.
            </p>
            <p>
              No measurement of tin in any form has been reported for a baby wipe. A diaper-part tin study is cited by the metals companion from a publisher abstract. That full text is not in the manifest held for this review, so those ranges are not restated. Aluminum has not been measured in a baby wipe, a wipe lotion, or a wipe nonwoven in the documents this review rests on.
            </p>
            <EvidenceTable
              caption="Metal results in baby wipes, by dataset and in each dataset's own unit. No column is converted to another's unit, and no row is a market rate. Not in panel means the element was not analyzed. Sources: Washington Publication 14-04-014; Choi, Song, and Kim 2016; the 2026 Chinese annex; Göçer 2025."
              headers={["Metal", "Washington components (ppm)", "Korean sheet digests (µg/L)", "Chinese annex (µg/L)", "Turkish thesis (instrument ppb)", "Species or endpoint not measured"]}
              rows={metalRows}
            />
          </ArticleSection>

          <ArticleSection number="10" title="Antimony">
            <p className="paper-lead">
              Antimony is the metal the wipe measurements find. Polyester catalyst chemistry is the leading hypothesis for its origin, and the published fiber labels do not yet confirm it.
            </p>
            <p>
              Polyethylene terephthalate is made by polymerizing ethylene glycol with terephthalic acid, and a metal catalyst speeds that reaction. Antimony trioxide is the historical catalyst, with titanium, germanium, and other metals used as alternatives. Rayon is produced by a cellulose process, not that polymerization, so the catalyst chemistry predicts antimony in polyester fiber and does not by itself predict it in rayon. Choi, Song, and Kim attribute the high antimony in their nonwovens to antimony compounds used as a polyethylene terephthalate catalyst. That attribution is their inference.
            </p>
            <p>
              The Korean table does not turn the mechanism into a rule for wipes. Its highest antimony result is the sheet labeled rayon alone. Several sheets labeled rayon plus polyester or rayon plus polyethylene terephthalate had no detectable antimony, and the pulp-with-polypropylene and cotton-labeled sheets had none. A high antimony result on a rayon label can mean that the label is incomplete, that the antimony has another source, or both, and the published data cannot distinguish among those readings. The Washington report does not name the fiber of its three components. The Turkish thesis does not identify fiber type for its ten products and attributes its high antimony to a flame retardant, a hypothesis it does not test by measurement. The catalyst account is the hypothesis to test on polyester sheets, with fiber identity established by analysis and antimony measured on the same sheet. It is not, on current evidence, a finding about any particular wipe.
            </p>
            <p>
              Textile research supports the general mechanism and does not measure a wipe. Biver, Turner, and Filella measured total antimony of about 125 to 470 µg/g in six polyester textiles intended for skin contact, with the table listing 125, 185, 286, 357, 452, and 471 µg/g. The abstract rounds the top of that range to about 470 µg/g. Extraction into ISO 105-E04 artificial sweat gave 2.572 ± 0.031, 0.904 ± 0.121, 0.480 ± 0.126, 2.477 ± 0.093, 0.402 ± 0.128, and 0.689 ± 0.154 µg/g, in the same order. The abstract&apos;s summary of 0.1 to 1 µg/g does not cover the two extracts above 2 µg/g, and the table is kept. The abstract puts mobilization under default parameters at about 0.05 to 2 percent of total antimony. That is release into a simulant, not dermal absorption. The articles are not identified as infant sleepwear, and the fraction is not applied to wipes here.
            </p>
            <p>
              Borca and colleagues measured six polyethylene terephthalate bottles at 351, 331, 361, 322, 370, and 370 mg/kg. The methods text says five bottles and the table prints six. This review follows the table. Antimony spectroscopy identified organically bound antimony, consistent with antimony glycolate or acetate, and excluded a significant amount of antimony trioxide in those bottles. The samples are not identified as baby bottles, and no migration into the water those bottles held was measured. The same paper measured three polyester textiles at 286, 471, and 452 mg/kg. Those three totals match three of the six Biver totals. The paper cites Biver but does not say the textiles are the same objects, and this review does not assert that they are. One spectrum resembled senarmontite, and the other two could not be fitted. The catalyst reading and the oxide reading are kept apart. Wipe measurements are total antimony. They do not identify the oxide, the oxidation state, or the amount that leaves the fiber into sweat or lotion.
            </p>
            <p>
              The International Agency for Research on Cancer, in Monograph Volume 131 (2023), classified trivalent antimony as probably carcinogenic to humans (Group 2A), with antimony trioxide among the trivalent compounds evaluated. The Group 2A rationale is limited evidence for cancer in humans, drawn from lung cancer in occupational cohorts, sufficient evidence in experimental animals, and strong mechanistic evidence. Pentavalent antimony was evaluated as Group 3, not classifiable, and the volume notes that antimony trioxide alone had been evaluated as possibly carcinogenic (Group 2B) in 1989. The monograph describes inhalation as the significant occupational route and names dermal contact with dust as a concern in production and processing, including a modeled textile flame-retardant scenario. None of that record concerns an infant, a wipe, or a dermal dose from a lotion. A Group 2A classification is a hazard classification for the trivalent agent. It is not a finding that a baby wipe causes cancer, and this review makes no such finding.
            </p>
            <p>
              Dermal absorption of a wipe residue remains unmeasured. The ATSDR profile prints no percent absorption for intact infant skin. The antimony companion reports that an OECD SIDS profile summarizes an in vitro human-skin study at 0.26 percent absorption of diantimony trioxide and treats that absorption as negligible, and that a California public-health document prints two results from the same unpublished study after 24 hours: 0.26 percent at 100 µg/cm2 and 0.14 percent at 300 µg/cm2. The primary report was not examined, and neither figure is a wipe dose. Gastrointestinal absorption reference values and oral reference values are not restated here, because they do not describe dermal contact from a wipe. Measurements of antimony in drinking water, polyethylene terephthalate beverage bottles, toys, infant formula, sleepwear, and microbiome studies are outside this review. They remain on the antimony companion (<a href="https://doi.org/10.83376/hmi.antimony-in-baby-products">10.83376/hmi.antimony-in-baby-products</a>) and are not transcribed.
            </p>
          </ArticleSection>

          <ArticleSection number="11" title="Regulatory instruments that could reach a wipe">
            <p>
              A baby wipe is not one legal object. A product applied to the body to wash skin can fall within a cosmetic definition, a children&apos;s product can fall within state reporting laws, and a voluntary textile certification is neither. The instruments below are described in their own units and with their own legal character. The wipe datasets are not scored against them. The Washington preparation is undescribed and its samples predate the later statute, while the other three datasets report solution concentrations rather than content. None of these figures is set by this review.
            </p>
            <p>
              Regulation (EC) No 1223/2009 prohibits in Annex II the use as ingredients of arsenic, antimony, cadmium, chromium and its salts, lead, mercury (with an Annex V exception), and elemental nickel, with many nickel salts listed as separate entries. Article 17 allows technically unavoidable traces and sets no ppm figure. Korea&apos;s cosmetic safety standard, Article 6(2), as reproduced for the metals companion, applies where a substance was not intentionally added and complete removal is technically impossible. It sets lead at or below 50 µg/g in clay powders and 20 µg/g in other products; nickel at or below 35 µg/g in eye makeup, 30 µg/g in color makeup, and 10 µg/g in other products; arsenic at or below 10 µg/g; mercury at or below 1 µg/g; antimony at or below 10 µg/g; and cadmium at or below 5 µg/g. The same article names wet wipes for methanol, formaldehyde, and microbial counts, so wet wipes fall within the instrument, but it gives no wet-wipe-specific figure for any metal. Tin, aluminum, and chromium are not in its impurity list.
            </p>
            <p>
              Health Canada&apos;s guidance, section 4, treats lead above 10 ppm, arsenic above 3 ppm, cadmium above 3 ppm, mercury above 1 ppm, and antimony above 5 ppm as technically avoidable. Nickel does not appear, the guidance is not a regulation, and it does not name wipes. The German Federal Office of Consumer Protection and Food Safety published orientation values in 2017 of 2.0 mg/kg lead, 0.1 mg/kg cadmium, 0.1 mg/kg mercury, 0.5 mg/kg arsenic, and 0.5 mg/kg antimony for cosmetics in general, with no nickel line. The monitoring set behind those values was decorative cosmetics, baby powder, and toothpaste, not wipes, and orientation values are not a statute.
            </p>
            <p>
              Washington&apos;s RCW 70A.560.020(2) provides that from 1 January 2025 a cosmetic may not be sold if it contains intentionally added lead or lead at 1 ppm or above. One ppm is 1,000 µg/kg. The cosmetic definition used there does not name wipes. This review does not apply that statute to the Washington wipe rows, because their basis may not be the whole article and the samples predate the statute. In the United States, 21 CFR 700.13 restricts mercury in cosmetics to an unavoidable trace below 1 ppm, with a higher allowance for certain eye-area products.
            </p>
            <p>
              European REACH Annex XVII entry 27, as stated in the metals companion, limits nickel release from piercing posts to below 0.2 µg/cm²/week and from articles in prolonged skin contact, such as jewelry and garment hardware, to 0.5 µg/cm²/week. A wet wipe is not one of those articles, and a release rule for metal objects is not an elicitation figure measured on infant skin under a wipe. Entry 20 restricts specified organotin compounds above 0.1 percent by weight of tin. A baby wipe is not named, and the entry is a species rule rather than a trace figure for total tin.
            </p>
            <p>
              OEKO-TEX STANDARD 100 is a private certification. The metals companion cites Annex 4, edition 02.2025, with class I extractable figures including arsenic 0.2, cadmium 0.1, chromium 1.0, chromium (VI) 0.5, mercury 0.02, nickel 1.0, lead 0.2, and antimony 30.0 mg/kg. Extractable content and total content are different tests, so an extractable figure is not a score for a total digest. Annex 6 is an optional catalog, distinct from Annex 4, and neither is law. The antimony companion states that the annex itself was not examined for that review, and that a 30 µg/g clothing figure there remains a citation in the polyester-textile paper. This review does not choose between those two accounts, and it does not use either figure as a score for a wipe.
            </p>
            <EvidenceTable
              caption="Metal figures in instruments that could be argued to reach a baby wipe. Each figure is shown in its instrument's own unit and legal character. None is a score for the wipe datasets in the metal table. None means the instrument sets no figure for that metal. None of these figures is set by this review."
              headers={["Instrument", "Legal character", "Basis", "Lead", "Arsenic", "Mercury", "Cadmium", "Nickel", "Antimony"]}
              rows={instrumentRows}
            />
            <p>
              Antimony is the difficult case. It is the metal the wipe studies detect most readily, and several impurity lists include it, yet no wipe dataset is on a basis that can be compared with those figures. Nickel is difficult in a different way: one instrument sets a content figure for products other than eye and color makeup, another does not list it, and the European article rule concerns release from metal objects, so a wipe standard modeled on any one of those instruments would not match the others. Drinking-water maxima and plastics food-contact migration figures are the wrong basis for a wipe-sheet result and are not transcribed here.
            </p>
          </ArticleSection>

          <ArticleSection number="12" title="Infant-skin relevance">
            <p>
              The clinical record is real, specific, and frequently misread. The strongest pediatric evidence is a United States case series of six children aged 3 to 8, all already out of diapers, who presented with perianal, buttock, and sometimes facial dermatitis, all tested positive to the methylchloroisothiazolinone and methylisothiazolinone mixture, had methylisothiazolinone listed in the wipes they used, and whose dermatitis resolved on avoidance. A single case of a nine-year-old boy with recalcitrant perianal eruption and a positive patch test followed the same pattern. An Australian referral series tested 653 patients to methylisothiazolinone, found 43 positive and 23 clinically relevant, and specifically identified seven parents with relevant hand dermatitis attributed to methylisothiazolinone-containing baby wipes. A surveillance letter from the same network reported relevant methylisothiazolinone reactions rising from 15 of 428 in 2011 to 40 of 353 through part of 2013. Those are counts of all relevant reactions and not a wipe-specific numerator, and they should not be pooled with the referral series as if the populations were independent. A large North American database of 9037 patch-tested patients identified 79 with a wipe-coded allergen source, of whom 76 were adults and none were infants, with methylisothiazolinone relevant in 36 of 61 tested, 59.0 percent of that subgroup rather than of all wipes or all patients. Further adult series and single cases, including one hexamidine case and one household-wipe case with its own chemical confirmation, round out the picture.
            </p>
            <p>
              Three points follow. First, several of the most-cited reports concern older children or adults, and relabeling them as infant studies would misstate the evidence. Second, irritation, sensitization, and clinically relevant allergic contact dermatitis are different states, and a detection in a product is not a diagnosis, an incidence, or a population risk rate. Third, patch-test concentrations, such as methylisothiazolinone at 200 or 500 ppm, are diagnostic reagents and are never wipe concentrations. A 2012 randomized trial of 280 healthy term newborns compared one alcohol-free, fragrance-free wipe formulation against cotton wool and water and found skin hydration equivalent within a prespecified margin, in arbitrary Corneometer units rather than any chemical measure. It is formulation-specific and short-term, and it is not an absorption study. Observational dermatitis-prevalence work and infant skin-barrier reviews provide context on the developing barrier, diaper occlusion, and damaged skin, but none adds a quantitative uptake or microbiome-harm measurement, and none should be made to.
            </p>
            <p>
              Nickel is the most common cause of metal allergic contact dermatitis. Sensitization is acquired through the skin, and once a person is sensitized, later contact can elicit a rash. The clinical literature distinguishes a sensitization point from an elicitation point, and both are usually expressed as release per unit area over time, not as a bulk concentration in a wet sheet. Isufi and colleagues, in a systematic review and meta-analysis of patch-tested children under 18 covering 2010 to 2024, found nickel sulfate positive in 11.9 percent (95 percent confidence interval 8.6 to 15.71) across 16 studies, the highest prevalence of any allergen in that selected population. Those children were referred for testing, not sampled from the general population, and they were not tested because of wipes. No study reviewed here shows that nickel in a baby wipe caused diaper dermatitis, and the published reports of wipe-associated allergic contact dermatitis identified for the metals synthesis implicate preservatives and fragrance rather than metals. The two Korean nickel detects remain solution concentrations and have not been converted to a content or to a release per square centimeter.
            </p>
            <p>
              Infant skin is the exposure surface, and no study in the corpus quantifies the factors that make it distinctive for wipe use: stratum corneum thickness, contact time in the diaper area, or the ratio of skin area to body weight. The barrier is immature in early infancy, the diaper area is occluded and often wet or already inflamed, and an infant&apos;s skin area is large relative to body weight, while occlusion, maceration, and dermatitis can each change absorption. These are reasons to measure the dermal route. They are not a measured fraction, and no study reports the share of any metal, preservative, fragrance allergen, phthalate, or PFAS that crosses intact or dermatitic infant skin from a wipe sheet or a wipe lotion.
            </p>
          </ArticleSection>

          <ArticleSection number="13" title="Concentration, contact, and dose">
            <p className="paper-lead">
              A concentration in a specimen is the first term in a long sequence, not the end of it.
            </p>
            <p>
              To reach a dose, one needs the amount transferred to skin during ordinary use, the amount retained in contact, and the fraction absorbed by the route in question. The corpus supplies none of these linking terms for a general infant. The missing inputs are specific: product-specific transfer per use, use frequency, contact time and area, route-specific absorption, and the child&apos;s age, body mass, and skin condition. For a metal, the same gap can be stated as four inputs: the metal content of the sheet and the lotion on a mass basis, the amount of product that touches skin, the time it stays there, and the fraction absorbed. Frequency of use and contact time are real variables, but no time-and-motion or diary study of baby-wipe use is in the corpus, so they are not assigned numbers here.
            </p>
            <p>
              Where the held studies estimate an intake, as the Korean preservative study, the Brazilian paraben study, the Guangzhou diaper study, and the hygiene-product PFAS study all do, those estimates are modeled from assumptions, are held here, and are kept out of the settled evidence narrative. A default assumption such as complete absorption in a screening calculation is not an observed uptake. An illustrative metal dose is deliberately not offered. No source supplies together a wipe mass, a use frequency, a contact time, and a dermal absorption fraction for any metal. Filling those gaps with assumptions would produce a number that looks like a dose without being one.
            </p>
            <p>
              The vocabulary of absence also has to be kept exact. A nondetection, a value below the level of quantification, a blank or untested cell, and a true zero are four different statements, and several sources carry dashes that mean &quot;not tested&quot; rather than &quot;not found.&quot; Detection levels reported on an analytical solution basis, in mg/L or ng/mL, cannot be reattached to a product mass or converted without the validated preparation information, which in several studies sits in supplements that are not held. Local contact-allergy relevance, which the clinical record does support in specific cases, is a different endpoint from a modeled systemic dose and should not be merged with it.
            </p>
            <p>
              What can be said without arithmetic is still useful. Antimony is present in wipes and wipe parts across four datasets, on bases that cannot yet be compared with one another or with a cosmetic figure. Nickel is present in two digested sheets and undetected, at the method&apos;s level, in the other twenty-two. Lead is a low-ppm signal in three screened components and a µg/L signal in six digests. The dermal step is unmeasured for every metal and for every non-metal class in this review.
            </p>
          </ArticleSection>

          <ArticleSection number="14" title="Co-occurrence and combined exposure">
            <p>
              The one supportable statement about combined exposure is that several chemical classes have been measured together in the same identified specimens. The 2015 multi-analyte study found preservatives, parabens, fragrance allergens, musks, and phthalates co-occurring in individual named baby-wipe samples, and that is the clearest entry point for any discussion of co-occurrence. It is also the limit of what can be said. The 2026 Chinese monitoring report measured metals and several non-metal classes in the same products, but its preparation is undescribed and several of its panels are held, so it is not a second settled co-occurrence result.
            </p>
            <p>
              Separate products, sampled in different countries and years by different methods, do not define the mixture that reaches one child, and the corpus contains no tested wipe-specific infant mixture outcome. For that reason no across-class sum, hazard index, or combined dose is calculated here. The units, matrices, and endpoints are incompatible, and combining them would manufacture a number rather than measure one.
            </p>
          </ArticleSection>

          <ArticleSection number="15" title="Gaps and research priorities">
            <p>
              Five high-priority primary sources are named in the non-metal corpus and remain unheld: a United States survey of volatile organic compounds in diapers and baby wipes; a personal-hygiene wet-wipe allergen label survey; a recent United Kingdom baby-wipe label survey; a direct formaldehyde-release assay on baby wipes by the chromotropic acid method; and a paraben study covering paper products including sanitary wipes. Six medium-priority items, including facial-wipe and diaper-adjacent surveys and a controlled microfiber-discharge experiment, remain unheld as well. Review quotations of any of these do not substitute for the primary sources. The direct United States baby-wipe volatile-organic-compound record is part of that gap.
            </p>
            <p>
              Before any numerical claim is treated as settled, the known source conflicts have to be resolved rather than papered over: the branched-paraben identities and the phenoxyethanol maximum in the 2015 study, the analyte, basis, and working-range problems in the 2023 Riyadh study, the conflicting summaries in the 2018 Korean survey, the units and modeled-dose inconsistencies in the 2020 Brazilian study, and the narrative-versus-annex discrepancies in the Chinese monitoring report. Original table bodies and figures for the 2019 six-country study, and the analytical supplements for the diaper and hygiene PFAS studies, should be obtained through lawful access, and the consumer PFAS report&apos;s panel, sample count, sample mass, and validation should be clarified. A second rendering of the 2019 ingredient-list screen, in the metals companion, prints the second retailer denominator as 44 rather than 39. This review follows 31 and 39 in the fragrance section and does not treat the second denominator as settled.
            </p>
            <p>
              Tin, aluminum, inorganic arsenic, methylmercury, and hexavalent chromium have not been measured in a baby wipe. A printed zero or a nondetection on a total-element method is not evidence that every sheet and lotion lacks that element, and it is not a speciation result. Nickel release per unit area from a wipe has not been measured. Antimony&apos;s oxidation state in a wipe has not been measured. No dataset reports a content in mg/kg for the sheet and the lotion separately. The Korean digest does not state a final volume, so reconstructed sheet concentrations are not adopted. The Turkish digest does not state an acid volume, so no sheet concentration is calculated. The Chinese per-liter preparation is not described.
            </p>
            <p>
              The following are named here and not restated, because the underlying document is not in the manifest held for this review or is outside a wipe: diaper-part tin ranges available to the metals companion only as a publisher abstract; a manufacturing description of one wipe lotion that names no metal result this review can use; manufacturer filings to state children&apos;s-product reporting systems; mask-pack concentrations; and the antimony companion&apos;s drinking-water, bottle, toy, formula, sleepwear, and microbiome figures. The primary dermal-absorption report summarized as 0.26 percent and 0.14 percent was not obtained. The text of GB/T 27728.2-2024 was not available, so no numeric figure is taken from it. The OEKO-TEX annex is cited by one companion and described as not examined by the other.
            </p>
            <p>
              The clearest research priorities are direct wipe-matrix PFAS evidence, modern and geographically diverse sampling, and realistic transfer and absorption data, each reported with its time, product category, and analytical coverage specified. For metals, the next useful study would report the sheet and the lotion separately, in mg/kg of each fraction, with mass, final volume, and the solution concentration kept as a method detail. It would determine fiber identity analytically, include tin, aluminum, and chromium, speciate arsenic, mercury, chromium, and any tin found, and identify the antimony species if the trioxide is discussed. It would run a sweat or simulant release alongside total content, and it would sample without a screening trigger.
            </p>
          </ArticleSection>

          <ArticleSection number="16" title="Methods and limits">
            <p>
              This review draws on two Heavy Metal Index syntheses and on the wipe-relevant portion of a third. The non-metal synthesis draws on a held corpus of primary documents checked against a manifest, and on a ledger of selected evidence records graded for extraction confidence. Those grades are extraction and use flags, not safety grades. A high grade means a clear primary observation was transcribed unambiguously for its stated matrix and basis. A moderate grade means the record is usable only with explicit caveats. A hold means an unresolved conflict prevents its use as a settled claim. The number of records is not a number of independent concentration assays, because rows from the same paper or sample are correlated. Several studies disclose manufacturer funding or author affiliations. Extraction was selective rather than exhaustive, and missing supplements, absent table bodies, and unresolved contradictions are preserved rather than smoothed away.
            </p>
            <p>
              The metals synthesis is a targeted narrative synthesis, not a systematic review or meta-analysis, of the documents held for baby wipes as of 25 September 2026. Values are reported in the unit and on the basis the source printed. The datasets are not pooled, no market detection rate is computed from them, and no value is converted to a content basis for use as a result. Where a supporting document was available only as an annex image, an association reproduction, an archived capture, or a laboratory summary, that limit is stated at the point of use.
            </p>
            <p>
              What this review establishes is bounded. Specific chemicals have been measured at specific concentrations in specific wipe samples. Several non-metal classes have been found co-occurring in the same 2015 samples. Specific clinical cases of wipe-associated contact allergy have been documented, mostly in older children and adults. Antimony has been measured in every metal dataset and in both sheet and expressed lotion, on bases that cannot be compared. Lead, arsenic, and nickel appear intermittently at levels that cannot be placed on a common basis. Cadmium and mercury are printed as 0.0 or not detected in three of the four datasets and appear only at low instrument-solution levels in the fourth.
            </p>
            <p>
              What it does not establish is equally important. It ranks no products, proposes no limit, verifies no current regulation, calculates no general infant dose or mixture risk, and demonstrates no infant skin or microbiome harm. A Group 2A classification is not a wipe finding. A concentration in a baby wipe remains a concentration in a baby wipe, and not yet a dose to an infant.
            </p>
          </ArticleSection>
        </article>

        <PublicationFooter record={article} references={references} />
      </main>
    </SiteFrame>
  );
}

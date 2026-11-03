DRAFT, not for certification use

# ICS Mycotoxins Standard (DRAFT)

Institute of Contaminant Standards (ICS). Class: Mycotoxins. Slug: mycotoxins. Version 0.1 (DRAFT), 2026-11-02.

Source tags [S#] refer to rows in `../../evidence/mycotoxins/sources.csv`. Every numeric value in this document is copied from the evidence review (`../../evidence/mycotoxins/evidence-review.md`). Anything not sourced there is marked TBD.

## 1. Scope (DRAFT)

1.1 This standard sets out how a product may be assessed for the mycotoxins listed in Section 3 using laboratory evidence published as TECRID records.

1.2 It applies to foods and consumer products named in Section 4. It does not set legal limits and does not replace any statutory requirement in the market of sale.

1.3 Certification under this standard states only that tested lots were below the stated threshold or not detected at the stated LOQ. It makes no health claim.

## 2. Definitions (DRAFT)

- **Analyte**: a mycotoxin or defined sum of mycotoxins listed in Section 3.
- **LOQ (limit of quantification)**: the lowest content of the analyte that can be measured with reasonable statistical certainty, as defined in Commission Implementing Regulation (EU) 2023/2782 [S13].
- **Lower-bound sum**: a sum in which individual results below the LOQ are counted as zero, as applied to EU sum limits [S1] [S13].
- **Candidate reference value**: a sourced regulatory value listed for owner decision. It is not an adopted ICS threshold.
- **TECRID**: ICS's persistent identifier for a versioned laboratory evidence record.
- **Lot**: TBD (owner to define, with reference to the lot definitions in [S13] and [S7]).
- **Accredited laboratory**: a laboratory holding ISO/IEC 17025 accreditation whose scope covers the analyte, matrix and method used.

## 3. Analytes (DRAFT)

| Code | Analyte | Reporting basis |
|---|---|---|
| AFB1 | Aflatoxin B1 | individual |
| AFT | Total aflatoxins (B1 + B2 + G1 + G2) | lower-bound sum, individual results also reported |
| AFM1 | Aflatoxin M1 | individual |
| OTA | Ochratoxin A | individual |
| DON | Deoxynivalenol | individual (reporting of acetylated and glucoside forms: TBD) |
| FUM | Fumonisins B1 + B2 (FB3 also reported where the method covers it, for comparison with FDA guidance [S5]) | lower-bound sum |
| ZEN | Zearalenone | individual |
| PAT | Patulin | individual |
| CIT | Citrinin | individual |
| T2HT2 | T-2 + HT-2 toxins | lower-bound sum |

## 4. Matrices (DRAFT)

4.1 Matrix groups in scope (owner to confirm): cereals and cereal products; groundnuts and tree nuts; dried fruit; spices; milk and infant formula; apple juice and apple products; coffee and cocoa; wine and grape juice; baby food and processed cereal-based food for infants and young children; red yeast rice food supplements; pet food.

4.2 Analyte-by-matrix applicability matrix: TBD. A starting point is the matrix list attached to each limit in the evidence review Section 2.

## 5. Sampling (DRAFT)

5.1 Sampling for food matrices should follow the methods of sampling in Commission Implementing Regulation (EU) 2023/2782 (Annex I) [S13], or the Codex sampling plans annexed to CXS 193-1995 for the commodities they cover (for example Annex III peanuts, Annex IV tree nuts, Annex V dried figs, Annex VI aflatoxins in cereals, Annex VII DON, Annex VIII fumonisins) [S7]. Selection between these frameworks: TBD (owner decision).

5.2 Sample preparation shall follow the precaution in [S13] Annex II that the complete laboratory sample be homogenised with care, because mycotoxin distribution is generally non-homogeneous.

5.3 Sampling for pet food and supplements: TBD (no matrix-specific sampling rule was sourced).

5.4 Number of lots, sampling frequency, chain-of-custody and who draws the sample: TBD.

## 6. Accredited laboratory and method requirements (DRAFT)

6.1 Testing shall be performed by a laboratory accredited to ISO/IEC 17025 for the analyte and matrix.

6.2 Methods shall be quantitative. Qualitative screening results alone shall not support certification (consistent with FDA CP 7307.001 [S14]). Whether semi-quantitative screening followed by confirmatory testing is acceptable: TBD.

6.3 Candidate method performance references (for owner decision):

| Analyte | Reference | Published performance value | Source |
|---|---|---|---|
| AFB1 (baby food, infant cereal, FSMP for infants) | EU official control LOQ requirement | LOQ <= 0.1 ug/kg | [S13] |
| Each of AFB1, AFB2, AFG1, AFG2 (other foods) | EU official control LOQ requirement | LOQ <= 1 ug/kg | [S13] |
| OTA (cocoa powder) | EU official control LOQ requirement | LOQ <= 3.0 ug/kg | [S13] |
| Any analyte with an applicable ML | EU general rule | LOQ <= 0.5 x ML (preferably <= 0.2 x ML); for sums, each toxin <= 0.5 x ML/n | [S13] |
| Aflatoxins (nuts, figs, paprika) | EN 14123:2007 | LOQ 0.8 ng/g each, or better | [S17] |
| AFM1 (milk) | ISO 14501:2021 | LOQ 0.01 ug/kg liquid milk; 0.1 ug/kg milk powder | [S18] |
| 12 mycotoxins (corn, peanut butter, wheat flour, rice) | FDA C-003.03 | Reporting limits 2.5 ng/g (aflatoxins, OTA); 50 ng/g (fumonisins, DON, HT-2, T-2, ZEA) | [S15] |
| 8 mycotoxins (cereals and compound feed) | EN 17194:2019 | Required LOQs: DON <= 100; AFB1 <= 2; FB1 <= 375; FB2 <= 125; T-2, HT-2 <= 10; ZEN <= 20; OTA <= 10 ug/kg | [S16] |
| CIT (RYR, supplements, wheat flour) | EN 17203:2021 | Validated 2.5 to 3000 ug/kg (RYR, supplements); 2.5 to 100 ug/kg (wheat flour) | [S19] |
| PAT (apple juice, puree) | Peer-reviewed LC-MS/MS | LOQ 1.2 ug/L juice; 2.1 ug/kg puree | [S23] |

6.4 Confirmation: results from LC-UV or LC-FLD methods above a threshold shall be confirmed by mass spectrometry (as required in FDA CP 7307.001 for its program [S14]). Whether ICS adopts this rule: TBD.

6.5 Required ICS LOQ per analyte and matrix: TBD (owner to select from 6.3 or set otherwise).

6.6 Recovery, precision and measurement-uncertainty acceptance criteria: TBD (the criteria tables in [S13] Annex II are a candidate reference; values not transcribed in this draft).

## 7. Acceptance thresholds (DRAFT)

7.1 The values below are candidate reference values for owner decision. They are not adopted ICS limits. All are copied from the evidence review with the same source tags. Units are as published.

| Analyte | Matrix | Candidate reference value | Unit | Basis | Source |
|---|---|---|---|---|---|
| AFB1 / AFT | Groundnuts (peanuts), for final consumer or as ingredient | 2.0 / 4.0 | ug/kg | EU ML, entry 1.1.5 | [S1] |
| AFB1 / AFT | Tree nuts, for final consumer (general) | 2.0 / 4.0 | ug/kg | EU ML, entry 1.1.7 | [S1] |
| AFB1 / AFT | Almonds, pistachios, apricot kernels, for final consumer | 8.0 / 10.0 | ug/kg | EU ML, entry 1.1.9 | [S1] |
| AFB1 / AFT | Cereals and cereal products | 2.0 / 4.0 | ug/kg | EU ML, entry 1.1.12 | [S1] |
| AFB1 / AFT | Listed dried spices (Capsicum, pepper, nutmeg, turmeric) | 5.0 / 10.0 | ug/kg | EU ML, entry 1.1.14 | [S1] |
| AFT | Foods (human), general | 20 | ppb | FDA action level | [S2] |
| AFT | Peanuts | 0.015 | mg/kg | FSANZ ML | [S12] |
| AFM1 | Milk | 0.050 | ug/kg | EU ML, entry 1.1.16 | [S1] |
| AFM1 | Milk | 0.5 | ppb | FDA action level | [S2] [S3] |
| AFM1 | Infant formulae (ready to use) | 0.025 | ug/kg | EU ML, entry 1.1.17 | [S1] |
| AFB1 | Baby food and processed cereal-based food (dry matter) | 0.10 | ug/kg | EU ML, entry 1.1.18 | [S1] |
| OTA | Roasted coffee | 3.0 | ug/kg | EU ML, entry 1.2.14 | [S1] |
| OTA | Soluble coffee | 5.0 | ug/kg | EU ML, entry 1.2.15 | [S1] |
| OTA | Cereals for final consumer | 3.0 | ug/kg | EU ML, entry 1.2.10 | [S1] |
| OTA | Dried vine fruits and dried figs | 8.0 | ug/kg | EU ML, entry 1.2.1.1 | [S1] |
| OTA | Baby food and processed cereal-based food (dry matter) | 0.50 | ug/kg | EU ML, entry 1.2.23 | [S1] |
| PAT | Fruit juices (incl. apple juice) | 50 | ug/kg | EU ML, entry 1.3.1 | [S1] |
| PAT | Apple juice and products | 50 | ug/kg | FDA action level | [S4] |
| PAT | Apple juice and apple products for infants and young children | 10.0 | ug/kg | EU ML, entry 1.3.4 | [S1] |
| DON | Cereals for final consumer | 750 | ug/kg | EU ML, entry 1.4.4 | [S1] |
| DON | Bakery wares, cereal snacks, breakfast cereals | 400 | ug/kg | EU ML, entry 1.4.7 | [S1] |
| DON | Finished wheat products (flour, bran, germ) | 1 | ppm | FDA advisory level | [S6] |
| DON | Baby food and processed cereal-based food (dry matter) | 150 | ug/kg | EU ML, entry 1.4.9 | [S1] |
| FUM (B1+B2) | Maize-based food for final consumer | 1000 | ug/kg | EU ML, entry 1.6.2 | [S1] |
| FUM (B1+B2) | Maize-based breakfast cereals and snacks | 800 | ug/kg | EU ML, entry 1.6.3 | [S1] |
| FUM (B1+B2+B3) | Degermed dry milled corn products | 2 | ppm | FDA guidance level | [S5] |
| FUM (B1+B2) | Baby food containing maize | 200 | ug/kg | EU ML, entry 1.6.5 | [S1] |
| ZEN | Bread, pastries, biscuits, cereal snacks, breakfast cereals | 50 | ug/kg | EU ML, entry 1.5.4 | [S1] |
| ZEN | Baby food and processed cereal-based food (dry matter) | 20 | ug/kg | EU ML, entry 1.5.8 | [S1] |
| CIT | Red yeast rice food supplements | 100 | ug/kg | EU ML, entry 1.7.1 | [S1] |
| T2HT2 | Oats for final consumer; oat flakes | 100 | ug/kg | EU ML, entries 1.9.2.1 and 1.9.6 | [S1] |
| T2HT2 | Cereals for final consumer (general) | 20 | ug/kg | EU ML, entry 1.9.2 | [S1] |
| T2HT2 | Baby food and processed cereal-based food (dry matter) | 10 | ug/kg | EU ML, entry 1.9.9 | [S1] |
| Any | Pet food | TBD | | No pet-food-specific limit sourced | |
| Any except CIT | Food supplements | TBD | | No supplement-specific limit sourced | |
| Any | Matrices not listed above | TBD | | | |

7.2 Where more than one jurisdiction's value is listed for the same analyte and matrix, which value applies (for example most stringent, market of sale, or ICS-specific): TBD.

7.3 Decision rule (treatment of measurement uncertainty, lower-bound vs upper-bound sums, results between LOD and LOQ): TBD. Reference practice: EU uses lower-bound sums for compliance with sum limits [S1] [S13].

7.4 Product claims shall be phrased as "below the stated limit" or "not detected at LOQ X (source)". Health claims are not permitted.

## 8. Tiers (DRAFT)

8.1 Structure only; all values TBD.

| Tier | Description | Threshold rule | Values |
|---|---|---|---|
| Tier 1 | TBD (for example: results below the applicable candidate reference value) | TBD | TBD |
| Tier 2 | TBD (for example: results below a stated fraction of the candidate reference value) | TBD | TBD |
| Tier 3 | TBD (for example: all analytes not detected at the required LOQ) | TBD | TBD |

8.2 Whether tiers apply per analyte or to the whole panel: TBD.

## 9. Reporting and TECRID publication (DRAFT)

9.1 Each certificate shall be supported by the full laboratory report, which is published as a TECRID record (ICS's persistent identifier for versioned laboratory evidence records).

9.2 Minimum TECRID record content (owner to confirm): laboratory name and accreditation number; accreditation scope reference; method identifier (for example EN, ISO, AOAC or FDA method number); analyte list; matrix; lot identifier; sampling date and sampler; receipt and analysis dates; result per analyte with unit; LOD and LOQ per analyte; recovery and measurement uncertainty where reported; basis of sums (lower-bound or other); laboratory signatory.

9.3 Results below the LOQ shall be reported as "not detected at LOQ X" or "below LOQ X", with the LOQ value and unit, never as zero or as a claim of absence.

9.4 TECRID records are versioned. A corrected or reissued laboratory report creates a new version linked to the earlier one; earlier versions remain retrievable. Version and retraction rules: TBD.

9.5 Personal data shall not appear in TECRID records. Redaction rules: TBD.

## 10. Recertification cadence (DRAFT)

10.1 Cadence: TBD. Options for owner decision:

- Option A: fixed calendar interval (interval TBD).
- Option B: per harvest year or crop season for cereal, nut and fruit products, reflecting year-to-year variation noted in occurrence studies.
- Option C: per production lot or per defined number of lots.
- Option D: risk-based, with frequency set by product category, prior results relative to thresholds, and supplier changes.
- Option E: triggered retesting on formulation change, new raw material origin, or a published regulatory change.

10.2 Combination of options and any minimum frequency: TBD.

## 11. Revision history (DRAFT)

| Version | Date | Change |
|---|---|---|
| 0.1 | 2026-11-02 | Initial skeleton |

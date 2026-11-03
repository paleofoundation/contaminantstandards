# ICS Pesticide Residues Standard (pesticide-residues)

**DRAFT, not for certification use.**

Version 0.1, 2026-11-02. Source tags [S#] refer to `../../evidence/pesticide-residues/sources.csv`. Supporting evidence: `../../evidence/pesticide-residues/evidence-review.md`. No value in this draft is ICS policy; every numeric value in Section 7 is a candidate reference value for owner decision.

## 1. Scope (DRAFT)

1.1 This draft standard describes how the Institute of Contaminant Standards (ICS) would evaluate laboratory evidence on pesticide residues in defined food matrices and drinking water, for the analytes listed in Section 3.

1.2 Certification under this standard, once adopted, would state only that the tested lots were below the stated limits, or not detected at the stated LOQ, as reported by an accredited laboratory. It would not state or imply any health, safety or quality claim.

1.3 Out of scope for version 0.1: pesticides not listed in Section 3; consumer products other than food and drinking water; animal-derived foods.

## 2. Definitions (DRAFT)

- **Tolerance (US):** the EPA-established maximum residue level of a specific pesticide chemical permitted in or on a human or animal food in the United States, listed in 40 CFR Part 180 [S41, p. 8 glossary].
- **MRL (EU):** maximum residue level set under Regulation (EC) No 396/2005; a default of 0,01 mg/kg applies where no specific MRL is set, as provided in Article 18(1)(b) [S25].
- **Codex MRL:** maximum residue limit adopted by the Codex Alimentarius Commission and listed in the Codex Pesticide Residues in Food and Feed Database [S27].
- **MCL:** maximum contaminant level for drinking water under 40 CFR 141.61 [S13].
- **LOQ:** limit of quantification as reported by the testing laboratory for the analyte and matrix.
- **Not detected (ND):** result below the laboratory's reported LOQ; always reported together with the LOQ value.
- **TECRID:** the ICS persistent identifier for a versioned laboratory evidence record. Each certificate's laboratory report is published as a TECRID record (Section 9).
- **Lot:** TBD (owner decision; align with the sampling reference adopted in Section 5).

## 3. Analytes (DRAFT)

| Group | Analyte | Residue definition to be reported |
|---|---|---|
| Phosphonate herbicide | Glyphosate | TBD: choose among US definition (glyphosate only, or glyphosate plus N-acetyl-glyphosate per 40 CFR 180.364(a)(1)/(a)(2)) [S1], EU definition [S14], or Codex definition [S27] |
| Phosphonate degradate | AMPA | Report separately (no limit selected in v0.1) |
| Herbicide | 2,4-D | TBD (see [S2], [S15], [S28]) |
| Herbicide | Atrazine | TBD (US combined residue with chlorinated metabolites [S3]; EU [S16]) |
| Organophosphate | Chlorpyrifos | TBD ([S4], [S17]) |
| Organophosphate | Malathion | TBD (EU definition includes malaoxon [S18]) |
| Organophosphate | Diazinon | TBD ([S6], [S19]) |
| Organophosphate | Acephate (and methamidophos) | TBD ([S7], [S20]) |
| Pyrethroid | Bifenthrin | TBD ([S8], [S21]) |
| Pyrethroid | Cypermethrin (incl. alpha- and zeta-) | TBD ([S9], [S22], [S33]) |
| Pyrethroid | Permethrin | TBD ([S10], [S23]) |
| Pyrethroid | Lambda-cyhalothrin | TBD ([S11], [S24], [S32]) |

## 4. Matrices (DRAFT)

Candidate matrices for v0.1: oats and oat products; wheat; soybeans; apples; strawberries; spinach; lettuce and leafy greens; drinking water (atrazine, 2,4-D, glyphosate only). Foods for infants and young children: TBD (limits not verified in the evidence review).

## 5. Sampling (DRAFT)

5.1 Candidate sampling reference: Commission Directive 2002/63/EC of 11 July 2002 establishing Community methods of sampling for the official control of pesticide residues in and on products of plant and animal origin [S49]. Its sampling quantities and procedures were not extracted in v0.1; TBD.

5.2 Codex CXG 33-1999 (Recommended Methods of Sampling for the Determination of Pesticide Residues for Compliance with MRLs): not verified against the official Codex text; not adopted as a reference until verified.

5.3 Sample size, number of increments and lot definition: TBD.

## 6. Accredited laboratory and method requirements (DRAFT)

6.1 Testing laboratories: TBD requirement for accreditation to ISO/IEC 17025 with the relevant analytes and matrices within the accredited scope (owner decision on accreditation body recognition).

6.2 Analytical quality control: candidate reference is the European Commission guidance document SANTE/11312/2021 v2026, "Guidance document on analytical quality control and method validation procedures for pesticide residues analysis in food and feed" [S48].

6.3 Candidate methods (laboratory to state the method used on every report):

- Multiresidue (organophosphates, pyrethroids, atrazine): EN 15662:2018 (modular QuEChERS) [S46] or AOAC Official Method 2007.01 [S45].
- Glyphosate and AMPA: QuPPe-PO (EURL-SRM, version 13; standardized as EN 18032:2025) [S47], or an equivalent validated LC-MS/MS or IC-MS/MS method. One published laboratory validation reports an LOQ of 10 ug/kg for glyphosate and AMPA [S44].
- 2,4-D: acid herbicide method; specific method reference TBD.

6.4 Maximum acceptable LOQ per analyte and matrix: TBD (owner decision; must be at or below the acceptance threshold selected in Section 7).

## 7. Acceptance thresholds (DRAFT)

Candidate reference values only, drawn from the evidence review, for owner decision. The owner must choose one reference framework (or the lowest of several) per analyte and matrix. Units are kept as published. Where no value is shown, the entry is TBD.

| Analyte | Matrix | Candidate reference values (as published) | ICS threshold |
|---|---|---|---|
| Glyphosate | Oats | US 30 ppm (cereal grain group 15) [S1] [S12]; EU 20 mg/kg [S14]; Codex 30.0 mg/kg (cereal grains group) [S27] | TBD |
| Glyphosate | Wheat | US 30 ppm (group 15) [S1] [S12]; EU 10 mg/kg [S14]; Codex 30.0 mg/kg [S27] | TBD |
| Glyphosate | Soybeans | US 20.0 ppm [S1]; EU 20 mg/kg [S14]; Codex 20.0 mg/kg [S27] | TBD |
| Glyphosate | Apples | US 0.20 ppm (pome group 11-10) [S1]; EU 0.1* mg/kg [S14] | TBD |
| Glyphosate | Strawberries | US 0.20 ppm (berry group 13-07) [S1]; EU 0.1* mg/kg [S14] | TBD |
| Glyphosate | Spinach, lettuce | US 0.2 ppm (leafy group 4) [S1]; EU 0.1* mg/kg [S14] | TBD |
| Glyphosate | Drinking water | US MCL 0.7 mg/L [S13] | TBD |
| 2,4-D | Oats | US 2.0 ppm [S2]; EU 0.05* mg/kg [S15] | TBD |
| 2,4-D | Wheat | US 2.0 ppm [S2]; EU 2 mg/kg [S15]; Codex 2.0 mg/kg [S28] | TBD |
| 2,4-D | Drinking water | US MCL 0.07 mg/L [S13] | TBD |
| Atrazine | Wheat | US 0.10 ppm [S3]; EU 0.05* mg/kg [S16] | TBD |
| Atrazine | Drinking water | US MCL 0.003 mg/L [S13] | TBD |
| Chlorpyrifos | Apples | US 0.01 ppm [S4]; EU 0.01* mg/kg [S17] | TBD |
| Chlorpyrifos | Wheat | US 0.5 ppm [S4]; EU 0.01* mg/kg [S17] | TBD |
| Malathion | Oats, wheat | US 8 ppm (postharvest) [S5]; EU 8 mg/kg [S18]; Codex wheat 10.0 mg/kg [S29] | TBD |
| Diazinon | Apples | US 0.50 ppm [S6]; EU 0.01* mg/kg [S19] | TBD |
| Acephate | Soybeans | US 1.0 ppm [S7]; EU 0.3 mg/kg [S20]; Codex 0.3 mg/kg [S30] | TBD |
| Bifenthrin | Strawberries | US 3 ppm (low growing berry subgroup 13-07G) [S8]; EU 1 mg/kg [S21] | TBD |
| Cypermethrin | Oats | US 3.0 ppm (zeta-cypermethrin) [S9]; EU 2 mg/kg (applicable) [S22]; Codex 2.0 mg/kg [S33] | TBD |
| Permethrin | Leafy greens | US 50 ppm (leafy greens subgroup 4-16A) [S10]; EU spinaches 0.05* mg/kg and lettuces 0.05* mg/kg [S23] | TBD |
| Lambda-cyhalothrin | Apples | US 0.30 ppm (pome group 11) [S11]; EU 0.08 mg/kg [S24] | TBD |
| All analytes | All matrices without a specific EU MRL | EU default 0,01 mg/kg (Art. 18(1)(b)) [S25] | TBD |

Other analyte and matrix combinations: see evidence review Section 3; TBD.

## 8. Tiers (DRAFT)

Structure only; all values TBD.

| Tier | Description (placeholder) | Threshold basis |
|---|---|---|
| Tier 1 | Below the selected regulatory reference value for every analyte | TBD |
| Tier 2 | Below a stated fraction of the selected reference value | TBD (fraction not set) |
| Tier 3 | Not detected at or above the stated laboratory LOQ for every analyte | TBD (maximum LOQ not set) |

## 9. Reporting and TECRID publication (DRAFT)

9.1 Each certificate's laboratory report is published as a TECRID record. TECRID is the ICS persistent identifier for versioned laboratory evidence records.

9.2 Each TECRID record would include, at minimum (field list TBD by owner): laboratory name and accreditation reference; method reference; analyte and residue definition; matrix; LOQ per analyte; result per analyte (numeric value or "not detected at LOQ X"); measurement uncertainty where reported; sample and lot identifiers; sampling date; report date; version number.

9.3 Corrections create a new TECRID version; prior versions remain accessible. Versioning rules: TBD.

9.4 Public claims must use the forms "below the stated limit" or "not detected at LOQ X (source)".

## 10. Recertification cadence (DRAFT)

TBD. Options for owner decision (no option is recommended in v0.1):

- Option A: per lot testing.
- Option B: fixed calendar interval (interval TBD).
- Option C: interval tied to crop year or harvest season.
- Option D: risk-based interval informed by occurrence data (for example PDP, FDA and EFSA monitoring [S40] [S41] [S42]).

## 11. Revision history (DRAFT)

| Version | Date | Change |
|---|---|---|
| 0.1 | 2026-11-02 | Initial skeleton |

# Index domain proposal: ICS contaminant expansion

Order ICS-CONTAMINANT-EXPANSION-1, phase 3. Version 0.1, 2026-11-02.

Status: PROPOSAL ONLY, for Karen's approval. No domain has been registered, reserved or purchased, and no lab has been engaged or paid.

## How to read this proposal

- Domain availability was checked on 2026-11-02 by querying the .com registry (`whois -h whois.verisign-grs.com "domain <name>"`). "No registry match" means the name was not registered at the time of the query. Availability can change at any moment; recheck before registering. The method was validated against heavymetalindex.com and foreverchemicalsindex.com, which both returned registration records. None of the unregistered names had DNS NS records.
- The naming pattern follows the existing network: `<class>index.com` for the public index (heavymetalindex.com, foreverchemicalsindex.com, microplasticsindex.com) and `<class>certified.com` or `<class>tested.com` for the certification mark (heavymetalcertified.com, microplasticstested.com).
- Lab prices come only from public price lists. Each price cites the `[S#]` row in `evidence/<class-slug>/sources.csv`, with the price tables in `evidence/<class-slug>/lab-pricing.md`. Prices are shown in the published currency with no conversion, and they exclude VAT where the source says so.
- "First test batch" uses an **illustrative batch of 10 samples**. The sample count is a planning placeholder for the owner to set, not a sourced figure. The totals are plain arithmetic (price times 10, plus any per-order fee the source states). They are not quotes.
- Testing scope assumptions: none of the priced tests was checked for ISO/IEC 17025 accreditation of the specific method. Several public prices are for feed or grain matrices rather than finished consumer products.

## Summary

| Class | Recommended index domain | Recommended mark domain | Registry status (2026-11-02) | Illustrative 10-sample batch, public prices only |
|---|---|---|---|---|
| Mycotoxins | mycotoxinindex.com | mycotoxincertified.com | Both: no registry match | 1,100 USD (feed-matrix screen) or 1,047 EUR (ochratoxin A only) |
| Pesticide residues | pesticideindex.com | pesticidecertified.com | Both: no registry match. pesticidetested.com is registered | 7,360 GBP (Fera glyphosate plus two multi-residue screens) |
| Phthalates | phthalateindex.com | phthalatecertified.com | Both: no registry match | 2,507 EUR |
| Bisphenols | bisphenolindex.com | bisphenolcertified.com | Both: no registry match | 3,397 to 5,077 EUR |
| Acrylamide | acrylamideindex.com | acrylamidecertified.com | Both: no registry match | 1,447 EUR |

## 1. Mycotoxins

**Candidate domains (registry query 2026-11-02)**

| Domain | Status |
|---|---|
| mycotoxinindex.com | No registry match |
| mycotoxinsindex.com | No registry match |
| mycotoxincertified.com | No registry match |
| mycotoxintested.com | No registry match |

**Scope.** Aflatoxins B1, B2, G1, G2 and M1, ochratoxin A, deoxynivalenol, fumonisins, zearalenone, patulin, citrinin, T-2 and HT-2 in cereals, nuts, dried fruit, spices, milk, apple products, coffee, infant foods, and pet food and supplements where a limit exists. Evidence: `evidence/mycotoxins/evidence-review.md`.

**Relation to HMI, FCI, MPI and TECRID.** No analyte overlap with HMI (metals), FCI (PFAS) or MPI (microplastics). Many matrices overlap with HMI's ingredient pages (rice, spices, cocoa, cereals, infant foods), so a shared ingredient taxonomy would avoid duplicate pages. Certificate lab reports would publish as TECRID records, like the existing programs.

**Launch dependencies.**
1. Merge the phase 1 and phase 2 PRs for mycotoxins.
2. Owner decision on acceptance thresholds. The draft lists EU 2023/915, Codex and FDA values as candidates only.
3. Resolve key "not found" items: current FDA CPG 555.400 text, Prop 65 NSRLs, and LOQs for EN 14177, EN 15851, EN 14132, ISO 16050 and the AOAC methods.
4. A partner lab with ISO/IEC 17025 scope for LC-MS/MS multi-mycotoxin analysis in finished foods. Not found among public price lists.
5. Domain registration approval, then an index site build.

**First test batch cost (public prices only).**

| Option | Per sample | Order fee | 10 samples | Source |
|---|---|---|---|---|
| Purdue ADDL Mycotoxin Screen 2 + Fumonisins (aflatoxins, DON, zearalenone, fumonisins), feedstuff matrix | 110.00 USD | none stated | 1,100 USD | [S32] |
| Measurlabs ochratoxin A in food, feed or supplements (EN 14132), excl. VAT | 95 EUR | 97 EUR per order | 1,047 EUR | [S36] |

Gap: no public price was found for an LC-MS/MS panel covering the full analyte list in consumer-product matrices, or for patulin, citrinin, aflatoxin M1 or T-2/HT-2 alone. The full-scope batch cost is "not found".

## 2. Pesticide residues

**Candidate domains (registry query 2026-11-02)**

| Domain | Status |
|---|---|
| pesticideindex.com | No registry match |
| pesticideresidueindex.com | No registry match |
| pesticidecertified.com | No registry match |
| pesticidetested.com | Registered (created 2015-12-14, registrar GoDaddy.com, LLC) |

**Scope.** Glyphosate and AMPA, 2,4-D, atrazine, representative organophosphates (chlorpyrifos, malathion, diazinon, acephate) and pyrethroids (bifenthrin, cypermethrin, permethrin, lambda-cyhalothrin) in oats, wheat, soybeans, apples, strawberries, spinach and leafy greens, infant foods, and drinking water for atrazine. Evidence: `evidence/pesticide-residues/evidence-review.md`.

**Relation to HMI, FCI, MPI and TECRID.** No analyte overlap with the existing programs. This is the class with the most existing third-party claims in the market, so the index should state its analyte list and LOQs clearly to avoid implying full multi-residue coverage. Certificate lab reports would publish as TECRID records.

**Launch dependencies.**
1. Merge the phase 1 and phase 2 PRs for pesticide residues.
2. Owner decision on thresholds. The candidates are EPA tolerances, EU MRLs including the 0.01 mg/kg default, and Codex MRLs. Residue definitions differ between jurisdictions, so the standard must state which definition applies.
3. Resolve "not found" items: published LOQs for EN 15662, AOAC 2007.01 and QuPPe, and the status of the chlorpyrifos apple tolerance (PDP lists 0.1, the current eCFR shows 0.01).
4. A partner lab whose scope covers polar pesticides (glyphosate, AMPA) and acidic herbicides (2,4-D) in addition to GC and LC multi-residue screens.
5. Domain registration approval, then an index site build.

**First test batch cost (public prices only).**

| Option | Per sample | 10 samples | Source |
|---|---|---|---|
| Fera Science: glyphosate (260.00 GBP) + multi-residue screen 1, GC-MS/MS (238.00 GBP) + multi-residue screen 2, LC-MS (238.00 GBP), standard prices, ex VAT | 736.00 GBP | 7,360 GBP | [S50] [S51] [S52] |
| NIBIO: glyphosate and AMPA M59 (3 855 NOK) + M86 and M93 multimethod bundle (6 415 NOK) + acidic herbicides M90 (3 230 NOK), excl. VAT | 13 500 NOK | 135 000 NOK | [S53] |
| Cornell Chemical Ecology Core Facility: 105-pesticide LC-MS/MS screen, external clients, page states 2024 rates; glyphosate price not found | 120 USD | 1,200 USD (excludes glyphosate) | [S55] |

Notes: Fera's published lowest per-sample price for each multi-residue screen is 211.00 GBP [S51] [S52]. Whether 2,4-D is in Fera's screens was not confirmed: not found. The NIBIO option includes a dedicated acidic-herbicide method.

## 3. Phthalates

**Candidate domains (registry query 2026-11-02)**

| Domain | Status |
|---|---|
| phthalateindex.com | No registry match |
| phthalatesindex.com | No registry match |
| phthalatecertified.com | No registry match |
| phthalatestested.com | No registry match |

**Scope.** DEHP, DBP, BBP, DINP, DIDP, DnOP, DIBP, DPENP and DnHP, and DCHP in fatty foods, dairy, oils, infant foods, toys and childcare articles, food contact materials and cosmetics. Evidence: `evidence/phthalates/evidence-review.md`.

**Relation to HMI, FCI, MPI and TECRID.** Phthalates are chemical additives in plastics. MPI covers plastic particles. The two are distinct analytes, but many products would plausibly be tested for both. A shared product record with separate analyte results would avoid duplicate brand pages. Certificate lab reports would publish as TECRID records.

**Launch dependencies.**
1. Merge the phase 1 and phase 2 PRs for phthalates.
2. Owner decision on thresholds. Candidates include the CPSC 0.1 percent content limit, EU 10/2011 SMLs and group restrictions, and REACH entries 51 and 52.
3. Resolve "not found" items: a standardized food-matrix method with a published LOQ, the LOQs for CPSC-CH-C1001-09.4, ISO 8124-6 and EN 14372, and Prop 65 levels for DIBP, DCHP, DnOP and DPENP.
4. Lab background-contamination controls in the method requirements.
5. Domain registration approval, then an index site build.

**First test batch cost (public prices only).**

| Option | Per sample | Order fee | 10 samples | Source |
|---|---|---|---|---|
| Measurlabs phthalates package (REACH): DIBP, DBP, BBP, DEHP, DNOP, DINP, DIDP, GC-MS/MS, typical price excl. VAT | 241 EUR | 97 EUR per order | 2,507 EUR | [S16] |
| University of Florence PeptLab, phthalates by UPLC-MS/MS, excl. VAT (price list dated July 2024) | 200 to 600 EUR | 500 EUR per final report | 2,000 to 6,000 EUR plus report fees | [S18] |

Gap: no US lab public price and no food-matrix public price were found.

## 4. Bisphenols

**Candidate domains (registry query 2026-11-02)**

| Domain | Status |
|---|---|
| bisphenolindex.com | No registry match |
| bisphenolsindex.com | No registry match |
| bisphenolcertified.com | No registry match |
| bisphenoltested.com | No registry match |

**Scope.** BPA, BPS, BPF, BPAF, BPB and BPZ, with BADGE and BFDGE as context, in canned foods and beverages, infant formula, food contact materials, thermal paper, baby bottles and toys. Evidence: `evidence/bisphenols/evidence-review.md`.

**Relation to HMI, FCI, MPI and TECRID.** Same additive-versus-particle relationship to MPI as phthalates. Phthalates and bisphenols share packaging matrices and LC-MS/MS or GC-MS lab capacity, so a combined plastics-chemicals panel is an option to weigh against separate indexes. Certificate lab reports would publish as TECRID records.

**Launch dependencies.**
1. Merge the phase 1 and phase 2 PRs for bisphenols.
2. Confirm Regulation (EU) 2024/3190 and its correction against the Official Journal. They were read through a mirror.
3. Owner decision on thresholds. The EU 2024/3190 verification detection limit of 1 microgram/kg is the main sourced candidate. No numeric limit was found for BPF, BPAF, BPB or BPZ.
4. Resolve "not found" items: an LOQ for CEN/TS 13130-13, a standardized ISO or AOAC bisphenol method, and the EURL method.
5. Domain registration approval, then an index site build.

**First test batch cost (public prices only).**

| Option | Per sample | Order fee | 10 samples | Source |
|---|---|---|---|---|
| Measurlabs bisphenol A, B, F, S and AF content (LC-MS/MS; plastics, paper, board), typical range excl. VAT | 330 to 498 EUR | 97 EUR per order | 3,397 to 5,077 EUR | [S37] |
| Measurlabs BPA specific migration (LC-MS/MS), starting price excl. VAT | from 271 EUR | 97 EUR per order | from 2,807 EUR | [S35] |

Gap: no US lab public price was found. No public price was found for bisphenols in food (as opposed to packaging migration).

## 5. Acrylamide

**Candidate domains (registry query 2026-11-02)**

| Domain | Status |
|---|---|
| acrylamideindex.com | No registry match |
| acrylamidecertified.com | No registry match |
| acrylamidetested.com | No registry match |

**Scope.** Acrylamide in French fries, potato crisps, bread, breakfast cereals, biscuits and crackers, coffee and coffee substitutes, and baby foods and processed cereal-based foods. Evidence: `evidence/acrylamide/evidence-review.md`.

**Relation to HMI, FCI, MPI and TECRID.** No analyte overlap. Matrix overlap with HMI (cereals, coffee, baby foods). Acrylamide is a single-analyte class. The EU instrument sets benchmark levels, not maximum levels, which affects how the index presents comparisons. Certificate lab reports would publish as TECRID records.

**Launch dependencies.**
1. Merge the phase 1 and phase 2 PRs for acrylamide.
2. Owner decision on whether benchmark levels (Regulation (EU) 2017/2158 Annex IV) can serve as candidate reference values, given they are not maximum levels.
3. Resolve "not found" items: LOQs for ISO 18862:2025 and the FDA method, any EFSA occurrence summary newer than 2015, and the Prop 65 consent judgment texts.
4. Domain registration approval, then an index site build.

**First test batch cost (public prices only).**

| Option | Per sample | Order fee | 10 samples | Source |
|---|---|---|---|---|
| Measurlabs acrylamide in food, HPLC-MS, typical price excl. VAT | 135 EUR | 97 EUR per order | 1,447 EUR | [S25] |

Gap: no US lab public price was found. Eurofins and Analytice list the service without a public price.

## Decisions requested from Karen

1. Approve or change the domain names per class. Each name needs one index domain and one mark domain; recheck availability on the day of registration.
2. Choose between five separate indexes and grouping phthalates and bisphenols as one plastics-chemicals index.
3. Set the first batch size and choose labs, keeping in mind that accreditation scope still needs confirming.
4. Order of launch.

## Revision history

| Version | Date | Change |
|---|---|---|
| 0.1 | 2026-11-02 | Initial proposal |

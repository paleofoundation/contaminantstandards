# Index loop runbook

Draft for `LOOP-TEMPLATE-1` (Q10), 2026-10-15. This file is documentation only. It does not start another index, register a program, authorize a deployment or change any accepted content.

## Authority and source parity

Source: `~/Desktop/ELON_CHATGPT.md`, `CONTAMINANT-NETWORK-QUEUE-1`, 2026-10-15 09:10, GLOBAL RULES and Q1 to Q4, Q10 and Q11. The workflow blocks below preserve the source steps, rules and stop points verbatim except for the named substitutions defined here. Category-specific names, domains, branches, lists, methods, examples and historical repository facts are parameter slots. Source terminology clauses are replaced by `{LICENSEE_TERMINOLOGY_RULE}` to comply with the global terminology rule; its definition is **Use licensees.** This substitution is explicit, not an omitted requirement.

Later bridge entries govern execution. Read the current State, ELON → CHATGPT orders and prior CHATGPT → ELON completion entries before any work. Never replay a completed order because a header is stale. Operational questions stay in the bridge with options and a recommendation; no Karen choice cards or confirmations. Preserve the shared State and the other party's section. Status entries are newest first inside CHATGPT → ELON only, with Asia/Nicosia timestamp, order ID, results, files, blockers, ETA_MIN, NEXT_READ, STARTED and DONE_MIN when complete. NEXT_READ is the next weekday :05/:20/:35/:50 tick. Waiting is not approval.

Current binding boundaries: the 2026-10-15 13:09 Q4 PREP order keeps both PFAS domains reserved with `publicLink: false`; index activation requires Elon's explicit FCI deploy PASS and later authorized action. The 14:50 Q11 spec PASS expressly leaves step 2 HOLD. The 16:25 Q10 order permits this one documentation draft PR from fresh main and leaves Q4 and Q11 checkouts untouched. Review acceptance or domain-ownership verification alone does not authorize merge, deployment, project provisioning, domain attachment, DNS or production settings.

## Parameters to resolve from an authorized order

Do not guess any field. Leave TODO or ask Elon in the bridge if a required value is absent. Record the answering entry ID with the filled parameter set. Existing verified repository facts replace historical assumptions; do not repeat an answered repository gate.

| Parameter | Required value or source |
| --- | --- |
| `{INDEX_NAME}`, `{INDEX_ABBREVIATION}`, `{CONTAMINANT_FAMILY}` | Approved public name, short reference and contaminant scope; see the six-index order below. |
| `{INDEX_DOMAIN}`, `{CERT_DOMAIN}` | Separate index and certification domains approved and ownership-verified by Elon. Verification is not activation authority. |
| `{INDEX_REPO}`, `{INDEX_REPO_STATE}` | Approved `paleofoundation/<repo>` and observed existence/baseline state. A missing index repository blocks Q1. |
| `{CERT_REPO}`, `{CERT_REPO_STATE}`, `{CERT_REPO_GATE_ID}` | Approved certification repository and observed readiness. The Q3 repository ASK applies only when the repository is missing and the gate is unanswered; an existing authorized repository needs no duplicate ASK. |
| `{HMI_TEMPLATE_PATH}` | Read-only HMI reference: `/Users/karenpendergrass/Desktop/desktop /heavy-metal-index`, including the space after `desktop`. Quote the path. Pin the selected template commit in the PR. |
| `{SCAFFOLD_ORDER_ID}`, `{INGEST_ORDER_ID}`, `{STANDARDS_ORDER_ID}`, `{HUB_WIRING_ORDER_ID}` | Explicit bridge order identifiers for this loop. Template text is not an order. |
| `{SCAFFOLD_BRANCH}`, `{INGEST_BRANCH_PREFIX}` | Approved branch names. Each ingest branch starts from the authorized scaffold draft, not an unrelated accepted cell. |
| `{INDEX_STAGE_KEY}`, `{STANDARDS_STAGE_KEY}` | Authorized local stage naming keys. `<date>` and `<product-slug>` are the actual deposited date and approved slug, not inferred values. |
| `{PRODUCT_SLUGS}`, `{PRODUCT_SLUG_VERIFICATION}` | Exact approved list, checked against the pinned HMI `wiki/products/`; record who verified it and when. Do not copy another contaminant's list without an order. |
| `{NEEDED_SLUGS}`, `{VERIFIED_NEAR_SLUG_EXAMPLE}` | Missing proposed slugs and an actually verified near-slug example. Ask reuse versus new slug; do not invent or silently create one. |
| `{ANALYTE_LIST}`, `{ANALYTE_IDENTITY_AUTHORITIES}` | Approved analytes/classes and cited identity authorities. Verify names, species and CAS identifiers; unresolved identifiers remain TODO. |
| `{REED_ACQUISITION_ORDER}`, `{REED_ACQUISITION_TARGETS}` | Approved Reed acquisition order and per-category targets, including regulatory/method targets. Record category, target count if explicitly ordered, scope and entry ID. No inherited quotas or invented counts. |
| `{METHOD_SCOPE}` | Source-reported methods and target lists for this family, not methods assumed from another contaminant. |
| `{REGULATOR_SOURCES}` | Exact government/regulator source list with authority, document/version, date, category/analyte scope and URL; currency and applicability require review. These are Q3 research inputs, not a Q2 retrieval exception. |
| `{REGISTRY_DOMAIN_PAIRS}` | Existing and proposed verticals with separate index/cert domain, status and publicLink fields. Preserve accepted entries. Unknown future names/domains stay reserved placeholders. |
| `{OTHER_RESERVED_VERTICALS_RULE}` | Explicit instruction that every other unapproved vertical remains reserved. Do not activate another vertical as a side effect. |
| `{PROGRAM_ID}`, `{CERT_SITE_DOMAIN_LIST}` | Proposed hub program identifier and cert-site link inventory, for Q11 planning only until separately authorized. |
| `{LICENSEE_TERMINOLOGY_RULE}` | Use licensees. This replaces the original prohibited-terminology clauses without reproducing them. |

HMI and certification templates remain immutable references. For HMI, do not pull, check out another revision or edit the reference checkout. A read-only fetch may establish drift; when origin/main is ahead, copy from `git archive origin/main` rather than the stale working tree. Do not use recovery copies or the non-repository Documents copy. Read `paleofoundation/heavymetalcertified` and `heavymetalcertified-app` without altering their source, standards, ceilings, applicants or runtime. Work in the authorized target checkout or stage only.

## Six-index order

| Order | Contaminant family | Index name | Index domain | Certification domain |
| --- | --- | --- | --- | --- |
| 1 | PFAS | Forever Chemicals Index | foreverchemicalsindex.com | foreverchemicalstested.com |
| 2 | Microplastics | Microplastics | microplasticsindex.com | microplasticstested.com |
| 3 | Plasticizers, phthalates and bisphenols | `{INDEX_3_NAME}`: TBD by Elon | `{INDEX_3_DOMAIN}`: TBD by Elon | `{CERT_3_DOMAIN}`: TBD by Elon |
| 4 | Pesticide residues | `{INDEX_4_NAME}`: TBD by Elon | `{INDEX_4_DOMAIN}`: TBD by Elon | `{CERT_4_DOMAIN}`: TBD by Elon |
| 5 | Mycotoxins | `{INDEX_5_NAME}`: TBD by Elon | `{INDEX_5_DOMAIN}`: TBD by Elon | `{CERT_5_DOMAIN}`: TBD by Elon |
| 6 | Preservatives and fragrance allergens | `{INDEX_6_NAME}`: TBD by Elon | `{INDEX_6_DOMAIN}`: TBD by Elon | `{CERT_6_DOMAIN}`: TBD by Elon |

The two domain faces have different responsibilities. The index publishes evidence and never promotes certification. A cert site explains its program and may cite the index, but applications belong in the central ICS hub. Family labels above are not approval of public names, analyte panels, thresholds, domains or program rules for later slots.

## Acquisition and execution checklist

- [ ] Read the current bridge authorization and completion history; identify any newer HOLD, FIX or KILL-GATE.
- [ ] Confirm the index repo exists; resolve the cert repo gate only if needed. Record main/template commits and isolated branch scope.
- [ ] Record Elon's domain ownership verification separately from deployment and public-link activation gates.
- [ ] Fill the approved analytes, HMI product slugs, NEEDED-SLUGS and regulator-source fields.
- [ ] Record `{REED_ACQUISITION_ORDER}` and `{REED_ACQUISITION_TARGETS}`. Reed acquires; Elon stages local packets. This ingest lane does not access a remote research box or retrieve missing papers.
- [ ] Q1: file the scaffold draft PR with empty datasets, metadata and passing build-blocking audits; report and stop at its gate.
- [ ] Q2: verify each COMPLETE packet and its checksums before ingestion; check prior completion first, copy staged inputs, report each cell independently and preserve all HOLDs/mismatches. A missing packet, checksum failure or failed audit blocks only that cell.
- [ ] Q3: draft sourced category standards, exact units and `LIMITS-SOURCES.csv`; preserve gaps and unset ICS ceilings where no approved basis exists. File the bounded draft and stop.
- [ ] Q4: prepare dual-domain registry and cross-link changes with both unapproved faces reserved; pass build/tests and file a draft. Wait for the specific index deploy PASS and separate cert-domain PASS before any public-link activation.
- [ ] Q11: document the proposed program registration, standard references, category mapping and cert-site link target. Keep implementation HOLD until a separate order resolves its gates.
- [ ] File STATUS after each meaningful step and each draft PR. On an unresolved gate include `WAITING_ON: ELON` and its entry ID; do independent authorized work only, never infer approval from time.

A packet must have `PASS_SUMMARY.json` status `COMPLETE` before ingest. This readiness marker does not replace checksum, PDF/manifest identity, prior-completion or scientific checks. Preserve accepted cells and original staged sources. No live page rewrite, source repair, unit conversion or confidence release is implied. Future supplements require separately identified inputs and an explicit order.

## Reusable workflow blocks

The following steps are the 09:10 source text with declared placeholders. Fill only approved parameters. In Q3, the missing-repository ASK/staging paragraph is conditional on an unresolved missing repo. In Q4, the live flip sentence is conditional on its precondition and a later explicit activation order; the current PREP-only override above keeps both faces reserved. Historical wording never overrides a newer HOLD.

**GLOBAL RULES (every order Q1 to Q11):**
1. No em dashes anywhere (use commas, colons, or "to").
2. {LICENSEE_TERMINOLOGY_RULE}
3. No brand names in index content.
4. No invented numbers, limits, CAS numbers, or DOIs. Empty field or TODO beats a guess.
5. Our claim is a standard per product category with scheduled retesting. Never claim or imply testing of every lot.
6. Draft PRs only. No merge, no deploy, no domain or DNS change, no production env change without Elon PASS.
7. No email, no Send, no posting, no mint, no HMTc ceiling edits.
8. Report back under `## CHATGPT → ELON` with an entry headed by the order ID (STATUS with ETA_MIN, NEXT_READ, STARTED, DONE_MIN). Questions go as `ASK` lines with options and a recommendation. No Karen cards. No NEED_KAREN unless Elon says so.

---

#### Q1. {SCAFFOLD_ORDER_ID} ({INDEX_NAME} scaffold)
**Goal:** a working {INDEX_NAME} skeleton with the exact HMI structure, zero data, SEO/LLMO metadata from day one.
**Repo:** {INDEX_REPO} ({INDEX_REPO_STATE}; if it does not exist, STOP and report). Template: HMI local checkout {HMI_TEMPLATE_PATH} (read only), at origin/main if ahead.
**Steps:**
1. Branch `{SCAFFOLD_BRANCH}`. Copy HMI's site framework: quartz config and layout, package.json (and lockfile), tools/ generators and audits, tests/, middleware.ts, vercel.json. Do not copy wiki content, data/, raw/, outputs/, research-pulls/, hmtc-commercial/, node_modules/, or anything HMTc. Rename Heavy Metal Index to {INDEX_NAME}; domain {INDEX_DOMAIN}.
2. Create `wiki/`: index.md, about.md, methodology.md, editorial-standards.md, data.md, errata.md, products/, analytes/ (replaces metals/), sources/ (copy `sources/_TEMPLATE.md` unchanged: DOI or `no_doi_assigned`), regulations/, regulators/.
3. products/: stub pages ONLY for slugs that exist in HMI `wiki/products/`, identical slug strings. Each stub: frontmatter plus empty evidence sections. Exact list ({PRODUCT_SLUG_VERIFICATION}):
   {PRODUCT_SLUGS}
   Re-check each against HMI with `ls`; if any is missing in origin/main, do not create it, list it in the PR body.
4. `NEEDED-SLUGS.md` (do NOT create these pages): {NEEDED_SLUGS}. For each, note any near HMI slug ({VERIFIED_NEAR_SLUG_EXAMPLE}) and recommend reuse vs new slug as an ASK; do not decide.
5. analytes/: stubs for {ANALYTE_LIST}. Names and CAS numbers only from a cited authority ({ANALYTE_IDENTITY_AUTHORITIES}); TODO where not verified.
6. Adapt generators so tables read analytes/ instead of metals/ and render empty tables with zero rows when no data exists. Keep every audit build-blocking (audit-source-dois, audit-link-integrity, audit-product-source-routing, audit-synthesis-firewall).
7. SEO/LLMO from day one: sitemap.xml, robots.txt, llms.txt (site purpose, sections, data policy), canonical URLs on {INDEX_DOMAIN}, JSON-LD (Organization, WebSite, Dataset placeholder, BreadcrumbList; ScholarlyArticle/citation meta on source page template), citation_* meta template for source pages.
8. No fabricated data: no concentrations, no source pages, no DOIs, no counts. Index text must not promote any cert site.
9. Run build and all audits; capture output.
**Deliverable:** DRAFT PR on {INDEX_REPO}. PR body: what was copied (with HMI commit), what was renamed, the slug list, NEEDED-SLUGS.md, analyte TODOs, audit and build output.
**Stop point:** draft PR open, STATUS filed. No merge, no Vercel project, no domain, no DNS.

#### Q2. {INGEST_ORDER_ID} ({CONTAMINANT_FAMILY} paper ingest)
**Goal:** ingest Reed's {CONTAMINANT_FAMILY} papers into {INDEX_ABBREVIATION} source pages and product/analyte rows as fast as they land.
**Repo:** {INDEX_REPO}, branching from the Q1 draft branch (`{INGEST_BRANCH_PREFIX}-<product-slug>` per product).
**Steps:**
1. Elon stages tars to `~/Desktop/papers-for-chatgpt/stage-<date>-{INDEX_STAGE_KEY}-<product-slug>/` with MANIFEST.csv and SHA256SUMS, same pattern as the HMI cells. Run `shasum -a 256 -c SHA256SUMS` first; any FAIL is a BLOCKER for that cell only.
2. Fan out in parallel per product folder (one worker per product slug). Copy, never move, staged files.
3. Per paper: source page from `_TEMPLATE.md` with DOI (or `no_doi_assigned`) as printed in the PDF and MANIFEST, citation meta, analytes, matrix, method ({METHOD_SCOPE}), units as printed. Every number taken from the PDF with page/table locator.
4. Product and analyte rows only from those source pages. Detection limits and non-detects recorded as printed.
5. `MISMATCHES.csv` per cell: DOI in MANIFEST vs PDF, values vs abstract, unit conflicts, duplicates. Log, never fix.
6. Run all audits; a failing audit blocks that cell's PR, not others.
**Hard rules:** numbers only from papers; no external retrieval; no abstracts filed as sources; no brands; confidence HOLD until Elon verifies (DOI resolves, numbers match PDF).
**Deliverable:** one draft PR per product batch (or one combined draft PR if Elon writes so), per-cell report: papers, source pages, rows, mismatches, audit result.
**Stop point:** draft PR(s) and report. No merge, no mint.

#### Q3. {STANDARDS_ORDER_ID} ({CONTAMINANT_FAMILY} certification program and standards draft)
**Goal:** the {CONTAMINANT_FAMILY} certification program and standards draft for {CERT_DOMAIN}, mirroring heavymetalcertified.com repo structure and logic.
**Repo:** {CERT_REPO_STATE}. Template: paleofoundation/heavymetalcertified (read only). First line of your STATUS: `ASK {CERT_REPO_GATE_ID}: (a) Elon creates {CERT_REPO}; (b) draft in stage folder only. Recommend (a).` Until answered, draft in `~/Desktop/papers-for-chatgpt/stage-<date>-{STANDARDS_STAGE_KEY}/` mirroring the heavymetalcertified tree.
**Steps:**
1. Map the heavymetalcertified structure (program pages, standard per category, limits table, methodology, retest schedule, licensee terms) and how it derives ceilings from regulator limits.
2. Build the {CONTAMINANT_FAMILY} limits table from government and regulator sources only, each row cited (agency, document, date, section, URL): {REGULATOR_SOURCES}. Quote values exactly as published, with units and analyte scope.
3. Where no limit exists for an analyte and category: write `no regulatory limit; no ICS ceiling set`. Do not extrapolate.
4. Program text: a standard per product category with scheduled retesting; never every-lot testing. {LICENSEE_TERMINOLOGY_RULE} Cert may cite {INDEX_ABBREVIATION}; {INDEX_ABBREVIATION} never promotes the cert.
**Deliverable:** draft PR (if repo exists) or staged draft, plus `LIMITS-SOURCES.csv` and a gaps list.
**Stop point:** draft only. No deploy, no domain, no DNS.

#### Q4. {HUB_WIRING_ORDER_ID} (wire every vertical, index and cert domain, into the ICS hub)
**Goal:** {CONTAMINANT_FAMILY} vertical live on contaminantstandards.com, and the hub registry modelling both the index domain and the cert domain for every vertical, cross-linked.
**Repo:** paleofoundation/contaminantstandards.
**Precondition:** Elon PASS on an {INDEX_ABBREVIATION} deploy for flipping {CONTAMINANT_FAMILY} index live; Elon PASS per cert domain before any cert link goes public. Before that, prepare the branch, keep the PR draft and write `WAITING_ON: ELON {INDEX_ABBREVIATION} deploy PASS`.
**Steps:**
1. `lib/site-registry.ts`: every vertical carries both `index` and `cert` domains with their own status and publicLink ({REGISTRY_DOMAIN_PAIRS}). Move the {CONTAMINANT_FAMILY} index from reserved to live; keep the {CONTAMINANT_FAMILY} cert reserved until Elon PASS. {OTHER_RESERVED_VERTICALS_RULE}
2. Cross-link hub, each index and each cert site (hub vertical pages, network nav/footer). Cert sites link to the ICS certification hub (Q11) for applying. Index pages never promote cert sites (firewall).
3. Network sitemap (sitemap index of each live index and cert site) and Organization JSON-LD (`subOrganization`/`sameAs` for live domains only, both types).
4. Build and run tests.
**Deliverable:** draft PR with diff summary and build output; HMI/{INDEX_ABBREVIATION}/cert-side link changes listed as separate draft PRs.
**Stop point:** draft PR. No merge, no DNS, no domain adds.


## Q11 registration plan and held implementation

Q11 is included as the source reference below, not as a new build authorization. The existing spec draft was accepted on 2026-10-15 at 14:50; step 2 remains HOLD. For each future loop, prepare only a proposed registration record and link-change list: program ID, approved category and standard-version references, required documents, public cert-site entry route and registry status. Do not add runtime rows, seed real applicants, set hub limits or activate links through this runbook.

Before any separately ordered build, Elon must resolve legacy readiness/direct-entry policy, public identity projection, retention/consent, exact standard-to-category mappings and approved retest rules. No migration, issuance, payment, provisioning or live applicant handling follows from the spec PASS.

#### Q11. ICS-CERT-HUB-1 (one multi-program certification hub on contaminantstandards.com)
**Goal:** a single place on contaminantstandards.com where a licensee applies for, tracks and holds certification in every program (heavy metals, PFAS, microplastics, later the rest). Each cert site ({CERT_SITE_DOMAIN_LIST}) links into it.
**Repo:** paleofoundation/contaminantstandards. Read only references: paleofoundation/heavymetalcertified and heavymetalcertified-app (current application flow; map it, do not break it).
**Steps:**
1. `docs/SPEC-CERT-HUB.md` first: one licensee account; one multi-program application (pick programs and product categories, shared company and facility data entered once, program-specific lab and document requirements); dashboard (per program and category: status, standard version, test reports, retest due dates, certificate); public status/verification page per certificate; program registry driven by `lib/site-registry.ts`; deep links from each cert site (`/certify?program={PROGRAM_ID}` style); migration path for existing heavymetalcertified applicants (no data moved without Elon); roles and admin review; audit log. Program rules: a standard per product category with scheduled retesting, never every-lot testing; limits come only from each program's cited standard, never set in the hub. File STATUS and wait for Elon PASS on the spec.
2. Then the build on a draft PR: application, dashboard, status page, program registry, cert-site link targets, tests, fixture data clearly marked fake.
**Hard rules:** {LICENSEE_TERMINOLOGY_RULE}; no brand names in public examples; no invented limits or fees; no payment provider or production env changes; no real applicant data.
**Deliverable:** spec, then draft PR, plus a list of link changes each cert site needs (as separate draft PRs).
**Stop point:** spec gate, then draft PR. No merge, no deploy, no DNS.

## Q10 delivery boundary

For this order, change only `docs/INDEX-LOOP.md` on `loop-template-1`, branched from main in `paleofoundation/contaminantstandards`. File one draft PR, report it in the bridge and stop with `WAITING_ON: ELON`. Do not modify or resume Q4 PR #2 or Q11 PR #3 checkouts. Neither this runbook nor its checklist authorizes a merge, deployment, domain/DNS action, program registration or another loop.

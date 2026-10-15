# ICS certification hub specification

Order: ICS-CERT-HUB-1, Q11 step 1 only.

Status: DRAFT, awaiting Elon PASS. Prepared 2026-10-15. This PR contains this specification only. It authorizes no implementation, applicant transfer, issuance, provisioning, production migration, payment change, domain change or deployment. Q7 to Q10 remain queued. Q4 PR #2 remains separate and awaits Elon FCI deploy PASS.

## Outcome and claim boundary

One licensee account supports one multi-program application, shared company and facility information, and separate decisions for the selected programs and product categories. The licensee can track evidence requirements, reviews, certificates and retest obligations in one dashboard. Each certification site explains its own program and refers applicants to the central ICS entry point.

The program claim is a standard per product category with scheduled retesting. Testing coverage follows the approved category standard and the evidence actually in scope. The hub does not infer broader inventory coverage. Readiness, application submission, document upload, certification approval and certificate issuance remain distinct events.

Limits come only from each program's cited, approved standard version. The hub neither sets limits nor derives new ones. It does not copy one category's limits or schedule into another. Missing standards, unresolved applicability and unset ceilings block the affected program/category decision. A public index is literature evidence, not a certification decision; an index never promotes a certification program. Certification sites may cite their indexes.

## Read-only baseline and migration findings

The following repository files were opened on 2026-10-15. These are source-code observations, not a production audit. No applicant records, credentials or live databases were accessed.

| Reference | Observed behavior | Consequence for this design |
| --- | --- | --- |
| Hub main `523fdb87e96570c578a96b6eb7c7611fd8ed068c`, [registry](https://github.com/paleofoundation/contaminantstandards/blob/523fdb87e96570c578a96b6eb7c7611fd8ed068c/lib/site-registry.ts), [apply entry](https://github.com/paleofoundation/contaminantstandards/blob/523fdb87e96570c578a96b6eb7c7611fd8ed068c/app/apply/page.tsx), [verify scaffold](https://github.com/paleofoundation/contaminantstandards/blob/523fdb87e96570c578a96b6eb7c7611fd8ed068c/app/verify/page.tsx) | Registry supplies separate index/cert sites and reserved states. Application entry refers to the existing portal host. Verification is a scaffold using example records. | Reuse registry identity and preserve the private/public split. Scaffold status must not be represented as real certification. |
| Same hub commit, [CRM schema](https://github.com/paleofoundation/contaminantstandards/blob/523fdb87e96570c578a96b6eb7c7611fd8ed068c/db/migrations/0001_crm_core.sql), [RLS design](https://github.com/paleofoundation/contaminantstandards/blob/523fdb87e96570c578a96b6eb7c7611fd8ed068c/db/migrations/0002_rls.sql), [public projection](https://github.com/paleofoundation/contaminantstandards/blob/523fdb87e96570c578a96b6eb7c7611fd8ed068c/db/migrations/0003_public_projection.sql), [backend notes](https://github.com/paleofoundation/contaminantstandards/blob/523fdb87e96570c578a96b6eb7c7611fd8ed068c/db/README.md) | Draft schema already separates account, facility, application, program lines, standard versions, evidence, certification, certificate and workflow events. Backend notes say live wiring/provisioning remains gated. | Map these entities before proposing schema changes. SQL presence is not evidence of an applied migration or working isolation. |
| Certification site main `236a3b887216208f973dfea43b9c57ae717cee70`, [application content](https://github.com/paleofoundation/heavymetalcertified/blob/236a3b887216208f973dfea43b9c57ae717cee70/content/apply.md), [intake script](https://github.com/paleofoundation/heavymetalcertified/blob/236a3b887216208f973dfea43b9c57ae717cee70/quartz/components/scripts/applyForm.inline.ts) | Public content describes readiness and direct certification. The form script composes an email and copyable text rather than submitting to a central application API. | Keep current intake intact until a separately approved cutover. No form was submitted or email composed during review. |
| Application master `d40b5a7973b9e3ee207b482b3eb651159d7a4ffd`, [onboarding path](https://github.com/paleofoundation/heavymetalcertified-app/blob/d40b5a7973b9e3ee207b482b3eb651159d7a4ffd/src/app/hmt/onboarding/onboarding-path.ts), [account creation](https://github.com/paleofoundation/heavymetalcertified-app/blob/d40b5a7973b9e3ee207b482b3eb651159d7a4ffd/src/app/hmt/onboarding/actions.ts), [session resolver](https://github.com/paleofoundation/heavymetalcertified-app/blob/d40b5a7973b9e3ee207b482b3eb651159d7a4ffd/src/lib/auth.ts) | Education, confidentiality acknowledgement and account creation precede category selection in the portal. Session resolution currently selects an owned company record. | Preserve acknowledgement provenance; introduce explicit account membership rather than assuming a login proves authority over any company. |
| Same application commit, [application page](https://github.com/paleofoundation/heavymetalcertified-app/blob/d40b5a7973b9e3ee207b482b3eb651159d7a4ffd/src/app/portal/application/page.tsx), [actions](https://github.com/paleofoundation/heavymetalcertified-app/blob/d40b5a7973b9e3ee207b482b3eb651159d7a4ffd/src/app/portal/application/actions.ts), [types](https://github.com/paleofoundation/heavymetalcertified-app/blob/d40b5a7973b9e3ee207b482b3eb651159d7a4ffd/src/app/portal/application/types.ts) | Workspace and submission require a qualifying readiness baseline. Submission also creates schedule and testing-credit records using existing program logic and estimates. | Public direct-route description and code gate are not equivalent. Do not bypass the gate, inherit a default schedule across programs or replay financial side effects. |

Open migration issue: Elon must identify the governing readiness/direct-entry policy before legacy cutover. Preserve existing behavior until then. This does not block drafting the hub design or reviewing it.

## Central entry and program registry

Proposed canonical public entry: `https://contaminantstandards.com/certify`. A cert site can supply a selection hint such as `/certify?program=pfas`. The entry explains the selected program and hands off to the single authenticated portal resolved from `PORTAL` in `lib/site-registry.ts`. The existing portal host remains the proposed private application home; no new host or authentication provider is selected here.

This is one central application experience across programs, not a separate application per cert domain. Retain the existing public institutional surface and private application separation. Replacing or redirecting the existing `/apply` entry is a later approved implementation task. Never send raw application data in a query string.

The registry is the source for program identity, display names, index/cert destinations and visibility. A keyed capability record adds application readiness, approved category taxonomy, standard references, requirement schema references and retest-policy references. Public registry metadata must not contain numerical limits or private evidence. A website being live is not sufficient to enable certification intake.

| Entry hint | Existing registry key | Proposed treatment |
| --- | --- | --- |
| `heavy-metals` | `heavy-metals` | Resolve the approved program and categories. Availability requires an explicit intake capability and applicable published standards. |
| `pfas` | `forever-chemicals` | Explicit alias, with one canonical program identity. Remains unavailable while the program is reserved or applicable standards are on hold. |
| `microplastics` | `microplastics` | Reserved until an approved activation and applicable standards exist. |
| Future keys | Only registered keys | No inferred domains, categories, requirements or limits. |

Validate hints server-side. An unknown key returns an explanation and the program selector. A reserved key shows its unavailable state and cannot create a submitted application line. A valid hint selects an initial interest; it never grants permission, creates a certificate or prevents selection of other eligible programs. Only allowlisted relative return paths survive authentication. Do not use a query parameter as an external redirect target.

Public links require the registry's explicit public-link permission and live site state. Reserved programs must not gain cert/index links through the application selector. Q4 activation remains a separate dependency; this spec does not change its registry rows or inherit its branch.

## Account and shared information

The account represents the licensee organization. Users have explicit memberships and scoped roles; a person may have authorized memberships in more than one account, with an explicit account switch. All private reads and mutations enforce account scope on the server and in the data access layer. Shared contact addresses or similar company names do not establish shared ownership.

Company identity, contacts and facility information are entered once per account and reused across selected program lines. Products and variants retain their identity while a program/category assignment records the applicable taxonomy, market, matrix and standard. Facility access can be shared only through explicit grants from the owning account. Evidence reuse never overrides those grants.

Submission creates an immutable application revision containing shared-data snapshots and the selected program/category assignments. Later edits to company, facility or product data do not silently rewrite a submitted application or an issued certificate. The licensee can propose amendments; the reviewer sees the changed fields and determines which lines need new evidence or review. Concurrent edits use revision checks rather than silent overwrites.

## Multi-program application

The licensee signs in, selects an authorized account, confirms shared data, selects programs and categories, and completes the resulting evidence checklist. Show readiness requirements before accepting a formal submission. A saved interest in an unavailable category is not an application eligible for certification.

One application contains separate program lines and their category/product scopes. Each line pins the approved standard version, requirements version, evidence references and retest policy at submission. Reusing a company document saves re-entry; it does not make a metals report satisfy a PFAS or microplastics requirement. Reuse of laboratory evidence requires explicit compatibility of analytes, matrix, method, basis, recency and permissions, recorded by the reviewer.

Each requirement records its owner, program/category applicability, document type, required laboratory capability, sample identity, method/reporting requirements, validity and source rule. These requirements are supplied by the program standard. No lab accreditation claim is accepted merely because a filename contains a laboratory name. An unreadable, unmatched, expired or incomplete submission stays unresolved with a specific reason.

Proposed operational states per program/category scope: draft, submitted, in review, changes requested, approved, declined and withdrawn. Certification and certificate states remain separate. Submission does not imply approval, and approval does not itself make a certificate active. An application can be partially complete while another line awaits evidence. Display a summary plus the actual line statuses; never give the entire account an unqualified certified label.

Map these operational states to existing schema enums before implementation. The current application container includes commercial states; this spec does not bypass, rename or trigger them. No pricing engine, fee, credit balance, invoice or payment behavior changes in this step. Proposed submissions must be idempotent and transactional so retries cannot create duplicate lines, obligations or issuance events.

## Dashboard and scheduled retesting

For each program and category, the private dashboard shows application status, named scope, pinned standard version and authoritative link, submitted test reports, missing requirements, review questions, decision history, certificate and retest due dates. It distinguishes pending evidence review from accepted evidence. The account summary must not obscure a declined, held or overdue category beneath an active sibling category.

A retest obligation identifies its scope, approved policy version, due date with timezone/boundary semantics, responsible licensee, required evidence and completion state. The dashboard displays the rule that generated the date. No fixed interval is supplied by this spec. An unknown due date is unresolved, not current. Prior dates remain in history when a new decision changes an obligation.

Late evidence does not close an obligation automatically on upload. Review must establish that it satisfies the required scope. Effects on certification status, grace periods and permitted extensions come only from the approved program policy. If that policy is missing, issuance or continued-active status cannot be asserted. Due-state reconciliation and user reads must agree; a delayed background task must not leave an expired certificate appearing active.

Notifications, if later authorized, must be separately designed. This step sends no messages and defines no email provider. The dashboard is sufficient to express the proposed obligations for spec review.

## Roles, review and decisions

| Role | Allowed scope | Boundary |
| --- | --- | --- |
| Account owner | Manage memberships, shared company data and account submissions | Cannot approve own certification or grant staff privileges. |
| Application manager | Prepare and submit authorized program lines | Cannot change approved standards or issue certificates. |
| Product/facility editor | Maintain explicitly granted records and supporting documents | Cannot access unrelated accounts or submit outside grants. |
| Viewer | Read authorized account records | Cannot edit, submit or download outside document permissions. |
| Laboratory uploader | Deposit evidence for a specific assigned request | No account-wide browsing, status changes or certificate issuance. |
| Reviewer | Examine assigned scopes, record findings and request corrections | Cannot change standard limits or approve a case with a declared conflict. |
| Certification administrator | Confirm authorized decisions and manage issuance/status | Requires recorded rationale and appropriate program grant; no implicit data-export authority. |
| Read-only auditor | Inspect granted decision and event history | No mutations or unrestricted document access. |

Require conflict disclosure and recusal before review. A second authorized decision maker confirms issuance; the applicant cannot review or approve its own case. An appeal creates a separate review record and preserves the original rationale. No administrator action may erase the original evidence or silently replace the standard version governing an existing decision.

## Certificates and public verification

Keep the ongoing certification relationship separate from each issued certificate artifact. A certificate binds an opaque identifier, approved program/category scope, standard version references, issuance and validity dates, current document state, decision reference and content hash. Renewal or corrected scope creates a new artifact with a supersession link. It does not overwrite the original.

Proposed public route: `/verify/certificate/<opaque-token>`, supporting one certificate at a time. The existing `VERIFY` registry entry remains the authority for any later host routing; this document does not activate a new domain or redirect. Preserve the existing noindex, no-directory boundary. No bulk certificate list, sequential-ID browsing or public applicant search is introduced.

Only an explicit public projection is readable by the verification service. It shows certificate identifier, issuing program, approved public scope, non-numeric standard label/reference, current status and permitted validity dates. Public identity appears only under the approved publication policy and consent. This spec includes no named commercial examples. Raw reports, concentrations, threshold values, private facilities, contacts, internal notes and application history remain private.

The status must describe the certificate and certification together: active, suspended, expired, revoked, withdrawn or superseded as applicable. Never show a generic valid banner for a suspended record. Unavailable or unverified status fails closed with a neutral explanation. Mutation of a relevant status invalidates the public projection before it can serve an active response; pending or stale projection updates must not preserve an unsupported active state. Store revision and as-of provenance so this can be tested.

The current SQL public projection is a scaffold, and a schema alone is not physical separation. Implementation must demonstrate the documented separate public read plane with credentials that cannot access private CRM data. Keep raw standard values on the authorized program surface. Public verification identifies the governing standard without reproducing its thresholds.

## Private evidence and audit log

Evidence storage must be private and access-checked for upload, preview and download. Use scoped, expiring access after server-side authorization, never permanent public report URLs. File acceptance requires allowed types, actual content inspection, malware handling, size policy, immutable content hashes and a safe preview path. Exact operational limits are configuration decisions for later review, not invented here. Superseded files remain traceable according to the approved retention policy.

Audit account membership changes, shared-data revisions, program selection, submissions, evidence upload/access, reviewer assignment, conflict/recusal, findings, decisions, appeals, standard pins, retest changes, issuance, suspension/revocation, public projection changes and migration actions. Each append-only event records actor, account, subject, action, time, reason, before/after revision references, correlation ID and relevant evidence hashes. Do not put document bodies, secrets or access tokens in logs.

Use append-only events plus restricted correction events, not editable history. State mutations and their audit events must commit together. Private actors see only authorized audit slices. Staff exports require explicit grants and are themselves audited. Tenant isolation, object-level authorization, forged identifiers, replay, concurrent review and public projection leakage are required implementation test cases.

## Migration path for existing applicants

No data moves without a separate Elon authorization. Legacy operation continues unchanged during spec review and implementation planning.

1. After authorization, inventory schema and flow versions without importing applicants into development. Resolve the readiness/direct-entry discrepancy and governing program rules with Elon. Use fabricated fixtures for mapping tests.
2. Define explicit mappings from legacy identity/company records to account membership; applications/products to program lines and category scopes; reports/results to private evidence; schedules to sourced retest obligations; acknowledgements to retained consent history. Legacy financial and credit objects remain in their existing system until separately authorized.
3. Prove ownership through an approved account-linking flow. Do not merge people or organizations solely by matching email addresses. Preserve legacy IDs, original timestamps, document hashes, standard references and status history in a migration ledger. Unmapped category, identity, evidence or status records enter a review queue rather than receiving defaults.
4. Run an authorized dry run against an isolated destination. Reconcile counts, hashes, permissions, open work, standard pins and due dates. Do not replay legacy submission code, which has schedule and credit side effects. Existing dates are preserved pending approved policy review, not recalculated from an import date.
5. Obtain Elon approval for a scoped cutover after reconciliation. Freeze writes for the affected cohort or use an explicitly reviewed synchronization plan so there is one authoritative writer. Keep old IDs and verification links resolvable through an approved mapping. No automatic certificate reissuance occurs on import.
6. Verify access and status after cutover. Rollback restores the prior writer and routes while preserving all new events for reconciliation. Do not delete source records or use rollback to erase issued decisions. Retention, deletion, notices and consent changes need their own approved policy before execution.

## Later cert-site link changes

These are follow-up draft PR scopes, not changes made by this PR and not authorization to open them now.

| Certification property | Proposed future entry | Work after approval |
| --- | --- | --- |
| `heavymetalcertified.com` | `/certify?program=heavy-metals` on the ICS hub | Replace application CTAs and the intake form only after migration/cutover approval; preserve readiness information and existing applicant access. |
| `foreverchemicalstested.com` | `/certify?program=pfas` on the ICS hub | Add the central entry only after program activation and applicable standards approval; no independent application. |
| `microplasticstested.com` | `/certify?program=microplastics` on the ICS hub | Remain reserved until activation; then link to the same entry and program-specific checklist. |
| Later registered certification sites | Validated registry program hint | Reuse the central account and application, with separately approved rules and availability. |

Evidence-index pages receive no certification promotion or application CTA. No HMI, FCI, other certification repo or DNS file changes are part of this PR.

## Acceptance criteria for a later authorized build

- A licensee enters shared company/facility data once and selects eligible program/category scopes in one application. A reserved, unknown or unsupported scope cannot be submitted through UI or direct requests.
- Valid deep links preserve only allowed selection context through login. Invalid keys, external return URLs and forged account IDs are rejected without data exposure.
- Each submitted scope has an immutable standard pin and requirement version. Missing evidence or unset applicable limits block its decision without silently approving it through another program.
- Shared-document reuse is permission-checked and scope-checked. Account isolation holds for page reads, actions, downloads and audit exports.
- Independent line statuses, evidence reviews, standard references, due dates and certificates are visible on the dashboard. An overdue obligation cannot silently remain current.
- An authorized, conflict-free review and confirmed issuance are required for an active certificate. Retry and concurrency tests demonstrate no duplicate issuance or obligations.
- Public verification returns only the permitted single-record projection. Suspension, revocation, expiry and projection failure cannot return active; no raw report, numeric threshold or private applicant data reaches public output.
- Fabricated migration fixtures preserve identity mappings, evidence hashes, existing due dates and history. Unknown mappings remain unresolved. A dry-run reconciliation and rollback demonstration precede real transfer.
- Existing firewall and cross-link audits remain build-blocking. No threshold-setting, payment integration or automatic domain activation is added by the hub.

## Approval boundary and unresolved decisions

Recommended spec approval: accept the central entry, existing private-portal boundary, registry-derived program identities, independent program/category decisions and separate public verification plane. This is a proposed design, not evidence that those capabilities are built.

Before implementation/cutover, Elon must resolve or assign the legacy readiness/direct-entry policy, permitted public identity projection, retention/consent policy, exact standard-to-category mappings and approved retest rules. Existing pricing/provisioning decisions recorded in `db/README.md` remain separate holds. No real applicant transfer or production connection is implied by a spec PASS.

Stop here. File the spec-only draft PR and STATUS. WAITING_ON: ELON, ICS-CERT-HUB-1 spec PASS. Do not implement Q11 step 2, activate Q4, or start Q7 to Q10 from this document.

# The Institute of Contaminant Standards (ICS) — parent site

The institutional authority site at `contaminantstandards.com`: network hub, master brand registry, certificate verification, governance, and the application hub. A **separate deploy** (Next.js App Router) from the per-vertical index and cert sites — the firewall invariant.

## Role split (plan 6.A / 6.B)

The parent owns **institutional / governance** intent ("who certifies contaminants," "how are standards set," "program independence"). It deliberately does **not** own transactional intent — that belongs to each child program. The parent never ranks #1 on a child's transactional term because it answers a different question and links out with transactional anchors; every CTA here is a *referral* to a child, never a conversion.

## Firewall (enforced by `npm run lint:firewall`, build-blocking)

- **No standards math.** No threshold value, percentile (P97/P45), or clean/dirty designation renders on any parent page — the parent describes that standards exist and links to the program.
- **Brand registry is Class A, identity-only.** Opt-in brands only (`indexable`), name/site/programs/products-by-identity/mark-status — never a contamination value, COA, or threshold (Part 12, EU database right).
- **No enumeration.** Search resolves a specific query to at most one brand; there is no browsable directory and no multi-brand list endpoint (plan S7). The runtime no-list guarantee is also asserted by the parent-infra post-deploy crawler.
- **Self-canonical only.** `metadataBase` pins every canonical to the parent domain; no page ever points `rel=canonical` at another domain.
- **schema.org Organization hierarchy.** The parent declares `subOrganization: [live cert programs]`; the independent index is deliberately not a sub-org (its independence is the moat).

## Structure

- `lib/site-registry.ts` — role→domain source of truth; reserved verticals (microplastics, PFAS) render as parent-only "in development" cards.
- `lib/org-schema.ts` — the cross-site `@id` Organization graph.
- `lib/brands.ts` — Class A brand projection + the firewall-safe `resolveBrand` (no enumeration).
- `app/` — homepage hub, `/network`, `/registry` (search-only), `/registry/[slug]`, `/verify` (noindex), `/governance`, `/apply` (referral), `/articles`.

## Institutional maintenance contract

The Heavy Metal Index delegates these canonical records to this site. They must
remain public, versioned, and internally linked:

- the legal operator, ICS trade-name identity, and stable Organization entity;
- named leadership, decision rights, affiliations, and conflict disclosures;
- the evidence/program separation rule and standards-governance policies;
- the impartiality, recusal, publication, correction, consultation, and appeal records;
- editorial, licensing, media, regulatory, legal, and privacy contact routes;
- the institutional publication register and persistent author identifiers;
- the search-only brand registry and single-record certificate verification boundary.

The parent may report literature stewardship counts, but it must read them from
committed Heavy Metal Index-derived feeds rather than hard-code them in page copy:

```bash
HMI_REPO=/path/to/heavymetalindex FEED_DATE=YYYY-MM-DD npm run feeds
```

Commit the regenerated `public/data/*.json` files with the corresponding site
change. The source-level firewall remains build-blocking.

## Backend (Step 6, not yet wired)

The registry and verify pages read scaffold literals today. In production they read a **physically separate published-projection datastore** (allow-by-projection, fail-closed — not a filtered read of the CRM DB), and the application/portal lives on `apply.contaminantstandards.com` against ICS-owned Supabase. See the CRM schema migrations under `db/` and `docs/architecture/application-crm-spec.md` in the index repo.

## Develop

```bash
npm install
npm run dev            # local dev
npm run build          # production build
npm run lint:firewall  # the parent firewall check
```

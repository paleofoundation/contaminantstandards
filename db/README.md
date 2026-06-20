# ICS CRM backend — schema, RLS, projection plane

The commercial spine and firewall for the ICS network, made executable. Design of
record: `docs/architecture/application-crm-spec.md` (in the `heavy-metal-index` repo).

## Migrations

| File | What |
|---|---|
| `migrations/0001_crm_core.sql` | Full CRM schema — identity/org, canonical registry (Brand/Product), the measurement layer (Vertical/Program/StandardVersion), application container, evidence/checklist, pricing objects, output objects (Certification ≠ Certificate), site registry, workflow events. |
| `migrations/0002_rls.sql` | Row-Level Security — Class-C tables locked per account/BillingGroup; staff via `staff_grant`; registry writes gated to `registry_steward`. |
| `migrations/0003_public_projection.sql` | The fail-closed **public projection plane** — a separate `public_projection` schema the public sites read instead of the CRM tables. |

## Firewall invariants made executable (not discipline)

- **`data_class` non-nullable, no default** on every registry / standard / cert / document table — an object cannot persist without an explicit class decision (fail-closed, spec D-C / §5.1).
- **One in-flight pricing-bearing application per BillingGroup** — `application_one_in_flight_per_group` partial unique index makes the per-purchase failure mode (two concurrent priced quotes) structurally unrepresentable (D-B).
- **`StandardVersion.public_label` is non-numeric by construction** — a CHECK rejects any digit, so a threshold can never be laundered through a human-readable label (B2/F5).
- **Opt-in registry** — `brand.indexable` / `product.indexable` default `false`; a brand is public only on opt-in (EU database right, client book).
- **Physically separate public read plane** — the public sites read `public_projection.*` (identity-only LinkCards + the non-numeric certificate-verify projection). Class-C / cert-threshold rows are not in the plane, so they cannot be served — the inverse of the 250 MB lambda failure. `publish_brand()` is fail-closed: a non-opted brand is *absent*, not flagged-hidden.
- **Verify is non-numeric** — `certificate_verify` has a CHECK that keeps a number out of the version label / scope summary; verification proves *which* standard, never *what the number was*.

## Pricing engine

`lib/pricing/` (TypeScript, pure, versioned). `engine.ts` composes the four discount
families (tenure per-cert, breadth trailing-12mo-max, bundle net-new, cross-vertical
cap-exempt) multiplicatively in policy order, with the global cap and hysteresis.
`policy.ts` isolates the schedules — **the §7.4 cap/bonus magnitudes are Karen's open
decisions**. `engine.test.ts` reproduces the spec's §3.4 worked examples (run
`npm test`).

**Two findings surfaced by the engine (for Karen):**
1. **Spec Example A arithmetic slip.** The spec composes `22,500 × 0.97 × 0.88 × 0.98 = 18,821.88`, but `×0.88` is a 12% bundle step inconsistent with the stated bundle schedule (`3 net-new → 10%` = `×0.90`); it double-counts the cross-vertical +2%. Schedule-consistent answer: **$19,249.65**. Example B matches the spec to the cent, confirming the engine. Confirm which is intended.
2. **The 35% global cap is unreachable under the v1 schedules.** Multiplicative 10%×10%×10% maxes at 27.1%, so the cap never binds. It is a non-binding guardrail today — fine, but a conscious fact when §7.4 sizes the cap/bonus.

## Live provisioning is GATED (not done here)

These migrations are the reviewable design of record. They are **not** applied to a
live Supabase project, because:

- The 9 **§7 open decisions** (BillingGroup partition policy, tenure-on-transfer/lapse
  values, refund rules per terminal state, global cap + cross-vertical bonus size, FX
  policy, registry posture, verification single-owner, remediation sequencing, registry
  publish authority) materially shape the schema/policy and are Karen's calls.
- The **ICS legal entity** (DBA of Paleo Certified Inc. vs new entity) is a counsel
  decision that affects billing-entity rows and the database-rights posture.
- Creating a paid Supabase project is an outward-facing, costs-money action.

**Next sub-steps once provisioning is approved:** create the ICS-owned Supabase
project → apply 0001–0003 → grant the public read role on `public_projection` only →
wire the parent site's `/registry` and `/verify` to read the projection plane (replacing
the scaffold literals) → build the authenticated portal (apply wizard, document vault,
brand drafts) with edge-auth as a deploy gate. ICS is the single system-of-record for
raw COAs; the PF brand-intelligence tier consumes a de-identified projection only (S6).

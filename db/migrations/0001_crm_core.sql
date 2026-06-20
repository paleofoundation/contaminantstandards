-- ICS Central Application & CRM — core schema (design of record:
-- docs/architecture/application-crm-spec.md in the heavy-metal-index repo).
--
-- Multi-vertical-aware. The commercial spine (Account, Brand, Product, Application,
-- Quote, Certification, Certificate) is vertical-agnostic; the measurement layer
-- (analytes, bases, thresholds, checklists) is per-vertical-pluggable behind Vertical.
--
-- FIREWALL-CRITICAL invariants enforced here (not by discipline):
--   * data_class is a NON-NULLABLE enum with NO DEFAULT on every registry / standard /
--     cert / document table — an object cannot persist without an explicit class (D-C,
--     fail-closed).
--   * A partial unique index forbids two in-flight pricing-bearing Applications per
--     BillingGroup (D-B: "one priced relationship per cycle"; the per-purchase failure
--     mode is structurally unrepresentable).
--   * Brand/Product.indexable DEFAULT false (opt-in only — EU database right, client book).
--   * StandardVersion.public_label is non-numeric by construction (a CHECK guards it).
--   * The public read plane is a SEPARATE schema (0003), never these tables directly.
--
-- Target: PostgreSQL 15+ (Supabase). RLS in 0002, projection plane in 0003.

create extension if not exists "btree_gist";

-- ---------------------------------------------------------------------------
-- enums
-- ---------------------------------------------------------------------------
create type data_class as enum ('public_registry', 'public_verify', 'cert_threshold', 'private');
create type account_type as enum ('brand_owner','manufacturer','co_packer','retailer','distributor','agency_on_behalf');
create type account_status as enum ('prospect','active','suspended','churned','archived');
create type registry_status as enum ('draft','published','merged_into');
create type membership_role as enum (
  'account_owner','billing_admin','application_manager','product_editor','viewer','lab_upload',
  'cert_admin','reviewer','pricing_admin','registry_steward','read_only_staff');
create type membership_status as enum ('active','invited','revoked');
create type cycle_status as enum ('open','quoted','committed','invoiced','closed');
create type application_state as enum (
  'draft','ready_for_quote','quoted','accepted','invoiced','paid','in_review',
  'changes_requested','partially_issued','issued','closed','abandoned','declined');
create type application_kind as enum ('new','renewal','mid_cycle_addition','partial_renewal','true_up');
create type cert_state as enum ('active','suspended','expired','revoked','withdrawn');
create type standard_status as enum ('draft','published','superseded','withdrawn');
create type doc_validity as enum ('valid','expiring','expired','superseded');
create type site_role as enum ('parent_registry','research_index','cert_program','cert_program_interim','verify','portal_app','journal','courses');
create type site_status as enum ('live','interim','reserved','retired');
create type readable_plane as enum ('public_projection_only','cert_plane','none');

-- ---------------------------------------------------------------------------
-- 1.1 identity & org
-- ---------------------------------------------------------------------------
create table billing_group (
  billing_group_id   text primary key,
  display_name       text not null,
  -- breadth/tenure pooling counters live here (above Account) so a conglomerate
  -- can pool or partition discounts without duplicating Accounts.
  partition_policy   text not null default 'pool',  -- pool | partition_by_brand_house  (§7.1 — Karen)
  created_at         timestamptz not null default now()
);

create table account (
  account_id          text primary key,
  billing_group_id    text not null references billing_group(billing_group_id),
  legal_name          text not null,
  display_name        text not null,
  account_type        account_type not null,
  tax_id              text,
  billing_address     jsonb,
  billing_country     text,                       -- ISO-3166
  primary_jurisdiction text,                      -- drives default ceilings + tax
  status              account_status not null default 'prospect',
  external_billing_ref text,
  created_at          timestamptz not null default now()
);

create table app_user (
  user_id      text primary key,
  email        text not null unique,
  sso_subject  text unique,
  mfa_enabled  boolean not null default false,
  is_staff     boolean not null default false,
  created_at   timestamptz not null default now()
);

create table membership (
  membership_id text primary key,
  user_id       text not null references app_user(user_id),
  account_id    text not null references account(account_id),
  role          membership_role not null,
  scope         jsonb,                       -- vertical_ids/program_ids/brand_ids/variant_ids; null = whole account
  grant_basis   text,                        -- cert scope item this was granted for (auto-expires when removed)
  status        membership_status not null default 'invited',
  unique (user_id, account_id, role)
);

-- staff act via a parallel grant scoped by vertical/program, not a single account
create table staff_grant (
  staff_grant_id text primary key,
  user_id        text not null references app_user(user_id),
  role           membership_role not null,
  vertical_id    text,
  program_id     text,
  status         membership_status not null default 'active'
);

-- ---------------------------------------------------------------------------
-- 1.2 canonical registry entities (entered ONCE, parent-owned)
-- ---------------------------------------------------------------------------
create table brand (
  brand_id        text primary key,
  canonical_name  text not null,
  slug            text not null unique,
  website         text,
  logo_asset_id   text,
  canonical_url   text not null,             -- the ONE public entity page, on the parent registry
  parent_brand_id text references brand(brand_id),
  registry_status registry_status not null default 'draft',
  merged_into     text references brand(brand_id),
  indexable       boolean not null default false,   -- opt-in only
  data_class      data_class not null check (data_class = 'public_registry'),
  -- hard dedup key: normalized legal_name + domain (mint-time, not steward review)
  dedup_key       text not null unique,
  created_at      timestamptz not null default now()
);

create table account_brand (
  account_brand_id text primary key,
  account_id       text not null references account(account_id),
  brand_id         text not null references brand(brand_id),
  control_type     text not null,            -- owner | licensee | authorized_agent
  control_status   text not null default 'claimed' -- claimed | verified | disputed | revoked
);
-- at most one owner+verified per brand at a time
create unique index account_brand_one_verified_owner
  on account_brand (brand_id)
  where control_type = 'owner' and control_status = 'verified';

create table product (
  product_id          text primary key,
  brand_id            text not null references brand(brand_id),
  canonical_name      text not null,
  canonical_url       text not null,
  gtin                text unique,           -- GTIN is the hard dedup key
  product_category_ref text,
  registry_status     registry_status not null default 'draft',
  indexable           boolean not null default false,
  data_class          data_class not null check (data_class = 'public_registry')
);

create table product_variant (
  variant_id   text primary key,
  product_id   text not null references product(product_id),
  variant_name text not null,
  sku          text,
  gtin         text,
  status       text not null default 'active'   -- active | discontinued
  -- NB: formulation/native basis is NOT here — it lives on the (vertical, program)
  -- scope item, because a powder/RTF split is heavy-metals-shaped, not product-shaped.
);

create table facility (
  facility_id  text primary key,             -- first-class shared entity (not account-owned)
  name         text not null,
  address      jsonb,
  data_class   data_class not null check (data_class = 'private')
);

create table facility_grant (
  facility_grant_id text primary key,
  facility_id       text not null references facility(facility_id),
  account_id        text not null references account(account_id),
  audit_valid_until date
  -- accounts inherit "audit on file, valid through X" without seeing the artifact
);

-- ---------------------------------------------------------------------------
-- 1.3 vertical / program / standard version (measurement layer)
-- ---------------------------------------------------------------------------
create table vertical (
  vertical_id              text primary key,
  key                      text not null unique,   -- heavy-metals | microplastics | pfas
  display_name             text not null,
  analyte_namespace        text not null,
  measurement_basis_system text not null,
  threshold_unit           text not null,
  has_regulatory_ceilings  boolean not null default true,
  evidence_capability_schema_ref text,
  site_registry_ref        text
);

create table program (
  program_id                text primary key,
  vertical_id               text not null references vertical(vertical_id),
  key                       text not null,         -- e.g. hmtc
  display_name              text not null,
  scope_taxonomy_ref        text,
  mark_asset_ref            text,
  current_standard_version_id text,
  status                    text not null default 'draft', -- draft|accepting_applications|paused|sunset
  unique (vertical_id, key)
);

create table standard_version (
  standard_version_id     text primary key,
  program_id              text not null references program(program_id),
  semver                  text not null,         -- PATCH editorial / MINOR thresholds / MAJOR methodology
  methodology_version_ref text not null,
  effective_date          date not null,
  superseded_date         date,
  status                  standard_status not null default 'draft',
  threshold_set           jsonb not null,        -- per-cell, polymorphic limit_expression
  -- non-numeric BY CONSTRUCTION: version id + effective date only, never a value.
  public_label            text not null check (public_label !~ '[0-9]'),
  derivation_manifest_ref text,                  -- Class C pointer into the staff workbench
  content_hash            text not null,
  changelog               text,
  data_class              data_class not null check (data_class = 'cert_threshold'),
  unique (program_id, semver)
);

-- ---------------------------------------------------------------------------
-- 1.4 application container — the atomic pricing unit
-- ---------------------------------------------------------------------------
create table account_billing_cycle (
  cycle_id          text primary key,
  billing_group_id  text not null references billing_group(billing_group_id),
  cycle_index       integer not null,            -- feeds tenure
  period_start      date not null,
  period_end        date not null,
  prior_cycle_id    text references account_billing_cycle(cycle_id),
  governing_quote_id text,
  status            cycle_status not null default 'open'
);

create table application (
  application_id   text primary key,
  billing_group_id text not null references billing_group(billing_group_id),
  cycle_id         text not null references account_billing_cycle(cycle_id),
  state            application_state not null default 'draft',
  entry_program_id text,                         -- analytics/return-context ONLY, never a scope limiter
  created_by       text references app_user(user_id),
  quote_id         text,
  kind             application_kind not null default 'new',
  created_at       timestamptz not null default now()
);

-- D-B: at most ONE in-flight pricing-bearing application per billing group.
-- The per-purchase failure mode (two concurrent priced quotes) is unrepresentable.
create unique index application_one_in_flight_per_group
  on application (billing_group_id)
  where state not in ('issued','closed','abandoned','declined');

create table application_line (
  line_id                  text primary key,
  application_id           text not null references application(application_id),
  program_id               text not null references program(program_id),
  pinned_standard_version_id text references standard_version(standard_version_id),
  line_state               text not null default 'pending',  -- runs ahead of siblings
  scope_summary            jsonb
);

create table application_product (
  app_product_id     text primary key,
  line_id            text not null references application_line(line_id),
  variant_id         text not null references product_variant(variant_id), -- non-nullable: "whole product" expands at submit
  native_basis       text not null,             -- resolved from the line's Vertical, not the Product
  intended_scope_items jsonb,
  evidence_set_id    text,
  screening_result_id text,
  ap_state           text not null default 'added'
);

-- ---------------------------------------------------------------------------
-- 1.5 evidence & checklist
-- ---------------------------------------------------------------------------
create table document (
  document_id   text primary key,
  owner_ref     text not null,                  -- account_id or facility_id
  owner_kind    text not null,                  -- account | facility
  doc_type      text not null,
  uploaded_by   text references app_user(user_id),
  file_ref      text not null,
  effective_date date,
  expiry_date   date,
  capability    jsonb not null,                 -- {method, measured_quantities[], detection_basis, matrix, per_analyte_LOQ, lab_accreditation, basis_conversion_provenance}
  validity_state doc_validity not null default 'valid',
  data_class    data_class not null check (data_class = 'private')  -- COA/lab data is ALWAYS private
);

create table checklist_requirement (
  requirement_id    text primary key,
  program_id        text not null references program(program_id),
  doc_type          text not null,
  applies_when      jsonb,
  coverage_required jsonb,
  recency_window    interval,
  cardinality       text not null               -- per_variant | per_account | per_facility
);

create table evidence_set (
  evidence_set_id text primary key,
  owner_ref       text not null,
  items           jsonb not null                -- [{requirement_id, satisfied_by_document_id?, status, auto_match_reason}]
);

create table screening_check (
  screening_id   text primary key,
  app_product_id text not null references application_product(app_product_id),
  screen_type    text not null,
  result         text not null,                 -- pass | needs_review | fail
  auto_decided   boolean not null default false,
  decided_by     text references app_user(user_id)
);

-- ---------------------------------------------------------------------------
-- 1.7 pricing objects (immutable, frozen on quote)
-- ---------------------------------------------------------------------------
create table pricing_plan (
  pricing_plan_id text primary key,
  vertical_id     text references vertical(vertical_id),     -- null = global
  program_id      text references program(program_id),
  version         text not null,
  status          text not null default 'draft',
  effective_from  date,
  effective_to    date,
  currency_base   text not null default 'USD',
  unit_basis      text,
  list_unit_price numeric(12,2),
  setup_fee       numeric(12,2) default 0,
  tier_breaks     jsonb,                         -- intra-program SKU volume
  min_floor_price numeric(12,2) default 0
);

create table discount_policy (
  discount_policy_id text primary key,
  scope              text not null,              -- bundle | portfolio_breadth | tenure | cross_vertical_bonus | composition | global_cap
  version            text not null,
  effective_from     date,
  effective_to       date,
  applies_to         jsonb,
  rule               jsonb not null,
  stack_group        text
);

create table quote (
  quote_id                  text primary key,
  application_id            text not null references application(application_id),
  status                    text not null default 'draft', -- draft|issued|accepted|superseded|declined
  pricingplan_versions      jsonb not null,
  discountpolicy_versions   jsonb not null,
  composition_policy_version text not null,
  global_cap_policy_version text not null,
  fx_rate_snapshot          jsonb,
  fx_policy                 text not null default 'lock_at_accept',  -- §7.5 — Karen
  portfolio_snapshot        jsonb not null,
  supersedes_quote_id       text references quote(quote_id),
  total_base                numeric(12,2),
  created_at                timestamptz not null default now()
);

create table quote_line (
  quote_line_id text primary key,
  quote_id      text not null references quote(quote_id),
  line_id       text references application_line(line_id),
  list_amount   numeric(12,2) not null,
  net_amount    numeric(12,2) not null,
  allocated_discounts jsonb
);

create table quote_discount (
  quote_discount_id text primary key,
  quote_id          text not null references quote(quote_id),
  family            text not null,              -- tenure | breadth | bundle | cross_vertical
  rate              numeric(6,4) not null,
  cap_exempt        boolean not null default false
);

-- money layer with first-class reversal objects
create table invoice (
  invoice_id text primary key,
  quote_id   text not null references quote(quote_id),
  cycle_id   text not null references account_billing_cycle(cycle_id),
  amount     numeric(12,2) not null,
  currency   text not null,
  tax_detail jsonb,
  status     text not null default 'open'
);
create table payment   (payment_id text primary key, invoice_id text references invoice(invoice_id), amount numeric(12,2), currency text, status text);
create table credit_note(credit_note_id text primary key, invoice_id text references invoice(invoice_id), amount numeric(12,2), reason text);
create table refund     (refund_id text primary key, payment_id text references payment(payment_id), amount numeric(12,2), reason text);
create table dispute    (dispute_id text primary key, invoice_id text references invoice(invoice_id), state text, opened_at timestamptz default now());

-- ---------------------------------------------------------------------------
-- 1.8 output objects — Certification ≠ Certificate
-- ---------------------------------------------------------------------------
create table certification (
  certification_id text primary key,
  account_id       text not null references account(account_id),
  program_id       text not null references program(program_id),
  brand_id         text not null references brand(brand_id),
  pinned_cells     jsonb not null,              -- one pin per in-scope analyte → a StandardVersion cell
  cert_state       cert_state not null default 'active',
  tenure_intervals jsonb not null default '[]', -- cumulative paid-active intervals (tenure lives HERE)
  originating_application_id text,
  current_cycle_id text references account_billing_cycle(cycle_id),
  data_class       data_class not null check (data_class = 'private')
);

create table certification_scope_item (
  scope_item_id    text primary key,
  certification_id text not null references certification(certification_id),
  variant_id       text not null references product_variant(variant_id),
  native_basis     text not null,
  analytes_covered jsonb not null,
  grandfather_until date,                       -- per pinned cell re-test date
  evidence_ref     text,
  status           text not null default 'active'
);

create table certificate (
  certificate_id   text primary key,            -- opaque, non-sequential
  certification_id text not null references certification(certification_id),
  frozen_cell_pins jsonb not null,
  scope_snapshot   jsonb not null,
  issued_at        timestamptz not null default now(),
  valid_from       date,
  valid_until      date,
  cert_doc_state   text not null default 'issued', -- issued | superseded | revoked
  -- registry-relative verify token, NEVER a baked per-vertical domain (immortal parent verify)
  verification_token text not null,
  document_asset_ref text,
  content_hash     text not null,
  data_class       data_class not null check (data_class = 'public_verify')
);

create table asset (
  asset_id text primary key,
  program_id text references program(program_id),
  kind     text not null,                       -- mark | badge | embed
  ref      text
);
create table asset_grant (
  asset_grant_id text primary key,
  asset_id       text not null references asset(asset_id),
  certification_id text not null references certification(certification_id),
  embed_token    text not null,                 -- resolves to verify subdomain, rel=nofollow ugc + noindex
  status         text not null default 'active'
);

create table enforcement_action (
  enforcement_id   text primary key,
  certification_id text references certification(certification_id),
  publication_state text not null default 'internal', -- internal | public
  action           text not null,               -- suspend | revoke | notice
  reason           text,
  created_at       timestamptz not null default now()
);

create table ownership_transfer (
  transfer_id      text primary key,
  brand_id         text not null references brand(brand_id),
  from_account_id  text references account(account_id),
  to_account_id    text references account(account_id),
  transferred_at   timestamptz not null default now()
  -- certifications carry their own tenure_intervals to the new account
);

-- ---------------------------------------------------------------------------
-- 1.9 site registry — role→domain, never hardcoded
-- ---------------------------------------------------------------------------
create table site_registry (
  site_registry_id    text primary key,
  vertical_id         text references vertical(vertical_id),
  role                site_role not null,
  domain              text not null,
  status              site_status not null,
  canonical_for_role  boolean not null default true,
  index_policy        text not null default 'index',   -- index | noindex
  readable_data_plane readable_plane not null,         -- MANDATORY, no default (R7)
  redirect_to         text
);
-- R1: one canonical live domain per (vertical, role)
create unique index site_registry_one_canonical
  on site_registry (vertical_id, role)
  where canonical_for_role and status = 'live';

-- ---------------------------------------------------------------------------
-- workflow events — immutable audit (reconstruct-the-record-on-a-date)
-- ---------------------------------------------------------------------------
create table workflow_event (
  event_id     text primary key,
  subject_kind text not null,
  subject_id   text not null,
  from_state   text,
  to_state     text,
  actor        text,
  reason       text,
  system_or_human text not null,
  occurred_at  timestamptz not null default now()
);

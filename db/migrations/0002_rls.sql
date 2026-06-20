-- ICS CRM — Row-Level Security (Class C: private, account-scoped).
--
-- The portal is auth-walled and every Class-C table is RLS-locked so an
-- authenticated brand user sees ONLY their own account(s)' rows, never another
-- brand's (the multi-tenant isolation the spec mandates). Staff act via
-- staff_grant. The PUBLIC site never reads these tables at all — it reads the
-- separate public_projection schema (0003), so even a misconfigured grant cannot
-- leak Class-C data to an index surface.
--
-- Assumes Supabase auth: auth.uid() is the app_user.user_id (or maps via sso_subject).

-- Resolve the accounts the current user may access (active memberships only).
create or replace function current_user_account_ids()
returns setof text
language sql stable security definer set search_path = public as $$
  select account_id from membership
   where user_id = auth.uid()::text and status = 'active'
$$;

create or replace function current_user_is_staff()
returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from app_user where user_id = auth.uid()::text and is_staff)
$$;

-- Helper: turn an account-scoped table into "my accounts or staff".
-- Applied below per table.

-- account ---------------------------------------------------------------------
alter table account enable row level security;
create policy account_self on account for select
  using (account_id in (select current_user_account_ids()) or current_user_is_staff());
create policy account_staff_write on account for all
  using (current_user_is_staff()) with check (current_user_is_staff());

-- application + children ------------------------------------------------------
alter table application enable row level security;
create policy application_scoped on application for all
  using (
    billing_group_id in (
      select billing_group_id from account where account_id in (select current_user_account_ids())
    ) or current_user_is_staff()
  )
  with check (
    billing_group_id in (
      select billing_group_id from account where account_id in (select current_user_account_ids())
    ) or current_user_is_staff()
  );

alter table application_line enable row level security;
create policy application_line_scoped on application_line for all
  using (
    application_id in (select application_id from application) or current_user_is_staff()
  );

alter table application_product enable row level security;
create policy application_product_scoped on application_product for all
  using (
    line_id in (select line_id from application_line) or current_user_is_staff()
  );

-- documents (COA/lab data — ALWAYS private, account/facility owned) ------------
alter table document enable row level security;
create policy document_owner on document for all
  using (
    (owner_kind = 'account' and owner_ref in (select current_user_account_ids()))
    or (owner_kind = 'facility' and owner_ref in (
        select facility_id from facility_grant where account_id in (select current_user_account_ids())))
    or current_user_is_staff()
  )
  with check (
    (owner_kind = 'account' and owner_ref in (select current_user_account_ids()))
    or current_user_is_staff()
  );

alter table evidence_set enable row level security;
create policy evidence_set_owner on evidence_set for all
  using (owner_ref in (select current_user_account_ids()) or current_user_is_staff());

-- quotes / invoices / money (account-scoped through billing group) ------------
alter table quote enable row level security;
create policy quote_scoped on quote for select
  using (
    application_id in (select application_id from application) or current_user_is_staff()
  );

alter table invoice enable row level security;
create policy invoice_scoped on invoice for select
  using (quote_id in (select quote_id from quote) or current_user_is_staff());

-- certifications (the live private relationship) ------------------------------
alter table certification enable row level security;
create policy certification_scoped on certification for select
  using (account_id in (select current_user_account_ids()) or current_user_is_staff());

alter table certification_scope_item enable row level security;
create policy certification_scope_scoped on certification_scope_item for select
  using (certification_id in (select certification_id from certification) or current_user_is_staff());

-- registry write-gating: only registry_steward staff publish/merge canonical
-- Brand/Product. Brand users propose drafts (via the app, mediated by staff).
alter table brand enable row level security;
create policy brand_staff_publish on brand for all
  using (current_user_is_staff()) with check (current_user_is_staff());
-- (Public READS of opt-in brands do NOT come from this table — see 0003.)

alter table product enable row level security;
create policy product_staff_publish on product for all
  using (current_user_is_staff()) with check (current_user_is_staff());

-- NOTE: standard_version (cert_threshold) and the staff workbench derivation are
-- never exposed to brand users or any public plane; they are staff-only and never
-- enter the public_projection schema.
alter table standard_version enable row level security;
create policy standard_version_staff on standard_version for all
  using (current_user_is_staff()) with check (current_user_is_staff());

-- ICS — the fail-closed PUBLIC PROJECTION plane (SEO invariant 4 / firewall).
--
-- The public sites (parent registry, cert sites, verify) NEVER read the CRM tables.
-- They read THIS separate schema, which contains ONLY allow-by-projection data:
-- identity-only Brand/Product LinkCards (opt-in) and the Certificate public-verify
-- projection. By construction it has NO derivation, NO contamination, NO thresholds,
-- NO private columns — so even a misconfigured read cannot leak Class-C/cert_threshold
-- data. This is the inverse of the 250 MB lambda failure: the rows aren't in the
-- plane, so they can't be served. Populated by an explicit publish step (registry
-- steward / issuance), never by a live filtered read of the CRM.

create schema if not exists public_projection;

-- LinkCard: the ONLY shape in which a Brand crosses to a public surface (invariant 3).
-- NOTE: no body, no description, no spec, no numbers — "links not copies" enforced
-- in the wire format. A row exists ONLY for an opt-in (indexable) published brand.
create table public_projection.brand_card (
  brand_id      text primary key,
  display_name  text not null,
  canonical_url text not null,             -- the ONE owner-domain URL (self-canonical)
  slug          text not null unique,
  website       text,
  logo_url      text,
  mark_status   text not null,            -- active | suspended | expired (live-ish; refreshed on publish)
  programs      text[] not null default '{}',
  published_at  timestamptz not null default now()
  -- DELIBERATELY ABSENT: any contamination value, COA, threshold, pass-margin,
  -- per-analyte result, account/billing linkage, or free-text description.
);

create table public_projection.product_card (
  product_id   text primary key,
  brand_id     text not null references public_projection.brand_card(brand_id) on delete cascade,
  display_name text not null,
  canonical_url text not null,
  gtin         text,
  category     text not null
  -- identity only; no numbers.
);

-- Certificate public-verify projection (Class B). Single-record lookup by token;
-- NO threshold value, only WHICH standard (opaque version token) + live status.
create table public_projection.certificate_verify (
  verification_token text primary key,
  brand_id           text not null,
  program_display    text not null,
  standard_version_label text not null,  -- non-numeric label (version id + effective date)
  scope_summary      text not null,      -- analyte SCOPE disclosure, never a limit value
  public_status      text not null,      -- runtime-read of live cert state at verify time
  valid_from         date,
  valid_until        date
);
-- a CHECK keeps a number from ever entering the version label or scope summary
alter table public_projection.certificate_verify
  add constraint verify_no_numeric_label check (standard_version_label !~ '[0-9]{2,}');

-- Publish function: copies ONLY opt-in published brands into the projection.
-- Fail-closed: a brand that is not published+indexable is simply absent (not a
-- filtered visibility flag — it does not exist in the plane).
create or replace function public_projection.publish_brand(p_brand_id text)
returns void
language plpgsql security definer set search_path = public, public_projection as $$
declare b record;
begin
  select * into b from public.brand
    where brand_id = p_brand_id and registry_status = 'published' and indexable = true;
  if not found then
    -- not eligible → ensure it is ABSENT from the public plane (fail-closed)
    delete from public_projection.brand_card where brand_id = p_brand_id;
    return;
  end if;
  insert into public_projection.brand_card (brand_id, display_name, canonical_url, slug, website, logo_url, mark_status, programs, published_at)
  values (b.brand_id, b.canonical_name, b.canonical_url, b.slug, b.website, b.logo_asset_id, 'active', '{}', now())
  on conflict (brand_id) do update
    set display_name = excluded.display_name,
        canonical_url = excluded.canonical_url,
        website = excluded.website,
        published_at = now();
end $$;

-- The public read role gets SELECT on the projection schema ONLY — never on public.*.
-- (In Supabase, grant to the anon/public_reader role; the CRM schema stays ungranted.)
-- grant usage on schema public_projection to public_reader;
-- grant select on all tables in schema public_projection to public_reader;

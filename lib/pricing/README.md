# Pricing — SUPERSEDED by the existing PF calculator

**Do not wire this engine into the application.** Per Karen's decision (2026-06-20),
ICS pricing **adopts the existing paleofoundation.com calculator**, which already
exists and is the source of truth:

- `~/paleo-foundation/src/lib/pricing.ts` (+ `renewal-pricing.ts`)
- The model is: **revenue-band × cert-count scaling × multi-year discount**, not the
  abstract tenure/breadth/bundle/cross-vertical engine the CRM spec described.
  - CP (Certified Paleo: Paleo/Keto/Grain-Free, up to 3): 1=base, 2=×1.40, 3=×1.70
  - HMT (Heavy Metal Tested): lookup tables by bundled-CP count
  - Multi-year: 2yr = 10%/yr, 3yr = 20%/yr; revenue-band fee tiers

## Why these files remain

`engine.ts` / `policy.ts` / `engine.test.ts` are a **reference artifact** of the CRM
spec's pricing section (application-crm-spec.md §3). They are kept because the
analysis is useful and because the tests surfaced two real issues in the spec's
worked examples (Example A double-counts the cross-vertical discount → $19,249.65 not
$18,821.88; the 35% cap is unreachable under the v1 schedules). They are **not** the
pricing logic ICS uses.

## When the multi-vertical extension is needed

The PF calculator covers the heavy-metals vertical (HMT) today. When microplastics /
PFAS launch and pricing must span verticals, extend the PF calculator's model rather
than reviving this abstract engine — adopt the existing structure, don't fork it.

import { test } from "node:test"
import assert from "node:assert/strict"
import { priceQuote } from "./engine"
import { PRICING_POLICY_V1 } from "./policy"

// These reproduce application-crm-spec.md §3.4 to the cent. They are the contract:
// if the engine drifts from the design of record, these fail.

test("Example A — year 1, 3 programs / 2 verticals (acquisition)", () => {
  // SPEC DISCREPANCY (flagged to Karen): the spec's Example A composes
  //   22,500 × 0.97 × 0.88 × 0.98 = 18,821.88
  // but the ×0.88 is a 12% bundle step, inconsistent with the spec's own bundle
  // schedule ({3 net-new → 10%} = ×0.90) and §3.2 (cross-vertical applied ONCE,
  // separately, cap-exempt). The 0.88 effectively double-counts the +2%
  // cross-vertical (once folded in, once as the explicit ×0.98). Applying the
  // schedule consistently — breadth 3%, bundle 10%, cross-vertical 2% once — gives
  //   22,500 × 0.97 × 0.90 × 0.98 = 19,249.65.
  // Example B (no such fold) matches the spec to the cent, so the engine's
  // composition is correct; this asserts the schedule-consistent value.
  const r = priceQuote(
    {
      lines: [
        { lineId: "hm", programKey: "hmtc", verticalKey: "heavy-metals", listAmount: 9000, tenureYears: 0 },
        { lineId: "mp", programKey: "mptc", verticalKey: "microplastics", listAmount: 9000, tenureYears: 0 },
        { lineId: "pfas", programKey: "pfastc", verticalKey: "pfas", listAmount: 4500, tenureYears: 0 },
      ],
      activeCertCount: 3,
      netNewPrograms: 3,
    },
    PRICING_POLICY_V1,
  )
  assert.equal(r.listSubtotal, 22500)
  assert.equal(r.breadthRate, 0.03)
  assert.equal(r.bundleRate, 0.1)
  assert.equal(r.afterBundle, 19642.5) // 22500 × 0.97 × 0.90 (bundle = 10%, schedule-consistent)
  assert.equal(r.crossVerticalRate, 0.02)
  assert.equal(r.total, 19249.65) // × 0.98 cross-vertical, cap-exempt, applied once
  assert.equal(r.capBound, false)
})

test("Example B — year 3 renewal, 4 certs / 2 verticals, all families → ~$27,773.00", () => {
  const r = priceQuote(
    {
      lines: [
        { lineId: "hm", programKey: "hmtc", verticalKey: "heavy-metals", listAmount: 9450, tenureYears: 3 },
        { lineId: "mp-b1", programKey: "mptc", verticalKey: "microplastics", listAmount: 9450, tenureYears: 3 },
        { lineId: "mp-b2", programKey: "mptc", verticalKey: "microplastics", listAmount: 6300, tenureYears: 1 },
        { lineId: "pfas", programKey: "pfastc", verticalKey: "pfas", listAmount: 4725, tenureYears: 3 },
      ],
      activeCertCount: 4,
      netNewPrograms: 0,
    },
    PRICING_POLICY_V1,
  )
  assert.equal(r.afterTenure, 29216.25) // per-line tenure
  assert.equal(r.breadthRate, 0.03) // 4 certs → {3:3%} band
  assert.equal(r.bundleRate, 0) // nothing net-new
  assert.equal(r.crossVerticalRate, 0.02) // holding ≥2 verticals
  // 29216.25 × 0.97 × 0.98 = 27772.967…; the spec displays this rounded as ≈$27,773.00
  assert.equal(r.total, 27772.97)
  assert.ok(Math.abs(r.total - 27773.0) < 0.05)
})

test("path-independence — same end-state portfolio prices identically", () => {
  const base = {
    lines: [
      { lineId: "a", programKey: "hmtc", verticalKey: "heavy-metals", listAmount: 9000, tenureYears: 2 },
      { lineId: "b", programKey: "mptc", verticalKey: "microplastics", listAmount: 9000, tenureYears: 2 },
    ],
    activeCertCount: 2,
    netNewPrograms: 0,
  }
  const r1 = priceQuote(base, PRICING_POLICY_V1)
  // reorder lines (different assembly path) → identical total
  const r2 = priceQuote({ ...base, lines: [base.lines[1], base.lines[0]] }, PRICING_POLICY_V1)
  assert.equal(r1.total, r2.total)
})

test("with v1 schedules the global cap is unreachable (max composed discount ≈27.1%)", () => {
  // Multiplicative 10%×10%×10% = 1 − 0.9³ = 27.1%, below the 35% cap — so the cap
  // is a non-binding guardrail under v1. Documented so a future schedule change
  // that approaches the cap is a conscious decision, not a surprise.
  const r = priceQuote(
    {
      lines: [
        { lineId: "a", programKey: "hmtc", verticalKey: "heavy-metals", listAmount: 1000, tenureYears: 7 },
        { lineId: "b", programKey: "mptc", verticalKey: "microplastics", listAmount: 1000, tenureYears: 7 },
      ],
      activeCertCount: 8, // 10% breadth
      netNewPrograms: 3, // 10% bundle
    },
    PRICING_POLICY_V1,
  )
  assert.equal(r.capBound, false)
  assert.ok(r.composedDiscountFraction < 0.272 && r.composedDiscountFraction > 0.27)
})

test("global cap binds + cross-vertical stays exempt when the cap is low", () => {
  // Force the clamp with a 20% cap policy (the v1 27.1% composed discount exceeds it).
  const lowCap = { ...PRICING_POLICY_V1, globalCap: 0.2 }
  const r = priceQuote(
    {
      lines: [
        { lineId: "a", programKey: "hmtc", verticalKey: "heavy-metals", listAmount: 1000, tenureYears: 7 },
        { lineId: "b", programKey: "mptc", verticalKey: "microplastics", listAmount: 1000, tenureYears: 7 },
      ],
      activeCertCount: 8,
      netNewPrograms: 3,
    },
    lowCap,
  )
  assert.equal(r.capBound, true)
  assert.equal(r.composedDiscountFraction, 0.2) // clamped to the cap
  assert.equal(r.crossVerticalRate, 0.02)
  assert.equal(r.total, 2000 * 0.8 * 0.98) // 1568 — cross-vertical applied on the capped remainder
})

test("hysteresis — a shrunk portfolio holds the prior breadth tier this cycle", () => {
  // current count dropped to 3 (3% tier) but prior tier floor was 5 (6% tier)
  const r = priceQuote(
    {
      lines: [{ lineId: "a", programKey: "hmtc", verticalKey: "heavy-metals", listAmount: 1000, tenureYears: 0 }],
      activeCertCount: 3,
      netNewPrograms: 0,
      heldBreadthCountFloor: 5,
    },
    PRICING_POLICY_V1,
  )
  assert.equal(r.breadthRate, 0.06) // held at the prior (higher) tier, not dropped to 3%
})

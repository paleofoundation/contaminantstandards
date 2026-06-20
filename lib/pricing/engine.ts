// Pricing engine — pure, deterministic, versioned.
//
// Core invariant (the founder's central requirement):
//   total = f(portfolio_snapshot) − discounts(f, portfolio)
// identical regardless of the PATH by which the portfolio was assembled. The four
// families are computed at the portfolio level and allocated back to lines for
// rev-rec. Composition is multiplicative on a running remainder, in the policy's
// versioned order; the global cap binds the composed discount but the
// cross-vertical bonus is cap-exempt (the flywheel must keep biting for the
// broadest accounts). Hysteresis: a held breadth-tier floor never lets a portfolio
// shrink raise the unit price within a cycle.
//
// Verified against application-crm-spec.md §3.4 Examples A & B (see engine.test).

import { PricingPolicy, rateFor } from "./policy"

export interface QuoteLineInput {
  lineId: string
  programKey: string
  verticalKey: string
  listAmount: number
  /** Σ paid-active years for the certification this line renews (0 for year 1 / net-new). */
  tenureYears: number
}

export interface QuoteInput {
  lines: QuoteLineInput[]
  /** Distinct active program certifications across the BillingGroup (trailing-12mo max). */
  activeCertCount: number
  /** Net-new programs added THIS cycle. */
  netNewPrograms: number
  /**
   * Hysteresis: the breadth COUNT floor held from a prior cycle. If the portfolio
   * shrank, the prior (higher) tier is held this cycle. Omit for no floor.
   */
  heldBreadthCountFloor?: number
}

export interface QuoteResult {
  listSubtotal: number
  /** post-tenure remainder (per-line tenure applied). */
  afterTenure: number
  breadthRate: number
  afterBreadth: number
  bundleRate: number
  afterBundle: number
  /** discount fraction of (tenure×breadth×bundle), before the cross-vertical bonus. */
  composedDiscountFraction: number
  /** true if the global cap clamped the composed discount. */
  capBound: boolean
  crossVerticalRate: number
  /** final payable total in base currency. */
  total: number
  /** per-line allocation (pro-rata by list for breadth/bundle; tenure to its own line). */
  lineAllocations: { lineId: string; net: number }[]
  policyVersion: string
}

function round2(n: number): number {
  return Math.round((n + Number.EPSILON) * 100) / 100
}

export function priceQuote(input: QuoteInput, policy: PricingPolicy): QuoteResult {
  const listSubtotal = input.lines.reduce((s, l) => s + l.listAmount, 0)

  // 1. Tenure — per line, allocated only to the line that earned it.
  const lineAfterTenure = input.lines.map((l) => {
    const rate = rateFor(policy.tenure, l.tenureYears)
    return { lineId: l.lineId, listAmount: l.listAmount, net: l.listAmount * (1 - rate) }
  })
  const afterTenure = lineAfterTenure.reduce((s, l) => s + l.net, 0)

  // 2. Breadth — single rate on the post-tenure remainder, with hysteresis floor.
  const effectiveBreadthCount = Math.max(
    input.activeCertCount,
    input.heldBreadthCountFloor ?? input.activeCertCount,
  )
  const breadthRate = rateFor(policy.breadth, effectiveBreadthCount)
  const afterBreadth = afterTenure * (1 - breadthRate)

  // 3. Bundle — net-new programs this cycle, on the post-breadth remainder.
  const bundleRate = rateFor(policy.bundle, input.netNewPrograms)
  let afterBundle = afterBreadth * (1 - bundleRate)

  // Global cap on the COMPOSED discount (cross-vertical exempt). Single clamp.
  let composedDiscountFraction = 1 - afterBundle / listSubtotal
  let capBound = false
  if (composedDiscountFraction > policy.globalCap) {
    afterBundle = listSubtotal * (1 - policy.globalCap)
    composedDiscountFraction = policy.globalCap
    capBound = true
  }

  // 4. Cross-vertical bonus — applied last, cap-EXEMPT, when ≥2 verticals spanned.
  const verticalsSpanned = new Set(input.lines.map((l) => l.verticalKey)).size
  const crossVerticalRate = verticalsSpanned >= 2 ? policy.crossVerticalBonus : 0
  const total = afterBundle * (1 - crossVerticalRate)

  // allocation: scale each line's post-tenure net by the same breadth×bundle×cap×cross factor.
  const postTenureToTotalFactor = afterTenure === 0 ? 0 : total / afterTenure
  const lineAllocations = lineAfterTenure.map((l) => ({
    lineId: l.lineId,
    net: round2(l.net * postTenureToTotalFactor),
  }))

  return {
    listSubtotal: round2(listSubtotal),
    afterTenure: round2(afterTenure),
    breadthRate,
    afterBreadth: round2(afterBreadth),
    bundleRate,
    afterBundle: round2(afterBundle),
    composedDiscountFraction: Math.round(composedDiscountFraction * 1e6) / 1e6,
    capBound,
    crossVerticalRate,
    total: round2(total),
    lineAllocations,
    policyVersion: policy.version,
  }
}

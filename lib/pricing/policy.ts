// Versioned discount policy — the rate card and the four discount families.
//
// THESE NUMBERS ARE THE SPEC'S DEFAULTS AND ARE OPEN §7 DECISIONS FOR KAREN
// (application-crm-spec.md §7.4): the global cap magnitude and the cross-vertical
// bonus size in particular ("the bonus is the flywheel and may deserve to be
// materially larger"). They are isolated here as a single versioned object so a
// change is one edit, snapshotted onto every Quote — never hardcoded in the engine.

export interface DiscountSchedule {
  /** Sorted ascending by threshold; the highest threshold ≤ value wins. */
  tiers: { atLeast: number; rate: number }[]
}

export interface PricingPolicy {
  version: string
  /** Tenure by Σ paid-active years, per certification. */
  tenure: DiscountSchedule
  /** Breadth by count of distinct active program certifications (trailing-12mo max). */
  breadth: DiscountSchedule
  /** Bundle by net-new programs added THIS cycle. */
  bundle: DiscountSchedule
  /** Cross-vertical holding bonus — flat, applied when ≥2 verticals are spanned. */
  crossVerticalBonus: number
  /** Global cap on the composed discount (tenure×breadth×bundle). Cross-vertical is EXEMPT. */
  globalCap: number
  /** Composition order (versioned policy object). */
  compositionOrder: ("tenure" | "breadth" | "bundle")[]
}

// v1 — the schedules used in the spec's worked examples (§3.4). Defaults; Karen sets final.
export const PRICING_POLICY_V1: PricingPolicy = {
  version: "pricing-policy-v1",
  tenure: { tiers: [{ atLeast: 2, rate: 0.03 }, { atLeast: 4, rate: 0.06 }, { atLeast: 7, rate: 0.1 }] },
  breadth: { tiers: [{ atLeast: 3, rate: 0.03 }, { atLeast: 5, rate: 0.06 }, { atLeast: 8, rate: 0.1 }] },
  bundle: { tiers: [{ atLeast: 2, rate: 0.05 }, { atLeast: 3, rate: 0.1 }] },
  crossVerticalBonus: 0.02, // §7.4 — Karen may make this materially larger (the flywheel)
  globalCap: 0.35, // §7.4 — Karen
  compositionOrder: ["tenure", "breadth", "bundle"],
}

export function rateFor(schedule: DiscountSchedule, value: number): number {
  let rate = 0
  for (const t of schedule.tiers) {
    if (value >= t.atLeast) rate = t.rate
  }
  return rate
}

export type GovernanceNote = {
  slug: string;
  number: string;
  identifier: string;
  title: string;
  disposition: string;
  boundary: string;
  analytes: string;
  anchorSources: number;
  audience: string[];
  hmi: string;
  hmtc: string;
};

export const governanceNotes: GovernanceNote[] = [
  {
    "slug": "dietary-nickel-plant-staple-accumulation",
    "number": "001",
    "identifier": "ICS-EGN-2026-001",
    "title": "Dietary nickel and the botanical floor",
    "disposition": "Keep nickel controls matrix-specific, disclose naturally elevated staple categories, and apply improvement rules without implying that agricultural sourcing can eliminate a physiological plant-uptake pathway.",
    "boundary": "The occurrence pattern informs category scope and surveillance. It does not select or relax an initial certification limit.",
    "analytes": "Nickel",
    "anchorSources": 6,
    "audience": [
      "laboratories",
      "manufacturers",
      "retailers",
      "regulatory professionals"
    ],
    "hmi": "https://heavymetalindex.com/synthesis/dietary-nickel-plant-staple-accumulation",
    "hmtc": "https://heavymetalcertified.com/articles/dietary-nickel-plant-staple-accumulation"
  },
  {
    "slug": "tin-canned-food-acidic-matrix-migration",
    "number": "002",
    "identifier": "ICS-EGN-2026-002",
    "title": "Tin migration in canned and acidic foods",
    "disposition": "Treat packaging format and acidity as part of the certification cell, preserve the acute gastrointestinal endpoint, and avoid generalizing an agricultural contaminant model to a contact-material pathway.",
    "boundary": "The finding changes row definition and control design; the governing maximum remains externally anchored.",
    "analytes": "Tin",
    "anchorSources": 5,
    "audience": [
      "manufacturers",
      "packaging teams",
      "laboratories",
      "retailers"
    ],
    "hmi": "https://heavymetalindex.com/synthesis/tin-canned-food-acidic-matrix-migration",
    "hmtc": "https://heavymetalcertified.com/articles/tin-canned-food-acidic-matrix-migration"
  },
  {
    "slug": "breastmilk-heavy-metal-exposure-pathway",
    "number": "003",
    "identifier": "ICS-EGN-2026-003",
    "title": "Breastmilk as a distinct exposure pathway",
    "disposition": "Keep maternal biomonitoring and lactation evidence outside food-product conformity claims while retaining it as vulnerable-population context for infant exposure communication.",
    "boundary": "This is health-surveillance context, not a certifiable product category or a source of product thresholds.",
    "analytes": "Lead, Cadmium, Arsenic, Mercury, Aluminum, Chromium",
    "anchorSources": 6,
    "audience": [
      "health professionals",
      "regulators",
      "journalists",
      "consumer educators"
    ],
    "hmi": "https://heavymetalindex.com/synthesis/breastmilk-heavy-metal-exposure-pathway",
    "hmtc": "https://heavymetalcertified.com/articles/breastmilk-heavy-metal-exposure-pathway"
  },
  {
    "slug": "infant-formula-metal-amplification",
    "number": "004",
    "identifier": "ICS-EGN-2026-004",
    "title": "Infant formula metal amplification",
    "disposition": "Maintain separate powder, ready-to-feed, soy, and non-soy cells; include aluminum in surveillance; and require basis-explicit finished-product testing rather than recipe inference.",
    "boundary": "Format and analyte coverage follow from the evidence. Initial limits still follow the published government-anchor rule.",
    "analytes": "Aluminum, Lead, Cadmium, Arsenic, Mercury",
    "anchorSources": 7,
    "audience": [
      "infant-formula manufacturers",
      "laboratories",
      "retailers",
      "regulators"
    ],
    "hmi": "https://heavymetalindex.com/synthesis/infant-formula-metal-amplification",
    "hmtc": "https://heavymetalcertified.com/articles/infant-formula-metal-amplification"
  },
  {
    "slug": "wastewater-irrigation-multimetal-crop-pathway",
    "number": "005",
    "identifier": "ICS-EGN-2026-005",
    "title": "Wastewater irrigation as a multi-metal crop pathway",
    "disposition": "Use irrigation source and geography as supplier-risk and surveillance fields, especially for leafy produce, without silently pooling unlike markets into a single occurrence claim.",
    "boundary": "The pathway informs supplier controls and sampling density, not an occurrence-derived certification ceiling.",
    "analytes": "Lead, Cadmium, Chromium, Nickel, Arsenic",
    "anchorSources": 5,
    "audience": [
      "growers",
      "manufacturers",
      "retailers",
      "regulators"
    ],
    "hmi": "https://heavymetalindex.com/synthesis/wastewater-irrigation-multimetal-crop-pathway",
    "hmtc": "https://heavymetalcertified.com/articles/wastewater-irrigation-multimetal-crop-pathway"
  },
  {
    "slug": "supplement-botanical-lead-pathway",
    "number": "006",
    "identifier": "ICS-EGN-2026-006",
    "title": "Botanical supplements as an under-surveilled pathway",
    "disposition": "Require finished-product, multi-metal evidence for botanical preparations and distinguish supplements from conventional foods instead of borrowing a food surveillance assumption.",
    "boundary": "High reported values justify scrutiny and category separation; they do not by themselves establish a pass/fail value.",
    "analytes": "Lead, Cadmium, Arsenic, Mercury",
    "anchorSources": 4,
    "audience": [
      "supplement manufacturers",
      "laboratories",
      "retailers",
      "attorneys"
    ],
    "hmi": "https://heavymetalindex.com/synthesis/supplement-botanical-lead-pathway",
    "hmtc": "https://heavymetalcertified.com/articles/supplement-botanical-lead-pathway"
  },
  {
    "slug": "organ-meat-cadmium-lead-accumulation",
    "number": "007",
    "identifier": "ICS-EGN-2026-007",
    "title": "Offal as a distinct accumulation category",
    "disposition": "Keep liver and kidney separate from skeletal muscle in taxonomy, sampling, and claims because physiological accumulation invalidates a generic meat category.",
    "boundary": "Category separation is evidence-led; any certification value remains tied to the exact offal matrix and applicable authority.",
    "analytes": "Cadmium, Lead, Mercury, Chromium",
    "anchorSources": 6,
    "audience": [
      "meat processors",
      "laboratories",
      "retailers",
      "regulators"
    ],
    "hmi": "https://heavymetalindex.com/synthesis/organ-meat-cadmium-lead-accumulation",
    "hmtc": "https://heavymetalcertified.com/articles/organ-meat-cadmium-lead-accumulation"
  },
  {
    "slug": "cookware-utensil-metal-leaching-pathway",
    "number": "008",
    "identifier": "ICS-EGN-2026-008",
    "title": "Cookware and utensils as post-harvest metal pathways",
    "disposition": "Treat food-contact articles as their own material-and-migration program scope and keep them separate from claims about the cleanliness of raw ingredients.",
    "boundary": "Leaching evidence governs test design and use conditions, not the direct transfer of a food-content limit to cookware.",
    "analytes": "Lead, Cadmium, Nickel, Chromium, Aluminum, Arsenic",
    "anchorSources": 5,
    "audience": [
      "cookware manufacturers",
      "laboratories",
      "retailers",
      "attorneys"
    ],
    "hmi": "https://heavymetalindex.com/synthesis/cookware-utensil-metal-leaching-pathway",
    "hmtc": "https://heavymetalcertified.com/articles/cookware-utensil-metal-leaching-pathway"
  },
  {
    "slug": "tea-multi-metal-bioaccumulation",
    "number": "009",
    "identifier": "ICS-EGN-2026-009",
    "title": "Tea totals and infusion transfer",
    "disposition": "Preserve dry-leaf and prepared-infusion bases as different records and require consumer-facing claims to name which basis was actually tested.",
    "boundary": "Transfer fractions inform basis and exposure interpretation; they cannot be used to obscure a failing native-basis requirement.",
    "analytes": "Aluminum, Lead, Cadmium, Chromium, Arsenic",
    "anchorSources": 8,
    "audience": [
      "tea manufacturers",
      "laboratories",
      "retailers",
      "consumer educators"
    ],
    "hmi": "https://heavymetalindex.com/synthesis/tea-multi-metal-bioaccumulation",
    "hmtc": "https://heavymetalcertified.com/articles/tea-multi-metal-bioaccumulation"
  },
  {
    "slug": "aquaculture-vs-wild-contamination-differential",
    "number": "010",
    "identifier": "ICS-EGN-2026-010",
    "title": "Aquaculture and wild-caught fish are not one occurrence pool",
    "disposition": "Record production method and species in fish evidence, stratify occurrence summaries, and prevent a lower farmed-fish distribution from masking higher-risk wild predator categories.",
    "boundary": "A production-method differential changes stratification and sampling, not the applicable methylmercury authority.",
    "analytes": "Methylmercury, Mercury, Cadmium, Lead, Arsenic",
    "anchorSources": 3,
    "audience": [
      "seafood suppliers",
      "laboratories",
      "retailers",
      "regulators"
    ],
    "hmi": "https://heavymetalindex.com/synthesis/aquaculture-vs-wild-contamination-differential",
    "hmtc": "https://heavymetalcertified.com/articles/aquaculture-vs-wild-contamination-differential"
  },
  {
    "slug": "bivalve-cadmium-amplification",
    "number": "011",
    "identifier": "ICS-EGN-2026-011",
    "title": "Bivalve cadmium amplification",
    "disposition": "Maintain a mollusc-specific category rather than using finfish expectations, with sampling and claims that reflect filter-feeding accumulation.",
    "boundary": "Biological accumulation justifies taxonomy separation; it does not authorize an internally invented threshold.",
    "analytes": "Cadmium, Lead, Mercury",
    "anchorSources": 5,
    "audience": [
      "seafood suppliers",
      "laboratories",
      "retailers",
      "regulators"
    ],
    "hmi": "https://heavymetalindex.com/synthesis/bivalve-cadmium-amplification",
    "hmtc": "https://heavymetalcertified.com/articles/bivalve-cadmium-amplification"
  },
  {
    "slug": "cooking-does-not-reduce-mehg",
    "number": "012",
    "identifier": "ICS-EGN-2026-012",
    "title": "Cooking is not a methylmercury control",
    "disposition": "Reject preparation-based mitigation claims for methylmercury and assess the food on the governed native basis without promising that household cooking removes the hazard.",
    "boundary": "Consumer preparation is an exposure-communication issue, not a reason to loosen a product requirement.",
    "analytes": "Methylmercury, Mercury",
    "anchorSources": 3,
    "audience": [
      "seafood suppliers",
      "retailers",
      "consumer educators",
      "journalists"
    ],
    "hmi": "https://heavymetalindex.com/synthesis/cooking-does-not-reduce-mehg",
    "hmtc": "https://heavymetalcertified.com/articles/cooking-does-not-reduce-mehg"
  },
  {
    "slug": "eu-regulatory-framework-timeline",
    "number": "013",
    "identifier": "ICS-EGN-2026-013",
    "title": "The EU heavy-metals framework is versioned, not static",
    "disposition": "Maintain effective dates, amendments, matrix splits, and supersession links in the regulatory crosswalk; never cite an EU limit without its edition and scope.",
    "boundary": "The timeline supplies authoritative version context. Applicability is still decided cell by cell.",
    "analytes": "Lead, Cadmium, Mercury, Methylmercury, Inorganic arsenic, Tin",
    "anchorSources": 6,
    "audience": [
      "regulatory professionals",
      "manufacturers",
      "attorneys",
      "retailers"
    ],
    "hmi": "https://heavymetalindex.com/synthesis/eu-regulatory-framework-timeline",
    "hmtc": "https://heavymetalcertified.com/articles/eu-regulatory-framework-timeline"
  },
  {
    "slug": "se-hg-molar-ratio-certification-debate",
    "number": "014",
    "identifier": "ICS-EGN-2026-014",
    "title": "Selenium-to-mercury ratios do not silently relax methylmercury controls",
    "disposition": "Retain the selenium-mercury ratio as a disclosed scientific debate and reject any automatic relaxation of a methylmercury requirement absent an explicit, externally governed rule.",
    "boundary": "A contested protective-factor hypothesis is context, not threshold authority.",
    "analytes": "Methylmercury, Mercury",
    "anchorSources": 3,
    "audience": [
      "toxicologists",
      "seafood suppliers",
      "regulators",
      "attorneys"
    ],
    "hmi": "https://heavymetalindex.com/synthesis/se-hg-molar-ratio-certification-debate",
    "hmtc": "https://heavymetalcertified.com/articles/se-hg-molar-ratio-certification-debate"
  },
  {
    "slug": "climate-fish-mehg-projections",
    "number": "015",
    "identifier": "ICS-EGN-2026-015",
    "title": "Climate-linked methylmercury projections",
    "disposition": "Use projected change as a surveillance and review trigger for marine categories while clearly separating forecasts from measured present-day conformity evidence.",
    "boundary": "A projection can trigger monitoring; it cannot replace a current lot result or controlling instrument.",
    "analytes": "Mercury, Methylmercury",
    "anchorSources": 3,
    "audience": [
      "regulators",
      "seafood suppliers",
      "laboratories",
      "journalists"
    ],
    "hmi": "https://heavymetalindex.com/synthesis/climate-fish-mehg-projections",
    "hmtc": "https://heavymetalcertified.com/articles/climate-fish-mehg-projections"
  },
  {
    "slug": "mining-impacted-freshwater-fish",
    "number": "016",
    "identifier": "ICS-EGN-2026-016",
    "title": "Mining-impacted freshwater fish",
    "disposition": "Capture catch geography and mining influence as routeable evidence fields, and prevent commercial-market fish data from standing in for subsistence or impacted-water populations.",
    "boundary": "Origin context governs evidence fit and surveillance; it does not justify silent cross-market pooling.",
    "analytes": "Mercury, Methylmercury, Lead, Cadmium, Chromium, Nickel",
    "anchorSources": 10,
    "audience": [
      "regulators",
      "public-health teams",
      "laboratories",
      "journalists"
    ],
    "hmi": "https://heavymetalindex.com/synthesis/mining-impacted-freshwater-fish",
    "hmtc": "https://heavymetalcertified.com/articles/mining-impacted-freshwater-fish"
  },
  {
    "slug": "organic-certification-not-protective",
    "number": "017",
    "identifier": "ICS-EGN-2026-017",
    "title": "Organic certification is not a contaminant proxy",
    "disposition": "Prohibit organic status from substituting for analytical evidence and keep contaminant claims tied to the tested lot, analyte panel, and stated basis.",
    "boundary": "A production certification and a contaminant conformity claim answer different questions.",
    "analytes": "Lead, Cadmium, Aluminum, Nickel, Arsenic",
    "anchorSources": 7,
    "audience": [
      "manufacturers",
      "retailers",
      "attorneys",
      "consumer educators"
    ],
    "hmi": "https://heavymetalindex.com/synthesis/organic-certification-not-protective",
    "hmtc": "https://heavymetalcertified.com/articles/organic-certification-not-protective"
  },
  {
    "slug": "seaweed-cd-as-contamination",
    "number": "018",
    "identifier": "ICS-EGN-2026-018",
    "title": "Seaweed cadmium and arsenic accumulation",
    "disposition": "Keep seaweed and kelp separate from terrestrial vegetables, preserve arsenic species, and require species-explicit reporting wherever inorganic arsenic is the governed analyte.",
    "boundary": "Total arsenic remains context and cannot be substituted for inorganic arsenic.",
    "analytes": "Cadmium, Arsenic, Inorganic arsenic, Lead",
    "anchorSources": 3,
    "audience": [
      "seaweed manufacturers",
      "laboratories",
      "retailers",
      "regulators"
    ],
    "hmi": "https://heavymetalindex.com/synthesis/seaweed-cd-as-contamination",
    "hmtc": "https://heavymetalcertified.com/articles/seaweed-cd-as-contamination"
  },
  {
    "slug": "climate-metals-tradeoffs",
    "number": "019",
    "identifier": "ICS-EGN-2026-019",
    "title": "Climate adaptation creates contaminant trade-offs",
    "disposition": "Add climate-sensitive categories to the standards review watch and require measured evidence before a projected trade-off changes any product decision.",
    "boundary": "The synthesis informs review cadence and research priorities, not present conformity values.",
    "analytes": "Inorganic arsenic, Cadmium, Methylmercury, Mercury",
    "anchorSources": 3,
    "audience": [
      "regulators",
      "sustainability teams",
      "manufacturers",
      "journalists"
    ],
    "hmi": "https://heavymetalindex.com/synthesis/climate-metals-tradeoffs",
    "hmtc": "https://heavymetalcertified.com/articles/climate-metals-tradeoffs"
  },
  {
    "slug": "combined-exposure-underprotection",
    "number": "020",
    "identifier": "ICS-EGN-2026-020",
    "title": "Combined exposure and single-analyte limits",
    "disposition": "Preserve transparent per-analyte conformity while disclosing multi-metal coverage and resisting claims that a pass on one analyte describes aggregate exposure.",
    "boundary": "Combined-exposure evidence constrains claim language; it does not create an undisclosed composite score.",
    "analytes": "Lead, Cadmium, Inorganic arsenic, Methylmercury, Nickel, Aluminum",
    "anchorSources": 3,
    "audience": [
      "toxicologists",
      "regulators",
      "attorneys",
      "retailers"
    ],
    "hmi": "https://heavymetalindex.com/synthesis/combined-exposure-underprotection",
    "hmtc": "https://heavymetalcertified.com/articles/combined-exposure-underprotection"
  },
  {
    "slug": "organoarsenical-inertness-assumption",
    "number": "021",
    "identifier": "ICS-EGN-2026-021",
    "title": "The organoarsenical inertness assumption",
    "disposition": "Preserve arsenic species throughout evidence routing, make uncertainty visible, and prevent total-arsenic or generic organic-arsenic claims from answering an inorganic-arsenic question.",
    "boundary": "A contested toxicological assumption cannot erase species-specific measurement and authority requirements.",
    "analytes": "Arsenic, Inorganic arsenic",
    "anchorSources": 8,
    "audience": [
      "laboratories",
      "toxicologists",
      "regulators",
      "attorneys"
    ],
    "hmi": "https://heavymetalindex.com/synthesis/organoarsenical-inertness-assumption",
    "hmtc": "https://heavymetalcertified.com/articles/organoarsenical-inertness-assumption"
  },
  {
    "slug": "spice-adulteration-lead-infants",
    "number": "022",
    "identifier": "ICS-EGN-2026-022",
    "title": "Lead chromate spice adulteration",
    "disposition": "Add authenticity, supplier, and fraud controls to analytical testing because an intentional lead-chromate pathway is not governed adequately by agricultural sourcing assumptions alone.",
    "boundary": "Adulteration evidence changes prevention and investigation controls; conformity still rests on measured, basis-explicit results.",
    "analytes": "Lead, Chromium",
    "anchorSources": 7,
    "audience": [
      "spice manufacturers",
      "laboratories",
      "retailers",
      "enforcement professionals"
    ],
    "hmi": "https://heavymetalindex.com/synthesis/spice-adulteration-lead-infants",
    "hmtc": "https://heavymetalcertified.com/articles/spice-adulteration-lead-infants"
  },
  {
    "slug": "subsistence-fishing-mehg-disparity",
    "number": "023",
    "identifier": "ICS-EGN-2026-023",
    "title": "Subsistence fishing methylmercury disparity",
    "disposition": "Keep vulnerable-population and catch-location context visible, and do not represent commercial-market sampling as coverage of subsistence exposure.",
    "boundary": "The disparity constrains claims about population coverage; it is not a substitute for product-specific conformity evidence.",
    "analytes": "Methylmercury, Mercury",
    "anchorSources": 3,
    "audience": [
      "public-health teams",
      "regulators",
      "journalists",
      "consumer educators"
    ],
    "hmi": "https://heavymetalindex.com/synthesis/subsistence-fishing-mehg-disparity",
    "hmtc": "https://heavymetalcertified.com/articles/subsistence-fishing-mehg-disparity"
  },
  {
    "slug": "us-chocolate-lead-temporal-decline",
    "number": "024",
    "identifier": "ICS-EGN-2026-024",
    "title": "Chocolate lead declined while cadmium did not",
    "disposition": "Track lead and cadmium as separate time series, preserve cocoa-solids and product-form splits, and require current lots rather than treating category-level improvement as a brand claim.",
    "boundary": "A temporal market trend is surveillance evidence, not proof that an individual lot conforms.",
    "analytes": "Lead, Cadmium",
    "anchorSources": 3,
    "audience": [
      "chocolate manufacturers",
      "laboratories",
      "retailers",
      "journalists"
    ],
    "hmi": "https://heavymetalindex.com/synthesis/us-chocolate-lead-temporal-decline",
    "hmtc": "https://heavymetalcertified.com/articles/lead-and-cadmium-in-dark-chocolate"
  }
];

export function governanceNoteBySlug(slug: string) {
  return governanceNotes.find((note) => note.slug === slug);
}


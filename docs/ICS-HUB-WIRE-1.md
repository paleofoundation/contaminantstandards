# ICS-HUB-WIRE-1 PREP

PFAS index and cert remain reserved, with publicLink false. Microplastics and the four unnamed slots are also reserved. The existing heavy-metals faces retain their registry activation state. No domain has been activated by this draft.

The registry requires an index and a cert per vertical. Public destinations require status live, publicLink true, and a nonempty domain independently of the other face. Network cards, footer, vertical pages, organization metadata and the network sitemap index use this filter. Index-context links exclude cert sites.

The network sitemap index is `/network-sitemap.xml`, advertised by robots.txt alongside the existing local sitemap. It lists the parent sitemap and each live public index/cert sitemap. No remote sitemap availability or cross-site submission approval is claimed.

`/network/heavy-metals` presents active destinations. `/network/microplastics` and `/network/forever-chemicals` are noindex informational fallbacks only, without reserved-domain links or application targets. They are absent from network navigation and the local sitemap until a face is public. Unnamed slots return not found. The microplastics fallback supports Q5 documentation links without promoting its reserved index.

Q11 application targets are recorded as reserved TODOs, `/certify?program=heavy-metals`, `/certify?program=pfas`, and `/certify?program=microplastics`. No intake route or active application link is added. Each cert site needs a separately ordered change after Q11 exists. The explicit PFAS index activation TODO requires Elon FCI deploy PASS; cert activation requires its own PASS.

## Validation

- Pristine origin/main: npm test PASS, 6 tests; npm run build PASS.
- Draft: npm test PASS, 11 tests; npm run build PASS, including firewall and cross-link prebuild guards.
- npx tsc --noEmit PASS.
- ESLint on every changed TypeScript/TSX file PASS; git diff --check PASS.
- Added regression tests cover reserved-domain exclusion in rendered network/footer HTML, index-to-cert firewall rendering, independent status/publicLink activation, metadata/sitemap output, inactive Q11 paths, the microplastics fallback and unnamed-slot rejection.
- Browser visual verification was attempted but denied by browser security policy for localhost access. No visual/browser pass is claimed. Server-rendered component tests and the production build passed.
- No baseline test/build failure found. Dependency installation reported 26 existing audit findings (25 high, 1 critical). Dependency upgrades are outside this draft.

Raw logs are in the lane work directory: `../work/q4-baseline-test.log`, `q4-baseline-build.log`, `q4-test.log`, `q4-build.log`, `q4-typecheck.log`, `q4-lint.log`.

## Follow-up draft PRs, listed only

- HMI: cite the ICS heavy-metals hub page in network navigation/footer; preserve the index firewall and never link to cert or intake.
- FCI: after deploy PASS, cite the ICS PFAS hub page in network navigation/footer; preserve the index firewall.
- Heavy-metals cert: cite its index and link application navigation to the Q11 heavy-metals target after Q11 approval, without changing the existing intake in this PREP.
- PFAS cert: keep reserved; after its own PASS and Q11 approval, cite FCI and use the Q11 PFAS target.
- Microplastics faces: remain reserved; later index links only to the ICS vertical, and cert links to its index and approved Q11 target.

No follow-up PR was opened. No other repository was edited. This draft does not merge, deploy, provision, change DNS, or change any standard ceiling.

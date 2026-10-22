# Article defaults (owner instruction, 22 October 2026)

Every new or revised article must use the approved article typography, light
reference section, APA-formatted entries, and sequential numeric citations.
Follow [the article authoring contract](docs/article-authoring.md).

- Use the shared `PublicationHeader`, `ArticleSection`, `PublicationFooter`,
  `.paper-body`, `.paper-abstract`, and `.paper-table` styles. Do not fork their
  fonts, sizes, or colors for an individual article without an explicit request.
- Store complete, verified bibliography fields in the article's `references.json`.
  Use `createCite(references)` for inline citations and keep references in order
  of first citation. New sources receive [1], [2], [3], etc.; repeated sources keep
  their number. Matching visible numbers and working anchors are required.
- APA describes the bibliographic entries here; numeric citations and citation
  order are the owner's chosen presentation. Do not switch to author–date
  markers, alphabetical ordering, or unnumbered entries.
- Use `PublicationFooter` without style/order flags; the approved presentation is
  its default. Never bypass its required APA fields with shorthand labels.
- Register each article in `app/site-data.ts`. `npm run lint:article-citations`
  automatically discovers every article page and blocks builds on missing
  bibliographies, numbering gaps, or departures from the shared components.

# Researcher names and ORCID

Every visible mention of Karen Pendergrass, Kimberly Eyer, or Jonathan D.
Pendergrass must use `PersonName` from `app/person-name.tsx`, including first-name
mentions and possessives in prose. Keep the small green ORCID iD raised beside
the name and linked to that person's record. Canonical IDs live in
`app/people-data.ts`; do not duplicate or guess them.

Use the optional `href` to link a name to its local profile. Never put
`PersonName` inside another link: the ORCID badge is a separate link. Use
`children` when the displayed name needs line breaks, initials, or a possessive.

Keep plain text in metadata, alt text, search indexes, and structured data;
associate the ORCID URL or identifier through the format's supported fields.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

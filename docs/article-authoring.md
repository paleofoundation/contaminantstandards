# Article authoring contract

The approved presentation on `contaminantstandards.com` is the default for all
future articles. Use the shared components and styles rather than copying their
markup or introducing a separate article design.

## Typography and layout

Use `PublicationHeader`, `ArticleSection`, `PublicationFooter`, `.paper-body`, and
`.paper-abstract`. Keep the shared serif reading text and sans-serif headings.
Abstract and section labels use the same 24px heading treatment. Tables use
`.paper-table-wrap` and `.paper-table`: 16px sans-serif cells, 14px headers,
readable captions, and horizontal scrolling where needed. Definitions live in
`app/globals.css` and `app/typography.css`.

Reference entries use 16px sans-serif text, hanging indents, visible bracketed
numbers, and dark text on white. The suggested-citation area has a pale
background. `PublicationFooter` supplies this automatically; it has no per-page
style or ordering options.

## References and inline citations

Each article has a sibling `references.json`, typed as `PublicationReference[]`.
Each record needs a stable `id`, descriptive `label`, HTTPS `href`, and `apa`
fields: `authors`, `date`, `title`, and `italicTitle`. Add the relevant journal,
volume, issue, pages or article number, publisher, and edition information.
Use the full APA author list, sentence-case work titles, appropriate italics,
and DOI URLs. Verify metadata against the source; use `n.d.` when no date is
available rather than guessing. Keep review annotations out of citation titles.

APA formatting applies to the entries. The owner has chosen **numeric inline
citations and reference ordering by first appearance**, rather than APA's usual
author–date markers and alphabetical list.

```tsx
import referenceData from "./references.json";
import {
  ArticleSection,
  createCite,
  PublicationFooter,
  PublicationHeader,
  type PublicationReference,
} from "../article-tools";

const references: PublicationReference[] = referenceData;
const Cite = createCite(references);

// Within the article, attach a stable source ID to the supported passage:
// <p>Source-supported statement.<Cite ids={["source-id"]} /></p>
// After the article:
// <PublicationFooter record={article} references={references} />
```

Put references in the order their IDs first occur in `Cite` elements, reading
from the abstract through the article. The first new source is [1], the next is
[2], and so on. Repeated sources retain the original number. Citation groups
display in numeric order. Never hard-code superscript numbers, allocate numbers
with mutable render-time counters, or alphabetize the reference array.

The same array drives inline links, visible reference labels, and `ref-N`
anchors. If citation placement changes, update the array order and rerun the
check. Cite sources only where they support the nearby passage; do not attach
unrelated sources merely to fill the bibliography.

## Registration and validation

Register the article in `app/site-data.ts`, then run:

```bash
npm run lint:article-citations
npm run build
```

The citation check discovers article pages automatically, including new pages
without `references.json`, and compares them with the publication register.
It requires shared components and typography classes, complete reference fields,
consecutive first-use numbering, and matching visible labels and anchors. The
production prebuild runs it automatically. The baby-wipes article retains its
one recorded, uncited reviewed source as an existing exception; new articles
must cite every listed reference.

Review the rendered article and references before publication. Automated checks
do not establish that a cited source supports a scientific or legal claim.

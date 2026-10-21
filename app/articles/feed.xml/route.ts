import { publicationSeries, publications, SITE_ORIGIN } from "../../site-data";

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export function GET() {
  const items = publications
    .map((paper) => {
      const url = `${SITE_ORIGIN}/articles/${paper.slug}`;
      return `<item>
  <title>${escapeXml(paper.title)}</title>
  <link>${url}</link>
  <guid isPermaLink="false">${paper.identifier}</guid>
  <description>${escapeXml(paper.description)}</description>
  <category>${escapeXml(publicationSeries[paper.series].name)}</category>
  <author>Karen Pendergrass</author>
  <pubDate>${new Date(`${paper.datePublished}T12:00:00Z`).toUTCString()}</pubDate>
</item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
<channel>
  <title>ICS Institutional Analysis</title>
  <link>${SITE_ORIGIN}/articles</link>
  <description>Institutional analysis and evidence reviews from the Institute of Contaminant Standards. Evidence reviews report measured literature on each source's own basis and do not set certification limits.</description>
  <language>en</language>
  ${items}
</channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "content-type": "application/rss+xml; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
}

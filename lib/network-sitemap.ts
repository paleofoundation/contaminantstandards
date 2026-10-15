import { PARENT_BASE, httpsUrl, publicNetworkSites } from "./site-registry"

export function networkSitemapXml(): string {
  const urls = [`${PARENT_BASE}/sitemap.xml`, ...publicNetworkSites().map((site) => `${httpsUrl(site.domain)}/sitemap.xml`)]
  const escape = (value: string) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;")
  return `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((url) => `  <sitemap><loc>${escape(url)}</loc></sitemap>`).join("\n")}\n</sitemapindex>`
}

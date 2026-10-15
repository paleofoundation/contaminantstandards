import { networkSitemapXml } from "../../lib/network-sitemap";

export function GET() {
  return new Response(networkSitemapXml(), { headers: { "Content-Type": "application/xml; charset=utf-8" } });
}

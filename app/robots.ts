import type { MetadataRoute } from "next"
import { PARENT_BASE } from "../lib/site-registry"

// The parent apex is indexable for institutional/governance intent. The
// single-record verification surface and the search API are kept out of the
// index (verify is also noindex at the page level).
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/verify", "/api/"],
    },
    sitemap: `${PARENT_BASE}/sitemap.xml`,
  }
}

import type { MetadataRoute } from "next"
import { PARENT_BASE } from "../lib/site-registry"

// Public, indexable institutional pages only. Brand registry entries are NOT
// enumerated in the sitemap (no browsable directory — plan S7); verification is
// noindex.
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/network", "/registry", "/governance", "/apply", "/articles"]
  return paths.map((p) => ({
    url: `${PARENT_BASE}${p === "/" ? "" : p}`,
    changeFrequency: "weekly",
    priority: p === "/" ? 1 : 0.7,
  }))
}

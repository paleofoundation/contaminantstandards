import type { MetadataRoute } from "next";
import { canonical } from "./site-data";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: canonical("/sitemap.xml"),
    host: "contaminantstandards.com",
  };
}

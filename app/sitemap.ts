import { liveVerticals } from "../lib/site-registry";
import type { MetadataRoute } from "next";
import { canonical, publications } from "./site-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const current = "2026-08-17";
  const routes = [
    { path: "/", priority: 1, changeFrequency: "weekly" as const },
    { path: "/evidence", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/network", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/governance", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/governance/policies", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/about", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/people/karen-pendergrass", priority: 0.95, changeFrequency: "monthly" as const },
    { path: "/articles", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/registry", priority: 0.7, changeFrequency: "weekly" as const },
    { path: "/apply", priority: 0.5, changeFrequency: "monthly" as const },
    { path: "/contact", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/licensing", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/privacy", priority: 0.4, changeFrequency: "yearly" as const },
    { path: "/terms", priority: 0.4, changeFrequency: "yearly" as const },
  ];

  return [
    ...routes.map((route) => ({
      url: canonical(route.path),
      lastModified: current,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...liveVerticals().map((vertical) => ({ url: canonical(`/network/${vertical.key}`), changeFrequency: "monthly" as const, priority: 0.7 })),
    ...publications.map((publication) => ({
      url: canonical(`/articles/${publication.slug}`),
      lastModified: publication.dateModified,
      changeFrequency: "yearly" as const,
      priority: 0.85,
    })),
  ];
}

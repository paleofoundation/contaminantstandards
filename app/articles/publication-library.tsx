"use client";

import { useState } from "react";
import { PersonName } from "../person-name";
import type { Publication } from "../site-data";
import { publicationReadLabel, publicationSeries } from "../site-data";

const filters = [
  { id: "all", label: "All publications" },
  { id: "ICS-ER", label: "Evidence reviews" },
  { id: "ICS-IA", label: "Institutional analysis" },
] as const;
export function PublicationLibrary({
  publications,
}: {
  publications: Publication[];
}) {
  const [filter, setFilter] = useState<string>("all");
  const [query, setQuery] = useState("");
  const words = query.toLowerCase().trim();
  const shown = [...publications]
    .sort((a, b) => b.datePublished.localeCompare(a.datePublished))
    .filter(
      (p) =>
        (filter === "all" || p.series === filter) &&
        `${p.title} ${p.description} ${p.topic} ${p.identifier} Karen Pendergrass`
          .toLowerCase()
          .includes(words),
    );
  return (
    <>
      <div className="library-tools">
        <div
          className="library-filters"
          role="group"
          aria-label="Filter publications by series"
        >
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              aria-pressed={filter === f.id}
              onClick={() => setFilter(f.id)}
            >
              {f.label}
              <span>
                {f.id === "all"
                  ? publications.length
                  : publications.filter((p) => p.series === f.id).length}
              </span>
            </button>
          ))}
        </div>
        <label className="library-search">
          <span className="sr-only">Search publications</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search titles, topics, records…"
          />
          <span aria-hidden="true">⌕</span>
        </label>
      </div>
      <p className="library-result-count" aria-live="polite">
        {shown.length} {shown.length === 1 ? "publication" : "publications"}
        {words ? ` matching “${query.trim()}”` : " in the record"}
      </p>
      <div className="library-grid">
        {shown.map((p) => (
          <article className="library-card" key={p.identifier}>
            <div className="publication-meta">
              <span>{publicationSeries[p.series].name}</span>
              <span>{p.readingTime}</span>
            </div>
            <p className="inside-label">{p.topic}</p>
            <h3>
              <a href={`/articles/${p.slug}`}>{p.title}</a>
            </h3>
            <p>{p.description}</p>
            <div className="library-card-author">
              <PersonName person="karen" href="/people/karen-pendergrass" />
              <time dateTime={p.datePublished}>
                {new Date(p.datePublished + "T00:00:00Z").toLocaleDateString(
                  "en-GB",
                  {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    timeZone: "UTC",
                  },
                )}
              </time>
            </div>
            <a className="inside-row-link" href={`/articles/${p.slug}`}>
              <span>
                {p.identifier}
                <small>{publicationReadLabel(p.series)}</small>
              </span>
              <b aria-hidden="true">↗</b>
            </a>
          </article>
        ))}
      </div>
      {shown.length === 0 ? (
        <div className="library-empty">
          <h3>No publications match this search.</h3>
          <p>Try a topic such as evidence, governance, or analyte.</p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setFilter("all");
            }}
          >
            Show all publications →
          </button>
        </div>
      ) : null}
    </>
  );
}

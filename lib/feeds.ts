// Server-side readers for the parent's authority data feeds (public/data/*.json).
// These are firewall-safe literature/stewardship counts (see build-data-feeds.mjs).
import fs from "node:fs"
import path from "node:path"

const DATA = path.join(process.cwd(), "public/data")
function read<T>(file: string): T {
  return JSON.parse(fs.readFileSync(path.join(DATA, file), "utf8")) as T
}

export interface AuthorityStats {
  sources_total: number
  peer_reviewed: number
  government: number
  databases: number
  a_tier: number
  dois: number
  jurisdictions: number
  ingredients: number
  products: number
  metals: number
  regulations: number
}
export interface StudyDensity {
  jurisdictions: { code: string; count: number }[]
}
export interface StudiesByYear {
  years: { year: number; count: number }[]
}
export interface Fingerprint {
  metals: { metal: string; slug: string; count: number }[]
}

export const authorityStats = () => read<AuthorityStats>("authority-stats.json")
export const studyDensity = () => read<StudyDensity>("study-density.json")
export const studiesByYear = () => read<StudiesByYear>("studies-by-year.json")
export const fingerprint = () => read<Fingerprint>("fingerprint.json")
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const worldTopo = () => read<any>("world-110m.json")

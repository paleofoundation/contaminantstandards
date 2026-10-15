import { httpsUrl, publicSites, siblingLinkAttrs, type SiteRole, type Vertical } from "../lib/site-registry";

export function NetworkFaces({ vertical, from = "parent" }: { vertical: Vertical; from?: SiteRole }) {
  return (
    <div className="track-faces">
      {publicSites(vertical, from).map((site) => (
        <div className={`track-face ${site.role === "index" ? "index-face" : "standard-face"}`} key={site.role}>
          <span>{site.role === "index" ? "LITERATURE INDEX" : "CERTIFICATION PROGRAM"}</span>
          <h3><a href={httpsUrl(site.domain)} {...siblingLinkAttrs()}>{site.label} ↗</a></h3>
          <p>{site.role === "index" ? "Independent literature and regulatory evidence" : "Published standards and scheduled retesting"}</p>
        </div>
      ))}
    </div>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { VERTICALS, publicSites } from "../../../lib/site-registry";
import { NetworkFaces } from "../../../components/NetworkFaces";
import { PageHero, SiteFrame, Status } from "../../site-chrome";
import { canonical } from "../../site-data";

type Props = { params: Promise<{ vertical: string }> };
function findVertical(key: string) {
  // Named informational pages support incoming documentation references.
  // Unnamed reserved slots have no public page.
  const vertical = VERTICALS.find((item) => item.key === key && item.displayName !== "TBD");
  if (!vertical) notFound();
  return vertical;
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const vertical = findVertical((await params).vertical);
  return {
    title: `${vertical.displayName} | Institute of Contaminant Standards`,
    description: vertical.blurb,
    alternates: { canonical: canonical(`/network/${vertical.key}`) },
    robots: { index: publicSites(vertical).length > 0, follow: true },
  };
}
export default async function VerticalPage({ params }: Props) {
  const vertical = findVertical((await params).vertical);
  const available = publicSites(vertical).length > 0;
  return (
    <SiteFrame>
      <main>
        <PageHero index="ICS / NETWORK" eyebrow="Contaminant vertical" title={vertical.displayName} description={vertical.blurb} />
        <section className="program-network" aria-label="Public network destinations">
          {available ? <NetworkFaces vertical={vertical} /> : (
            <div className="track-intro">
              <Status>In development</Status>
              <p>No public index or certification destination is available from this page yet.</p>
            </div>
          )}
        </section>
      </main>
    </SiteFrame>
  );
}

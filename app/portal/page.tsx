import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { PORTAL, httpsUrl } from "../../lib/site-registry";
export const metadata: Metadata = { robots: { index: false, follow: false } };
export default function PortalPage() { redirect(`${httpsUrl(PORTAL.domain)}/portal`); }

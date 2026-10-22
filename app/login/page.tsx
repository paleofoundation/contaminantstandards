import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { PORTAL, httpsUrl } from "../../lib/site-registry";
export const metadata: Metadata = { robots: { index: false, follow: false } };
export default function LoginPage() { redirect(`${httpsUrl(PORTAL.domain)}/login`); }

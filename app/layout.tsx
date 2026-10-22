import type { Metadata } from "next";
import "./globals.css";
import "./institute.css";
import "./typography.css";
import { JsonLd } from "./json-ld";
import {
  KAREN_ID,
  ORGANIZATION_ID,
  SITE_ORIGIN,
  WEBSITE_ID,
} from "./site-data";

// Public institutional metadata is stable: do not force every route to render per request.
export const metadata: Metadata = {
    metadataBase: new URL(SITE_ORIGIN),
    title: "Institute of Contaminant Standards",
    description:
      "The parent institution connecting contaminant evidence indexes, certification programs, TECRID, and Verified Lot Exchange.",
    alternates: {
      canonical: `${SITE_ORIGIN}/`,
      types: {
        "application/rss+xml": `${SITE_ORIGIN}/articles/feed.xml`,
      },
    },
    authors: [{ name: "Institute of Contaminant Standards", url: SITE_ORIGIN }],
    creator: "Institute of Contaminant Standards",
    publisher: "Institute of Contaminant Standards",
    category: "Contaminant standards governance",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      title: "Institute of Contaminant Standards",
      description:
        "Better evidence. Higher standards. Greater trust. Explore the ICS network.",
      type: "website",
      url: `${SITE_ORIGIN}/`,
      siteName: "Institute of Contaminant Standards",
      images: [
        {
          url: `${SITE_ORIGIN}/og-authority.png`,
          width: 1200,
          height: 630,
          alt: "Institute of Contaminant Standards — Standards should be traceable.",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Institute of Contaminant Standards",
      description:
        "Better evidence. Higher standards. Greater trust. Explore the ICS network.",
      images: [`${SITE_ORIGIN}/og-authority.png`],
    },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <JsonLd
          data={[
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": ORGANIZATION_ID,
              name: "Institute of Contaminant Standards",
              alternateName: "ICS",
              legalName: "Paleo Certified, Inc.",
              url: SITE_ORIGIN,
              description:
                "Institutional governance for independent contaminant evidence indexes and certification programs.",
              founder: { "@id": KAREN_ID },
              employee: { "@id": KAREN_ID },
              foundingDate: "2026",
              parentOrganization: {
                "@type": "Organization",
                name: "Paleo Certified, Inc.",
                url: "https://paleofoundation.com/",
              },
              hasPart: [
                {
                  "@type": "WebSite",
                  name: "Heavy Metal Index",
                  url: "https://heavymetalindex.com/",
                },
                {
                  "@type": "Organization",
                  name: "Heavy Metal Tested & Certified",
                  url: "https://heavymetalcertified.com/",
                },
              ],
              knowsAbout: [
                "Contaminant standards",
                "Heavy metals",
                "Food metallomics",
                "Microbial metallomics",
                "Certification governance",
                "Evidence provenance",
              ],
            },
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": WEBSITE_ID,
              name: "Institute of Contaminant Standards",
              url: SITE_ORIGIN,
              publisher: { "@id": ORGANIZATION_ID },
              inLanguage: "en",
            },
          ]}
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { headers } from "next/headers";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { JsonLd } from "./json-ld";
import {
  KAREN_ID,
  ORGANIZATION_ID,
  SITE_ORIGIN,
  WEBSITE_ID,
} from "./site-data";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") ??
    requestHeaders.get("host") ??
    "institute-contaminant-standards.kmfp.chatgpt.site";
  const protocol =
    requestHeaders.get("x-forwarded-proto") ??
    (host.startsWith("localhost") ? "http" : "https");
  const baseUrl = new URL(protocol + "://" + host);
  const socialImage = new URL("/og-authority.png", baseUrl).toString();

  return {
    metadataBase: baseUrl,
    title: "Institute of Contaminant Standards",
    description:
      "Institutional governance for independent evidence indexes and contaminant certification programs.",
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
        "One institution. Separate public faces. Traceable contaminant standards.",
      type: "website",
      url: `${SITE_ORIGIN}/`,
      siteName: "Institute of Contaminant Standards",
      images: [
        {
          url: socialImage,
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
        "One institution. Separate public faces. Traceable contaminant standards.",
      images: [socialImage],
    },
  };
}

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
      <body className={geistSans.variable + " " + geistMono.variable}>
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { headers } from "next/headers";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
  const socialImage = new URL("/og.png", baseUrl).toString();

  return {
    metadataBase: baseUrl,
    title: "Institute of Contaminant Standards",
    description:
      "Institutional governance for independent evidence indexes and contaminant certification programs.",
    openGraph: {
      title: "Institute of Contaminant Standards",
      description:
        "One institution. Separate public faces. Traceable contaminant standards.",
      type: "website",
      url: baseUrl,
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
      <body className={geistSans.variable + " " + geistMono.variable}>
        {children}
      </body>
    </html>
  );
}

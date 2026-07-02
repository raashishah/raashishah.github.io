import localFont from "next/font/local";
import type { Metadata, Viewport } from "next";
import { PersonJsonLd } from "@/components/metadata/PersonJsonLd";
import "@fortawesome/fontawesome-free/css/fontawesome.min.css";
import "@fortawesome/fontawesome-free/css/brands.min.css";
import "@fortawesome/fontawesome-free/css/solid.min.css";
import "./globals.css";
import { absoluteUrl, getSiteUrl, siteConfig } from "@/lib/metadata";
import { seoConfig } from "@/lib/site-seo";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const satoshi = localFont({
  src: "./fonts/Satoshi-Variable.woff2",
  variable: "--font-satoshi",
  display: "swap",
  weight: "300 900",
});

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: {
    default: seoConfig.title,
    template: `%s | ${siteConfig.creator}`,
  },
  description: seoConfig.description,
  keywords: [...seoConfig.keywords],
  applicationName: siteConfig.creator,
  authors: [{ name: siteConfig.creator, url: getSiteUrl().toString() }],
  creator: siteConfig.creator,
  category: "technology",
  alternates: {
    canonical: "/",
    types: {
      "text/plain": absoluteUrl("/llms.txt"),
    },
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: siteConfig.creator,
    title: seoConfig.ogTitle,
    description: seoConfig.description,
    locale: "en_US",
    images: [
      {
        url: absoluteUrl("/opengraph-image.png"),
        width: 1200,
        height: 630,
        alt: `${siteConfig.creator} — ${siteConfig.introRole}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: siteConfig.twitterHandle,
    title: seoConfig.ogTitle,
    description: seoConfig.description,
    images: [absoluteUrl("/opengraph-image.png")],
  },
  icons: {
    icon: [{ url: "/img/favicon.svg", type: "image/svg+xml" }],
    apple: "/img/favicon.svg",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${satoshi.className} ${satoshi.variable}`}>
        <PersonJsonLd />
        {children}
      </body>
    </html>
  );
}

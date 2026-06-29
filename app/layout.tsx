import localFont from "next/font/local";
import type { Metadata, Viewport } from "next";
import "./globals.css";
import { absoluteUrl, getSiteUrl, siteConfig } from "@/lib/metadata";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const satoshi = localFont({
  src: "./fonts/Satoshi-Variable.woff2",
  variable: "--font-satoshi",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: {
    default: siteConfig.creator,
    template: `%s | ${siteConfig.creator}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.creator,
  authors: [{ name: siteConfig.creator, url: getSiteUrl().toString() }],
  creator: siteConfig.creator,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: siteConfig.creator,
    title: siteConfig.creator,
    description: siteConfig.description,
    locale: "en_US",
    images: [
      {
        url: absoluteUrl("/opengraph-image"),
        width: 1200,
        height: 630,
        alt: `${siteConfig.creator} share image`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: siteConfig.twitterHandle,
    title: siteConfig.creator,
    description: siteConfig.description,
    images: [absoluteUrl("/opengraph-image")],
  },
  icons: {
    icon: [{ url: "/img/favicon.svg", type: "image/svg+xml" }],
    apple: "/img/favicon.svg",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${satoshi.className} ${satoshi.variable}`}>
        {children}
      </body>
    </html>
  );
}

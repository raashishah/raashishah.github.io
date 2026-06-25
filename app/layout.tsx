import localFont from "next/font/local";
import type { Metadata } from "next";
import "./globals.css";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { ColorZoneProvider } from "@/components/providers/ColorZoneProvider";
import { CursorProvider } from "@/components/cursor/CursorProvider";
import { TransitionProvider } from "@/components/providers/TransitionProvider";
import { SparkleProvider } from "@/components/providers/SparkleProvider";
import { Cursor } from "@/components/cursor/Cursor";
import { absoluteUrl, getSiteUrl, siteConfig } from "@/lib/metadata";

const cabinet = localFont({
  src: [
    { path: "../public/fonts/CabinetGrotesk-Regular.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/CabinetGrotesk-Bold.woff2", weight: "700", style: "normal" },
    { path: "../public/fonts/CabinetGrotesk-ExtraBold.woff2", weight: "800", style: "normal" },
  ],
  variable: "--font-cabinet",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: {
    default: `${siteConfig.name} | ${siteConfig.title}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.creator, url: getSiteUrl().toString() }],
  creator: siteConfig.creator,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: siteConfig.name,
    title: `${siteConfig.name} | ${siteConfig.title}`,
    description: siteConfig.description,
    locale: "en_US",
    images: [
      {
        url: absoluteUrl("/opengraph-image"),
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} share image`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: siteConfig.twitterHandle,
    title: `${siteConfig.name} | ${siteConfig.title}`,
    description: siteConfig.description,
    images: [absoluteUrl("/opengraph-image")],
  },
  icons: { icon: "/img/favicon.ico" },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${cabinet.className} ${cabinet.variable}`}>
        <ColorZoneProvider>
          <CursorProvider>
            <TransitionProvider>
              <SparkleProvider>
                <SmoothScroll>
                  <Cursor />
                  {children}
                </SmoothScroll>
              </SparkleProvider>
            </TransitionProvider>
          </CursorProvider>
        </ColorZoneProvider>
      </body>
    </html>
  );
}

import localFont from "next/font/local";
import type { Metadata } from "next";
import "./globals.css";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { ColorZoneProvider } from "@/components/providers/ColorZoneProvider";
import { CursorProvider } from "@/components/cursor/CursorProvider";
import { TransitionProvider } from "@/components/providers/TransitionProvider";
import { SparkleProvider } from "@/components/providers/SparkleProvider";
import { Cursor } from "@/components/cursor/Cursor";

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
  title: "raashi",
  description: "Strategy, shipped like software. PM who builds.",
  icons: { icon: "/img/favicon.ico" },
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

import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { OgImage } from "@/components/metadata/OgImage";
import { getOgSatoshiFonts } from "@/lib/og-fonts";
import { getSiteUrl, shareImageBasePalette, siteConfig } from "@/lib/metadata";

export const alt = `${siteConfig.creator} share image`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";
export const runtime = "nodejs";

export default async function OpenGraphImage() {
  const [fonts, faviconSvg] = await Promise.all([
    getOgSatoshiFonts(),
    readFile(path.join(process.cwd(), "public/img/favicon.svg"), "utf8"),
  ]);
  const faviconSrc = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(faviconSvg)}`;

  return new ImageResponse(
    (
      <OgImage
        name={siteConfig.creator}
        role={siteConfig.introRole}
        tagline={siteConfig.introTagline}
        domain={getSiteUrl().hostname}
        faviconSrc={faviconSrc}
        bg={shareImageBasePalette.bg}
        text={shareImageBasePalette.text}
        secondary={shareImageBasePalette.secondary}
        muted={shareImageBasePalette.muted}
      />
    ),
    {
      ...size,
      fonts,
    },
  );
}

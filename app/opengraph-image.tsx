import { ImageResponse } from "next/og";
import { OgImage } from "@/components/metadata/OgImage";
import { getSiteUrl, shareImageBasePalette, siteConfig } from "@/lib/metadata";

export const alt = `${siteConfig.name} share image`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";
export const runtime = "nodejs";

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <OgImage
        eyebrow={siteConfig.name}
        title={siteConfig.title}
        description={siteConfig.description}
        domain={getSiteUrl().hostname}
        bg={shareImageBasePalette.bg}
        panel={shareImageBasePalette.panel}
        text={shareImageBasePalette.text}
        muted={shareImageBasePalette.muted}
        accent={shareImageBasePalette.accent}
      />
    ),
    size,
  );
}

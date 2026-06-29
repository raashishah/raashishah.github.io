import { ImageResponse } from "next/og";
import { OgImage } from "@/components/metadata/OgImage";
import { getSiteUrl, shareImageBasePalette, siteConfig } from "@/lib/metadata";

export const alt = `${siteConfig.creator} share image`;
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
        name={siteConfig.creator}
        tagline="designing and developing apps and AI agents"
        domain={getSiteUrl().hostname}
        bg={shareImageBasePalette.bg}
        text={shareImageBasePalette.text}
        muted={shareImageBasePalette.muted}
      />
    ),
    size,
  );
}

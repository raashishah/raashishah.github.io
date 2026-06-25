import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
import { OgImage } from "@/components/metadata/OgImage";
import { getProjectBySlug } from "@/content/projects";
import { getSiteUrl, shareImageBasePalette, shareImageProjectPalettes, siteConfig } from "@/lib/metadata";

export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";
export const runtime = "nodejs";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function OpenGraphImage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const palette = shareImageProjectPalettes[project.slug as keyof typeof shareImageProjectPalettes] ?? shareImageBasePalette;

  return new ImageResponse(
    (
      <OgImage
        eyebrow={`${siteConfig.name} / ${project.type}`}
        title={project.title}
        description={project.insight}
        domain={getSiteUrl().hostname}
        bg={palette.bg}
        panel={palette.panel}
        text={palette.text}
        muted={palette.muted}
        accent={palette.accent}
      />
    ),
    size,
  );
}

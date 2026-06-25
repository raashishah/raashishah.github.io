import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { getProjectBySlug, projectSlugs } from "@/content/projects";
import { getProjectPalette } from "@/lib/colors";
import { ProjectSceneCanvas } from "@/components/scenes/ProjectSceneRouter";
import { absoluteUrl, siteConfig } from "@/lib/metadata";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projectSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {};
  }

  const title = `${project.title}`;
  const description = project.insight;
  const canonicalPath = `/project/${project.slug}`;
  const imagePath = `/project/${project.slug}/opengraph-image`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      type: "article",
      url: canonicalPath,
      siteName: siteConfig.name,
      title: `${title} | ${siteConfig.name}`,
      description,
      images: [
        {
          url: absoluteUrl(imagePath),
          width: 1200,
          height: 630,
          alt: `${project.title} share image`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      creator: siteConfig.twitterHandle,
      title: `${title} | ${siteConfig.name}`,
      description,
      images: [absoluteUrl(imagePath)],
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const palette = getProjectPalette(project.slug);
  const zoneStyle = palette
    ? ({
        "--zone-bg": palette.bg,
        "--zone-text": palette.text,
        "--zone-muted": palette.textMuted,
        "--zone-accent": palette.accent,
      } as CSSProperties)
    : undefined;

  return (
    <article className="project-page" style={zoneStyle}>
      <header className="project-page__header">
        <Link href="/" className="project-page__back" data-sparkle-burst>
          ← back
        </Link>
        <p className="project-page__type">{project.type}</p>
        <h1 className="project-page__title">{project.title}</h1>
        <p className="project-page__insight">{project.insight}</p>
      </header>

      <div className="project-page__scene">
        <ProjectSceneCanvas project={project} progress={0.75} />
      </div>

      <div className="project-page__story">
        {project.story.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>

      {project.href && (
        <a href={project.href} target="_blank" rel="noopener noreferrer" className="project-page__external" data-sparkle-burst>
          visit live site →
        </a>
      )}
    </article>
  );
}

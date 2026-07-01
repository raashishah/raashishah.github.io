import type { Metadata } from "next";
import { ExpressionPage } from "@/components/ExpressionPage";
import { projects } from "@/content/portfolio";
import { absoluteUrl } from "@/lib/metadata";

const expressionProject = projects.find((project) => project.id === "expression");

if (!expressionProject) {
  throw new Error("Expression project is missing from portfolio content");
}

export const metadata: Metadata = {
  title: expressionProject.seoName,
  description: expressionProject.seoDescription,
  alternates: {
    canonical: "/expression",
  },
  openGraph: {
    type: "website",
    url: "/expression",
    title: expressionProject.seoName,
    description: expressionProject.seoDescription,
    images: [
      {
        url: absoluteUrl("/opengraph-image.png"),
        width: 1200,
        height: 630,
        alt: `${expressionProject.seoName} — ${expressionProject.seoDescription}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: expressionProject.seoName,
    description: expressionProject.seoDescription,
    images: [absoluteUrl("/opengraph-image.png")],
  },
};

export default function Page() {
  return <ExpressionPage />;
}

import type { Metadata } from "next";
import { ProjectPage } from "@/components/ProjectPage";
import { ondeviceContent } from "@/content/ondevice";
import { workExperience } from "@/content/portfolio";
import { buildSubpageMetadata } from "@/lib/metadata";

const ondeviceRole = workExperience.find((role) => role.id === "ondevice");

if (!ondeviceRole) {
  throw new Error("OnDevice role is missing from portfolio content");
}

export const metadata: Metadata = buildSubpageMetadata({
  canonical: "/ondevice",
  title: ondeviceRole.seoName ?? ondeviceRole.title,
  description: ondeviceRole.seoDescription,
});

export default function Page() {
  return <ProjectPage {...ondeviceContent} pageLabel="About OnDevice" />;
}

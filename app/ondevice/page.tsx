import type { Metadata } from "next";
import { OnDevicePage } from "@/components/OnDevicePage";
import { workExperience } from "@/content/portfolio";
import { absoluteUrl } from "@/lib/metadata";

const ondeviceRole = workExperience.find((role) => role.id === "ondevice");

if (!ondeviceRole) {
  throw new Error("OnDevice role is missing from portfolio content");
}

export const metadata: Metadata = {
  title: ondeviceRole.seoName,
  description: ondeviceRole.seoDescription,
  alternates: {
    canonical: "/ondevice",
  },
  openGraph: {
    type: "website",
    url: "/ondevice",
    title: ondeviceRole.seoName,
    description: ondeviceRole.seoDescription,
    images: [
      {
        url: absoluteUrl("/opengraph-image"),
        width: 1200,
        height: 630,
        alt: `${ondeviceRole.seoName} — ${ondeviceRole.seoDescription}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: ondeviceRole.seoName,
    description: ondeviceRole.seoDescription,
    images: [absoluteUrl("/opengraph-image")],
  },
};

export default function Page() {
  return <OnDevicePage />;
}

import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/metadata";

const allowAll = {
  allow: "/",
} as const;

const aiCrawlers = [
  "GPTBot",
  "ClaudeBot",
  "Google-Extended",
  "PerplexityBot",
  "Applebot-Extended",
  "OAI-SearchBot",
] as const;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", ...allowAll },
      ...aiCrawlers.map((userAgent) => ({ userAgent, ...allowAll })),
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: absoluteUrl("/"),
  };
}

import type { NextConfig } from "next";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  outputFileTracingRoot: __dirname,
  eslint: {
    dirs: ["app", "components", "content", "lib"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;

import path from "path";
import type { NextConfig } from "next";

// GITHUB_PAGES is set by .github/workflows/deploy-portfolio.yml. GitHub Pages
// serves this repo at /Claude_test/, so the app needs that base path only for
// that deployment target - local dev and any future Vercel deploy stay at "/".
const isGithubPages = process.env.GITHUB_PAGES === "true";
const repoBasePath = "/Claude_test";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname),
  },
  ...(isGithubPages && {
    output: "export",
    basePath: repoBasePath,
    assetPrefix: repoBasePath,
    images: { unoptimized: true },
  }),
};

export default nextConfig;

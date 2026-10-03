import type { NextConfig } from "next";

const githubPages = process.env.NEXT_PUBLIC_GITHUB_PAGES === "1";
const nextConfig: NextConfig = githubPages ? {
  output: "export",
  distDir: ".next-pages",
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
  trailingSlash: true,
} : {};

export default nextConfig;

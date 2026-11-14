import type { NextConfig } from "next";

const pagesExport = process.env.ATLAS_PAGES_EXPORT === "1";
const config: NextConfig = pagesExport ? {
  output: "export",
  trailingSlash: true,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
} : {};

export default config;

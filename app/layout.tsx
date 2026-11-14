import type { Metadata } from "next";
import catalog from "@/data/catalog.json";
import { AtlasShell } from "./atlas-shell";
import "./globals.css";
import "./catalog.css";
import "../components/atlas/asset-styles.css";
import "../styles/visual-cores/all.css";

export const metadata: Metadata = {
  title: "Design Atlas",
  description: "UI, 모션, 레이아웃, WebGL 디자인 자산을 탐색하고 조합하는 라이브러리입니다.",
};

const assetCounts: Record<string, number> = {};
for (const asset of catalog) {
  if (asset.status === "ready") assetCounts[asset.category] = (assetCounts[asset.category] ?? 0) + 1;
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ko"><body><AtlasShell counts={assetCounts}>{children}</AtlasShell></body></html>;
}
